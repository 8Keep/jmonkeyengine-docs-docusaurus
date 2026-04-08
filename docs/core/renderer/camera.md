# The jME3 Camera

:::note
By default, the mouse pointer is invisible, and the mouse is set up to control the camera rotation.
:::

## Default Camera

The default com.jme3.renderer.Camera object is `cam` in com.jme3.app.Application.

The camera object is created with the following defaults:

- Width and height are set to the current Application's settings.getWidth() and settings.getHeight() values.
- Frustum Perspective:
  - Frame of view angle of 45° along the Y axis
  - Aspect ratio of width divided by height
  - Near view plane of 1 wu
  - Far view plane of 1000 wu

- Start location at (0f, 0f, 10f).
- Start direction is looking at the origin.

| Method |
| --- |
| Usage<br /> |
| cam.getLocation(), setLocation() |
| The camera position<br /> |
| cam.getRotation(), setRotation() |
| The camera rotation<br /> |
| cam.getLeft(), setLeft() |
| The left axis of the camera<br /> |
| cam.getUp(), setUp() |
| The up axis of the camera, usually Vector3f(0,1,0)<br /> |
| cam.getDirection() |
| The vector the camera is facing<br /> |
| cam.getAxes(), setAxes(left,up,dir) |
| One accessor for the three properties left/up/direction.<br /> |
| cam.getFrame(), setFrame(loc,left,up,dir) |
| One accessor for the four properties location/left/up/direction.<br /> |
| cam.resize(width, height, fixAspect) |
| Resize an existing camera object while keeping all other settings. Set fixAspect to true to adjust the aspect ratio (?)<br /> |
| cam.setFrustum( near, far, left, right, top, bottom ) |
| The frustum is defined by the near/far plane, left/right plane, top/bottom plane (all distances as float values)<br /> |
| cam.setFrustumPerspective( fovY, aspect ratio, near, far) |
| The frustum is defined by view angle along the Y axis (in degrees), aspect ratio, and the near/far plane.<br /> |
| cam.lookAt(target,up) |
| Turn the camera to look at Coordinate target, and rotate it around the up axis.<br /> |
| cam.setParallelProjection(false) |
| Normal perspective<br /> |
| cam.setParallelProjection(true) |
| Parallel projection perspective<br /> |
| cam.getScreenCoordinates(worldPos) |
| Converts the given position from world space to screen space.<br /> |

:::tip
After you change view port, frustum, or frame, call `cam.update();`
:::

## FlyBy Camera

The `flyCam` class field gives you access to an AppState that extends the default camera in `com.jme3.app.SimpleApplication` with more features. The input manager of the `com.jme3.input.FlyByCamera` AppState is preconfigured to respond to the WASD keys for walking forwards and backwards, and strafing to the sides; move the mouse to rotate the camera ("`Mouse Look`"), scroll the mouse wheel for zooming in or out. The QZ keys raise or lower the camera vertically.

```

Q  W             up   forw
A  S  D    -->  left  back  right
Z               down

```

| Method |
| --- |
| Usage<br /> |
| flyCam.setEnabled(true); |
| Activate the flyby cam<br /> |
| flyCam.setMoveSpeed(10); |
| Control the move speed<br /> |
| flyCam.setRotationSpeed(10); |
| Control the rotation speed<br /> |
| flyCam.setDragToRotate(true) |
| Forces the player to keep mouse button pressed to rotate camera, typically used for Applets. If false (default), all mouse movement will be captured and interpreted as rotations.<br /> |

The FlyByCamera is active by default, but you can change all these defaults for your game.

## Chase Camera

jME3 also supports an optional Chase Cam that can follow a moving target Spatial (`com.jme3.input.ChaseCamera`). When you use the chase cam, the player clicks and hold the mouse button to rotate the camera around the camera target. You can use a chase cam if you need the mouse pointer visible in your game.

```java

flyCam.setEnabled(false);
ChaseCamera chaseCam = new ChaseCamera(cam, target, inputManager);

```

| Method |
| --- |
| Usage<br /> |
| chaseCam.setSmoothMotion(true); |
| Interpolates a smoother acceleration/deceleration when the camera moves.<br /> |
| chaseCam.setChasingSensitivity(5f) |
| The lower the chasing sensitivity, the slower the camera will follow the target when it moves.<br /> |
| chaseCam.setTrailingSensitivity(0.5f) |
| The lower the trailing sensitivity, the slower the camera will begin to go after the target when it moves. Default is 0.5;<br /> |
| chaseCam.setRotationSensitivity(5f) |
| The lower the sensitivity, the slower the camera will rotate around the target when the mouse is dragged. Default is 5.<br /> |
| chaseCam.setTrailingRotationInertia(0.1f) |
| This prevents the camera to stop too abruptly when the target stops rotating before the camera has reached the target's trailing position. Default is 0.1f.<br /> |
| chaseCam.setDefaultDistance(40); |
| The default distance to the target at the start of the application.<br /> |
| chaseCam.setMaxDistance(40); |
| The maximum zoom distance. Default is 40f.<br /> |
| chaseCam.setMinDistance(1); |
| The minimum zoom distance. Default is 1f.<br /> |
| chaseCam.setMinVerticalRotation(-FastMath.PI/2); |
| The minimal vertical rotation angle of the camera around the target. Default is 0.<br /> |
| chaseCam.setDefaultVerticalRotation(-FastMath.PI/2); |
| The default vertical rotation angle of the camera around the target at the start of the application.<br /> |
| chaseCam.setDefaultHorizontalRotation(-FastMath.PI/2); |
| The default horizontal rotation angle of the camera around the target at the start of the application.<br /> |

To disable rotation and zooming of chase camera by mouse you can use following methods.
```java
//to disable rotation
inputManager.deleteMapping(CameraInput.CHASECAM_TOGGLEROTATE);
//to disable zoom out
inputManager.deleteMapping(CameraInput.CHASECAM_ZOOMOUT);
//to disable zoom in
inputManager.deleteMapping(CameraInput.CHASECAM_ZOOMIN);
```
