# Walking Character

In the [Hello Collision](../../tutorials/beginner/hello_collision.md) tutorial and the [TestQ3.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/bullet/TestQ3.java) code sample you have seen how to create collidable landscapes and walk around in a first-person perspective. The first-person camera is enclosed by a collision shape and is steered by the BetterCharacterControl.

Other games however require a third-person perspective of the character: In these cases you use a CharacterControl on a Spatial. This example also shows how to set up custom navigation controls, so you can press WASD to make the third-person character walk; and how to implement dragging the mouse to rotate.

## Sample Code

Several related code samples can be found here:

- [TestPhysicsCharacter.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/bullet/TestPhysicsCharacter.java) (third-person view)
- [TestWalkingChar.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/bullet/TestWalkingChar.java) (third-person view)
  - Uses also [BombControl.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/bullet/BombControl.java)

- [TestQ3.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/bullet/TestQ3.java) (first-person view)
- [HelloCollision.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/helloworld/HelloCollision.java) (first-person view)

The code in this tutorial is a combination of these samples.

## BetterCharacterControl

Motivation: When you load a character model, give it a RigidBodyControl, and use forces to push it around, you do not get the desired behaviour: RigidBodyControl'ed objects (such as cubes and spheres) roll or tip over when pushed by physical forces. This is not the behaviour that you expect of a walking character. JME3's BulletPhysics integration offers a BetterCharacterControl with a `setWalkDirection()` method. You use it to create simple characters that treat floors and walls as solid, and always stays locked upright while moving.

To use the BetterCharacterControl, you may load your character like this:

```java

// Load any model
Spatial playerSpatial = assetManager.loadModel("Models/Oto/Oto.mesh.xml");
player =  (Node)playerSpatial; // You can set the model directly to the player. (We just wanted to explicitly show that it's a spatial.)
Node playerNode = new Node(); // You can create a new node to wrap your player to adjust the location. (This allows you to solve issues with character sinking into floor, etc.)
playerNode.attachChild(player); // add it to the wrapper
player.move(0,3.5f,0); // adjust position to ensure collisions occur correctly.
player.setLocalScale(0.5f); // optionally adjust scale of model
// setup animation:
control = player.getControl(AnimControl.class);
control.addListener(this);
channel = control.createChannel();
channel.setAnim("stand");
playerControl = new BetterCharacterControl(1.5f, 6f, 1f); // construct character. (If your character bounces, try increasing height and weight.)
playerNode.addControl(playerControl); // attach to wrapper
// set basic physical properties:
playerControl.setJumpForce(new Vector3f(0,5f,0));
playerControl.warp(new Vector3f(0,10,10)); // warp character into landscape at particular location
// add to physics state
bulletAppState.getPhysicsSpace().add(playerControl);
bulletAppState.getPhysicsSpace().addAll(playerNode);
// You can change the gravity of individual physics objects after they are
// added to the PhysicsSpace.
playerControl.setGravity(new Vector3f(0,-1f,0));

rootNode.attachChild(playerNode); // add wrapper to root

```

This table doesn't contain all of the methods of the BetterCharacterControl class, just the commonly used ones. For a full list, see the [java doc](https://javadoc.jmonkeyengine.org/com/jme3/bullet/control/BetterCharacterControl.html).

