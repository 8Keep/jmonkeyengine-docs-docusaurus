# screen

## The Screen Class

You can create a screen using one of the two provided constructors as shown in the [Quick Start Guide](quickstart.md).

```java

// this = any JME Application
Screen screen = new Screen(this);
guiNode.addControl(screen);

```

Optionally, you can provide a path to a custom Style theme:

```java

// this = any JME Application
Screen screen = new Screen(this, "tonegod/gui/style/def/style_map.xml");
guiNode.addControl(screen);

```

To make use of custom cursors, call this method prior to initializing the screen:

```java

screen.setUseCustomCursors(true);

```

You can disable and re-enable custom cursors at any point, but they must be initialized with the screen to be loaded.

Cursor Effects can be enabled/disabled at anytime by calling:

```java

screen.setUseCursorEffects(boolean useCursorEffects);

```

Tool Tips can be enabled/disabled at anytime by calling:

```java

screen.setUseToolTips(boolean useToolTips);

```

Audio can be enabled/disabled at anytime by calling:

```java

screen.setUseUIAudio(boolean useUIAudio);

```

### Application quick references methods:

```java

screen.getApplication();

// Screen dimensions
screen.getWidth();
screen.getHeight();

// Mouse position
screen.getMouseXY(); // returns a Vector2f containing current mouse x/y

```

### Methods for adding remove base level controls:

```java

screen.addElement(Element element);
screen.removeElement(Element element);

```

### Z-Order Methods:

```java

// Bring the specified Element to the front
screen.updateZOrder(Element topMost);

```

### Accessing the EffectManager:

```java

screen.getEffectManager();

```

### Retrieving a Style:

```java

screen.getStyle(String tagName);

```

### Custom Cursor Related Methods:

```java

screen.setCursor(Screen.CursorType cur); // called by controls
screen.setForcedCursor(Screen.CursorType cur); // Overrides control manipulation of cursor.
screen.releaseForcedCursor(); // Release cursor manipulation back to controls

```

### Retrieving Elements

```java

// Recursive search
screen.getElementById(String UID);

```

### UI Global Alpha Settings:

```java

screen.setGlobalAlpha(float globalAlpha);
screen.getGlobalAlpha();

```

### UI Global Audio Settings:

```java

screen.setUseUIAudio(boolean useUIAudio);
screen.getUseUIAudio();
screen.setUIAudioVolume(float uiAudioVolume);
screen.getUIAudioVolume();
screen.playAudioNode(String key, float volume);

```

### Enabling Global Texture Atlas Use

Keep in mind, that it is possible to enable texture atlas usage per element without enabling global texture atlas use.

```java

screen.setUseTextureAtlas(boolean useTextureAtlas, String texturePath);
screen.getUseTextureAtlas();
screen.getAtlasTexture();

```
