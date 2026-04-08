# jMonkeyEngine 3 Tutorial (2) - Hello Node

In this tutorial we will have a look at the creation of a 3D scene.

- This tutorial assumes that you know what [the Scene Graph](../concepts/the_scene_graph.md) is.
- For a visual introduction, check out [Scene Graph for Dummies](../concepts/scenegraph_for_dummies.md).

When creating a 3D game

1. You create some scene objects like players, buildings, etc.
1. You add the objects to the scene.
1. You move, resize, rotate, color, and animate them.

You will learn that the scene graph represents the 3D world, and why the rootNode is important. You will learn how to create simple objects, how to let them carry custom data (such as health points), and how to "`transform`" them by moving, scaling, and rotating. You will understand the difference between the two types of "`Spatials`" in the scene graph: Nodes and Geometries.

## Code Sample

```java
package jme3test.helloworld;

import com.jme3.app.SimpleApplication;
import com.jme3.material.Material;
import com.jme3.math.ColorRGBA;
import com.jme3.math.Vector3f;
import com.jme3.scene.Geometry;
import com.jme3.scene.Node;
import com.jme3.scene.shape.Box;

/** Sample 2 - How to use nodes as handles to manipulate objects in the scene.
 * You can rotate, translate, and scale objects by manipulating their parent nodes.
 * The Root Node is special: Only what is attached to the Root Node appears in the scene. */
public class HelloNode extends SimpleApplication {

    public static void main(String[] args){
        HelloNode app = new HelloNode();
        app.start();
    }

    @Override
    public void simpleInitApp() {

        /** create a blue box at coordinates (1,-1,1) */
        Box box1 = new Box(1,1,1);
        Geometry blue = new Geometry("Box", box1);
        blue.setLocalTranslation(new Vector3f(1,-1,1));
        Material mat1 = new Material(assetManager,
                "Common/MatDefs/Misc/Unshaded.j3md");
        mat1.setColor("Color", ColorRGBA.Blue);
        blue.setMaterial(mat1);

        /** create a red box straight above the blue one at (1,3,1) */
        Box box2 = new Box(1,1,1);
        Geometry red = new Geometry("Box", box2);
        red.setLocalTranslation(new Vector3f(1,3,1));
        Material mat2 = new Material(assetManager,
                "Common/MatDefs/Misc/Unshaded.j3md");
        mat2.setColor("Color", ColorRGBA.Red);
        red.setMaterial(mat2);

        /** Create a pivot node at (0,0,0) and attach it to the root node */
        Node pivot = new Node("pivot");
        rootNode.attachChild(pivot); // put this node in the scene

        /** Attach the two boxes to the *pivot* node. (And transitively to the root node.) */
        pivot.attachChild(blue);
        pivot.attachChild(red);
        /** Rotate the pivot node: Note that both boxes have rotated! */
        pivot.rotate(.4f,.4f,0f);
    }
}
```

Build and run the code sample. You should see two colored boxes tilted at the same angle.

## Understanding the Terminology

In this tutorial, you learn some new terms:
<table>
  <thead>
    <tr>
      <th>What you want to do?</th>
      <th>How you say it in JME3 terminology<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lay out the 3D scene.</td>
      <td>Populate the scene graph.<br /></td>
    </tr>
    <tr>
      <td>Create scene objects.</td>
      <td>Create Spatials. (e.g. create Geometries)<br /></td>
    </tr>
    <tr>
      <td>Make an object appear in the scene.</td>
      <td>Attach a Spatial to the rootNode.<br /></td>
    </tr>
    <tr>
      <td>Make an object disappear from the scene.</td>
      <td>Detach the Spatial from the rootNode.<br /></td>
    </tr>
    <tr>
      <td>Position/move, turn, or resize an object.</td>
      <td>Translate, or rotate, or scale an object = transform an object.<br /></td>
    </tr>
  </tbody>
</table>

