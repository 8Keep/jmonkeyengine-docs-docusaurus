# Multithreading Bullet Physics in jme3

## Introduction

Since bullet is not (yet) multithreaded or GPU accelerated, the jME3 implementation allows to run each physics space on a separate thread that is executed in parallel to rendering.

## How is it handled in jme3 and bullet?

A SimpleApplication with a BulletAppState allows setting the threading type via

```
setThreadingType(ThreadingType type);
```

 where ThreadingType can be either SEQUENTIAL or PARALLEL. By default, it's SEQUENTIAL.

You can activate PARALLEL threading in the simpleInitApp() method:

```java
bulletAppState = new BulletAppState();
bulletAppState.setThreadingType(BulletAppState.ThreadingType.PARALLEL);
stateManager.attach(bulletAppState);
```

Now the physics update happens in parallel to render(), that is, after the user's changes in the update() call have been applied. During update() the physics update loop pauses. This way the loop logic is still maintained: the user can set and change values in physics and scenegraph objects before render() and physicsUpdate() are called in parallel. This allows you to use physics methods in update() as if it was single-threaded.
<table>
  <thead>
    <tr>
      <th>PARALLEL</th>
      <th>SEQUENTIAL<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1. update(), 2. render() and physics update().</td>
      <td>1. update(), 2. render(), 3. physics update().<br /></td>
    </tr>
    <tr>
      <td>Physics Debug View is rendered inaccurately (out of sync)</td>
      <td>Physics Debug View is rendered accurately.<br /></td>
    </tr>
  </tbody>
</table>

:::tip
You can add more physics spaces by using multiple PARALLEL bulletAppStates. You would do that if you have sets physical objects that never collide (for example, underground boulders and flying cannon balls above ground), so you put those into separate physics spaces, which improves performances (less collisions to check!).
:::
