# InstancedNode

Using InstancedNode is a way to reduce drawcalls by optimizing the amount of objects being drawn at the same time. The amount of triangles will stay the same.

Example:
```java
InstancedNode instancedNode = new InstancedNode();

Geometry geometry = new Geometry("randomGeom", mesh);
geometry.setLocalTranslation(2, 0, 0);

Geometry geometry2 = new Geometry("randomGeom2", mesh);
geometry2.setLocalTranslation(-2, 0, 0);

Material material = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
material.setBoolean("UseInstancing", true);
geometry.setMaterial(material);
geometry2.setMaterial(material);

instancedNode.attachChild(geometry);
instancedNode.attachChild(geometry2);

instancedNode.instance();
```

The important rows in the snippet that differs from a normal implementation are:
```java
material.setBoolean("UseInstancing", true);
```

and 
```java
instancedNode.instance();
```

Once instanced, you can still manipulate the spatials inside the node, as opposed to a BatchNode.

## See also
https://wiki.jmonkeyengine.org/docs/3.4/tutorials/concepts/optimization.html

https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-core/src/main/java/com/jme3/scene/BatchNode.java

https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/scene/instancing/TestInstanceNode.java
