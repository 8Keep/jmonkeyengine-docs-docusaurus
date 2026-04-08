# Particle Emitter Settings

You cannot create a 3D model for delicate things like fire, smoke, or explosions. Particle Emitters are quite an efficient solution to create these kinds of effects: The emitter renders a series of flat orthogonal images and manipulates them in a way that creates the illusion of a anything from a delicate smoke cloud to individual flames, etc.
Creating an effect involves some trial and error to get the settings _just right_, and it's worth exploring the expressiveness of the options described below.

:::tip
Use the [Scene Explorer](../../sdk/scene_explorer.md) in the [SDK](../../sdk/sdk.md) to design and preview effects.
:::

![explosion-5.png](/wiki-assets/docs/core/assets/images/effect/explosion-5.png)
![particle.png](/wiki-assets/docs/core/assets/images/effect/particle.png)
![beginner-effect-fire.png](/wiki-assets/docs/tutorials/assets/images/beginner/beginner-effect-fire.png)
![butterfly-particle-emitter.png](/wiki-assets/docs/core/assets/images/effect/butterfly-particle-emitter.png)

## Create an Emitter

1. Create one emitter for each effect:

```java
ParticleEmitter explosion = new ParticleEmitter(
"My explosion effect", Type.Triangle, 30);
```

1. Attach the emitter to the rootNode and position it in the scene:

```java
rootNode.attachChild(explosion);
explosion.setLocalTranslation(bomb.getLocalTranslation());
```

1. Trigger the effect by calling

```java
explosion.emitAllParticles()
```

1. End the effect by calling

```java
explosion.killAllParticles()
```

Choose one of the following mesh shapes

- Type.Triangle
- Type.Point

## Configure Parameters

Not all of these parameters are required for all kinds of effects. If you don't specify one of them, a default value will be used.
| Parameter | Method | Default | Description<br /> |
| --- | --- | --- | --- |
| number | `setNumParticles()` |  | The maximum number of particles visible at the same time. Specified by user in constructor.<br /> |
| emission rate | `setParticlesPerSec()` | 20 | Density of the effect, how many new particles are emitted per second.<br />Set to zero to control the start/end of the effect.<br />Set to a number for a constantly running effect.<br /> |
| size | `setStartSize()`, `setEndSize()` | 0.2f, 2f | The radius of the scaled sprite image. Set both to same value for constant size effect.<br />Set to different values for shrink/grow effect.<br /> |
| color | `setStartColor()`, `setEndColor()` | gray | Controls how the opaque (non-black) parts of the texture are colorized.<br />Set both to the same color for single-colored effects (e.g. fog, debris).<br />Set both to different colors for a gradient effect (e.g. fire).<br /> |
| direction/velocity | `getParticleInfluencer(). setInitialVelocity(initialVelocity)` | Vector3f(0,0,0) | A vector specifying the initial direction and speed of particles. The longer the vector, the faster.<br /> |
| fanning out | `getParticleInfluencer().setVelocityVariation(variation)` | 0.2f | How much the direction (`setInitialVelocity()`) can vary among particles. Use a value between 1 and 0 to create a directed swarm-like cloud of particles.<br />1 = Maximum variation, particles emit in random 360° directions (e.g. explosion, butterflies).<br />0.5f = particles are emitted within 180° of the initial direction.<br />0 = No variation, particles fly in a straight line in direction of start velocity (e.g. lasergun blasts).<br /> |
| direction<br />(pick one) | `setFacingVelocity()` | false | true = Flying particles pitch in the direction they're flying (e.g. missiles).<br />false = Particles keep flying rotated the way they started (e.g. debris).<br /> |
| direction<br />(pick one) | `setFaceNormal()` | Vector3f.NAN | Vector3f = Flying particles face in the given direction (e.g. horizontal shockwave faces up = Vector3f.UNIT_Y).<br />Vector3f.NAN = Flying particles face the camera.<br /> |
| lifetime | `setLowLife()`, `setHighLife()` | 3f, 7f | The time period before a particle fades is set to a random value between minimum and maximum; minimum must be smaller than maximum. A minimum &lt; 1f makes the effect more busy, a higher minimum looks more steady. Use a maximum &lt; 1f for short bursts, and higher maxima for long lasting swarms or smoke. Set maximum and minimum to similar values to create an evenly spaced effect (e.g. fountain), set the to very different values to create a distorted effect (e.g. fire with individual long flames).<br /> |
| spinning | `setRotateSpeed()` | 0f | 0 = Flying particles don't spin while flying (e.g. smoke, insects, controlled projectiles).<br />&gt; 0 = How fast particle spins while flying (e.g. debris, shuriken, missiles out of control).<br /> |
| rotation | `setRandomAngle()` | false | true = The particle sprite is rotated at a random angle when it is emitted (e.g. explosion, debris).<br />false = Particles fly straight like you drew them in the sprite texture (e.g. insects).<br /> |
| gravity | `setGravity()` | Vector3f(0.0f,0.1f,0.0f) | Particles fall in the direction of the vector (e.g. debris, sparks).<br />(0,0,0) = Particles keep flying in start direction (e.g. flames, zero-gravity explosion.)<br /> |
| start area | `setShape(new EmitterSphereShape( Vector3f.ZERO, 2f));` | EmitterPointShape() | By default, particles are emitted from the emitters location (a point). You can increase the emitter shape to occupy a sphere, so that the start point of new particles can be anywhere inside the sphere, which makes the effect a bit more irregular.<br /> |

