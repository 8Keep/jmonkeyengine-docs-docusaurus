# Rendering Water as Post-Process Effect

The awesome SeaMonkey WaterFilter is highly configurable. It can render any type of water and also simulates the underwater part of the effect, including light effects called caustics. The effect is based on [Wojciech Toman’s Rendering Water as a Post-process Effect](https://www.gamedev.net/articles/programming/graphics/rendering-water-as-a-post-process-effect-r2642/)
published on gamedev.net. Here's a video:

![water-post.png](/wiki-assets/docs/core/assets/images/effect/water-post.png)

:::note
The SeaMonkey WaterFilter is ideal for oceans and lakes, and especially for under-water scenes. If you only need a small simple water surface, such as a water trough or a shallow fountain, the [SimpleWaterProcessor](water.md) may already be all you need.
:::

## The Theory

The effect is part of a deferred rendering process, taking advantage of the pre-computed position buffer and back buffer (a texture representing the screen’s pixels position in view space, and a texture of the rendered scene).

After some calculation, this allows to reconstruct the position in world space for each pixel on the screen. If a pixel is under a given water height, let’s render it as a blue pixel! Blue pixel? Not exactly, we want waves, we want ripples, we want foam, we want reflection and refraction.

The GameDev.net article describes how those effects are achieved, but the main idea is to generate waves from a height map, create ripples from a normal map, blend in the foam texture when the water depth is below a certain height, compute the refraction color with a clever color extinction algorithm, and then, display the reflection and specular effect by computing a Fresnel term (like in the simple water effect). In addition, this effect allows to blend the water shore with the ground to avoid the hard edges of classic water effects based on grids or quads.

## How Did We Implement it in jME3?

jME3 default behavior is to use a forward rendering process, so there is no position buffer rendered that we can take advantage of. But while rendering the main scene to a frame buffer in the FilterPostProcessor, we can write the hardware depth buffer to a texture, with nearly no additional cost.

There are several ways of reconstructing the world space position of a pixel from the depth buffer. The computational cost is higher than just fetching the position from a position buffer, but the bandwidth and the memory required is a lot lower.

Now we have the rendered scene in a texture, and we can reconstruct the position in world space of each pixel. We’re good to go!

– Nehon

## Sample Code

These are test cases in the jME3 repository:

- [TestPostWater.java](https://github.com/jMonkeyEngine/jmonkeyengine/tree/master/jme3-examples/src/main/java/jme3test/water/TestPostWater.java) (ocean island)
- [TestPostWaterLake.java](https://github.com/jMonkeyEngine/jmonkeyengine/tree/master/jme3-examples/src/main/java/jme3test/water/TestPostWaterLake.java) (calm and muddy water pond)
- [TestMultiPostWater.java](https://github.com/jMonkeyEngine/jmonkeyengine/tree/master/jme3-examples/src/main/java/jme3test/water/TestMultiPostWater.java) (several ponds of different sizes at different heights etc)

### Using the Water Filter

In the `simpleInitApp()` method, you attach your scene to the rootNode, typically a terrain with a sky. Remember to add a directional light, since the water relies on the light direction vector. The WaterFilter constructor expects a node with the scene attached that should be reflected in the water, and vector information from the light source's direction.

This is how you use the water filter post-processor code in your code:

```java

private FilterPostProcessor fpp;
private WaterFilter water;
private Vector3f lightDir = new Vector3f(-4.9f, -1.3f, 5.9f); // same as light source
private float initialWaterHeight = 0.8f; // choose a value for your scene
...

public void simpleInitApp() {
  ...
  fpp = new FilterPostProcessor(assetManager);
  water = new WaterFilter(rootNode, lightDir);
  water.setWaterHeight(initialWaterHeight);
  fpp.addFilter(water);
  viewPort.addProcessor(fpp);
  ...
}

```

Usually you make the water reflect everything attached to the rootNode. But you can also give a custom node (a subnode of the rootNode) to the WaterFilter constructor that has only a subset of scene nodes attached. This would be a relevant optimization if you have lots of nodes that are far away from the water, or covered, and will never be reflected.

### Optional: Waves

If you want waves, set the water height in the update loop. We reuse the initialWaterHeight variable, and repeatedly reset the waterHeight value according to time. This causes the waves.

```java

private float time = 0.0f;
private float waterHeight = 0.0f;

@Override
public void simpleUpdate(float tpf) {
  super.simpleUpdate(tpf);
  time += tpf;
  waterHeight = (float) Math.cos(((time * 0.6f) % FastMath.TWO_PI)) * 1.5f;
  water.setWaterHeight(initialWaterHeight + waterHeight);
}

```

### Optional: Water Wave and Color Effects

![water-post-muddy.png](/wiki-assets/docs/core/assets/images/effect/water-post-muddy.png)

All these effects are optional. Every setter also has a getter.

| Water method example |
| --- |
| Effects: Waves |
| Default<br /> |
| water.setWaterHeight(-6); |
| Use this waterheight method for causing waves. |
| 0.0f<br /> |
| water.setMaxAmplitude(0.3f); |
| How high the highest waves are. |
| 1.0f<br /> |
| water.setWaveScale(0.008f); |
| Sets the scale factor of the waves height map. The smaller the value, the bigger the waves! |
| 0.005f<br /> |
| water.setWindDirection(new Vector2f(0,1)) |
| Sets the wind direction, which is the direction where the waves move |
| Vector2f(0.0f, -1.0f)<br /> |
| water.setSpeed(0.7f); |
| How fast the waves move. Set it to 0.0f for still water. |
| 1.0f<br /> |
| water.setHeightTexture( (Texture2D)<br />manager.loadTexture("Textures/waveheight.png") ) |
| This height map describes the shape of the waves |
| "Common/MatDefs/Water/Textures/heightmap.jpg"<br /> |
| water.setNormalTexture( (Texture2D)<br />manager.loadTexture("Textures/wavenormals.png") ) |
| This normal map describes the shape of the waves |
| "Common/MatDefs/Water/Textures/gradient_map.jpg"<br /> |
| water.setUseRipples(false); |
| Switches the ripples effect on or off. |
| true<br /> |
| water.setNormalScale(0.5f) |
| Sets the normal scaling factors to apply to the normal map. The higher the value, the more small ripples will be visible on the waves. |
| 1.0f<br /> |

| Water method example |
| --- |
| Effects: Color |
| Default<br /> |
| water.setLightDirection(new Vector3f(-0.37f,-0.50f,-0.78f)) |
| Usually you set this to the same as the light source's direction. Use this to set the light direction if the sun is moving. |
| Value given to WaterFilter() constructor.<br /> |
| water.setLightColor(ColorRGBA.White) |
| Usually you set this to the same as the light source's color. |
| RGBA.White<br /> |
| water.setWaterColor(ColorRGBA.Brown.mult(2.0f)); |
| Sets the main water color. |
| greenish blue<br />ColorRGBA(0.0f,0.5f,0.5f,1.0f)<br /> |
| water.setDeepWaterColor(ColorRGBA.Brown); |
| Sets the deep water color. |
| dark blue<br />ColorRGBA(0.0f, 0.0f,0.2f,1.0f)<br /> |
| water.setWaterTransparency(0.2f); |
| Sets how fast colors fade out. use this to control how clear (e.g. 0.05f) or muddy (0.2f) water is. |
| 0.1f<br /> |
| water.setColorExtinction(new Vector3f(10f,20f,30f)); |
| Sets At what depth the refraction color extincts. The three values are RGB (red, green, blue) in this order. Play with these parameters to "`muddy`" the water. |
| Vector3f(5f,20f,30f)<br /> |

| Water method example |
| --- |
| Effects: Shore |
| Default<br /> |
| water.setCenter(Vector3f.ZERO);<br />water.setRadius(260); |
| Limit the water filter to a hemisphere with the given center and radius. Use this for lakes and smaller bodies of water. Skip this for oceans. |
| unused<br /> |
| water.setShoreHardness(1.0f); |
| Sets how soft the transition between shore and water should be. High values mean a harder transition between shore and water. |
| 0.1f<br /> |
| water.setUseHQShoreline(false); |
| Renders shoreline with better quality ? |
| true<br /> |

| Water method example |
| --- |
| Effects: Foam |
| Default<br /> |
| water.setUseFoam(false); |
| Switches the white foam on or off |
| true<br /> |
| water.setFoamHardness(0.5f) |
| Sets how much the foam will blend with the shore to avoid a hard edged water plane. |
| 1.0f<br /> |
| water.setFoamExistence(new Vector3f(0.5f,5f,1.0f)) |
| The three values describe what depth foam starts to fade out, at what depth it is completely invisible, at what height foam for waves appears (+ waterHeight). |
| Vector3f(0.45f,4.35f,1.0f)<br /> |
| water.setFoamTexture( (Texture2D)<br />manager.loadTexture("Textures/foam.png") ) |
| This foam texture will be used with WrapMode.Repeat |
| "Common/MatDefs/Water/Textures/foam.jpg"<br /> |

| Water method example |
| --- |
| Effects: Light |
| Default<br /> |
| water.setSunScale(1f); |
| Sets how big the sun should appear in the light's specular effect on the water. |
| 3.0f<br /> |
| water.setUseSpecular(false) |
| Switches specular effect on or off |
| true<br /> |
| water.setShininess(0.8f) |
| Sets the shininess of the water reflections |
| 0.7f<br /> |
| water.setUseRefraction(true) |
| Switches the refraction effect on or off. |
| true<br /> |
| water.setRefractionConstant(0.2f); |
| The lower the value, the less reflection can be seen on water. This is a constant related to the index of refraction (IOR) used to compute the fresnel term. |
| 0.3f<br /> |
| water.setRefractionStrength(-0.1) |
| This value modifies the current Fresnel term. If you want to weaken reflections use bigger value. If you want to emphasize them, use a value smaller than 0. |
| 0.0f<br /> |
| water.setReflectionMapSize(256) |
| Sets the size of the reflection map. The higher, the better the quality, but the slower the effect. |
| 512<br /> |

### Sound Effects

You should also add audio nodes with water sounds to complete the effect.

```java

AudioNode waves = new AudioNode(assetManager, "Sounds/Environment/Ocean Waves.ogg", false);
waves.setLooping(true);
audioRenderer.playSource(waves);

```

See also: [audio](../audio/audio.md).

---

See also:

- [JME3's Water Post-Process Effect](https://hub.jmonkeyengine.org/t/monkeys-at-the-beach/15000) by Nehon
- [Simple water](water.md)