<table>
  <thead>
    <tr>
      <th>BetterCharacterControl Method</th>
      <th>Property<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>warp(new Vector3f(0,10,10)</td>
      <td>Move the character somewhere. Note the character also takes the location of any spatial its being attached to at the moment it is attached.<br /></td>
    </tr>
    <tr>
      <td>jump()</td>
      <td>Makes the character jump with the set jump force.<br /></td>
    </tr>
    <tr>
      <td>setJumpForce(new Vector3f(0,5f,0)</td>
      <td>Set the jump force as a Vector3f. The jump force is local to the characters coordinate system, which normally is always z-forward (in world coordinates, parent coordinates when set to applyLocalPhysics)<br /></td>
    </tr>
    <tr>
      <td>isOnGround()</td>
      <td>Check if the character is on the ground. This is determined by a ray test in the center of the character and might return false even if the character is not falling yet.<br /></td>
    </tr>
    <tr>
      <td>setDucked(true)</td>
      <td>Toggle character ducking. When ducked the characters capsule collision shape height will be multiplied by duckedFactor to make the capsule smaller. When unducking, the character will check with a ray test if it can in fact unduck and only do so when its possible. You can check the state of the unducking by checking isDucked().<br /></td>
    </tr>
    <tr>
      <td>setDuckedFactor(2.0f)</td>
      <td>The factor by which the height should be multiplied when ducking.<br /></td>
    </tr>
    <tr>
      <td>setWalkDirection(new Vector3f(0f,0f,0.1f))</td>
      <td>Sets the walk direction of the character. This parameter is frame rate independent and the character will move continuously in the direction given by the vector with the speed given by the vector length in m/s.<br /></td>
    </tr>
    <tr>
      <td>setViewDirection(new Vector3f(0f,0f,0.1f))</td>
      <td>Sets the view direction for the character. Note this only defines the rotation of the spatial in the local x/z plane of the character.<br /></td>
    </tr>
    <tr>
      <td>resetForward(new Vector3f(0f,0f,0.1f))</td>
      <td>Realign the local forward vector to given direction vector, if null is supplied Vector3f.UNIT_Z is used. Input vector has to be perpendicular to current gravity vector. This normally only needs to be called when the gravity direction changed continuously and the local forward vector is off due to drift. E.g. after walking around on a sphere "planet" for a while and then going back to a y-up coordinate system the local z-forward might not be 100% aligned with Z axis.<br /></td>
    </tr>
    <tr>
      <td>setGravity(new Vector3f(0,-1f,0))</td>
      <td>Set the gravity for this character. Note that this also realigns the local coordinate system of the character so that continuous changes in gravity direction are possible while maintaining a sensible control over the character. Only takes effect if the individual physics object has already been added to the PhysicsSpace, otherwise it adopts the PhysicsSpace gravity.<br /></td>
    </tr>
    <tr>
      <td>setPhysicsDamping(0.9f)</td>
      <td>Sets how much the physics forces in the local x/z plane should be dampened. 0 = no dampening, 1 = no external force, default = 0.9<br /></td>
    </tr>
    <tr>
      <td>setHeightPercent(float percent)</td>
      <td>This actually sets a new collision shape to the character to change the height of the capsule.<br /></td>
    </tr>
  </tbody>
</table>

## Character Control

This code sample creates a simple upright Character using a CharacterControl:

```java

// Load any model
Node myCharacter = (Node) assetManager.loadModel("Models/myCharacterModel.mesh.xml");
rootNode.attachChild(myCharacter);
// Create a appropriate physical shape for it
CapsuleCollisionShape capsuleShape = new CapsuleCollisionShape(1.5f, 6f, 1);
CharacterControl myCharacter_phys = new CharacterControl(capsuleShape, 0.01f);
// Attach physical properties to model and PhysicsSpace
myCharacter.addControl(myCharacter_phys);
bulletAppState.getPhysicsSpace().add(myCharacter_phys);

```

:::important
The BulletPhysics CharacterControl only collides with "`real`" PhysicsControls (RigidBody). It does not detect collisions with other CharacterControls! If you need additional collision checks, add GhostControls to your characters and create a custom [collision listener](../collision/physics_listeners.md) to respond.
:::

A CharacterControl is a special kinematic object with restricted movement. CharacterControls have a fixed "`upward`" axis, this means they do not topple over when walking over an obstacle (as opposed to RigidBodyControls), which simulates a being's ability to balance upright. A CharacterControl can jump and fall along its upward axis, and it can scale steps of a certain height/steepness.
<table>
  <thead>
    <tr>
      <th>CharacterControl Method</th>
      <th>Property<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>setUpAxis(1)</td>
      <td>Fixed upward axis. Values: 0 = X axis , 1 = Y axis , 2 = Z axis. +<br />Default: 1, because for characters and vehicles, up is typically along the Y axis.<br /></td>
    </tr>
    <tr>
      <td>setJumpSpeed(10f)</td>
      <td>Jump speed (movement along upward-axis)<br /></td>
    </tr>
    <tr>
      <td>setFallSpeed(20f)</td>
      <td>Fall speed (movement opposite to upward-axis)<br /></td>
    </tr>
    <tr>
      <td>setMaxSlope(1.5f)</td>
      <td>How steep the slopes and steps are that the character can climb without considering them an obstacle. Higher obstacles need to be jumped. Vertical height in world units.<br /></td>
    </tr>
    <tr>
      <td>setGravity(1f)</td>
      <td>The intensity of gravity for this CharacterControl'ed entity. Tip: To change the direction of gravity for a character, modify the up axis.<br /></td>
    </tr>
    <tr>
      <td>setWalkDirection(new Vector3f(0f,0f,0.1f))</td>
      <td>(CharacterControl only) Make a physical character walk continuously while checking for floors and walls as solid obstacles. This should probably be called "`setPositionIncrementPerSimulatorStep`". This argument is neither a direction nor a velocity, but the amount to increment the position each physics tick: vector length = accuracy*speed in m/s. +<br />Use `setWalkDirection(Vector3f.ZERO)` to stop a directional motion.<br /></td>
    </tr>
  </tbody>
</table>

For best practices on how to use `setWalkDirection()`, see the Navigation Inputs example below.

## Walking Character Demo

### Code Skeleton

```java
public class WalkingCharacterDemo extends SimpleApplication
        implements ActionListener, AnimEventListener {

  public static void main(String[] args) {
    WalkingCharacterDemo app = new WalkingCharacterDemo();
    app.start();
  }

  public void simpleInitApp() { }

  public void simpleUpdate(float tpf) { }

  public void onAction(String name, boolean isPressed, float tpf) { }

  public void onAnimCycleDone(AnimControl control, AnimChannel channel, String animName) { }

  public void onAnimChange(AnimControl control, AnimChannel channel, String animName) { }
...
}
```

### Overview

To create a walking character:

1. (Unless you already have it) Activate physics in the scene by adding a [BulletAppState](../physics.md).
1. Init the scene by loading the game level model (terrain or floor/buildings), and giving the scene a MeshCollisionShape.
1. Create the animated character:
  1. Load an animated character model.
  1. Add a CharacterControl to the model.

1. Set up animation channel and controllers.
1. Add a ChaseCam or CameraNode.
1. Handle navigational inputs.

### Activate Physics

```java

private BulletAppState bulletAppState;
...
public void simpleInitApp() {
    bulletAppState = new BulletAppState();
    //bulletAppState.setThreadingType(BulletAppState.ThreadingType.PARALLEL);
    stateManager.attach(bulletAppState);
    ...
}

```

### Initialize the Scene

In the simpleInitApp() method you initialize the scene and give it a MeshCollisionShape. The sample in the jme3 sources uses a custom helper class that simply creates a flat floor and drops some cubes and spheres on it:

```java

public void simpleInitApp() {
  ...
  PhysicsTestHelper.createPhysicsTestWorld(rootNode,
      assetManager, bulletAppState.getPhysicsSpace());
  ...

```

In a real game, you would load a scene model here instead of a test world. You can load a model from a local or remote zip file, and scale and position it:

```java

private Node gameLevel;
..
public void simpleInitApp() {
  ...
  //assetManager.registerLocator("quake3level.zip", ZipLocator.class);
  assetManager.registerLocator(
  "http://jmonkeyengine.googlecode.com/files/quake3level.zip",
    HttpZipLocator.class);
  MaterialList matList = (MaterialList) assetManager.loadAsset("Scene.material");
  OgreMeshKey key = new OgreMeshKey("main.meshxml", matList);
  gameLevel = (Node) assetManager.loadAsset(key);
  gameLevel.setLocalTranslation(-20, -16, 20);
  gameLevel.setLocalScale(0.10f);
  gameLevel.addControl(new RigidBodyControl(0));
  rootNode.attachChild(gameLevel);
  bulletAppState.getPhysicsSpace().addAll(gameLevel);
  ...

```

Also, add a light source to be able to see the scene.

```java

  AmbientLight light = new AmbientLight();
  light.setColor(ColorRGBA.White.mult(2));
  rootNode.addLight(light);

```

### Create the Animated Character

You create an animated model, such as Oto.mesh.xml.

1. Place the "`Oto`" model into the `assets/Models/Oto/` directory of your project.
1. Create the CollisionShape and adjust the capsule radius and height to fit your character model.
1. Create the CharacterControl and adjust the stepheight (here 0.05f) to the height that the character can climb up without jumping.
1. Load the visible model. Make sure its start position does not overlap with scene objects.
1. Add the CharacterControl to the model and register it to the physicsSpace.
1. Attach the visible model to the rootNode.

```java

private CharacterControl character;
private Node model;
...
public void simpleInitApp() {
  ...
  CapsuleCollisionShape capsule = new CapsuleCollisionShape(3f, 4f);
  character = new CharacterControl(capsule, 0.05f);
  character.setJumpSpeed(20f);
  model = (Node) assetManager.loadModel("Models/Oto/Oto.mesh.xml");
  model.addControl(character);
  bulletAppState.getPhysicsSpace().add(character);
  rootNode.attachChild(model);
  ...

```

:::tip
*Did you know?* A CapsuleCollisionShape is a cylinder with rounded top and bottom. A capsule rotated upright is a good collision shape for a humanoid character since its roundedness reduces the risk of getting stuck on obstacles.
:::

### Set Up AnimControl and AnimChannels

Create several AnimChannels, one for each animation that can happen simultaneously. In this example, you create one channel for walking and one for attacking. (Because the character can attack with its arms and walk with the rest of the body at the same time.)

```java

private AnimChannel animationChannel;
private AnimChannel attackChannel;
private AnimControl animationControl;
...
public void simpleInitApp() {
  ...
  animationControl = model.getControl(AnimControl.class);
  animationControl.addListener(this);
  animationChannel = animationControl.createChannel();
  attackChannel = animationControl.createChannel();
  attackChannel.addBone(animationControl.getSkeleton().getBone("uparm.right"));
  attackChannel.addBone(animationControl.getSkeleton().getBone("arm.right"));
  attackChannel.addBone(animationControl.getSkeleton().getBone("hand.right"));
  ...

```

The attackChannel only controls one arm, while the walking channels controls the whole character.

### Add ChaseCam / CameraNode

```java

private ChaseCamera chaseCam;

...

public void simpleInitApp() {
  ...
  flyCam.setEnabled(false);
  chaseCam = new ChaseCamera(cam, model, inputManager);
  ...

```

### Handle Navigation

Configure custom key bindings for WASD keys that you will use to make the character walk. Then calculate the vector where the user wants the character to move. Note the use of the special `setWalkDirection()` method below.

```java

// track directional input, so we can walk left-forward etc
private boolean left = false, right = false, up = false, down = false;
...

public void simpleInitApp() {
  ...
  // configure mappings, e.g. the WASD keys
  inputManager.addMapping("CharLeft", new KeyTrigger(KeyInput.KEY_A));
  inputManager.addMapping("CharRight", new KeyTrigger(KeyInput.KEY_D));
  inputManager.addMapping("CharForward", new KeyTrigger(KeyInput.KEY_W));
  inputManager.addMapping("CharBackward", new KeyTrigger(KeyInput.KEY_S));
  inputManager.addMapping("CharJump", new KeyTrigger(KeyInput.KEY_RETURN));
  inputManager.addMapping("CharAttack", new KeyTrigger(KeyInput.KEY_SPACE));
  inputManager.addListener(this, "CharLeft", "CharRight");
  inputManager.addListener(this, "CharForward", "CharBackward");
  inputManager.addListener(this, "CharJump", "CharAttack");
  ...
}

```

Respond to the key bindings by setting variables that track in which direction you will go. This allows us to steer the character forwards and to the left at the same time. *Note that no actual walking happens here yet!* We just track the input.

```java

@Override
public void onAction(String binding, boolean value, float tpf) {
  if (binding.equals("CharLeft")) {
      if (value) left = true;
      else left = false;
  } else if (binding.equals("CharRight")) {
      if (value) right = true;
      else right = false;
  } else if (binding.equals("CharForward")) {
      if (value) up = true;
      else up = false;
  } else if (binding.equals("CharBackward")) {
      if (value) down = true;
      else down = false;
  } else if (binding.equals("CharJump"))
      character.jump();
  if (binding.equals("CharAttack"))
    attack();
}

```

The player can attack and walk at the same time. `Attack()` is a custom method that triggers an attack animation in the arms. Here you should also add custom code to play an effect and sound, and to determine whether the hit was successful.

```java

private void attack() {
    attackChannel.setAnim("Dodge", 0.1f);
    attackChannel.setLoopMode(LoopMode.DontLoop);
}

```

Finally, the update loop looks at the directional variables and moves the character accordingly. Since this is a special kinematic CharacterControl, we use the `setWalkDirection()` method.

The variable `airTime` tracks how long the character is off the ground (e.g. when jumping or falling) and adjusts the walk and stand animations accordingly.

```java

private Vector3f walkDirection = new Vector3f(0,0,0); // stop

private float airTime = 0;

public void simpleUpdate(float tpf) {
  Vector3f camDir = cam.getDirection().clone();
  Vector3f camLeft = cam.getLeft().clone();
  camDir.y = 0;
  camLeft.y = 0;
  camDir.normalizeLocal();
  camLeft.normalizeLocal();
  walkDirection.set(0, 0, 0);

  if (left)  walkDirection.addLocal(camLeft);
  if (right) walkDirection.addLocal(camLeft.negate());
  if (up) walkDirection.addLocal(camDir);
  if (down) walkDirection.addLocal(camDir.negate());

  if (!character.onGround()) { // use !character.isOnGround() if the character is a BetterCharacterControl type.
      airTime += tpf;
  } else {
      airTime = 0;
  }

  if (walkDirection.lengthSquared() == 0) { //Use lengthSquared() (No need for an extra sqrt())
      if (!"stand".equals(animationChannel.getAnimationName())) {
        animationChannel.setAnim("stand", 1f);
      }
  } else {
      character.setViewDirection(walkDirection);
      if (airTime > .3f) {
        if (!"stand".equals(animationChannel.getAnimationName())) {
          animationChannel.setAnim("stand");
        }
      } else if (!"Walk".equals(animationChannel.getAnimationName())) {
        animationChannel.setAnim("Walk", 0.7f);
      }
    }

  walkDirection.multLocal(25f).multLocal(tpf);// The use of the first multLocal here is to control the rate of movement multiplier for character walk speed. The second one is to make sure the character walks the same speed no matter what the frame rate is.
  character.setWalkDirection(walkDirection); // THIS IS WHERE THE WALKING HAPPENS
}

```

This method resets the walk animation.

```java

public void onAnimCycleDone(AnimControl control, AnimChannel channel, String animName) {
        if (channel == attackChannel) channel.setAnim("stand");
}

public void onAnimChange(AnimControl control, AnimChannel channel, String animName) { }

```

---
See also:

- [https://hub.jmonkeyengine.org/t/bettercharactercontrol-in-the-works/25242](https://hub.jmonkeyengine.org/t/bettercharactercontrol-in-the-works/25242)
