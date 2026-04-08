# Integrating Nifty GUI: Overlay

1. [Nifty GUI Concepts](nifty_gui.md)
1. [Nifty GUI Best Practices](nifty_gui_best_practices.md)
1. [Nifty GUI XML Layout](nifty_gui_xml_layout.md) or [Nifty GUI Java Layout](nifty_gui_java_layout.md)
1. *Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; Overlay* or [Nifty GUI Projection](nifty_gui_projection.md)
1. [Interact with the GUI from Java](nifty_gui_java_interaction.md)

![nifty-gui-example.png](/wiki-assets/docs/core/assets/images/gui/nifty-gui-example.png)

Typically, you define a key (for example escape) that switches the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; on and off. The &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; can be a StartScreen, OptionsScreen, CharacterCreationScreen, etc. While the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; is up, you pause the running game, and then overlay the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt;. You also must switch to a different set of user inputs while the game is paused, so the player can use the mouse pointer and keyboard to interact with the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt;.

You can also [project](nifty_gui_projection.md) the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; as a texture onto a mesh texture (but then you cannot click to select).
On this page, we look at the overlay variant, which is more commonly used in games.

## Sample Code

- [TestNiftyGui.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/niftygui/TestNiftyGui.java)

:::tip
The jme3-niftygui library is included in jMonkeyEngine. If you installed jMonkeyEngine using one of the [optional methods](../../documentation.md#install), it will be added to your projects Library folder as part of the installation. If you're using the jMonkeyEngine SDK, you add it to any project by **RMB** selecting your projects `Library` folder, choosing `"Add Library &gt; jme-niftygui"` followed by `Add Library`.
:::

## Overlaying the User Interface Over the Screen

This code shows you how to overlay anything on the screen with the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt;. This is the most common usecase.

```java

NiftyJmeDisplay niftyDisplay = NiftyJmeDisplay.newNiftyJmeDisplay(
    assetManager, inputManager, audioRenderer, guiViewPort);
/** Create a new NiftyGUI object */
Nifty nifty = niftyDisplay.getNifty();
/** Read your XML and initialize your custom ScreenController */
nifty.fromXml("Interface/tutorial/step2/screen.xml", "start");
// nifty.fromXml("Interface/helloworld.xml", "start", new MySettingsScreen(data));
// attach the Nifty display to the gui view port as a processor
guiViewPort.addProcessor(niftyDisplay);
// disable the fly cam
flyCam.setDragToRotate(true);

```

Currently you do not have a ScreenController – we will create one in the next exercise. As soon  as you have a screen controller, you will use the commented variant of the XML loading method:

```java
nifty.fromXml("Interface/helloworld.xml", "start", new MySettingsScreen());
```

The `MySettingsScreen` class is a custom de.lessvoid.nifty.screen.ScreenController in which you will implement your &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; behaviour.

If you have many screens or you want to keep them organized in separate files there is a method available that will just load an additional XML file. The content of the files are
simply added to whatever XML data has been loaded before.

```java
nifty.addXml("Interface/mysecondscreen.xml");
```

## Next Steps

Now that you have layed out and integrated the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; in your app, you want to respond to user input and display the current game. Time to create a ScreenController!

- [Interact with the GUI from Java](nifty_gui_java_interaction.md)
