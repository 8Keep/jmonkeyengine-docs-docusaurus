# Saving and Loading Materials with .j3m Files

In the [Material Definitions](material_definitions.md) article you learned how to configure [Materials](materials_overview.md) programmatically in Java code. If you have certain commonly used Materials that never change, you can clean up the amount of Java code that clutters your init method, by moving material settings into .j3m files. Then later in your code, you only need to call one setter instead of several to apply the material.

If you want to colorize simple shapes (one texture all around), then .j3m are the most easily customizable solution. J3m files can contain texture mapped materials, but as usual you have to create the textures in an external editor, especially if you use UV-mapped textures.

## Writing the .j3m File

1. For every Material, create a file and give it a name that describes it: e.g. `SimpleBump.j3m`
1. Place the file in your project's `assets/Materials/` directory, e.g. `MyGame/src/assets/Materials/SimpleBump.j3m`
1. Edit the file and add content using the following Syntax, e.g.:
```

Material shiny bumpy rock : Common/MatDefs/Light/Lighting.j3md {
     MaterialParameters {
         Shininess: 8.0
         NormalMap: Textures/bump_rock_normal.png
         UseMaterialColors : true
         Ambient  : 0.0 0.0 0.0 1.0
         Diffuse  : 1.0 1.0 1.0 1.0
         Specular : 0.0 0.0 0.0 1.0
     }
}

```

How this file is structured:

1. Header
  1. `Material` is a fixed keyword, keep it.
  1. `shiny bumpy rock` is a descriptive string that you can make up. Choose a name to help you remember for what you intend to use this material.
  1. After the colon, specify on which [Materials](materials_overview.md) definition you base this Material.

1. Now look up the chosen Material Definition's parameters and their parameter types from the Material table. Add one line for each parameter.
  - For example: The series of four numbers in the example above represent RGBA color values.

1. Check the detailed syntax reference below if you are unsure.

:::tip
In the jMonkeyEngine SDK, use "File &gt; New File &gt; Material &gt; Empty Material File" to create .j3m files. You can edit .j3m files directly in the SDK. On the other hand, they are plain text files, so you can also create them in any plain text editor.
:::

## How to Use .j3m Materials

This is how you use the prepared .j3m Material on a Spatial. Since you have saved the .j3m file to your project's Assets directory, the .j3m path is relative to `MyGame/src/assets/…`.

```java
myGeometry.setMaterial(assetManager.loadMaterial("Materials/SimpleBump.j3m"));
```

:::tip
In the jMonkeyEngine SDK, open "Windows &gt; Palette" and drag the `JME Material: Set J3M` snippet into your code.
:::

## Syntax Reference for .j3m Files

### Paths

Make sure to get the paths to the textures (.png, .jpg) and material definitions (.j3md) right.

- The paths to the built-in .j3md files are relative to jME3's Core Data directory. Just copy the path stated in the Material table. +
`Common/MatDefs/Misc/Unshaded.j3md` is resolved to `jme3/src/src/core-data/Common/MatDefs/Misc/Unshaded.j3md`.
- The paths to your textures are relative to your project's assets directory. +
`Textures/bump_rock_normal.png` is resolved to `MyGame/src/assets/Textures/bump_rock_normal.png`

### Data Types

