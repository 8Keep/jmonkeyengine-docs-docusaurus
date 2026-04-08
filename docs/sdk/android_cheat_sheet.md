# android

## Changing the Name of Your APK/Application:

1. Open your project’s properties and navigate to Application
1. Update the title

This has no real effect, however it keeps continuity throughout your app. Actually, this likely renamed the window created to display your app. So, now go change the actual name of your APK:

1. Select `File View` in the left pane of the SDK.
1. Navigate to the `mobile/res/values` directory and open the `strings.xml` file.
1. There should be a string tag with the following key pair: name="app_name".
1. Replace `MyGame` with your app`'s name and save the file.
1. In `File view`, navigate to nbproject and open the `project.properties` file.
1. Edit the value of `application.title` to reflect your game`'s name (unless step 1/2 above altered this for you).

## Changing the APK Icon:

1. Under the `File view` of your project navigate to `mobile/res` and add a `drawable` folder if one does not exist.
1. Add your icon file (png).
1. Open the Android Manifest file and add the following to your application tag:

`android:icon="@drawable/&lt;ICON FILE NAME WITHOUT EXTENSION&gt;"`

1. If you would like multiple size icons, add the following folders:

```
drawable-hdpi (should contain the icon named the same at 72×72 pixels)\\
drawable-ldpi (should contain the icon named the same at 36×36 pixels)\\
drawable-mdpi (should contain the icon named the same at 48×48 pixels)\\
drawable-xhdpi (should contain the icon named the same at 96×96 pixels)\\
```

## Adding a Splash Screen to your app:

1. Open `Android Main Activity`, either through the `Important Files` list in `Project view` or in the `File view` under `mobile/src/&lt;package name&gt;` directory.
1. Add the following line to the `MainActivity` method:

`splashPicID = R.drawable.&lt;IMAGE NAME WITHOUT EXTENSION&gt;;`

1. Add the image to the `mobile\res\drawable` directory.

## Compiling Google Play Services and Adding it to Your Project:

First get the api:

1. Download the google play services add-on through the SDK Manager under Extras (named Google Play services).
1. Copy the directory from where you downloaded it to another location (like JME Projects Folder).

Compile the jar file for use with your project:

1. In the directory you copied, there is an android project file.
1. In JME`'s IDE, open this project
1. In the General section of the project properties, there is a list of potential Android target platforms. Select the one you are using for your project by clicking on the list (this is not intuitive at all, as the list looks like nothing more than info… not selectable items).
1. Under the Library section, click the checkbox that is labeled:
- [*] Is Library
1. Click **Ok** and then Clean & Build this project.

This will compile the play services all proper like so you can add it to your project. Now, for that step:

1. Open your project’s properties.
1. In the Libraries section, click the **Add JAR/folder** button.
1. Find and add the jar you compiled above. This can be found in:

`&lt;COPIED DIR&gt;\libproject\google-play-services_lib\libs\google-play-services.jar`

1. Modify your Android Manifest by adding the following tags under application:

`&lt;meta-data android:name="com.google.android.gms.games.APP_ID"
android:value="@string/app_id" /&gt;
&lt;meta-data android:name="com.google.android.gms.version"
android:value="@integer/google_play_services_version"/&gt;`
1. Add the following tag to your mobile/res/values/integers.xml file (create it if it doesn’t exist):

`&lt;integer name="google_play_services_version"&gt;4323000&lt;/integer&gt;`
1. Clean & Build your project

## Adding Play Games Services to Your Project:

1. Download the project from:

[https://github.com/playgameservices/android-samples](https://github.com/playgameservices/android-samples)
1. In the following directory, you find java files you will need to add to your project:

```
<DOWNLOAD DIR>\android-samples-master\BasicSamples\libraries\BaseGameUtils\src\main\java\com\google\example\games\basegameutils\\
Grab GameHelper.java and GameHelperUtil.java and add them to the directory you projects Main Activity is in\\
```

1. In the following directory, you find a resource file you will need to add to your project:

```
<DOWNLOAD DIR>\android-samples-master\BasicSamples\libraries\BaseGameUtils\src\main\res\values\\
Grab the gamehelper_strings.xml into your mobile/res/values folder\\
```

1. Add the following jar from the Android SDK folder to your project as a library:

```
<ANDROID SDK INSTALL DIR>\adt-bundle-windows-x86_64-20131030\sdk\extras\android\support\v4\android-support-v4.jar\\
```

And this is the basics for setting this up.

## Adding AdMob Support to Your Project:

1. Open your Android Manifest and add the following tag update the application tag:

`&lt;activity android:name="com.google.android.gms.ads.AdActivity" android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|uiMode|screenSize|smallestScreenSize"/&gt;`
1. After the application tag, add the following tags:

`&lt;uses-permission android:name="android.permission.INTERNET"/&gt;
&lt;uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/&gt;`
1. In the onCreate method of your Main Activity, add the following snippet (configure however you like):

```
adView = new AdView(this);
adView.setAdSize(AdSize.FULL_BANNER);
adView.setAdUnitId("<WHATEVER AD UNIT ID YOU ARE ASSIGNED THROUGH THE GOOGLE DEV CONSOLE>");
adView.buildLayer();
LinearLayout ll = new LinearLayout(this);
ll.setGravity(Gravity.BOTTOM);
ll.addView(adView);
addContentView(ll, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT));
```

## Communication Between your Application & Main Activity:

1. Create an interface named something along the lines of `JmeToHarness.java`.
1. Open your `Android Main Activity` and implement this interface.
1. In `Main.java` of your Application, add the following:

```
 JmeToHarness harness;
 public JmeToHarness getHarness() {
   return this.harness;
 }
 public void setHarnessListener(JmeToHarness harness) {
    this.harness = harness;
 }

```

1. Add the following snippet to the onCreate method of your Android Main Activity:

```
if (app != null)
    ((Main)app).setHarnessListener(this);

```

1. Add error handling if you want it.

This bit is ultra useful for calling AdMob changes and Play Games methods (like updating achievements, leader boards, etc, etc)

EDIT: Keep this as generic as you possibly can as it should plug & play with iOS & Applets if you keep that in mind. Google Play Services/Play Games Services works for all of the above.

## Changing the Package Name After Project Creation:

1. Open the project properties of your Application
1. Navigate to `"Application &gt; Android"` and edit the package name.

This does absolutely nothing, but help with consistency.

So, to actually change the package name, you will want to:

1. Open the `Android Manifest`
1. Edit the manifest tag key pair: `package="&lt;THE NEW PACKAGE NAME&gt;"`
1. In `File view`, navigate to nbproject and open the `project.properties` file.
1. Edit the value of `mobile.android.package`.

Take a moment or 4 to navigate through the directory structure in file view and remove any artifacts left from the previous package name build. Alternately, you can run `Clean` on the project prior to updating the package name.
