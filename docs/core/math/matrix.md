# Matrix

## Matrix

See [Javadoc of Matrix3f](https://javadoc.jmonkeyengine.org/com/jme3/math/Matrix3f.html) and [Javadoc of Matrix4f](https://javadoc.jmonkeyengine.org/com/jme3/math/Matrix4f.html)

### Definition

A Matrix is typically used as a _linear transformation_ to map vectors to vectors. That is: Y = MX where X is a Vector and M is a Matrix applying any or all transformations (scale, rotate, translate).

There are a few special matrices:

_zero matrix_ is the Matrix with all zero entries.
| 0 |
| --- |
| 0 |
| 0<br /> |
| 0 |
| 0 |
| 0<br /> |
| 0 |
| 0 |
| 0<br /> |

The _Identity Matrix_ is the matrix with 1 on the diagonal entries and 0 for all other entries.
| 1 |
| --- |
| 0 |
| 0<br /> |
| 0 |
| 1 |
| 0<br /> |
| 0 |
| 0 |
| 1<br /> |

A Matrix is _invertible_ if there is a matrix _M^-1^_ where _MM^-1^ = M^-1^ = I_.

The _transpose_ of a matrix _M = [m~ij~]_ is _M^T^ = [m~ji~]_. This causes the rows of _M_ to become the columns of _M^T^_.
| 1 |
| --- |
| 1 |
| 1 |
|  |
| 1 |
| 2 |
| 3<br /> |
| 2 |
| 2 |
| 2 |
| ⇒ |
| 1 |
| 2 |
| 3<br /> |
| 3 |
| 3 |
| 3 |
|  |
| 1 |
| 2 |
| 3<br /> |

A Matrix is symmetric if _M_ = _M^T^_.
| X |
| --- |
| A |
| B<br /> |
| A |
| X |
| C<br /> |
| B |
| C |
| X<br /> |

Where X, A, B, and C equal numbers

jME includes two types of Matrix classes: Matrix3f and Matrix4f. Matrix3f is a 3x3 matrix and is the most commonly used (able to handle scaling and rotating), while Matrix4f is a 4x4 matrix that can also handle translation.

### Transformations

Multiplying a [Vector](../../tutorials/concepts/terminology.md#vectors) with a Matrix allows the Vector to be transformed. Either rotating, scaling or translating that Vector.

#### Scaling

If a _diagonal Matrix_, defined by D = [d~ij~] and d~ij~ = 0 for i != j, has all positive entries it is a _scaling matrix_. If d~i~ is greater than 1 then the resulting Vector will grow, while if d~i~ is less than 1 it will shrink.

#### Rotation

A _rotation matrix_ requires that the transpose and inverse are the same matrix (R^-1^ = R^T^). The _rotation matrix_ R can then be calculated as: R = I + (sin(angle)) S + (1 - cos(angle)S^2^ where S is:
| 0 |
| --- |
| u~2~ |
| -u~1~<br /> |
| -u~2~ |
| 0 |
| u~0~<br /> |
| u~1~ |
| -u~0~ |
| 0<br /> |

#### Translation

Translation requires a 4x4 matrix, where the Vector (x,y,z) is mapped to (x,y,z,1) for multiplication. The _Translation Matrix_ is then defined as:
| M |
| --- |
| T<br /> |
| S^T^ |
| 1<br /> |

where M is the 3x3 matrix (containing any rotation/scale information), T is the translation Vector and S^T^ is the transpose Vector of T. 1 is just a constant.

### jME Class

Both Matrix3f and Matrix4f store their values as floats and are publicly available as (m00, m01, m02, …, mNN) where N is either 2 or 3.

Most methods are straight forward, and I will leave documentation to the Javadoc.
