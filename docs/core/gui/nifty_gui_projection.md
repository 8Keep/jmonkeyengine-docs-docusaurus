# Integrating Nifty GUI: Projection

1. [Nifty GUI Concepts](nifty_gui.md)
1. [Nifty GUI Best Practices](nifty_gui_best_practices.md)
1. [Nifty GUI XML Layout](nifty_gui_xml_layout.md) or [Nifty GUI Java Layout](nifty_gui_java_layout.md)
1. [Nifty GUI Overlay](nifty_gui_overlay.md) or *Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; Projection*
1. [Interact with the GUI from Java](nifty_gui_java_interaction.md)

![nifty-gui.png](/wiki-assets/docs/core/assets/images/gui/nifty-gui.png)

Typically you define a key (for example escape) to switch the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; on and off. Then you [overlay](nifty_gui_overlay.md) the running game with the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; (you will most likely pause the game then).

Alternatively, you can also project the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; as a texture onto a mesh textures inside the game. Although this looks cool and "`immersive`", this approach is rarely used since it is difficult to record clicks this way. You can only interact with this projected &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; by keyboard, or programmatically. You can select input fields using the arrow keys, and trigger actions using the return key.

This &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; projection variant is less commonly used than the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; overlay variant. Usecases for &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; projection are, for example, a player avatar using an in-game computer screen.

## Sample Code

- [TestNiftyToMesh.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/niftygui/TestNiftyToMesh.java)

## Projecting the User Interface Onto a Texture

You can project the Nifty &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; onto a texture, load the texture into a material, and assign it to a Geometry (Quads or Boxes are best).

```java

/** Create a special viewport for the Nifty GUI */
ViewPort niftyView = renderManager.createPreView("NiftyView", new Camera(1024, 768));
niftyView.setClearEnabled(true);
/** Create a new NiftyJmeDisplay for the integration */
NiftyJmeDisplay niftyDisplay = NiftyJmeDisplay.newNiftyJmeDisplay(
  assetManager,  inputManager,  audioRenderer,  niftyView);
/** Create a new NiftyGUI object */
Nifty nifty = niftyDisplay.getNifty();
/** Read your XML and initialize your custom ScreenController */
nifty.fromXml("Interface/helloworld.xml", "start", new MySettingsScreen(data));

/** Prepare a framebuffer for the texture niftytex */
niftyView.addProcessor(niftyDisplay);
FrameBuffer fb = new FrameBuffer(1024, 768, 0);
fb.setDepthBuffer(Format.Depth);
Texture2D niftytex = new Texture2D(1024, 768, Format.RGB8);
fb.setColorTexture(niftytex);
niftyView.setClearEnabled(true);
niftyView.setOutputFrameBuffer(fb);

/** This is the 3D cube we project the GUI on */
Box b = new Box(Vector3f.ZERO, 1, 1, 1);
Geometry geom = new Geometry("Box", b);
Material mat = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
mat.setTexture("m_ColorMap", niftytex); /** Here comes the texture! */
geom.setMaterial(mat);
rootNode.attachChild(geom);

```

The MySettingsScreen class is a custom de.lessvoid.nifty.screen.ScreenController in which you implement your &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; behaviour.  The variable `data` contains an object that you use to exchange state info with the game. See [Nifty GUI Java Interaction](nifty_gui_java_interaction.md) for details on how to create this class.

Run the code sample. You select buttons on this &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; with the arrow keys and then press return. Note that clicking on the texture will not work!

## Next Steps

Now that you have layed out and integrated the &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; in your app, you want to respond to user input and display the current game.

- [Interact with the GUI from Java](nifty_gui_java_interaction.md)
