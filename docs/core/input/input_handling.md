# Input Handling

Users interact with your jME3 application with different input devices – the mouse, the keyboard, or a joystick. To respond to inputs we use the `inputManager` object in `SimpleApplication`.

This is how you add interaction to your game:

1. For each action, choose the trigger(s) (a key or mouse click etc)
1. For each action, add a trigger mapping to the inputManager
1. Create at least one listener in SimpleApplication
1. For each action, register its mappings to a listener
1. Implement each action in the listener

## Code Samples

- [TestControls.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/input/TestControls.java)
- [TestJoystick.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/input/TestJoystick.java)

## 1. Choose Trigger

Choose one or several key/mouse events for the interaction. We use `KeyTrigger`, `MouseAxisTrigger`, `MouseButtonTrigger`, `JoyAxisTrigger` and `JoyButtonTrigger` constants from the `com.jme3.input.controls` package.

:::note
The MouseAxis and JoyAxis triggers go along the X axis (right/left) or Y axis (up/down). These Triggers come with extra booleans for the negative half of the axis (left, down). Remember to write code that listens to the negative (true) and positive (false) axis!
:::

[cols="2", options="header"]

<table>
  <tbody>
    <tr>
      <td>Trigger</td>
      <td>Code<br /></td>
      <td>Mouse button: Left Click</td>
      <td>MouseButtonTrigger(MouseInput.BUTTON_LEFT)<br /></td>
      <td>Mouse button: Right Click</td>
      <td>MouseButtonTrigger(MouseInput.BUTTON_RIGHT)<br /></td>
      <td>Mouse button: Middle Click</td>
      <td>MouseButtonTrigger(MouseInput.BUTTON_MIDDLE)<br /></td>
      <td>Mouse movement: Right</td>
      <td>MouseAxisTrigger(MouseInput.AXIS_X, true)<br /></td>
      <td>Mouse movement: Left</td>
      <td>MouseAxisTrigger(MouseInput.AXIS_X, false)<br /></td>
      <td>Mouse movement: Up</td>
      <td>MouseAxisTrigger(MouseInput.AXIS_Y, true)<br /></td>
      <td>Mouse movement: Down</td>
      <td>MouseAxisTrigger(MouseInput.AXIS_Y, false)<br /></td>
      <td>Mouse wheel: Up</td>
      <td>MouseAxisTrigger(MouseInput.AXIS_WHEEL,false)<br /></td>
      <td>Mouse wheel: Down</td>
      <td>MouseAxisTrigger(MouseInput.AXIS_WHEEL,true)<br /></td>
      <td>NumPad: 1, 2, 3, …</td>
      <td>KeyTrigger(KeyInput.KEY_NUMPAD1) …<br /></td>
      <td>Keyboard: 1, 2 , 3, …</td>
      <td>KeyTrigger(KeyInput.KEY_1) …<br /></td>
      <td>Keyboard: A, B, C, …</td>
      <td>KeyTrigger(KeyInput.KEY_A) …<br /></td>
      <td>Keyboard: Spacebar</td>
      <td>KeyTrigger(KeyInput.KEY_SPACE)<br /></td>
      <td>Keyboard: Shift</td>
      <td>KeyTrigger(KeyInput.KEY_RSHIFT), +<br />KeyTrigger(KeyInput.KEY_LSHIFT)<br /></td>
      <td>Keyboard: F1, F2, …</td>
      <td>KeyTrigger(KeyInput.KEY_F1) …<br /></td>
      <td>Keyboard: Return, Enter</td>
      <td>KeyTrigger(KeyInput.KEY_RETURN), +<br />KeyTrigger(KeyInput.KEY_NUMPADENTER)<br /></td>
      <td>Keyboard: PageUp, PageDown</td>
      <td>KeyTrigger(KeyInput.KEY_PGUP), +<br />KeyTrigger(KeyInput.KEY_PGDN)<br /></td>
      <td>Keyboard: Delete, Backspace</td>
      <td>KeyTrigger(KeyInput.KEY_BACK), +<br />KeyTrigger(KeyInput.KEY_DELETE)<br /></td>
      <td>Keyboard: Escape</td>
      <td>KeyTrigger(KeyInput.KEY_ESCAPE)<br /></td>
      <td>Keyboard: Arrows</td>
      <td>KeyTrigger(KeyInput.KEY_DOWN), +<br />KeyTrigger(KeyInput.KEY_UP) +<br />KeyTrigger(KeyInput.KEY_LEFT), KeyTrigger(KeyInput.KEY_RIGHT)<br /></td>
      <td>Joystick Button:</td>
      <td>JoyButtonTrigger(0, JoyInput.AXIS_POV_X), +<br />JoyButtonTrigger(0, JoyInput.AXIS_POV_Y) ?<br /></td>
      <td>Joystick Movement: Right</td>
      <td>JoyAxisTrigger(0, JoyInput.AXIS_POV_X, true)<br /></td>
      <td>Joystick Movement: Left</td>
      <td>JoyAxisTrigger(0, JoyInput.AXIS_POV_X, false)<br /></td>
      <td>Joystick Movement: Forward</td>
      <td>JoyAxisTrigger(0, JoyInput.AXIS_POV_Z, true)<br /></td>
      <td>Joystick Movement: Backward</td>
      <td>JoyAxisTrigger(0, JoyInput.AXIS_POV_Z, false)<br /></td>
    </tr>
  </tbody>
