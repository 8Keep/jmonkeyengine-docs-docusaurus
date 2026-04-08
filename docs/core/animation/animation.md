# Animation in jME3

In 3D games, you do not only load static 3D models, you also want to be able to trigger animations in the model from the Java code.

## Requirements

JME3 only loads and plays animated models, it does not create them.

What is required for an animated model? ([See also: Animation terminology](../../tutorials/concepts/terminology.md#animation)

1. For each model, you have to segment the model into a skeleton (*bone rigging*).
1. For each motion, you have to specify how the animation distorts parts of the model (*skinning*).
1. For each animation, you have to specify a series of snapshots of how the bones are positioned (*keyframes*).
1. One model can contain several animations. You give every animation a name when you save it in the mesh editor.

Unless you download free models, or buy them from a 3D artist, you must create your animated models in an *external mesh editor* (for example, Blender) yourself.

- [Supported External File Types](../../getting-started/features.md#supported-external-file-types)
- [Creating assets in Blender3D](../../tutorials/how-to/modeling/blender/blender.md)
- [Video: Creating Worlds with Instances in Blender](http://www.youtube.com/watch?v=IDHMWsu_PqA)

What is required in your JME3-based Java class?

- One Animation Control per animated model.
- As many Animation Channels per Control as you need to play your animations. In simple cases one channel is enough, sometimes you need two or more Channels per model to play gestures and motions in parallel.

## Code Samples

- [TestSpatialAnim.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/model/anim/TestSpatialAnim.java)
- [TestOgreAnim.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/model/anim/TestOgreAnim.java)
- [TestOgreComplexAnim.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/model/anim/TestOgreComplexAnim.java)
- [TestCustomAnim.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/model/anim/TestCustomAnim.java)

## Controlling Animations

### The Animation Control

Create one `com.jme3.animation.AnimControl` object in your JME3 application for each animated model that you want to control. You have to register each animated model to one of these Animation Controls. The control object gives you access to the available animation sequences in the model.

```java

  AnimControl playerControl; // you need one Control per model
  Node player = (Node) assetManager.loadModel("Models/Oto/Oto.mesh.xml"); // load a model
  playerControl = player.getControl(AnimControl.class); // get control over this model
  playerControl.addListener(this); // add listener

```

### Animation Channels

An Animation Control has several Animation Channels (`com.jme3.animation.AnimChannel`). Each channel can play one animation sequence at a time.

There often are situations where you want to run several animation sequences at the same time, e.g. "`shooting`" while walking or "`boxing`" while jumping. In this case, you create several channels, assign an animation to each, and play them in parallel.

```java

  AnimChannel channel_walk = playerControl.createChannel();
  AnimChannel channel_jump = playerControl.createChannel();
  ...

```

To reset a Control, call `control.clearChannels()`.

### Skeleton Control

The Skeleton control deforms a model according to a skeleton. Use it to attach other geometries to your model such as clothing, weapons, accessories or a particle emitter effect. You access the control the same way as you would the AnimControl.

.Control resides in the main node of your model
```java

SkeletonControl skeletonControl;

skeletonControl = player.getControl(SkeletonControl.class);

```

.Control resides somewhere other than main node
```java
player.depthFirstTraversal(new SceneGraphVisitorAdapter() {
    @Override
    public void visit(Node node) {
        if (node.getControl(SkeletonControl.class) != null) {
            skeletonControl = node.getControl(SkeletonControl.class);
        }
    }
});
```

## Animation Control Properties

The following information is available for an AnimControl.
<table>
  <thead>
    <tr>
      <th>AnimControl Property</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>createChannel()</td>
      <td>Returns a new channel, controlling all bones by default.<br /></td>
    </tr>
    <tr>
      <td>getNumChannels()</td>
      <td>The number of channels registered to this Control.<br /></td>
    </tr>
    <tr>
      <td>getChannel(0)</td>
      <td>Gets individual channels by index number. At most `getNumChannels()`.<br /></td>
    </tr>
    <tr>
      <td>clearChannels()</td>
      <td>Clear all channels in this control.<br /></td>
    </tr>
    <tr>
      <td>addListener(animEventListener) +<br />removeListener(animEventListener) +<br />clearListeners()</td>
      <td>Adds or removes listeners to receive animation related events.<br /></td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>AnimControl Property</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>setAnimations(aniHashMap)</td>
      <td>Sets the animations that this AnimControl is capable of playing. The animations must be compatible with the skeleton given in the constructor.<br /></td>
    </tr>
    <tr>
      <td>addAnim(boneAnim) +<br />removeAnim(boneAnim)</td>
      <td>Adds or removes an animation from this Control.<br /></td>
    </tr>
    <tr>
      <td>getAnimationNames()</td>
      <td>A String Collection of names of all animations that this Control can play for this model.<br /></td>
    </tr>
    <tr>
      <td>getAnim("`anim`")</td>
      <td>Retrieve an animation from the list of animations.<br /></td>
    </tr>
    <tr>
      <td>getAnimationLength("`anim`")</td>
      <td>Returns the length of the given named animation in seconds<br /></td>
    </tr>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>AnimControl Property</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>getSkeleton()</td>
      <td>The Skeleton object controlled by this Control.<br /></td>
    </tr>
  </tbody>
</table>

## Skeleton Control Properties

The following information is available for an SkeletonControl.

<table>
  <thead>
    <tr>
      <th>SkeletonControl Property</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>getSkeleton()</td>
      <td>The Skeleton object controlled by this Control.<br /></td>
    </tr>
    <tr>
      <td>getTargets()</td>
      <td>The Skin objects controlled by this Control, as Mesh array.<br /></td>
    </tr>
    <tr>
      <td>getAttachmentsNode("`bone`")</td>
      <td>Returns the attachment node of a bone. Attach models and effects to this node to make them follow this bone's motions.<br /></td>
    </tr>
  </tbody>
</table>

## Animation Channel Properties

The following properties are set per AnimChannel.
<table>
  <thead>
    <tr>
      <th>AnimChannel Property</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>setLoopMode(LoopMode.Loop);</td>
      <td>From now on, the animation on this channel will repeat from the beginning when it ends.<br /></td>
    </tr>
    <tr>
      <td>setLoopMode(LoopMode.DontLoop);</td>
      <td>From now on, the animation on this channel will play once, and the freeze at the last keyframe.<br /></td>
    </tr>
    <tr>
      <td>setLoopMode(LoopMode.Cycle);</td>
      <td>From now on, the animation on this channel will play forward, then backward, then again forward, and so on.<br /></td>
    </tr>
    <tr>
      <td>setSpeed(1f);</td>
      <td>From now on, play this animation slower (&lt;1f) or faster (&gt;1f), or with default speed (1f).<br /></td>
    </tr>
    <tr>
      <td>setTime(1.3f);</td>
      <td>Fast-forward or rewind to a certain moment in time of this animation.<br /></td>
    </tr>
  </tbody>
</table>

The following information is available for a channel.
<table>
  <thead>
    <tr>
      <th>AnimChannel Property</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>getAnimationName()</td>
      <td>The name of the animation playing on this channel. Returns `null` when no animation is playing.<br /></td>
    </tr>
    <tr>
      <td>getLoopMode()</td>
      <td>The current loop mode on this channel. The returned com.jme3.animation enum can be LoopMode.Loop, LoopMode.DontLoop, or LoopMode.Cycle.<br /></td>
    </tr>
    <tr>
      <td>getAnimMaxTime()</td>
      <td>The total length of the animation on this channel. Or `0f` if nothing is playing.<br /></td>
    </tr>
    <tr>
      <td>getTime()</td>
      <td>How long the animation on this channel has been playing. It returns `0f` if the channel has not started playing yet, or a value up to getAnimMaxTime().<br /></td>
    </tr>
    <tr>
      <td>getControl()</td>
      <td>The AnimControl that belongs to this AnimChannel.<br /></td>
    </tr>
  </tbody>
</table>

Use the following methods to add or remove individual bones to an AnimChannel. This is useful when you play two animations in parallel on two channels, and each controls a subset of the bones (e.g. one the arms, and the other the legs).
<table>
  <thead>
    <tr>
      <th>AnimChannel Methods</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>addAllBones()</td>
      <td>Add all the bones of the model's skeleton to be influenced by this animation channel. (default)<br /></td>
    </tr>
    <tr>
      <td>addBone("`bone1`") +<br />addBone(bone1)</td>
      <td>Add a single bone to be influenced by this animation channel.<br /></td>
    </tr>
    <tr>
      <td>addToRootBone("`bone1`") +<br />addToRootBone(bone1)</td>
      <td>Add a series of bones to be influenced by this animation channel: Add all bones, starting from the given bone, to the root bone.<br /></td>
    </tr>
    <tr>
      <td>addFromRootBone("`bone1`") +<br />addFromRootBone(bone1)</td>
      <td>Add a series of bones to be influenced by this animation channel: Add all bones, starting from the given root bone, going towards the children bones.<br /></td>
    </tr>
  </tbody>
</table>

## Playing Animations

Animations are played by channel.

:::note
Whether the animation channel plays continuously or only once, depends on the Loop properties you have set.
:::

<table>
  <thead>
    <tr>
      <th>Channel Method</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>channel_walk.setAnim("`Walk`",0.50f);</td>
      <td>Start the animation named "`Walk`" on channel channel_walk. +<br />The float value specifies the time how long the animation should overlap with the previous one on this channel. If set to 0f, then no blending will occur and the new animation will be applied instantly.<br /></td>
    </tr>
  </tbody>
</table>

:::tip
Use the AnimEventLister below to react at the end or start of an animation cycle.
:::

### Usage Example

In this short example, we define the space key to trigger playing the "`Walk`" animation on channel2.

```java

  public void simpleInitApp() {
    ...
    inputManager.addMapping("Walk", new KeyTrigger(KeyInput.KEY_SPACE));
    inputManager.addListener(actionListener, "Walk");
    ...
  }

  private ActionListener actionListener = new ActionListener() {
    public void onAction(String name, boolean keyPressed, float tpf) {
      if (name.equals("Walk") && !keyPressed) {
        if (!channel2.getAnimationName().equals("Walk")) {
          channel2.setLoopMode(LoopMode.Loop);
          channel2.setAnim("Walk", 0.50f);
        }
      }
    }
  };

```

## Animation Event Listener

A jME3 application that contains animations can implement the `com.jme3.animation.AnimEventListener` interface.

```java
public class HelloAnimation extends SimpleApplication
                     implements AnimEventListener { ... }
```

This optional Listener enables you to respond to animation start and end events, `onAnimChange()` and `onAnimCycleDone()`.

### Responding to Animation End

The `onAnimCycleDone()` event is invoked when an animation cycle has ended. For non-looping animations, this event is invoked when the animation is finished playing. For looping animations, this event is invoked each time the animation loop is restarted.

You have access to the following objects:

- The Control to which the listener is assigned.
- The animation channel being played.
- The name of the animation that has just finished playing.

```java

  public void onAnimCycleDone(AnimControl control, AnimChannel channel, String animName) {
    // test for a condition you are interested in, e.g. ...
    if (animName.equals("Walk")) {
      // respond to the event here, e.g. ...
      channel.setAnim("Stand", 0.50f);
    }
  }

```

### Responding to Animation Start

The `onAnimChange()` event is invoked every time before an animation is set by the user to be played on a given channel (`channel.setAnim()`).

You have access to the following objects:

- The Control to which the listener is assigned.
- The animation channel being played.
- The name of the animation that will start playing.

```java

  public void onAnimChange(AnimControl control, AnimChannel channel, String animName) {
    // test for a condition you are interested in, e.g. ...
    if (animName.equals("Walk")) {
      // respond to the event here, e.g. ...
      channel.setAnim("Reset", 0.50f);
    }
  }

```