Every JME3 application has a rootNode: Your game automatically inherits the `rootNode` object from SimpleApplication. Everything attached to the rootNode is part of the scene graph. The elements of the scene graph are Spatials.

- A Spatial contains the location, rotation, and scale of an object.
- A Spatial can be loaded, transformed, and saved.
- There are two types of Spatials: Nodes and Geometries.

<table>
  <thead>
    <tr>
      <th></th>
      <th>Geometry</th>
      <th>Node<br /></th>
      <th>Visibility:</th>
      <th>A Geometry is a visible scene object.</th>
      <th>A Node is an invisible "`handle`" for scene objects.<br /></th>
      <th>Purpose:</th>
      <th>A Geometry stores an object's looks.</th>
      <th>A Node groups Geometries and other Nodes together.<br /></th>
      <th>Examples:</th>
      <th>A box, a sphere, a player, a building, a piece of terrain, a vehicle, missiles, NPCs, etc…</th>
      <th>The `rootNode`, a floor node grouping several terrains, a custom vehicle-with-passengers node, a player-with-weapon node, an audio node, etc…<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

## Understanding the Code

What happens in the code snippet? You use the `simpleInitApp()` method that was introduced in the first tutorial to initialize the scene.

1. You create the first box Geometry.
  - Create a Box shape with extents of (1,1,1), that makes the box 2x2x2 world units big.
  - Position the box at (1,-1,1) using the setLocalTranslation() method.
  - Wrap the Box shape into a Geometry.
  - Create a blue material.
  - Apply the blue material to the Box Geometry.

```java

    Box box1 = new Box(1,1,1);
    Geometry blue = new Geometry("Box", box1);
    blue.setLocalTranslation(new Vector3f(1,-1,1));
    Material mat1 = new Material(assetManager,"Common/MatDefs/Misc/Unshaded.j3md");
    mat1.setColor("Color", ColorRGBA.Blue);
    blue.setMaterial(mat1);
```

1. You create a second box Geometry.
  - Create a second Box shape with the same size.
  - Position the second box at (1,3,1). This is straight above the first box, with a gap of 2 world units inbetween.
  - Wrap the Box shape into a Geometry.
  - Create a red material.
  - Apply the red material to the Box Geometry.

```java

    Box box2 = new Box(1,1,1);
    Geometry red = new Geometry("Box", box2);
    red.setLocalTranslation(new Vector3f(1,3,1));
    Material mat2 = new Material(assetManager,
      "Common/MatDefs/Misc/Unshaded.j3md");
    mat2.setColor("Color", ColorRGBA.Red);
    red.setMaterial(mat2);
```

1. You create a pivot Node.
  - Name the Node "`pivot`".
  - By default the Node is positioned at (0,0,0).
  - Attach the Node to the rootNode.
  - The Node has no visible appearance in the scene.

--
```java

    Node pivot = new Node("pivot");
    rootNode.attachChild(pivot);
```

If you run the application with only the code up to here, the scene appears empty. This is because a Node is invisible, and you have not yet attached any visible Geometries to the rootNode.
--

1. Attach the two boxes to the pivot node.

--
```java

        pivot.attachChild(blue);
        pivot.attachChild(red);
```

If you run the app with only the code up to here, you see two cubes: A red cube straight above a blue cube.
--

1. Rotate the pivot node.

```java
        pivot.rotate( 0.4f , 0.4f , 0.0f );
```

If you run the app now, you see two boxes on top of each other – both tilted at the same angle.

### What is a Pivot Node?

You can transform (e.g. rotate) Geometries around their own center, or around a user defined center point. A user defined center point for one or more Geometries is called a pivot.

In this example, you have grouped two Geometries by attaching them to one pivot Node. You use the pivot Node as a handle to rotate the two Geometries together around one common center. Rotating the pivot Node rotates all attached Geometries, in one step. The pivot node is the center of the rotation. Before attaching the other Geometries, make certain that the pivot node is at (0,0,0). Transforming a parent Node to transform all attached child Spatials is a common task. You will use this method a lot in your games when you move Spatials around.

