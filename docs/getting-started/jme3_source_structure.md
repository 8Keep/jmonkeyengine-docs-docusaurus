# jMonkeyEngine 3 -- Source Structure

An overview of the source structure of the JME3 project. In order to support both Desktop and Android Java platforms, it was necessary to split the source code into several parts. This wiki page describes the packages and their purpose. Status: Up-to-date for JME3 beta.

## Structure of src directory

You can build jME using the included build.xml script: `ant clean; ant jar; ant run`
When building the sources in a project created with another IDE,  include every folder under `src` in the project as its own separate source root.

### Core
<table>
  <thead>
    <tr>
      <th>Source Package</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>src/core</td>
      <td>The main package. Must always be included, as all other packages depend on it.<br /></td>
    </tr>
    <tr>
      <td>src/core-effects</td>
      <td>Core effects like Water, PSSM etc.<br /></td>
    </tr>
    <tr>
      <td>src/core-data</td>
      <td>Basic material definitions, shaders and fonts that are needed by most jME3 applications.<br /></td>
    </tr>
    <tr>
      <td>src/core-plugins</td>
      <td>Important asset plugins, such as .j3o model loader, .obj loader, font loader, basic image loaders.<br /></td>
    </tr>
    <tr>
      <td>src/desktop</td>
      <td>Must be included if deploying on desktop, applet or web start. *Exclude Android*<br /></td>
    </tr>
    <tr>
      <td>src/android</td>
      <td>Must be included if deploying on the Android platform. *Exclude Desktop*<br /></td>
    </tr>
    <tr>
      <td>src/lwjgl</td>
      <td>LWJGL OpenGL display implementation. *Exclude Android*<br /></td>
    </tr>
  </tbody>
</table>

### Physics
<table>
  <thead>
    <tr>
      <th>Source Package</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>+*+ src/jbullet</td>
      <td>Game Physics Engine, based on the jBullet framework. Desktop only. *Exclude Bullet*<br /></td>
    </tr>
    <tr>
      <td>+*+ src/bullet</td>
      <td>Game Physics Engine, based on the native Bullet framework. Needs jme3-bullet-native or jme3-bullet-native-android (beta) *Exclude jBullet*<br /></td>
    </tr>
    <tr>
      <td>src/bullet-native</td>
      <td>Native Bullet implementation C++ classes. *Exclude jBullet*<br /></td>
    </tr>
    <tr>
      <td>src/jme3-bullet-native-android</td>
      <td>Native libraries needed for bullet (not jbullet) on android.<br /></td>
    </tr>
  </tbody>
</table>

:::note
+*+ Only one of the physics libraries can be used at a time as they replace each other.

- jbullet

or

- bullet
  - with one or both "`natives`" library
    - bullet-native
    - jme3-bullet-native-android
:::

### Plugins and Extra packages
<table>
  <thead>
    <tr>
      <th>Source Package</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>src/ogre</td>
      <td>Ogre3D model and scene loader. Supports skeletal and vertex animation, scene loading, and materials.<br /></td>
    </tr>
    <tr>
      <td>src/xml</td>
      <td>Provides an XML im/exporter.<br /></td>
    </tr>
    <tr>
      <td>src/jogg</td>
      <td>OGG/Vorbis loader to play .ogg sound files.<br /></td>
    </tr>
    <tr>
      <td>src/niftygui</td>
      <td>Support for custom Graphical User Interfaces.<br /></td>
    </tr>
    <tr>
      <td>src/blender</td>
      <td>Blender model importer<br /></td>
    </tr>
    <tr>
      <td>src/networking</td>
      <td>SpiderMonkey networking package<br /></td>
    </tr>
    <tr>
      <td>src/terrain</td>
      <td>Terrain generation tools<br /></td>
    </tr>
    <tr>
      <td>src/vr</td>
      <td>Virtual reality</td>
    </tr>
  </tbody>
</table>

### Tests, Games and Tools
<table>
  <thead>
    <tr>
      <th>Source Package</th>
      <th>Description<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>src/test</td>
      <td>Small sample Applications that demo individual jME3 features. jme3_test-data.jar<br /></td>
    </tr>
    <tr>
      <td>src/test-data</td>
      <td>Data assets (jme3_test-data.jar) required by jme3_test samples.<br /></td>
    </tr>
    <tr>
      <td>src/tools</td>
      <td>Tools and programs that help you use jme3.<br /></td>
    </tr>
  </tbody>
</table>

## Structure of lib directory

