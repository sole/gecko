/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

/**
 * Tests that params view correctly displays all properties for nodes
 * correctly, with default values and correct types.
 */

var MEDIA_PERMISSION = "media.navigator.permission.disabled";

function waitForDeviceClosed() {
  info("Checking that getUserMedia streams are no longer in use.");

  const temp = {};
  ChromeUtils.import("resource:///modules/webrtcUI.jsm", temp);
  const webrtcUI = temp.webrtcUI;

  if (!webrtcUI.showGlobalIndicator) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const message = "webrtc:UpdateGlobalIndicators";
    Services.ppmm.addMessageListener(message, function listener(aMessage) {
      info("Received " + message + " message");
      if (!aMessage.data.showGlobalIndicator) {
        Services.ppmm.removeMessageListener(message, listener);
        resolve();
      }
    });
  });
}

add_task(async function() {
  const { target, panel } = await initWebAudioEditor(MEDIA_NODES_URL);
  const { panelWin } = panel;
  const { gFront, $, $$, EVENTS, PropertiesView } = panelWin;
  const gVars = PropertiesView._propsView;

  // Auto enable getUserMedia
  const mediaPermissionPref = Services.prefs.getBoolPref(MEDIA_PERMISSION);
  Services.prefs.setBoolPref(MEDIA_PERMISSION, true);

  await loadFrameScriptUtils();
dump("\nSOLE!1\n");
  const events = Promise.all([
    getN(gFront, "create-node", 4),
    waitForGraphRendered(panelWin, 4, 0),
  ]);
dump("\nSOLE!2\n");
  reload(target);
dump("\nSOLE!3\n");
  const [actors] = await events;
dump("\nSOLE!4\n");
  const nodeIds = actors.map(actor => actor.actorID); // SOLE: could the nativeToActorID is null message come from here?

dump("\nSOLE!5\n");
  const types = [
    "AudioDestinationNode", "MediaElementAudioSourceNode",
    "MediaStreamAudioSourceNode", "MediaStreamAudioDestinationNode",
  ];

  const defaults = await Promise.all(types.map(type => nodeDefaultValues(type)));

dump("\nSOLE!6\n");
  for (let i = 0; i < types.length; i++) {
    click(panelWin, findGraphNode(panelWin, nodeIds[i]));
dump("\nSOLE!7 - " + i + "\n");
    await waitForInspectorRender(panelWin, EVENTS);
dump("\nSOLE!8 - " + i + "\n");
    checkVariableView(gVars, 0, defaults[i], types[i]);
dump("\nSOLE!9 - " + i + "\n");
  }

dump("\nSOLE!10\n");
  // Reset permissions on getUserMedia
  Services.prefs.setBoolPref(MEDIA_PERMISSION, mediaPermissionPref);

dump("\nSOLE!11\n");
  await teardown(target);

dump("\nSOLE!12\n");
  await waitForDeviceClosed();
dump("\nSOLE!13\n");
});