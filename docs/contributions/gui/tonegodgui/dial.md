# dial

## Dial Class

The Dial class provides:

- A rotating knob for selecting step values

The Dial class provides the standard 3 common constructors as sown in the [Quick Start Guide](quickstart.md).

*Constructor 1:*

```java

/** Parameters:
  * Screen screen,
  * String UID,
  * Vector2f position
  */

Dial dial = new Dial(screen, "dial", new Vector2f(15, 15));

```

*Constructor 2:*

```java

/** Additional Parameter:
  * Vector2f dimensions  */

Dial dial = new Dial(screen, "dial", new Vector2f(15, 15),
    new Vector2f(35, 35)
);

```

*Constructor 3:*

```java

/** Additional Parameters:
  * Vector4f resizeBorders,
  * String defaultImg
  */

Dial dial = new Dial(screen, "dial", new Vector2f(15, 15), new Vector2f(35, 35),
    new Vector4f(0,0,0,0),
    "tonegod/gui/style/def/Dial/dial_x.png"
);

```

### Abstract Event Methods:

```java

public void onChange(int selectedIndex, String value);

```

### Methods specific to the Dial class:

```java

// Adding removing list info
dial.addStepValue(String value);
dial.removeStepValue(String value);

// Retrieval of current selected step
dial.getSelectedIndex();

```
