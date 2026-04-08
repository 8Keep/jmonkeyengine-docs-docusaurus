# JME3 Cinematics

JME3 cinematics (com.jme.cinematic) allow you to remote control nodes and cameras in a 3D game: You can script and and play cinematic scenes. You can use cinematics to create [cutscenes](http://en.wikipedia.org/wiki/Cutscene) and movies/trailers for your game. Another good use case is efficient "`destruction`" physics: Playing back prerecorded flying pieces of debris for demolitions is much faster than calculating them with live physics.

Internally, Cinematics are implemented as [AppStates](../app/state/application_states.md).

Short overview of the cinematic process:

1. Plan the script of your movie.
Write down a timeline (e.g. on paper) of which character should be at which spot at which time.
1. Attach the scene objects that you want to remote-control to one Node.
This Node can be the rootNode, or a Node that is attached to the rootNode.
1. Create a Cinematic object for this movie scene. The Cinematic will contain and manage the movie script.
1. For each line in your script (for each keyframe in your timeline), add a CinematicEvent to the Cinematic.

## Sample Code

- [TestCinematic.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/animation/TestCinematic.java)

## How to Use a Cinematic

A Cinematic is like a movie script for a node.

```java
Cinematic cinematic = new Cinematic(sceneNode, duration);
cinematic.addCinematicEvent(starttime1, event1);
cinematic.addCinematicEvent(starttime2, event2);
cinematic.addCinematicEvent(starttime2, event3);
...
stateManager.attach(cinematic);

```

1. Create one Cinematic per scripted scene.
  - `sceneNode` is the node containing the scene (can be the rootNode).
  - `duration` is the duration of the whole scene in seconds.
  - Each Cinematic is a set of CinematicEvents, that are triggered at a given moment on the timeline.

1. Create one CinematicEvent for each line of your movie script.
  - `event` is one motion of a moving object. You can add several events. More details below.
  - `starttime` is the time when this particular cinematic event starts on the timeline. Specify the start time in seconds since the beginning of the cinematic.

1. Attach the Cinematic to the SimpleApplication's stateManager.
1. Play, stop and pause the Cinematic from your code.

| Method |
| --- |
| Usage<br /> |
| cinematic.play() |
| Starts playing the cinematic from the start, or from where it was paused.<br /> |
| cinematic.stop() |
| Stops playing the cinematic and rewinds it.<br /> |
| cinematic.pause() |
| Pauses the cinematic.<br /> |

## Events(CinematicEvents)

Just like a movie script consists of lines with instructions to the actors, each Cinematic consists of a series of events.

Here is the list of available CinematicEvents that you use as events. Each track remote-controls scene objects in a different way:
| Events(CinematicEvents) | Description<br /> |
| --- | --- |
| MotionEvent | Use a MotionEvent to move a Spatial non-linearly over time. A MotionEvent is based on a list of waypoints in a MotionPath. The curve goes through each waypoint, and you can adjust the tension of the curve to modify the roundedness of the path. This is the motion interpolation you are going to use in most cases.<br /> |
| SoundEvent | Use a SoundEvent to play a [sound](../audio/audio.md) at a given time for the given duration.<br /> |
| GuiEvent | Displays a [Nifty GUI](../gui/nifty_gui.md) at a given time for the given duration. Use it to display subtitles or HUD elements. Bind the Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; XML to the cinematic using `cinematic.bindUi("path/to/nifty/file.xml");`<br /> |
| AnimationEvent | Use this to start playing a model [animation](../animation/animation.md) at a given time (a character walking animation for example)<br /> |

You can add custom events by extending AbstractCinematicEvent.

### MotionEvent

A MotionEvent moves a Spatial along a complex path.

```java
MotionEvent events= new MotionEvent (thingNode, path);
```

Details of the constructor:

- `thingNode` is the Spatial to be moved.
- `path` is a complex [MotionPath](motionpath.md).

To create a MotionEvent, do the following:

1. Create a MotionPath.
1. Create a MotionEvent based on the MotionPath.
1. Configure your MotionEvent (see below).
1. Add the MotionEvent to a Cinematic.

| MotionEvent configuration method |
| --- |
| Usage<br /> |
| event.setLoopMode(LoopMode.Loop) |
| Sets whether the animation along this path should loop (LoopMode.Loop) or play only once (LoopMode.DontLoop).<br /> |
| event.setDirectionType(MotionEvent.Direction.None) |
| Sets the direction behavior type of the controlled node. Direction.None deactivates this feature. You can choose from the following options: LookAt, Path, PathAndRotation, Rotation.<br /> |
| event.setDirectionType(MotionEvent.Direction.LookAt) |
| The spatial turns (rotates) to keep facing a certain point while moving. Specify the point with the `setLookAt()` method.<br /> |
| event.setDirectionType(MotionEvent.Direction.Path) |
| The spatial always faces in the direction of the path while moving.<br /> |
| event.setDirectionType(MotionEvent.Direction.PathAndRotation) |
| The spatial faces the direction of the path, plus an added rotation. Use together with the `setRotation()` method.<br /> |
| event.setDirectionType(MotionEvent.Direction.Rotation) |
| The spatial spins (rotates) while moving. You describe the spin by a custom quaternion. Use together with the `setRotation()` method.<br /> |
| event.setLookAt(teapot.getWorldTranslation(), Vector3f.UNIT_Y) |
| The spatial always faces towards this location. Use together with `MotionEvent.Direction.LookAt`.<br /> |
| event.setRotation(quaternion) |
| Sets the rotation. Use together with `MotionEvent.Direction.Rotation` or `MotionEvent.Direction.PathAndRotation`.<br /> |

:::tip
Most likely you remote-control more than one object in your scene. Give the events and paths useful names such as `dragonEvent`, `dragonPath`, `heroEvent`, `heroPath`, etc.
:::

### SoundEvent

A SoundEventplays a sound as part of the cinematic.

```java
SoundEvent( audioPath, isStream, duration, loopMode )
```

Details of the constructor:

- `audioPath` is the path to an audio file as String, e.g. "`Sounds/mySound.wav`".
- `isStream` toggles between streaming and buffering. Set to true to stream long audio file, set to false to play short buffered sounds.
- `duration` is the time that it should take to play.
- `loopMode` can be LoopMode.Loop, LoopMode.DontLoop, LoopMode.Cycle.

### GuiEvent

A GuiEventshows or hide a NiftyGUI as part of a cinematic.

```java
GuiEvent( screen, duration, loopMode )
```

You must use this together with bindUI() to specify the Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; XML file that you want to load:

```java
cinematic.bindUi("Interface/subtitle.xml");
```

Details of the constructor:

- `screen` is the name of the Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; screen to load, as String.
- `duration` is the time that it should take to play.
- `loopMode` can be LoopMode.Loop, LoopMode.DontLoop, LoopMode.Cycle.

### AnimationEvent

An AnimationEvent triggers an animation as part of a cinematic.

```java
AnimationEvent( thingNode, animationName, duration, loopMode )
```

Details of the constructor:

- `thingNode` is the Spatial whose animation you want to play.
- `animationName` the name of the animation stored in the animated model that you want to trigger, as a String.
- `duration` is the time that it should take to play.
- `loopMode` can be LoopMode.Loop, LoopMode.DontLoop, LoopMode.Cycle.

### Camera Management

There is a built in system for camera switching in Cinematics. It based on CameraNode, and the cinematic just enable the given CameraNode control at a given time.

First you have to bind a camera to the cinematic with a unique name. You'll be provided with a CameraNode

```java

 CameraNode camNode = cinematic.bindCamera("topView", cam);

```

then you can do whatever you want with this camera node : place it so that you have a the camera angle you'd like, attach it to a motion event to have some camera scrolling, attach control of your own that give it whatever behavior you'd like.
In the above example, I want it to be a top view of the scene looking at the world origin.

```java

 //set its position
 camNode.setLocalTranslation(new Vector3f(0, 50, 0));
 // set it to look at the world origin
 camNode.lookAt(Vector3F.ZERO, Vector3f.UNIT_Y);

```

Then i just have to schedule its activation in the cinematic. I want it to get activated 3 seconds after the start of the cinematic so I just have to do

```java

 cinematic.activateCamera(3,”topView”);

```

### Customizations

You can extend individual CinematicEvents. The [SubtitleTrack.java example](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/animation/SubtitleTrack.java) shows how to extend a GuiTrack to script subtitles. See how the subtitles are used in the [TestCinematic.java example](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/animation/TestCinematic.java).

You can also create new CinematicEvent by extending [AbstractCinematicEvent](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-core/src/main/java/com/jme3/cinematic/events/AbstractCinematicEvent.java). An AbstractCinematicEvent implements the CinematicEvent interface and provides duration, time, speed, etc… management. Look at the [TestCinematic.java example](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/animation/TestCinematic.java) is to use this for a custom fadeIn/fadeOut effect in combination with a com.jme3.post.filters.FadeFilter.

## Interacting with Cinematics

### CinematicEventListener

```java
CinematicEventListener cel = new CinematicEventListener() {
  public void onPlay(CinematicEvent cinematic) {
    chaseCam.setEnabled(false);
    System.out.println("play");
  }

  public void onPause(CinematicEvent cinematic) {
    chaseCam.setEnabled(true);
    System.out.println("pause");
  }

  public void onStop(CinematicEvent cinematic) {
    chaseCam.setEnabled(true);
    System.out.println("stop");
  }
}
cinematic.addListener(cel);
```

### Physics Interaction

Upcoming.
