# The Scene Graph and Other jME3 Terminology

Before you start making games, make sure you understand general [3D Graphics terminology](terminology.md).

Second, if you are a beginner, we recommend our [Scene Graph for Dummies](scenegraph_for_dummies.md) presentation for a visual introduction to the concept of a scene graph.

Then continue learning about jME3 concepts here.

## Coordinate System

![coordinate-system.png](/wiki-assets/docs/tutorials/assets/images/concepts/coordinate-system.png)

The jMonkeyEngine uses a right-handed coordinate system, just as OpenGL does.

The coordinate system consists of:

- The _origin_, a single central point in space.
  - The origin point is always at coordinate zero, in Java: `new Vector3f(0,0,0)`.

- Three _coordinate axes_ that are mutually perpendicular, and meet in the origin.
  - The X axis starts left and goes right.
  - The Y axis starts below and goes up.
  - The Z axis starts away from you, and goes towards you.

Every point in 3D space is uniquely defined by its X,Y,Z coordinates. The three numeric coordinates express how many "`steps`" from each of the three axes a point is. The data type for all vectors in jME3 is `com.jme3.math.Vector3f`. All vectors are relative to the described coordinate system.
Example: The point `new Vector3f(3,-5,1)` is 3 steps to the right, 5 steps down, and 1 towards you.

:::note
The unit of measurement ("`one`" step) in jME3 is the *world unit*, short: wu. Typically, 1 wu is considered to be one meter. As long as you are consistent throughout your game, 1 wu can be any distance you like.
:::

For your orientation:

- The default camera's location is `Vector3f(0.0f, 0.0f, 10.0f)`.
- The default camera is looking in the direction described by the (so called) negative Z unit vector `Vector3f(0.0f, 0.0f, -1.0f)`.

This means the player's point of view is on the positive side of the Z axis, looking back, towards the origin, down the Z axis.

## How to move yourself through the 3D scene

When you play a 3D game, you typically want to navigate the 3D scene. Note that by default, the mouse pointer is invisible, and the mouse is set up to control the camera rotation!

By default, jME3 uses the following common navigation inputs
| Game Inputs |
| --- |
| Camera Motion |
| Player POV<br /> |
| Press the W and S keys |
| move the camera forward, and backward |
| you walk back and forth<br /> |
| Press the A and D keys |
| move the camera left and right |
| you step left or right<br /> |
| Press the Q and Y keys |
| move the camera up and down |
| you fly up and down<br /> |
| Move the mouse left-right |
| rotate the camera left/right |
| you look left or right<br /> |
| Move the mouse forwards-backwards |
| rotate up/down |
| you look at the sky or your feet<br /> |

These default settings are called "`WASD`" keys and "`Mouse`" Look. You can customize [input handling](../../core/input/input_handling.md) for your game. Sorry, but these settings work best on a QWERTY/QWERTZ keyboard.

## Scene Graph and RootNode

The _scene graph_ represents your 3D world. Objects in the jME3 scene graph are called [Spatial](../../core/scene/spatial.md)s. Everything attached to the parent _rootNode_ is part of your scene. Your game inherits the `rootNode` object from the `SimpleApplication` class.

![scene-graph.png](/wiki-assets/docs/tutorials/assets/images/concepts/scene-graph.png)

- _Attaching_ a Spatial to the rootNode (or its child nodes) adds it to the scene;
- _Detaching_ a Spatial from the rootNode (or its child nodes) removes it from the scene.

All objects in the scene graph are in a parent-child relationship. When you transform (move, rotate, scale) one parent, all its children follow.

:::note
The scene graph only manages the parent-child relationship of spatials. The actual location, rotation, or scale of an object is stored inside each Spatial.
:::

## Spatials: Node vs Geometry

A Spatial can be transformed (in other words, it has a location, a rotation, and a scale). A Spatial can be loaded and saved as a .3jo file. There are two types of Spatials, _Node_ and _Geometry_:
<table>
  <thead>
    <tr>
      <th></th>
      <th colspan="2">Spatial<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Purpose:</td>
      <td colspan="2">A Spatial is an abstract data structure that stores transformations (translation, rotation, scale).<br /></td>
    </tr>
    <tr>
      <td></td>
      <td>Geometry</td>
      <td>Node<br /></td>
    </tr>
    <tr>
      <td>Visibility:</td>
      <td>A visible 3-D object.</td>
      <td>An invisible "<code>handle</code>" for a group of objects.<br /></td>
    </tr>
    <tr>
      <td>Purpose:</td>
      <td>A Geometry represents the "<code>look</code>" of an object: Shape, color, texture, opacity/transparency.</td>
      <td>A Node groups Geometries and other Nodes together: You transform a Node to affect all attached Nodes (parent-child relationship).<br /></td>
    </tr>
    <tr>
      <td>Content:</td>
      <td>Transformations, mesh, material.</td>
      <td>Transformations. No mesh, no material.<br /></td>
    </tr>
    <tr>
      <td>Examples:</td>
      <td>A box, a sphere, player, a building, a piece of terrain, a vehicle, missiles, NPCs, etc…</td>
      <td>The rootNode, the guiNode, an audioNode, a custom grouping node for a vehicle plus its passengers, etc.<br /></td>
    </tr>
  </tbody>
</table>

## How to Use This Knowledge?

Before you start creating your game, you should plan your scene graph: Which Nodes and Geometries will you need? Complete the [Beginner tutorials](../beginner/beginner.md) to learn how to load and create Spatials, how to lay out a scene by attaching, detaching, and transforming Spatials, and how to add interaction and effects to a game.

## See also

- [Spatial](../../core/scene/spatial.md) – More details about working with Nodes and Geometries
- [Traverse SceneGraph](../../core/scene/traverse_scenegraph.md) – Find any Node or Geometry in the scenegraph.
- [Camera](../../core/renderer/camera.md) – Learn more about the Camera in the scene.
