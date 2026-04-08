# panel

## Panel Class

The Panel class extends Element and, like the Label class, it’s only purpose is to provide:

1. The 3 standard constructors as shown in the [Quick Start Guide](quickstart.md)
1. Default style information

*Constructor 1:*

```java

/** Parameters:
  * Screen screen,
  * String UID,
  * Vector2f position
  */

Panel panel = new Panel(screen, "panel", new Vector2f(15, 15));

```

*Constructor 2:*

```java

/** Additional Parameter:
  * Vector2f dimensions  */

Panel panel = new Panel(screen, "panel", new Vector2f(15, 15),
    new Vector2f(400, 300)
);

```

*Constructor 3:*

```java

/** Additional Parameters:
  * Vector4f resizeBorders,
  * String defaultImg
  */

Panel panel = new Panel(screen, "panel", new Vector2f(15, 15), new Vector2f(400, 300),
    new Vector4f(14,14,14,14),
    "tonegod/gui/style/def/Window/panel_x.png"
);

```

The Panel class creates a resizable, movable panel ([Window](window.md) without a dragbar). The entire panel is clickable for moving unless otherwise covered by added child Elements that have not called:

```java

setIgnoreMouse(true);

```

You can disable any of the default behaviors of the Panel class by using the methods described in the [Element](element.md) class.
