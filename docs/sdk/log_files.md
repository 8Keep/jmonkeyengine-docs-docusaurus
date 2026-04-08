# jMonkeyEngine SDK: Log Files

You find the jMonkeyEngine SDK log file in `/dev/var/log/messages.log` in the jMonkeyEngine SDK preferences folder. You can learn the location of the preferences folder in the "`About`" screen of the jMonkeyEngine SDK under the label *Userdir*.

- Windows: `C:\Documents and Settings\YOUR_NAME\.jmonkeyplatform\`
- Linux: `/home/YOUR_NAME/.jmonkeyplatform/`
- Mac &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt;: `/Users/YOUR_NAME/Library/Application Support/jmonkeyplatform/`

The message log contains all paths and [capabilities](../tutorials/how-to/java/read_graphic_card_capabilites.md) used in your development system, and also warnings, e.g. if a plugin crashed.

## Example Log

```

>Log Session: Saturday, September 24, 2011 10:45:30 AM CEST
>System Info:
  Product Version         = jMonkeyPlatform Alpha-4
  Operating System        = Mac OS X version 10.6.8 running on i386
  Java; VM; Vendor        = 1.6.0_26; Java HotSpot(TM) Client VM 20.1-b02-384; Apple Inc.
  Runtime                 = Java(TM) SE Runtime Environment 1.6.0_26-b03-384-10M3425
  Java Home               = /System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
  System Locale; Encoding = de_DE (jmonkeyplatform); MacRoman
  Home Directory          = /Users/joemonkey
  Current Directory       = /
  User Directory          = /Users/joemonkey/Library/Application Support/jmonkeyplatform/dev
  Installation            = /Applications/jmonkeyplatform.app/Contents/Resources/jmonkeyplatform/jmonkeyplatform
  ...

```
