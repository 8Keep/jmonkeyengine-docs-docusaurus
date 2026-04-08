# Fade-in / Fade-out Effect

You can use a fade in/fade out effect to make smooth transitions, for example between game levels. The effect fades in from black to the initialized scene, or fades out from the scene to black.
The effect uses com.jme3.post.FilterPostProcessor and com.jme3.post.filters.FadeFilter.

## Setting up

1. Create one FilterPostProcessor object per application.
1. Create a FadeFilter object.
1. Give the FadeFilter constructor the fade duration in seconds as parameter. If you use the parameter-less constructor, the duration is 1 sec by default.
1. Add the FadeFilter to the FilterPostProcessor.
1. Add the FilterPostProcessor to the default viewPort.

```java

private FilterPostProcessor fpp;
private FadeFilter fade;
public void simpleInitApp() {
  ...
  fpp = new FilterPostProcessor(assetManager);
  fade = new FadeFilter(2); // e.g. 2 seconds
  fpp.addFilter(fade);
  viewPort.addProcessor(fpp);
  ...
}

```

## Fading in and out

Now call the `fade.fadeIn()` and `fade.fadeOut()` methods to trigger the effect.
You can also change the fade duration using `fade.setDuration()`.
