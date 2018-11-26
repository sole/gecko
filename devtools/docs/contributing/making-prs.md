# Creating and sending patches <!--TODO: (in the future: Making Pull Requests)-->

The process is like this:

* You do your work, locally
* Using a command line tool (`moz-phab`), you upload the code you modified to the online website for reviews (`Phabricator`), requesting a review from the adequate developer(s).
* They will review your changes, and
  * if they're good, they will *approve* your code
     * then, we request the code be *landed* into the repository
  * if there are issues in the code, the reviewer will tell you what and where, and you can work on fixing the issues, or ask for clarifications if you're new to the code, etc, then you send the code again when you think the issues have been addressed

## Creating a patch

To create a patch you need to first commit your changes and then export them to a patch file.

```
hg commit -m 'your commit message'
hg export > /path/to/your/patch
```

## Commit messages

Commit messages should follow the pattern `Bug 1234567 - change description. r=reviewer`.

First is the bug number related to the patch. Then the description should explain what the patch changes. The last part is used to keep track of the reviewer for the patch.

## Submitting a patch

Once you have a patch file, add it as an attachment to the Bugzilla ticket you are working on and add the `feedback?` or `review?` flag depending on if you just want feedback and confirmation you're doing the right thing or if you think the patch is ready to land respectively. Read more about [how to submit a patch and the Bugzilla review cycle here](https://developer.mozilla.org/en-US/docs/Developer_Guide/How_to_Submit_a_Patch).

You can also take a look at the [Code Review Checklist](./code-reviews.md) as it contains a list of checks that your reviewer is likely to go over when reviewing your code.

## Squashing commits

Sometimes you may be asked to squash your commits. Squashing means merging multiple commits into one in case you created multiple commits while working on a bug. Squashing bugs is easy!

We will use the histedit extension for squashing commits in Mercurial. You can check if this extension is enabled in your Mercurial installation following these steps:

* Open `.hgrc` (Linux/OSX) or `Mercurial.ini` (Windows) –this is the default configuration file of Mercurial– located in your home directory, using your favourite editor.
* Then add `histedit= ` under the `[extensions]` list present in file, if not present already.

Then, run the following command:

`hg histedit`

You will see something like this on your terminal:

```
pick 3bd22d1cc59a 0 "First-Commit-Message"
pick 81c4d40e57d3 1 "Second-Commit-Message"
```

These lines represent your commits. Suppose we want to merge `81c4d40e57d3` to `3bd22d1cc59a`. Then replace **pick** in front of `81c4d40e57d3` with **fold** (or simply 'f'). Save the changes.

You will see that `81c4d40e57d3` has been combined with `3bd22d1cc59a`. You can verify this using the `hg log` command.

You can fold as many commits you want, and they will be combined with the first commit above them which does not use fold.
