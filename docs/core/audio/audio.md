# Audio in jME3

Place audio files in the `assets/Sound/` directory of your project. jME3 supports Ogg Vorbis audio compression (.ogg) and uncompressed PCM Wave (.wav) formats. You can use for example [Audacity](https://www.audacityteam.org/download/) to convert from other formats.

## Audio Terminology

- *Streaming:* There are two ways to load audio data: Short audio files are to be stored entirely in memory (prebuffered), while long audio files, such as music, are streamed from the hard drive as it is played.
- *Looping:* You can play a sound either once and then stop, or repeatedly (continuously) in a loop.
You cannot loop streamed sounds.
- *Instance:* If you play the same audio twice, the playing is queued up and jME plays one after the other. If you play instances of sounds, several instances of the same sound can play at the same time.

## Creating Audio Nodes: Streamed or Buffered

The main jME audio class to look at is `com.jme3.audio.AudioNode`. When creating a new audio node you need to declare whether how you want to load this sound:

- *Buffered:* By default, a new audio node is buffered. This means jME3 loads the whole file into memory before playing. Use this for short sounds. You create a buffered sound  by setting DataType.Buffer, or using no DataType at all:
```java
AudioNode boom = new AudioNode(assetManager, "Sound/boom.wav");
AudioNode boom = new AudioNode(assetManager, "Sound/boom.wav", DataType.Buffer);
```

- *Streamed:* If it is a long file such as music or a dialog, you stream the audio. Streaming means, you load and play in parallel until the sound is done. You cannot loop streams. You create a streamed sound by setting the boolean to true:
```java
AudioNode music = new AudioNode(assetManager, "Sound/music.wav", DataType.Stream);
```

## Getting AudioNode Properties

| AudioNode Method |
| --- |
| Usage<br /> |
| getStatus() |
| Returns either AudioSource.Status.Playing, AudioSource.Status.Stopped, or AudioSource.Status.Paused.<br /> |
| getVolume() |
| Returns the volume.<br /> |
| getPitch() |
| Returns the pitch.<br /> |

:::note
There are other obvious getters to poll the status of all corresponding setters listed here.
:::

## Setting AudioNode Properties

| AudioNode Method |
| --- |
| Usage<br /> |
| setTimeOffset(0.5f) |
| Play the sound starting at a 0.5 second offset from the beginning. Default is 0.<br /> |
| setPitch(1) |
| Makes the sound play in a higher or lower pitch. Default is 1. 2 is twice as high, .5f is half as high.<br /> |
| setVolume(1) |
| Sets the volume gain. 1 is the default volume, 2 is twice as loud, etc. 0 is silent/mute.<br /> |
| setRefDistance(50f) |
| The reference distance controls how far a sound can still be heard at 50% of its original volume (_this is assuming an exponential fall-off!_). A sound with a high RefDist can be heard loud over wide distances; a sound with a low refDist can only be heard when the listener is close by. Default is 10 world units.<br /> |
| setMaxDistance(100f) |
| The 'maximum attenuation distance' specifies how far from the source the sound stops growing more quiet (sounds in nature don't do that). Set this to a smaller value to keep the sound loud even at a distance; set this to higher value to let the sound fade out quickly. Default is 20 world units.<br /> |
| setLooping(false) |
| Configures the sound so that, if it is played, it plays once and stops. No looping is the default.<br /> |

### Looping & Ambient Sounds

| AudioNode Method |
| --- |
| Usage<br /> |
| setPositional(false)<br />setDirectional(false) |
| All 3D effects switched off. This sound is global and plays in headspace (it appears to come from everywhere). Good for environmental ambient sounds and background music.<br /> |
| setLooping(true) |
| Configures the sound to be a loop: After the sound plays, it repeats from the beginning, until you call stop() or pause(). Good for music and ambient background noises.<br />*Before 3.1-alpha2, Looping does not work on streamed sounds.*<br /> |

### Positional 3D Sounds

| AudioNode Method |
| --- |
| Usage<br /> |
| setPositional(true)<br />setLocalTranslation(…) |
| Activates 3D audio: The sound appears to come from a certain position, where it is loudest. Position the AudioNode in the 3D scene, or move it with mobile players or NPCs.<br /> |
| setReverbEnabled(true) |
| Reverb is a 3D echo effect that only makes sense with positional AudioNodes. Use Audio Environments to make scenes sound as if they were "`outdoors`", or "`indoors`" in a large or small room, etc. The reverb effect is defined by the `com.jme3.audio.Environment` that the `audioRenderer` is in. See "`Setting Audio Environment Properties`" below.<br /> |

:::important
Positional 3D sounds require an `AudioListener` object in the scene (representing the player's ears).
:::

### Directional 3D Sounds

| AudioNode Method |
| --- |
| Usage<br /> |
| setDirectional(true)<br />setDirection(…) |
| Activates 3D audio: This sound can only be heard from a certain direction. Specify the direction and angle in the 3D scene if you have setDirectional() true. Use this to restrict noises that should not be heard, for example, through a wall.<br /> |
| setInnerAngle()<br />setOuterAngle() |
| Set the angle in degrees for the directional audio. The angle is relative to the direction. Note: By default, both angles are 360° and the sound can be heard from all directions!<br /> |

:::important
Directional 3D sounds require an AudioListener object in the scene (representing the player's ears).
:::

## Play, Pause, Stop

You play, pause, and stop a node called myAudioNode by using the respective of the following three methods:

```java
myAudioNode.play();
```

```java
myAudioNode.pause();
```

```java
myAudioNode.stop();
```

:::note
Whether an Audio Node plays continuously or only once, depends on the Loop properties you have set above!
:::

You can also start playing instances of an AudioNode. Use the `playInstance()` method if you need to play the same AudioNode multiple times, possibly simultaneously. Note that changes to the parameters of the original AudioNode do not affect the instances that are already playing!

```java
myAudioNode.playInstance();
```

## The Audio Listener

The default AudioListener object `listener` in `SimpleApplication` is the user's ear in the scene. If you use 3D audio (positional or directional sounds), you must move the AudioListener with the player: For example, for a first-person player, you move the listener with the camera. For a third-person player, you move the listener with the player avatar Geometry.

```java

  @Override
  public void simpleUpdate(float tpf) {
    // first-person: keep the audio listener moving with the camera
    listener.setLocation(cam.getLocation());
    listener.setRotation(cam.getRotation());
  }

```

## Setting Audio Environment Properties

Optionally, You can choose from the following environmental presets from `com.jme3.audio.Environment`. This presets influence subtle echo effects (reverb) that evoke associations of different environments in your users. That is, it makes you scene sound "`indoors`" or "`outdoors`" etc. You use Audio Environments together with `setReverbEnabled(true)` on positional AudioNodes (see above).

| Environment |
| --- |
| density |
| diffusion |
| gain |
| gainHf |
| decayTime |
| decayHf |
| reflGain |
| reflDelay |
| lateGain |
| lateDelay<br /> |
| Garage |
| 1.00f |
| 1.0f |
| 1.0f |
| 1.00f |
| 0.90f |
| 0.5f |
| 0.751f |
| 0.0039f |
| 0.661f |
| 0.0137f<br /> |
| Dungeon |
| 0.75f |
| 1.0f |
| 1.0f |
| 0.75f |
| 1.60f |
| 1.0f |
| 0.950f |
| 0.0026f |
| 0.930f |
| 0.0103f<br /> |
| Cavern |
| 0.50f |
| 1.0f |
| 1.0f |
| 0.50f |
| 2.25f |
| 1.0f |
| 0.908f |
| 0.0103f |
| 0.930f |
| 0.0410f<br /> |
| AcousticLab |
| 0.50f |
| 1.0f |
| 1.0f |
| 1.00f |
| 0.28f |
| 1.0f |
| 0.870f |
| 0.0020f |
| 0.810f |
| 0.0080f<br /> |
| Closet |
| 1.00f |
| 1.0f |
| 1.0f |
| 1.00f |
| 0.15f |
| 1.0f |
| 0.600f |
| 0.0025f |
| 0.500f |
| 0.0006f<br /> |

1. Activate a Environment preset
  - Either use a default, e.g. make your scene sounds like a dungeon environment:

```java
audioRenderer.setEnvironment(new Environment(Environment.Dungeon));
```

  - Or activate [custom environment settings](audio_environment_presets.md) in the Environment constructor:

```java
audioRenderer.setEnvironment(
        new Environment( density, diffusion, gain, gainHf, decayTime, decayHf,
                reflGain, reflDelay, lateGain, lateDelay ) );
```

1. Activate 3D audio for certain sounds:

```java
footstepsAudio.setPositional(true);
footstepsAudio.setReverbEnabled(true);
```

:::tip
A sound engineer can create a custom `com.​jme3.​audio.Environment` object and specify custom environment values such as density, diffusion, gain, decay, delay… You can find many [examples of custom audio environment presets](audio_environment_presets.md) here.
:::

Advanced users find more info about OpenAL and its features here: [OpenAL 1.1 Specification](http://web.archive.org/web/20130327063429/http://connect.creativelabs.com/openal/Documentation/OpenAL_Programmers_Guide.pdf).

:::important
It depends on the hardware whether audio effects are supported (if not, you get the message `OpenAL EFX not available! Audio effects won't work.`)
:::
