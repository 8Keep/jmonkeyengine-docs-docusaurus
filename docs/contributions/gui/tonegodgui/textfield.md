# textfield

## TextField Class

Textfields are single line text input fields, that provide the following functionality:

- Caret & Text Range
- Mouse select
- Keyboard nav using:
  - arrows (nav by letter)
  - SHIFT+arrows (text range by latter)
  - CTRL+arrows (nav by word)
  - SHIFT+CTRL+arrows (text range by word)
  - etc.

- Cut & Paste

:::note
This control is still a work in progress and will be updated as either time permits or issues arise.  There is a known issue with the Cut & Paste function as of right now and it has been disabled.
:::

TextFields provide the standard 3 constructors as shown in the [Quick Start Guide](quickstart.md).

*Constructor 1:*

```java

/** Parameters:
  * Screen screen,
  * String UID,
  * Vector2f position
  */

TextField text = new TextField(screen, "text", new Vector2f(15, 15));

```

*Constructor 2:*

```java

/** Additional Parameter:
  * Vector2f dimensions  */

TextField text = new TextField(screen, "text", new Vector2f(15, 15),
    new Vector2f(150, 25)
);

```

*Constructor 3:*

```java

/** Additional Parameters:
  * Vector4f resizeBorders,
  * String defaultImg
  */

TextField text = new TextField(screen, "text", new Vector2f(15, 15), new Vector2f(150, 25),
    new Vector4f(3,3,3,3),
    "tonegod/gui/style/def/TextField/text_field_x.png"
);

```

### Validations & Rules

TextFields can be set to a specific Type using:

```java

text.setType(TextField.Type type);

```

<table>
  <thead>
    <tr>
      <th>Rule</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Type.DEFAULT</td>
      <td>Accept all characters<br /></td>
    </tr>
    <tr>
      <td>Type.ALPHA</td>
      <td>Accept only lower case, uppercase alpha character + spacebar<br /></td>
    </tr>
    <tr>
      <td>Type.ALPHA_NOSPACE</td>
      <td>Accept only lower case, uppercase alpha character - no spacebar<br /></td>
    </tr>
    <tr>
      <td>Type.NUMERIC</td>
      <td>Accept only numeric values + decimal<br /></td>
    </tr>
    <tr>
      <td>Type.ALPHANUMERIC</td>
      <td>Apply both ALPHA and NUMERIC rules<br /></td>
    </tr>
    <tr>
      <td>Type.ALPHANUMERIC_NOSPACE</td>
      <td>Apply both ALPHA_NOSPACE and NUMERIC rules<br /></td>
    </tr>
    <tr>
      <td>Type.EXCLUDE_SPECIAL</td>
      <td>Exclude all spacial characters<br /></td>
    </tr>
    <tr>
      <td>Type.EXCLUDE_CUSTOM</td>
      <td>Exclude all user defined character (see below)<br /></td>
    </tr>
    <tr>
      <td>Type.INCLUDE_CUSTOM</td>
      <td>Accept only user defined characters (see below)<br /></td>
    </tr>
  </tbody>
</table>

To define a custom validation for Type.EXCLUDE_CUSTOM or Type.INCLUDE_CUSTOM, use the following method:

```java

text.setCustomValidation("Character List to include/exclude");

```

You can also limit the number of characters the TextField will accept using:

```java

text.setMaxLimit(int maxLimit);

```

You can force upper and lower case by using:

```java

text.setForceUpperCase(boolean forceUpperCase);
text.setForceLowerCase(boolean forceLowerCase);

```

### Methods specific to the TextField class:

```java

// Get the TextField text
text.getText();
// Set the TextField text !IMPORTANT! setTextFieldText is now @Deprecated, use the following instead:
text.setText(String s);

// Retrieve numeric values (all numeric parsers throw NumberFormatException
text.parseInt();
text.parseFloat();
text.parseShort();
text.parseDouble();
text.parseLong();

```

### Hooks:

```java

public void controlKeyPressHook(KeyInputEvent evt, String text) {  }

```
