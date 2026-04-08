# jMonkeyEngine 3 Tutorial (12) - Hello Effects

![beginner-effect-fire.png](/wiki-assets/docs/tutorials/assets/images/beginner/beginner-effect-fire.png)

When you see one of the following in a game, then a particle system is likely behind it:

- Fire, flames, sparks;
- Rain, snow, waterfalls, leaves;
- Explosions, debris, shockwaves;
- Dust, fog, clouds, smoke;
- Insects swarms, meteor showers;
- Magic spells.

These scene elements cannot be modeled by meshes. In very simple terms:

- The difference between an explosion and a dust cloud is the speed of the particle effect.
- The difference between flames and a waterfall is the direction and the color of the particle effect.

Particle effects can be animated (e.g. sparks, drops) and static (strands of grass, hair). Non-particle effects include bloom/glow, and motion blur/afterimage. In this tutorial you learn how to make animated particles (com.jme3.effect).

:::tip
To use the example assets in a new jMonkeyEngine SDK project, right-click your project, select "Properties &gt; Libraries &gt; Add Library", and add the "`jme3-test-data`" library.
:::

## Sample Code

```java
package jme3test.helloworld;

import com.jme3.app.SimpleApplication;
import com.jme3.effect.ParticleEmitter;
import com.jme3.effect.ParticleMesh;
import com.jme3.material.Material;
import com.jme3.math.ColorRGBA;
import com.jme3.math.Vector3f;

/** Sample 11 - how to create fire, water, and explosion effects. */
public class HelloEffects extends SimpleApplication {

  public static void main(String[] args) {
    HelloEffects app = new HelloEffects();
    app.start();
  }

  @Override
  public void simpleInitApp() {

    ParticleEmitter fire =
            new ParticleEmitter("Emitter", ParticleMesh.Type.Triangle, 30);
    Material mat_red = new Material(assetManager,
            "Common/MatDefs/Misc/Particle.j3md");
    mat_red.setTexture("Texture", assetManager.loadTexture(
            "Effects/Explosion/flame.png"));
    fire.setMaterial(mat_red);
    fire.setImagesX(2);
    fire.setImagesY(2); // 2x2 texture animation
    fire.setEndColor(  new ColorRGBA(1f, 0f, 0f, 1f));   // red
    fire.setStartColor(new ColorRGBA(1f, 1f, 0f, 0.5f)); // yellow
    fire.getParticleInfluencer().setInitialVelocity(new Vector3f(0, 2, 0));
    fire.setStartSize(1.5f);
    fire.setEndSize(0.1f);
    fire.setGravity(0, 0, 0);
    fire.setLowLife(1f);
    fire.setHighLife(3f);
    fire.getParticleInfluencer().setVelocityVariation(0.3f);
    rootNode.attachChild(fire);

    ParticleEmitter debris =
            new ParticleEmitter("Debris", ParticleMesh.Type.Triangle, 10);
    Material debris_mat = new Material(assetManager,
            "Common/MatDefs/Misc/Particle.j3md");
    debris_mat.setTexture("Texture", assetManager.loadTexture(
            "Effects/Explosion/Debris.png"));
    debris.setMaterial(debris_mat);
    debris.setImagesX(3);
    debris.setImagesY(3); // 3x3 texture animation
    debris.setRotateSpeed(4);
    debris.setSelectRandomImage(true);
    debris.getParticleInfluencer().setInitialVelocity(new Vector3f(0, 4, 0));
    debris.setStartColor(ColorRGBA.White);
    debris.setGravity(0, 6, 0);
    debris.getParticleInfluencer().setVelocityVariation(.60f);
    rootNode.attachChild(debris);
    debris.emitAllParticles();
    
//    ParticleEmitter water = 
//            new ParticleEmitter("Emitter", ParticleMesh.Type.Triangle, 20);
//    Material mat_blue = new Material(assetManager, 
//            "Common/MatDefs/Misc/Particle.j3md");
//    mat_blue.setTexture("Texture", assetManager.loadTexture(
//            "Effects/Explosion/flame.png"));
//    water.setMaterial(mat_blue);
//    water.setImagesX(2); 
//    water.setImagesY(2); // 2x2 texture animation
//    water.setStartColor( ColorRGBA.Blue); 
//    water.setEndColor( ColorRGBA.Cyan); 
//    water.getParticleInfluencer().setInitialVelocity(new Vector3f(0, -4, 0));
//    water.setStartSize(1f);
//    water.setEndSize(1.5f);
//    water.setGravity(0,1,0);
//    water.setLowLife(1f);
//    water.setHighLife(1f);
//    water.getParticleInfluencer().setVelocityVariation(0.1f);
//    water.setLocalTranslation(0, 6, 0);
//    rootNode.attachChild(water);

  }
}
```

