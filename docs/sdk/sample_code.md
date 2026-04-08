# jMonkeyEngine SDK: Sample Code

You can run example code by opening an included JME3Tests project and included assets. You can also search the built-in documentation or drag and drop code snippets from the Palette in the SDK to get short code sample.

## Code Palette and Samples in the SDK

- Type a keyword into the search box in the SDK or press `F1` to search the built-in help for sample code.
- [SDK code editor and palette](code_editor.md)

## The JME3Tests Project Template

The jMonkeyEngine SDK contains a Test Project with lots of sample code and assets. The Test Project is all set up and ready to run, and it's easy to use for beginners (no need to mess with classpaths or libraries).

1. Install and Open the jMonkeyEngine [SDK](sdk.md).
1. Go to `"File &gt; New Project"`.
1. In the New Project Wizard, select `JME3 Tests` from the `JME3` category. Click `**Next**`.
1. Specify a location, e.g. create a jMonkeyProjects directory in your home directory. Click `**Finish**`.

This default project template creates a project called `JmeTests`. It contains all test classes and examples from the jme3 source repository. Feel free to modify the code samples and experiment! In the unlikely event that you should break the project, `smiley` you can always recreate all packaged samples by creating another project from the New Project wizard's `JME3 Tests` template.

If you're using the 3.1.0-Stable+ version of the SDK, you will need to set the `Source/Binary Format` from the `Project Properties` window to Java 1.7 or later.

- To change the source, `**RMB**` select the jmeTestProject and then select `"Properties &gt; Sources&gt;Source/Binary Format"`, or from the File menu, with the jmeTestProject selected, `"File &gt; Project Properties&gt;Sources&gt;Source/Binary Format"`.

You will also need to remove the `jme3-jbullet` library and add `jme3-bullet` and `jme3-bullet-native` libraries.

- From the `Project Properties` window select `Libraries` and then the `Compile` tab. Under `Compile-time Libraries` select `jme3-jbullet` and press `**Remove**`. Press `**Add Library**`, select the two libraries `jme3-bullet` and `jme3-bullet-native` while holding `Ctrl` and then press `**Add Library**` and finally `**OK**`.

:::important
Press `Shift` + `F6` to run a class that is open in the editor, or `**RMB**` a class in the Project window and choose `**Run File**`. You can run the `TestChooser` app by `**RMB**` selecting the project and pressing `**Run**`. The TestChooser app allows you to easily navigate through all the test cases.
:::

## JME3TestData Assets

You may want access to some sample assets, such as 3D models or textures, in one of your projects. A common situation for this would be while going through the [beginner tutorials](../tutorials/beginner/beginner.md).

1. **RMB** select an existing jME3 project in the [SDK](sdk.md), and select Properties.
1. In the Properties window, select the `Libraries` section. Go to the `Compile` tab, it contains `Compile-time Libraries`.
1. Click the **Add Library** button and select the pre-defined `jme3-test-data`. Click **OK**.
1. Click **OK** to save and close the Properties.

The project's assetManager now has access to sample files from the `jme3-test-data.jar` file. This JAR library contains

- Ogre XML Models: Ninja.mesh.xml, Oto.mesh.xml, HoverTank.mesh.xml, Sinbad.mesh.xml, and many more
- Blender models
- Materials and Textures
  - Terrain, sky, rock, brick, pond…
  - Particle effect textures

- Sounds
- And more…

## AssetPacks

![assetpackbrowser-300x166.jpg](/wiki-assets/docs/sdk/images/assetpackbrowser-300x166.jpg)

If you need sample 3D models, don't miss the opportunity to download our community-provided [Asset Packs](asset_packs.md)!

In the SDK:

- Open the AssetPackBrowser from the Windows menu
- In the AssetPackBrowser, click the Online AssetPacks button
- Click **Install** on the AssetPack of your choice. The SDK downloads it and makes the assets accessible in your AssetPack Library.
- Click the **View Library** button and open the Assets node.
- **RMB** select an asset to
  - Preview it
  - Add it to the SceneComposer
  - Add it to a game project's assets directory
