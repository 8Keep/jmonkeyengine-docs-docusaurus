# jMonkeyEngine 3 Tutorial (5) - Hello Input System

By default, SimpleApplication sets up a camera control that allows you to steer the camera with the `W` `A` `S` `D` keys, the arrow keys, and the mouse. You can use it as a flying first-person camera right away. But what if you need a third-person camera, or you want keys to trigger special game actions?

Every game has its custom keybindings, and this tutorial explains how you define them. We first define the key presses and mouse events, and then we define the actions they should trigger.

## Sample Code

```java

package jme3test.helloworld;

import com.jme3.app.SimpleApplication;
import com.jme3.material.Material;
import com.jme3.math.Vector3f;
import com.jme3.scene.Geometry;
import com.jme3.scene.shape.Box;
import com.jme3.math.ColorRGBA;
import com.jme3.input.KeyInput;
import com.jme3.input.MouseInput;
import com.jme3.input.controls.ActionListener;
import com.jme3.input.controls.AnalogListener;
import com.jme3.input.controls.KeyTrigger;
import com.jme3.input.controls.MouseButtonTrigger;

/** Sample 5 - how to map keys and mouse buttons to actions */

public class HelloInput extends SimpleApplication {

    public static void main(String[] args) {
        HelloInput app = new HelloInput();
        app.start();
    }

    private Geometry player;
    private Boolean isRunning = true;

    @Override
    public void simpleInitApp() {
        Box b = new Box(1, 1, 1);
        player = new Geometry("Player", b);
        Material mat = new Material(assetManager, "Common/MatDefs/Misc/Unshaded.j3md");
        mat.setColor("Color", ColorRGBA.Blue);
        player.setMaterial(mat);
        rootNode.attachChild(player);
        initKeys(); // load my custom keybinding
    }

    /** Custom Keybinding: Map named actions to inputs. */ 
    private void initKeys() {
        /* You can map one or several inputs to one named mapping. */ 
        inputManager.addMapping("Pause",  new KeyTrigger(KeyInput.KEY_P));
        inputManager.addMapping("Left",   new KeyTrigger(KeyInput.KEY_J));
        inputManager.addMapping("Right",  new KeyTrigger(KeyInput.KEY_K));
        inputManager.addMapping("Rotate", new KeyTrigger(KeyInput.KEY_SPACE),
                                          new MouseButtonTrigger(MouseInput.BUTTON_LEFT));
        /* Add the named mappings to the action listeners. */ 
        inputManager.addListener(actionListener, "Pause");
        inputManager.addListener(analogListener, "Left", "Right", "Rotate");

    }

  /** Use this listener for KeyDown/KeyUp events */ 
    final private ActionListener actionListener = new ActionListener() {
        @Override
        public void onAction(String name, boolean keyPressed, float tpf) {
            if (name.equals("Pause") && !keyPressed) {
                isRunning = !isRunning;
            }
        }
    };

  /** Use this listener for continuous events */ 
    final private AnalogListener analogListener = new AnalogListener() {
        @Override
        public void onAnalog(String name, float value, float tpf) {
            if (isRunning) {
                if (name.equals("Rotate")) {
                    player.rotate(0, value, 0);
                }
                if (name.equals("Right")) {
                    player.move((new Vector3f(value, 0,0)) ); 
                }
                if (name.equals("Left")) {
                    player.move(new Vector3f(-value, 0,0)); 
                }
            } else {
                System.out.println("Press P to unpause.");
            }
        }
    };
}

```

Build and run the example.

- Press the Spacebar or click to rotate the cube.
- Press the `J` and `K` keys to move the cube.
- Press `P` to pause and unpause the game. While paused, the game should not respond to any input, other than `P`.

## Defining Mappings and Triggers

First you register each mapping name with its trigger(s). Remember the following:

- An input trigger can be a key press or mouse action.
  - For example a mouse movement, a mouse click, or pressing the letter `P` .
- The mapping name is a string that you can choose.
  - The name should describe the action (e.g. "`Rotate`"), and not the trigger. Because the trigger can change.
- One named mapping can have several triggers.
  - For example, the "`Rotate`" action can be triggered by a click and by pressing the spacebar.

Have a look at the code:

1. You register the mapping named "`Rotate`" to the Spacebar key trigger. +
`new KeyTrigger(KeyInput.KEY_SPACE)`).
1. In the same line, you also register "`Rotate`" to an alternative mouse click trigger. +
`new MouseButtonTrigger(MouseInput.BUTTON_LEFT)`
1. You map the `Pause`, `Left`, `Right` mappings to the P, J, K keys, respectively.