All data types (except Color) are specified in com.jme3.shader.VarType.
"`Color`" is specified as Vector4 in J3MLoader.java.
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>jME Java class</th>
      <th>.j3m file syntax<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Float</td>
      <td>(basic Java type)</td>
      <td>a float (e.g. 0.72) , no comma or parentheses<br /></td>
    </tr>
    <tr>
      <td>Vector2</td>
      <td>`com.jme3.math.Vector2f`</td>
      <td>Two floats, no comma or parentheses<br /></td>
    </tr>
    <tr>
      <td>Vector3</td>
      <td>`com.jme3.math.Vector3f`</td>
      <td>Three floats, no comma or parentheses<br /></td>
    </tr>
    <tr>
      <td>Vector4</td>
      <td>`com.jme3.math.Vector4f`</td>
      <td>Four floats, no comma or parentheses<br /></td>
    </tr>
    <tr>
      <td>Texture2D</td>
      <td>`com.jme3.texture.Texture2D`</td>
      <td>Path to texture in `assets` directory, no quotation marks<br /></td>
    </tr>
    <tr>
      <td>Texture3D</td>
      <td>`com.jme3.texture.Texture3D`</td>
      <td>Same as texture 2D except it is interpreted as a 3D texture<br /></td>
    </tr>
    <tr>
      <td>TextureCubeMap</td>
      <td>`com.jme3.texture.TextureCubeMap`</td>
      <td>Same as texture 2D except it is interpreted as a cubemap texture<br /></td>
    </tr>
    <tr>
      <td>Boolean</td>
      <td>(basic Java type)</td>
      <td>`true` or `false`<br /></td>
    </tr>
    <tr>
      <td>Int</td>
      <td>(basic Java type)</td>
      <td>Integer number, no comma or parentheses<br /></td>
    </tr>
    <tr>
      <td>Color</td>
      <td>`com.jme3.math.ColorRGBA`</td>
      <td>Four floats, no comma or parentheses<br /></td>
    </tr>
    <tr>
      <td>FloatArray</td>
      <td></td>
      <td>(Currently not supported in J3M)<br /></td>
    </tr>
    <tr>
      <td>Vector2Array</td>
      <td></td>
      <td>(Currently not supported in J3M)<br /></td>
    </tr>
    <tr>
      <td>Vector3Array</td>
      <td></td>
      <td>(Currently not supported in J3M)<br /></td>
    </tr>
    <tr>
      <td>Vector4Array</td>
      <td></td>
      <td>(Currently not supported in J3M)<br /></td>
    </tr>
    <tr>
      <td>Matrix3</td>
      <td></td>
      <td>(Currently not supported in J3M)<br /></td>
    </tr>
    <tr>
      <td>Matrix4</td>
      <td></td>
      <td>(Currently not supported in J3M)<br /></td>
    </tr>
    <tr>
      <td>Matrix3Array</td>
      <td></td>
      <td>(Currently not supported in J3M)<br /></td>
    </tr>
    <tr>
      <td>Matrix4Array</td>
      <td></td>
      <td>(Currently not supported in J3M)<br /></td>
    </tr>
    <tr>
      <td>TextureBuffer</td>
      <td></td>
      <td>(Currently not supported in J3M)<br /></td>
    </tr>
    <tr>
      <td>TextureArray</td>
      <td></td>
      <td>(Currently not supported in J3M)<br /></td>
    </tr>
  </tbody>
</table>

### Flip and Repeat Syntax

- A texture can be flipped using the following syntax `NormalMap: Flip Textures/bump_rock_normal.png`
- A texture can be set to repeat using the following syntax `NormalMap: Repeat Textures/bump_rock_normal.png`
- If a texture is set to both being flipped and repeated, Flip must come before Repeat

### Syntax for Additional Render States

- A Boolean can be "`On`" or "`Off`"
- Float is "`123.0`" etc
- Enum - values depend on the enum

