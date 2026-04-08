# How to add a Sky to your Scene

Here is an example for how you add a static horizon (a background landscape and a sky) to a scene.
Having a discernible horizon with a suitable landscape (or space, or ocean, or whatever) in the background makes scenes look more realistic than just a single-colored "`sky`" background.

## Adding the Sky

Adding a sky is extremely easy using the `com.jme3.util.SkyFactory`.

```java
getRootNode().attachChild(SkyFactory.createSky(getAssetManager(), "Textures/Sky/Bright/BrightSky.dds", SkyFactory.EnvMapType.CubeMap));
```

To add a sky you need to supply:

1. The assetManager object to use
1. A cube or sphere map texture of the sky
1. Set the map type: [SkyFactory.EnvMapType](https://javadoc.jmonkeyengine.org/com/jme3/util/SkyFactory.EnvMapType.html). In this instance, CubeMap.

Internally, the SkyFactory calls the following methods:

1. `sky.setQueueBucket(Bucket.Sky);` makes certain the sky is rendered in the right order, behind everything else.
1. `sky.setCullHint(Spatial.CullHint.Never);` makes certain that the sky is never culled.
1. The SkyFactory uses the internal jME3 material definition `Sky.j3md`. This Material definition works with sphere and cube maps.

## Creating the Textures

As the sky texture we use the sample BrightSky.dds file from jme3test-test-data.

How to create a sky textures?

- There are many tools out there that generate cube and sphere maps. +
Examples for landscape texture generators are Terragen or Bryce.
- The actual texture size does not matter, as long as you add the Sky Geometry to the Sky bucket: Everything in the sky bucket will always be infinitely far away behind everything else, and never intersect with your scene. +
Of course the higher the resolution, the better it will look. On the other hand, if the graphic is too big, it will slow the game down.
- A box or sphere map is the simplest solution. But you can use any Node as sky, even complex sets of geometries and quads with animated clouds, blinking stars, city skylines, etc.
- JME3 supports cube maps in PNG, JPG, or (compressed) DDS format.

Box or Sphere?

- If you have access to cube map textures, then use a SkyBox
  - [SkyBox examples](http://1.bp.blogspot.com/_uVsWqMqIGQU/SN0IZEE117I/AAAAAAAAAPs/4lfHx1Erdqg/s1600/skybox)

- If you have access to sphere map textures – specially projected sky images that fit inside a sphere – then you use a SkySphere or SkyDome.
  - [SkySphere example](http://wiki.delphigl.com/index.php/Datei:Skysphere.jpg)

For more information on Skymap creation see:

- [How to create free skymaps](../../tutorials/how-to/util/free_skymaps.md)
- [SkyBox baking](../../tutorials/how-to/modeling/blender/blender.md#skybox-baking)
