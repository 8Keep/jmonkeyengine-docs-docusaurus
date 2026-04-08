# How to Use Material Definitions (.j3md)

All Geometries need a Material to be visible. Every Material is based on a Material Definition. Material definitions provide the "`logic`" for the material, and a shader draws the material according to the parameters specified in the definition. The J3MD file abstracts the shader and its configuration away from the user, allowing a simple interface where the user can simply set a few parameters on the material to change its appearance and the way its handled by the shaders.

The most common Material Definitions are included in the engine, advanced users can create custom ones. In this case you will also be interested in the [in-depth developer specification of the jME3 material system](material_specification.md).

*Example:*

```java
Spatial myGeometry = assetManager.loadModel("Models/Teapot/Teapot.j3o");
Material mat = new Material(assetManager,  // Create new material and...
    "Common/MatDefs/Misc/Unshaded.j3md");  // ... specify a Material Definition file, here "Unshaded.j3md"!
mat.setColor("Color", ColorRGBA.Blue);     // Set one or more material parameters.
myGeometry.setMaterial(mat);               // Use material on this Geometry.

```

:::tip
If you use one custom material with certain settings very often, learn about storing material settings in [j3m Material Files](j3m_material_files.md). You either [use the jMonkeyEngine SDK to create .j3m files](../../sdk/material_editing.md) (user-friendly), or you [write .j3m files in a text editor](j3m_material_files.md) (IDE-independent).
:::

## Preparing a Material

In the [Materials Overview](materials_overview.md) list:

1. Choose a Material Definition that has the features that you need.
  - Tip: If you don't know, start with `Unshaded.j3md` or `Lighting.j3md`.

1. Look at the applicable parameters of the Material Definition and determine which parameters you need to achieve the desired effect (e.g. "`glow`" or "`color`"). Most parameters are optional!
1. Create and save the necessary Texture files to your `assets/Textures` directory.
  - E.g. mytex_diffuse.png as ColorMap / DiffuseMap, mytex_normal.png as NormalMap, mytex_alpha.png as AlphaMap, etc…

1. Determine the required values to achieve the effect that you want.
  - E.g. set colors, floats, booleans, etc…

## Using a Material

In your Java code,

1. Create a Material object based on the chosen Material Definition (.j3md file):

```java
Material mat = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
```

1. Configure your Material by setting the appropriate values listed in the [Materials Overview](materials_overview.md) table.

```java
mat.setColor("Color", ColorRGBA.Yellow ); // and more
```

1. Apply your prepared Material to a Geometry:

```java
myGeometry.setMaterial(mat);
```

1. (Optional) Adjust the texture scale of the mesh:

```java
myGeometryMesh.scaleTextureCoordinates(new Vector2f(2f, 2f));
```

For details see also: [How to Use Materials](how_to_use_materials.md)

### Examples

Here are examples of the methods that set the different data types:

- `mat.setColor(   "Color",       ColorRGBA.White );`
- `mat.setTexture( "ColorMap",    assetManager.loadTexture("Interface/Logo/Monkey.png" ));`
- `mat.setFloat(   "Shininess",   5f);`
- `mat.setBoolean( "SphereMap",   true);`
- `mat.setVector3( "NormalScale", new Vector3f(1f,1f,1f));`

A simple textured material.

```java

Material mat = new Material(assetManager,
    "Common/MatDefs/Misc/Unshaded.j3md");
mat.setTexture("ColorMap", assetManager.loadTexture(
    "Interface/Logo/Monkey.jpg"));

```

A textured material with a color bleeding through transparent areas.

```java

Material mat = new Material(assetManager,
    "Common/MatDefs/Misc/Unshaded.j3md");
mat.setTexture("ColorMap", assetManager.loadTexture(
    "Textures/ColoredTex/Monkey.png"));
mat.setColor("Color", ColorRGBA.Blue);

```

You can test these examples within the following code snippet. It creates a box and applies the material:

```java
 Box b = new Box(Vector3f.ZERO, 1, 1, 1);
Geometry geom = new Geometry("Box", b);
// ... insert Material definition...
geom.setMaterial(mat);
rootNode.attachChild(geom);

```

:::tip
You can find these and other common code snippets in the jMonkeyEngine SDK Code Palette. Drag and drop them into your source code.
:::

## Creating a Custom Material Definition

First read the [developer specification of the jME3 material system (.j3md,.j3m)](material_specification.md). Also check out the [engine source code](../../getting-started/build_from_sources.md) and have a look at how some Material Definitions are implemented.

You can create your own Material Definitions and place them in your project's `assets/MatDefs` directory.

1. Find the existing MatDefs in `engine/src/core-data/Common/MatDefs/`.
1. Open a Something.j3md file in a text editor. You see that this .j3md file defines Material Parameters and Techniques.
  - Material Parameters are the ones that you set in Materials, as shown in the examples above.
  - The Techniques rely on VertexShaders and FragmentShaders: You find those in the files Something.vert and Something.frag in the same directory.

1. Learn about GLSL (OpenGL Shading Language) to understand the .vert and .frag syntax, then write your own.

## Related Links

- [Developer specification of the jME3 material system (.j3md,.j3m)](material_specification.md)
