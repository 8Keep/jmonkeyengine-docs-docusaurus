# Polygon Meshes

![dolphin-mesh.png](/wiki-assets/docs/core/assets/images/scene/dolphin-mesh.png)

All visible game elements in a scene, whether it is a Model or a Shape, are made up of polygon meshes. JME3 has a [com.jme3.scene.Mesh](https://javadoc.jmonkeyengine.org/com/jme3/scene/Mesh.html) class that represents all meshes.

- Meshes are made up of triangles: `getTriangleCount(…)` and `getTriangle(…)`
- Each mesh has a unique ID: `getId()`
- Meshes have transformations: Location (local translation), rotation, scale.
- Meshes have a bounding volume. jME3 can detect intersections (that is, non-physical collisions) between meshes, or between meshes and 2D elements such as rays: `collideWith()`.
- Meshes are locked with `setStatic()` and unlocked with `setDynamic()`.
  - Static Meshes cannot be modified, but are more optimized and faster (they can be precalculated).
  - Dynamic Meshes can be modified live, but are not optimized and slower.

You have several options when [creating Geometries from meshes](spatial.md):

- Use built-in [Shape](shape/shape.md)s as meshes;
- Load [3D models](3d_models.md) (that is, meshes created in external applications); or
- Create free-form [custom meshes](custom_meshes.md) programmatically.

## Vertex Buffer

The VertexBuffer contains a particular type of geometry data used by Meshes. Every VertexBuffer set on a Mesh is sent as an attribute to the vertex shader to be processed.

### Mesh Vertex Buffers

Here is the list of [VertexBuffer](https://javadoc.jmonkeyengine.org/com/jme3/scene/VertexBuffer.Type.html) types.

<table>
  <thead>
    <tr>
      <th>Vertex Buffer Type</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type.Position</td>
      <td>Position of the vertex (3 floats)<br /></td>
    </tr>
    <tr>
      <td>Type.Index</td>
      <td>Specifies the index buffer, must contain integer data.<br /></td>
    </tr>
    <tr>
      <td>Type.TexCoord</td>
      <td>Texture coordinate<br /></td>
    </tr>
    <tr>
      <td>Type.TexCoord2</td>
      <td>Texture coordinate #2<br /></td>
    </tr>
    <tr>
      <td>Type.Normal</td>
      <td>Normal vector, normalized.<br /></td>
    </tr>
    <tr>
      <td>Type.Tangent</td>
      <td>Tangent vector, normalized.<br /></td>
    </tr>
    <tr>
      <td>Type.Binormal</td>
      <td>Binormal vector, normalized.<br /></td>
    </tr>
    <tr>
      <td>Type.Color</td>
      <td>Color and Alpha (4 floats)<br /></td>
    </tr>
    <tr>
      <td>Type.Size</td>
      <td>The size of the point when using point buffers.<br /></td>
    </tr>
    <tr>
      <td>Type.InterleavedData</td>
      <td>Specifies the source data for various vertex buffers when interleaving is used.<br /></td>
    </tr>
    <tr>
      <td>Type.BindPosePosition</td>
      <td>Initial vertex position, used with animation.<br /></td>
    </tr>
    <tr>
      <td>Type.BindPoseNormal</td>
      <td>Initial vertex normals, used with animation<br /></td>
    </tr>
    <tr>
      <td>Type.BoneWeight</td>
      <td>Bone weights, used with animation<br /></td>
    </tr>
    <tr>
      <td>Type.BoneIndex</td>
      <td>Bone indices, used with animation<br /></td>
    </tr>
  </tbody>
</table>

### Mesh Properties

Some Mesh properties from the [Mesh](https://javadoc.jmonkeyengine.org/com/jme3/scene/Mesh.html) class.

<table>
  <thead>
    <tr>
      <th>Mesh method</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>setBound(boundingVolume)</td>
      <td>if you need to specify a custom optimized bounding volume<br /></td>
    </tr>
    <tr>
      <td>setStatic()</td>
      <td>Locks the mesh so you cannot modify it anymore, thus optimizing its data (faster).<br /></td>
    </tr>
    <tr>
      <td>setDynamic()</td>
      <td>Unlocks the mesh so you can modified it, but this will un-optimize the data (slower).<br /></td>
    </tr>
    <tr>
      <td>setMode(Mesh.Mode.Points)</td>
      <td>Used to set mesh rendering modes, see below.<br /></td>
    </tr>
    <tr>
      <td>getId()</td>
      <td>returns the Mesh ID, default value is -1<br /></td>
    </tr>
    <tr>
      <td>getTriangle(int,tri)</td>
      <td>returns data of triangle number `int` into variable `tri`<br /></td>
    </tr>
    <tr>
      <td>scaleTextureCoordinates(Vector2f)</td>
      <td>How the texture will be stretched over the whole mesh.<br /></td>
    </tr>
  </tbody>
</table>

### Mesh Rendering Modes

Here is the list of [Mesh rendering modes](https://javadoc.jmonkeyengine.org/com/jme3/scene/Mesh.Mode.html).

<table>
  <thead>
    <tr>
      <th>Mesh Mode</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mesh.Mode.Points</td>
      <td>Show only corner points (vertices) of mesh<br /></td>
    </tr>
    <tr>
      <td>Mesh.Mode.Lines</td>
      <td>Show lines (edges) of mesh<br /></td>
    </tr>
    <tr>
      <td>Mesh.Mode.LineLoop</td>
      <td>?<br /></td>
    </tr>
    <tr>
      <td>Mesh.Mode.LineStrip</td>
      <td>?<br /></td>
    </tr>
    <tr>
      <td>Mesh.Mode.Triangles</td>
      <td>?<br /></td>
    </tr>
    <tr>
      <td>Mesh.Mode.TriangleStrip</td>
      <td>?<br /></td>
    </tr>
    <tr>
      <td>Mesh.Mode.TriangleFan</td>
      <td>?<br /></td>
    </tr>
    <tr>
      <td>Mesh.Mode.Hybrid</td>
      <td>?<br /></td>
    </tr>
  </tbody>
</table>

### Level of Detail

Optionally, custom meshes can have a LOD (level of detail optimization) that renders more or less detail, depending on the distance of the mesh from the camera. You have to specify several vertex buffers, one for each level of detail you want (very far away with few details, close up with all details, and something in the middle). Use `setLodLevels(VertexBuffer[] lodLevels)`.
