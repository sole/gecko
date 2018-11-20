# Getting started

1. [Get and build the code](./build.md). This step takes the longest, so you can complete the following step while your computer does stuff:
1. TODO Get a Bugzilla account (if you don't have one yet).
1. Once you can build Firefox, [configure a development profile](development-profiles.md).
1. Decide what to work on.
    * Choose something from [the list of existing bugs](../bugs-issues.md).
    * Or if you would like to work on something that is not listed there, [file a bug in Bugzilla](https://bugzilla.mozilla.org/enter_bug.cgi?product=DevTools) (you'll need the Bugzilla account you created earlier).
    * Or simply experiment! Change stuff, rebuild and restart, and see what happens. You can look at the [files and directories overview](../files/README.md) for guidance on where things are.
1. Work on the bug. If you get stuck or have questions, [get in touch](https://firefox-dev.tools/#getting-in-touch).
1. [Set up for code reviews](TODO).
1. [Find a suitable reviewer](TODO), and [upload your first patch] for review.
1. If all goes well, your patch will be approved by the reviewer, and they will request it be "landed" into the repository. Congratulations! You have contributed to DevTools 😃

## Levelling up

Once you've contributed a few good patches, it's quite likely that we'll ask you to complete one or more of the following steps. They will grant you access to useful Mozilla infrastructure for testing or landing code automatically (so you can be more autonomous and contribute with less supervision).

1. [Request commit access level 1](TODO). Once this is granted, you can use [the try server](TODO) for running automated tests of your code.
1. When you have checked in a number of patches, you should [request commit access level 3](TODO), which will enable the autoland feature in Phabricator.

If you reach this level, well done! That's amazing, and we're glad to have you on board 😄

## Additional documentation

* [MDN Web Docs](http://developer.mozilla.org/) (also known as *MDN*) has a lot of information about XUL elements, HTML, JS, DOM, Web APIs, Gecko-specific APIs, and more.
* [DXR](http://dxr.mozilla.org/mozilla-central/source/) is a source code search engine - search for symbols you want to learn about, eg. `nsIDocument`. [Searchfox](http://searchfox.org/mozilla-central/source) is an alternative.

It is a good idea to [add smart keyword searches](https://support.mozilla.org/en-US/kb/how-search-from-address-bar) for DXR and MDN, so you can search faster.
