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

| Vertex Buffer Type |
| --- |
| Description<br /> |
| Type.Position |
| Position of the vertex (3 floats)<br /> |
| Type.Index |
| Specifies the index buffer, must contain integer data.<br /> |
| Type.TexCoord |
| Texture coordinate<br /> |
| Type.TexCoord2 |
| Texture coordinate #2<br /> |
| Type.Normal |
| Normal vector, normalized.<br /> |
| Type.Tangent |
| Tangent vector, normalized.<br /> |
| Type.Binormal |
| Binormal vector, normalized.<br /> |
| Type.Color |
| Color and Alpha (4 floats)<br /> |
| Type.Size |
| The size of the point when using point buffers.<br /> |
| Type.InterleavedData |
| Specifies the source data for various vertex buffers when interleaving is used.<br /> |
| Type.BindPosePosition |
| Initial vertex position, used with animation.<br /> |
| Type.BindPoseNormal |
| Initial vertex normals, used with animation<br /> |
| Type.BoneWeight |
| Bone weights, used with animation<br /> |
| Type.BoneIndex |
| Bone indices, used with animation<br /> |

### Mesh Properties

Some Mesh properties from the [Mesh](https://javadoc.jmonkeyengine.org/com/jme3/scene/Mesh.html) class.

| Mesh method |
| --- |
| Description<br /> |
| setBound(boundingVolume) |
| if you need to specify a custom optimized bounding volume<br /> |
| setStatic() |
| Locks the mesh so you cannot modify it anymore, thus optimizing its data (faster).<br /> |
| setDynamic() |
| Unlocks the mesh so you can modified it, but this will un-optimize the data (slower).<br /> |
| setMode(Mesh.Mode.Points) |
| Used to set mesh rendering modes, see below.<br /> |
| getId() |
| returns the Mesh ID, default value is -1<br /> |
| getTriangle(int,tri) |
| returns data of triangle number `int` into variable `tri`<br /> |
| scaleTextureCoordinates(Vector2f) |
| How the texture will be stretched over the whole mesh.<br /> |

### Mesh Rendering Modes

Here is the list of [Mesh rendering modes](https://javadoc.jmonkeyengine.org/com/jme3/scene/Mesh.Mode.html).

| Mesh Mode |
| --- |
| Description<br /> |
| Mesh.Mode.Points |
| Show only corner points (vertices) of mesh<br /> |
| Mesh.Mode.Lines |
| Show lines (edges) of mesh<br /> |
| Mesh.Mode.LineLoop |
| ?<br /> |
| Mesh.Mode.LineStrip |
| ?<br /> |
| Mesh.Mode.Triangles |
| ?<br /> |
| Mesh.Mode.TriangleStrip |
| ?<br /> |
| Mesh.Mode.TriangleFan |
| ?<br /> |
| Mesh.Mode.Hybrid |
| ?<br /> |

### Level of Detail

Optionally, custom meshes can have a LOD (level of detail optimization) that renders more or less detail, depending on the distance of the mesh from the camera. You have to specify several vertex buffers, one for each level of detail you want (very far away with few details, close up with all details, and something in the middle). Use `setLodLevels(VertexBuffer[] lodLevels)`.
