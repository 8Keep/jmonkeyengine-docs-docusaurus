# 3-D Rotation

_Bad news: 3D rotation is done using matrix calculus.
Good news: If you do not understand calculus, there are two simple rules how you get it right._

*3D rotation* is a crazy mathematical operation where you need to multiply all vertices in your object by four floating point numbers; the multiplication is referred to as concatenation, the array of four numbers &#123;x,y,z,w&#125; is referred to as [quaternions](../../core/math/quaternion.md). Don't worry, the 3D engine does the tough work for you. All you need to know is:

*The Quaternion* is an object capable of deep-freezing and storing a rotation that you can apply to a 3D object.

## Using Quaternions for Rotation

To store a rotation in a Quaternion, you must specify two things: The angle and the axis of the rotation.

- The rotation angle is defined as a multiple of the number PI.
- The rotation axis is defined by a vector: Think of them in terms of "`pitch`", "`yaw`", and "`roll`".

Example:

```java

/* This quaternion stores a 180 degree rolling rotation */
Quaternion roll180 = new Quaternion();
roll180.fromAngleAxis( FastMath.PI , new Vector3f(0,0,1) );
/* The rotation is applied: The object rolls by 180 degrees. */
thingamajig.setLocalRotation( roll180 );

```

So how to choose the right numbers for the Quaternion parameters? I'll give you my cheat-sheet:

| *Rotation around Axis?* |
| --- |
| *Use this Axis Vector!* |
| *Examples for this kind of rotation*<br /> |
| X axis |
| (1,0,0) |
| A plane pitches. Nodding your head.<br /> |
| Y axis |
| (0,1,0) |
| A plane yaws. A vehicle turns. Shaking your head.<br /> |
| Z axis |
| (0,0,1) |
| A plane rolls or banks. Cocking your head.<br /> |

:::note
These are the three most common examples – technically you can rotate around any axis expressed by a vector.
:::

| *Angle?* |
| --- |
| *Use Radians!* |
| *Examples*<br /> |
| 45 degrees |
| FastMath.PI / 4 |
| eighth of a circle<br /> |
| 90 degrees |
| FastMath.PI / 2 |
| quarter circle, 3 o'clock<br /> |
| 180 degrees |
| FastMath.PI |
| half circle, 6 o'clock<br /> |
| 270 degrees |
| FastMath.PI * 3 / 2 |
| three quarter circle, 9 o'clock<br /> |
| 360 degrees |
| FastMath.PI * 2 |
| full circle, 12  o'clock `wink`<br /> |
| `g` degrees |
| FastMath.PI * g / 180 |
| any angle `g`<br /> |

:::important
You must specify angles in [Radian](http://en.wikipedia.org/wiki/Radian)s (multiples or fractions of PI). If you use degrees, you will just get useless results.
:::

How to use these tables to speficy a certain rotation:

1. Pick the appropriate vector from the axis table.
1. Pick the appropriate radians value from the angle table.
1. Create a Quaternion to store this rotation. `… fromAngleAxis( radians , vector )`
1. Apply the Quaternion to a node to rotate it. `… setLocalRotation(…)`

Quaternion objects can be used as often as you want, so give them meaningful names, like `roll90, pitch45, yaw180`.

[More about Quaternions](http://moddb.wikia.com/wiki/OpenGL:Tutorials:Using_Quaternions_to_represent_rotation)…

## Code Sample

```java

/* We start out with a horizontal object */
Cylinder cylinder = new Cylinder("post", 10, 10, 1, 10);
cylinder.setModelBound(new BoundingBox());
/* Create a 90-degree-pitch Quaternion. */
Quaternion pitch90 = new Quaternion();
pitch90.fromAngleAxis(FastMath.PI/2, new Vector3f(1,0,0));
/* Apply the rotation to the object */
cylinder.setLocalRotation(pitch90);
/* Update the model. Now it's vertical. */
cylinder.updateModelBound();
cylinder.updateGeometry();

```

## Interpolating Rotations

You can specify two rotations, and then have jme calculate (interpolate) the steps between two rotations:

- com.jme3.math.Quaternion, slerp() – store an interpolated step between two rotations
  - [com.jme3.math.Quaternion](https://javadoc.jmonkeyengine.org/com/jme3/math/Quaternion.html)

## Adding Rotations

You can concatenate (add) rotations: This means you turn the object first around one axis, then around the other, in one step.
`Quaternion myRotation =  pitch90.mult(roll45); /* pitch and roll */`

## Troubleshooting Rotations

Does the object end up in an unexpected location, or at an unexpected angle? If you are getting weird results, check the following:

1. 3-D transformations are non-commutative! This means it often makes a huge difference whether you first move a node and then rotate it around an axis, or first rotate the node around an axis and then move it. Make sure you code does what you mean to do.
1. Are you intending to rotate around the object's origin along an axis, or around another pivot point outside the object? If you are trying to _rotate an object around a pivot point_, you have to create an (invisible) pivot node first, and attach the object to it. Then apply the rotation to the _parental pivot node_, not to the child object itself!
1. Did you enter the angle in degrees (0 - 360°) or radians (0 - 2*PI)? A 3D engine expects radians, so make sure to convert your values! Formula: `g° = FastMath.PI * g / 180`
1. Did you modify one of the pre-made constants like this?

--
```
//Never do things like this!!!
Quaternion.IDENTITY.fromAngleAxis(-FastMath.HALF_PI, Vector3f.UNIT_X);
```

This looks normal enough, after-all, this is a constant right? Sorta, what you are really doing is setting a value to the static final constant `Quaternion.IDENTITY`.

To quote one of the core team members.

.Do not modify the "`constants`". You will have a shit-ton of really messed up errors.
[quote, pspeed, Core Team Member]
You gain NOTHING by doing this, either. Just use new Quaternion().fromAngles() like a sane person.
For a deeper explanation, see this forum thread: [Quaternion bug?](https://hub.jmonkeyengine.org/t/quaternion-bug/39060)

--

## Tip: Matrix

This here is just about rotation, but there are three types of 3-D transformation: rotate, scale, and translate.

You can do all transformations in individual steps (and then update the objects geometry and bounds), or you can combine them and transform the object in one step. If you have a lot of repetitive movement going on in your game it's worth learning more about [Matrix4f](../../core/math/matrix.md) for optimization. JME can also help you interpolate the steps between two fixed transformations.

- com.jme3.math.Transform, interpolateTransforms() – interpolate a step between two transformations
  - [com.jme.math.Transform](https://javadoc.jmonkeyengine.org/com/jme3/math/Transform.html)
- In case you missed it, see also [quaternion](../../core/math/quaternion.md).