</table>

In your IDE, use code completion to quickly look up Trigger literals. In the jMonkeyEngine SDK for example, press ctrl-space or ctrl-/ after `KeyInput.|` to choose from the list of all keys.

## 2. Remove Default Trigger Mappings

```
inputManager.deleteMapping( SimpleApplication.INPUT_MAPPING_MEMORY );
```

<table>
  <thead>
    <tr>
      <th>Default Mapping</th>
      <th>Key</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>INPUT_MAPPING_HIDE_STATS</td>
      <td>F5</td>
      <td>Hides the statistics in the bottom left.<br /></td>
    </tr>
    <tr>
      <td>INPUT_MAPPING_CAMERA_POS</td>
      <td>KEY_C</td>
      <td>Prints debug output about the camera.<br /></td>
    </tr>
    <tr>
      <td>INPUT_MAPPING_MEMORY</td>
      <td>KEY_M</td>
      <td>Prints debug output for memory usage.<br /></td>
    </tr>
    <tr>
      <td>INPUT_MAPPING_EXIT</td>
      <td>KEY_ESCAPE</td>
      <td>Closes the application by calling `stop();`. Typically you do not remove this, unless you replace it by another way of quitting gracefully.<br /></td>
    </tr>
  </tbody>
</table>

## 3. Add Custom Trigger Mapping

When initializing the application, add a Mapping for each Trigger.

Give the mapping a meaningful name. The name should reflect the action, not the button/key (because buttons/keys can change). Here some examples:

```java

inputManager.addMapping("Pause Game", new KeyTrigger(KeyInput.KEY_P));
inputManager.addMapping("Rotate",     new KeyTrigger(KeyInput.KEY_SPACE));
...

```

There are cases where you may want to provide more then one trigger for one action. For example, some users prefer the WASD keys to navigate, while others prefer the arrow keys. Add several triggers for one mapping, by separating the Trigger objects with commas:

```java

inputManager.addMapping("Left",  new KeyTrigger(KeyInput.KEY_A),
                                 new KeyTrigger(KeyInput.KEY_LEFT)); // A and left arrow
inputManager.addMapping("Right", new KeyTrigger(KeyInput.KEY_D),
                                 new KeyTrigger(KeyInput.KEY_RIGHT)); // D and right arrow
                                 ...

```

## 4. Create Listeners

The jME3 input manager supports two types of event listeners for inputs: AnalogListener and ActionListener. You can use one or both listeners in the same application. Add one or both of the following code snippets to your main SimpleApplication-based class to activate the listeners.

:::note
The two input listeners do not know, and do not care, which actual key was pressed. They only know which _named input mapping_ was triggered.
:::

### ActionListener

`com.jme3.input.controls.ActionListener`

- Use for absolute "`button`" pressed or released?, on or off? actions.
  - Examples: Pause/unpause, a rifle or revolver shot, jump, click to select.

