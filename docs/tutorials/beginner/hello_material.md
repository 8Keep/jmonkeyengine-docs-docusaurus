# jMonkeyEngine 3 Tutorial (6) - Hello Materials

The term Material includes everything that influences what the surface of a 3D model looks like: The color, texture, shininess, and opacity/transparency. Plain coloring is covered in [Hello Node](hello_node.md). Loading models that come with materials is covered in [Hello Asset](hello_asset.md). In this tutorial you learn to create and use custom JME3 Material Definitions.

![beginner-materials.png](/wiki-assets/docs/tutorials/assets/images/beginner/beginner-materials.png)

:::tip
To use the example assets in a new jMonkeyEngine SDK project, right-click your project, select "Properties &gt; Libraries &gt; Add Library", and add the "`jme3-test-data`" library.
:::

## Sample Code

```java
package jme3test.helloworld;

import com.jme3.app.SimpleApplication;
import com.jme3.light.DirectionalLight;
import com.jme3.material.Material;
import com.jme3.material.RenderState.BlendMode;
import com.jme3.math.ColorRGBA;
import com.jme3.math.Vector3f;
import com.jme3.renderer.queue.RenderQueue.Bucket;
import com.jme3.scene.Geometry;
import com.jme3.scene.shape.Box;
import com.jme3.scene.shape.Sphere;
import com.jme3.texture.Texture;
import com.jme3.util.TangentBinormalGenerator;

/** Sample 6 - how to give an object's surface a material and texture.
 * How to make objects transparent. How to make bumpy and shiny surfaces.  */
public class HelloMaterial extends SimpleApplication {

  public static void main(String[] args) {
    HelloMaterial app = new HelloMaterial();
    app.start();
  }

  @Override
  public void simpleInitApp() {

    /** A simple textured cube -- in good MIP map quality. */
    Box cube1Mesh = new Box( 1f,1f,1f);
    Geometry cube1Geo = new Geometry("My Textured Box", cube1Mesh);
    cube1Geo.setLocalTranslation(new Vector3f(-3f,1.1f,0f));
    Material cube1Mat = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
    Texture cube1Tex = assetManager.loadTexture("Interface/Logo/Monkey.jpg");
    cube1Mat.setTexture("ColorMap", cube1Tex);
    cube1Geo.setMaterial(cube1Mat);
    rootNode.attachChild(cube1Geo);

    /** A translucent/transparent texture, similar to a window frame. */
    Box cube2Mesh = new Box( 1f,1f,0.01f);
    Geometry cube2Geo = new Geometry("window frame", cube2Mesh);
    Material cube2Mat = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
    cube2Mat.setTexture("ColorMap", assetManager.loadTexture("Textures/ColoredTex/Monkey.png"));
    cube2Mat.getAdditionalRenderState().setBlendMode(BlendMode.Alpha);  // activate transparency
    cube2Geo.setQueueBucket(Bucket.Transparent);
    cube2Geo.setMaterial(cube2Mat);
    rootNode.attachChild(cube2Geo);

    /* A bumpy rock with a shiny light effect. To make bumpy objects you must create a NormalMap. */
    Sphere sphereMesh = new Sphere(32,32, 2f);
    Geometry sphereGeo = new Geometry("Shiny rock", sphereMesh);
    sphereMesh.setTextureMode(Sphere.TextureMode.Projected); // better quality on spheres
    TangentBinormalGenerator.generate(sphereMesh);           // for lighting effect
    Material sphereMat = new Material(assetManager, "Common/MatDefs/Light/Lighting.j3md");
    sphereMat.setTexture("DiffuseMap", assetManager.loadTexture("Textures/Terrain/Pond/Pond.jpg"));
    sphereMat.setTexture("NormalMap", assetManager.loadTexture("Textures/Terrain/Pond/Pond_normal.png"));
    sphereMat.setBoolean("UseMaterialColors",true);
    sphereMat.setColor("Diffuse",ColorRGBA.White);
    sphereMat.setColor("Specular",ColorRGBA.White);
    sphereMat.setFloat("Shininess", 64f);  // [0,128]
    sphereGeo.setMaterial(sphereMat);
    //sphereGeo.setMaterial((Material) assetManager.loadMaterial("Materials/MyCustomMaterial.j3m"));
    sphereGeo.setLocalTranslation(0,2,-2); // Move it a bit
    sphereGeo.rotate(1.6f, 0, 0);          // Rotate it a bit
    rootNode.attachChild(sphereGeo);

    /** Must add a light to make the lit object visible! */
    DirectionalLight sun = new DirectionalLight();
    sun.setDirection(new Vector3f(1,0,-2).normalizeLocal());
    sun.setColor(ColorRGBA.White);
    rootNode.addLight(sun);

  }
}

```

