# jMonkeyEngine SDK: Procedural Textures with NeoTexture

The NeoTextureEditor allows creating tiled textures procedurally using a simple node interface for generating images, blending them, creating normal maps and much more. You can directly load the .tgr files as a material or export the generated images as .png files and use them in a jMonkeyEngine-based game.

Textures usually make up most of the size of a game distribution. This is why NeoTexture is not only an editor, but also a library that generates textures from .tgr files. Use the library to load .tgr files directly in jME3 as a material, without having to export the textures before. This means high-quality textures for your models, but just tiny description files in your distribution.

## Creating and Editing a NeoTexture file

1. Right-click the `assets/Textures` directory and choose New… &gt; Other.
1. In the New File Wizard, choose NeoTexture &gt; Empty NeoTextureFile and click Next.
1. Give the file a name, for example `neoMaterial`.
1. A new file `neoMaterial.tgr` is created in the Textures directory and opens in the NeoTexture Editor.

Edit the .tgr file and create your procedural texture: ([Learn more about creating Procedural Textures here](http://neotextureedit.sourceforge.net/))

1. Drag any pattern from the left bar to the editor area.
1. Right-click the editor area and paste a NormalMap filter node.
1. Connect the green output mark of the pattern with the red input mark of the filter. +This generates a Normal Map that can be used as bump map.

## Adding the NeoTexture libraries to your project

To use NeoTexture tgr files directly in your application, you have to add the NeoTexture libraries to your project:

1. Right-click your project and select "`Properties`"
1. Go to the "`Libraries`" section of the properties window
1. Press "`Add Library`"..
1. Select "`NeoTexture-Libraries`" and press "`add`"

## Loading tgr files as material

We want to use the procedural texture as a material based on `Lighting.j3md` (the default). We know that Lighting.j3md supports DiffuseMap, NormalMap, SpecularMap, and ParallaxMap.

1. Click the Normal Map filter to select it. We want to use it as the Normal Map of the texture.
  1. In the NeoTextures Properties window under `Export name`, enter the name of the texture layer as it would appear in a .j3m file, e.g. "`NormalMap`".

1. Click the pattern to select it. We want to (re)use it as Diffuse Map of the texture.
  1. In the NeoTextures Properties window under `Export name`, enter the name of the texture layer as it would appear in a .j3m file, e.g. "`DiffuseMap`".

1. Click the Save button in the NeoTextures Editor. The .tgr file is saved with two layers. (We could add SpecularMap and ParallaxMap the same way, if we wanted.)

Let's assign the newly created texture to a mesh to see what it looks like.

1. Open your Main.java file.
1. Choose Window→Palette to open the Palette. You will find two NeoTexture code snippets, one for adding the NeoTexture loader to the assetManager, and one for loading a NeoTexture material.
1. Drag&Drop one of each into the simpleInitApp() method of your application.
1. Adjust the .tgr file path names to match the file that we just created: "`Materials/neoMaterial.tgr`".

Clean, build and run. You’re ready to load your procedural material!

```java

assetManager.registerLoader(com.jme3.material.plugins.NeoTextureMaterialLoader.class,"tgr");
NeoTextureMaterialKey key = new NeoTextureMaterialKey("Materials/neoMaterial.tgr");

Material mat = assetManager.loadAsset(key);
mat.setFloat("Shininess",12); /* Lighting.j3md has non-map parameters too that we can set. */
thing.setMaterial(mat);

```

The default Material Definition for NeoTextures is `Lighting.j3md`, and it's probably the one you will use most often. In case that you want to use additional texture parameters, other than DiffuseMap, SpecularMap, ParallaxMap, and NormalMap, you can switch to another Material Definition using setMaterialDef(), for instance:

```java
key.setMaterialDef("Commons/MatDefs/Misc/ColoredTextured.j3md");
```

Remember that the layer names in the .tgr file must match the ones declared in the .j3md file. In our example of `ColoredTextured.j3md`, the .tgr file must contain a `ColorMap` and you need to set a RGBAColor.

## Using tgr files like normal textures in j3m files

You can use the .tgr files like normal textures in j3m files, with a syntax like this:
`Materials/neoMaterial?DiffuseMap.tgr`
The part between the `?` and the suffix is the name of the node you want to load as a texture. If you don't supply a name, `texture` is used.

To be able to load these textures, you have to register a Locator and a Loader in the AssetManager, note that you can only register one loader per extension so you cannot load .tgr files as materials and as textures with the same assetManager.

```java

assetManager.registerLocator("/", com.jme3.texture.plugins.NeoTextureLocator.class );
assetManager.registerLoader(com.jme3.texture.plugins.NeoTextureLoader.class,"tgr");

```
