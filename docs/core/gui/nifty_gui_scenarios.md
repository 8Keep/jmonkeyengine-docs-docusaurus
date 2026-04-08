# Nifty GUI 1.4.2 - Usecase Scenarios

This document contains typical NiftyGUI usecase scenarios, such as adding effects, game states, and creating typical game screens.

Requirements: These tips assume that you have read and understood the [Creating JME3 User Interfaces with Nifty GUI](nifty_gui.md) tutorial, and have already laid out a basic &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; that interacts with your JME3 application. Here you learn how you integrate the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; better, and add effects and advanced controls.

## Switch Game States

In a JME game, you typically have three game states:

1. Stopped: The game is stopped, a StartScreen is displayed.
1. Running: The game is running, the in-game HudScreen is displayed.
1. Paused: The game is paused, a PausedScreen is displayed.

(Aside: Additionally, the Stopped state often contains a LoadScreen, LogonScreen, OptionsScreen, CharacterCreationScreen, HighScoreScreen, CreditsScreen, etc. Some games let you access the OptionsScreen in the Paused state as well. The Running state can also contain an InventoryScreen, ItemShopScreen, StatsScreen, SkillScreen, etc.)

In JME, game states are implemented as custom [AppStates](../app/state/application_states.md) objects. Write each AppState so it brings its own input mappings, rootNode content, update loop behaviour, etc with it.

1. Stopped: StartScreen AppState + GuiInputs AppState
1. Paused: PausedScreen AppState + GuiInputs AppState
1. Running: HudScreen AppState + InGameInputs AppState + BulletAppState (jme physics), …

When the player switches between game states, you detach one set of AppStates, and attach another. For example, when the player pauses the running game, you use a boolean switch to pause the game loop and deactivate the game inputs (shooting, navigation). The screen is overlayed with a PausedScreen, which contains a visible mouse pointer and a Continue button. When the player clicks Continue, the mouse pointer is deactivated, the in-game input and navigational mappings are activated, and the game loop continues.

## Get Access to Application and Update Loop

