# Creating assets in Blender3D

This section discusses how to create and import models from Blender3D (2.78+, see bottom of page for Blender 2.49 and before) to jME3. Furthermore, it explains how you can create various typical game-related assets like "`Normal`" maps of high-poly models and "`Baked Lighting`" maps.

## Asset Management

For the managing of assets in general, be sure to read the [Asset Pipeline Documentation](../../../concepts/multi-media_asset_pipeline.md). It contains vital information on how to manage your asset files.

## Creating Models

Game-compatible models are models that basically only consist of a mesh and UV-mapped textures, in some cases animations. All other material parameters or effects (like particles, etc.) cannot be expected to be transferred properly and probably would not translate to live rendering very well anyway.

### UV Mapped Textures

To successfully import a texture, the texture *has to* be UV-mapped to the model. Here's how to assign "`Diffuse`", "`Normal`" and "`Specular`" maps:

![blender-material-4.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender-material-4.png)
![blender-material-3.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender-material-3.png)
![blender-material-2.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender-material-2.png)
![blender-material-1.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender-material-1.png)

It's important to note that each used texture will create one separate geometry. So it's best to either combine the UV maps or use a pre-made atlas with different texture types from the start and then map the uv coords of the models to the atlas instead of painting on the texture. This works best for large models like cities and space ships.

### Animations

Animations for jME3 have to be bone animations, mesh deformation or other forms of animation are not supported.

To create an animation from scratch do the following:

1. Create the model.
  1. Make sure your models location, rotation and scale is applied and zero / one (see "`Model Checklist`" below).

:::tip
Did you know? You can make any model from a box by only using extrusion, this creates very clean meshes.
:::

1. Create the armature bones, don't forget to have one root bone!
  1. Start by placing the cursor at zero.
  1. Go to the `"Add &gt; Armature &gt; Single Bone"` menu and create the root bone.

![blender-add-bone.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender-add-bone.png)

  1. Select the bone and go to edit mode (press `Tab`).
  1. Select the root bone end and press `E` to extrude the bone, then start rigging your model this way.

:::important
Make sure your armature's location, rotation and scale is applied (see "`Model Checklist`" below) before continuing.
:::

1. Make the armature the parent of the model.
  1. Make sure you are back in object mode (press `Tab` again).
  1. First select the model object then select the armature object with `Shift` pressed, then press `Ctrl` + `P`.
  1. When you do this, you can select how the bone groups will be mapped to the model vertices initially. Select **With Automatic Weights**.

:::note
When you parent your mesh to the armature, Blender automatically adds the `Armature` modifier to the mesh.

image:how-to/modeling/blender/blender-make-armature.png[blender-make-armature.png,width="",height=""]
:::

Voila, your model should move when you move the bones in pose mode.

1. From the `Info` header, press the **Choose Screen Layout** button and select the `Animation` layout.
1. In the `Dope Sheet Editor` window, press the **Context** button and select `Action Editor`.

![blender-action-editor.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender-action-editor.png)

1. Add an action by pressing the **+** button.
1. Set the "`Rotation Mode`" of the bone to `Quaternion` or switch later from your "`Rotation Mode`" to `Quaternion` and make a `Keyframe`.

![blender-switch-rotationmode.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender-switch-rotationmode.png)
1. Create the ``Keyframe``s (select the model armature and press `I`) along the timeline.

--
![blender-add-keyframes.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender-add-keyframes.png)

Each action will be an animation available via the animation control in jME after the import.

:::important
Press the **F** button next to the action so it will be saved even if there's no references. The animation would else be deleted if its not the active animation on the armature and the file is saved.
:::

--

### Model Checklist

Sometimes you do not create the model yourself and often models from the web are not really made for OpenGL live rendering or not completely compatible with the bone system in jME.

To export an animated model in Blender make sure the following conditions are met:

:::tip
This checklist is interactive for your convenience.
:::

[%interactive]
- [ ] The animation has to be a *bone animation*.
- [ ] Apply Location, Rotation and Scale to the mesh in Blender: In the `3D Viewport` in Blender, select the mesh in `Object Mode`, from the `3D View Editor` header, click `"Object &gt; Apply &gt; Location / Rotation / Scale"`.

![blender_apply_mesh.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender_apply_mesh.png)

- [ ] Apply Location, Rotation and Scale to the armature in Blender: In the `3D Viewport` in Blender, select the armature in `Object Mode`, from the `3D View Editor` header, click `"Object &gt; Apply &gt; Location / Rotation / Scale"`.