You should see

- Left – A cube with a brown monkey texture.
- Right – A translucent monkey picture in front of a shiny bumpy rock.

Move around with the WASD keys to have a closer look at the translucency, and the rock's bumpiness.

## Simple Unshaded Texture

Typically you want to give objects in your scene textures: It can be rock, grass, brick, wood, water, metal, paper… A texture is a normal image file in JPG or PNG format. In this example, you create a box with a simple unshaded Monkey texture as material.

```java

    /** A simple textured cube -- in good MIP map quality. */
    Box cube1Mesh = new Box( 1f,1f,1f);
    Geometry cube1Geo = new Geometry("My Textured Box", cube1Mesh);
    cube1Geo.setLocalTranslation(new Vector3f(-3f,1.1f,0f));
    Material cube1Mat = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
    Texture cube1Tex = assetManager.loadTexture("Interface/Logo/Monkey.jpg");
    cube1Mat.setTexture("ColorMap", cube1Tex);
    cube1Geo.setMaterial(cube1Mat);
    rootNode.attachChild(cube1Geo);

```

Here is what we did: to create a textured box:

1. Create a Geometry `cube1Geo` from a Box mesh `cube1Mesh`.
1. Create a Material `cube1Mat` based on jME3's default `Unshaded.j3md` material definition.
1. Create a texture `cube1Tex` from the `Monkey.jpg` file in the `assets/Interface/Logo/` directory of the project.
1. Load the texture `cube1Tex` into the `ColorMap` layer of the material `cube1Mat`.
1. Apply the material to the cube, and attach the cube to the rootnode.

## Transparent Unshaded Texture

`Monkey.png` is the same texture as `Monkey.jpg`, but with an added alpha channel. The alpha channel allows you to specify which areas of the texture you want to be opaque or transparent: Black areas of the alpha channel remain opaque, gray areas become translucent, and white areas become transparent.

For a partially translucent/transparent texture, you need:

- A Texture with alpha channel
- A Texture with blend mode of `BlendMode.Alpha`
- A Geometry in the `Bucket.Transparent` render bucket. +
This bucket ensures that the transparent object is drawn on top of objects behind it, and they show up correctly under the transparent parts.

```java

    /** A translucent/transparent texture, similar to a window frame. */
    Box cube2Mesh = new Box( 1f,1f,0.01f);
    Geometry cube2Geo = new Geometry("window frame", cube2Mesh);
    Material cube2Mat = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
    cube2Mat.setTexture("ColorMap", assetManager.loadTexture("Textures/ColoredTex/Monkey.png"));
    cube2Mat.getAdditionalRenderState().setBlendMode(BlendMode.Alpha);  // activate transparency
    cube2Geo.setQueueBucket(Bucket.Transparent);                        
    cube2Geo.setMaterial(cube2Mat);
    rootNode.attachChild(cube2Geo);

```

For non-transparent objects, the drawing order is not so important, because the z-buffer already keeps track of whether a pixel is behind something else or not, and the color of an opaque pixel doesn't depend on the pixels under it, this is why opaque Geometries can be drawn in any order.

What you did for the transparent texture is the same as before, with only one added step for the transparency.

