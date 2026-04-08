# Setting up JME3 in Netbeans 8.x

For development with the jMonkeyEngine 3, we recommend to use the jMonkeyEngine [SDK](../sdk/sdk.md).

Alternatively, you can use your favorite IDE: In this tutorial we show how to download and set up the latest nightly build of the jMonkeyEngine 3 for use with the NetBeans IDE. Instructions for [Eclipse](setting_up_jme3_in_eclipse.md) are also available.

:::important
Note that the jMonkeyEngine SDK is built in top of the NetBeans Platform, and is identical to the NetBeans IDE for Java (plus some unique NetBeans plugins). Basically it's redundant and unnecessary to set up jME for NetBeans – but if you want to, it's easily possible.
:::

## Downloading jME3

The currently available JAR binaries are the nightly builds.

1. Download the most recent zipped build from [https://github.com/jMonkeyEngine/jmonkeyengine/releases](https://github.com/jMonkeyEngine/jmonkeyengine/releases)
1. Unzip the file and save it as `jME3.2-stable` in your NetBeansProjects directory. You should see the following files and directories:
  1. `lib/` - The jMonkeyEngine binaries and libraries. (Don't remove.)
  1. `jMonkeyEngine3.jar` – Run this executable jar file to see various feature demos. (optional)
  1. `javadoc/` - jME3 &lt;abbr title="Application Programming Interface"&gt;API&lt;/abbr&gt; documentation. (optional)
  1. `sources/` - jME3 source files. (optional)

## Creating a Project

In NetBeans, choose `"File &gt; New Project"`, select `"Java &gt; Java Application"`, click **Next**.

- Project Name: HelloJME3
- Project Location: ~/NetBeansProjects
- Create main() Class: Yes
- Click **Finish**

The new project appears in the Projects window.

## Setting up Dependencies

Your project depends on the jMonkeyEngine libraries and needs to know where they are. We will create a global library so you can use it for other projects without having to re-configure everything. You only do this one time.

1. In the Projects window of the HelloJME3 project, **RMB** click the project's `Libraries` node and choose `Add Library`.
1. In the `Add Library` dialog, click the **Create** button.
1. For the `Library Name` enter "`jME3.2-stable`".
1. For the `Library Type` select `Class Libraries`.
1. Click **OK** and the `Customize Library` dialog will open.
1. In the `Classpath` tab, click the **Add Jar/Folder** button and navigate to the `lib/` directory located in your `~/NetBeansProjects/jME3.2-stable` folder.
1. Select all JARs in `lib/` and when done click the **Add Jar/Folder** button.
- Optional: Configuring the `Source File`  editor for NetBeans.
  - In the `Sources` tab, click the **Add Jar/Folder** button and navigate to the `sources/` directory located in your `~/NetBeansProjects/jME3.2-stable` folder.
  - Select all JARs in `sources/` and when done click the **Add Jar/Folder** button.
- Optional: Configuring the JavaDoc Popups in NetBeans. 
  - In the `Javadoc` tab, click the **Add ZIP/Folder** button and navigate to the `javadoc/` folder located in your `~/NetBeansProjects/jME3.2-stable` folder.
  - Select the `javadoc/` folder but do not enter the directory, the `File Name` will change to `javadoc`. Click the **Add ZIP/Folder** button to close the dialog.
1. Click the **OK** button, next click the **Add Library** to create the library.

The necessary libraries are now on the classpath and should appear in the Libraries list. You now have a global library you can add to any project.

:::note
If you configured your library with sources and javadocs, open a class of your HelloJME3 project, place the caret into a jme3 class, and press `Ctrl` + `Space` to see the javadoc popup, as well as code-completion.

To open the source file editor, **RMB** click on any jME3 class or method, then select `"Navigate &gt; Go To Source"`.
:::

## Build & Run Tips in NetBeans

How to build and run in NetBeans:

- Clean and build the whole project by pressing `Shift` + `F11`.
- Run any file that is open in the editor and has a main() class by pressing `Shift` + `F6`.
- Run the Main class of the project by pressing `F6`.

Tips for configuring the main class in NetBeans:

- **RMB** select the HelloJME3 project and choose "`Set as main project`". Now you can use the toolbar buttons (clean&build, run, debug, etc) to control this project.
- **RMB** select the HelloJME3 project and choose `Properties`. Go to the `Run` section.
  - Under Main Class, specify the class that will be executed when you run the whole project. For now, enter `hellojme3.HelloJME3`.

## Writing a SimpleApplication

You can now continue to write [your first jme3 application](../tutorials/beginner/hello_simpleapplication.md)!
