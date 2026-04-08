# MakeHuman Blender OgreXML toolchain for creating and importing animated human characters

This guide describes how to use MakeHuman Blender OgreXML toolchain.

## Tools

The latest versions at time of writing are:

- MakeHuman: 1.0.2
- Blender: 2.72
- OgreXML exporter for Blender: 0.6.0

The tools can be downloaded from the following URLs:

- MakeHuman: [http://www.makehuman.org/](http://www.makehuman.org/)
- Blender: [[http://www.blender.org/](http://www.blender.org/)
- OgreXML exporter for Blender: [Working Blender and OgreXML Versions](blender_ogre_compatibility.md)

## Seed Project

Public domain seed project with some preset characters and animations:

- JME3 Open Asset Pack: [https://github.com/bubblecloud/jme3-open-asset-pack](https://github.com/bubblecloud/jme3-open-asset-pack)

## Preparation

1. Install MakeHuman and Blender.
1. Install MakeHuman Blender importer from MakeHuman installation to Blender scripts folder and enable the script from Blender `"File &gt; User Preferences&gt;Addons"`.
1. Install OgreXML exporter to Blender scripts folder and enable the script from Blender `"File &gt; User Preferences&gt;Addons"`.
1. Clone the seed project or create your own project.
1. Locate or create character model folder (src/main/resources/character/human/female)

## Creating Character Model with MakeHuman

1. Create character model with MakeHuman. ([http://www.makehuman.org/documentation](http://www.makehuman.org/documentation))
  - NOTE: If you want to use JME3 Open Asset Pack animations without tweaking then use either male.mhm or female.mhm as preset and do not change the body proportions.

1. Choose basic skeleton from Pose/Animate tab if you are not already using either of the presets.
1. Export to blender exchange format from `"Files &gt; Export"` tab.
  - Choose `"Mesh Format &gt; Blender exchange"`
[%interactive]
    - [x] Options
    - [x] Feet on Ground
    - [x] Scale Units
    - [x] Meter

## Animating Character Model with Blender

1. Import the character model in blender exchange format (MHX) to Blender or open preset blender file female.blend.
1. If you use your own character you can append animations from male.blend or female.blend preset files with Blender `"File &gt; Append"` function. Animations are in the animation folder.
1. Tune the character model / materials and animate the character. ([https://www.blender.org/support/tutorials/](https://www.blender.org/support/tutorials/))

## Exporting Character Model from Blender to Ogre XML

1. Make sure that your scene objects in Blender do not have any spaces or special characters in their names. Rename them if they do.
1. Arrange all your animations in single NLA track after each other without overlaps or touching in the timeline.
1. Unlink any animations linked directly to your character armature or mesh.
1. Export using `"Blender &gt; File&gt;Export Ogre3D"` (scene and mesh) and tick the following options:
[%interactive]
  - [x] copy shader programs
  - [x] Export Scen
  - [x] Export Meshes
  - [x] Export Meshes (overwrite)
  - [x] Armature Animation
  - [x] Optimize Arrays
  - [x] Export Materials
  - [x] Tangents
  - [x] Reorganize Buffers
  - [x] Optimize Animations

## Importing Ogre XML to JME3

You can load the ogre XML with asset manager or import them to SDK and hence convert them to JME3 asset format.

You can test the animations by making your own version of AnimationPreviewer:

[https://github.com/bubblecloud/jme3-open-asset-pack/blob/master/src/main/java/com/jme3/asset/AnimationPreview.java](https://github.com/bubblecloud/jme3-open-asset-pack/blob/master/src/main/java/com/jme3/asset/AnimationPreview.java)
