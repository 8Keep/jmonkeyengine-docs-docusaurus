# Particle Emitter Settings

You cannot create a 3D model for delicate things like fire, smoke, or explosions. Particle Emitters are quite an efficient solution to create these kinds of effects: The emitter renders a series of flat orthogonal images and manipulates them in a way that creates the illusion of a anything from a delicate smoke cloud to individual flames, etc.
Creating an effect involves some trial and error to get the settings _just right_, and it's worth exploring the expressiveness of the options described below.

:::tip
Use the [Scene Explorer](../../sdk/scene_explorer.md) in the [SDK](../../sdk/sdk.md) to design and preview effects.
:::

image:effect/explosion-5.png[explosion-5.png,width="150",height="100"]
image:effect/particle.png[particle.png,width="150",height="100"]
image:tutorials:beginner/beginner-effect-fire.png[beginner-effect-fire.png,width="150",height="100"]
image:effect/butterfly-particle-emitter.png[butterfly-particle-emitter.png,width="150",height="100"]

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
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Method</th>
      <th>Default</th>
      <th>Description<br /></th>
      <th>number</th>
      <th>`setNumParticles()`</th>
      <th></th>
      <th>The maximum number of particles visible at the same time. Specified by user in constructor.<br /></th>
      <th>emission rate</th>
      <th>`setParticlesPerSec()`</th>
      <th>20</th>
      <th>Density of the effect, how many new particles are emitted per second. +<br />Set to zero to control the start/end of the effect. +<br />Set to a number for a constantly running effect.<br /></th>
      <th>size</th>
      <th>`setStartSize()`, `setEndSize()`</th>
      <th>0.2f, 2f</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The radius of the scaled sprite image. Set both to same value for constant size effect. +<br />Set to different values for shrink/grow effect.<br /></td>
      <td>color</td>
      <td>`setStartColor()`, `setEndColor()`</td>
      <td>gray</td>
      <td>Controls how the opaque (non-black) parts of the texture are colorized. +<br />Set both to the same color for single-colored effects (e.g. fog, debris). +<br />Set both to different colors for a gradient effect (e.g. fire).<br /></td>
      <td>direction/velocity</td>
      <td>`getParticleInfluencer(). setInitialVelocity(initialVelocity)`</td>
      <td>Vector3f(0,0,0)</td>
      <td>A vector specifying the initial direction and speed of particles. The longer the vector, the faster.<br /></td>
      <td>fanning out</td>
      <td>`getParticleInfluencer().setVelocityVariation(variation)`</td>
      <td>0.2f</td>
      <td>How much the direction (`setInitialVelocity()`) can vary among particles. Use a value between 1 and 0 to create a directed swarm-like cloud of particles. +<br />1 = Maximum variation, particles emit in random 360° directions (e.g. explosion, butterflies). +<br />0.5f = particles are emitted within 180° of the initial direction. +<br />0 = No variation, particles fly in a straight line in direction of start velocity (e.g. lasergun blasts).<br /></td>
      <td>direction +<br />(pick one)</td>
      <td>`setFacingVelocity()`</td>
    </tr>
    <tr>
      <td>false</td>
      <td>true = Flying particles pitch in the direction they're flying (e.g. missiles). +<br />false = Particles keep flying rotated the way they started (e.g. debris).<br /></td>
      <td>direction +<br />(pick one)</td>
      <td>`setFaceNormal()`</td>
      <td>Vector3f.NAN</td>
      <td>Vector3f = Flying particles face in the given direction (e.g. horizontal shockwave faces up = Vector3f.UNIT_Y). +<br />Vector3f.NAN = Flying particles face the camera.<br /></td>
      <td>lifetime</td>
      <td>`setLowLife()`, `setHighLife()`</td>
      <td>3f, 7f</td>
      <td>The time period before a particle fades is set to a random value between minimum and maximum; minimum must be smaller than maximum. A minimum &lt; 1f makes the effect more busy, a higher minimum looks more steady. Use a maximum &lt; 1f for short bursts, and higher maxima for long lasting swarms or smoke. Set maximum and minimum to similar values to create an evenly spaced effect (e.g. fountain), set the to very different values to create a distorted effect (e.g. fire with individual long flames).<br /></td>
      <td>spinning</td>
      <td>`setRotateSpeed()`</td>
      <td>0f</td>
      <td>0 = Flying particles don't spin while flying (e.g. smoke, insects, controlled projectiles). +<br />&gt; 0 = How fast particle spins while flying (e.g. debris, shuriken, missiles out of control).<br /></td>
      <td>rotation</td>
    </tr>
    <tr>
      <td>`setRandomAngle()`</td>
      <td>false</td>
      <td>true = The particle sprite is rotated at a random angle when it is emitted (e.g. explosion, debris). +<br />false = Particles fly straight like you drew them in the sprite texture (e.g. insects).<br /></td>
      <td>gravity</td>
      <td>`setGravity()`</td>
      <td>Vector3f(0.0f,0.1f,0.0f)</td>
      <td>Particles fall in the direction of the vector (e.g. debris, sparks). +<br />(0,0,0) = Particles keep flying in start direction (e.g. flames, zero-gravity explosion.)<br /></td>
      <td>start area</td>
      <td>`setShape(new EmitterSphereShape( Vector3f.ZERO, 2f));`</td>
      <td>EmitterPointShape()</td>
      <td>By default, particles are emitted from the emitters location (a point). You can increase the emitter shape to occupy a sphere, so that the start point of new particles can be anywhere inside the sphere, which makes the effect a bit more irregular.<br /></td>
    </tr>
  </tbody>
