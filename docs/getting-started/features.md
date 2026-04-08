# jMonkeyEngine 3.0 Feature Overview

See also: [requirements](requirements.md).

## Software Development Kit: jMonkeyEngine SDK

- [Creates jME3-ready Java projects](../sdk/project_creation.md)
  - Preconfigured classpath
  - Bundled with compatible JDK
  - [Asset Manager](../core/asset/asset_manager.md) for loading multi-media files and 3D models including asset name code completion
  - [Non-proprietary Ant build scripts](../sdk/default_build_script.md)
  - jME3-ready Javadoc popups, [sample code projects](../sdk/sample_code.md), and code snippet palette
- [Full-featured Java and XML code editor](../sdk/code_editor.md)
- [Plugins](../sdk/update_center.md)
  - [File Version Control](../sdk/version_control.md)
  - [Debugger and Profiler (optional)](../sdk/debugging_profiling_testing.md)
  - [Converters and Importers for game assets (3D models etc)](../sdk/model_loader_and_viewer.md)
  - [3D Scene Viewer and Scene Composer](../sdk/scene_composer.md)
  - [Material editor](../sdk/material_editing.md)
  - Shader Node editor
  - [Terrain generation, painting, and editing](../sdk/terrain_editor.md)
  - [Custom font creator](../sdk/plugin/fonts.md)
  - [Procedural texture creator (NeoTexture)](../sdk/neotexture.md)
  - Level of Detail (LOD) generator
  - [... and much more...](../sdk/sdk.md)

- [Deployment](../sdk/application_deployment.md)
  - Generates desktop executables for Win, Mac, Linux
  - Generates mobile executables for [Android](../sdk/android.md), iOS support is in the works.
  - Generates JNLP WebStart and Java Browser Applets

- [Based on the NetBeans Platform](../sdk/whynoteclipse.md)
  - Supports all NetBeans IDE plugins

## Physics

- [Bullet physics binding](../physics/physics.md)
  - [Physical characters](../physics/control/walking_character.md)
  - [Physical joints and hinges](../physics/joint/hinges_and_joints.md)
  - [Ray-cast vehicle](../physics/control/vehicles.md)
  - [Ragdoll physics](../physics/control/ragdoll.md)

