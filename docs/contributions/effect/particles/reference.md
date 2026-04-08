# Next Generation Particles - Reference

The Parameters for a ParticleController are:
<table>
  <thead>
    <tr>
      <th>name</th>
      <th>The name to use for the geometry in the scene graph<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>mesh</td>
      <td>The mesh to use (Usually either PointMesh or QuadMesh)<br /></td>
    </tr>
    <tr>
      <td>maxParticles</td>
      <td>The maximum number of particles to allow active at any one time<br /></td>
    </tr>
    <tr>
      <td>lifeMin</td>
      <td>The minimum amount of time (in seconds) for which each particle lives<br /></td>
    </tr>
    <tr>
      <td>lifeMax</td>
      <td>The maximum amount of time (in seconds) for which each particle lives<br /></td>
    </tr>
    <tr>
      <td>source</td>
      <td>The source from which the particles are spawned<br /></td>
    </tr>
    <tr>
      <td>emissionController</td>
      <td>The frequency and timing with which particles are spawned. If null then no particles are automatically spawned and they must be triggered manually using emitNextParticle() or emitAllParticles()<br /></td>
    </tr>
    <tr>
      <td>influencers</td>
      <td>Zero or more ParticleInfluencers, each of which changes the behaviour of the particles.<br /></td>
    </tr>
  </tbody>
</table>

All of the following classes have defined Interfaces or Abstract Classes to allow custom implementations and behaviour to easily be plugged into the system.

Javadoc for the system can be found at [http://www.zero-separation.com/particles/javadoc](http://www.zero-separation.com/particles/javadoc)

## Mesh

The Mesh options are:
<table>
  <thead>
    <tr>
      <th>PointMesh</th>
      <th>Fastest and most efficient, but also most limited<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>QuadMesh</td>
      <td>Much more flexible than point mesh, all particles are represented as 2-dimensional quads<br /></td>
    </tr>
    <tr>
      <td>TemplateMesh</td>
      <td>Allows particles to be full 3d objects, with the mesh for each particle being generated from one of any number of template meshes. This allows fully 3d particles and takes in texture co-ordinates and even (if required) vertex colours and normals from the original mesh converting them as required.<br /></td>
    </tr>
  </tbody>
</table>

## Source

The Source options are:
<table>
  <thead>
    <tr>
      <th>PointSource</th>
      <th>Generates all particles from a specific point with a random velocity. The point itself is a spatial so can be attached to the scene graph and will move with it.<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MeshSource</td>
      <td>Generates all particles from a randomly selected point on the given mesh. A random triangle is selected and then the particle emitter from a random point within that triangle along the triangle's normal vector.<br /></td>
    </tr>
    <tr>
      <td>WeightedMeshSource</td>
      <td>Provides the same functionality as MeshSource but weights triangles based on their relative size, larger triangles will tend to emit more particles. This provides a more even spread but uses more resources and needs to be kept updated if the mesh changes.<br /></td>
    </tr>
    <tr>
      <td>ParticleParticleSource</td>
      <td>Emits particles from another ParticleController. The particle is emitted from a randomly selected active particle and the new particle starts with identical velocity, rotation, etc as the particle it is being emitted from.<br /></td>
    </tr>
  </tbody>
</table>

## EmissionControllers
<table>
  <thead>
    <tr>
      <th>NULL</th>
      <th>The NULL EmissionController does not automatically emit any particles, they must be emitted externally by a call to the ParticleController emitNextParticle() or emitAllParticles(). Note that if the ParticleController is not in use for an extended period of time it is recommended that to save resources you pause it by either disabling the controller or removing the Geometry from the scene graph.<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>RegularEmission</td>
      <td>This EmissionController just emits particles at regular intervals, it will emit multiple particles in one frame if more than one interval has passed since the previous frame.<br /></td>
    </tr>
  </tbody>
</table>

## Influencers
<table>
  <thead>
    <tr>
      <th>ColorInfluencer</th>
      <th>Modify the particle's color over time<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GravityInfluencer</td>
      <td>Apply steady acceleration in a specified direction over time<br /></td>
    </tr>
    <tr>
      <td>MultiColorInfluencer</td>
      <td>Modify the particle's color through multiple colors over time<br /></td>
    </tr>
    <tr>
      <td>PreferredDestinationInfluencer</td>
      <td>Move the particle towards a specified point<br /></td>
    </tr>
    <tr>
      <td>PreferredDirectionInfluencer</td>
      <td>Rotate the particles velocity towards the given direction over time<br /></td>
    </tr>
    <tr>
      <td>RandomImpulseInfluencer</td>
      <td>Apply a random impulse to the particle either at initialization or every frame<br /></td>
    </tr>
    <tr>
      <td>RandomSpriteInfluencer</td>
      <td>Select a random sprite for the particle from those available when it is initialized<br /></td>
    </tr>
    <tr>
      <td>RotationInfluencer</td>
      <td>Rotate the particle by picking an initial rotational velocity at random and then maintaining it<br /></td>
    </tr>
    <tr>
      <td>SizeInfluencer</td>
      <td>Modify the particle's size over time<br /></td>
    </tr>
    <tr>
      <td>SpatialDestinationInfluencer</td>
      <td>Move the particle towards a given spatial, it will attempt to reach the current location of the spatial by the end of the particle's life cycle.<br /></td>
    </tr>
    <tr>
      <td>SpeedInfluencer</td>
      <td>Modify the particle's speed over time<br /></td>
    </tr>
    <tr>
      <td>SpriteAnimationInfluencer</td>
      <td>Animate the particle through the available sprites over time<br /></td>
    </tr>
  </tbody>
</table>
