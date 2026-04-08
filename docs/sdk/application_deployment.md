# jMonkeyEngine SDK: Application Deployment

After you have written and tested your game, you want to brand it and distribute it to your users. If you use the build script provided by the  jMonkeyEngine SDK's BaseGame, you have the following deployment options:

- Desktop application (.JAR)
- WebStart from &lt;abbr title="Uniform Resource Locator"&gt;URL&lt;/abbr&gt; (.JNLP + .JAR)
- Applet in web browser (.JNLP + .JAR)
- Android mobile device (.APK)
- iOS mobile device (XCode project)

## Requirements

Since JAR files are platform independent, your customers can play your jMonkeyEngine application on Windows, Mac &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt;, or Linux. The only requirement is that the user has the correct version of the free Java Runtime (or browser plugin) installed. For more information see [http://java.com](http://java.com).

## Branding

![jmonkey-branding.png](/wiki-assets/docs/sdk/images/jmonkey-branding.png)

Make your game unique and recognizable:

1. Open your game project in the SDK's "`Projects`" window.
1. **RMB** click the project and open the "`Properties`"
1. Open the "Properties &gt; Application" section. Here you configure your branding:
  1. Title: Enter the game's name
  1. Vendor: Enter your name (the development team)
  1. Description: Write one line why your game is the coolest ever `wink`
  1. Homepage: Enter your web &lt;abbr title="Uniform Resource Locator"&gt;URL&lt;/abbr&gt;, so your fans can find you
  1. Splashscreen: Browse to a cool screenshot that will be displayed while the game loads.
1. Click OK.
1. Clean and Build.

Your executables are now branded.

TODO: where does this info actually show up?

## Creating the Distributable

![deploy_android.png](/wiki-assets/docs/sdk/images/deploy_android.png)

When you run the build script provided by the jMonkeyEngine SDK, it automatically compiles your classes, libraries, and assets. It creates a `dist` directory in your project directory which contains the executable JAR and a directory with libraries.

In the simplest case, you zip up the `dist` directory and distribute it to your customers. Companies often have additional tools to create executables and installers.

Here are your deployment options in detail:

### Desktop Application (JAR)

The JAR file is the most common deployment method for Java desktop applications. The user downloads the executable JAR file to his machine and runs it to start the game.

1. **RMB** click your project and open the "`Project Properties`".
1. In the "Application &gt; Web Start" category, make sure the box "`Enable Web Start`" is not checked. Click **OK**.
1. **RMB** click your project and "`Clean and Build`".
1. If the build succeeds you see a line similar to 
`Building jar: /home/joe/jMonkeyPlatform/MySuperTestGame/dist/MySuperTestGame.jar`
this means the executable JAR has been generated successfully in your project directory.
1. Zip up the `dist` directory and distribute it to your users. Make sure to keep the `lib` directory in it!

Most operating systems execute a JAR when users double-click on it, but you can also create a launcher.

### Desktop Executables (.EXE, .APP, .JAR)

jMonkeyEngine SDK allows you to create launchers for different desktop platforms, like an .exe file for Windows systems, an Application for MaxOSX and a launcher for Linux systems.

1. **RMB** click your project and open the "`Project Properties`".
1. In the "Application &gt; Desktop" category, select the checkboxes for the platforms you want to distribute to.
1. Click **OK**.

A `resources` folder in your project folder will be created that contains the template icons and settings files for each selected platform. If you change one of them, de-selecting the deployment for that platform will not delete this resource file anymore and it will not be overwritten when you re-enable deployment for that platform.

When you build your project, zip files for each selected platform will be created in the `dist` folder that contain all that is needed to run your application on that platform.

### Web Start (.JNLP)

Web Start allows your users to start your application by simply clicking a link that you provide, for example in a button on your web page. The browser downloads the JAR file and then automatically runs your game in an extra window. The only requirement is that the user's browser has the Java plugin installed. This is a very user-friendly way for your customers to play your game without any extra steps to install it. Optionally, you can set it up so the file is saved to their desktop and can be restarted later, so they do not need to be online to play.

1. **RMB** click your project and open the "`Project Properties`".
  1. In the "Application &gt; Web Start" category, check the box to "`Enable Web Start`".
  1. Check the box to make the application self-signed.
  1. Optionally, check the box to allow offline use.
  1. Make sure `Application Descriptor` is activated. Click OK.

1. **RMB** click your project and Clean and Build. The `dist` directory is generated.
1. Upload the contents of the `dist` directory to a public http server.
1. Either edit the sample launch.html file, or simply add a standard link (A HREF) pointing to your .jnlp file to one of your web pages.
1. Tell your users to open your page in a web browser, and click the link to webstart the application.

Look at the sample launch.html, you can have any custom content around the link. Keep a copy of your launcher file because the jMonkeyEngine SDK will always regenerate its default launch.html.
Also, see this [demo video](http://www.youtube.com/watch?v=oZnssg8TBWQ) on creating WebStarts.

### Browser Applet

A browser Applet is a Java application that runs in the web browser while the user is visiting your web page. The only requirement is that the user's browser has the Java plugin installed. There is no installation step, the user can play right away in the browser. The user will not be able to save the game to his harddrive, nor can he play offline.

These instructions assume that you have already written a game that you want to turn into an Applet. As opposed to other jME3 games, Applets cannot capture the mouse for navigation, so the camera will be switched to dragToRotate mode. The jMonkeyEngine SDK and the included build script already contain what you need.

#### To Turn a Project Into an Applet

1. **RMB** click your project and open the "`Project Properties`".
  1. In the "Application &gt; Applet" category, check the box to enable "`Applet`" creation.
  1. Change the applet width and height as you want it.
  1. Click **OK**.

1. **RMB** click your project and "`Clean and Build`".

The `dist/Applet` directory now contains all the files necessary for the game to run as Applet. To test the Applet-based game, run the project in the jMonkeyEngine SDK.

#### To Deploy the Game as Applet

1. Edit the `dist/Applet/run-applet.html` file in anyway you like. Just keep the Applet code.
1. Upload the contents of the `dist/Applet` directory to a public http server.
1. Access the run-applet.html file using a web browser
1. Click the link to web-start your application.

#### To Troubleshoot Applets

- Open the Java console for error messages.
- Depending on your settings, the browser caches the applet, the html page, and/or the jnlp file, even after you have cleaned and built the project. Make sure to empty the browser cache.

### Android Mobile Device

You can set the jMonkeyEngine SDK to build an executable for Android mobile platforms.

Learn more about [Android Support](android.md) here.

### iOS Device

You can set the jMonkeyEngine SDK to build an executable for iOS platforms. A Mac with XCode installed is needed.

Learn more about [iOS Support](ios.md) here.

## Tip: Switching Build Configurations

The jMonkeyEngine SDK has a Run Configuration menu in the toolbar. Use it to save your various sets of Project Property configurations, and switch between them.

1. Click the `Set Project Configuration` popup in the toolbar and choose Customize.
1. The Project Properties Run section opens. Under Configuration, click New.
1. Name the saved configuration, for instance "`my webstart`" vs "`my desktop app`", or "`development`" vs "`deployment`". Click **OK**.
1. Make sure the new config is selected in the `Set Project Configuration` popup above the editor.
1. Make changes to the Project Properties as described above.

Now you can use the `Set Project Configuration` popup menu to switch between your run/build configurations.

## Tip: Reduce Distribution File Size

There may be several parts of the full jMonkeyEngine library that you do not even use in your application. You should leave out the corresponding libraries from your distribution.

To remove unused libraries:

1. **RMB** click your project and select "`Properties`"
1. Select "`Libraries`" on the left
1. Select the "`jme3-libraries`" entry and press "`remove`".
This library package contains *all* libraries for jME3 and is quite large.
1. Press the "`Add Library`" button
1. Select the "`jme3-libraries-lwjgl-minimum`" library
1. Add other jME3 libraries in the same way depending which features you use:
jme3-libraries-gui, jme3-libraries-physics, jme3-libraries-video, etc.
1. Click **OK**.
1. Clean, Build and Run the project and make sure you have not missed anything.