1. Create a Geometry `cube2Geo` from a Box mesh `cube2Mesh`. This Box Geometry is flat upright box (because z=0.01f).
1. Create a Material `cube2Mat` based on jME3's default `Unshaded.j3md` material definition.
1. Create a texture `cube2Tex` from the `Monkey.png` file in the `assets/Textures/ColoredTex/` directory of the project. This PNG file must have an alpha layer.
1. *Activate transparency in the material by setting the blend mode to Alpha.*
1. *Set the QueueBucket of the Geometry to `Bucket.Transparent`.*
1. Load the texture `cube2Tex` into the `ColorMap` layer of the material `cube2Mat`.
1. Apply the material to the cube, and attach the cube to the rootnode.

:::tip
Learn more about creating PNG images with an alpha layer in the help system of your graphic editor.
:::

## Shininess and Bumpiness

But textures are not all. Have a close look at the shiny sphere – you cannot get such a nice bumpy material with just a plain texture. You see that JME3 also supports so-called Phong-illuminated materials:

In a lit material, the standard texture layer is referred to as _DiffuseMap_, any material can use this layer. A lit material can additionally have lighting effects such as _Shininess_ used together with the _SpecularMap_ layer and _Specular_ color. And you can even get a realistically bumpy or cracked surface with help of the _NormalMap_ layer.

Let's have a look at the part of the code example where you create the shiny bumpy rock.

1. Create a Geometry from a Sphere shape. Note that this shape is a normal smooth sphere mesh.

```java

    Sphere sphereMesh = new Sphere(32,32, 2f);
    Geometry sphereGeo = new Geometry("Shiny rock", sphereMesh);
```

  1. (Only for Spheres) Change the sphere's TextureMode to make the square texture project better onto the sphere.

```java

    sphereMesh.setTextureMode(Sphere.TextureMode.Projected);
```

  1. You must generate TangentBinormals for the mesh so you can use the NormalMap layer of the texture.

```java

    TangentBinormalGenerator.generate(sphereMesh);
```

1. Create a material based on the `Lighting.j3md` default material.

```java
    Material sphereMat = new Material(assetManager, "Common/MatDefs/Light/Lighting.j3md");
```

  1. Set a standard rocky texture in the `DiffuseMap` layer.

