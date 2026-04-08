# Font Creator

This SDK plugin provides font support for jMonkeyEngine games. It creates AngelFont files from system fonts. Make sure you have the rights/license to use this font! You can [search for and download free fonts](https://www.google.com/search?q=free+fonts) from many sites.

## Installation

If the plugin is installed, you see it under `Plugins → Installed`

![install-font-plugin.png](/wiki-assets/docs/sdk/images/plugin/install-font-plugin.png)

(If you don't see it, go to `Tools → Plugins → Available Plugins` to install Font Creator.)

## Create Font

The following example creates the custom font `Orbitron.fnt` in the `assets/Interface/Fonts` directory.

![font-1.png](/wiki-assets/docs/sdk/images/plugin/font-1.png)

![font-2.png](/wiki-assets/docs/sdk/images/plugin/font-2.png)

![font-3.png](/wiki-assets/docs/sdk/images/plugin/font-3.png)

![font-4.png](/wiki-assets/docs/sdk/images/plugin/font-4.png)

![font-5.png](/wiki-assets/docs/sdk/images/plugin/font-5.png)

## Use Font

The following example loads text in the custom font `Orbitron.fnt` from the `assets/Interface/Fonts` directory. You use `com.jme3.font.*` package to handle text on the screen. `guiNode` is a preconfigured node in any `SimpleApplication`-based game.

```java

BitmapFont myFont = assetManager.loadFont("Interface/Fonts/Orbitron.fnt");
BitmapText hudText = new BitmapText(myFont, false);
hudText.setText("You can write any string here");
guiNode.attachChild(hudText);

```

## create font for RTL languages like persian and arabic

to create and use persian bitmap fonts use this tool.
[bitMapFontCreator for RTL languages](https://github.com/younes-noori/bitMapFontCreator)
