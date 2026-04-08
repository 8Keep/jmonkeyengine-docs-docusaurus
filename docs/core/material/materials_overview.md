# Material Definition Properties

In jMonkeyEngine 3, colors and textures are represented as Material objects.

- All Geometries must have Materials. To improve performance, reuse Materials for similar models, don't create a new Material object for every Geometry. (E.g. use one bark Material for several tree models.)
- Each Material is based on one of jme3's default Material Definitions (.j3md files) that are included in the engine. Advanced users can create additional custom Material Definitions (see how it's done in the [jme3 sources](../../getting-started/build_from_sources.md)).

:::tip
Find out quickly [How to Use Materials](how_to_use_materials.md), including the most commonly used code samples and RenderStates.
Or find more background info on [How to use Material Definitions](material_definitions.md).
:::

## All Materials Definition Properties

The following Materials table shows the Material Definitions that jMonkeyEngine 3 supports.

:::tip
Looks confusing?
1) Start learning about `Unshaded.j3md` and `Lighting.j3md`, they cover 90% of the cases.
2) Use [the SDK's visual material editor](../../sdk/material_editing.md) to try out and save material settings easily.
3) The [SDK's Palette](../../sdk/code_editor.md) contains drag&drop code snippets for loading materials.
:::

Most Material parameters are optional. For example, it is okay to specify solely the `DiffuseMap` and `NormalMap` when using `Lighting.j3md`, and leave the other texture maps empty. In this case, you are only using a subset of the possible features, but that's fine if it already makes in the material look the way that you want. You can always add more texture maps later.

### Unshaded Coloring and Textures

jMonkeyEngine supports illuminated and unshaded Material Definitions.

- Phong Illuminated materials look more naturalistic.
- Unshaded materials look more abstract.

"`Unshaded`" materials look somewhat abstract because they ignore lighting and shading. Unshaded Materials work even if the scene does not include a light source. These Materials can be single-colored or textured. For example, they are used for cards and tiles, for the sky, billboards and UI elements, for toon-style games, or for testing.

[cols="20,30,50", options="header"]
.Standard Unshaded
<table>
  <tbody>
    <tr>
      <td>Material Definition</td>
      <td>Usage</td>
      <td>Material Parameters<br /></td>
      <td>Common/MatDefs/Misc/<br />Unshaded.j3md</td>
      <td>Standard, non-illuminated Materials.<br /><br />Use this for simple coloring, texturing, glow, and transparency.<br /><br />See also: <a href="../../tutorials/beginner/hello_material.md">Hello Material</a></td>
      <td>*Texture Maps*<br />setTexture("<code>ColorMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setBoolean("<code>SeparateTexCoord</code>",true);<br />setTexture("<code>LightMap</code>", assetManager.loadTexture("<code>name</code>"));<br />*Colors*<br />setColor("<code>Color</code>", ColorRGBA.White);<br />setBoolean("<code>VertexColor</code>",true);<br />*Glow*<br />setTexture("<code>GlowMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setColor("<code>GlowColor</code>", ColorRGBA.White);<br /></td>
    </tr>
  </tbody>
</table>

Other useful, but less commonly used material definitions:

[cols="20,25,55", options="header"]
.Special Unshaded
<table>
  <tbody>
    <tr>
      <td>Material Definition</td>
      <td>Usage</td>
      <td>Material Parameters<br /></td>
      <td>Common/MatDefs/Misc/<br />Sky.j3md</td>
      <td>A solid sky blue, or use with a custom SkyDome texture.<br /><br />See also: <a href="../util/sky.md">Sky</a></td>
      <td>setTexture("<code>Texture</code>", assetManager.loadTexture("<code>name</code>"));<br />setBoolean("<code>SphereMap</code>",true);<br />setVector3("<code>NormalScale</code>", new Vector3f(0,0,0));<br /></td>
      <td>Common/MatDefs/Terrain/<br />Terrain.j3md</td>
      <td>Splat textures for, e.g. terrains.<br /><br />See also: <a href="../../tutorials/beginner/hello_terrain.md">Hello Terrain</a></td>
      <td>setTexture("<code>Tex1</code>", assetManager.loadTexture("<code>name</code>"));<br />(red)<br />setFloat("<code>Tex1Scale</code>",1f);<br />setTexture("<code>Tex2</code>", assetManager.loadTexture("<code>name</code>"));<br />(green)<br />setFloat("<code>Tex2Scale</code>",1f);<br />setTexture("<code>Tex3</code>", assetManager.loadTexture("<code>name</code>"));<br />(blue)<br />setFloat("<code>Tex3Scale</code>",1f);<br />setTexture("<code>Alpha</code>", assetManager.loadTexture("<code>name</code>"));<br /></td>
      <td>Common/MatDefs/Terrain/<br />HeightBasedTerrain.j3md</td>
      <td>A multi-layered texture for terrains.<br /><br />Specify four textures and a Vector3f describing the region in which each texture should appear:<br /><br />X = start height,<br />Y = end height,<br />Z = texture scale.<br /><br />Texture regions can overlap.<br /><br />For example:<br /><br />Specify a seafloor texture for the lowest areas.<br /><br />A sandy texture for the beaches.<br /><br />A grassy texture for inland areas.<br /><br />A rocky texture for mountain tops.</td>
      <td>setFloat("<code>terrainSize</code>",512f);<br />setTexture("<code>region1ColorMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setTexture("<code>region2ColorMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setTexture("<code>region3ColorMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setTexture("<code>region4ColorMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setVector3("<code>region1</code>", new Vector3f(0,0,0));<br />setVector3("<code>region2</code>", new Vector3f(0,0,0));<br />setVector3("<code>region3</code>", new Vector3f(0,0,0));<br />setVector3("<code>region4</code>", new Vector3f(0,0,0));<br />*Settings for steep areas:*<br />setTexture("<code>slopeColorMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setFloat("<code>slopeTileFactor</code>",1f);<br /></td>
      <td>Common/MatDefs/Misc/<br />Particle.j3md</td>
      <td>Used with texture masks for particle effects, or for point sprites.<br /><br />The Quadratic value scales the particle for perspective view. (<a href="https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-core/src/main/java/com/jme3/effect/ParticleEmitter.java">formula</a>)<br /><br />Does support an optional colored glow effect.<br /><br />See also: <a href="../../tutorials/beginner/hello_effects.md">Hello Effects</a></td>
      <td>setTexture("<code>Texture</code>", assetManager.loadTexture("<code>name</code>"));<br />setTexture("<code>GlowMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setColor("<code>GlowColor</code>", ColorRGBA.White);<br />setFloat("<code>Quadratic</code>",1f);<br />setBoolean("<code>PointSprite</code>",true);<br /></td>
    </tr>
  </tbody>
</table>

### Phong Illuminated

jMonkeyEngine supports illuminated and unshaded Material Definitions.

- Phong Illuminated materials look more naturalistic.
- Unshaded materials look more abstract.

Illuminated materials require a [light source](../light/light_and_shadow.md) added to at least one of their parent nodes! (e.g. rootNode.) Illuminated materials are darker on the sides facing away from light sources. They use Phong illumination model (default), or the Ward isotropic gaussian specular shader (WardIso) which looks more like plastic. They do not cast drop shadows unless you use a FilterPostProcessor.

[cols="20,30,50", options="header"]
.Standard Illuminated
<table>
  <tbody>
    <tr>
      <td>Material Definition</td>
      <td>Usage</td>
      <td>Material Parameters<br /></td>
      <td>Common/MatDefs/Light/<br />Lighting.j3md</td>
      <td>Commonly used Material with Phong illumination.<br /><br />Use this material together with DiffuseMap, SpecularMap, BumpMap (NormalMaps, ParalaxMap) textures.<br /><br />Supports shininess, transparency, and plain material colors (Diffuse, Ambient, Specular).<br /><br />See also: <a href="../../tutorials/beginner/hello_material.md">Hello Material</a></td>
      <td>*Texture Maps*<br />setTexture("<code>DiffuseMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setBoolean("<code>UseAlpha</code>",true); footnote:[UseAlpha specifies whether DiffuseMap uses the alpha channel] <br />setTexture("<code>NormalMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setBoolean("<code>LATC</code>",true); footnote:[LATC Specifies whether NormalMap is BC5/ATI2n/LATC/3Dc-compressed] <br />setTexture("<code>SpecularMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setFloat("<code>Shininess</code>",64f);<br />setTexture("<code>ParallaxMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setTexture("<code>AlphaMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setFloat("<code>AlphaDiscardThreshold</code>",1f);<br />setTexture("<code>ColorRamp</code>", assetManager.loadTexture("<code>name</code>"));<br />*Glow*<br />setTexture("<code>GlowMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setColor("<code>GlowColor</code>", ColorRGBA.White);<br />*Performance and quality*<br />setBoolean("<code>VertexLighting</code>",true);<br />setBoolean("<code>UseVertexColor</code>",true);<br />setBoolean("<code>LowQuality</code>",true);<br />setBoolean("<code>HighQuality</code>",true);<br />*Material Colors*<br />setBoolean("<code>UseMaterialColors</code>",true);<br />setColor("<code>Diffuse</code>", ColorRGBA.White);<br />setColor("<code>Ambient</code>", ColorRGBA.White);<br />setColor("<code>Specular</code>", ColorRGBA.White);<br />*Tangent shading:*<br />setBoolean("<code>VTangent</code>",true);<br />setBoolean("<code>Minnaert</code>",true); footnote:[Minnaert is a shader type.]<br />setBoolean("<code>WardIso</code>",true); footnote:[WardIso is a shader type.]<br /></td>
    </tr>
  </tbody>
</table>

[cols="20,30,50", options="header"]
.Special Illuminated
<table>
  <tbody>
    <tr>
      <td>Material Definitions</td>
      <td>Usage</td>
      <td>Material Parameters<br /></td>
      <td>Common/MatDefs/Terrain/<br />TerrainLighting.j3md</td>
      <td>Same kind of multi-layered splat texture as Terrain.j3md, but with illumination and shading.<br /><br />Typically used for terrains, but works on any mesh.<br /><br />For every three splat textures, you need one alpha map.<br /><br />You can use a total of 11 texture maps in the terrain's splat texture:<br /><br />Note that diffuse and normal maps all count against that.<br /><br />For example:<br /><br />You can use a maximum of nine diffuse textures, two of which can have normal maps; or, five textures with both diffuse and normal maps.</td>
      <td>*Texture Splat Maps*<br />setTexture("<code>DiffuseMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setFloat("<code>DiffuseMap_0_scale</code>",1f);<br />setTexture("<code>NormalMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setTexture("<code>DiffuseMap_1</code>", assetManager.loadTexture("<code>name</code>"));<br />setFloat("<code>DiffuseMap_1_scale</code>",1f);<br />setTexture("<code>NormalMap_1</code>", assetManager.loadTexture("<code>name</code>"));<br />setTexture("<code>DiffuseMap_2</code>", assetManager.loadTexture("<code>name</code>"));<br />setFloat("<code>DiffuseMap_2_scale</code>",1f);<br />setTexture("<code>NormalMap_2</code>", assetManager.loadTexture("<code>name</code>"));<br />setTexture("<code>DiffuseMap_3</code>", assetManager.loadTexture("<code>name</code>"));<br />setFloat("<code>DiffuseMap_3_scale</code>",1f);<br />setTexture("<code>NormalMap_3</code>", assetManager.loadTexture("<code>name</code>"));<br />etc, up to 11.<br />*Alpha Maps*<br />setTexture("<code>AlphaMap</code>", assetManager.loadTexture("name"));<br />setTexture("<code>AlphaMap_1</code>", assetManager.loadTexture("<code>name</code>"));<br />setTexture("<code>AlphaMap_2</code>", assetManager.loadTexture("<code>name</code>"));<br />*Glowing*<br />setTexture("<code>GlowMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setColor("<code>GlowColor</code>", ColorRGBA.White);<br />*Miscellaneous*<br />setColor("<code>Diffuse</code>", ColorRGBA.White);<br />setColor("<code>Ambient</code>", ColorRGBA.White);<br />setFloat("<code>Shininess</code>",64f);<br />setColor("<code>Specular</code>", ColorRGBA.White);<br />setTexture("<code>SpecularMap</code>", assetManager.loadTexture("<code>name</code>"));<br />setBoolean("<code>WardIso</code>",true);<br />setBoolean("<code>useTriPlanarMapping</code>",true);<br />setBoolean("<code>isTerrainGrid</code>",true);<br /></td>
      <td>Common/MatDefs/Light/<br />reflect.j3md</td>
      <td>Reflective glass material with environment map (CubeMap/SphereMap).<br /><br />//See also: <a href="http://code.google.com/p/jmonkeyengine/source/browse/trunk/engine/src/test/jme3test/texture/TestCubeMap.java">TestCubeMap.java</a></td>
      <td>setTexture("<code>Texture</code>", assetManager.loadTexture("<code>name</code>"));<br />setBoolean("<code>SphereMap</code>",true);<br /></td>
    </tr>
  </tbody>
</table>

### Other: Test and Debug

[cols="20,80", options="header"]
.Testing
<table>
  <tbody>
    <tr>
      <td>Material Definition</td>
      <td>Usage<br /></td>
      <td>Common/MatDefs/Misc/<br />ShowNormals.j3md</td>
      <td>A color gradient calculated from the model's surface normal's. You can use this built-in material to debug the generation of normal's in meshes, to preview models that have no material and no lights, or as fall-back default material. This built-in material has no parameters.<br /></td>
    </tr>
  </tbody>
</table>

## RenderStates

[cols="3", options="header"]
.Transparency
<table>
  <tbody>
    <tr>
      <td>Material Option</td>
      <td>Description</td>
      <td>Example<br /></td>
      <td>getAdditionalRenderState().<br />setBlendMode(BlendMode.Off);</td>
      <td>This is the default, no transparency.</td>
      <td>Use for all opaque objects like walls, floors, people…<br /></td>
      <td>getAdditionalRenderState()<br />.setBlendMode(BlendMode.Alpha);</td>
      <td>Interpolates the background pixel with the current pixel by using the current pixel's alpha.</td>
      <td>Use this for normal every-day translucency: Frosted window panes, ice, glass, alpha-blended vegetation textures…<br /></td>
      <td>getAdditionalRenderState()<br />.setDepthWrite(false);</td>
      <td>Disables writing of the pixel's depth value to the depth buffer.</td>
      <td>Use this on Materials if you have several transparent/translucent objects obscuring one another, but you want to see through both.<br /></td>
      <td>getAdditionalRenderState()<br />.setAlphaFallOff(0.5f);<br /><br />getAdditionalRenderState()<br />.setAlphaTest(true)</td>
      <td>Enables Alpha Testing with a "<code>AlphaDiscardThreshold</code>" in the AlphaMap.</td>
      <td>Activate Alpha Testing for (partially) *transparent* objects such as foliage, hair, etc.<br /><br />Deactivate Alpha Testing for gradually *translucent* objects, such as colored glass, smoked glass, ghosts.<br /></td>
      <td>getAdditionalRenderState()<br />.setBlendMode(BlendMode.Additive);</td>
      <td>Additive alpha blending adds colors in a commutative way, i.e. the result does not depend on the order of transparent layers since it adds the scene's background pixel color to the current pixel color. This is useful if you have many transparent textures overlapping and don't care about the order.<br /><br />*Note:* Viewed in front of a white background, Additive textures become fully transparent!</td>
      <td>This is the default for Particle.j3md-based textures that have a black color background.<br /></td>
      <td>getAdditionalRenderState()<br />.setBlendMode(BlendMode.AlphaAdditive);</td>
      <td>Same as "<code>Additive</code>", except first it multiplies the current pixel color by the pixel alpha.</td>
      <td>This can be used for particle effects that have alpha as background.<br /></td>
      <td>getAdditionalRenderState()<br />.setBlendMode(BlendMode.Color);</td>
      <td>Blends by color.</td>
      <td>Generally useless.<br /></td>
      <td>getAdditionalRenderState()<br />.setBlendMode(BlendMode.Modulate);</td>
      <td>Multiplies the background pixel by the current pixel.</td>
      <td>?<br /></td>
      <td>getAdditionalRenderState()<br />.setBlendMode(BlendMode.ModulateX2);</td>
      <td>Same as "<code>Modulate</code>", except the result is doubled.</td>
      <td>?<br /></td>
      <td>getAdditionalRenderState()<br />.setBlendMode(BlendMode.PremultAlpha);</td>
      <td>Pre-multiplied alpha blending. E.g. if the color of the object has already been multiplied by its alpha, this is used instead of "<code>Alpha</code>" blend mode.</td>
      <td>For use with Premult Alpha textures.<br /></td>
    </tr>
  </tbody>
</table>

If the DiffuseMap has an alpha channel, use:

```java
mat.setBoolean("UseAlpha",true);
```

Later, put the Geometry (not the Material!) in the appropriate render queue.
```java
geo.setQueueBucket(Bucket.Translucent);
```

or
```java
geo.setQueueBucket(Bucket.Transparent);
```

[cols="3", options="header"]
.Culling
<table>
  <tbody>
    <tr>
      <td>Material Option</td>
      <td>Usage</td>
      <td>Example<br /></td>
      <td>getAdditionalRenderState()<br />.setFaceCullMode(FaceCullMode.Back);</td>
      <td>Activates back-face culling. Mesh faces that are facing away from the camera are not rendered, which saves time.<br /><br />*Backface culling is activated by default as a major optimization.*</td>
      <td>The invisible backsides and insides of models are not calculated.<br /></td>
      <td>getAdditionalRenderState()<br />.setFaceCullMode(FaceCullMode.Off);</td>
      <td>No meshes are culled. Both mesh faces are rendered, even if they face away from the camera. Slow.</td>
      <td>Sometimes used to debug custom meshes if you messed up some of the polygon sides, or for special shadow effects.<br /></td>
      <td>getAdditionalRenderState()<br />.setFaceCullMode(FaceCullMode.Front);</td>
      <td>Activates front-face culling. Mesh faces facing the camera are not rendered.</td>
      <td>No example – Typically not used because you wouldn't see anything meaningful.<br /></td>
      <td>getAdditionalRenderState()<br />.setFaceCullMode(FaceCullMode.FrontAndBack)</td>
      <td>Culls both backfaces and frontfaces.</td>
      <td>Use this as an efficient way to make an object temporarily invisible, while keeping all its other in-game properties (such as node attachment, collision shapes, interactions, etc.) active.<br /></td>
    </tr>
  </tbody>
</table>

[cols="3", options="header"]
.Miscellaneous
<table>
  <tbody>
    <tr>
      <td>Material Option</td>
      <td>Useage</td>
      <td>Example<br /></td>
      <td>getAdditionalRenderState()<br />.setColorWrite(false);</td>
      <td>Disable writing the color of pixels.</td>
      <td>Use this together with setDepthWrite(true) to write pixels only to the depth buffer, for example.<br /></td>
      <td>getAdditionalRenderState()<br />.setPointSprite(true);</td>
      <td>Enables point-sprite mode, e.g. meshes with "<code>Mode</code>".Points will be rendered as textured sprites.<br /><br />Note that gl_PointCoord must be set in the shader.</td>
      <td>Point sprites are used internally for hardware accelerated particle effects.<br /></td>
      <td>getAdditionalRenderState()<br />.setPolyOffset();</td>
      <td>Enable polygon offset.</td>
      <td>Use this when you have meshes that have triangles really close to each over (e.g. <a href="http://en.wikipedia.org/wiki/Coplanarity">Coplanar</a>), it will shift the depth values to prevent <a href="http://en.wikipedia.org/wiki/Z-fighting">Z-fighting</a>.<br /></td>
    </tr>
  </tbody>
</table>

*Related Links*

- [Developer specification of the jME3 material system (.j3md,.j3m)](material_specification.md)
