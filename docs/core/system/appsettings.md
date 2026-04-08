# jME3 Application Display Settings

Every class that extends jme3.app.SimpleApplication has properties that can be configured by customizing a `com.jme3.system.AppSettings` object.

:::important
Configure application settings in `main()`, before you call `app.start()` on the application object. If you change display settings during runtime, for example in `simpleInitApp()`, you must call `app.restart()` to make them take effect.
:::

*Note:* Other runtime settings are covered in [SimpleApplication](../app/simpleapplication.md).

## Code Samples

Specify settings for a game (here called `MyGame`, or whatever you called your SimpleApplication instance) in the `main()` method before the game starts:

```java
public static void main(String[] args) {
  AppSettings settings = new AppSettings(true);
  settings.setResolution(640,480);
  // ... other properties, see below
  MyGame app = new MyGame();
  app.setSettings(settings);
  app.start();
}
```

Set the boolean in the AppSettings constructor to true if you want to keep the default settings for values that you do not specify. Set this parameter to false if you want the application to load user settings from previous launches. In either case you can still customize individual settings.

:::warning
The settings are saved based on the title of your game (default = "`jMonkey Engine 3.x-stable`"). This means that if you have not changed the default title, then remove a setting method call, your settings changes will remain in effect for all projects using the default title. To prevent this, set the title for your game or remember to change the settings back to their [default](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-core/src/main/java/com/jme3/system/AppSettings.java#L213) and run the project again.
:::

This example toggles the settings to fullscreen while the game is already running. Then it restarts the game context (not the whole game) which applies the changed settings.

:::warning
The code below uses the Java AWT, which in incompatible with LWJGL3 on the Mac. Attempting to use both may cause an application UI to become unresponsive. Exact results may vary depending on what AWT features are used, when they are used, and/or which version of the MacOS, Java, and jME is used.
:::

```java
public void toggleToFullscreen() {
  GraphicsDevice device = GraphicsEnvironment.getLocalGraphicsEnvironment().getDefaultScreenDevice();
  DisplayMode[] modes = device.getDisplayModes();
  int i=0; // note: there are usually several, let's pick the first
  settings.setResolution(modes[i].getWidth(),modes[i].getHeight());
  settings.setFrequency(modes[i].getRefreshRate());
  settings.setBitsPerPixel(modes[i].getBitDepth());
  settings.setFullscreen(device.isFullScreenSupported());
  app.setSettings(settings);
  app.restart(); // restart the context to apply changes
}
```

To view your current settings, use the System class.

```
AppSettings settings = new AppSettings(true);
System.out.println(settings);
```

## Properties
[cols="30,55,15", options="header", caption="Table A: "]
.Video
<table>
  <tbody>
    <tr>
      <td>Settings Property</td>
      <td>Description</td>
      <td>Default<br /></td>
      <td>setRenderer(AppSettings.LWJGL_OPENGL1)<br />setRenderer(AppSettings.LWJGL_OPENGL2)<br />setRenderer(AppSettings.LWJGL_OPENGL3)</td>
      <td>Switch Video Renderer to OpenGL 1.1, OpenGL 2, or OpenGL 3.3. If your graphic card does not support all OpenGL2 features (<code>UnsupportedOperationException: GLSL and OpenGL2 is required for the LWJGL renderer</code>), then you can force your SimpleApplication to use OpenGL1 compatibility. (Then you still can't use special OpenGL2 features, but at least the error goes away and you can continue with the rest.)</td>
      <td>OpenGL 2<br /></td>
      <td>setBitsPerPixel(32)</td>
      <td>Set the color depth.<br />1 bpp = black and white, 2 bpp = gray,<br />4 bpp = 16 colors, 8 bpp = 256 colors, 24 or 32 bpp = "<code>truecolor</code>".</td>
      <td>24<br /></td>
      <td>setFrameRate(60)</td>
      <td>How often per second the engine should try to refresh the frame. For the release, usually 60 fps. Can be lower (30) if you need to free up the CPU for other applications. No use setting it to a higher value than the screen frequency! If the framerate goes below 30 fps, viewers start to notice choppiness or flickering.</td>
      <td>-1 (unlimited)<br /></td>
      <td>setFullscreen(true)</td>
      <td>Set this to true to make the game window fill the whole screen; you need to provide a key that calls app.stop() to exit the fullscreen view gracefully (default: escape).<br />Set this to false to play the game in a normal window of its own.</td>
      <td>False (windowed)<br /></td>
      <td>setHeight(480), setWidth(640)<br />setResolution(640,480)</td>
      <td>Two equivalent ways of setting the display resolution.</td>
      <td>640x480 pixels<br /></td>
      <td>setSamples(4)</td>
      <td>Set multisampling to 0 to switch antialiasing off (harder edges, faster.)<br />Set multisampling to 2 or 4 to activate antialiasing (softer edges, may be slower.)<br />Depending on your graphic card, you may be able to set multisampling to higher values such as 8, 16, or 32 samples.</td>
      <td>0<br /></td>
      <td>setVSync(true)<br />setFrequency(60)</td>
      <td>Set vertical syncing to true to time the frame buffer to coincide with the refresh frequency of the screen. VSync prevents ugly page tearing artefacts, but is a bit slower; recommened for release build.<br />Set VSync to false to deactivate vertical syncing (faster, but possible page tearing artifacts); can remain deactivated during development or for slower PCs.</td>
      <td>false<br />60 fps<br /></td>
      <td>setStencilBits(8)</td>
      <td>Set the number of stencil bits.<br />This value is only relevant when the stencil buffer is being used. Specify 8 to indicate an 8-bit stencil buffer, specify 0 to disable the stencil buffer.</td>
      <td>0 (disabled)<br /></td>
      <td>setDepthBits(16)</td>
      <td>Sets the number of depth bits to use.<br />The number of depth bits specifies the precision of the depth buffer. To increase precision, specify 32 bits. To decrease precision, specify 16 bits. On some platforms 24 bits might not be supported, in that case, specify 16 bits.<br />See <a href="https://en.wikipedia.org/wiki/Z-buffering">Z-buffering</a> for a more in depth explanation.</td>
      <td>24<br /></td>
      <td>setGammaCorrection(true)</td>
      <td>Enables Gamma Correction.<br />If you’re starting a new project, use it, period. And don’t allow the player to turn it off.<br />See <a href="jme3_srgbpipeline.md">Gamma Correction or sRGB pipeline</a></td>
      <td>false<br /></td>
    </tr>
  </tbody>
</table>

[cols="30,55,15", options="header", caption="Table B: "]
.Input
<table>
  <tbody>
    <tr>
      <td>Settings Property</td>
      <td>Description</td>
      <td>Default<br /></td>
      <td>setUseInput(false)</td>
      <td>Respond to user input by mouse and keyboard. Can be deactivated for use cases where you only display a 3D scene on the canvas without any interaction.</td>
      <td>true<br /></td>
      <td>setUseJoysticks(true)</td>
      <td>Activate optional joystick support</td>
      <td>false<br /></td>
      <td>setEmulateMouse(true)</td>
      <td>Enable or disable mouse emulation for touchscreen-based devices. Setting this to true converts taps on the touchscreen to clicks, and finger swiping gestures over the touchscreen into mouse axis events.</td>
      <td>false<br /></td>
      <td>setEmulateMouseFlipAxis(true,true)</td>
      <td>Flips the X or Y (or both) axes for the emulated mouse. Set the first parameter to true to flip the x axis, and the second to flip the y axis.</td>
      <td>false,false<br /></td>
    </tr>
  </tbody>
</table>

[cols="30,55,15", options="header", caption="Table C: "]
.Audio
<table>
  <tbody>
    <tr>
      <td>Settings Property</td>
      <td>Description</td>
      <td>Default<br /></td>
      <td>setAudioRenderer(AppSettings.LWJGL_OPENAL)</td>
      <td>Switch Audio Renderer. Currently there is only one option.</td>
      <td>OpenAL<br /></td>
      <td>setStereo3D(true)</td>
      <td>Enable 3D stereo. This feature requires hardware support from the GPU driver. See <a href="http://en.wikipedia.org/wiki/Quad_buffering">Quad Buffering</a>. Currently, your everyday user's hardware does not support this, so you can ignore it for now.</td>
      <td>false<br /></td>
    </tr>
  </tbody>
</table>

[cols="30,55,15", options="header", caption="Table D: "]
.Branding
<table>
  <tbody>
    <tr>
      <td>Settings Property</td>
      <td>Description</td>
      <td>Default<br /></td>
      <td>setTitle("My Game")</td>
      <td>This string will be visible in the titlebar, unless the window is fullscreen.</td>
      <td>"<code>jMonkey Engine 3.x-stable</code>"<br /></td>
      <td>setIcons(new BufferedImage[]&#123;<br />ImageIO.read(new File(" ")), …&#125;);</td>
      <td>This specifies the little application icon in the titlebar of the application (unused in MacOS?). You should specify the icon in various sizes (256,128,32,16) to look good on various operating systems. Note: This is not the application icon on the desktop.</td>
      <td>null<br /></td>
      <td>setSettingsDialogImage("Interface/mysplashscreen.png")</td>
      <td>A custom splashscreen image in the <code>assets/Interface</code> directory which is displayed when the settings dialog is shown.</td>
      <td>"/com/jme3/app/Monkey.png"<br /></td>
    </tr>
  </tbody>
</table>

:::tip
You can use `app.setShowSettings(true);` and `setSettingsDialogImage("Interface/mysplashscreen.png")` to present the user with jme3's default display settings dialog when starting the game. Use `app.setShowSettings(false);` to hide the default settings screen. Set this boolean before calling `app.start()` on the SimpleApplication.
:::

## Toggling and Activating Settings
| SimpleApplication method | Description<br /> |
| --- | --- |
| app.setShowSettings(boolean) | Activate or deactivate the default settings screen before start()ing the game. If you let users use this screen, you do not need to modify the settings object. Note: Most developers implement their own custom settings screen, but the default one is useful during the alpha stages.<br /> |
| app.setSettings(settings) | After you have modified the properties on the settings object, you apply it to your application. Note that the settings are not automatically reloaded while the game is running.<br /> |
| app.start() | Every game calls start() in the beginning to initialize the game and apply the settings. Modify and set your settings before calling start().<br /> |
| app.restart() | Restart()ing a running game restarts the game context and applies the updated settings object. (This does not restart or reinitialize the whole game.)<br /> |

## Saving and Loading Settings

:::caution
Due to a current bug and inconsistent behavior observed related to the preferences save location, to ensure correct behavior, save() and load() should only use forward slashes `/` and must be all lowercase.

More information can be found [here](https://github.com/jMonkeyEngine/jmonkeyengine/issues/1161).
:::

An AppSettings object also supports the following methods to save your settings under a unique key (in this example "`com/foo/mycoolgame3`"):

- Use `settings.save("com/foo/mycoolgame3")` to save your settings via standard java.io serialization.
- Use `settings.load("com/foo/mycoolgame3")` to load your settings.
- Use `settings2.copyFrom(settings)` to copy a settings object.

Usage:

Provide the unique name of your jME3 application as the String argument. For example `com/foo/mycoolgame3`.

```java

    try { settings.save("com/foo/mycoolgame3"); }
    catch (BackingStoreException ex) { /** could not save settings */ }

```

- On Windows, the preferences are saved under the following registry key:
`HKEY_CURRENT_USER\Software\JavaSoft\Prefs\com\foo\mycoolgame3`
- On Linux, the preferences are saved in an XML file under:
`$HOME/.java/.userPrefs/com/foo/mycoolgame3`
- On Mac &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt; X, the preferences are saved as XML file under:
`$HOME/Library/Preferences/com.foo.mycoolgame3.plist`
