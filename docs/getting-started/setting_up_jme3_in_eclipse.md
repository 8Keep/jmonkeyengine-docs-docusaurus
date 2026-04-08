# Setting up JME3 in Eclipse

For development with the jMonkeyEngine 3, we recommend to use the jMonkeyEngine SDK.

Alternatively, you can use your favorite IDE: In this tutorial we show how to download and set up the latest nightly build of the jMonkeyEngine 3 for use with the Eclipse IDE. Instructions for [NetBeans IDE](setting_up_netbeans_and_jme3.md) are also available.

## Downloading jME3

The currently available JAR binaries are the nightly builds.

1. Download the most recent zipped build from [https://github.com/jMonkeyEngine/jmonkeyengine/releases](https://github.com/jMonkeyEngine/jmonkeyengine/releases)
1. Unzip the file and save it as `jME3.2-stable` in your home directory ($HOME). You should see the following files and directories:
  - `lib/` – The jMonkeyEngine binaries, and libraries used by the jMonkeyEngine. (Don't remove)
  - `jMonkeyEngine3.jar` – Run this to see various feature demos. (optional)
  - `javadoc/` – jME3 &lt;abbr title="Application Programming Interface"&gt;API&lt;/abbr&gt; documentation. (optional)

## Creating a New Game Project

- In Eclipse, choose `"File &gt; New&gt;Java Project"`
- Project Name: `HelloJME3`
- Click **Finish**

The new project appears in the Explorer.

## Setting up Dependencies

Your project depends on the jMonkeyEngine libraries and needs to know where they are.

1. Right-click the project in the explorer and choose `"Build Path &gt; Add External Archives"`
1. In the "`JAR`" selection dialog, browse to the `$HOME/jME3.2-stable` directory.
1. Select all JARs in the `lib` directory and click Open.

All necessary JAR libraries are now on the classpath and should appear in the Referenced Libraries list.

For a detailed description of the separate jar files see [this list](jme3_source_structure.md#structure-of-jmonkeyengine3-jars).

## Setting up Assets

The easiest way to make sure the asset manager can access the assets is by adding the assets folder to the classpath.

1. Go to `Project Properties`
1. Select `Java Build Path`
1. Under the `Source` tab click **Add Folder**
1. Add your Assets folder

## Writing a Simple Application

1. From the menu call `"File &gt; New&gt;New Package"`. Name the src package for example `hello`.
1. From the menu call `"File &gt; New&gt;Class"`.
  - Select package `hello`.
  - Name the class for example `MyGame`.
  - Superclass: `com.jme3.app.SimpleApplication`
  - Make sure that the checkbox to `Create the main() Method` is active.
  - Make sure that the checkbox to `Inheriting Abstract Methods` is active.
  - Click **Finish**.

You can now continue to write [your first jme3 application](../tutorials/beginner/hello_simpleapplication.md)!