```java

    /* You can map one or several inputs to one named mapping. */ 
    inputManager.addMapping("Pause",  new KeyTrigger(KeyInput.KEY_P));
    inputManager.addMapping("Left",   new KeyTrigger(KeyInput.KEY_J));
    inputManager.addMapping("Right",  new KeyTrigger(KeyInput.KEY_K));
    inputManager.addMapping("Rotate", new KeyTrigger(KeyInput.KEY_SPACE),
                                      new MouseButtonTrigger(MouseInput.BUTTON_LEFT));

```

Now you need to register your trigger mappings.

1. You register the pause action to the ActionListener, because it is an "`on/off`" action.
1. You register the movement actions to the AnalogListener, because they are gradual actions.

```java

    /* Add the named mappings to the action listeners. */ 
    inputManager.addListener(actionListener,"Pause");
    inputManager.addListener(analogListener,"Left", "Right", "Rotate");

```

This code goes into the `simpleInitApp()` method. But since we will likely add many keybindings, we extract these lines and wrap them in an auxiliary method, `initKeys()`. The `initKeys()` method is not part of the Input Controls interface – you can name it whatever you like. Just don't forget to call your method from the `initSimpleApp()` method.

## Implementing the Actions

You have mapped action names to input triggers. Now you specify the actions themselves.

The two important methods here are the `ActionListener` with its `onAction()` method, and the `AnalogListener` with its `onAnalog()` method. In these two methods, you test for each named mapping, and call the game action you want to trigger.

In this example, we trigger the following actions:

1. The _Rotate_ mapping triggers the action `player.rotate(0, value, 0)`.
1. The _Left_ and _Right_ mappings increase and decrease the player's x coordinate.
1. The _Pause_ mapping flips a boolean `isRunning`.
1. We also want to check the boolean `isRunning` before any action (other than unpausing) is executed.

```java

  /** Use this listener for KeyDown/KeyUp events */ 
    final private ActionListener actionListener = new ActionListener() {
        @Override
        public void onAction(String name, boolean keyPressed, float tpf) {
            if (name.equals("Pause") && !keyPressed) {
                isRunning = !isRunning;
            }
        }
    };

  /** Use this listener for continuous events */ 
    final private AnalogListener analogListener = new AnalogListener() {
        @Override
        public void onAnalog(String name, float value, float tpf) {
            if (isRunning) {
                if (name.equals("Rotate")) {
                    player.rotate(0, value, 0);
                }
                if (name.equals("Right")) {
                    player.move((new Vector3f(value, 0,0)) ); 
                }
                if (name.equals("Left")) {
                    player.move(new Vector3f(-value, 0,0)); 
                }
            } else {
                System.out.println("Press P to unpause.");
            }
        }
    };
```

You can also combine both listeners into one, the engine will send the appropriate events to each method (onAction or onAnalog).

For example:

```java

private class MyCombinedListener implements AnalogListener, ActionListener {

    @Override
    public void onAction(String name, boolean keyPressed, float tpf) {
        if (name.equals("Pause") && !keyPressed) {
            isRunning = !isRunning;
        }
    }

    @Override
    public void onAnalog(String name, float value, float tpf) {
        if (isRunning) {
            if (name.equals("Rotate")) {
                player.rotate(0, value, 0);
            }
            if (name.equals("Right")) {
                player.move((new Vector3f(value, 0,0)) ); 
            }
            if (name.equals("Left")) {
                player.move(new Vector3f(-value, 0,0)); 
            }
        } else {
            System.out.println("Press P to unpause.");
        }
    }
}
// ...
inputManager.addListener(combinedListener, new String[]{"Pause", "Left", "Right", "Rotate"});

```

It's okay to use only one of the two Listeners, and not implement the other one, if you are not using this type of interaction. In the following, we have a closer look how to decide which of the two listeners is best suited for which situation.

## Analog, Pressed, or Released?

Technically, every input can be either an "`analog`" or a "`digital`" action. Here is how you find out which listener is the right one for which type of input.

Mappings registered to the *AnalogListener* are triggered repeatedly and gradually.

- Parameters:
  1. JME gives you access to the name of the triggered action.
  1. JME gives you access to a gradual value showing the strength of that input. In the case of a keypress that will be the tpf value for which it was pressed since the last frame. For other inputs such as a joystick which give analogue control though then the value will also indicate the strength of the input premultiplied by tpf. For an example on this go to [jMonkeyEngine 3 Tutorial (5) - Hello Input System - Variation over time key is pressed](hello_input_system/timekeypressed.md).

In order to see the total time that a key has been pressed for then the incoming value can be accumulated. The analogue listener may also need to be combined with an action listener so that you are notified when the key is released.

