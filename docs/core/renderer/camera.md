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

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>cam.getLocation(), setLocation()</td>
      <td>The camera position<br /></td>
    </tr>
    <tr>
      <td>cam.getRotation(), setRotation()</td>
      <td>The camera rotation<br /></td>
    </tr>
    <tr>
      <td>cam.getLeft(), setLeft()</td>
      <td>The left axis of the camera<br /></td>
    </tr>
    <tr>
      <td>cam.getUp(), setUp()</td>
      <td>The up axis of the camera, usually Vector3f(0,1,0)<br /></td>
    </tr>
    <tr>
      <td>cam.getDirection()</td>
      <td>The vector the camera is facing<br /></td>
    </tr>
    <tr>
      <td>cam.getAxes(), setAxes(left,up,dir)</td>
      <td>One accessor for the three properties left/up/direction.<br /></td>
    </tr>
    <tr>
      <td>cam.getFrame(), setFrame(loc,left,up,dir)</td>
      <td>One accessor for the four properties location/left/up/direction.<br /></td>
    </tr>
    <tr>
      <td>cam.resize(width, height, fixAspect)</td>
      <td>Resize an existing camera object while keeping all other settings. Set fixAspect to true to adjust the aspect ratio (?)<br /></td>
    </tr>
    <tr>
      <td>cam.setFrustum( near, far, left, right, top, bottom )</td>
      <td>The frustum is defined by the near/far plane, left/right plane, top/bottom plane (all distances as float values)<br /></td>
    </tr>
    <tr>
      <td>cam.setFrustumPerspective( fovY, aspect ratio, near, far)</td>
      <td>The frustum is defined by view angle along the Y axis (in degrees), aspect ratio, and the near/far plane.<br /></td>
    </tr>
    <tr>
      <td>cam.lookAt(target,up)</td>
      <td>Turn the camera to look at Coordinate target, and rotate it around the up axis.<br /></td>
    </tr>
    <tr>
      <td>cam.setParallelProjection(false)</td>
      <td>Normal perspective<br /></td>
    </tr>
    <tr>
      <td>cam.setParallelProjection(true)</td>
      <td>Parallel projection perspective<br /></td>
    </tr>
    <tr>
      <td>cam.getScreenCoordinates(worldPos)</td>
      <td>Converts the given position from world space to screen space.<br /></td>
    </tr>
  </tbody>
</table>

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

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>flyCam.setEnabled(true);</td>
      <td>Activate the flyby cam<br /></td>
    </tr>
    <tr>
      <td>flyCam.setMoveSpeed(10);</td>
      <td>Control the move speed<br /></td>
    </tr>
    <tr>
      <td>flyCam.setRotationSpeed(10);</td>
      <td>Control the rotation speed<br /></td>
    </tr>
    <tr>
      <td>flyCam.setDragToRotate(true)</td>
      <td>Forces the player to keep mouse button pressed to rotate camera, typically used for Applets. If false (default), all mouse movement will be captured and interpreted as rotations.<br /></td>
    </tr>
  </tbody>
</table>

The FlyByCamera is active by default, but you can change all these defaults for your game.

## Chase Camera

jME3 also supports an optional Chase Cam that can follow a moving target Spatial (`com.jme3.input.ChaseCamera`). When you use the chase cam, the player clicks and hold the mouse button to rotate the camera around the camera target. You can use a chase cam if you need the mouse pointer visible in your game.

```java

flyCam.setEnabled(false);
ChaseCamera chaseCam = new ChaseCamera(cam, target, inputManager);

```

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>chaseCam.setSmoothMotion(true);</td>
      <td>Interpolates a smoother acceleration/deceleration when the camera moves.<br /></td>
    </tr>
    <tr>
      <td>chaseCam.setChasingSensitivity(5f)</td>
      <td>The lower the chasing sensitivity, the slower the camera will follow the target when it moves.<br /></td>
    </tr>
    <tr>
      <td>chaseCam.setTrailingSensitivity(0.5f)</td>
      <td>The lower the trailing sensitivity, the slower the camera will begin to go after the target when it moves. Default is 0.5;<br /></td>
    </tr>
    <tr>
      <td>chaseCam.setRotationSensitivity(5f)</td>
      <td>The lower the sensitivity, the slower the camera will rotate around the target when the mouse is dragged. Default is 5.<br /></td>
    </tr>
    <tr>
      <td>chaseCam.setTrailingRotationInertia(0.1f)</td>
      <td>This prevents the camera to stop too abruptly when the target stops rotating before the camera has reached the target's trailing position. Default is 0.1f.<br /></td>
    </tr>
    <tr>
      <td>chaseCam.setDefaultDistance(40);</td>
      <td>The default distance to the target at the start of the application.<br /></td>
    </tr>
    <tr>
      <td>chaseCam.setMaxDistance(40);</td>
      <td>The maximum zoom distance. Default is 40f.<br /></td>
    </tr>
    <tr>
      <td>chaseCam.setMinDistance(1);</td>
      <td>The minimum zoom distance. Default is 1f.<br /></td>
    </tr>
    <tr>
      <td>chaseCam.setMinVerticalRotation(-FastMath.PI/2);</td>
      <td>The minimal vertical rotation angle of the camera around the target. Default is 0.<br /></td>
    </tr>
    <tr>
      <td>chaseCam.setDefaultVerticalRotation(-FastMath.PI/2);</td>
      <td>The default vertical rotation angle of the camera around the target at the start of the application.<br /></td>
    </tr>
    <tr>
      <td>chaseCam.setDefaultHorizontalRotation(-FastMath.PI/2);</td>
      <td>The default horizontal rotation angle of the camera around the target at the start of the application.<br /></td>
    </tr>
  </tbody>
</table>

To disable rotation and zooming of chase camera by mouse you can use following methods.
```java
//to disable rotation
inputManager.deleteMapping(CameraInput.CHASECAM_TOGGLEROTATE);
//to disable zoom out
inputManager.deleteMapping(CameraInput.CHASECAM_ZOOMOUT);
//to disable zoom in
inputManager.deleteMapping(CameraInput.CHASECAM_ZOOMIN);
```
