# troubleshooting

## Troubleshooting jMonkeyEngine3 SDK

### Graphics Card Driver

*On Windows and Linux make sure you have the latest driver installed. Make sure its the one supplied by the card manufacturer and not just the &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt;-default one.* On OSX, make sure you have the latest update for your MacOS.

### Stability / Graphics issues

On some Linux and Windows systems, the SDK might perform unstable and quit with native VM crashes or "`x`" errors. There are a few things one can try to remedy those issues.

#### Heavyweight Canvas

First of all there's the new "`OpenGL`" settings page in the SDK global settings where you can enable the "`Heavyweight Canvas`", which solved some issues for some people. The settings panel can be found under `"Tools &gt; Options"` on Windows and Linux and in the main menu (or by pressing Apple-Comma) for MacOSX.

If you cannot start the SDK, edit the file `config/Preferences/com/jme3/gde/core.properties` in the SDK settings folder (see above). If it doesn't exist, create the file including all folders. Add the line `use_lwjgl_canvas=true`. To try OpenGL1 compatibility mode (works for both canvas settings) add `use_opengl_1=true`.

#### Look and Feel

The &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt;-built-in look and feel might cause issues, you can change the LAF by using the appropriate command line switch (or add it to the [app folder]/etc/jmonkeyplatform.conf file, without the "`- -`" prefix).

```

--laf javax.swing.plaf.nimbus.NimbusLookAndFeel

```

or alternatively

```

--laf javax.swing.plaf.metal.MetalLookAndFeel

```

#### Compiz

Compiz on Linux might cause issues, if you set its rendering quality to "`Medium`" these should go away.

- `"Appearance &gt; Set Special effects to &gt; "`Medium`""`

### Updating problems

If you have problems updating the SDK, try deleting all files from `jmonkeyplatform/update/download` and/or `[settings folder]/update/download` depending on your system (see below for the settings folder location).

If you are on Linux, check if the user you run the SDK with has access to the files in `jmonkeyplatform/jdk/bin` and that they are executable.

### Freezing / Performance problems

If the SDK starts to become sluggish and / or slow or you get unexpected freezes of the application, you can try deleting the cache folder at var/cache in the settings folder (see below for the location of the settings folder). Do this while the SDK is not running, then restart the SDK.

### Preferences and Settings

To completely remove and/or reinstall the SDK it is vital that the settings folder is deleted too. The location can be seen through the "`about`" menu and is as following for the different &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt;'s:

- Windows: `C:\Userspass\&lt;username&gt;\AppData\Roaming\.jmonkeyplatform`
- Windows (alt): `C:\Users\&lt;username&gt;\.jmonkeyplatform\`
- MacOSX: `/Users/&lt;username&gt;/Library/Application Support/jmonkeyplatform`
- Ubuntu:  `/home/&lt;username&gt;/.jmonkeyplatform`

### Log

To see or post the error output of the SDK in the forum, you can find the log of the application in the settings folder above too, the file is called `var/log/messages.log`.

### Getting error messages and reporting issues

When an exception happens in the SDK, a small warning sign appears in the lower right corner of the main window. Double-click it to open a window that allows you to see the exception stack trace. When posting about issues in the forum, always post the stack trace along with a description of what happens and how it can be reproduced.

### Specifying the JDK location

You can install another JDK for use with the jMonkey SDK. You then have to specify the location manually.

1. Go to your jMonkeyEngine SDK installation directory.
Mac users right-click jMonkeyApplication.app (which actually is a directory) in the Finder and select "`Show package contents`".
1. Navigate to the `etc` directory.
Mac users navigate to `Contents/Resources/jmonkeyplatform/etc/`.
1. Open the file `jmonkeyplatform.conf` in a text editor.
1. Change the following line and enter the path to the JDK:
```
jdkhome="/path/to/jdk"
```

### Freezing at startup

If you're behind a proxy or special network settings, try :

1. Disable your network connection.
1. Launch jme sdk (may wait 30s/1min for timeout).
1. Go into `"Tools &gt; Options &gt; General"`.
1. Setup "`manual proxy settings`" (for some reason the "`Use System Proxy Settings`" option doesn't work on some Linux distributions)

[Discussion](https://hub.jmonkeyengine.org/t/jme-sdk-stalls-on-startup/30555) of the problem.

### Known Issues

For a list of known issues and possible workarounds see the following [List of known issues on github.]( link:https://github.com/jMonkeyEngine/sdk/issues)

Some issue are imported from the previous googlecode:
[List of old issues on googlecode.](https://code.google.com/archive/p/jmonkeyengine/issues)
