# Wiki Admin

## Overview

The wiki consists of two repositories.

- [wiki](https://github.com/jMonkeyEngine/wiki)
- [wiki-ui](https://github.com/jMonkeyEngine/wiki-ui)

The wiki repository holds all documentation while the wiki-ui repository is the user interface for the documentation.

## Wiki

The wiki repository has a workflow that will be triggered when any push is made to the repository or whenever the user interface issues a new release. Every build, all pages are deleted and re-created. The workflow will cache the user interface under the `"cache &gt; antora"` directory if there are any changes and the cache folder has been added to the commit command.

```
  # Detects any updates to package-lock.json and package.json and commits the
  # files to root.
  # see:
  # https://github.com/marketplace/actions/add-commit?version=v4.1.0
  # for use options.
  - name: Commit Packages
    uses: EndBug/add-and-commit@v4
    with:
      author_name: mitm001
      author_email: mitm001@users.noreply.github.com
      message: "Commit files for CI workflow"
      # Commits these files to root if and only if there are changes.
      add: "package-lock.json package.json ./.cache/antora/*"
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This cache allows the build process to run offline.

The workflow can be configured to update the `package-lock` and `package.json` files by editing the `Install Node` command, just as if you were running this from a local repo.

DO NOT UPDATE OR PUSH THESE FILES UNLESS YOU DISCUSS IT WITH THE OTHER ADMINISTRATORS FIRST!

The workflow file `main.yml`, located under "github &gt; workflows", can only be edited and pushed using either the github online interface or by using git bash locally and pushing the commit. Using the Atom Editor or git desktop git commands will fail currently at the time of this writing.

The `supplemental-ui` folder holds the content for Anotra search, the header and footer for the ui. Edit these as needed in the wiki repository, but *do not edit* these same files on the `wiki-ui` repository.

Technically, the entire ui can be configured from the wiki repo.

The wiki is an [Antora](https://docs.antora.org/antora/2.3/)   site using the [asciidoctor](https://asciidoctor.org/docs/user-manual/) syntax. A quick primer for syntax can be found [here](https://docs.antora.org/antora/2.3/asciidoc/asciidoc/).

## Source files

The source structure is now modularized.

- ROOT - holds content that introduces new users to the jMonkyEngine, installing and features.
- core - this is the main module for any content that is *specific* to an existing jMonkeyEngine class. It maintains similar directories as are found in the jMonkeyEngine [repository](https://github.com/jMonkeyEngine/jmonkeyengine).
- networking - holds content *specific* to jMonkeyEngine networking.
- physics - holds content *specific* to jMonkeyEngine physics.
- tutorials - holds any content that is *not specific* to any jMonkeyEngine class, may be a generalized concept, may give direction on how to use the engine, or an article of some type about an engine feature.
- sdk - sdk content only. This module may be moved to the sdk repository in the future.
- contributions - existing user project pages. This is a deprecated module and will be removed in the near furture. Do not add new content to this module.

You can decide if a page belongs in the core module by asking yourself a simple question.

_Does the page explain an existing jMonkeyEngine class (excluding physics and networking) found in the jMonkeyEngine repository, without using an external application?_

If yes, then it belongs, otherwise it needs to go someplace else.

## Broken link checking

There is a workflow that can be used to check for broken links.

[link-checker](https://github.com/mitm001/link-checker/blob/master/.github/workflows/main.yml)

To use it, simply create a repository, paste a copy of the workflow into the `"github &gt; workflows"` directory. Before commiting for the first time, set the [repo url](https://github.com/mitm001/link-checker/blob/abddf3d5012b90186ae485073a8c1aaf15a3c447/.github/workflows/main.yml#L25) to point to the wiki.

If there are any errors, a `linkchecker.md` or `unresolved.md` file will be committed to your repository under the `checked-links` directory. You may need to issue a pull request after a push because of this. The typical workflow consists of fixing reported broken links, deleting all `.md` files and pushing to the repo. Then issue a pull request to see if there are any remaining problems. These files will only be built if there are errors.

If there are no files in the `link-checker` directory and you need to run a check, just create any new file in the `link-checker` directory and push it.

The reason for two files is that the `peter-evans/link-checker@v1` action is not capable of reading relative links properly. This is the only action that is available currently. However, we are in luck in that the Anotora build will set a class on any relative link that fails named `class="page unresolved"`. We can then use a grep command to parse the gh-pages branch and find any file with this class and write it to file.

This is an example of the output for a broken relative link.
```
tutorials/beginner/hello_collision.html:1289:&lt;p&gt;For a detailed description of the separate jar files see
&lt;a href="#getting-started/jme3_source_structure.adoc#structure-of-jmonkeyengine3-jars"
class="page unresolved"&gt;this list&lt;/a&gt;.&lt;/p&gt;
```

This gives you the file name:
```
tutorials/beginner/hello_collision.html
```

and the name of the broken link to search for in the file:

```
#getting-started/jme3_source_structure.adoc#structure-of-jmonkeyengine3-jars
```

All broken links start with a `#` sign. In this instance, we have an inter document link thats broken as there are two pound signs.

The `peterevans` action will locate all broken image and web urls. There is a problem though that prevents its full use, which is running this on a schedule and automatically opening issues. When Antora builds a site, it will build links from the "`nav-menu`" and "`Table of Contents`" into every page. This will lead to `Too Many Requests (HTTP error 429)` errors. The easiest way to get around this would be to filter the href attribute class for the `nav-link` class, since we know these links are good, and skip them. This is currently not possible using the `petereveans` action. To work around it, just search the `linkchecker.md` for `file or directory` errors.

## User Interface

The `wiki-ui` repository has two workflows. A workflow that will build on any push (main.yml), and one that builds on pushing a tag (release.yml). If you push any tag to the master branch, a release will be created, triggering the wiki build, thereby updating the wiki cache and user interface for the wiki.

This will allow you to make changes to the ui without triggering a build unless you are ready.

The user interface uses standard html in its templates so editing should be familiar to anyone who knows html.

## Versioning

There are two files that control versioning for the wiki, each serves a different purpose.

1. `wiki-playbook.yml` - determines what branches to use for content.
1. `antora.yml` - controls module versioning.

The wiki uses branches for versioning. The current branch being used for the jMonkeyEngine is *always* the master branch of the wiki.  In the playbook this is known as the `*HEAD*` branch.

The `docs` module is the main module for the wiki. Its `antora.yml` file controls the version of the wiki. The playbook uses this version to create the folders inside the `gh-pages` branch, building the content from the branches configured in the playbook.

Branch version names should only target major/minor releases, not the patch of a version, and start with "`v`".

When it's time to cut a new version for the wiki, the process is as follows.

1. Create and checkout a new branch that matches the *current version* of the wiki. If the current version (HEAD) is targeting version 3.3 in the `antora.yml` for example, you would name the new branch `v3.3`. Thereby preserving the current master branch content.
1. We do not want the Antora `.cache` to be versioned so you need to delete it from the new version branch if it has been commited to the repo.
1. Push the branch to the repository.
1. Switch to the `master` branch and edit these files:
  1. Add the newly created branch to the `branches:` array in `wiki-playbook.yml`.

.wiki-playbook.yml
```
content:
  sources:
  - url: https://github.com/jMonkeyEngine/wiki.git
    branches: [HEAD, v3.4, v3.3, v3.2]
```
  1. Increment the version of the `antora.yml` file.

--
.The docs antora.yml
```
name: docs
title: JME
version: '3.4'
```
.The docs-wiki antora.yml
```
name: docs-wiki
title: Wiki Contribution
version: '3.4'
```

:::note
The version value is enclosed in a set of single quote marks (') because it starts with a number. As was mentioned earlier, the module versioning is controlled by the `antora.yml` file, not the playbook, so they do not have to match.
:::

--

1. Edit any links found in the `README.adoc`, located in the root of the repository, that are versioned, so they match the version value you just set in the `antora.yml` file.
1. Stage, commit and push your changes to the repository.

The wiki versioning is now complete but you will need to update the docsearch repo to reflect the changes so that search works properly.

1. Navigate to the Algolia `docsearch-config` repo and update the search script.

https://github.com/algolia/docsearch-configs
1. From the main page, click the **Go to file** button and Enter `jmonkeyengine` into the search line.
1. Edit the version line to point to the new version used in the `Antora.yml` file. In this example, the current search is targeting 3.3.

--
.Old jmonkeyengine.json
```
{
  "index_name": "jmonkeyengine",
  "start_urls": [
    {
      "url": "https://wiki.jmonkeyengine.org/docs/(?P<version>.*?)/",
      "variables": {
        "version": [
          "3.3"
        ]
      }
    }
  ],

  ...
}
```

The master branch `Antora.yml` file is using 3.4.

.Antora.yml
```
 name: docs
 title: JME
 version: '3.4'

...
```

Edit the `jmonkeyengine.json` file and push your commit to update the search. It takes approximately 24hrs after the commit is merged for it to take effect.

.Updated jmonkeyengine.json
```
{
  "index_name": "jmonkeyengine",
  "start_urls": [
    {
      "url": "https://wiki.jmonkeyengine.org/docs/(?P<version>.*?)/",
      "variables": {
        "version": [
          "3.4"
        ]
      }
    }
  ],

  ...
}
```

--

Things to know about versions and component modules.

If a version isn't specified in the target page ID (link text), and the target and current pages belong to a different docs components, Antora will use the latest version of the target component to complete the page ID.

At the time of this writing, we have two links in the `docs` module (documentation.adoc page) that link to the `docs-wiki` module and one that points from the `docs-wiki` module to the `docs` module license.

Since this is a wiki module, we would want to point to the most current content so not versioning them is the best approach.
