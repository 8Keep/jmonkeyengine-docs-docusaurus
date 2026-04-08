# Animating Blender Models With Mixamo

## Using Mixamo For Model Animation

With very little effort, you can use Adobes Mixamo to fully animate your Blender models. Once you understand the process that is.

This guide requires:

- [Blender version 2.78c+](https://www.blender.org/download/) with its default settings. The exception being `Select With:`, under `"File &gt; User Preferences &gt;  Input"` is set to `Left Click`.
- Blender FBX file Importing and Exporting, enabled.
- A Modest amount of Blender knowledge.
- A [Mixamo](https://www.mixamo.com/) account.

## Prepare to Export

To properly animate your models there are a few rules you should follow.

- Read the [Common Questions](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) guide before you do anything else.
- Clean up your Blender file prior to exporting. This means you have a game ready model that will become the base for all your animations. Do this in a copy of your file so you have the original as a backup. The following checklist is provided for your convenience.
[%interactive]
- [ ] You have no Animations.
- [ ] You have applied a triangulate modifier. Some exporters other than Ogre, have an option to apply the modifier on export. This would be the preferred method.
- [ ] You have UV Mapped your model. It isn't required by Mixamo, just for loading your models into jme.
- [ ] Your models origin is at the base of the mesh.
- [ ] You have your materials and textures done for your model. It isn't required by Mixamo, just for loading your model into jme.
  - [ ] You have [cleared your buffers](blender_buffer_clearing.md). It isn't required by Mixamo, just makes your models cleaner for jme.
- [ ] You have applied the Location, Rotation, and Scale to your model.
- [ ] *MOST IMPORTANT OF ALL*, in the `"Properties Panel &gt; Scene Tab &gt; Units Panel"` set the **Unit of Measure** to Meters and the Length to Metric. Adobe uses centimeters for the FBX exporter and if this is not set the models scale will be unusual to say the least. JME3 uses 1 WU = whatever you determine but meters will make things easier for all aspects of your modeling. If you are doing this now, you may have to re-scale your model before proceeding.

:::tip
See [Creating assets in Blender3D](blender.md) for help on creating jME3 compatible models.
:::

## Blender FBX Export

1. In the `3d Viewport`, select your model, it will be high-lighted in orange.
1. In the `Info` header, select `"File &gt; Export &gt; FBX"`.
1. Enter a file path to export to, usually the same folder as your `.blend` file for simplicity.
1. Enter a file name.
1. In the `Export FBX` panel, located in the bottom left of the export dialog:
Main Tab::
- [x] Selected Objects
- Scale = 1

:::important
Click the button next to scale to deselect **Scale all data**. Failure to do so will destroy the scale of your model. If the button is selected, it will be dark in color.
:::

-  Forward = -Z Forward
-  Up = Y Up
-  Which kind of object to export = Mesh
Geometries Tab::
- [x] Apply Modifiers
1. When you are done, click the **Export FBX** button to export the file.

:::tip
You can save these FBX export settings by clicking the **+** button next to **Operator Presets**.
:::

## Mixamo FBX Import

1. Create an [Mixamo](https://www.mixamo.com/#/) account and login.
1. From the `Default Character` panel, select `Upload Character`.
1. Navigate to the file to be uploaded or drag and drop it onto the file up-loader.
1. Select `Open`.

:::note
Generally, if at any time during the import and rigging process the model does not appear within the time specified in the dialog that is showing, something has gone wrong and you will have to restart the process over.
:::

## Mixamo Auto-Rigger

If everything went well the `Auto-Rigger` will open and your model will be facing you.  If not, fix your model in Blender before proceeding.

1. If the model is facing you, click **Next**.
1. In this panel you will rig your model. Place the markers as shown in the Auto-Rigger dialog image.

:::note
Remember that the model is facing you so its right is on your left.
:::

1. Select the LOD you are after. This is based off how many bones you want the hand of the model to have. Feel free to cycle through the options to see what each one does.
1. When you are through click the **Next** button to rig your model.
1. When the model appears, if satisfied with the results, click `Finish`.

## Mixamo Animations

1. In the far right panel select **Find Animations**.
1. After deciding on an animation, click the animation to have it applied to your model.
1. After the animation is applied to your model, toggle the **In Place** checkbox if it's a moving animation.

:::tip
You can make small adjustments to the animation by using the sliders. The most common adjustment you will make is the  `Character Arm-Space`. If you find the models hands are clipping through the model then use this slider to remedy the situation.
:::

1. When satisfied with the animation, select the **Download** button and follow the `Mixamo Download` instructions below.

If you wish to add more animations, after the download, remove the animation by clicking on the **X** button located next to the animations name. Add your new animation and when satisfied, download the new animation. Repeat as often as is necessary.

## Mixamo Download

When downloading `*Animations*` from Mixamo:

1. Make sure the **In Place** checkbox is selected if it's a moving animation.
1. In the `Download Settings` dialog use the default settings.
- Format = FBX
- Skin = With Skin
- Frames per second = 30
- Keyframe Reduction = none
1. Click **Download** and save it to your computer.

When downloading `*Characters*` from Mixamo:

1. In the `Download Settings` dialog the `Format` is FBX and `Pose` is TPose.
1. Click **Download** and save it to your computer.

## Creating Blender Animations

Download your TPose model using the instructions for downloading `*Characters*` given above. We will use it as our newly rigged model for Blender. To keep things organized we will create a `.blend` file for every animation and later use a separate `.blend` file to combine all animations into one jME3 compatible animation.

The following steps apply to any animation you want to add in the future.

1. Start Blender if it is not already open.
1. In the `Info` header, at the top of the program, select `"File &gt; New &gt; Reload Startup"`.
1. Select the default cube and delete it.
Scene Tab::
- In the `Properties` panel, located at the bottom right, select the `Scene` tab.
- In the `Units` panel, change the `Units of measure` to `Meters` and `Length` to `Metric`. You must *always* have these settings when importing from or exporting to Mixamo.

:::tip
You should create and save a default startup file in Blender. `"File &gt; Save Startup File"`. This way you will not have to constantly redo things. Setting your `Units of measure` is the least you should do. You can always restore the default startup file by selecting `"File &gt; Load Factory Settings"` at any time.
:::

1. In the `Info` header, select `"File &gt; Import &gt; FBX"`.
1. Select the FBX file you downloaded earlier.
1. In the `Import Fbx` panel located at the bottom left of the import dialog, leave all settings at their defaults.
Main::
-  Scale = 1
- [x] Import Normals
- [x] Import Animations
- Armature offset = 1
- [x] Image Search
- Decal offset = 0
- [x] Use pre/post rotation
Armatures::
-  Nothing checked
1. When ready click **Import FBX**.
1. After Blender imports the file, both the armature and model are selected, in this order, select `"Object &gt; Apply &gt; Rotation"`. Repeat this for the `Location` and `Scale`. Alternatively, select the armature and model individually and repeat the process.
1. Select the Armature.
1. In the `Timeline`, determine the Length of the animation by **RMB** selecting the last keyframe in the timeline.
 Set `End:` to this value.
1. Click the **|xref:** button to reset timeline back to the first frame.
1. In the `Info` header, change the `Default` screen layout to `Animation`.
1. In the `Dope Sheet Editor`, change the `Dope Sheet` mode/context to `Action Editor`. The `Linked Action` will now show the action name of the animation you imported.
1. Rename this to the name of the imported animation. In this instance it was TPose.
1. Select the **F** button to save the action.
1. Save your file with the same name as the action.

:::note
Mixamo sets the rotation mode of bones to `Quaternion` as is appropriate for preventing [`Gimbal Lock`](https://en.wikipedia.org/wiki/Gimbal_lock). Keep this in mind if you decide to modify your animation. Blender defaults to `XYZ Euler` so you will need to change this setting prior to inserting new keyframes.
:::

## Creating The Rigged Animation File

It's good practice to have a separate file for combining animations. Things can go wrong, animations may change, and you don't want to destroy your original model file by accident. Our plan of attack has been we create a .blend file for every animation and then use this separate rigged file to combine them into one. To keep it simple we will use a copy of the first animation we downloaded and created a `.blend` file for.

You create a rigged animation file only one time per model.

1. If you have closed the TPose.blend file, open it. In the `Info` header select `"File &gt; Save As"` and save the file using the models name with the word `Rigged` added. This will be the only file we add animations to, for this model, from now on. It has our default TPose action which will allow us to start our animation track for `Ogre` animation exporting.
1. Select your `Armature`.
Object Tab::
  1. In the `Properties` panel, navigate to the `Object` tab. In the `Display` panel toggle `X-Ray` on.
1. With your mouse inside the `3d Viewport`, press `Num Pad 1` followed by `Numpad 5`.
1. `Tab` into `Edit Mode`.
1. Set the `3d Cursor` to the models origin.
1. Select `"Add &gt; Single Bone"`.

:::important
The models origin and the `Root` bone origin must be at the same location.
:::

1. Scale the bone down or up as needed by selecting the `Tip` (ball at the narrowest part of the bone) and dragging the `Z` arrow (blue arrow) of the manipulator up or down until you are satisfied with its scale. *DO NOT CHANGE THE ANGLE OR MOVE THE BASE OF THE BONE FROM CENTER*.
1. When satisfied with the scale, select the body of the bone to select the entire bone.
Bone Tab::
  1. In the `Properties` panel, navigate to the `Bone` tab.
  1. Rename the bone to `Root`.
  1. Deselect the `Deform` panel checkbox.
1. In the `3d Viewport`, select the body of the armatures `Hip` bone, the lowest bone in the center of the armature, to select the entire bone.
1. While holding `Shift` down, **LMB** select the `Root` bone.
1. Press `Ctrl` + `P`.
1. In the `Make Parent` dialog choose `Keep Offset`.
1. With the mouse inside the 3d Viewport, `Tab` out of `Edit Mode`.
1. Select your model.
Data Tab::
  1. In the `Properties` panel, navigate to the `Data` tab and make sure the `Mesh` has the same name as your model.
Material Tab::
  1. In the `Properties` panel, navigate to the `Material` tab and make sure there is one `Material` in the `Material List` and it is the same name as your model.
  1. In the `Transparency` panel, move the `Alpha` slider to 1.

:::important
There appears to be a bug where the FBX importer adds an `Alpha` map texture to your model. If the `Alpha` slider is not at one, and you use the Blender importer of the SDK, or convert a .blend file, it will be transparent. `Ogre` export is unaffected.
:::

  1. Deselect the checkbox of the `Transparency` panel.
Texture Tab::
  1. In the `Properties` panel, navigate to the `Texture` tab, you will note that your texture has duplicate names in the `Texture List`. The bottom texture is actually a transparent `Alpha` texture and appears to be a bug. Select the *second* texture in the `*Texture List*` to highlight it.
  1. While holding down the `Shift` key, press the **X** button next to the `*Texture Data Block*` to delete it.
  1. Select your remaining texture in the `Texture List` to highlight it. You will note the `Texture Data Block` is now red due to no texture being assigned.
  1. Click on the **Browse Texture to be linked** button next to the `Texture Data Block` and select your texture.
  1. In the `Image` panel, click the **Small Box** button located next to your texture's path to pack the image file.
1. In the `Info` header, change the layout from `Animation` to `UV Editing`.
1. With your mouse inside the `3d Viewport` and the model still selected, `Tab` into edit mode. If your model is not completely orange press `A` until all vertices are selected. You will see your UV Mapped mesh appear in the `UV Image Editor` window.
1. In the `UV Image Editor`, click the **Browse Image to be linked** button and select your UV image.
1. `Tab` out of `Edit Mode`.
1. In the `Info` header, change the layout from `UV Editing` to `Default` and then click the **+** button to create a new layout.
1. Rename this new layout `NLA Editing`.
1. Click the `Current Editor Type` button, located at the bottom left (small box) of the `3d Viewport`, and change it from `3d View` to `NLA Editor`. Our TPose action is now visible.

:::note
If the action is not visible, navigate to the `Dope Sheet Editor` and from the `Action Editor` context, select the `Action`.
:::

1. Click the `angle-double-down` button to push the action down into the stack.
1. Beneath the TPose strip you will see a slider. Drag this slider to the right until your strip is nested up against the left margin of the window.
1. Save your file.

## Export

Your rigged file is now ready to export. Export your model using one of the [Supported External File Types](../../../../getting-started/features.md#supported-external-file-types) of your choice.

## Appending Blender Animations

Follow the directions for custom Mixamo Animations, Mixamo Download, Creating Blender Animations, [Blender Action Baking](blender.md#action-baking) and [Clearing The Linked Action Buffer](blender_buffer_clearing.md#the-linked-action-buffer) for all animations you wish to append to your *rigged* animation file.

1. If your `Rigged` file is closed, open it.
1. From the `Info` header, change the Layout to `Default`.
1. In the `3d Viewport`, select the armature of the model.
1. From the `Info` header, select `"File &gt; Append"`.
1. Navigate to, and select the `.blend` animation file you want to append.
1. From the folders list select the `Action` folder, followed by your action.
1. When ready, select the **Append From Library** button to finalize your selection.
1. From the `Info` header, change your layout to `Animation`.
1. In the `Dope Sheet Editor`, change the context to `Action Editor` if not already selected.
1. Click the **Action to be linked** button and select your append action from the list.
1. Select the **F** button to save the action.
1. From the `Info` header, change the layout from `Animation` to the `NLA Editing` layout we created in the Creating The Rigged Animation File section of this tutorial. You will see your append `Action` at the top of the list.
1. From the `NLA Editor` header, select `"Add &gt; Add Tracks"`. A new track has now been added to the top of the list.
1. Click the `angle-double-down` button next to the `Action` to push it down into the stack.
1. **LMB** select the strip to make it the only strip selected.
1. **LMB** drag the selected strip to the right until there is at least a 4 keyframe gap between the furthest strip to the right in the list and the append strip you are dragging.

:::tip
When the strip is in drag mode it will be purple. While in drag mode you do not need to keep the **LMB** pressed.
:::

1. When you are satisfied with the position, **LMB** click the strip to finalize your selection. Your append strip should now be the furthest strip to the right in the list.

:::tip
You can use the mouse scroll wheel to shrink or expand the strip window to bring all strips into the view.

You can drag the slider, at the bottom of the strip window, to the right or left to position the strips against the side of the window.
:::

1. With the mouse inside the strip window, press the `N` key to open the properties window.
1. In the `Active Strip` panel, under `Strip Extents`, you will see the `End Frame` number. In the `Timeline`, set `End:` to this number. Every time you append an `Action` you must increase this number to equal the total length off all strips combined, including the gaps between strips.
1. Save your file.

Your file is now ready to xref:jme3/advanced/mixamo#export,export].

:::important
Prior to export:

In the `NLA Editor` make sure no `Actions` are waiting to be pushed down into the stack. If there are, it must be removed or made into a strip prior to export.

In the `Dope Sheet Editor` make sure no `Actions` are selected in the `Action Editor` context. If one is selected, it will be sitting at the top of the `NLA Editor` stack.

An `Action` that has not been pushed down into the `NLA Stack` will block your `NLA Strip` from playing.

Some export methods bake your actions automatically on export, others don't. Test the animation in-game and if your animations are all messed up, try [baking them](blender.md#action-baking) or use a different exporter.
:::

Your NLA strip should look something like this:

![MixamoNLA.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/MixamoNLA.png)

## Notes

- See [Hello Animation](../../../beginner/hello_animation.md) and [Animation in JME3](../../../../core/animation/animation.md) to learn how to use your animated model.