See the [RenderState](https://javadoc.jmonkeyengine.org/com/jme3/material/RenderState.html) javadoc for a detailed explanation of render states.
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Purpose<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Wireframe](https://javadoc.jmonkeyengine.org/com/jme3/material/RenderState.html#setWireframe-boolean-)</td>
      <td>(Boolean)</td>
      <td>Enable wireframe rendering mode<br /></td>
    </tr>
    <tr>
      <td>[FaceCull](https://javadoc.jmonkeyengine.org/com/jme3/material/RenderState.html#setFaceCullMode-com.jme3.material.RenderState.FaceCullMode-)</td>
      <td>(Enum: FaceCullMode)</td>
      <td>Set face culling mode (Off, Front, Back, FrontAndBack)<br /></td>
    </tr>
    <tr>
      <td>[DepthWrite](https://javadoc.jmonkeyengine.org/com/jme3/material/RenderState.html#setDepthWrite-boolean-)</td>
      <td>(Boolean)</td>
      <td>Enable writing depth to the depth buffer<br /></td>
    </tr>
    <tr>
      <td>[DepthTest](https://javadoc.jmonkeyengine.org/com/jme3/material/RenderState.html#setDepthTest-boolean-)</td>
      <td>(Boolean)</td>
      <td>Enable depth testing<br /></td>
    </tr>
    <tr>
      <td>[Blend](https://javadoc.jmonkeyengine.org/com/jme3/material/RenderState.html#setBlendMode-com.jme3.material.RenderState.BlendMode-)</td>
      <td>(Enum: BlendMode)</td>
      <td>Set the blending mode<br /></td>
    </tr>
    <tr>
      <td>[AlphaDiscardThreshold](https://javadoc.jmonkeyengine.org/com/jme3/material/Material.html#setFloat-java.lang.String-float-)</td>
      <td>(Float)</td>
      <td>Set the alpha testing alpha falloff value (if set, it will enable alpha testing) +<br />mat.setFloat("AlphaDiscardThreshold", 2f);<br /></td>
    </tr>
    <tr>
      <td>[PolyOffset](https://javadoc.jmonkeyengine.org/com/jme3/material/RenderState.html#setPolyOffset-float-float-)</td>
      <td>(Float, Float)</td>
      <td>Set the polygon offset factor and units<br /></td>
    </tr>
    <tr>
      <td>[ColorWrite](https://javadoc.jmonkeyengine.org/com/jme3/material/RenderState.html#setColorWrite-boolean-)</td>
      <td>(Boolean)</td>
      <td>Enable color writing<br /></td>
    </tr>
  </tbody>
</table>

## Examples

### Example 1: Shiny

```java

Spatial signpost = (Spatial) assetManager.loadAsset(
    new OgreMeshKey("Models/Sign Post/Sign Post.mesh.xml", null));
signpost.setMaterial( assetManager.loadMaterial(
    new AssetKey("Models/Sign Post/Sign Post.j3m")));
TangentBinormalGenerator.generate(signpost);
rootNode.attachChild(signpost);

```

The file `assets/Models/Sign Post/Sign Post.j3m` contains:

```

Material Signpost : Common/MatDefs/Light/Lighting.j3md {
    MaterialParameters {
         Shininess: 4.0
         DiffuseMap:  Models/Sign Post/Sign Post.jpg
         NormalMap:   Models/Sign Post/Sign Post_normal.jpg
         SpecularMap: Models/Sign Post/Sign Post_specular.jpg
         UseMaterialColors : true
         Ambient  : 0.5 0.5 0.5 1.0
         Diffuse  : 1.0 1.0 1.0 1.0
         Specular : 1.0 1.0 1.0 1.0
    }
}

```

The JPG files are in the same directory, `assets/Models/Sign Post/…`.

### Example 2: Repeating Texture

```java

Material mat = assetManager.loadMaterial(
    "Textures/Terrain/Pond/Pond.j3m");
mat.setColor("Ambient", ColorRGBA.DarkGray);
mat.setColor("Diffuse", ColorRGBA.White);
mat.setBoolean("UseMaterialColors", true);

```

The file `assets/Textures/Terrain/Pond/Pond.j3m` contains:

```

Material Pong Rock : Common/MatDefs/Light/Lighting.j3md {
     MaterialParameters {
         Shininess: 8.0
         DiffuseMap: Repeat Textures/Terrain/Pond/Pond.png
         NormalMap:  Repeat Textures/Terrain/Pond/Pond_normal.png
     }
}

```

The PNG files are in the same directory, `assets/Textures/Terrain/Pond/`

### Example 3: Transparent

The file `assets/Models/Tree/Leaves.j3m` contains:

```

Material Leaves : Common/MatDefs/Light/Lighting.j3md {

    Transparent On

    MaterialParameters {
        DiffuseMap : Models/Tree/Leaves.png
        UseAlpha : true
        AlphaDiscardThreshold : 0.5
        UseMaterialColors : true
        Ambient : .5 .5 .5 .5
        Diffuse : 0.7 0.7 0.7 1
        Specular : 0 0 0 1
        Shininess : 16
    }
    AdditionalRenderState {
        Blend Alpha
        AlphaTestFalloff 0.50
        FaceCull Off
    }
}

```

The PNG file is in the same directory, `assets/Models/Tree/…`

## Related Links

- [Developer specification of the jME3 material system (.j3md,.j3m)](material_specification.md)
