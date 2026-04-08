# Interacting with the GUI from Java

1. [Nifty GUI Concepts](nifty_gui.md)
1. [Nifty GUI Best Practices](nifty_gui_best_practices.md)
1. [Nifty GUI XML Layout](nifty_gui_xml_layout.md) or [Nifty GUI Java Layout](nifty_gui_java_layout.md)
1. [Nifty GUI Overlay](nifty_gui_overlay.md) or [Nifty GUI Projection](nifty_gui_projection.md)
1. *Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; Java Interaction*

In the previous parts of the tutorial, you created a two-screen user interface. But it is still static, and when you click the buttons, nothing happens yet. The purpose of the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; is to communicate with your Java classes: Your game needs to know what the users clicked, which settings they chose, which values they entered into a field, etc. Similarly, the user needs to know what the currently game state is (score, health, etc).

## Connect GUI to Java Controller

To let a Nifty screen communicate with the Java application, you register a `ScreenController` to every NiftyGUI screen. You create a ScreenController by creating a Java class that implements the `de.lessvoid.nifty.screen.ScreenController` interface and its abstract methods.

*Pro Tip:* Since you are writing a jME3 application, you can additionally make the ScreenController class extend the [BaseAppState](../app/state/application_states.md#baseappstate) class! This gives the ScreenController access to the application object and to the update loop!

Create an AppState *MyStartScreen*.java file in your package. ( **RMB** click on your package and select `"New &gt; Other&gt;JME3 Classes&gt;New BaseAppState"`)

Now add *implements ScreenController* to _public class MyStartScreen extends BaseAppState&#123;_ and add *import de.lessvoid.nifty.screen.ScreenController;*

Continue with adding:

```java

import de.lessvoid.nifty.screen.Screen;

...

public void bind(Nifty nifty, Screen screen) {
    throw new UnsupportedOperationException("Not supported yet.");
}

public void onStartScreen() {
    throw new UnsupportedOperationException("Not supported yet.");
}

public void onEndScreen() {
    throw new UnsupportedOperationException("Not supported yet.");
}

```

.Complete BaseAppState file
```java
package mygame;

import com.jme3.app.Application;
import com.jme3.app.state.BaseAppState;
import de.lessvoid.nifty.Nifty;
import de.lessvoid.nifty.screen.Screen;
import de.lessvoid.nifty.screen.ScreenController;

public class MyStartScreen extends BaseAppState implements ScreenController {

  @Override
  protected void initialize(Application app) {
      //It is technically safe to do all initialization and cleanup in the
      //onEnable()/onDisable() methods. Choosing to use initialize() and
      //cleanup() for this is a matter of performance specifics for the
      //implementor.
      //TODO: initialize your AppState, e.g. attach spatials to rootNode
  }

  @Override
  protected void cleanup(Application app) {
      //TODO: clean up what you initialized in the initialize method,
      //e.g. remove all spatials from rootNode
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

  /**
   * Bind this ScreenController to a screen. This happens right before the
   * onStartScreen STARTED and only exactly once for a screen!
   * @param nifty nifty
   * @param screen screen
   */
  @Override
  public void bind(Nifty nifty, Screen screen) {
      throw new UnsupportedOperationException("Not supported yet.");
  }

  /**
   * called right after the onStartScreen event ENDED.
   */
  @Override
  public void onStartScreen() {
      throw new UnsupportedOperationException("Not supported yet.");
  }

  /**
   * called right after the onEndScreen event ENDED.
   */
  @Override
  public void onEndScreen() {
      throw new UnsupportedOperationException("Not supported yet.");
  }
}

```

The name and package of your custom ScreenController class (here `mygame.MyStartScreen`) goes into the controller parameter of the respective XML screen it belongs to. For example:

```xml

<nifty>
  <screen id="start" controller="mygame.MyStartScreen">
      <!-- layer and panel code ... -->
  </screen>
</nifty>

```

Or the same in a Java syntax, respectively:

```java
nifty.addScreen("start", new ScreenBuilder("start") {{
  controller(new mygame.MyStartScreen());
}}.build(nifty));

```

Now the Java class `MyStartScreen` and this &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; screen (`start`) are connected. For this example you can also connect the `hud` screen to MyStartScreen.

See also: [Nifty GUI - the Manual: Elements (Screen Controller)](https://github.com/nifty-gui/nifty-gui/raw/1.4/nifty-core/manual/nifty-gui-the-manual-1.3.2.pdf)

## Make GUI and Java Interact

In most cases, you will want to pass game data in and out of the ScreenController. Note that you can pass any custom arguments from your Java class into your ScreenController constructor (`public MyStartScreen(GameData data) &#123;&#125;`).

Use any combination of the three following approaches to make Java classes interact with the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt;.

### GUI Calls a Void Java Method

This is how you respond to an &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; interaction such as clicks in XML GUIs:

1. Add `visibleToMouse="true"` to the parent element!
1. Embed the `&lt;interact /&gt;` element into the parent element.
1. Specify the Java methods that you want to call when the users performs certain actions, such as clicking. +
Example: `&lt;interact onClick="startGame(hud)" /&gt;`

Or this is how you respond to an &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; interaction such as clicks in Java GUIs:

1. Add `visibleToMouse(true);` to the parent element!
1. Embed one of the `interact…()` elements into the parent element.
1. Specify the Java method that you want to call after the interaction. +
Example: `interactOnClick("startGame(hud)");`

In the following example, we call the `startGame()` method when the player clicks the Start button, and `quitGame()` when the player clicks the Quit button.

```xml

<panel id="panel_bottom_left" height="50%" width="50%" valign="center" childLayout="center">
  <control name="button" label="Start" id="StartButton" align="center" valign="center"
    visibleToMouse="true" >
    <interact onClick="startGame(hud)"/>
  </control>
</panel>

<panel id="panel_bottom_right" height="50%" width="50%" valign="center" childLayout="center">
  <control name="button" label="Quit" id="QuitButton" align="center" valign="center"
    visibleToMouse="true" >
    <interact onClick="quitGame()"/>
  </control>
</panel>

```

Or the same in a Java syntax, respectively:

```java

control(new ButtonBuilder("StartButton", "Start") {{
  alignCenter();
  valignCenter();
  height("50%");
  width("50%");
  visibleToMouse(true);
  interactOnClick("startGame(hud)");
}});
...

control(new ButtonBuilder("QuitButton", "Quit") {{
  alignCenter();
  valignCenter();
  height("50%");
  width("50%");
  visibleToMouse(true);
  interactOnClick("quitGame()");
}});

```

Back in the MyStartScreen class, you specify what the `startGame()` and `quitGame()` methods do. As you see, you can pass String arguments (here `hud`) in the method call. You also see that you have access to the Application object.

```java

public class MyStartScreen extends BaseAppState implements ScreenController {
  ...

  /** custom methods */
  public void startGame(String nextScreen) {
    nifty.gotoScreen(nextScreen);  // switch to another screen
    // start the game and do some more stuff...
  }

  public void quitGame() {
    getApplication().stop();
  }

  ...
}

```

The startGame() example simply switches the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; to the `hud` screen when the user clicks Start. Of course, in a real game, you would perform more steps here: Load the game level, switch to in-game input and navigation handling, set a custom `running` boolean to true, attach custom in-game AppStates – and lots more.

The quitGame() example shows that you have access to the Application object because you made the ScreenController extend BaseAppState.

### GUI Gets Return Value from Java Method

When the Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; is initialized, you can get data from Java. In this example, the Java class `getPlayerName()` in `MyStartScreen` defines the Text that is displayed in the textfield before the words `'s Cool Game`.

First define a Java method in the screen controller, in this example, `getPlayerName()`.

```java

public class MySettingsScreen implements ScreenController {
  ...
  public String getPlayerName(){
    return System.getProperty("user.name");
  }
}

```

Nifty uses `$&#123;CALL.getPlayerName()&#125;` to get the return value of the getPlayerName() method from your ScreenController Java class.

```xml

<text text="${CALL.getPlayerName()}'s Cool Game" font="Interface/Fonts/Default.fnt" width="100%" height="100%" />

```

Or the same in a Java syntax, respectively:

```java
text(new TextBuilder() {{
  text("${CALL.getPlayerName()}'s Cool Game");
  font("Interface/Fonts/Default.fnt");
  height("100%");
  width("100%");
}});

```

You can use this for Strings and numeric values (e.g. when you read settings from a file, you display the results in the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt;) and also for methods with side effects.

### Java Modifies Nifty Elements and Events

You can also alter the appearance and functions of your nifty elements from Java. Make certain that the element that you want to alter has its `id="name"` attribute set, so you can identify and address it.

Here's an example of how to change an image called `playerhealth`:

```java

// load or create new image
NiftyImage img = nifty.getRenderEngine().createImage("Interface/Images/face2.png", false);
// find old image
Element niftyElement = nifty.getCurrentScreen().findElementByName("playerhealth");
// swap old with new image
niftyElement.getRenderer(ImageRenderer.class).setImage(img);

```

The same is valid for other elements, for example a text label "`score`":

```java

// find old text
Element niftyElement = nifty.getCurrentScreen().findElementByName("score");
// swap old with new text
niftyElement.getRenderer(TextRenderer.class).setText("124");

```

Similarly, to change the onClick() event of an element, create an `ElementInteraction` object:

```java

Element niftyElement = nifty.getCurrentScreen().findElementByName("myElement");
niftyElement.getElementInteraction().getPrimary().setOnMouseOver(new NiftyMethodInvoker(nifty, "myCustomMethod()", this));

```

For this to work, there already needs to be a (possibly inactive) `&lt;interact /&gt;` tag inside your xml element:

```xml
<interact onClick="doNothing()"/>
```

## Next Steps

You're done with the basic Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; for jME3 tutorial. You can proceed to advanced topics and learn how add controls and effects:

- [ Nifty GUI Scenarios](nifty_gui_scenarios.md)
- [Nifty GUI - the Manual](https://github.com/nifty-gui/nifty-gui/raw/1.4/nifty-core/manual/nifty-gui-the-manual-1.3.2.pdf)
- [Controls](https://github.com/nifty-gui/nifty-gui/wiki/Controls)
