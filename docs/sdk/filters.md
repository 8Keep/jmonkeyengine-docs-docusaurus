# jMonkeyEngine SDK: Post-Processor Filters

Filters are used for scene-wide effects such as glow, fog, blur. The SDK lets you create a file storing combinations of filters. You can preview the filter settings on a loaded scene in the SDK. You can load them into your application (add them to the viewPort) to activate your preconfigured set of several filters in one step.

## Creating Filters

![filterexplorer.png](/wiki-assets/docs/sdk/images/filterexplorer.png)

To create a new filter:

1. In the Projects window, right-click Assets→Effects.
1. Select File→New File…
1. Select Filter→Empty FilterPostProcessor File in the New File Wizard.
  - An empty filter file appears in the Assets→Effects directory.
1. Double-click the created file.
  - The file opens in the FilterExplorer window.

## Editing Filters

To add filters or modify existing filters

1. Double-click a j3f file to open it in the FilterExplorer window.
1. Right-click the j3f file's root node to add a filter.
  - Added filters are listed under the filter's root node.
1. Open the Properties window and select a filter in the FilterExplorer. Configure filter options like intensity etc.

View the filter in the SceneComposer to see what you are doing:

## Viewing Filters

![p3wuv.png](/wiki-assets/docs/sdk/images/p3wuv.png)

To see a loaded filter

1. Open a model or scene in the SceneComposer.
1. Double-click a j3f file to open it in the FilterExplorer window.
1. Press the "`show filter`" button in the OpenGL window.

## Loading filters in a game

To load a filter in a game (that is, to add it to your game's viewport), add the following lines to your game's simpleInit() method (or some other place):

```java
FilterPostProcessor processor = (FilterPostProcessor) assetManager.loadAsset("Filters/MyFilter.j3f");
viewPort.addProcessor(processor);
```
