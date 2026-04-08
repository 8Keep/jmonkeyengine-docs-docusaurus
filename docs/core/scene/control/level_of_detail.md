# Level of Detail (LOD) Optimization

A mesh with a high level of detail has lots of polygons and looks good close up. But when the mesh is further away (and the detail is not visible), the high-polygon count slows down performance unnecessarily.

One solution for this problem is to use high-detail meshes for objects close to the camera, and low-detail meshes for objects far from the camera. As the player moves through the scene, you must keep replacing close objects by more detailed meshes, and far objects by less detailed meshes. The goal is to keep few high-quality slow-rendering objects in the foreground, and many low-quality fast-rendering objects in the background. (Experienced users can compare this approach to [JME's TerraMonkey terrain system](../../terrain/terrain.md), which internally uses the specialized GeoMipMapping algorithm to generate a terrain's Levels of Detail.)

You see now why you may want to be able to generate Levels of Detail for complex Geometries automatically. JME3 supports a Java implementation of the Ogre engine's LOD generator (originally by Péter Szücs and Stan Melax): You use [jme3tools.optimize.LodGenerator](&#123;uri-jme3&#125;/jme3-core/src/tools/java/jme3tools/optimize/LodGenerator.java) in conjunction with [com.jme3.scene.control.LodControl](&#123;uri-jme3&#125;/jme3-core/src/main/java/com/jme3/scene/control/LodControl.java).

For a demo, run [TestLodGeneration.java](&#123;uri-jme3&#125;/jme3-examples/src/main/java/jme3test/stress/TestLodGeneration.java) from [JmeTests](../../../sdk/sample_code.md), then press +/- and spacebar to experiment. The following screenshots show a monkey model with three reduced Levels of Detail:

![jmonkey-lod.gif](/wiki-assets/docs/core/assets/images/scene/control/jmonkey-lod.gif)

## Usage

To activate this optimization:

1. Pick a reduction method and values for the Geometry. (Trial and error…)
1. Generate LODs for the Geometry, either in the SDK or in code.
1. Add an LOD control to the Geometry.

## Pick Reduction Methods and Values

There are several reduction methods to generate a low-polygon version from a high-polygon model. Don't worry, the reduction does not modify the original model.
<table>
  <thead>
    <tr>
      <th>Reduction Method</th>
      <th>Description</th>
      <th>Reduction Value<br /></th>
      <th>LodGenerator.TriangleReductionMethod.COLLAPSE_COST</th>
      <th>Collapses polygon vertices from the mesh until the reduction cost (= amount of ugly artifacts caused) exceeds the given threshold.</th>
      <th>0.0f - 1.0f<br /></th>
      <th>LodGenerator.TriangleReductionMethod.PROPORTIONAL</th>
      <th>Removes the given percentage of polygons from the mesh.</th>
      <th>0.0f - 1.0f<br /></th>
      <th>LodGenerator.TriangleReductionMethod.CONSTANT</th>
      <th>Removes the given number of polygons from the mesh.</th>
      <th>integer<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

If you don't know which to choose, experiment. For example start by trying COLLAPSE_COST and .5f-.9f.

## Generate LOD

You must generate and cache several LODs for each mesh, ranging from many to few polygons. The LOD generator algorithm attempts to collapse vertices automatically, while avoiding ugly artifacts. The LOD generator doesn't generate new meshes, it only creates separate reduced index buffers for the more highly reduced levels.

- If you create geometries manually (3D models), use the SDK to generate LODs.
- If you create geometries programmatically, generate LODs from your Java code.

### Generating LODs in the SDK

The SDK contains a user-friendly interface to generate LODs for a model (.j3o file).

1. Open the Projects or Files window.
1. Select the .j3o file in the `Project Assets/Models` directory.
1. Choose `"Window &gt; Edit in SceneExplorer"` if the SceneExplorer is not open. Info about the selected model is now displayed in the SceneExplorer.
1. **RMB** select the model in SceneExplorer. Choose the `"Tools &gt; Generate Levels of Detail"` menu. +
image:sdk:jme-sdk-generate-lod-menu.png[The Tools Generate LOD context menu in the SceneExplorer,width="300",height="180"]
1. The `Generate LOD` settings wizard opens: +
image:sdk:jme-sdk-generate-lod-window.png[The Generate LOD settings wizard,width="300",height="150"]
1. Choose a reduction method and reduction values for one or more levels.

:::tip
Enter higher reduction values for higher levels.
:::

1. Click **Finish** to generate the LODs for this model.

The LODs are saved in the .j3o model file.

:::tip
Choose `"Window &gt; Properties"` if the Properties window is not open. Choose the generated LODs from the dropdown in the Properties window, and verify their quality in the SceneComposer.
:::

![jme-sdk-generate-lod-full.png](/wiki-assets/docs/sdk/assets/images/jme-sdk-generate-lod-full.png)

### Generating LODs in Code

The `jme3tools.optimize.LodGenerator` utility class helps you generate LODs for an arbitrary mesh (a Geometry object) programmatically from your Java code. You create and bake one LodGenerator for each Geometry.

```java
LodGenerator lod = new LodGenerator(geometry);
lod.bakeLods(reductionMethod,reductionValue);
```

The LODs are stored inside the Geometry object.

*Example:* How to generate an LOD of myPrettyGeo's mesh with the same settings as used in the SDK example above:

```java
LodGenerator lod = new LodGenerator(myPrettyGeo);
lod.bakeLods(LodGenerator.TriangleReductionMethod.PROPORTIONAL,0.25, 0.5f, 0.75f);
```

## Activate the LOD Control

After generating the LODs for the geometry, you create and add a `com.jme3.scene.control.LodControl` to the geometry. Adding the LodControl activates the LOD optimization for this geometry.

```java
LodControl lc = new LodControl();
myPrettyGeo.addControl(lc);
rootNode.attachChild(myPrettyGeo);
```

The LodControl internally gets the camera from the game's viewport to calculate the distance to this geometry. Depending on the distance, the LodControl selects an appropriate level of detail, and passes more (or less) detailed vertex data to the renderer.

## Impact on Quality and Speed
<table>
  <thead>
    <tr>
      <th>Level number</th>
      <th>Purpose</th>
      <th>Distance</th>
      <th>Rendering Speed</th>
      <th>Rendering Quality<br /></th>
      <th>Level 0</th>
      <th>The original mesh is used automatically for close-ups, and it's the default if no LODs have been generated.</th>
      <th>Closest</th>
      <th>Slowest.</th>
      <th>Best.<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Level 1 +<br />Level 2 +<br />Level 3</td>
      <td>If you generated LODs, JME3 uses them automatically as soon as the object moves into the background.</td>
      <td>The higher the level, +<br />the further away.</td>
      <td>The higher the level, +<br />the faster.</td>
      <td>The higher the level, +<br />the lower the quality.<br /></td>
    </tr>
  </tbody>
</table>

## See also

- [https://hub.jmonkeyengine.org/t/brand-new-lod-generator/26341](https://hub.jmonkeyengine.org/t/brand-new-lod-generator/26341)
- [https://github.com/worldforge/ember/tree/master/src/components/ogre/lod](https://github.com/worldforge/ember/tree/master/src/components/ogre/lod)
- [http://www.melax.com/polychop](http://www.melax.com/polychop)
- [JME3 TerraMonkey Terrain](../../terrain/terrain.md)
