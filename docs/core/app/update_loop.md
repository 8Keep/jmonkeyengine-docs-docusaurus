# Main Update Loop

Extending your application from [com.jme3.app.SimpleApplication](simpleapplication.md) provides you with an update loop. This is where you implement your game logic (game mechanics).

Some usage examples: Here you remote-control NPCs (computer controlled characters), generate game events, and respond to user input.

To let you see the main update loop in context, understand that the SimpleApplication does the following:

- *Initialization* – Execute `simpleInitApp()` method once.
- *Main Update Loop*
  1. Input listeners respond to mouse clicks and keyboard presses – [Input handling](../input/input_handling.md)
  1. Update game state:
    1. Update overall game state – Execute [Application States](state/application_states.md)
    1. User code update – Execute `simpleUpdate()` method
    1. Logical update of entities – Execute [Custom Controls](../scene/control/custom_controls.md)

  1. Render audio and video
    1. [Application States](state/application_states.md) rendering.
    1. Scene rendering.
    1. User code rendering – Execute `simpleRender()` method.

  1. Repeat loop.

- *Quit* – If user requests `exit()`, execute `cleanup()` and `destroy()`.
The jME window closes and the loop ends.

## Usage

In a trivial [SimpleApplication](simpleapplication.md) (such as a [Hello World tutorial](../../tutorials/beginner/beginner.md)), all code is either in the `simpleInitApp()` (initialization) or `simpleUpdate()` (behaviour) method – or in a helper method/class that is called from one of these two. This trivial approach will make your main class very long, hard to read, and hard to maintain. You don't need to load the whole scene at once, and you don't need to run all conditionals tests all the time.

It's a best practice to modularize your game mechanics and spread out initialization and update loop code over several Java objects:

- Move modular code blocks from the `simpleInitApp()` method into [AppStates](state/application_states.md). Attach AppStates to initialize custom subsets of "`one`" dungeon, and detach it when the player exits this "`dungeon`".
Examples: Weather/sky audio and visuals, physics collision shapes, sub-rootnodes of individual dungeons including dungeon NPCs, etc.
- Move modular code blocks from the `simpleUpdate()` method into the update loops of [Custom Controls](../scene/control/custom_controls.md) to control individual entity behavior (NPCs), and into the update method of [AppStates](state/application_states.md) to control world events.
Examples: Weather behaviour, light behaviour, physics behaviour, individual NPC behaviour, trap behaviour, etc.
