# use_own_jme

## How to integrate your own jME3 compile in jMonkeyEngine SDK projects

1. [Download jme3 project](../getting-started/build_jme3_sources_with_netbeans.md)
1. Make your changes
1. Compile jme3 project
1. Go to `"Tools &gt; Libraries"`
1. Press **New Library**
1. Name it "`jme3-modified`"
1. Press **Add Jar/Folder**
1. Select all JAR files from the `dist` dir of the compiled jme3 version
1. Add the `src` folder of the jme3 project in the "`sources`" tab
1. Optionally javadoc in the "`javadoc`" tab
1. Press **OK**
1. **RMB** select your project and choose "`Properties`"
1. Select "`Libraries`" to the left
1. Remove the "`jme3`" library
1. Press **Add Library** and select the "`jme3-modified`" library
