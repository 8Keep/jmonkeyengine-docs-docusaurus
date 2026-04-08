# Atom Editor for Wiki Editing

Contributing to the Wiki is now easier than it ever has been. Using the Atom editor will give you an easy to use interface that is cross-platform, has code completion, syntax highlighting, instant AsciiDoctor page previewing, with an integrated GitHub client. The only thing it doesn't do is write the page for you. You can use it in conjunction with the [Git](https://git-scm.com/) command line interface.

## Definitions

- (CLI) - Git Command Line Interface
- (GWI) - GitHub Web Interface

## Prerequisites

1. Have a [GitHub account](https://github.com/).
1. Are a Wiki project member.

If you are not a member, you fork the repository into your GitHub account and issue "`pull`" requests to the Wiki repository from there.

To fork the Wiki repository into your GitHub Account:

1. Navigate to [https://github.com/jMonkeyEngine/wiki](https://github.com/jMonkeyEngine/wiki).
1. In the menu at the top of the page, select the `code-fork`*Fork* button.

## Downloading the Sources

1. Install [Git](https://git-scm.com/).
1. Download and install the Atom editor - https://atom.io/
1. After installation is complete, you can customize the editor by selecting the `Choose A Theme` panel followed by the **Theme Picker** button.
1. Once you are satisfied with the customization of the editor, you will need to add several packages to make Atom AsciiDoctor compatible. Package installation is painless.
  1. From the `Install A Package` panel, select the **Open Installer** button, or select `"Packages &gt; Settings View&gt;Install Packages/Themes"` from the file header.
  1. Enter "`asciidoc`" in the search box and press the **Packages** button.

.Add these packages:
    - *language-asciidoc*
    - *asciidoc-preview*
    - *autocomplete-asciidoc*

:::tip
You can add more GitHub controls to the editor by adding the package `*git-plus*`.
:::

To edit the Wiki you will need to clone the wiki repository.

1. From the `Command Palette` (`ctrl`+`shift` +`P`  or `"Packages &gt; Command Palette&gt;Toggle"`), enter "`git`" into the search box.
1. Select **GitHub: Clone**.

--
.Members
Paste the wiki the &lt;abbr title="Uniform Resource Locator"&gt;URL&lt;/abbr&gt; into the `Clone from` box.

```
https://github.com/jMonkeyEngine/wiki
```

.Non-Members
Paste your forks &lt;abbr title="Uniform Resource Locator"&gt;URL&lt;/abbr&gt; into the `Clone from` box.
--
The `To directory` will automatically update when you do.
1. When you're ready, press the **Clone** button.

The clone will take some time due to the size of the Wiki. Once cloned, a new `Project` tab will open on the left, and the `Git` and `GitHub Preview` tabs will open to the right. If they don't, you can open the Git tab using `ctrl`+`shift`+`9`  and the GitHub Preview tab using `ctrl`+`shift`+`8`. Alternatively, you can navigate the `"Packages &gt; GitHub"` menu. You will also notice in the lower right corner, on the `Status Bar`, you now have your GitHub control.
1. Before you can commit any changes to the Wiki, you must configure at least the user.email and user.name variables for Git. You can do this via Git Bash, or manually, by following one of these instructions.

- Git Bash: [Setting your commit email address in Git](https://help.github.com/articles/setting-your-commit-email-address-in-git/)
- Manually: [Set your commit email address on GitHub](https://help.github.com/articles/setting-your-commit-email-address-on-github/)
  1. Open your `.gitconfig` file (located in USER_HOME) and add:

```
[user]
        name = yourname
        email = youremail
```

  1. To maintain your privacy, setup your email settings in your GitHub account and use the `users.noreply.github.com` email address.

1. Lastly, you will need to create a GitHub token. Follow the directions in the popup to enter the token.

## Source Structure

All documents live in the `docs/modules` directory. Each [named](https://docs.antora.org/antora/2.3/named-module-directory/) and [ROOT](https://docs.antora.org/antora/2.3/root-module-directory/) module contain a defined [family](https://docs.antora.org/antora/2.3/family-directories/) set of directories that hold all content. Select an appropriate module and family directory to store your new page, image, partial, example or attachement.

When you edit a Wiki page, the Git tab will show any unstaged changes. When you're done making changes, you stage any or all changes, write your commit message, commit, and then push the changes.

You can preview your documents by selecting the document and using the keyboard shortcut `ctrl`+`shift`+`A` or by using the File header menu "Packages &gt; AsciiDoc Preview&gt;Toggle Preview".

## Updating Local Wiki Copies

It's a good idea to update your local copy of the Wiki prior to committing any changes.

.Members
Update your local copy of the Wiki from the Atom Editor or (CLI) by issuing a `pull` command prior to Commit/Push.

.Non-Members
Update your local copy of the Wiki by:

  . Issuing a `pull` request from your forked repository using the (GWI).
  1. Go to your version of the repository on GitHub.
  1. Click the **New Pull Request** button at the top.

:::note
The Wiki repository will be on the left and your repository will be on the right.
:::

  1. Click the **Base** button on the left and from the drop down list select your forked repository.
  1. Click the "`compare across forks`" link.
  1. Click the **Head Fork** button and from the drop down list select the Wiki repository.
  1. If the repositories are not identical, there will be green button **Create pull request**. Click it to update your repository.
1. Update your local copy by doing a `pull` request in the Atom Editor or (CLI).

:::important
As a non-member, when there is interaction between the Wiki repository and your fork, you issue commands online. When the interaction is between your forked repository and your local copy, you issue commands from Atom or the (CLI).
:::

## Pushing Changes

.Members
As a member, issue a `push` command from the Atom Editor or (CLI).

.Non-Members
To submit changes to the Wiki repository, after pushing them to your fork, from the (GWI):

1. Go to your version of the Wiki repository on GitHub.
  1. Click the **New Pull Request** button at the top.
    1. Note that the jMonkeyEngine repository will be on the left and your repository will be on the right.
  1. Click the green button **Create pull request**. Give a succinct and informative title, in the comment field give a short explanation of the changes and click the green button **Create pull request** again.

:::important
As a non-member, when there is interaction between the Wiki repository and your fork, you issue commands online. When the interaction is between your forked repository and your local copy, you issue commands from Atom or the (CLI).
:::

## Creating pages

You create [pages](https://docs.antora.org/antora/2.3/page/standard-page/) by saving a file with the `.adoc` extension. The first line of a page must contain a title.

```
# My Title Goes here
```

Everything after the title line, up to the first empty new line, is called the `header` of the document. This is where you set optional [attributes](https://docs.antora.org/antora/2.3/page/attributes/) for your documents.

The Antora manual has a very quick to read [Primer](https://docs.antora.org/antora/2.3/asciidoc/asciidoc/) that will get you up to speed on writing pages fast.

Documents rely heavily on using `References` to link to other content in the same or different modules. This is a critical part of writing your documents. Knowing how to link to other content. There are two types of "`references`", [Cross References](https://docs.antora.org/antora/2.3/page/page-id/) and [Internal Cross Reference](https://docs.antora.org/antora/2.3/asciidoc/in-page-xref/). A `Cross References` links to a [*page*](https://docs.antora.org/antora/2.3/page/module-and-page-xrefs/) in the same or different module, an `Internal Cross Reference` links to  *elements* inside a document located either in the same page, same module or a different module.

The snippets page contains various forms these `Cross References` that make linking easier.

See also:

- [Asciidoctor User Manual](https://asciidoctor.org/docs/user-manual/)
- [How to use emoji in the wiki](emoji.md#how-to-use-emoji-in-the-wiki)

## Atom Snippets

[quote, Atom Flight Manual: Snippets]
Snippets are an incredibly powerful way to quickly generate commonly needed code syntax from a shortcut.

One advantage of using Atom as an editor for the Wiki comes from the use of [Snippets](http://flight-manual.atom.io/using-atom/sections/snippets/). You can see a list of available snippets for your document by using the `Command Palette` (`ctrl`+`shift` +`P` or `"Packages &gt; Command Palette&gt;Toggle"`). Enter "`snippets`" into the search box and select **Snippets: Available**.

The Atom AsciiDoc packages add great functionality to the editor, but they do not cover everything that's possible when using AsciiDoctor syntax. You can customize the editor even further by adding your own snippets. I will get you started with your first snippet. Simply copy and paste the code below into your "`snippets.cson`" file and save. You can locate the file under "File &gt; Snippets".

```
'.source.asciidoc':
  'Cross reference internal element, same page':
    'prefix': 'xrefI'
    'body': '<<${1:reference-a-section-in-the-same-page},${2:custom label text}>>'
```

Thereafter, just start typing `xrefI` and select it from the popup menu or hit `Tab` with it highlighted in the menu, to insert an `Internal Cross Reference` link. You can then use the `Tab` key to cycle through each tab stop and enter the appropriate data for that link.

:::tip
A `Tab` key in the above code is set by wraping any text to be tabbed with the `$&#123;1:&#125;` syntax, where the integer represents the tab order. When cycling through tabs, you can backspace them to remove multiple choice tab content or just enter the text for single selection content.
:::

You can help the jMonkey community by adding new snippets. Use your editor and edit the [Atom Snippets](atom_snippets.md) document. Make sure to announce any proposed changes on the [jMonkeyEngine Forum](https://hub.jmonkeyengine.org/) under the topic "`Documentation`" first so others are aware and can test out your proposed change.

---
Next steps,

- Read the Wiki [README](https://github.com/jMonkeyEngine/wiki) page.
- Add [Asciidoctor User Manual](https://asciidoctor.org/docs/user-manual/) to your favorites.
- Add [Antora Docs](https://docs.antora.org) to your favorites.
- Add the [Atom Docs](https://atom.io/docs) to your favorites.
- Add the [Atom Flight Manual](http://flight-manual.atom.io/) to your favorites.
- Add the [git - the simple guide](http://rogerdudler.github.io/git-guide/) to your favorites.
- Start contributing.
