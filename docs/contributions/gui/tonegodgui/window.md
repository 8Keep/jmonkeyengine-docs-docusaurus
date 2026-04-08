# window

## Window Class

The window class provides a movable, resizable window with a Drag Bar.

It provides the 3 standard constructors as shown in the [Quick Start Guide](quickstart.md).

*Constructor 1:*

```java

/** Parameters:
  * Screen screen,
  * String UID,
  * Vector2f position
  */

Window win = new Window(screen, xref:gui/tonegodgui/quickstart.adoc[Quick Start Guide]win”, new Vector2f(15, 15));

```

*Constructor 2:*

```java

/** Additional Parameter:
  * Vector2f dimensions  */

Window win = new Window(screen, "win", new Vector2f(15, 15),
    new Vector2f(400, 300)
);

```

*Constructor 3:*

```java

/** Additional Parameters:
  * Vector4f resizeBorders,
  * String defaultImg
  */

Window win = new Window(screen, "win", new Vector2f(15, 15), new Vector2f(400, 300),
    new Vector4f(14,14,14,14),
    "tonegod/gui/style/def/Window/panel_x.png"
);

```

:::note
Once again, default behaviors, such as moving, and resizing can be disabled calling the appropriate setters from the [Element](element.md) class.
:::

### Methods specific to the Window Class:

```java

win.getDragBar(); // returns a pointer to the dragbar Element
win.getDragBarHeight(); // returns the height of the dragbar
win.setWindowTitle(String title); // Sets the title displayed in the dragbar

```