- [Multi-threaded physics](../physics/bullet_multithreading.md)
- [Mesh-accurate collision shapes](../physics/physics.md#create-a-collisionshape)

## Supported Formats

### jMonkeyEngine3 File Formats
| Suffix | Usage | Learn more<br /> |
| --- | --- | --- |
| .j3o | Binary 3D model or scene. At the latest from the Beta release of your game on, you should convert all models to .j3o format.<br />During alpha and earlier development phases (when models still change a lot) you can alternatively load GLTF/OBJ models directly. | [Model Loader and Viewer](../sdk/model_loader_and_viewer.md)<br /> |
| .j3m | A custom Material. You can create a .j3m file to store a Material configuration for a Geometry (e.g. 3D model). | [Materials Overview](../core/material/materials_overview.md)<br />[Material Editing](../sdk/material_editing.md)<br /> |
| .j3md | A Material definition. These are pre-defined templates for shader-based Materials.<br />Each custom .j3m Material is based on a material definition. Advanced users can create their own material definitions. | [Materials Overview](../core/material/materials_overview.md)<br /> |
| .j3f | A custom post-processor filter configuration. You can create a .j3f file to store a FilterPostProcessor with a set of preconfigured filters. | [Filters](../sdk/filters.md)<br />[Effects Overview](../core/effect/effects_overview.md)<br /> |

### Supported External File Types

| File Suffix | Type | Description<br /> |
| --- | --- | --- |
| .mesh.xml, .meshxml, .scene | 3D model | Ogre Mesh XML *(soon to be discontinued)*<br />see:<br /><br />* [Exporting Models as Ogre XML meshes from Blender](../tutorials/how-to/modeling/blender/blender_ogre_export.md)<br />* [Ogre Compatibility](../tutorials/how-to/modeling/blender/blender_ogre_compatibility.md)<br /><br />Converting to j3o:<br /><br />* [SDK convert](../sdk/model_loader_and_viewer.md)<br />* [BinaryExporter](https://javadoc.jmonkeyengine.org/com/jme3/export/binary/BinaryExporter.html)<br /> |
| .obj, .mtl | 3D model | Wavefront<br />Converting to j3o:<br /><br />* [SDK convert](../sdk/model_loader_and_viewer.md)<br />* [BinaryExporter](https://javadoc.jmonkeyengine.org/com/jme3/export/binary/BinaryExporter.html)<br /> |
| .xbuf | 3D model | Blender version 2.74<br />See:<br /><br />* [.xbuf](https://hub.jmonkeyengine.org/t/xbuf-format-a-developer-friendly-game-exchange-format-for-3d-data/31130) forum post.<br /><br />Converting to j3o:<br /><br />* [SDK convert](../sdk/model_loader_and_viewer.md)<br />* [BinaryExporter](https://javadoc.jmonkeyengine.org/com/jme3/export/binary/BinaryExporter.html)<br /> |
| .fbx | 3D model | Filmbox<br />See:<br /><br />* [Fbx importer](https://hub.jmonkeyengine.org/t/fbx-importer/30309) forum post.<br /><br />Converting to j3o:<br /><br />* [SDK convert](../sdk/model_loader_and_viewer.md)<br />* [BinaryExporter](https://javadoc.jmonkeyengine.org/com/jme3/export/binary/BinaryExporter.html)<br /> |
| .gltf, .bin, .glb, custom extensions | 3D model | Blender version 2.78c onward,<br />See:<br /><br />* [gltf](https://hub.jmonkeyengine.org/t/jme-gltf-support/39174) forum post<br />* [Exporting Models as GlTF meshes from Blender](../tutorials/how-to/modeling/blender/blender_gltf.md)<br /><br />Converting to j3o:<br /><br />* [JmeConvert tool](https://hub.jmonkeyengine.org/t/jmeconvert-tool/41831)<br />* [SDK convert](../sdk/model_loader_and_viewer.md)<br />* [BinaryExporter](https://javadoc.jmonkeyengine.org/com/jme3/export/binary/BinaryExporter.html)<br /> |
| .jpg, .png, .gif | image | Textures, icons<br /> |
| .dds | image | Direct Draw Surface texture<br /> |
| .hdr | image | High Dynamic Range texture<br /> |
| .tga | image | Targa Image File texture<br /> |
| .pfm | image | Portable Float Map texture<br /> |
| .bmp | image | Bitmap texture<br /> |
| .ani, .cur, .ico | image | Windows Cursor, static or animated.<br /> |
| .fnt | bitmap font | AngelCode font for &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; and HUD<br /> |
| .wav | audio | Wave music and sounds<br /> |
| .ogg | audio | OGG Vorbis music and sounds<br /> |

## Shaders

- GLSL support
- Shader libraries
- Shader permutations
- [Shader Nodes](../core/shader/jme3_shadernodes.md)

## Material Lighting

- Per-pixel lighting
- Multi-pass lighting
- Phong Lighting
  - Diffuse Map
  - Alpha Map
  - Glow Map
  - Specular Map
  - Normal Map, Parallax Map (a.k.a. bump mapping)

- Tangent shading
- Reflection

## Material Textures

- Texturing
    - material colors (ambient, diffuse, specular/shininess, glow),
    - color map, light map,
    - transparency, translucency, alpha map, alpha testing with falloff threshold,
    - sphere map, cube map,
    - texture scale,
    - wireframe
    - color ramp texture

- Multi-texturing through shaders
- UV textures
- Splat textures, Phong lit or unshaded, supports diffuse and normal maps

## Asset System

- Asset importing
  - Animation
  - Meshes
  - Textures
  - Scenes
  - Materials
  - Shaders

- Multi-threaded asset loading via HTTP
- Loading scenes from .ZIP files
- Shareable AssetPacks

## Special Effects

- [Particles: Smoke, fire, explosions, etc](../core/effect/particle_emitters.md)
- [Post processing / 2D Filter Effects](../core/effect/effects_overview.md)
  - Reflective Water
  - Shadow mapping
  - High Dynamic Range rendering
  - Screen Space Ambient Occlusion
  - Light Scattering
  - Cartoon Effect
  - Fog
  - Bloom
  - Depth of Field Blur

## Terrain

- [Geomipmapped heightmap terrain](../core/terrain/terrain.md)
- [Ogre Compatibility](../tutorials/how-to/modeling/blender/blender_ogre_compatibility.md)
- [SkyBox and SkyDome](../core/util/sky.md)
- Terrain lighting

## GUI / HUD

- [Orthogonal (Billboard) node](../core/ui/hud.md)
- [Nifty GUI integration](../core/gui/nifty_gui.md)

## Miscellaneous

- [Application States](../core/app/state/application_states.md) and [Controls](../core/scene/control/custom_controls.md) to implement [game logic](../core/app/update_loop.md)
- [Cinematics and motion paths](../core/cinematic/cinematics.md)
- [Camera System](../core/renderer/camera.md)
  - Normal or parallel view
  - Multiple views

- Swing canvas (e.g. for Applets)
- [Input handling](../core/input/input_handling.md)
  - Mouse, keyboard, joystick
  - [Combo moves](../core/input/combo_moves.md)

## Networking

- [SpiderMonkey API](../networking/networking.md)
