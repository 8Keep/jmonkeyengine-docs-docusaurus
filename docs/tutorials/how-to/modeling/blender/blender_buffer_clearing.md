# Blender Buffer Clearing

Before exporting your Blender models, its is recommended that you clean the buffers of any unneeded `Action`, `Material`, `Texture` or `UV Image`. This is a straight forward process that only takes a few minutes. Failure to do so can lead you into a morass of problems, like having more than one AnimControl, duplicate materials and textures, wasted space from worthless images, just to mention a few potential troubles.

## Material, Texture, UV Image Buffers

1. Open the `UV Image Editor`, `Material Tab` or `Texture Tab`.
1. Select the **Browse** button located next to the material, texture or UV Image name to load the item to be cleared.
1. While holding `Shift` down, click the **X** button, also known as the **Unlink datablock** button, located next to the loaded item. An item that is unlinked will show a `0` before it when viewed by selecting the **Browse** button and will not be saved if you exit Blender.
1. Save your file.
1. From the `Info` header select `"File &gt; Open Recent &gt; Your Saved File"`, to close and re-open your file.

The exception to this rule is the `Linked Action` buffer, for animations, located in the `Dope Sheet Editor`.

## The Linked Action Buffer

1. In the `Dope Sheet Editor`, change the context to `Action Editor`.
1. Click the `Action to be linked` button and select the action you want cleared.
1. Deselect the **F** button to prevent it from saving.
1. Change the editor type from `Dope Sheet` to `NLA Editor`. You will see the action listed.
1. Click the `angle-double-down`  button next to the action to push it into the stack.
1. Click the small start next to the track name.
1. With the mouse inside the `NLA Track List`,  press `X` to delete both the track and strip.
1. Save your file.
1. From the `Info` header, select `"File &gt; Open Recent &gt; Your Saved File"`.
1. Save your file again.
1. From the `Info` header, select `"File &gt; Open Recent &gt; Your Saved File"` again.
1. Change back to the `Dope Sheet Editor`.
1. Click the **Browse Action to be linked** button and you will see only the baked action remains and the buffer is now clear of unwanted actions. Select your action.
1. Save your file.
