# AssetManager

By assets we mean multi-media files, such as 3D models, materials, textures, scenes, custom shaders, music and sound files, and custom fonts. JME3 has an integrated asset manager that helps you keep your project assets organized. Think of the asset manager as the filesystem of your game, independent of the actual deployment platform. By default, store your assets in the `MyGame/assets/ ` directory of your project.

Advantages of the AssetManager:

- The paths stay the same, no matter whether the game runs on Windows, Mac, Linux, etc!
- The AssetManager automatically caches and optimizes the handling of OpenGL objects.
For example, the same textures are not uploaded to the graphics card multiple times when multiple models use them.
- The [default build script](../../sdk/default_build_script.md) automatically bundles the contents of the `assets` directory into the executable.

Advanced users can write a custom build and packaging script, and can register custom paths to the AssetManager, but this is up to you then.

## Context

```

jMonkeyProjects/MyGame/assets/    # You store assets in subfolders here! <------
jMonkeyProjects/MyGame/build/     # SDK generates built classes here (*)
jMonkeyProjects/MyGame/build.xml  # You customize Ant build script here
jMonkeyProjects/MyGame/nbproject/ # SDK stores default build.xml and meta data (*)
jMonkeyProjects/MyGame/dist/      # SDK generates executable distribution here (*)
jMonkeyProjects/MyGame/src/       # You store Java sources here
jMonkeyProjects/MyGame/test/      # You store test classes here (optional)
(*) Managed by jMonkeyEngine SDK -- don't edit!

```

See also [Best Practices](../../tutorials/concepts/best_practices.md).

### Usage

The `assetManager` object is an com.jme3.asset.AssetManager instance that every com.jme3.app.Application can access. It maintains a root that also includes your project's classpath by default, so you can load any asset that's on the classpath, that is, the top level of your project directory.

You can use the inherited `assetManager` object directly, or use the accessor `app.getAssetManager()`.

Here is an example how you load assets using the AssetManager. This lines loads a default Material from the built-in `Common/` directory:

```java
Material mat = (Material) assetManager.loadAsset(
    new AssetKey("Common/Materials/RedColor.j3m"));
```

This Material is "`somewhere`" in the jME3 JAR; the default Asset Manager is configured to handle a `Common/…` path correctly, so you don't have to specify the whole path when referring to built-in assets (such as default Materials).

Additionally, you can configure the Asset Manager and add any path to its root. This means, you can load assets from any project directory you specify. The next example shows how you load assets from your project's assets directory.

### Asset Directory

By default, jME3 searches for models in a directory named `assets`.

:::important
In Java projects created with the jMonkeyEngine SDK, an `assets` folder is created by default in your project directory. If you are using any other IDE, or the command line, you simply create an `assets` directory manually (see the Codeless Project tip below).
:::

This is our recommended directory structure for storing assets:

```

jMonkeyProjects/MyGame/src/...           # Packages, .java source code.
jMonkeyProjects/MyGame/assets/...        # The assets directory:
jMonkeyProjects/MyGame/assets/Interface/   # .font, .jpg, .png, .xml
jMonkeyProjects/MyGame/assets/MatDefs/     # .j3md
jMonkeyProjects/MyGame/assets/Materials/   # .j3m
jMonkeyProjects/MyGame/assets/Models/      # .j3o
jMonkeyProjects/MyGame/assets/Scenes/      # .j3o
jMonkeyProjects/MyGame/assets/Shaders/     # .j3f, .vert, .frag
jMonkeyProjects/MyGame/assets/Sounds/      # .ogg, .wav
jMonkeyProjects/MyGame/assets/Textures/    # .jpg, .png; also .mesh.xml+.material, .mtl+.obj, .blend, .gltf (!)

```

These subdirectories are just the most common examples.

:::important
You can rename/delete/add (sub)directories inside the `assets` directory in any way you like. Note however that there is no automatic refactoring for asset paths in the SDK, so if you modify them late in the development process, you have to refactor all paths manually.
:::

*Examples:* You can rename `assets/Sounds` to `assets/Audio`, you can delete `assets/MatDefs` if you don't use it, you can create `assets/AIscripts`, etc. You can rename/move the `assets/Textures` directory or its subdirectories, but then you have to re-export all models, and re-convert them all to .j3o, so plan ahead!

:::important
Store textures in `assets/Textures/` before you work with them in a mesh editor! Export and save 3D model files (.mesh.xml+.material, .mtl+.obj, .gltf) into the `assets/Textures/` (!) before you convert the model to binary format (.j3o)! This ensures that texture paths correctly point to the `assets/Textures` directory.
After the conversion, you move the .j3o file into the `assets/Models/` or `assets/Scenes/` directories. This way, you can reuse textures, your binaries consistently link the correct textures, and the `assets/Models` and `assets/Scenes` directories don't become cluttered.
:::

### Example Code: Loading Assets

Creating a material instance with the definition "`Unshaded.j3md`":

```java

Material mat_brick = new Material(
    assetManager, "Common/MatDefs/Misc/Unshaded.j3md");

```

Applying a texture to the material:

```java

mat_brick.setTexture("ColorMap",
    assetManager.loadTexture("Textures/Terrain/BrickWall/BrickWall.jpg"));

```

Loading a font:

```java

guiFont = assetManager.loadFont("Interface/Fonts/Default.fnt");

```

Loading a model:

```java

Spatial ninja = assetManager.loadModel("Models/Ninja/Ninja.mesh.xml");

```

Loading a scene from an Ogre3D dotScene file stored inside a zip:

```java

assetManager.registerLocator("town.zip", ZipLocator.class);
Spatial scene = assetManager.loadModel("main.scene");
rootNode.attachChild(scene);

```