![Pond.jpg](https://github.com/jMonkeyEngine/jmonkeyengine/raw/445f7ed010199d30c484fe75bacef4b87f2eb38e/jme3-testdata/src/main/resources/Textures/Terrain/Pond/Pond.jpg)

```java
    sphereMat.setTexture("DiffuseMap", assetManager.loadTexture("Textures/Terrain/Pond/Pond.jpg"));
```

  1. Set the `NormalMap` layer that contains the bumpiness. The NormalMap was generated for this particular DiffuseMap with a special tool (e.g. Blender).

![Pond_normal.png](https://github.com/jMonkeyEngine/jmonkeyengine/raw/445f7ed010199d30c484fe75bacef4b87f2eb38e/jme3-testdata/src/main/resources/Textures/Terrain/Pond/Pond_normal.png)

```java
    sphereMat.setTexture("NormalMap", assetManager.loadTexture("Textures/Terrain/Pond/Pond_normal.png"));
```

  1. Set the Material's Shininess to a value between 1 and 128. For a rock, a low fuzzy shininess is appropriate. Use material colors to define the shiny Specular color.

```java

    sphereMat.setBoolean("UseMaterialColors",true);
    sphereMat.setColor("Diffuse",ColorRGBA.White);  // minimum material color
    sphereMat.setColor("Specular",ColorRGBA.White); // for shininess
    sphereMat.setFloat("Shininess", 64f); // [1,128] for shininess
```

1. Assign your newly created material to the Geometry.

```java

    sphereGeo.setMaterial(sphereMat);
```

1. Let's move and rotate the geometry a bit to position it better.

```java

    sphereGeo.setLocalTranslation(0,2,-2); // Move it a bit
    sphereGeo.rotate(1.6f, 0, 0);          // Rotate it a bit
    rootNode.attachChild(sphereGeo);
```

Remember that any Lighting.j3md-based material requires a light source, as shown in the full code sample above.

:::tip
To deactivate Shininess, do not set `Shininess` to 0, but instead set the `Specular` color to `ColorRGBA.Black`.
:::

## Default Material Definitions

As you have seen, you can find the following default materials in `jme/core-data/Common/MatDefs/…`.
<table>
  <thead>
    <tr>
      <th>Default Definition</th>
      <th>Usage</th>
      <th>Parameters<br /></th>
      <th>`Misc/Unshaded.j3md`</th>
      <th>Colored: Use with mat.setColor() and ColorRGBA. +<br />Textured: Use with mat.setTexture() and Texture.</th>
      <th>Color : Color +<br />ColorMap : Texture2D<br /></th>
      <th>`Light/Lighting.j3md`</th>
      <th>Use with shiny Textures, Bump- and NormalMaps textures. +<br />Requires a light source.</th>
      <th>Ambient, Diffuse, Specular : Color +<br />DiffuseMap, NormalMap, SpecularMap : Texture2D +<br />Shininess : Float<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

For a game, you create custom Materials based on these existing MaterialDefintions – as you have just seen in the example with the shiny rock's material.

## Exercises

### Exercise 1: Custom .j3m Material

Look at the shiny rocky sphere above again. It takes several lines to create and set the Material.

- Note how it loads the `Lighting.j3md` Material definition.
- Note how it sets the `DiffuseMap` and `NormalMap` to a texture path.
- Note how it activates `UseMaterialColors` and sets `Specular` and `Diffuse` to 4 float values (RGBA color).
- Note how it sets `Shininess` to 64.

If you want to use one custom material for several models, you can store it in a .j3m file, and save a few lines of code every time.

You create a j3m file as follows:

1. Create a plain text file `assets/Materials/MyCustomMaterial.j3m` in your project directory, with the following content:

```
Material My shiny custom material : Common/MatDefs/Light/Lighting.j3md {
     MaterialParameters {
        DiffuseMap : Textures/Terrain/Pond/Pond.jpg
        NormalMap : Textures/Terrain/Pond/Pond_normal.png
        UseMaterialColors : true
        Specular : 1.0 1.0 1.0 1.0
        Diffuse : 1.0 1.0 1.0 1.0
        Shininess : 64.0
     }
}

```

  - Note that `Material` is a fixed keyword.
  - Note that `My shiny custom material` is a String that you can choose to describe the material.
  - Note how the code sets all the same properties as before!

1. In the code sample, comment out the eight lines that have `sphereMat` in them.
1. Below this line, add the following line:

```java
    sphereGeo.setMaterial((Material) assetManager.loadMaterial("Materials/MyCustomMaterial.j3m"));
```

1. Run the app. The result is the same.

Using this new custom material `MyCustomMaterial.j3m` only takes one line. You have replaced the eight lines of an on-the-fly material definition with one line that loads a custom material from a file. Using .j3m files is very handy if you use the same material often.

### Exercise 2: Bumpiness and Shininess

Go back to the bumpy rock sample above:

1. Comment out the DiffuseMap line, and run the app. (Uncomment it again.)
  - Which property of the rock is lost?

1. Comment out the NormalMap line, and run the app. (Uncomment it again.)
  - Which property of the rock is lost?

1. Change the value of Shininess to values like 0, 63, 127.
  - What aspect of the Shininess changes?

## Conclusion

You have learned how to create a Material, specify its properties, and use it on a Geometry. You know how to load an image file (.png, .jpg) as texture into a material. You know to save texture files in a subfolder of your project's `assets/Textures/` directory.

You have also learned that a material can be stored in a .j3m file. The file references a built-in MaterialDefinition and specifies values for properties of that MaterialDefinition. You know to save your custom .j3m files in your project's `assets/Materials/` directory.

*See also:*

- [How to Use Materials](../../core/material/how_to_use_materials.md)
- [Material Editing](../../sdk/material_editing.md)
- [Materials](https://hub.jmonkeyengine.org/t/jmonkeyengine3-material-system-full-explanation/12947) forum thread
- [Video Tutorial: Editing and Assigning Materials to Models in jMonkeyEngine SDK (from 2010, is there a newer one?](http://www.youtube.com/watch?v=Feu3-mrpolc)
- [Blender tutorials](https://www.blender.org/support/tutorials/)
