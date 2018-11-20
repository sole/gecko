# Set up to build Firefox Developer Tools

Since the tools are part of Firefox, we need to get and build Firefox's source code.

These are the steps we're going to look at:

* [Installing Mercurial](#installing-mercurial)
* [Getting the code](#getting-the-code)
* [Building and running locally](#building-and-running-locally)
  * [Rebuilding](#rebuilding)
  * [Artifact builds](#building-even-faster-with-artifact-builds) for even faster builds
  * [Maybe you don't even need to build](#maybe-you-dont-even-need-to-build)

## Installing Mercurial

Firefox's source code is hosted on [a Mercurial repository](https://hg.mozilla.org/mozilla-central/).

Please [install Mercurial](https://www.mercurial-scm.org/) if it's not already installed in your system. Its website provides [files for downloading](https://www.mercurial-scm.org/downloads) and also instructions for the most popular package managers. For example, if using Homebrew:

```bash
brew install mercurial
```

Or in Debian/Ubuntu Linux with apt-get:

```bash
apt-get install mercurial
```

## Getting the code

This will take a long time, because the repository is **B&nbsp;&nbsp;I&nbsp;&nbsp;G** (Firefox is more than 10 years old and there are lots of commits every day!). So please be patient.

```bash
hg clone http://hg.mozilla.org/mozilla-central
```

## Building and running locally

Although DevTools is written in JavaScript, the core of Firefox is not—we need tools such as compilers to build the C/C++/Rust code and turn it into binaries that our computer can run.

If you're a web developer, you might not be familiar with these tools, but fortunately, the Firefox team has made a very good job of automating the process of installing them with bootstrap scripts, and putting [documentation](https://developer.mozilla.org/docs/Mozilla/Developer_guide/Build_Instructions/Simple_Firefox_build) together.

Try building Firefox and downloading dependencies by running the following commands:

```bash
./mach bootstrap
./mach configure
./mach build
```

**Note:** if using Windows, you might need to type the commands without the `./`:

```bash
mach bootstrap
mach configure
mach build
```

The bootstrap step in particular might ask you questions, so it's recommended to keep an eye on the terminal while it's running—otherwise it will never finish!

If your system needs additional dependencies installed (for example, Python, or a compiler, etc),the command might fail and various diagnostic messages will be printed to your screen. Follow their advice and then try running the command that failed again, until the three of them complete successfully.

Some error messages can be quite cryptic. It is a good idea to consult the [documentation](https://developer.mozilla.org/docs/Mozilla/Developer_guide/Build_Instructions/Simple_Firefox_build) specific to the platform you're using. Sometimes searching in the internet for the specific error message you get can help, and you can also [get in touch](https://firefox-dev.tools/#getting-in-touch) if you get stuck.

Once you complete a first successful build, you should be able to build again by running only this command:

```bash
./mach build
```

By the way, building takes a long time (specially on slow computers).

### Running your own compiled version of Firefox

To run the Firefox you just compiled:

```bash
./mach run
```

This will run using an empty temporary profile which is discarded when you close the browser. We will look more into [persistent development profiles later](./development-profiles.md). But first...

⭐️  **Time for some congratulations!** You managed to get Firefox's code, build tools and dependencies, and just run your very own copy of Firefox! Well done! ⭐   ️ 

### Rebuilding

Suppose you pulled the latest changes from the remote repository (or made some changes, to experiment and see what happens) and want to build again.

You can ask the `mach` script to build only changed files:

```bash
./mach build faster
```

This should be faster (a matter of seconds).

Sometimes, if you haven't updated in a while, you'll be told that you need to *clobber*, or basically delete precompiled stuff and start from scratch, because there are too many changes. The way to do it is:

```bash
./mach clobber
./mach build
```

### Building even faster with artifact builds

It is unusual to modify C/C++ code when working on DevTools. This means that we can use *artifact builds*. This method downloads prebuilt binary components, and then the build process becomes faster.

Create a file on the root of the repository, called `mozconfig`, with the following content:

```bash
# Automatically download and use compiled C++ components:
ac_add_options --enable-artifact-builds
 
# Write build artifacts to:
mk_add_options MOZ_OBJDIR=./objdir-frontend
```

And then you can follow the normal build process again (only *faster*!)

**Note**: On MacOS you might want to use `MOZ_OBJDIR=./objdir-frontend.noindex` instead. Using the `.noindex` file extension prevents the Spotlight from indexing your `objdir`, which is slow.

For more information on aspects such as technical limitations of artifact builds, read the [Artifact Builds](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Build_Instructions/Artifact_builds) page.

## Maybe you don't even need to build

Working in DevTools generally involves editing JavaScript files only. This means that often you don't even need to run `./mach build`.

Instead, what you need to do is to save the files you modified, quit Firefox, and reopen it again to use the recently saved files.

With pseudocode:

```bash
# 1. Build
./mach build
# 2. Run
./mach run
# 3. you try out things in the browser that opens
# 4. fully close the browser, e.g. ⌘Q in MacOS
# 5. edit JS files on the `devtools` folder, save
# 6. Back to step 2!
./mach run
```

While not as fast as the average "save file and reload the website" *web development workflow*, or newer workflows such as React's reloading, this can still be quite fast.

And certainly faster than building each time, even with artifact builds.