JME3 depends on the following JARs and native libraries in the `lib` directory. The JAR libraries must be on the classpath.

:::note
The jME3-*natives*.jar bundles contain the native libraries, those are necessary `.dll`, `.jnilib`, `lib**.so**` files. You do not need to manually include native libraries on the java.library.path! jME3 handles the extraction of natives automatically via the JAR bundles.
:::

- lib/android:
  - android.jar

- lib/bullet:
  - android, jME3-bullet-natives-android.jar, jME3-bullet-natives.jar, jarcontent (natives)

:::note
*Only one version of jme3-jbullet OR jme3-bullet with "`natives`" library can be used.*
:::

- lib/jbullet:
  - asm-all.jar, jbullet.jar, stack-alloc.jar, vecmath.jar

- lib/jogg:
  - j-ogg-oggd.jar, j-ogg-vorbisd.jar

- lib/lwjgl:
  - jME3-lwjgl-natives.jar, jinput.jar, lwjgl.jar

- lib/niftygui:
  - nifty.jar, nifty-javadoc.jar, xmlpull-xpp3.jar, eventbus.jar
  - nifty-default-controls-javadoc.jar, nifty-default-controls.jar,
  - nifty-examples.jar, nifty-examples-javadoc.jar, nifty-style-black.jar

## Structure of jMonkeyEngine3 JARs

After the build is complete (in the `dist` directory), you see that the jMonkeyEngine library is split up over several JAR files. This allows for better separation of the parts for different operating systems, projects etc.
<table>
  <thead>
    <tr>
      <th>JAR file</th>
      <th>Purpose</th>
      <th>External Dependence<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>dist/lib/jME3-core.jar</td>
      <td>Platform-independent core libraries (math, animation, scenegraph, Wavefront OBJ model support, etc)</td>
      <td>None<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-effects.jar</td>
      <td>Core jME3 effects (Water, SSAO etc)</td>
      <td>None<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-desktop.jar</td>
      <td>Desktop PC only jME3 libraries</td>
      <td>None<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-plugins.jar</td>
      <td>Basic import plugins (OgreXML models and j3o XML)</td>
      <td>None<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-blender.jar</td>
      <td>Blender model import plugin (Desktop only)</td>
      <td>None<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-networking.jar</td>
      <td>"`Spidermonkey`" networking library</td>
      <td>None<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-jogg.jar</td>
      <td>J-OGG audio plugin</td>
      <td>j-ogg-vorbisd.jar, j-ogg-oggd.jar<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-terrain.jar</td>
      <td>Terrain system</td>
      <td>None<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-jbullet.jar</td>
      <td>jBullet physics</td>
      <td>jbullet.jar, vecmath.jar, stack-alloc.jar, asm-all-3.1.jar<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-bullet.jar</td>
      <td>Bullet physics (only jBullet *or* Bullet can be used)</td>
      <td>jME3-bullet-natives.jar<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-niftygui.jar</td>
      <td>NiftyGUI support</td>
      <td>nifty.jar, nifty-default-controls.jar, eventbus.jar, xmlpull-xpp3.jar<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-lwjgl.jar</td>
      <td>LWJGL Desktop Renderer</td>
      <td>lwjgl.jar, jME3-lwjgl-natives.jar, jinput.jar<br /></td>
    </tr>
    <tr>
      <td>dist/lib/jME3-android.jar</td>
      <td>Android Renderer</td>
      <td>Android system<br /></td>
    </tr>
  </tbody>
</table>

Optional:

- nifty-examples.jar
- jME3-testdata.jar
- nifty-style-black.jar (default nifty style)

## API Structure

For details see the [javadoc](https://javadoc.jmonkeyengine.org).

## Data File Types
<table>
  <thead>
    <tr>
      <th>Path</th>
      <th>File types</th>
      <th>purpose<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/Common/MatDefs/*/</td>
      <td>.glsllib</td>
      <td>Standard ShaderLibs<br /></td>
    </tr>
    <tr>
      <td>/Common/MatDefs/*/</td>
      <td>.j3md</td>
      <td>Standard Material Definitions<br /></td>
    </tr>
    <tr>
      <td>/Common/Materials/*/</td>
      <td>.j3m</td>
      <td>Standard Material<br /></td>
    </tr>
    <tr>
      <td>/Interface/Fonts/</td>
      <td>.fnt + .png</td>
      <td>Standard Fonts<br /></td>
    </tr>
  </tbody>
</table>

See also: Supported Formats.
