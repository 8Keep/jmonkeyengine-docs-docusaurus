# Open Game Finder

The Open Game Finder (OGF) by Mark Schrijver can be plugged into any Java game. OGF enables you to find other people playing the same multiplayer game, and join them.

- Homepage: [https://code.google.com/archive/p/open-game-finder/](https://code.google.com/archive/p/open-game-finder/)
- Documentation: [https://code.google.com/archive/p/open-game-finder/w/list](https://code.google.com/archive/p/open-game-finder/w/list)

Both on the client and the server side of OGF is written purely in Java. OGF has a pluggable architecture and comes with a full set of plugins to get the job done. You can add your own plugins, or replace existing plugins to make them more in line with your game. OGF uses NiftyGUI as the main &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; plugin.

## Installation

1. Go to [https://code.google.com/archive/p/open-game-finder/downloads/list](https://code.google.com/archive/p/open-game-finder/downloads/list)
1. Download Client-1.0-bin.zip and Server-1.0-bin.zip
1. Unzip the two files to, for example, your jMonkeyProjects directory.

## Setting up the Database

The OGF server uses an embedded Apache Derby database. You have to install the database, this means creating the data files and adding the tables. You can do this straight from the command line by running a script file.

- On Windows, use installServer.bat to create a new database from scratch. On Mac &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt; or Linux, run `java -jar lib/Server-0.1.jar install` in the Terminal.
- On Windows, use updateServer.bat to update the difference between the current state of the database and the way it should be. On Mac &lt;abbr title="Operating System"&gt;OS&lt;/abbr&gt; and Linux, run `java -jar lib/Server-0.1.jar update` in the Terminal. +*This new feature is currently untested.*

## Running the server

Change into the OGF-Server directory and run the server:

- On Windows: Run startServer.bat
- On Linux and MacOS X: Run `java -jar lib/Server-1.0.jar` in the Terminal.

The server is now running and ready to accept connections. +
*Note:* In the alpha release, the server runs on localhost. In the final release, you will be able to configure the host!

## Running the client

1. Change into the OGF-Client directory and run the client:
  - On Windows: Run startClient.bat
  - On Linux and MacOS X: Run `java -jar lib/Client-1.0.jar` in the Terminal.

1. If a Display Settings window appears, you can keep the defaults and click OK.

A client is now running, connects to the server, and displays a registration/login window.

![open-game-finder-1.png](/wiki-assets/docs/contributions/assets/images/networking/open-game-finder/open-game-finder-1.png)

*Note:* You can run several clients on localhost for testing.

### Client: 1. Registration

If clients use OGF for the first time, they need to register.
On the main screen of the client:

1. Click Register
1. Choose a user name and password (repeat the password).
1. Select an Avatar image.
1. Click register to complete the registration.

The client registers the account and opens the chat window directly.

### Client: 2. Login

If returning clients are already registered to an OGF server, they can log in.
On the main screen of the client:

1. Enter a user name and password that you previously registered.
1. Click Login

The client logs you in and opens the chat window.

### Client: 3. Chat

The chat window shows a list of all users logged in to the server. Logged-in users can send public messages, and can receive public messages from others.

## Connecting to a Game

Q: I want to gather players using the OGF client to connect to the game server. How do I start my multiplayer game? +
A: The following sample code demos the typical use case: [OGFClientStartup.java](https://code.google.com/archive/p/open-game-finder/source/browse/OGF/TRUNK/Client/src/main/java/com/ractoc/opengamefinder/client/OGFClientStartup.java)

In a JME3 Application's init method:

1. Create a com.ractoc.opengamefinder.client.GUIContainer object.
1. Create a game instance using the GUIContainer (via a ClientFactory).
1. Check the com.ractoc.pffj.api.BasePluginMessageResult for success or failure.

After this, continue writing your JME3 init method.

## Configuration

- Q: How can I offer more avatars to choose from? +A: Save the image files in the path `jMonkeyProjects/OGF-Client-1.0-bin/OGF/resources/avatars/`
- Q: How do I configure servers addresses? +A: TBD