Build up your effect by specifying one parameter after the other. If you change several parameters at the same time, it's difficult to tell which of the values caused which outcome.

## Create an Effect Material

![flash.png](/wiki-assets/docs/tutorials/assets/images/beginner/flash.png)

Use the common Particle.j3md Material Definition and a texture to specify the shape of the particles. The shape is defined by the texture you provide and can be anything – debris, flames, smoke, mosquitoes, leaves, butterflies… be creative.

```java

    Material flash_mat = new Material(
        assetManager, "Common/MatDefs/Misc/Particle.j3md");
    flash_mat.setTexture("Texture",
        assetManager.loadTexture("Effects/Explosion/flash.png"));
    flash.setMaterial(flash_mat);
    flash.setImagesX(2); // columns
    flash.setImagesY(2); // rows
    flash.setSelectRandomImage(true);

```

The effect texture can be one image, or contain a sprite animation – a series of slightly different pictures in equally spaced rows and columns. If you choose the sprite animation:

- Specify the number of rows and columns using setImagesX(2) and setImagesY().
- Specify whether you want to play the sprite series in order (animation), or at random (explosion, flame), by setting setSelectRandomImage() true or false.

*Examples:* Have a look at the following default textures and you will see how you can create your own sprite textures after the same fashion.

### Default Particle Textures

The Material is used together with grayscale texture: The black parts will be transparent and the white parts will be opaque (colored).
The following effect textures are available by default from `test-data.jar`. You can also load your own textures from your assets directory.

| Texture Path |
| --- |
| Dimension |
| Preview<br /> |
| Effects/Explosion/Debris.png |
| 3*3 |
| ![Debris.png](/wiki-assets/docs/tutorials/assets/images/beginner/Debris.png)<br /> |
| Effects/Explosion/flame.png |
| 2*2 |
| ![flame.png](/wiki-assets/docs/tutorials/assets/images/beginner/flame.png)<br /> |
| Effects/Explosion/flash.png |
| 2*2 |
| ![flash.png](/wiki-assets/docs/tutorials/assets/images/beginner/flash.png)<br /> |
| Effects/Explosion/roundspark.png |
| 1*1 |
| ![roundspark.png](/wiki-assets/docs/tutorials/assets/images/beginner/roundspark.png)<br /> |
| Effects/Explosion/shockwave.png |
| 1*1 |
| ![shockwave.png](/wiki-assets/docs/tutorials/assets/images/beginner/shockwave.png)<br /> |
| Effects/Explosion/smoketrail.png |
| 1*3 |
| ![smoketrail.png](/wiki-assets/docs/tutorials/assets/images/beginner/smoketrail.png)<br /> |
| Effects/Explosion/spark.png |
| 1*1 |
| ![spark.png](/wiki-assets/docs/tutorials/assets/images/beginner/spark.png)<br /> |
| Effects/Smoke/Smoke.png |
| 1*15 |
| ![Smoke.png](/wiki-assets/docs/tutorials/assets/images/beginner/Smoke.png)<br /> |

:::tip
Use the `setStartColor()`/`setEndColor()` settings described above to colorize the white and gray parts of textures.
:::

## Usage Example

```java

    ParticleEmitter fire = new ParticleEmitter("Emitter", Type.Triangle, 30);
    Material mat_red = new Material(assetManager, "Common/MatDefs/Misc/Particle.j3md");
    mat_red.setTexture("Texture", assetManager.loadTexture("Effects/Explosion/flame.png"));
    fire.setMaterial(mat_red);
    fire.setImagesX(2); fire.setImagesY(2); // 2x2 texture animation
    fire.setEndColor(  new ColorRGBA(1f, 0f, 0f, 1f));   // red
    fire.setStartColor(new ColorRGBA(1f, 1f, 0f, 0.5f)); // yellow
    fire.getParticleInfluencer().setInitialVelocity(new Vector3f(0,2,0));
    fire.setStartSize(1.5f);
    fire.setEndSize(0.1f);
    fire.setGravity(0,0,0);
    fire.setLowLife(0.5f);
    fire.setHighLife(3f);
    fire.getParticleInfluencer().setVelocityVariation(0.3f);
    rootNode.attachChild(fire);

```

Browse the full source code of all [effect examples](https://github.com/jMonkeyEngine/jmonkeyengine/tree/master/jme3-examples/src/main/java/jme3test/effect) here.

---

See also: [Effects Overview](effects_overview.md)
