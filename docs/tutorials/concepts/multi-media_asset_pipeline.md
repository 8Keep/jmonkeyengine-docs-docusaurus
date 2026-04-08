# Multi-Media Asset Pipeline

Assets are files that are not code. Your multi-media assets includes, for example, your textures (image files), models (mesh files), and sounds (audio files).

- You create textures in a graphic editor, for example [Gimp](http://gimp.org), and export them as PNG or JPG.
- You [create models](../how-to/modeling/blender/blender.md) in a 3D mesh editor, for example [Blender](https://www.blender.org), and export them in GLTF, Wavefront OBJ, or any [Supported External File Type](../../getting-started/features.md#supported-external-file-types).
- You create sounds in an audio editor, for example [Audacity](http://audacity.sourceforge.net), and export them as WAVE or OGG.

## Asset Pipeline
<table>
  <thead>
    <tr>
      <th>DO</th>
      <th>DON'T<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Import original models plus textures into `assets/Textures`.</td>
      <td>Don't leave textures or models in a folder outside your JME project: The game cannot load or reference them from there.<br /></td>
    </tr>
    <tr>
      <td>Save sounds into `assets/Sounds`.</td>
      <td>Don't leave audio files in a folder outside your JME project: The game cannot load or reference them from there.<br /></td>
    </tr>
    <tr>
      <td>Create low-polygon models.</td>
      <td>Don't create high-polygon models, they render too slow to be useful in games.<br /></td>
    </tr>
    <tr>
      <td>Only use Diffuse Map, Normal Map, Glow Map, Specular Map in your models' materials.</td>
      <td>Don't use unsupported material properties that are not listed in the [Materials Overview](../../core/material/materials_overview.md).<br /></td>
    </tr>
    <tr>
      <td>Use UV texture / texture atlases / baking for each texture map.</td>
      <td>Don't create models based on multiple separate textures, it will break the model into separate meshes.<br /></td>
    </tr>
    <tr>
      <td>Convert original models to JME3's .j3o format. Move .j3o files into `assets/Models`.</td>
      <td>Don't reference original GLTF/OBJ files in your load() code, because these unoptimized files are not automatically packaged into the final JAR when using the SDK.<br /></td>
    </tr>
    <tr>
      <td>Agree on naming schemes and folder schemes with your artists early on to avoid confusion. E.g. keep naming schemes for bones and certain model parts. Try to keep your assets folder clean, its like your codes class structure.</td>
      <td>Don't mindlessly import downloaded models and other assets into your project without keeping a structure and knowing the files work. You can reimport, delete junk.<br /></td>
    </tr>
  </tbody>
</table>

Read on for details.

## Use The Assets Folder

Store your assets in subfolders of your project's `assets` directory. The `assets` directory is the default path where a JME game's [Asset Manager](../../core/asset/asset_manager.md) looks for files to load.

```

jMonkeyProjects/MyGame/assets/Interface/ # .font, .jpg, .png, .xml
jMonkeyProjects/MyGame/assets/MatDefs/   # .j3md
jMonkeyProjects/MyGame/assets/Materials/ # .j3m
jMonkeyProjects/MyGame/assets/Models/    # .j3o
jMonkeyProjects/MyGame/assets/Scenes/    # .j3o
jMonkeyProjects/MyGame/assets/Shaders/   # .j3f, .vert, .frag
jMonkeyProjects/MyGame/assets/Sounds/    # .ogg, .wav
jMonkeyProjects/MyGame/assets/Textures/  # .jpg, .png; also .mesh.xml+.material, .mtl+.obj,

```

Prepare the `asset` folder structure for your individual project:

1. Agree on a directory structure with the graphic designers.
1. Create subfolders of `assets` in any way that suits your project (see example above). Stick with one system.
  - If different assets belong together, create a parallel subdirectory structure for them. +
Example: For car models, create `Textures/vehicles/car1/`, `Materials/vehicles/car1/`, `Models/vehicles/car1/`, , `Sounds/vehicles/car1/` (etc) directories now.

1. Agree on a file naming and numbering scheme with the graphic designers.
  - Are some assets used interchangeably? Systematic naming and numbering lets developers easily swap out assets by swapping out parts of the path String.
  - Decide on naming standards for naming interactive parts (arms/legs) of animated models.

[Video: Horrible things happen if you mess up labeling your assets. Seriously. ;-)](http://www.youtube.com/watch?v=HFR4socSv_E)

See also:

- More details on [Asset Manager](../../core/asset/asset_manager.md), including tips how to work with assets when using other IDEs.
- Use [Asset Packs](../../sdk/asset_packs.md) to bundle, share, and manage assets!

## Create Textures and Materials

Install a graphic editor such as Gimp or Photoshop. *Consult the graphic editor's documentation for specific details how to do the following tasks.*

1. Create textures in a graphic editor.
  - Save all textures to your prepared subfolders in the `assets/Textures` directory.

1. (Optional) If you plan to use JME materials that you set programmatically from the code, create .j3m materials in the SDK.
  - Save these .j3m files into the `assets/Materials` directory.

Storing the textures inside your project directory is necessary for the paths in JME's binary model files (.j3o) to work. Treat the paths of your assets like class names of java classes, they define a specific asset. When you later generate .j3o files, and compile class files, and distribute the application, all paths and files need to be available in their final, absolute form.

:::important
It is imperative to keep the same directory structure from beginning to end. If you ever change the assets directory structure, you have to do manual refactoring (just as for Java package name changes): Re-export all affected models, regenerate all affected .j3o files, and manually update all affected path Strings in your code.
:::

## Create 3D Models

Install a mesh editor such as [Blender](../how-to/modeling/blender/blender.md) or 3D Studio MAX. Reuse textures and materials as much as possible. *Consult the mesh editor's documentation for specific details how to do the following tasks.*

:::tip
Note that UV coords are part of the mesh and not part of the material, so if you import your mesh successfully, you can later apply the texture again and it will map correctly.
:::

1. Create 3D models in a mesh editor.
  1. Create efficient *low-polygon models*. High-polygon models may look pretty in static 3D art contests, but they slow down dynamic games!
  1. [Create materials](../../core/material/j3m_material_files.md) for your models either in the 3D editor, or in the jME3 SDK. Only use the following material features: *Diffuse Map or Diffuse Color (minimum); plus optionally Normal Map, Glow Map, Specular Map.* +
Every material feature not listed in the [Materials Overview](../../core/material/materials_overview.md) is unsupported and ignored by JME3's renderer.
  1. Unwrap the model in the 3D editor and generate a *UV texture* (i.e. one texture file that contains all the pieces of one model from different angles). +
Don't use multiple separate texture files with one model, it will break the model into several meshes.

1. Export the model mesh in one of the supported [Supported External File Types](../../getting-started/features.md).
  1. *Bake* each texture into one file when exporting. Create a Texture Atlas.
  1. *Save exported models to subfolders of the `assets/Textures` (sic) directory, so they are together with their textures*!

See also: [Texture Atlases on gamasutra](http://www.gamasutra.com/view/feature/2530/practical_texture_atlases.php)

:::important
*When I load the model in JME3, why does it look different than in the 3D editor?* +
3D models will never look identical in a game engine and in a mesh editor. Mesh editors are optimized for high-quality offline rendering, and many of the material and texture options simply do not work in a live rendering context such as games. Also, the shaders that render the materials in JME3 are different implementations than in your mesh editor's renderer. Remind your graphic designers to [focus on features that game engines support](../../core/material/materials_overview.md).
:::

## Convert 3D Models to .j3o Format

Convert all models and scenes to jME3's binary .j3o format to load() them. Use one of the conversion methods listed for the [Supported External File Type](../../getting-started/features.md#supported-external-file-types) you have chosen.

1. Confirm that you exported the model into the `assets/Textures` directory (or subdirectories) together with all its textures.
1. In the SDK, right-click the model and choose "`Convert to j3o Binary`". +
The paths in the j3o now reference files with an absolute `assets/Textures/…` path.
1. Now, move the .j3o into the corresponding `assets/Models/` or `assets/Scenes/` directory.
1. Use the AssetManager to load() the .j3o files.

This process ensures that the texture paths are correct, and it also keeps your `assets/Models` folder free from textures. You can reuse your set of textures for many models.

### Must I convert to .j3o? Yes!

The .j3o file format is an optimized format to store parts of a jME3 scene graph for 3-D games.

- A .j3o file can contain one shape, one model, or a whole scene.
- Only .j3o files can store all of jme3's material options and other features. Other formats can only be considered meshes with UV mapping data and always need extra work.
- .j3o files work seamlessly across platforms and can also be automatically adapted for certain platforms on distribution.
- (Optional) You can store the model's physical properties, materials, lights, particle emitters, and audio nodes, in the .j3o file. +
Use Java commands, or use the [jMonkeyEngine SDK SceneComposer](../../sdk/scene_composer.md) as a user-friendly interface to add these properties.
- The default Ant build script of the SDK copies .j3o files, .j3m files, sounds, and textures, into the distributable JAR automatically.

:::important
Important: Unoptimized external model files (.mesh.xml, .material, .obj, .mat, .gltf, etc) are not bundled by the default SDK build script into the final game builds in the `dist` directory! If you or your customers try to run games containing code that loads non-.j3o models, you get a AssetNotFoundException *Runtime Error* (resource not found). Your final application code should only reference .j3o files. – Note that your developers will not get this runtime error when running development builds straight from the SDK.
:::

## See Also

- [Save and Load](../../core/export/save_and_load.md)
- [Model Loader and Viewer](../../sdk/model_loader_and_viewer.md)