- JME gives you access to:
  - The mapping name of the triggered action.
  - A boolean whether the trigger is still pressed or has just been released.
  - A float of the current time-per-frame as timing factor

```java

private ActionListener actionListener = new ActionListener() {
  public void onAction(String name, boolean keyPressed, float tpf) {
     /** TODO: test for mapping names and implement actions */
  }
};
```

### AnalogListener

`com.jme3.input.controls.AnalogListener`

- Use for continuous and gradual actions.
  - Examples: Walk, run, rotate, accelerate vehicle, strafe, (semi-)automatic weapon shot

- JME gives you access to:
  - The mapping name of the triggered action.
  - A gradual float value between how long the trigger has been pressed.
  - A float of the current time-per-frame as timing factor

```java

private AnalogListener analogListener = new AnalogListener() {
  public void onAnalog(String name, float keyPressed, float tpf) {
     /** TODO: test for mapping names and implement actions */
  }
};
```

## 4. Register Mappings to Listeners

To activate the mappings, you must register them to a Listener. Write your registration code after the code block where you have added the mappings to the inputManager.

In the following example, you register the "`Pause Game`" mapping to the `actionListener` object, because pausing a game is in "`either/or`" decision.

```java
inputManager.addListener(actionListener, new String[]{"Pause Game"});
```

In the following example, you register navigational mappings to the `analogListener` object, because walking is a continuous action. Players typically keep the key pressed to express continuity, for example when they want to "`walk`" on or "`accelerate`".

```java
inputManager.addListener(analogListener, new String[]{"Left", "Right"});
```

As you see, you can add several listeners in one String array. You can call the addListener() method more than once, each time with a subset of your list, if that helps you keep you code tidy. Again, the Listeners do not care about actual which keys are configured, you only register named trigger mappings.

:::tip
Did you register an action, but it does not work? Check the string's capitalization and spelling, it's case sensitive!
:::

## 5. Implement Actions in Listeners

You specify the action to be triggered where it says TODO in the Listener code snippets. Typically, you write a series of if/else conditions, testing for all the mapping names, and then calling the respective action.

Make use of the distinction between `if` and `else if` in this conditional.

- If several actions can be triggered simultaneously, test for all of these with a series of bare `if`s. For example, a character can be running forward _and_ to the left.
- If certain actions exclude one another, test for them with `else if`, the the rest of the exclusive tests can be skipped and you save some milliseconds. For example, you either shoot or pick something up.

### ActionListener

In the most common case, you want an action to be triggered once, in the moment when the button or key trigger is released. For example, when the player presses a key to open a door, or clicks to pick up an item. For these cases, use an ActionListener and test for `&& !keyPressed`, like shown in the following example.

```java
private ActionListener actionListener = new ActionListener() {
    public void onAction(String name, boolean keyPressed, float tpf) {

      if (name.equals("Pause Game") && !keyPressed) { // test?
        isRunning = !isRunning;                       // action!
      }

      if ...

    }
  };

```

### AnalogListener

The following example shows how you define actions with an AnalogListener. These actions are triggered continuously, as long (intensity `value`) as the named key or mouse button is down. Use this listeners for semi-automatic weapons and navigational actions.

```java
private AnalogListener analogListener = new AnalogListener() {
    public void onAnalog(String name, float value, float tpf) {

      if (name.equals("Rotate")) {         // test?
        player.rotate(0, value*speed, 0);  // action!
      }

      if ...

    }
  };
```

## Let Users Remap Keys

It is likely that your players have different keyboard layouts, are used to "`reversed`" mouse navigation, or prefer different navigational keys than the ones that you defined. You should create an options screen that lets users customize their mouse/key triggers for your mappings. Replace the trigger literals in the `inputManager.addMapping()` lines with variables, and load sets of triggers when the game starts.

The abstraction of separating triggers and mappings has the advantage that you can remap triggers easily. Your code only needs to remove and add some trigger mappings. The core of the code (the listeners and actions) remains unchanged.

## Detecting Joystick Connection States

For information regarding the connection state of a joystick see [Listening for Joystick Connections](../../tutorials/beginner/hello_input_system.md#listening-for-joystick-connections).