- Example: Navigational events (e.g. Left, Right, Rotate, Run, Strafe), situations where you interact continuously.

Mappings registered to the *ActionListener* are digital either-or actions – "`Pressed`" or "`Released`"? "`On`" or "`Off`"?

- Parameters:
  1. JME gives you access to the name of the triggered action.
  1. JME gives you access to a boolean whether the key is pressed or not.

- Example: Pause button, shooting, selecting, jumping, one-time click interactions.

:::tip
It's very common that you want an action to be only triggered once, in the moment when the key is _released_. For instance when opening a door, flipping a boolean state, or picking up an item. To achieve that, you use an `ActionListener` and test for `… && !keyPressed`. For an example, look at the Pause button code:

```java
      if (name.equals("Pause") && !keyPressed) {
        isRunning = !isRunning;
      }
```
:::

## Table of Triggers

You can find the list of input constants in the files `src/core/com/jme3/input/KeyInput.java`, `JoyInput.java`, and `MouseInput.java`. Here is an overview of the most common triggers constants:
<table>
  <thead>
    <tr>
      <th>Trigger</th>
      <th>Code<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mouse button: Left Click</td>
      <td>MouseButtonTrigger(MouseInput.BUTTON_LEFT)<br /></td>
    </tr>
    <tr>
      <td>Mouse button: Right Click</td>
      <td>MouseButtonTrigger(MouseInput.BUTTON_RIGHT)<br /></td>
    </tr>
    <tr>
      <td>Keyboard: Characters and Numbers</td>
      <td>KeyTrigger(KeyInput.KEY_X)<br /></td>
    </tr>
    <tr>
      <td>Keyboard: Spacebar</td>
      <td>KeyTrigger(KeyInput.KEY_SPACE)<br /></td>
    </tr>
    <tr>
      <td>Keyboard: Return, Enter</td>
      <td>KeyTrigger(KeyInput.KEY_RETURN), +<br />KeyTrigger(KeyInput.KEY_NUMPADENTER)<br /></td>
    </tr>
    <tr>
      <td>Keyboard: Escape</td>
      <td>KeyTrigger(KeyInput.KEY_ESCAPE)<br /></td>
    </tr>
    <tr>
      <td>Keyboard: Arrows</td>
      <td>KeyTrigger(KeyInput.KEY_UP), +<br />KeyTrigger(KeyInput.KEY_DOWN) +<br />KeyTrigger(KeyInput.KEY_LEFT), +<br />KeyTrigger(KeyInput.KEY_RIGHT)<br /></td>
    </tr>
  </tbody>
</table>

:::tip
If you don't recall an input constant during development, you benefit from an IDE's code completion functionality: Place the caret after e.g. `KeyInput.|` and trigger code completion to select possible input identifiers.
:::

## Listening For Joystick Connections

Note: Joystick Connection/Disconnection events are only available in *LWJGL3*.

If your game requires handling the addition and removal of new joystick devices you can subscribe to a joystick connection listener.
This will give you the opportunity to enable joystick movement, pause the game if the joystick is disconnected, change keybindings to mouse/keyboard.

```
inputManager.addJoystickConnectionListener(new JoystickConnectionListener() {
            @Override
            public void onConnected(Joystick joystick) {
                System.out.println("Joystick connected: " + joystick.getName());
            }

            @Override
            public void onDisconnected(Joystick joystick) {
                System.out.println("Joystick Disconnected: " + joystick.getName());
            }
        });
```

## Exercises

1. Add mappings for moving the player (box) up and down with the H and L keys!
1. Modify the mappings so that you can also trigger the up an down motion with the mouse scroll wheel!

:::tip
Use `new MouseAxisTrigger(MouseInput.AXIS_WHEEL, true)`
:::

1. In which situation would it be better to use variables instead of literals for the MouseInput/KeyInput definitions?

```java
int usersPauseKey = KeyInput.KEY_P;
...
inputManager.addMapping("Pause",  new KeyTrigger(usersPauseKey));

```

1. Switch off the flyCam and override the WASD keys.

:::tip
Use [flyCam.setEnabled(false);](../concepts/faq.md#how-do-i-switch-between-third-person-and-first-person-view)
:::

:::important
[Some proposed solutions](solutions.md#hello-input) +
*Be sure to try to solve them for yourself first!*
:::

## Conclusion

You are now able to add custom interactions to your game: You know that you first have to define the key mappings, and then the actions for each mapping. You have learned to respond to mouse events and to the keyboard. You understand the difference between "`analog`" (gradually repeated) and "`digital`" (on/off) inputs.
