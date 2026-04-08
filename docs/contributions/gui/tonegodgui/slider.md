# slider

## Slider Class

The Slider class provides the same 3 common constructors shown in the [Quick Start Guide](quickstart.md) with the addition of two extra parameters.

- The orientation of the Slider
- A boolean flag telling the control whether or not the track should "`surround`" the thumb.

The additional parameter are appended to the existing parameter list for all 3 constructors, like so:

```java

/**
  * Parameters:
  * Screen screen
  * String UID
  * Vector2f position
  * Slider.Orientation orientation
  * boolean trackSurroundsThumb
  */
Slider slider1 = new Slider(
    screen,
    "SomeID",
    new Vector2f(15, 15),
    Slider.Orientation.HORIZONTAL,
    true
);

```

### Abstract Event Methods:

```java

public void onChange(int selectedIndex, String value);

```

### Methods specific to the Slider class:

```java

// Adding/removing step values
slider1.addStepValue(String value);
slider1.removeStepValue(String value);

// Selected values
slider1.getSelectedIndex();

```

You can set the select Sliders position and selected value using:

```java

slider1.setSelectedIndex(int selectedIndex)

```
