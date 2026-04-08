# jMonkeyEngine 3 -- Source Structure

An overview of the source structure of the JME3 project. In order to support both Desktop and Android Java platforms, it was necessary to split the source code into several parts. This wiki page describes the packages and their purpose. Status: Up-to-date for JME3 beta.

## Structure of src directory

You can build jME using the included build.xml script: `ant clean; ant jar; ant run`
When building the sources in a project created with another IDE,  include every folder under `src` in the project as its own separate source root.

### Core
| Source Package |
| --- |
| Description<br /> |
| src/core |
| The main package. Must always be included, as all other packages depend on it.<br /> |
| src/core-effects |
| Core effects like Water, PSSM etc.<br /> |
| src/core-data |
| Basic material definitions, shaders and fonts that are needed by most jME3 applications.<br /> |
| src/core-plugins |
| Important asset plugins, such as .j3o model loader, .obj loader, font loader, basic image loaders.<br /> |
| src/desktop |
| Must be included if deploying on desktop, applet or web start. *Exclude Android*<br /> |
| src/android |
| Must be included if deploying on the Android platform. *Exclude Desktop*<br /> |
| src/lwjgl |
| LWJGL OpenGL display implementation. *Exclude Android*<br /> |

### Physics
| Source Package |
| --- |
| Description<br /> |
| +*+ src/jbullet |
| Game Physics Engine, based on the jBullet framework. Desktop only. *Exclude Bullet*<br /> |
| +*+ src/bullet |
| Game Physics Engine, based on the native Bullet framework. Needs jme3-bullet-native or jme3-bullet-native-android (beta) *Exclude jBullet*<br /> |
| src/bullet-native |
| Native Bullet implementation C++ classes. *Exclude jBullet*<br /> |
| src/jme3-bullet-native-android |
| Native libraries needed for bullet (not jbullet) on android.<br /> |

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
| Source Package |
| --- |
| Description<br /> |
| src/ogre |
| Ogre3D model and scene loader. Supports skeletal and vertex animation, scene loading, and materials.<br /> |
| src/xml |
| Provides an XML im/exporter.<br /> |
| src/jogg |
| OGG/Vorbis loader to play .ogg sound files.<br /> |
| src/niftygui |
| Support for custom Graphical User Interfaces.<br /> |
| src/blender |
| Blender model importer<br /> |
| src/networking |
| SpiderMonkey networking package<br /> |
| src/terrain |
| Terrain generation tools<br /> |
| src/vr |
| Virtual reality |

### Tests, Games and Tools
| Source Package |
| --- |
| Description<br /> |
| src/test |
| Small sample Applications that demo individual jME3 features. jme3_test-data.jar<br /> |
| src/test-data |
| Data assets (jme3_test-data.jar) required by jme3_test samples.<br /> |
| src/tools |
| Tools and programs that help you use jme3.<br /> |

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
| JAR file |
| --- |
| Purpose |
| External Dependence<br /> |
| dist/lib/jME3-core.jar |
| Platform-independent core libraries (math, animation, scenegraph, Wavefront OBJ model support, etc) |
| None<br /> |
| dist/lib/jME3-effects.jar |
| Core jME3 effects (Water, SSAO etc) |
| None<br /> |
| dist/lib/jME3-desktop.jar |
| Desktop PC only jME3 libraries |
| None<br /> |
| dist/lib/jME3-plugins.jar |
| Basic import plugins (OgreXML models and j3o XML) |
| None<br /> |
| dist/lib/jME3-blender.jar |
| Blender model import plugin (Desktop only) |
| None<br /> |
| dist/lib/jME3-networking.jar |
| "`Spidermonkey`" networking library |
| None<br /> |
| dist/lib/jME3-jogg.jar |
| J-OGG audio plugin |
| j-ogg-vorbisd.jar, j-ogg-oggd.jar<br /> |
| dist/lib/jME3-terrain.jar |
| Terrain system |
| None<br /> |
| dist/lib/jME3-jbullet.jar |
| jBullet physics |
| jbullet.jar, vecmath.jar, stack-alloc.jar, asm-all-3.1.jar<br /> |
| dist/lib/jME3-bullet.jar |
| Bullet physics (only jBullet *or* Bullet can be used) |
| jME3-bullet-natives.jar<br /> |
| dist/lib/jME3-niftygui.jar |
| NiftyGUI support |
| nifty.jar, nifty-default-controls.jar, eventbus.jar, xmlpull-xpp3.jar<br /> |
| dist/lib/jME3-lwjgl.jar |
| LWJGL Desktop Renderer |
| lwjgl.jar, jME3-lwjgl-natives.jar, jinput.jar<br /> |
| dist/lib/jME3-android.jar |
| Android Renderer |
| Android system<br /> |

Optional:

- nifty-examples.jar
- jME3-testdata.jar
- nifty-style-black.jar (default nifty style)

## API Structure

For details see the [javadoc](https://javadoc.jmonkeyengine.org).

## Data File Types
| Path |
| --- |
| File types |
| purpose<br /> |
| /Common/MatDefs/*/ |
| .glsllib |
| Standard ShaderLibs<br /> |
| /Common/MatDefs/*/ |
| .j3md |
| Standard Material Definitions<br /> |
| /Common/Materials/*/ |
| .j3m |
| Standard Material<br /> |
| /Interface/Fonts/ |
| .fnt + .png |
| Standard Fonts<br /> |

See also: Supported Formats.