*Examples:* A vehicle and its driver move together; a planet with its moon orbits the sun.

Contrast this case with the other option. If you don't create an extra pivot node and transform a Geometry, then every transformation is done relative to the Geometry's origin (typically the center).

*Examples:* If you rotate each cube directly (using `red.rotate(0.1f , 0.2f , 0.3f);` and `blue.rotate(0.5f , 0.0f , 0.25f);`), then each cube is rotated individually around its center. This is similar to a planet rotating around its own center.

## How do I Populate the Scenegraph?
<table>
  <thead>
    <tr>
      <th>Task…?</th>
      <th>Solution!<br /></th>
      <th>Create a Spatial.</th>
      <th>Create a Mesh shape, wrap it into a Geometry, and give it a Material. +<br />For example:<br />[source,java]<br />----<br />/** a cuboid default mesh */<br />Box mesh = new Box(Vector3f.ZERO, 1, 1, 1);<br />Geometry thing = new Geometry("thing", mesh);<br />Material mat = new Material(assetManager,<br />"Common/MatDefs/Misc/ShowNormals.j3md");<br />thing.setMaterial(mat);<br />----<br /><br /></th>
      <th>Make an object appear in the scene.</th>
      <th>Attach the Spatial to the `rootNode`, or to any node that is attached to the rootNode.<br />[source,java]<br />----<br />rootNode.attachChild(thing);<br />----<br /><br /></th>
      <th>Remove objects from the scene.</th>
      <th>Detach the Spatial from the `rootNode`, and from any node that is attached to the rootNode.<br />[source,java]<br />----<br />rootNode.detachChild(thing);<br />----<br /><br />[source,java]<br />----<br />rootNode.detachAllChildren();<br />----<br /><br /></th>
      <th>Find a Spatial in the scene by the object's name, or ID, or by its position in the parent-child hierarchy.</th>
      <th>Look at the node's children or parent:<br />[source,java]<br />----<br />Spatial thing = rootNode.getChild("thing");<br />----<br /><br />[source,java]<br />----<br />Spatial twentyThird = rootNode.getChild(22);<br />----<br /><br />[source,java]<br />----<br />Spatial parent = myNode.getParent();<br />----<br /><br /></th>
      <th>Specify what should be loaded at the start.</th>
      <th>Everything you initialize and attach to the `rootNode` in the `simpleInitApp()` method is part of the scene at the start of the game.<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

## How do I Transform Spatials?

There are three types of 3D transformation: Translation, Scaling, and Rotation.

<table>
  <thead>
    <tr>
      <th>Translation moves Spatials</th>
      <th>X-axis</th>
      <th>Y-axis</th>
      <th>Z-axis<br /></th>
      <th>Specify the new location in three dimensions: How far away is it from the origin going right-up-forward? +<br />To move a Spatial _to_ specific coordinates, such as (0,40.2f,-2), use:<br />[source,java]<br />----<br />thing.setLocalTranslation( new Vector3f( 0.0f, 40.2f, -2.0f ) );<br />----<br /><br />To move a Spatial _by_ a certain amount, e.g. higher up (y=40.2f) and further back (z=-2.0f):<br /><br />[source,java]<br />----<br />thing.move( 0.0f, 40.2f, -2.0f );<br />----<br /></th>
      <th>+right +<br />-left</th>
      <th>+up +<br />-down</th>
      <th>+forward +<br />-backward<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>Scaling resizes Spatials</th>
      <th>X-axis</th>
      <th>Y-axis</th>
      <th>Z-axis<br /></th>
      <th>Specify the scaling factor in each dimension: length, height, width. +<br />A value between 0.0f and 1.0f shrinks the Spatial; bigger than 1.0f stretches it; 1.0f keeps it the same. +<br />Using the same value for each dimension scales proportionally, different values stretch it. +<br />To scale a Spatial 10 times longer, one tenth the height, and keep the same width:<br />[source,java]<br />----<br />thing.scale( 10.0f, 0.1f, 1.0f );<br />----<br /></th>
      <th>length</th>
      <th>height</th>
      <th>width<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>Rotation turns Spatials</th>
      <th>X-axis (Pitch)</th>
      <th>Y-axis (Yaw)</th>
      <th>Z-axis (Roll)<br /></th>
      <th>3-D rotation is a bit tricky ([learn details here](../concepts/rotate.md)). In short: You can rotate around three axes: Pitch, yaw, and roll. You can specify angles in degrees by multiplying the degrees value with `FastMath.DEG_TO_RAD`. +<br />To roll an object 180° around the z axis:<br />[source,java]<br />----<br />thing.rotate( 0f , 0f , 180*FastMath.DEG_TO_RAD );<br />----<br /><br />Tip: If your game idea calls for a serious amount of rotations, it is worth looking into [quaternions](../../core/math/quaternion.md), a data structure that can combine and store rotations efficiently.<br /><br />[source,java]<br />----<br />thing.setLocalRotation(  new Quaternion().<br />fromAngleAxis(180*FastMath.DEG_TO_RAD,<br />new Vector3f(1,0,0)));<br />----<br /></th>
      <th>nodding your head</th>
      <th>shaking your head</th>
      <th>cocking your head<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