You should see an explosion that sends debris flying, and a fire.
[More example code is here.](https://github.com/jMonkeyEngine/jmonkeyengine/tree/master/jme3-examples/src/main/java/jme3test/effect)

### Texture Animation and Variation

![Debris.png](/wiki-assets/docs/tutorials/assets/images/beginner/Debris.png)

Start by choosing a material texture for your effect. If you provide the emitter with a set of textures (see image), it can use them either for variation (random order), or as animation steps (fixed order).

Setting emitter textures works just as you have already learned in previous chapters. This time you base the material on the `Particle.j3md` material definition. Let's have a closer look at the material for the Debris effect.

```java

    ParticleEmitter debris =
            new ParticleEmitter("Debris", ParticleMesh.Type.Triangle, 10);
    Material debris_mat = new Material(assetManager,
            "Common/MatDefs/Misc/Particle.j3md");
    debris_mat.setTexture("Texture", assetManager.loadTexture(
            "Effects/Explosion/Debris.png"));
    debris.setMaterial(debris_mat);
    debris.setImagesX(3);
    debris.setImagesY(3); // 3x3 texture animation
    debris.setSelectRandomImage(true);
        ...

```

1. Create a material and load the texture.
1. Tell the Emitter into how many animation steps (x*y) the texture is divided. +
The debris texture has 3x3 frames.
1. Optionally, tell the Emitter whether the animation steps are to be at random, or in order. +
For the debris, the frames play at random.

As you see in the debris example, texture animations improve effects because each "`flame`" or "`piece`" of debris now looks different. Also think of electric or magic effects, where you can create very interesting animations by using an ordered morphing series of lightning bolts; or flying leaves or snow flakes, for instance.

The fire material is created the same way, just using "`Effects/Explosion/flame.png`" texture, which has with 2x2 ordered animation steps.

### Default Particle Textures

The following particle textures are included in `test-data.jar`. You can copy and use them in your own effects.

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

Copy them into your `assets/Effects` directory to use them.

## Creating Custom Textures

For your game, you will likely create custom particle textures. Look at the fire example again.

```java

    ParticleEmitter fire =
            new ParticleEmitter("Emitter", ParticleMesh.Type.Triangle, 30);
    Material mat_red = new Material(assetManager,
            "Common/MatDefs/Misc/Particle.j3md");
    mat_red.setTexture("Texture", assetManager.loadTexture(
            "Effects/Explosion/flame.png"));
    fire.setMaterial(mat_red);
    fire.setImagesX(2);
    fire.setImagesY(2); // 2x2 texture animation
    fire.setEndColor(  new ColorRGBA(1f, 0f, 0f, 1f));   // red
    fire.setStartColor(new ColorRGBA(1f, 1f, 0f, 0.5f)); // yellow

```

![flame.png](/wiki-assets/docs/tutorials/assets/images/beginner/flame.png)

Compare the texture with the resulting effect.

- Black parts of the image become fully transparent.
- White/gray parts of the image are translucent and get colorized.
- You set the color using `setStartColor()` and `setEndColor()`. +
For fire, it's a gradient from yellow to red.
- By default, the animation is played in order and loops.

Create a grayscale texture in a graphic editor, and save it to your `assets/Effects` directory. If you split up one image file into x*y animation steps, make sure each square is of equal size–just as you see in the examples here.

### Emitter Parameters

A particle system is always centered around an emitter.

Use the `setShape()` method to change the EmitterShape:

- EmitterPointShape(Vector3f.ZERO) –  particles emit from a point (default)
- EmitterSphereShape(Vector3f.ZERO,2f) – particles emit from a sphere-sized area
- EmitterBoxShape(new Vector3f(-1f,-1f,-1f),new Vector3f(1f,1f,1f)) – particles emit from a box-sized area

Example:

```java
emitter.setShape(new EmitterPointShape(Vector3f.ZERO));
```

You create different effects by changing the emitter parameters:
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Method</th>
      <th>Default</th>
      <th>Description<br /></th>
      <th>number</th>
      <th>`setNumParticles()`</th>
      <th>N/A</th>
      <th>The maximum number of particles visible at the same time. Value is specified by user in constructor. This influences the density and length of the "`trail`".<br /></th>
      <th>velocity</th>
      <th>`getParticleInfluencer().setInitialVelocity()`</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Vector3f.ZERO</td>
      <td>Specify a vector how fast particles move and in which start direction.<br /></td>
      <td>direction</td>
      <td>`getParticleInfluencer().setVelocityVariation()` +<br />`setFacingVelocity()` +<br />`setRandomAngle()` +<br />`setFaceNormal()` +<br />`setRotateSpeed()`</td>
      <td>0.2f +<br />false +<br />false +<br />Vector3f.NAN +<br />0.0f</td>
      <td>Optional accessors that control in which direction particles face while flying.<br /></td>
      <td>lifetime</td>
      <td>`setLowLife()` +<br />`setHighLife()`</td>
      <td>3f +<br />7f</td>
      <td>Minimum and maximum time period before particles fade.<br /></td>
    </tr>
    <tr>
      <td>emission rate</td>
      <td>`setParticlesPerSec()`</td>
      <td>20</td>
      <td>How many new particles are emitted per second.<br /></td>
      <td>color</td>
      <td>`setStartColor()` +<br />`setEndColor()`</td>
      <td>gray</td>
      <td>Set to the same colors, or to two different colors for a gradient effect.<br /></td>
      <td>size</td>
      <td>`setStartSize()` +<br />`setEndSize()`</td>
    </tr>
    <tr>
      <td>0.2f +<br />2f</td>
      <td>Set to two different values for shrink/grow effect, or to same size for constant effect.<br /></td>
      <td>gravity</td>
      <td>`setGravity()`</td>
      <td>0,1,0</td>
      <td>Whether particles fall down (positive) or fly up (negative). Set to 0f for a zero-g effect where particles keep flying.<br /></td>
    </tr>
  </tbody>
</table>

You can find details about [effect parameters](../../core/effect/particle_emitters.md#configureparameters) here.
Add and modify one parameter at a time, and try different values until you get the effect you want.

:::tip
Use the SceneComposer in the jMonkeyEngine SDK to create effects more easily. Create an empty scene and add an emitter object to it. Change the emitter properties and watch the outcome live. You can save created effects as .j3o file and load them like scenes or models.
:::

## Exercise

Can you "`invert`" the fire effect into a small waterfall? Here some tips:

- Change the Red and Yellow color to Cyan and Blue
- Invert the velocity vector (direction) by using a negative number
- Swap start and end size
- Activate gravity by setting it to 0,1,0

## Conclusion

You have learned that many different effects can be created by changing the parameters and textures of one general emitter object.
