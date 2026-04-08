# Math Cheat Sheet

## Formulas

:::note
Typically you have to string these formulas together. Look in the table for what you want, and what you have. If the two are not the same line, than you need conversion steps inbetween. E.g. if you have an angle in degrees, but the formula expects radians: 1) convert degrees to radians, 2) use the radians formula on the result.
:::

| I have… |
| --- |
| I want… |
| Formula<br /> |
| normalized direction and length<br />n1,d1 |
| a vector that goes that far in that direction<br />new direction vector v0 |
| v0 = n1.mult(d1)<br /> |
| point and direction vector<br />p1,v1 |
| to move the point<br />new point p0 |
| p0 = p1.add(v1)<br /> |
| direction, position and distance<br />v1,p1,dist |
| Position at distance<br />p2 |
| v1.normalizeLocal()<br />scaledDir = v1.mult(dist)<br />p2 = p1.add(scaledDir)<br /> |
| two direction vectors or normals<br />v1,v2 |
| to combine both directions<br />new direction vector v0 |
| v0 = v1.add(v2)<br /> |
| two points<br />p1, p2 |
| distance between two points<br />new scalar d0 |
| d0 = p1.subtract(p2).length()<br />d0 = p1.distance(p2)<br /> |
| two points<br />p1, p2 |
| the direction from p2 to p1<br />new direction vector v0 |
| v0 = p1.subtract(p2)<br /> |
| two points, a fraction<br />p1, p2, h=0.5f |
| the point "`halfway`" (h=0.5f) between the two points<br />new interpolated point p0 |
| p0 = FastMath.interpolateLinear(h,p1,p2)<br /> |
| a direction vector, an up vector<br />v, up |
| A rotation around this up axis towards this direction<br />new Quaternion q |
| Quaternion q = new Quaternion();<br />q.lookAt(v,up)<br /> |

| I have… |
| --- |
| I want… |
| Formula<br /> |
| angle in degrees<br />a |
| to convert angle a from degrees to radians<br />new float angle phi |
| phi = a / 180 * FastMath.PI;<br />OR<br />phi=a.mult(FastMath.DEG_TO_RAD);<br /> |
| angle in radians<br />phi |
| to convert angle phi from radians to degrees<br />new float angle a |
| a = phi * 180 / FastMath.PI<br /> |
| radian angle and x axis<br />phi, x |
| to rotate around x axis<br />new quaternion q0 |
| q0.fromAngleAxis( phi, Vector3f.UNIT_X )<br /> |
| radian angle and y axis<br />phi, y |
| to rotate around y axis<br />new quaternion q0 |
| q0.fromAngleAxis( phi, Vector3f.UNIT_Y )<br /> |
| radian angle and z axis<br />phi, z |
| to rotate around z axis<br />new quaternion q0 |
| q0.fromAngleAxis( phi, Vector3f.UNIT_Z )<br /> |
| several quaternions<br />q1, q2, q3 |
| to combine rotations, in that order<br />new quaternion q0 |
| q0 = q1.mult(q2).mult(q3)<br /> |
| point and quaternion<br />p1, q1 |
| to rotate the point around origin<br />new point p0 |
| p0 = q1.mult(p1)<br /> |
| angle in radians and radius<br />phi,r |
| to arrange or move objects horizontally in a circle (with y=0)<br />x and z coordinates |
| float x = FastMath.cos(phi)*r;<br />float z = FastMath.sin(phi)*r;<br /> |

## Local vs Non-local methods?

- Non-local method creates new object as return value, v remains unchanged.
`v2 = v.mult(); v2 = v.add(); v2 = v.subtract();` etc
- Local method changes v directly!
`v.multLocal(); v.addLocal(); v.subtractLocal();` etc