## How do I Troubleshoot Spatials?

If you get unexpected results, check whether you made the following common mistakes:
<table>
  <thead>
    <tr>
      <th>Problem?</th>
      <th>Solution!<br /></th>
      <th>A created Geometry does not appear in the scene.</th>
      <th>Have you attached it to (a node that is attached to) the rootNode? +<br />Does it have a Material? +<br />What is its translation (position)? +<br />Is it behind the camera or covered up by another Geometry? +<br />Is it too tiny or too gigantic to see? +<br />Is it too far from the camera? (Try [cam.setFrustumFar(111111f);](https://javadoc.jmonkeyengine.org/com/jme3/renderer/Camera.html#setFrustumFar-float-) to see further)<br /></th>
      <th>A Spatial rotates in unexpected ways.</th>
      <th>Did you use radian values, and not degrees? (If you used degrees, multiply them with FastMath.DEG_TO_RAD to convert them to radians)  +<br />Did you create the Spatial at the origin (Vector.ZERO) before moving it? +<br />Did you rotate around the intended pivot node or around something else? +<br />Did you rotate around the right axis?<br /></th>
      <th>A Geometry has an unexpected Color or Material.</th>
      <th>Did you reuse a Material from another Geometry and have inadvertently changed its properties? (If so, consider cloning it: mat2 = mat.clone(); )<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

## How do I Add Custom Data to Spatials?

Many Spatials represent game characters or other entities that the player can interact with. The above code that rotates the two boxes around a common center (pivot) could be used for a spacecraft docked to a orbiting space station, for example.

Depending on your game, game entities do not only change their position, rotation, or scale (the transformations that you just learned about). Game entities also have custom properties, such as health, inventory carried, equipment worn for a character, or hull strength and fuel left for a spacecraft. In Java, you represent entity data as class variables, e.g. floats, Strings, or Arrays.

You can add custom data directly to any Node or Geometry. *You do not need to extend the Node class to include variables*!
For example, to add a custom id number to a node, you would use:

```java
pivot.setUserData( "pivot id", 42 );
```

To read this Node's id number elsewhere, you would use:

```java
int id = pivot.getUserData( "pivot id" );
```

By using different Strings keys (here the key is `pivot id`), you can get and set several values for whatever data the Spatial needs to carry. When you start writing your game, you might add a fuel value to a car node, speed value to an airplane node, or number of gold coins to a player node, and much more. However, one should note that only custom objects that implements Savable can be passed.

## Conclusion

You have learned that your 3D scene is a scene graph made up of Spatials: Visible Geometries and invisible Nodes. You can transform Spatials, or attach them to nodes and transform the nodes. You know the easiest way how to add custom entity properties (such as player health or vehicle speed) to Spatials.
