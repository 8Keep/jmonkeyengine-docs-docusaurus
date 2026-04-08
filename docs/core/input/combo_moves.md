# Combo Moves

The ComboMoves class allows you to define combinations of inputs that trigger special actions. Entering an input combo correctly can bring the player incremental rewards, such as an increased chance to hit, an increased effectiveness, or decreased change of being blocked, whatever the game designer chooses. [More background info](http://en.wikipedia.org/wiki/Combo_%28video_gaming%29)

Combos are usually a series of inputs, in a fixed order: For example a keyboard combo can look  like: "`press`" Down, then Down+Right together, then Right.

Usage:

1. Create input triggers
1. Define combos
1. Detect combos in ActionListener
1. Execute combos in update loop

Copy the two classes ComboMoveExecution.java and ComboMove.java into your application and adjust them to your package paths.

## Example Code

- [TestComboMoves.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/input/combomoves/TestComboMoves.java)
- [ComboMoveExecution.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/input/combomoves/ComboMoveExecution.java) ← required
- [ComboMove.java](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/jme3-examples/src/main/java/jme3test/input/combomoves/ComboMove.java) ← required

## Create Input Triggers

First you [define your game's inputs](input_handling.md) as you usually do: Implement the com.jme3.input.controls.ActionListener interface for your class, and add triggers mappings such as com.jme3.input.controls.KeyTrigger and com.jme3.input.KeyInput.

For example:

```java

inputManager.addMapping("Left",    new KeyTrigger(KeyInput.KEY_LEFT));
inputManager.addMapping("Right",   new KeyTrigger(KeyInput.KEY_RIGHT));
inputManager.addMapping("Up",      new KeyTrigger(KeyInput.KEY_UP));
inputManager.addMapping("Down",    new KeyTrigger(KeyInput.KEY_DOWN));
inputManager.addMapping("Attack1", new KeyTrigger(KeyInput.KEY_SPACE));
...
inputManager.addListener(this, "Left", "Right", "Up", "Down", "Attack1");

```

## Define Combos

For each of  your combo moves, you specify the series of inputs that will trigger it. The order in which you define them is the order the player has to press them for the step to be recorded. When all steps have been recorded, the combo is triggered.

The following example shows how a fireball combo move is triggered by pressing the navigation keys for "`down, down+right, right`", in this order.

```java

ComboMove fireball = new ComboMove("Fireball");
fireball.press("Down").notPress("Right").done();
fireball.press("Right", "Down").done();
fireball.press("Right").notPress("Down").done();
fireball.notPress("Right", "Down").done();
fireball.setUseFinalState(false);

```

Also create a ComboMoveExecution object for each ComboMove. You need it later to execute the detected combo.

```java

ComboMoveExecution fireballExec = new ComboMoveExecution(fireball);

```

### ComboMove Class Methods

Use the following ComboMove methods to specify the combo:
<table>
  <thead>
    <tr>
      <th>ComboMove Method</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>press("`A`").done(); +press("`A`","`B`").done();</td>
      <td>Combo step is recorded if A is entered. +Combo step is recorded if A and B are entered simultaneously.<br /></td>
    </tr>
    <tr>
      <td>notPress("`A`").done(); +notPress("`A`","`B`").done();</td>
      <td>Combo step is recorded if A is released. +Combo step is recorded if A and B are both released.<br /></td>
    </tr>
    <tr>
      <td>press("`A`").notPress("`B`").done();</td>
      <td>Combo step is recorded if A is entered, and not B<br /></td>
    </tr>
    <tr>
      <td>press("`A`").notPress("`B`").timeElapsed(0.11f).done();</td>
      <td>Combo step is recorded a certain time after A and not B is entered. +etc, etc …<br /></td>
    </tr>
    <tr>
      <td>setPriority(0.5f);</td>
      <td>If there is an ambiguity, a high-priority combo will trigger instead of a low-priority combo. This prevents that a similar looking combo step "`hijacks`" another Combo. Use only once per ComboMove.<br /></td>
    </tr>
    <tr>
      <td>setUseFinalState(false); +setUseFinalState(true);</td>
      <td>This is the final command of the series. +False: Do not wait on a final state, chain combo steps. (?) +True: This is the final state, do not chain combo steps. (?)<br /></td>
    </tr>
  </tbody>
</table>

The `press()` and `notPress()` methods accept sets of Input Triggers, e.g. `fireball.press("`A`","`B`","`C`").done()`.

The following getters give you more information about the game state:
<table>
  <thead>
    <tr>
      <th>ComboMove Method</th>
      <th>Usage<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>getCastTime()</td>
      <td>Returns the time since the last step has been recorded. (?)<br /></td>
    </tr>
    <tr>
      <td>getMoveName()</td>
      <td>Returns the string of the current combo<br /></td>
    </tr>
    <tr>
      <td>getPriority()</td>
      <td>Returns the priority of this move<br /></td>
    </tr>
  </tbody>
</table>

## Detect Combos in ActionListener

Now that you have specified the combo steps, you want to detect them. You do that in the onAction() method that you get from the ActionListener interface.

Create a HashSet `pressMappings` to track currently pressed mappings, and a ComboMove object `currentMove` to track the current move.

We also track the cast time of a combo to determine if it has timed out (see update loop below).

```java

private HashSet<String> pressedMappings = new HashSet<String>();
private ComboMove currentMove = null;
private float currentMoveCastTime = 0;
private float time = 0;
...

public void onAction(String name, boolean isPressed, float tpf) {
    // Record pressed mappings
    if (isPressed){
        pressedMappings.add(name);
    }else{
        pressedMappings.remove(name);
    }

    // The pressed mappings have changed: Update ComboExecution objects
    List<ComboMove> invokedMoves = new ArrayList<ComboMove>();
    if (fireballExec.updateState(pressedMappings, time)){
        invokedMoves.add(fireball);
    }
    // ... add more ComboExecs here...

    // If any ComboMoves have been successfully triggered:
    if (invokedMoves.size() > 0){
        // identify the move with highest priority
        float priority = 0;
        ComboMove toExec = null;
        for (ComboMove move : invokedMoves){
            if (move.getPriority() > priority){
                priority = move.getPriority();
                toExec = move;
            }
        }
        if (currentMove != null && currentMove.getPriority() > toExec.getPriority()){
            return; // skip lower-priority moves
        }

        // If a ComboMove has been identified, store it in currentMove
        currentMove = toExec;
        currentMoveCastTime = currentMove.getCastTime();
    }
}

```

## Execute Combos in the Update Loop

Now that you have detected the current move, you want to execute it. You do that in the update loop.

```java

@Override
public void simpleUpdate(float tpf){
    time += tpf;
    fireballExec.updateExpiration(time);
    // ... update more ComboExecs here....

    if (currentMove != null){
        currentMoveCastTime -= tpf;
        if (currentMoveCastTime <= 0){
            System.out.println("THIS COMBO WAS TRIGGERED: " + currentMove.getMoveName());
            // TODO: for each combo, implement special actions here
            currentMoveCastTime = 0;
            currentMove = null;
        }
    }
}
```

Test `currentMove.getMoveName()` and proceed to call methods that implement any special actions and bonuses. This is up to you and depends individually on your game.

## Why Combos?

Depending on the game genre, the designer can reward the players' intrinsic or extrinsic skills:

- (intrinsic:) RPGs typically calculate the success of an attack from the character's in-game training level: The player plays the role of a character whose skill level is defined in numbers. RPGs typically do not offer any Combos.
- (extrinsic:) Sport and fighter games typically choose to reward the player's "`manual`" skills: The success of a special move solely depends on the player's own dexterity. These games typically offer optional Combos.
