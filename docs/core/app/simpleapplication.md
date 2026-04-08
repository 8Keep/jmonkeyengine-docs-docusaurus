# SimpleApplication

The base class of the jMonkeyEngine3 is `com.jme3.app.SimpleApplication`. Your first game's Main class extends SimpleApplication directly. When you feel confident you understand the features, you will typically extend SimpleApplication to create a custom base class for the type of games that you want to develop.

SimpleApplication gives you access to standard game features, such as a scene graph (rootNode), an asset manager, a user interface (guiNode), input manager, audio manager, a physics simulation, and a fly-by camera. You call app.start() and app.stop() on your game instance to start or quit the application.

:::important
For each game, you (directly or indirectly) extend SimpleApplication exactly once as the central class. If you need access to any SimpleApplication features from another game class, make the other class extend [AbstractAppState](state/application_states.md) (don't extend SimpleApplication once more).
:::

:::note
The SimpleApplication class is undergoing changes. To understand how these changes may affect your projects and how to best prepare for them, see  [The Future of SimpleApplication](../../tutorials/beginner/hello_simpleapplication.md#the-future-of-simpleapplication) topic in the "`Hello SimpleApplication`" tutorial for beginners.
:::

The following code sample shows the typical base structure of a jME3 game:

```java

import com.jme3.app.SimpleApplication;

public class MyBaseGame extends SimpleApplication {

    public static void main(String[] args){
        MyBaseGame app = new MyBaseGame();
        app.start();
    }

    @Override
    public void simpleInitApp() {
       /* Initialize the game scene here */
    }

    @Override
    public void simpleUpdate(float tpf) {
       /* Interact with game events in the main loop */
    }

    @Override
    public void simpleRender(RenderManager rm) {
       /* (optional) Make advanced modifications to frameBuffer and scene graph. */
    }
}
```

Let's have a look at the &lt;abbr title="Application Programming Interface"&gt;API&lt;/abbr&gt; of the base class.

## Application Class

Internally, com.jme3.app.SimpleApplication extends com.jme3.app.Application. The Application class represents a generic real-time 3D rendering jME3 application (i.e., not necessarily a game). Typically, you do not extend com.jme3.app.Application directly to create a game.
<table>
  <thead>
    <tr>
      <th>Application class fields</th>
      <th>Purpose<br /></th>
      <th>viewPort +<br />getViewPort()</th>
      <th>The view object for the default camera. You can register advanced [post-processor filters](../effect/effects_overview.md) here.<br /></th>
      <th>settings +<br />setSettings()</th>
      <th>Use this AppSettings object to specify the display width and height (by default 640x480), color bit depth, z-buffer bits, anti-aliasing samples, and update frequency, video and audio renderer, asset manager. +<br />See: [AppSettings](../system/appsettings.md).<br /></th>
      <th>cam +<br />getCamera()</th>
      <th>The default [camera](../renderer/camera.md) provides perspective projection, 45° field of view, near plane = 1 wu, far plane = 1000 wu.<br /></th>
      <th>assetManager +<br />getAssetManager()</th>
      <th>An object that manages paths for loading models, textures, materials, sounds, etc. +<br />By default the [Asset Manager](../asset/asset_manager.md) paths are relative to your project's root directory.<br /></th>
      <th>audioRenderer +<br />getAudioRenderer()</th>
      <th>This object gives you access to the jME3 [audio](../audio/audio.md) system.<br /></th>
      <th>listener +<br />getListener()</th>
      <th>This object represents the user's ear for the jME3 [audio](../audio/audio.md) system.<br /></th>
      <th>inputManager +<br />getInputManager()</th>
      <th>Use the [inputManager](../input/input_handling.md) to configure your custom inputs (mouse movement, clicks, key presses, etc) and set mouse pointer visibility.<br /></th>
      <th>stateManager +<br />getStateManager()</th>
      <th>You use the Application's state manager to activate [AppStates](state/application_states.md), such as [Physics](../../physics/physics.md).<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>Application methods</th>
      <th>Purpose<br /></th>
      <th>setPauseOnLostFocus(true)</th>
      <th>Set this boolean whether the game loop should stop running when ever the window loses focus (typical for single-player game). Set this to false for real-time and multi-player games that keep running.<br /></th>
      <th>start()</th>
      <th>Call this method to start a jME3 game. By default this opens a new jME3 window, initializes the scene, and starts the event loop.<br /></th>
      <th>restart()</th>
      <th>Loads modified [AppSettings](../system/appsettings.md) into the current application context.<br /></th>
      <th>stop()</th>
      <th>Stops the running jME3 game and closes the jME3 window.<br /></th>
      <th>start(Type.Headless) etc</th>
      <th>Switch Context com.​jme3.​system.​JmeContext.Type when starting the application: +<br />Type.Display – jME application runs in a window of its own. (This is the default.) +<br />Type.Canvas – jME application is embedded in a [Swing Canvas](../../tutorials/how-to/java/swing_canvas.md). +<br />Type.Headless – jME application runs its event loop without calculating any view and without opening any window. Can be used for a [Headless Server](../../networking/headless_server.md) application. +<br />Type.OffscreenSurface – jME application view is not shown and no window opens, but everything calculated and cached as bitmap (back buffer) for use by other applications.<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>Internal class field/method</th>
      <th>Purpose<br /></th>
      <th>context +<br />getContext()</th>
      <th>The application context contains the renderer, [AppSettings](../system/appsettings.md), timer, etc. Typically, you do not directly access the context object.<br /></th>
      <th>inputEnabled</th>
      <th>this internal boolean is true if you want the system to listen for user inputs, and false if you just want to play a non-interactive scene. You change the boolean using [AppSettings](../system/appsettings.md).<br /></th>
      <th>keyInput, mouseInput +<br />joyInput, touchInput</th>
      <th>Default input contexts for keyboard, mouse, and joystick. Internally used to enable handling of joysticks or touch devices. The base classes contain key and mouse button enums.<br /></th>
      <th>renderManager +<br />getRenderManager() +<br />renderer +<br />getRenderer();</th>
      <th>Low-level and high-level rendering interface. Mostly used internally.<br /></th>
      <th>guiViewPort +<br />getGuiViewPort()</th>
      <th>The view object for the orthogonal &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; view. Only used internally for [HUD](../ui/hud.md)s.<br /></th>
      <th>timer</th>
      <th>An internal update loop timer, don't use. See `tpf` in `simpleUpdate()` below to learn about timers.<br /></th>
      <th>paused</th>
      <th>Boolean is used only internally during runtime to pause/unpause a game. (You need to implement your own isRunning boolean or so.)<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

## SimpleApplication Class

The com.jme3.app.SimpleApplication class extends the generic com.jme3.app.Application class. SimpleApplication makes it easy to start writing a game because it adds typical functionality:

- First-person (fly-by) camera
- Scene graph that manages your models in the rendered 3D scene.
- Useful default input mappings (details below.)

Additional to the functionality that Application brings, SimpleApplication offers the following methods and fields that can be used, for example, inside the `simpleInitApp()` method:
<table>
  <thead>
    <tr>
      <th>SimpleApplication Class Field</th>
      <th>Purpose<br /></th>
      <th>rootNode +<br />getRootNode()</th>
      <th>The root node of the scene graph. Attach a [Spatial](../scene/spatial.md) to the rootNode and it appears in the 3D scene.<br /></th>
      <th>guiNode +<br />getGuiNode()</th>
      <th>Attach flat &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; elements (such as [HUD](../ui/hud.md) images and text) to this orthogonal &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; node to make them appear on the screen.<br /></th>
      <th>flyCam +<br />getFlyByCamera()</th>
      <th>The default first-person fly-by camera control. This default camera control lets you navigate the 3D scene using the preconfigured WASD and arrow keys and the mouse.<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>SimpleApplication Method</th>
      <th>Purpose<br /></th>
      <th>loadStatsView();</th>
      <th>Call this method to print live statistic information to the screen, such as current frames-per-second and triangles/vertices counts. You use this info typically only during development or debugging.<br /></th>
      <th>loadFPSText();</th>
      <th>Call this method to print the current framerate (frames per second) to the screen.<br /></th>
      <th>setDisplayFps(false);</th>
      <th>A default SimpleApplication displays the framerate (frames per second) on the screen. You can choose to deactivate the FPS display using this command.<br /></th>
      <th>setDisplayStatView(false);</th>
      <th>A default SimpleApplication displays mesh statistics on the screen using the com.jme3.app.StatsView class. The information is valuable during the development and debugging phase, but for the release, you should hide the statistics HUD. +<br />**Note:* There is a dark quad behind the stats. Each letter displayed in the stats is a quad. Each quad has 4 vertexes and 2 triangles. +<br /><br />456/2 = 228 +<br />912/4 = 228<br /><br />This means if you display stats, there will be 456 triangles and 912 vertices showing in the stats view in addition to anything you add yourself.<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

<table>
  <thead>
    <tr>
      <th>SimpleApplication Interface</th>
      <th>Purpose<br /></th>
      <th>public void simpleInitApp()</th>
      <th>Override this method to initialize the game scene. Here you load and create objects, attach Spatials to the rootNode, and bring everything in its starts position. See also [Application States](state/application_states.md) for best practices.<br /></th>
      <th>public void simpleUpdate(float tpf)</th>
      <th>Override this method to hook into the [update loop](update_loop.md), all code you put here is repeated in a loop. Use this loop to poll the current game state and respond to changes, or to let the game mechanics generate encounters and initiate state changes. Use the float `tpf` as a factor to time actions relative to the _time per frame_ in seconds: `tpf` is large on slow PCs, and small on fast PCs. +<br />For more info on how to hook into the update loop, see [Application States](state/application_states.md) and [Custom Controls](../scene/control/custom_controls.md).<br /></th>
      <th>public void simpleRender(RenderManager rm)</th>
      <th>*Optional:* Advanced developers can override this method if the need to modify the frameBuffer and scene graph directly.<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

:::tip
Use `app.setShowSettings(true);` to present the user with a splashscreen and the built-in display settings dialog when starting the game; or use `app.setShowSettings(false);` to hide the built-in screen (in this case, you may want to provide a custom splashscreen and settings panel). Set this boolean before calling `app.start()` in the `main()` method of the SimpleApplication. See also [AppSettings](../system/appsettings.md).
:::

## Default Input Mappings

The following default navigational input actions are mapped by the default `flyCam` control in a SimpleApplication: You can use these mappings for debugging and testing until you implement custom [input handling](../input/input_handling.md).
<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Action<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>KEY_ESCAPE</td>
      <td>Quits the game by calling `app.stop()`<br /></td>
    </tr>
    <tr>
      <td>KEY_C</td>
      <td>Debug key: Prints camera position, rotation, and direction to the out stream.<br /></td>
    </tr>
    <tr>
      <td>KEY_M</td>
      <td>Debug key: Prints memory usage stats the out stream.<br /></td>
    </tr>
    <tr>
      <td>F5</td>
      <td>Hides or shows the statistics the bottom left.<br /></td>
    </tr>
  </tbody>
</table>

As long as the `flyCam` is enabled, the following so-called "`WASD`" inputs, including MouseLook, are available:
<table>
  <thead>
    <tr>
      <th>Camera Motion</th>
      <th>Key or Mouse Input<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Move Forward</td>
      <td>KEY_W<br /></td>
    </tr>
    <tr>
      <td>Move Left (Strafe)</td>
      <td>KEY_A<br /></td>
    </tr>
    <tr>
      <td>Move Backward</td>
      <td>KEY_S<br /></td>
    </tr>
    <tr>
      <td>Move Right (Strafe)</td>
      <td>KEY_D<br /></td>
    </tr>
    <tr>
      <td>Move Vertical Upward</td>
      <td>KEY_Q<br /></td>
    </tr>
    <tr>
      <td>Move Vertical Downward</td>
      <td>KEY_Z<br /></td>
    </tr>
    <tr>
      <td>Rotate Left</td>
      <td>KEY_LEFT, or move mouse horizontally left (-x)<br /></td>
    </tr>
    <tr>
      <td>Rotate Right</td>
      <td>KEY_RIGHT, or move mouse horizontally right (+x)<br /></td>
    </tr>
    <tr>
      <td>Rotate Up</td>
      <td>KEY_UP, or move mouse vertically forward (+y)<br /></td>
    </tr>
    <tr>
      <td>Rotate Down</td>
      <td>KEY_DOWN, or move mouse vertically backward (-y)<br /></td>
    </tr>
    <tr>
      <td>Rotate</td>
      <td>BUTTON_LEFT, or hold left mouse button and drag to rotate<br /></td>
    </tr>
    <tr>
      <td>Zoom In</td>
      <td>AXIS_WHEEL, or scroll mouse wheel backward<br /></td>
    </tr>
    <tr>
      <td>Zoom Out</td>
      <td>AXIS_WHEEL, or scroll mouse wheel forward<br /></td>
    </tr>
  </tbody>
</table>

## Defaults and Customization

By default, a SimpleApplication displays Statistics (`new StatsAppState()`), has debug output keys configured (`new DebugKeysAppState()`), and enables the flyCam (`new FlyCamAppState()`). You can customize which you want to reuse in your SimpleApplication.

The following example shows how you can remove one of the default AppStates, in this case, the FlyCamAppState:

- Either, in your application's constructor, you create the SimpleApplication with only the AppStates you want to keep:
```java
public MyApplication() {
  super( new StatsAppState(), new DebugKeysAppState() );
}
```

- Or, in the `simpleInitApp()` method, you remove the ones you do not want to keep:
```java
  public void simpleInitApp() {
    stateManager.detach( stateManager.getState(FlyCamAppState.class));
    ...
```
