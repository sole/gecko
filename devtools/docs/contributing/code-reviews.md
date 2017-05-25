# Code reviews

This checklist is primarily useful for DevTools reviewers as it lists all points potentially important to check while reviewing code, but it can serve as a set of guidelines for patch authors too.

## Bug status and patch file

* Bug status is assigned, and assignee is correctly set
* Commit title and message follow the convention at: https://developer.mozilla.org/en-US/docs/Mercurial/Using_Mercurial#Commit_Message_Conventions
* Commit message says what is being changed and why as described here: http://mozilla-version-control-tools.readthedocs.org/en/latest/mozreview/commits.html#write-detailed-commit-messages
* Patch applies locally to current sources with no merge required
* Check that every new file introduced by the patch has proper Mozilla license header: https://www.mozilla.org/en-US/MPL/headers/

## Manual testing

* Verify the feature or fix
* Report problems in the global review comment
* Decide which bugs need to block landing the change, and which can be fixed as follow-ups instead

## Automated testing

* Run new/modified tests, with and without e10s
* Watch out for tests that pass but log exceptions or end before protocol requests are handled
* Watch out for slow/long tests: suggest many small tests rather than single long tests

## Code review

* Code changes
 * Review only what was changed by the contributor
 * Code formatting follows [our ESLint rules](eslint.md) and [coding standards](./coding-standards.md)
 * Code makes use of ES features when relevant
 * Code is properly commented, JSDoc is updated, new "public" methods all have JSDoc, see the [comment guidelines](./coding-standards.md#comments)
 * If Promise code was added/modified, the right promise syntax is used, rejection are handled and Tasks are used when possible. See [asynchronous code](./coding-standards.md#asynchronous-code).
 * If a CSS file is added/modified, it follows [the CSS guidelines](./css.md)
 * If a React or Redux module is added/modified it follows the [React/Redux guidelines](./coding-standards.md#react--redux)
 * If devtools server code that should run in a worker is added/modified then it shouldn't use Services
* Test changes
 * The feature or bug is tested by new tests, or a modification of existing tests: https://wiki.mozilla.org/DevTools/Hacking#Writing_Tests
 * Test logging is sufficient to help investigating test failures/timeouts: https://wiki.mozilla.org/DevTools/mochitests_coding_standards#Logs_and_comments
 * Test is e10s compliant (no CPOWs, no content etc...). See: https://wiki.mozilla.org/DevTools/mochitests_coding_standards#E10S_.28Electrolysis.29
 * Tests follow the guidelines at: https://wiki.mozilla.org/DevTools/mochitests_coding_standards#Writing_clean.2C_maintainable_test_code
 * A try push has started (or even better, is green already)
* User facing changes
 * If a new piece of UI or new user interaction is added/modified, then Helen is ui-review? on the bug
 * If a user facing string has been added, it is localized and follows the localization guidelines at: https://wiki.mozilla.org/DevTools/Hacking#Guidelines
 * If a user-facing string has changed meaning, the key has been updated: https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_content_best_practices#Changing_existing_strings
 * If a new image is added, it is a SVG image or there is a reason for not using a SVG
 * If a SVG is added/modified, it follows the guidelines at: https://dxr.mozilla.org/mozilla-central/source/devtools/docs/svgs.md
 * If a documented feature has been modified, the keyword dev-doc-needed is present on the bug

## Finalize the review
* R+: the code should land as soon as possible
* R+ with comments: there are some comments, but they are minor enough, or don't require a new review once addressed, trust the author
* R cancel / R- / F+: there is something wrong with the code, and a new review is required

