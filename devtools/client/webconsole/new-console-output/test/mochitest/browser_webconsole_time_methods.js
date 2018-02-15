/* -*- indent-tabs-mode: nil; js-indent-level: 2 -*- */
/* vim: set ft=javascript ts=2 et sw=2 tw=80: */
/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

// Tests that the Console API implements the time() and timeEnd() methods.

"use strict";

const TEST_URI = "http://example.com/browser/devtools/client/webconsole/" +
                 "new-console-output/test/mochitest/test-bug-658368-time-methods.html";

const TEST_URI2 = "data:text/html;charset=utf-8,<script>" +
                  "console.timeEnd('bTimer');</script>";

const TEST_URI3 = "data:text/html;charset=utf-8,<script>" +
                  "console.time('bTimer');</script>";

const TEST_URI4 = "data:text/html;charset=utf-8," +
                  "<script>console.timeEnd('bTimer');</script>";

add_task(async function() {

  let hud1 = await openNewTabAndConsole(TEST_URI);

  await waitFor(() => findMessage(hud1, "aTimer: "));

  // The next test makes sure that timers with the same name, but in separate
  // tabs, do not contain the same value.
  let hud2 = await openNewTabAndConsole(TEST_URI2);

  let errorNode2 = await waitFor(() => findMessage(hud2, "bTimer", ".message.timeEnd.warn"));
  ok(errorNode2, "Timers with the same name but in separate tabs do not contain the same value");

  // The next test makes sure that timers with the same name, but in separate
  // pages, do not contain the same value.
  await BrowserTestUtils.loadURI(gBrowser.selectedBrowser, TEST_URI3);
  
  // There should not be a 'bTimer' message on the output
  async function waitAndSee() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(findMessage(hud2, 'bTimer'));
        }, 500);
    });
  }

  let message = await waitAndSee();
  ok(!message, "Timers with the same name but in separate pages do not contain the same value");
  
  hud2.jsterm.clearOutput();

  // Now the following console.timeEnd() call shouldn't display anything
  // if the timers in different pages are not related.
  await BrowserTestUtils.loadURI(gBrowser.selectedBrowser, TEST_URI4);
  // yield loadBrowser(browser);

  // TODO testLogEntry(hud2.outputNode, "bTimer: timer started",
  //             "bTimer was not started", false, true);
});