Since you are writing a jME3 application, you can additionally make any ScreenController class extend the [BaseAppState](../app/state/application_states.md#baseappstate) class.
This gives the ScreenController access to the application object and to the update loop!

```java

public class StartScreenState extends BaseAppState implements ScreenController {

    private Node localRootNode = new Node("Start Screen RootNode");
    private Node localGuiNode = new Node("Start Screen GuiNode");
    private final ColorRGBA backgroundColor = ColorRGBA.Gray;

    @Override
    protected void initialize(Application app) {
        //It is technically safe to do all initialization and cleanup in the
        //onEnable()/onDisable() methods. Choosing to use initialize() and
        //cleanup() for this is a matter of performance specifics for the
        //implementor.
        //TODO: initialize your AppState, e.g. attach spatials to rootNode
        ((SimpleApplication) app).getRootNode().attachChild(localRootNode);
        ((SimpleApplication) app).getGuiNode().attachChild(localGuiNode);
        ((SimpleApplication) app).getViewPort().setBackgroundColor(backgroundColor);

        /** init the screen */
    }

    @Override
    protected void cleanup(Application app) {
        //TODO: clean up what you initialized in the initialize method,
        //e.g. remove all spatials from rootNode
        ((SimpleApplication) app).getRootNode().detachChild(localRootNode);
        ((SimpleApplication) app).getGuiNode().detachChild(localGuiNode);
    }

    //onEnable()/onDisable() can be used for managing things that should
    //only exist while the state is enabled. Prime examples would be scene
    //graph attachment or input listener attachment.
    @Override
    protected void onEnable() {
        //Called when the state is fully enabled, ie: is attached and
        //isEnabled() is true or when the setEnabled() status changes after the
        //state is attached.
    }

    @Override
    protected void onDisable() {
        //Called when the state was previously enabled but is now disabled
        //either because setEnabled(false) was called or the state is being
        //cleaned up.
    }

    @Override
    public void update(float tpf) {
        //TODO: implement behavior during runtime
    }

    @Override
    public void bind(Nifty nifty, Screen screen) {
    }

    @Override
    public void onStartScreen() {
    }

    @Override
    public void onEndScreen() {
    }

}

```

:::important
It is not sufficient to just inherit from BaseAppState. You need to instantiate your controller class, register it with app's stateManager and then pass it to nifty. Remember, to connect a screen with a ScreenController you still need to specify the fully qualified class name of
your ScreenController in the controller attribute of the &lt;screen&gt; tag in the xml file. See code sample below.
:::

.XML example
```java

public class TestNiftyGui extends SimpleApplication {
  public void simpleInitApp() {
     StartScreenState startScreenState = new StartScreenState();
     stateManager.attach(startScreenState);
     // [...] boilerplate init nifty omitted
     nifty.fromXml("Interface/myGui.xml", "start", startScreenState); //one of the XML screen elements needs to reference StartScreenState controller class
  }
}

```

## Know Your Variables
<table>
  <thead>
    <tr>
      <th>Variable</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>$&#123;CALL.myMethod()&#125;</td>
      <td>Calls a method in the current ScreenController and gets the method's return String. The method can also be void and have a side effect, e.g. play a sound etc.<br /></td>
    </tr>
    <tr>
      <td>$&#123;ENV.HOME&#125;</td>
      <td>Returns the path to user's home directory.<br /></td>
    </tr>
    <tr>
      <td>$&#123;ENV.key&#125;</td>
      <td>Looks up `key` in the environment variables. Use it like Java's System.getEnv("key").<br /></td>
    </tr>
    <tr>
      <td>$&#123;PROP.key&#125;</td>
      <td>looks up `key` in the Nifty properties. Use Nifty.setGlobalproperties(properties) and Nifty.getGlobalproperties("key"). Or SystemGetProperties(key);<br /></td>
    </tr>
  </tbody>
</table>

See also: [Nifty GUI - the Manual: XML GUI (Special XML Markup)](https://github.com/nifty-gui/nifty-gui/raw/1.4/nifty-core/manual/nifty-gui-the-manual-1.3.2.pdf)

## Use ScreenControllers for Mutually Exclusive Functionality

Technically you are free to create one ScreenController class for each screen, or reuse the same ScreenController for all or some of them. In the end it may be best to create individual ScreenControllers for functionality that is mutually exclusive.

For example, create a `MyHudScreen.java` for the `hud` screen, and a `MyStartScreen.java` for the `start` screen.

- Include all user interface methods that are needed during the game (while the HUD is up) in `MyHudScreen.java`. Then make this class control all screens that can be up during the game (the HUD screen, a MiniMap screen, an Inventory screen, an Abilities or Skills screen, etc). All these screens possibly share data (game data, player data), so it makes sense to control them all with methods of the same `MyHudScreen.java` class.
- The start screen, however, is mostly independent of the running game. Include all user interface methods that are needed outside the game (while you are on the start screen) in `MyStartScreen.java`. Then make this class control all screens that can be up outside the game (the Start screen, a Settings/Options screen, a HighScore screen, etc). All these classes need to read and write saved game data, so it makes sense to control them all with methods of the same `MyStartScreen.java` class.

## Create a "Loading..." Screen

Get the full [Loading Screen](loading_screen.md) tutorial here.

## Create a Popup Menu

Get the full [Nifty GUI PopUp Menu](nifty_gui_popup_menu.md) tutorial here.

## Add Visual Effects

You can register effects to screen elements.

- Respond to element events such as onStartScreen, onEndScreen, onHover, onFocus, onActive,
- Trigger effects that change movement, blending, size, color, fading, and much more.

Here is an example that moves a panel when the startScreen opens. You place an &lt; effect &gt; tag inside the element that you want to  be affected.

```xml

<panel height="25%" width="35%" ...>
  <effect>
    <onStartScreen name="move" mode="in" direction="top" length="300" startDelay="0" inherit="true"/>
  </effect>
</panel>

```

Learn more from the NiftyGUI page:

- [Nifty GUI - the Manual: Effects](https://github.com/nifty-gui/nifty-gui/raw/1.4/nifty-core/manual/nifty-gui-the-manual-1.3.2.pdf)
- [Effects](https://github.com/nifty-gui/nifty-gui/wiki/Effects)

## Add Sound Effects

Playing sounds using Nifty is also possible with a `playSound` effect as trigger. Remember to first register the sound that you want to play:

```xml

<registerSound id="myclick" filename="Interface/sounds/ButtonClick.ogg" />
...
<label>
  <effect>
    <onClick name="playSound" sound="myclick"/>
  </effect>
</label>

```

## Pass ClickLoc From Nifty to Java

After a mouse click, you may want to record the 2D clickLoc and send this info to your Java application. Typical ScreenController methods however only have a String argument. You'd have to convert the String to ints.

To pass the clickLoc as two ints, you can use the special `(int x, int y)` syntax in the ScreenController:

```java

  public void clicked(int x, int y) {
    // here you can use the x and y of the clickLoc
  }

```

In the Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; screen code (e.g. XML file) you must call the `(int x, int y)` method _without_ any parameters!

```xml

<interact onClick="clicked()"/>

```

You can name the method (here `clicked`) what ever you like, as long as you keep the argument syntax.

## Load Several XML Files

The basic Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; example showed how to use the `nifty.fromXML()` method to load one XML file containing all Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; screens.
The following code sample shows how you can load several XML files into one nifty object. Loading several files with `nifty.addXml()` allows you to split up each screen into one XML file, instead of all into one hard-to-read XML file.

```java

NiftyJmeDisplay niftyDisplay = new NiftyJmeDisplay(assetManager, inputManager, audioRenderer, viewPort);
Nifty nifty = niftyDisplay.getNifty();
nifty.addXml("Interface/Screens/OptionsScreen.xml");
nifty.addXml("Interface/Screens/StartScreen.xml");
nifty.gotoScreen("startScreen");
StartScreenControl screenControl = (StartScreenControl) nifty.getScreen("startScreen").getScreenController();
OptionsScreenControl optionsControl = (OptionsScreenControl) nifty.getScreen("optionsScreen").getScreenController();
stateManager.attach(screenControl);
stateManager.attach(optionsControl);
guiViewPort.addProcessor(niftyDisplay);

```

## Register additional explicit screen controllers

In addition to the `nifty.addXml()` methods to attach many nifty XML files, there exists a `nifty.registerScreenController()` method to explicitly attach more screen controllers.

The following code sample shows how you can explicitly attach several screen controllers before adding the XML file to nifty, which would otherwise cause nifty to implicitly instantiate the screen controller class.

```java

NiftyJmeDisplay niftyDisplay = NiftyJmeDisplay.newNiftyJmeDisplay(assetManager, inputManager, audioRenderer, viewPort);
Nifty nifty = niftyDisplay.getNifty();

nifty.registerScreenController(new OptionsScreenController(randomConstructorArgument));
nifty.addXml("Interface/Screens/OptionsScreen.xml");

```

## Design Your Own Styles

By default, your Nifty XML screens use the built.in styles:

```xml
 <useStyles filename="nifty-default-styles.xml" />
```

But you can switch to a set of custom styles in your game project's asset directory like this:

```xml
 <useStyles filename="Interface/Styles/myCustomStyles.xml" />
```

Inside myCustomStyles.xml you define styles like this:

```xml

<?xml version="1.0" encoding="UTF-8"?>
<nifty-styles>
  <useStyles filename="Interface/Styles/Font/myCustomFontStyle.xml" />
  <useStyles filename="Interface/Styles/Button/myCustomButtonStyle.xml" />
  <useStyles filename="Interface/Styles/Label/myCustomLabelStyle.xml" />
  ...
</nifty-styles>

```

Learn more about how to create styles by looking at the [Nifty GUI source code](https://github.com/nifty-gui/nifty-gui/wiki/Working-from-Source) for "`nifty-style-black`". Copy it as a template and change it to create your own style.

---

Learn more from the NiftyGUI page:

- [https://github.com/nifty-gui/nifty-gui/wiki/Effects](https://github.com/nifty-gui/nifty-gui/wiki/Effects)
