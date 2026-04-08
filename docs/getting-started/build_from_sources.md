# Building jMonkeyEngine 3 from the Sources

## Foreword

Please understand that this tutorial gives you access to the latest development release of the engine. Whilst many developers use this release to work with, it is by definition still being developed. Expect bleeding edge implementations to need work. If you don’t want that kind of hassle, please use the [stable releases](maven.md).

## Build jMonkeyEngine from Github source.

Here is the basic outline of our goal:

1. Install git client.
1. Download jMonkeyEngine using git-client.
1. Update jMonkeyEngine using git-client.
1. Build jMonkeyEngine locally using gradle.

Repeat steps 3 and 4 whenever any changes have been committed to the master branch.

1. Install Git Client:
website: [https://git-scm.com/downloads](https://git-scm.com/downloads)

Now we need to get the engine source using the git client and build it locally. There are 3 batch files below provided for convenience (download, update, build) and can all be placed in the same directory and run without administrator privileges. For example, you can put all of these files into `D:\programming\` - and the scripts will create, download and update files in the `./jmonkeyengine/` sub-directory.

[start=2]
1. Download the Engine: `download.bat`
 This file downloads the engine into a dir called "`jmonkey`" using the git client.
1. Update the Engine: `update.bat`
 This file downloads any changed files from github using the git client.
1. Build the Engine: `build.bat`
 This file builds the engine using the gradle wrapper and places them in your local repository.

--
:::note
This is USER-SPECIFIC. My files are stored in `C:\Users\James\.m2\repository`
:::

.download.bat
```
@echo off
echo "downloading engine..."
git clone -b master --single-branch --depth 10 https://github.com/jMonkeyEngine/jMonkeyEngine/ jmonkeyengine
```

.build.bat
```
@echo off

echo "Building JME engine to your local maven repo...."
cd jmonkeyengine
gradlew.bat -PbuildJavaDoc=true install
cd ..

cmd /k
```

.update.bat
```
@echo off
cd jmonkeyengine
git pull
cd ..
cmd /k
```

--

## Using the built engine in your game

Add the maven plugin to your build script, and put the mavenLocal() repository in your list of repositories. Then just reference the dependencies as you would normally. Note that we are now using version 3.3.+ of the engine.

```
apply plugin: 'maven'

ext.jmeVersion = "[3.3,)"

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    compile "org.jmonkeyengine:jme3-core:$jmeVersion"
    compile "org.jmonkeyengine:jme3-desktop:$jmeVersion"
    compile "org.jmonkeyengine:jme3-lwjgl:$jmeVersion"
}
```

For a detailed description of the separate jar files see [this list](jme3_source_structure.md#structure-of-jmonkeyengine3-jars).

Learn more about:

- [Setting up JME3 on the commandline (generic)](simpleapplication_from_the_commandline.md).
- [Building JME3 from the sources with NetBeans](build_jme3_sources_with_netbeans.md)