![blender_apply_bones.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender_apply_bones.png)

- [ ] Set the mesh’s origin point in the bottom of the mesh (see the image below).
- [ ] Set the armature’s origin point in the bottom of the armature (see the image below).
- [ ] Armature’s origin point and mesh’s origin point must be in the same location (see the image below).
- [ ] Use a root bone located in the armature’s origin. This root bone must be in vertical position (see the image below) and it is the root bone of the armature. If you rotate the root bone, the entire armature might be rotated when you import the model into jMonkey.
- [ ] Uncheck:
  - [ ] Bone Envelopes

--
on the Armature modifier for the mesh (see the image below).

![blender_envelopes.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender_envelopes.png)
--
- [ ] Under the armature data tab, make sure the bone type is `Octahedral` (see image below).

![blender_rootbone2.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender_rootbone2.png)

You can use `SkeletonDebugger` to show the skeleton on your game in order to check if the mesh and the skeleton are loaded correctly:

```java
final Material soldier2Mat = assetManager.loadMaterial("Materials/soldier2/soldier2.j3m");
final Spatial soldier2 = assetManager.loadModel("Models/soldier2/soldier2.j3o");
TangentBinormalGenerator.generate(soldier2);
soldier2.setMaterial(soldier2Mat);

final Node soldier2Node = new Node("Soldier2 Node");

soldier2Node.attachChild(soldier2);
rootNode.attachChild(soldier2Node);

final AnimControl animControl = soldier2.getControl(AnimControl.class);
animControl.addListener(this);
final AnimChannel animChannel = animControl.createChannel();

final SkeletonDebugger skeletonDebug = new SkeletonDebugger("skeleton", animControl.getSkeleton());
final Material mat = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
mat.setColor("Color", ColorRGBA.Green);
mat.getAdditionalRenderState().setDepthTest(false);
skeletonDebug.setMaterial(mat);
soldier2Node.attachChild(skeletonDebug);
```

![blender_finished.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/blender_finished.png)

Also check out these videos and resources:

- [Forum: How to import animated models from Blender 2.6 correctly](https://hub.jmonkeyengine.org/t/importing-animations-from-blender-2-62-using-ogre-xml-things-to-check-if-you-are-getting-problems/22234) ([Video](https://www.youtube.com/watch?v=QiLCs4AKh28))
- [Video tutorial for animated models from Blender 2.6](http://www.youtube.com/watch?v=NdjC9sCRV0s)
- [Exporting OgreXML scenes from Blender 2.49 to jME](https://docs.google.com/fileview?id=0B9hhZie2D-fENDBlZDU5MzgtNzlkYi00YmQzLTliNTQtNzZhYTJhYjEzNWNk&hl=en)

## Action Baking

There are many 3D model [Supported External File Types](../../../../getting-started/features.md#supported-external-file-types) for jMonkeyEngine. Some of them bake your actions automatically on export, others don't. Baking is a destructive process so it is recommended that you test the animation in-game first. If your animations are all messed up, try baking them or use a different exporter.

If you find yourself in need of baking, the process is as follows.

1. From the Blender `Info` header, select `"File &gt; Save Copy"`.
1. Save the file somewhere other than the current folder. This will save you the effort of re-creating the animation file if you need it at some other time.
1. In the `Info` header, change the `Default` screen layout to `Animation`.
1. In the `Dope Sheet Editor`, change the `Dope Sheet` mode/context to `Action Editor`.
1. Click the **Action to be linked** button and select your action.
1. In the `3d Viewport` header, select the armature.
- Depending on the mode selected choose:
  1. Object Mode: `"Object &gt; Animation &gt; Bake Action"`.
  1. Pose Mode: `"Pose &gt; Animation &gt; Bake Action"`.
1. In the `Bake Action` dialog, deselect and set the settings as follows:
Bake Action::
- [ ] Selected Only
- [x] Visual Keying
- [x] Clear Constraints
- [ ] Clear Parents
- [ ] Overwrite Current
-  Bake Data = Pose
1. When ready click **OK**.
1. The `Linked Action` in the `Dope Sheet Editor` will change to the newly baked action and is named `Action`. Rename this to the name of the imported animation.
1. Select the **F** button to save the action.
1. Save your file.
1. Clear the old action from the `Linked Action` buffer. See [Blender Buffer Clearing](blender_buffer_clearing.md) for more information.

## Normal Map baking

Models for live rendering should have a low polygon count. To increase the perceived detail of a model, Normal maps are commonly used in games. This tutorial will show how to create a Normal map from a "`HighPoly`" version of your model that you can apply to a "`LowPoly`" version of the model in your game.

### Blender Modeling LowPoly & HighPoly

.Method 1
If you use the `Multiresolution` modifier you only need one object. Let's look at this example, the Blender object Monkey, with an applied `Triangulate` modifier:

![monkey.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/monkey.png)

1. Add a "`Monkey`" object by selecting the **Monkey** button located on the "`Create Tab`".
  1. While in `Object Mode`, in the `Properties` panel under the `Modifiers` tab, add a `Triangulate` modifier and apply it:
  1. While in `Object Mode`, in the `Properties` panel under the `Modifiers` tab, add a `Multiresolution` modifier:

--
![3.1.gif](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/3.1.gif)

There are two types of modifiers: Catmull-Clark and Simple.

- Simple is better for things like walls or floors.
- Catmull-Clark is better for objects like spheres.

When using Catmull-Clark with a higher "`subdivide`" value (more than 3), it's good to have the "`Preview`" value above 0 and less than the subdivide level. This is because Catmull-Clark smooths the vertices, so the Normal map is not so precise.

Regardless of the choice, the larger the difference is between "`Render`" and "`Preview`", the deeper the detail is on the Normal map.

- Here is an example of `Preview 1`, it's more smooth than the original mesh:

![monkkeyprev1.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/monkeyprev1.png)
--
1. From the `File` header at the top of the 3d View, click the **Choose Screen layout** button and select "`UV Editing`".
1. In the `3d View`, select the Monkey and `Tab` into "`Edit Mode`".
1. If the Monkey vertices are not already highlighted, press the `A` key until all vertices are highlighted.
1. From the `3d View` header, select `"Mesh &gt; UV Unwrap&gt;Smart UV Project"`.
  1. Click the **Island Margin** button once to advance the value to .03.
  1. Click **OK** when ready.
1. In the `UV Image Editor`, click the **New**  button.
  1. Change the name to something like "`monkey_bump`".
  1. Optionally, change the `Generated Type` to "`UV Grid`".
  1. Uncheck:
  - [ ] 32 Bit
  1. Click **OK** when ready.
1. From the `File` header at the top of the `UV Image Editor`, click the **Choose Screen layout** button and select "`Default`".
1. With your mouse inside the `3D View`, tab into `Object Mode`.
1. Now go into the `Render` tab, and bake a `Normal` map using the same configuration as here:

--
![4.gif](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/4.gif)

:::important
Remember! The actual preview affects the baking output and mesh export!
:::

--

1. Navigate back to the `UV Editing` layout and save your image by selecting `"Image* &gt; Save As"` from the `UV Image Editor` header.

:::tip
The asterisk `*` next to the `Image` menu item means the image has not yet been saved.
:::

.Normal map from Method 1
![monkey_bump.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/monkey_bump.png)

This second method produces the best results by far:

.Method 2
1. Follow the steps for "`Method 1`" but before baking, uncheck:
  - [ ] Bake from Multires
1. Make a copy of your mesh (`SHIFT`+`D`).
1. Remove the Multires modifier from the copied model.
1. Remove any materials from the copied model.
1. Remove the armature modifier from the copied model.
1. Select the original (HighPoly) model.
1. Go into pose mode, clear any pose transformations.
1. The "`HighPoly`" and "`LowPoly`" models should be on top of each other now.
1. Select the original (HighPoly) model.
1. Hold `SHIFT` and select the copied (LowPoly) model.
1. In the `Properties` panel, in the `Render` tab:
  1. Bake Mode: `Normal`
  1. check:
  - [x] Selected to Active
  1. Use a reasonably high value for "`Margin`" (4+ pixels at least for 1024x1024 maps).
1. Bake and don't forget to save the Normal map image.

:::important
Keep in mind that when you duplicate the model, you are also duplicating its UV mapping. What this means is your "HiPoly" model and "`LowPoly`" model are both assigned to an image.

If you ever see this error:

"No objects or images found to bake to"

You are either missing the image for the "`LowPoly`" model, or in the Outliner, the camera symbol (Restrict Render) is off (grayed out).
:::

.Normal map from Method 2
![monkey_bump2.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/monkey_bump2.png)

### Fixing the Normal colors in Blender

There are two "`standards`" for Normal maps:

- DirectX
- OpenGL

The difference between them is that the green channel is inverted. One would expect that JME supports the OpenGL way, but actually JME supports the DirectX way because it’s what Blender supports and the developers of JME thought it would be easier in the Blender to JME workflow.

Because of this, you need to fix the colors to prepare the Normal map for using it with the JME Lighting Material. You should only have to invert the green channel, the red and blue channels should stay unchanged. The curve for the red and blue channels should go from bottom left to top right, the green from top left to bottom right.

To do this after baking and saving the original Normal map image:

1. In the "`UV Editing`" layout, from the "`UV Image Editor`" header select `"Image &gt; Invert&gt;Invert Green Channel"`.
1. Save the inverted image to a destination you want and use it with the JME Lighting Material and the "`LowPoly`" version of the model.

.Normal map invert results (Method 2 example)
![monkey_bump2_invert.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/monkey_bump2_invert.png)

[TIP]
.Inverting Tips
====
If you build the engine from source, the master branch [PBR material](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-core/src/main/resources/Common/MatDefs/Light/PBRLighting.j3md#L39) has a NormalType parameter that allows one to handle this in the shader instead of having to edit the Normal map.

You can also use the SDK to invert the channel:

1. In the SDK, **RMB** select the image and choose "`Edit Texture`".
1. In the window header, press the **Filters** button and choose `"Invert &gt; Green"`.
1. When satisfied, save the change in the same format as the original image using `"File &gt; Save"`.
====

This is what the final outcome of Normal map baking should produce for you. A "`LowPoly`" model that looks like it's a "`HighPoly`" model.

.Final results (Method 2 example)
![monkey_final.gif](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/monkey_final.gif)

## LightMap baking

The goal of this tutorial is to explain briefly how to bake light map in blender with a separate set of texture coordinates and then export a model using this map in jME3.

### Blender modeling + texturing

- create a mesh in blender and unwrap it to create uvs
  - image:how-to/modeling/blender/1.jpg[1.jpg,width="600",height=""]

- In the mesh tab you can see the sets of Uvs, it will create the first one.
  - You can assign w/e texture on it, I used the built in checker of blender for the example.

- In this list, create a new one and click on the camera icon so that baking is made with this set. Name it LightUvMap.
- In the 3D view in edit mode select all your mesh vertices and hit 'U'/LightMap pack then ok it will unfold the mesh for light map.
- Create a new image, go to the render tab an all at the end check the "`Bake`" section and select shadows. Then click bake.
- If all went ok it will create a light map like this.
  - image:how-to/modeling/blender/2.jpg[2.jpg,width="600",height=""]

- Go to the material tab, create a new one for your model and go to the Texture Tab.
- Create 2 textures one for the color map, and one for the light map.
- In the Mapping section be sure to select coordinates : UV and select the good set of coordinates.
  - image:how-to/modeling/blender/3.jpg[3.jpg,width="600",height=""]

- Then the light map
  - image:how-to/modeling/blender/4.jpg[4.jpg,width="600",height=""]

## Importing the model in the SDK and creating the appropriate material

Once this is done, export your model with one of the 3D model [Supported External File Types](../../../../getting-started/features.md#supported-external-file-types) and convert it into a `.j3o` with the SDK, or the JME [BinaryExporter](https://javadoc.jmonkeyengine.org/com/jme3/export/binary/BinaryExporter.html).

- Create material for it using the lighting definition.
- Add the colorMap in the diffuse map slot and the lightMap in the light map slot.
- Make sure you check "`SeparateTexCoords`"
  - image:how-to/modeling/blender/5.jpg[5.jpg,width="600",height=""]

- It should roughly result in something like that :
  - image:how-to/modeling/blender/6.jpg[6.jpg,width="600",height=""]

## Modelling racing tracks and cars

Follow the link below to a pdf tutorial by rhymez where I guide you to modelling a car and importing it to the jMonkeyEngine correctly and edit it in the vehicle editor.Plus how to model a simple racing track.
[http://www.indiedb.com/games/street-rally-3d/downloads/modelling-in-blender-to-the-jmonkeyengine](http://www.indiedb.com/games/street-rally-3d/downloads/modelling-in-blender-to-the-jmonkeyengine)

## Optimizing Models for 3D games

Follow the link below to a pdf tutorial by rhymez where I guide you on how you can optimize your models for faster rendering.
[http://www.indiedb.com/games/street-rally-3d/downloads/optimizing-3d-models-for-games](http://www.indiedb.com/games/street-rally-3d/downloads/optimizing-3d-models-for-games)

## SkyBox baking

There are several ways to create static images to use for a sky in your game. This will describe the concepts used in blender and create an ugly sky emoji:smiley[]. Check the links below for other ways and prettier skies.

A sky box is a texture mapped cube, it can also, loosely, be called en EnvMap or a CubeMap. The camera is inside the cube and the clever thing that jME does is to draw the sky so it is always behind whatever else is in your scene. Imagine the monkey is the camera in the picture.

- image:how-to/modeling/blender/skybox-concept.png[skybox-concept.png,width="",height=""]

But a real sky is not a box around our heads, it is more like a sphere. So if we put any old image in the sky it will look strange and might even look like a box. This is not what we want. The trick is to distort the image so that it will _look_ like a sphere even if it in fact is a picture pasted on a box. Luckily blender can do that tricky distortion for us.

The screenshots are from Blender 2.63 but the equivalent operations have been in blender for years so with minor tweaks should work for almost any version.

So let's get started

- Fire up blender and you'll see something like this.
  - image:how-to/modeling/blender/start-screen2.png[start-screen2.png,width="",height=""]

- The cube in the start scene is perfect for us. What we'll do is have Blender render the scene onto that cube. The resulting image is what we'll use for our sky box. So our jME sky will look like we stood inside the blender box and looked out on the scene in blender.
- Start by selecting the box and set its material to shadeless.
  - image:how-to/modeling/blender/shadeless.png[shadeless.png,width="",height=""]

- Now we will create a texture for the box. Make sure the texture is an `Environment Map`, that the `Viewpoint Object` is set to the cube. The resolution is how large the resulting image will be. More pixels makes the sky look better but comes at the cost of texture memory. You'll have to trim the resolution to what works in your application.
  - image:how-to/modeling/blender/texture.png[texture.png,width="",height=""]

- Next up is the fun part, create the sky scene in blender. You can do whatever fits your application, include models for a city landscape, set up a texture mapped sphere in blender with a nice photographed sky, whatever you can think will make a good sky. I am not so creative so I created this scene:
  - image:how-to/modeling/blender/scene.png[scene.png,width="",height=""]

- Now render the scene (press F12). It doesn't actually matter where the camera is in blender but you might see something similar to this:
  - image:how-to/modeling/blender/render.png[render.png,width="",height=""]

- You can see that Blender has actually drawn the scene onto the cube. This is exactly what we want. Now to save the image.
- Select the texture of the cube and select save environment map.
  - image:how-to/modeling/blender/saveenvmap.png[saveenvmap.png,width="",height=""]

- That is it for Blender. Open the saved image in some image editor (I use the Gimp from [http://www.gimp.org](http://www.gimp.org) here).

:::tip
The SDK also contains an image editor, right-click the image and select "`edit`" image to open it.
:::

- You will notice that Blender has taken the 6 sides of the cube and pasted together into one image (3x2). So now we need to cut it up again into 6 separate images. In gimp I usually set the guides to where I want to cut and then go into Filters→Web→Slice and let gimp cut it up for me.
  - image:how-to/modeling/blender/post-slice.png[post-slice.png,width="",height=""]

- Next up is to move the image files into your assets directory and create the sky in jME. You can do that in the Scene Composer by right clicking the scene node, select `Add Spatial` and then select `Skybox`.

If you want to do it from code, here is an example:

```java

public void simpleInitApp() {

    Texture westTex = assetManager.loadTexture("Textures/west.png");
    Texture eastTex = assetManager.loadTexture("Textures/east.png");
    Texture northTex = assetManager.loadTexture("Textures/north.png");
    Texture southTex = assetManager.loadTexture("Textures/south.png");
    Texture upTex = assetManager.loadTexture("Textures/top.png");
    Texture downTex = assetManager.loadTexture("Textures/bottom.png");

    final Vector3f normalScale = new Vector3f(-1, 1, 1);
    Spatial skySpatial = SkyFactory.createSky(
                        assetManager,
                        westTex,
                        eastTex,
                        northTex,
                        southTex,
                        upTex,
                        downTex,
                        normalScale);
    rootNode.attachChild(skySpatial);
}
```

:::tip
This example uses a strange normalScale, this is to flip the image on the X-axis and might not be needed in your case. Hint: the texture is applied on the outside of the cube but we are inside so what do we see?
:::

## Further reading

- [How to add a Sky to your Scene](../../../../core/util/sky.md)
- [http://hub.jmonkeyengine.org/t/jmonkeyengine-tutorial-how-to-create-skymaps-using-blender/19313](http://hub.jmonkeyengine.org/t/jmonkeyengine-tutorial-how-to-create-skymaps-using-blender/19313)
