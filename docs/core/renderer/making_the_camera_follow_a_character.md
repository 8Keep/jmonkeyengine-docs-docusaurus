# Making the Camera Follow a 3rd-Person Character

When players steer a game character with 1st-person view, they directly steer the camera (`flyCam.setEnabled(true);`), and they never see the walking character itself. In a game with 3rd-person view, however, the players see the character walk, and you (the game developer) want to make the camera follow the character around when it walks.

There are two ways how the camera can do that:

- Registering a chase camera to the player and the input manager.
- Attaching the camera to the character using a camera node.

*Important:* Using third-person view requires you to deactivate the default flyCam (first-person view). This means that you have to configure your own navigation ([key inputs and analogListener](../input/input_handling.md)) that make your player character walk. For moving a physical player character, use `player.setWalkDirection()`, for a non-physical character you can use `player.move()`.

## Code Samples

Press the WASD or arrow keys to move. Drag with the left mouse button to rotate.

- [TestChaseCamera.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/input/TestChaseCamera.java)
- [TestCameraNode.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/input/TestCameraNode.java)

## Camera Node

To make the camera follow a target node, add this camera node code to your init method (e.g. `simpleInitApp()`). The `target` spatial is typically the player node.

```java

// Disable the default flyby cam
flyCam.setEnabled(false);
//create the camera Node
camNode = new CameraNode("Camera Node", cam);
//This mode means that camera copies the movements of the target:
camNode.setControlDir(ControlDirection.SpatialToCamera);
//Attach the camNode to the target:
target.attachChild(camNode);
//Move camNode, e.g. behind and above the target:
camNode.setLocalTranslation(new Vector3f(0, 5, -5));
//Rotate the camNode to look at the target:
camNode.lookAt(target.getLocalTranslation(), Vector3f.UNIT_Y);

```

:::important
Where the example says `camNode.setLocalTranslation(new Vector3f(0, 5, -5));`, you have to supply your own start position for the camera. This depends on the size of your target (the player character) and its position in your particular scene. Optimally, you set this to a spot a bit behind and above the target.
:::

| Methods |
| --- |
| Description<br /> |
| setControlDir(ControlDirection.SpatialToCamera) |
| User input steers the target spatial, and the camera follows the spatial.<br />The spatial's transformation is copied over the camera's transformation.<br />Example: Use with [CharacterControl](../../physics/physics.md)led spatial.<br /> |
| setControlDir(ControlDirection.CameraToSpatial) |
| User input steers the camera, and the target spatial follows the camera.<br />The camera's transformation is copied over the spatial's transformation. Use with first-person flyCam.<br /> |

*Code sample:*

- [TestCameraNode.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/input/TestCameraNode.java) – Press the WASD or arrow keys to move. Drag with the left mouse button to rotate.

## Chase Camera

To activate the chase camera, add the following code to your init method (e.g. `simpleInitApp()`). The `target` spatial is typically the player node. You will be able to rotate the target by dragging (keeping the left mouse button pressed and moving the mouse).

```java

// Disable the default flyby cam
flyCam.setEnabled(false);
// Enable a chase cam for this target (typically the player).
ChaseCamera chaseCam = new ChaseCamera(cam, target, inputManager);
chaseCam.setSmoothMotion(true);

```

| Method |
| --- |
| Description<br /> |
| setInvertVerticalAxis(true) |
| Invert the camera's vertical rotation Axis<br /> |
| setInvertHorizontalAxis(true) |
| Invert the camera's horizontal rotation Axis<br /> |
| setTrailingEnabled(true) |
| Camera follows the target and flies around and behind when the target moves towards the camera. Trailing only works with smooth motion enabled. (Default)<br /> |
| setTrailingEnabled(false) |
| Camera follows the target, but does not rotate around the target when the target changes direction.<br /> |
| setSmoothMotion(true) |
| Activate SmoothMotion when trailing. This means the camera seems to accelerate and fly after the character, when it has caught up, it slows down again.<br /> |
| setSmoothMotion(false) |
| Disable smooth camera motion. Disabling SmoothMotion also disables trailing.<br /> |
| setLookAtOffset(Vector3f.UNIT_Y.mult(3)) |
| Camera looks at a point 3 world units above the target.<br /> |
| setToggleRotationTrigger(new MouseButtonTrigger(MouseInput.BUTTON_MIDDLE)) |
| Enable rotation by keeping the middle mouse button pressed (like in Blender). This disables the rotation on right and left mouse button click.<br /> |
| setToggleRotationTrigger(new MouseButtonTrigger(<br />MouseInput.BUTTON_MIDDLE),<br />new KeyTrigger(KeyInput.KEY_SPACE)) |
| Activate multiple triggers for the rotation of the camera, e.g. spacebar and middle mouse button, etc.<br /> |
| setRotationSensitivity(5f) |
| How fast the camera rotates. Use values around &lt;1.0f (all bigger values are ignored).<br /> |

*Code sample:*

- [TestChaseCamera.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/input/TestChaseCamera.java) – Press the WASD or arrow keys to move. Drag with the left mouse button to rotate.

## Which to Choose?

What is the difference of the two code samples above?
| CameraNode |
| --- |
| ChaseCam<br /> |
| Camera follows immediately, flies at same speed as target. |
| Camera moves smoothly and accelerates and decelerates, flies more slowly than the target and catches up.<br /> |
| Camera stays attached to the target at a constant distance. |
| Camera orbits the target and approaches slowly.<br /> |
| Drag-to-Rotate rotates the target and the camera. You always see the target from behind. |
| Drag-to-Rotate rotates only the camera. You can see the target from various sides.<br /> |
