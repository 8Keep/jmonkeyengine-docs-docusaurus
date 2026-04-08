# jMonkeyEngine3 Requirements

This page shows software and hardware requirements from two points of view:

- For the Java developers who create games; and
- For the users (your customers) who play the games that you created.

## For Developers

These are the minimum requirements for developers who create games using the jMonkeyEngine SDK:
<table>
  <thead>
    <tr>
      <th>Operating system</th>
      <th>Mac &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt; X, Windows, Linux<br /></th>
      <th>Memory (JVM heap size)</th>
      <th>++&gt;++ 40 &lt;abbr title="Megabyte"&gt;MB&lt;/abbr&gt; +++++ memory for assets.<br /></th>
      <th>CPU</th>
      <th>++&gt;++ 1 &lt;abbr title="Gigahertz"&gt;GHz&lt;/abbr&gt;<br /></th>
      <th>Graphic card</th>
      <th>AMD/ATI Radeon 9500, NVIDIA GeForce 5 FX, Intel GMA 4500, or better supporting OpenGL 2.0 or better. (native libraries are included in download) +<br />Mac OS, only OpenGL 3.2 is available; You need to specify OpenGL 3.2 in AppSettings, you can’t use OpenGL 2.0.<br /><br />All platforms: +<br />If you use the  LWJGL3 library (LWJGL2 is default), you need a specific launch argument (-XstartOnFirstThread), and thus can’t use any launchers not using the main thread. Because of this, calls to app.start() hang as it uses the current thread.<br /><br />See the forum post [LWJGL v2 versus v3](https://hub.jmonkeyengine.org/t/lwjgl-v2-versus-v3/42125) for additional details.<br /><br /></th>
      <th>Java Development Kit</th>
      <th>JDK 7 or higher +<br />Your development team gets the Java Development Kit for free from [http://www.java.com](http://www.java.com). +<br />Mac &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt;, see [apple.com](http://support.apple.com/kb/DL1421). +<br />At least intermediate Java experience is required.<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

We recommend using the [SDK](../sdk/sdk.md) as game development environment (IDE). However, any third-party Java IDE (and even a text editor and the commandline) will work fine together with the jME framework if you are experienced with the tool of your choice. For requirements of other IDEs, please see the third party's documentation.

## For Users

These are the minimum requirements for your customers, users who play the games that were created using the jMonkeyEngine3 framework:
<table>
  <thead>
    <tr>
      <th>Operating system</th>
      <th>Mac &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt; X, Windows, Linux<br /></th>
      <th>Memory (JVM heap size)</th>
      <th>++&gt;++ 10 &lt;abbr title="Megabyte"&gt;MB&lt;/abbr&gt; +++++ memory for assets. (models, textures, sounds, etc, of a particular game)<br /></th>
      <th>CPU</th>
      <th>++&gt;++ 1 &lt;abbr title="Gigahertz"&gt;GHz&lt;/abbr&gt;<br /></th>
      <th>Graphic card</th>
      <th>AMD/ATI Radeon 9500, NVIDIA GeForce 5 FX, Intel GMA 4500, or better supporting OpenGL 2.0 or better. (native libraries are included in download) +<br />Mac OS requires OpenGL 3.2.<br /></th>
      <th>[Android Devices](https://hub.jmonkeyengine.org/t/does-my-phone-meet-the-requirements-necessary-to-run-jmonkeyengine-3/17231)</th>
      <th>(For mobile games only) Android 2.2 &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt;, graphics card supporting OpenGL 2<br /></th>
      <th>Java Runtime</th>
      <th>Java 5 or higher. +<br />The Java Virtual Machine (JVM) is required to run jME games. +<br />The JVM is often preinstalled, if not, your users get it for free from [http://www.java.com](http://www.java.com). +<br />Mac &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt;, see [apple.com](http://support.apple.com/kb/DL1421).<br /></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

Make sure to inform your users about these requirements.
