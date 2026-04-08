# scrollarea

## ScrollArea class

Utilizes the standard 3 constructors as shown in the [Quick Start Guide](quickstart.md) with the addition of a single boolean:

- isTextOnly – appended to the end of the param list for each constructor

The additional parameter is appended to the end of the parameter list for each of the 3 constructors, like so:

```java

/**
  * Parameters:
  * Screen screen
  * String UID
  * Vector2f position
  * boolean isTextOnly
  */
ScrollArea scrollArea = new ScrollArea(
    screen,
    "SomeID",
    new Vector2f(15, 15),
    true
);

```

:::note
The ScrollArea implements Vertical Scrolling only. Why? Because I was lazy. Eventually I will add Horizontal scrolling as well.
:::

ScrollArea's can be implemented in two ways: Text Only, or an inner element that can contain nested Elements.

1. The text only version uses the Element setText() method for adding to the scrollable content.
1. The inner Element method uses addScrollableChild() as well as setText() to add scrollable content

When using a scroll area for building Custom Controls, consider the potential uses of the ScrollArea to alleviate unnecessary overhead. If the text only version will suffice… USE IT! No reason to create the extra Element if it will not be used.

### Methods specific to the ScrollArea class:

```java

// Config methods
scrollArea.getIsTextOnly();
scrollArea.setPadding(float padding);
scrollArea.getPadding();
scrollArea.getScrollableHeight();

// Pointer to VScrollBar
scrollArea.getVScrollBar();

//Scrolling methods
scrollArea.scrollYTo(float y);
scrollArea.scrollYBy(float yInc);
scrollArea.scrollToTop();
scrollArea.scrollToBottom();

```
