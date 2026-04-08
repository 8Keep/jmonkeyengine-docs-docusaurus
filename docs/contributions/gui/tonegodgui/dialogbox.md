# dialogbox

## DialogBox Class

The DialogBox extends AlertBox adding a Cancel button with event handlers.

It utilizes the 3 standard constructors as shown in the [Quick Start Guide](quickstart.md).

*Constructor 1:*

```java

/** Parameters:
  * Screen screen,
  * String UID,
  * Vector2f position
  */

DialogBox dialog = new DialogBox(screen, "dialog", new Vector2f(15, 15));

```

*Constructor 2:*

```java

/** Additional Parameter:
  * Vector2f dimensions  */

DialogBox dialog = new DialogBox(screen, "dialog", new Vector2f(15, 15),
    new Vector2f(400, 300)
);

```

*Constructor 3:*

```java

/** Additional Parameters:
  * Vector4f resizeBorders,
  * String defaultImg
  */

DialogBox dialog = new DialogBox(screen, "dialog", new Vector2f(15, 15), new Vector2f(400, 300),
    new Vector4f(14,14,14,14),
    "tonegod/gui/style/def/Window/panel_x.png"
);

```

### Abstract Event Methods:

```java

public void onButtonOkPressed(MouseButtonEvent evt, boolean toggled)
public void onButtonCencelPressed(MouseButtonEvent evt, boolean toggled)

```

### Methods specific to the DialogBox class:

```java

dialog.setButtonCancelText(String text);

```
