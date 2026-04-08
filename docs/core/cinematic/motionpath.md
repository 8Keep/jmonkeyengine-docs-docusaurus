# MotionPath

A MotionPath describes the motion of a spatial between waypoints. The path can be linear or rounded. You use MotionPaths to remote-control a spatial, or the camera.

:::tip
If you want to remote-control a whole cutscene with several spatials moving at various times, then we recommend you use MotionPaths together with [Cinematics](cinematics.md).
:::

## Sample Code

- [TestMotionPath.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/animation/TestMotionPath.java)
- [TestCameraMotionPath.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/animation/TestCameraMotionPath.java)

## What Are Way Points?

When shooting a movie scene, the director tells actors where to walk, for example, by drawing a series of small crosses on the floor. Cameramen often mount the camera on rails (so called dolly track) so they can follow along complex scenes more easily.

In JME3, you use MotionPaths to specify a series of positions for a character or the camera. The MotionPath automatically updates the transformation of the spatial in each frame to make it move from one point to the next.

- *A way point* is one positions on a path.
- *A MotionPath* contains a list of all way points of one path.

The final shape of the path is computed using a linear interpolation or a [Catmull-Rom](http://www.mvps.org/directx/articles/catmull/) spline interpolation on the way points.

## Create a MotionPath

Create a Motionpath object and add way points to it.

```java
MotionPath path = new MotionPath();
path.addWayPoint(new Vector3f(10, 3, 0));
path.addWayPoint(new Vector3f(8, -2, 1));
...

```

You can configure the path as follows.
<table>
  <thead>
    <tr>
      <th>MotionPath Method</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>path.setCycle(true)</td>
      <td>Sets whether the motion along this path should be closed (true) or open-ended (false).<br /></td>
    </tr>
    <tr>
      <td>path.addWayPoint(vector)</td>
      <td>Adds individual waypoints to this path. The order is relevant.<br /></td>
    </tr>
    <tr>
      <td>path.removeWayPoint(vector) +<br />removeWayPoint(index)</td>
      <td>Removes a way point from this path. You can specify the point that you want to remove as vector or as integer index.<br /></td>
    </tr>
    <tr>
      <td>path.setCurveTension(0.83f)</td>
      <td>Sets the tension of the curve (Catmull-Rom Spline). A value of 0.0f results in a straight linear line, 1.0 a very round curve.<br /></td>
    </tr>
    <tr>
      <td>path.getNbWayPoints()</td>
      <td>Returns the number of waypoints in this path.<br /></td>
    </tr>
    <tr>
      <td>path.enableDebugShape(assetManager,rootNode)</td>
      <td>Shows a line that visualizes the path. Use this during development and for debugging so you see what you are doing.<br /></td>
    </tr>
    <tr>
      <td>path.disableDebugShape()</td>
      <td>Hides the line that visualizes the path. Use this for the release build.<br /></td>
    </tr>
  </tbody>
</table>

## MotionPathListener

You can hook interactions into a playing MotionPath. Register a MotionPathListener to the MotionPath to track whether way points have been reached, and then trigger a custom action. The onWayPointReach() method of the interface gives you access to the MotionEvent object `control`, and an integer value representing the current wayPointIndex.

In this example, you just print the status at every way point. In a game you could trigger actions here: Transformations, animations, sounds, game actions (attack, open door, etc).

```java
path.addListener( new MotionPathListener() {
  public void onWayPointReach(MotionEvent control, int wayPointIndex) {
    if (path.getNbWayPoints() == wayPointIndex + 1) {
      println(control.getSpatial().getName() + " has finished moving. ");
    } else {
      println(control.getSpatial().getName() + " has reached way point " + wayPointIndex);
    }
  }
});
```