</table>

Build up your effect by specifying one parameter after the other. If you change several parameters at the same time, it's difficult to tell which of the values caused which outcome.

## Create an Effect Material

image:tutorials:beginner/flash.png[flash.png,width="128",height="128"]

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

<table>
  <thead>
    <tr>
      <th>Texture Path</th>
      <th>Dimension</th>
      <th>Preview<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Effects/Explosion/Debris.png</td>
      <td>3*3</td>
      <td>image:tutorials:beginner/Debris.png[Debris.png,width="32",height="32"]<br /></td>
    </tr>
    <tr>
      <td>Effects/Explosion/flame.png</td>
      <td>2*2</td>
      <td>image:tutorials:beginner/flame.png[flame.png,width="32",height="32"]<br /></td>
    </tr>
    <tr>
      <td>Effects/Explosion/flash.png</td>
      <td>2*2</td>
      <td>image:tutorials:beginner/flash.png[flash.png,width="32",height="32"]<br /></td>
    </tr>
    <tr>
      <td>Effects/Explosion/roundspark.png</td>
      <td>1*1</td>
      <td>image:tutorials:beginner/roundspark.png[roundspark.png,width="32",height="32"]<br /></td>
    </tr>
    <tr>
      <td>Effects/Explosion/shockwave.png</td>
      <td>1*1</td>
      <td>image:tutorials:beginner/shockwave.png[shockwave.png,width="32",height="32"]<br /></td>
    </tr>
    <tr>
      <td>Effects/Explosion/smoketrail.png</td>
      <td>1*3</td>
      <td>image:tutorials:beginner/smoketrail.png[smoketrail.png,width="32",height="32"]<br /></td>
    </tr>
    <tr>
      <td>Effects/Explosion/spark.png</td>
      <td>1*1</td>
      <td>image:tutorials:beginner/spark.png[spark.png,width="32",height="32"]<br /></td>
    </tr>
    <tr>
      <td>Effects/Smoke/Smoke.png</td>
      <td>1*15</td>
      <td>image:tutorials:beginner/Smoke.png[Smoke.png,width="96",height="32"]<br /></td>
    </tr>
  </tbody>
</table>

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