Alternatively to ZipLocator, there is also a HttpZipLocator that can stream models from a zip file online:

```java

assetManager.registerLocator("https://storage.googleapis.com/"
    + "google-code-archive-downloads/v2/code.google.com/"
    + "jmonkeyengine/wildhouse.zip", HttpZipLocator.class);
Spatial scene = assetManager.loadModel("main.scene");
rootNode.attachChild(scene);

```

jME3 also offers a ClasspathLocator, ZipLocator, FileLocator, HttpZipLocator, and UrlLocator (see `com.jme3.asset.plugins`).

:::important
The custom build script does not automatically include all ZIP files in the executable build. See "`Cannot Locate Resource`" solution below.
:::

### Common AssetManager Tasks
| Task? | Solution!<br /> |
| --- | --- |
| Load a model with materials | Use the asset manager's `loadModel()` method and attach the Spatial to the rootNode.<br />[source,java]<br />----<br />Spatial elephant = assetManager.loadModel("Models/Elephant/Elephant.mesh.xml");<br />rootNode.attachChild(elephant);<br />----<br /><br />[source,java]<br />----<br />Spatial elephant = assetManager.loadModel("Models/Elephant/Elephant.j3o");<br />rootNode.attachChild(elephant);<br />----<br /><br /> |
| Load a model without materials | If you have a model without materials, you have to add a default material to make it visible.<br />[source,java]<br />----<br />Spatial teapot = assetManager.loadModel("Models/Teapot/Teapot.obj");<br />Material mat = new Material(assetManager, "Common/MatDefs/Misc/ShowNormals.j3md");<br />teapot.setMaterial(mat);<br />rootNode.attachChild(teapot);<br />----<br /><br /> |
| Load a scene | You load scenes just like you load models:<br />[source,java]<br />----<br />Spatial scene = assetManager.loadModel("Scenes/house/main.scene");<br />rootNode.attachChild(scene);<br />----<br /><br /> |

### NullPointerException: Cannot locate resource?

*Problem:*

My game runs fine when I run it right from the jMonkeyEngine SDK. But when I run the stand-alone executables (.jar, .jnlp .exe, .app), a DesktopAssetManager error message occurs in the console, and it quits?

```
com.jme3.asset.DesktopAssetManager loadAsset
WARNING: Cannot locate resource: Scenes/town/main.scene
com.jme3.app.Application handleError
SEVERE: Uncaught exception thrown in Thread[LWJGL Renderer Thread,5,main]
java.lang.NullPointerException

```

*Reason:*

If you use the default build script, *original models and scenes (.mesh.xml, .obj, gltf, .zip), are excluded* from the distribution automatically. A stand-alone executable includes converted *.j3o files* (models and scenes) only. The default build script makes sure to bundle existing .j3o files in the distribution, but you need to remember to convert the models (from mesh.xml`long-arrow-right`.j3o, or .obj`long-arrow-right`.j3o, etc) yourself.

*Solution*

Before building the executable, you must use the jMonkeyEngine SDK's context menu action to [convert 3D models to .j3o binary format](../../sdk/model_loader_and_viewer.md).

1. Save your original models (.mesh.xml, .scene, .gltf, or .obj files, plus textures) into `assets/Textures/`. (!)
1. Open the jME3 project in the jMonkeyEngine SDK.
1. Browse to the `assets` directory in the Projects window.
1. Right-click an original model in `assets/Textures/`, and choose "`Convert to JME3 binary`".
1. The converted file appears in the same directory as the original file. It has the same name and a `.j3o` suffix.
1. Move the .j3o file into the `assets/Models/` or `assets/Scenes/` directory.
1. Use the assetManager's `load()` method to load the `.j3o` file.

This ensures that the model's Texture paths keep working between your 3D mesh editor and JME3.

:::important
If you must load custom assets from a non-.j3o ZIP file, you must manually amend the [default build script](../../sdk/default_build_script.md) to copy ZIP files into your distribution. ZIPs are skipped by default.
:::

### Asset Handling For Other IDEs: Codeless Projects

*Problem:*

I use another IDE than jMonkeyEngine SDK for coding (Eclipse, IntelliJ, text editor). Where is my `asset` folder and .j3o converter?

*Solution:*

You can code in any IDE, but you must create a so-called codeless project in the jMonkeyEngine SDK to maintain assets. *A code-less jMonkeyEngine project does not meddle with your sources or custom build scripts.* You merely use it to convert models to .j3o binaries.

1. Create your (Eclipse or whatever) project as you like.
1. Create a directory in your project folder and name it, for example, `assets`.
Store your assets there as described above.
1. Download and install the jMonkeyEngine SDK.
1. In the SDK, go to `"File &gt; Import Projects&gt;External Project Assets"`.
1. Select your (Eclipse or whatever) project and your assets folder in the Import Wizard.
1. You can now open this (Eclipse or whatever) project in the jMonkeyEngine SDK.
Convert assets as described above.

:::important
If you don't use the SDK for some reason, you can still convert models to j3o format: Load any model in Ogre3D or Wavefront format with the AssetManager.loadModel() as a spatial. Then save the spatial as j3o file using [BinaryExporter](../export/save_and_load.md).
:::

:::tip
Use file version control and let team members check out the project. Your developers open the project in Eclipse (etc) as they are used to. Additionally to their graphic tools, ask your graphic designers to install the jMonkeyEngine SDK, and to check out the codeless project that you just prepared. This makes it easy for non-coding team member to browse and preview game assets, to arrange scenes, and to convert files. At the same time, non-coders don't accidentally mess with code, and developers don't accidentally mess with assets. :)
:::
