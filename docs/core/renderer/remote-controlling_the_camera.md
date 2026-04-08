# Remote-Controlling the Camera

## Positioning the Camera

You can steer the camera using [Cinematics](../cinematic/cinematics.md):

1. Create a Cinematic.
1. Create a CameraNode and bind the camera object to the Cinematic. Note that we also give the camera node a name in this step.

```java
CameraNode camNode = cinematic.bindCamera("topView", cam);
```

1. Position the camera node in its start location.
1. Use activateCamera() to give the control of the camera to this node. You now see the scene from this camera's point of view. For example to see through the camera node named "`topView`", 6 seconds after the start of the cinematic, you'd write

```java
cinematic.activateCamera(6, "topView");
```

### Code Sample

```java

flyCam.setEnabled(false);
Cinematic cinematic = new Cinematic(rootNode, 20);

CameraNode camNodeTop = cinematic.bindCamera("topView", cam);
camNodeTop.setControlDir(ControlDirection.SpatialToCamera);
camNodeTop.getControl(0).setEnabled(false);

CameraNode camNodeSide = cinematic.bindCamera("sideView", cam);
camNodeSide.setControlDir(ControlDirection.CameraToSpatial);
camNodeSide.getControl(0).setEnabled(false);

```

## Moving the Camera

If desired, attach the camNode to a MotionEvent to let it travel along waypoints. This is demonstrated in the [TestCameraMotionPath.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/animation/TestCameraMotionPath.java) example.
