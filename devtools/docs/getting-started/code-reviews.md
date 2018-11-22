# Set up for code reviews

A review is required before code is added to Mozilla's repository. In addition, contrary to what you might have seen in other open source projects, developers at Mozilla don't push directly to the repository; once the code is approved by reviewers they will *request* the code to be landed on the repository.

All this can be done somehow manually, but we have infrastructure in place to help us with reviews and landing code.

**Note**: This page only deals with how to set your machine and an account for reviews. Read the [sending code for reviews](../contributing/making-prs.md) page when you're ready.

## Set up to get code reviews in Phabricator

We use an online tool called phabricator for code reviews. You'll have to [create a Phabricator account](https://moz-conduit.readthedocs.io/en/latest/phabricator-user.html#creating-an-account).

You will need the Bugzilla account that you created earlier. If not, [create one now](./bugzilla.md).

## Set up for sending code for reviews

There are two ways of sending patches (sorry, let us explain!):

* you can use [Arcanist](https://moz-conduit.readthedocs.io/en/latest/arcanist-user.html), which is the official command line tool that accompanies Phabricator, but is not quite attuned to the "Mozilla workflow",
* or you could use [moz-phab](https://moz-conduit.readthedocs.io/en/latest/phabricator-user.html#using-moz-phab), which is a Mozilla-developed wrapper for Arcanist that works around these limitations.

**We recommend you use moz-phab**, but since we moved to this new tool quite recently, you might find bugs (or things that don't feel quite right), in which case you could either [have a look at the existing bugs](https://bugzilla.mozilla.org/buglist.cgi?product=Conduit&component=Review%20Wrapper&resolution=---) to see if someone else has encountered this again, or simply [file a bug](https://bugzilla.mozilla.org/enter_bug.cgi?product=Conduit&component=Review%20Wrapper) using your fancy new Bugzilla account 😀

And you're ready to [send your code for review](../contributing/making-prs.md)!