# Building JME3 from Sources in Netbeans 8.x

You are welcome to try out the new jME3, and contribute patches and features! This document shows how to download, set up, build, and run the latest development version from the sources. These instructions work in NetBeans IDE 8.x or better.

.Prerequisites
1. Have a [GitHub account](https://github.com/).
1. Are a jMonkeyEngine project member.

If you are not a member, you fork the repository into your GitHub account and issue pull requests from there.

To fork the jMonkeyEngine repository into your GitHub Account:

1. Navigate to [https://github.com/jMonkeyEngine/jmonkeyengine](https://github.com/jMonkeyEngine/jmonkeyengine).
1. In the menu at the top of the page, select the icon:code-fork[]*Fork* button.

:::note
In the following, always replace `~` with the path to your home directory.
:::

## Downloading the Sources

Clone the sources from the repository.

1. In NetBeans, go to `"Team &gt; Git&gt;Clone"`.
  1. Repository &lt;abbr title="Uniform Resource Locator"&gt;URL&lt;/abbr&gt;:

--
```
https://github.com/jMonkeyEngine/jmonkeyengine
```

:::important
Use the &lt;abbr title="Uniform Resource Locator"&gt;URL&lt;/abbr&gt; to your repository fork and clone your fork if a non-member and you wish to contribute.
:::

--

  1. You can leave user/pw blank for anonymous access unless you are going to `push` a `commit`.
  1. Specify Destination Folder. +
Local Folder: `~/NetBeansProjects]/jmonkeyengine`
  1. Click **Next**.
1. Select:
- [x] master*
  1. Click **Next**.
1. Verify the auto-fill information in the `Destination Directory` dialog is correct.
  1. Optional:
- [ ] Scan for NetBeans Projects after Clone
  1. Click **Finish** and wait.

After some time the download will end.

## Information on Pull/Pushing Commits

You now have a local copy of the `jmonkeyengine` repository. There are a few rules you need to follow in order to contribute.

.Members & Non-Members Pull/Push
Update your local copy and push commits by using the NetBeans command `"Git &gt; Remote&gt;Pull From Upstream"` or `"Git &gt; Remote&gt;Push To Upstream"`. Members will be pushing/pulling to/from the jMonkeyEngine repo and non-members to/from their fork of the jMonkeyEngine repo.

.Non-Members
To update *your fork* on GitHub:

1. Go to your version of the repository on GitHub.
1. Click the **New Pull Request** button at the top.
1. Note that the jMonkeyEngine repository will be on the left and your repository will be on the right.

--
From here, there are two options for updating your fork.

.Option A
  1. Click the **Base Fork** button and from the drop down menu select your forked repository.
  1. Select the `_&lt;u&gt;compare across forks&lt;/u&gt;_` link.
  1. Click the **Head Fork** button and from the drop down list select "`jMonkeyEngine/jmonkeyengine`".

.Option B
  1. Select the `_&lt;u&gt;switching the base&lt;/u&gt;_` link.
--
1. Click the green button **Create pull request**.
1. Give a succinct and informative title, in the comment field give a short explanation of the changes and click the green button **Create pull request** again.
1. Select **Rebase And Merge** from the drop down menu.
1. Press the **Rebase And Merge** button again to confirm your choice.

To submit changes to the jMonkeyEngine repository after pushing them to *your fork*:

1. Go to your version of the repository on GitHub.
1. Click the **New Pull Request** button at the top.
1. Note that the jMonkeyEngine repository will be on the left and your repository will be on the right.
1. Click the green button **Create pull request**.
1. Give a succinct and informative title, in the comment field give a short explanation of the changes.
1. Click the green button **Create pull request** again to submit the request.

.Everyone
:::note
See  [How to contribute to jMonkeyEngine](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/CONTRIBUTING.md) before submitting a P/R.
:::

## Verify Cloned Subprojects

Look into the `Subprojects` node and confirm that the subprojects cloned:

- jme3-android
- jme3-android-native
- jme3-blender
- jme3-bullet
- jme3-bullet-native
- jme3-bullet-native-android
- jme3-core
- jme3-desktop
- jme3-effects
- jme3-examples
- jme3-ios
- jme3-jbullet
- jme3-jogg
- jme3-jogl
- jme3-lwjgl
- jme3-lwjgl3
- jme3-networking
- jme3-niftygui
- jme3-plugins
- jme3-terrain
- jme3-testdata
- jme3-vr

For a detailed description of the separate jar files see [this list](jme3_source_structure.md#structure-of-jmonkeyengine3-jars).

## Build the Project and Run a Sample App

:::caution
When you build the engine from the root node, part of the build process includes building the header files for the jme3-bullet-native subproject. This updates the timestamp on the header files, even though you did not edit them. This will then mark them as modified, which will add them to your next commit.

To prevent them from being committed, before you do anything else:

1. In the Projects window, open the `jme3-bullet-native` subproject node.
1. Navigate to the `Source Packages/&lt;default package&gt;` folder.
1. Select all `.h` header files to highlight them.
1. **RMB** select the highlighted files then choose `"Git &gt; Ignore&gt;Exclude From Commit"`
:::

1. **RMB** select the `jmonkeyengine` project root node and `Clean and Build` the project.
1. In the Projects window, **RMB** select and then open the `jme-examples` node which contains the sample apps. You do this for any subproject you wish to make changes to.
1. Every file in the `Source Packages` folder with a Main class (for example `jme3test.model/TestHoverTank.java` or `jme3test.games/CubeField.java`) is an app.
1. Right-click a sample app and choose "`Run File`" (Shift-F6).
1. Generally in sample apps:
  1. the mouse and the WASD keys control movement
  1. the Esc key exits the application

:::tip
You can **RMB** select the `jme-examples` node and select `Run` to start the `Test Chooser` app whether or not you open the project node.
:::

## Optional: Javadoc Popups and Source Navigation in NetBeans

If you are working on the jmonkeyengine sources:

1. Confirm in the Files window that the javadoc has been created in `~/NetBeansProjects/jmonkeyengine/dist/javadoc`
1. In the editor, place the caret in a jme class and press `ctrl`-`space` to view javadoc.

If you are working on a game project that depends on jmonkeyengine:

1. In the jmonkeyengine source:
  1. **RMB** selecting a subproject node and choosing `"Tasks &gt; install"` will install the built jars for that subproject into your local maven repositories `org.jmonkeyengine` folder, which on linux is ~/.m2, and on Windows might be in AppData, or in your home directory.
  1. **RMB** selecting the root node and choosing `"Tasks &gt; dist"` creates a jME3 examples distribution with all jme3 binaries, javadoc and external libraries under `~/NetBeansProjects/jmonkeyengine/dist`.
  1. **RMB** selecting the root node and choosing `"Tasks &gt; libDist"` builds and copies the engine binaries and sources to `~/NetBeansProjects/jmonkeyengine/build/libDist`.
  1. **RMB** selecting the root node and choosing `"Tasks &gt; copyLib"` copies the engine dependencies to `~/NetBeansProjects/jmonkeyengine/build/libDist/lib-ext`.
1. In your game project, add the jme3 jar by **RMB** selecting the Libraries node and selecting **Add Jar/Folder**.
1. Navigate to the folder of choice and select the library jar you're interested in.  Check "`as relative path`" and click **Open** .
1. **RMB** select the newly added jar and choose "`Edit`".
1. In the `Edit Jar Reference` dialog, `JavaDoc:` **Browse** to the `javadoc/` folder of choice. Check "`as relative path`" and click **Open** .
1. In the `Edit Jar Reference` dialog, `Sources:` **Browse** to the folder of choice that contains your sources. Check "`as relative path`" and click **Open**.
1. In the editor, place the caret in a jme class and press `ctrl`-`space` to view javadoc. Ctrl-click any jme3 method to jump to its definition in the sources.

This tip works for any third-party JAR library that you use. (You may have to download the javadoc/sources from their home page separately).

---

Sources used: [https://github.com/jMonkeyEngine/jmonkeyengine](https://github.com/jMonkeyEngine/jmonkeyengine)
