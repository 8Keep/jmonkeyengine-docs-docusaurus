# Engine Release Guide

## Audience

This documentation page is intended for JMonkeyEngine release managers.

## Repo and Branches

Authoritative source code for the Engine
lives in a public repository at GitHub.
The repo's homepage is at
https://github.com/jMonkeyEngine/jmonkeyengine

The default branch in the public repo is named "master".
That's where the leading-edge code is kept.
All incoming pull requests should be integrated to "master".

The other branches in the repo fall into 2 categories:

1. _release branches_, used to develop stable releases, and
1. _development branches_,
  used to develop features or fixes that involve multiple commits.

Release branch names, such as "v3.2" and "v3.3", refer to release numbers.
Development branches should have descriptive names, such as "opengles2-fixes".

## Continuous Integration

Every push to "master" causes a continuous-integration (CI)
workflow to run at GitHub Actions.
The workflow is defined by
[the "main.yml" script](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/.github/workflows/main.yml).
It performs clean builds of the Engine
across a matrix of 3 operating systems and 3 Java versions.
It also performs a clean build of the merged javadoc.

Any failure of the CI workflow causes notifications to be sent.
To register for notifications, follow the instructions at
https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/configuring-notifications

Every step in the workflow generates a detailed log,
which can be browsed via the web interface.
Often the cause of a CI failure
can be deduced from the log of the first failed step.

:::tip
GitHub provides an easy way to determine whether CI is failing.
Browse to https://github.com/jMonkeyEngine/jmonkeyengine/commits/master
and look for colored icons to the right of the dates of recent push commits.

![colored_icons.png](/wiki-assets/docs/ROOT/assets/images/github/colored_icons.png)

- A green checkmark indicates a successful CI run.
- An amber disc indicates a CI run in progress.
- A red X indicates a failed CI run.

Selecting a colored icon causes a list of jobs ("checks") to pop up.
Select the "Details" link after a job description
to access detailed information about that job.
:::

Sometimes CI fails due to transient networking issues.
In this case, someone with the necessary privileges should retry the failed run
by clicking on the "Re-run jobs" button on the summary page of the run.
To reach the summary page,
browse to https://github.com/jMonkeyEngine/jmonkeyengine/actions
and select on the failed run from the displayed list.

![rerun.png](/wiki-assets/docs/ROOT/assets/images/github/rerun.png)

Breakage (persistent CI failures) of the "master" branch
should be addressed promptly.
When "master" is broken, *no* commits should be integrated
except those intended to diagnose or repair the breakage.

Additional information about Engine development and integration may be found in
[the "CONTRIBUTING.md" file](https://github.com/jMonkeyEngine/jmonkeyengine/blob/master/CONTRIBUTING.md).

## Release Naming

Official engine releases fall into 3 categories:

- Alpha releases are "pre-release" builds intended only for internal testing.
- Beta releases are "pre-release" builds intended for broader testing.
- Stable releases are fully tested builds suitable for production use.

The name of an Engine release is precisely
the "version" portion of its Maven coordinates
(&lt;groupId&gt;:&lt;artifactId&gt;:&lt;version&gt;).
The name will always begin with a digit, currently "3".
For extra clarity, the letter "v" (for "version")
is prepended in some contexts.
Thus "v3.2.4-stable" and "3.2.4-stable" both refer to the same release.

:::warning
To avoid confusion, release names should *never* be re-used.
:::

Names for stable releases should end with the "-stable" suffix.
For instance, the first stable release from the "v3.2" branch
was named "3.2.0-stable".

Patch (or "dot-dot" releases) are stable releases that don't introduce
any new features.
For instance, the first patch release
after "3.2.0-stable" was named "3.2.1-stable".
Like its predecessor, it was released from the "v3.2" branch.

Names for alpha and beta releases should use "-alpha" or "-beta"
and a sequentially assigned numeric ID in place of "-stable".
For instance, the first alpha release leading up to "3.3.0-stable"
was named "3.3.0-alpha1".

:::tip
To prevent interference between releases and ongoing development,
:::

beta releases and stable releases should be built *only* from release branches,
never from "master".

## Initiating a New Release

The release process starts with the creation of a Git tag.
*Do not* use the `git push` command for this purpose!
Use GitHub's web interface instead:

Browse to https://github.com/jMonkeyEngine/jmonkeyengine/releases/new
and fill out the new-release web form,
paying special attention to the target branch.
The target branch defaults to "master",
but more often you'll want to specify a release branch as the target.

![new_release.png](/wiki-assets/docs/ROOT/assets/images/github/new_release.png)

For the tag version, specify "v" followed by the version name
and select "Create new tag on publish".
This determines the name of the Git tag that will be created.

For the release title, specify "jMonkeyEngine " followed by the version name.
This field can be added or edited later.

For the description, write something brief
or click on the "Generate release notes" button.
Like the title, this field can be added or edited later.

For an alpha or beta release, tick the "Set as a pre-release" checkbox.
This helps ensure that naive users are steered toward a stable release.

:::caution
Double-check the target branch before proceeding. Then triple-check it!
:::

To start the process,
click on the green "Publish release" button at the bottom of the page.

## Monitoring the Release Run

A release run takes 15-30 minutes, depending how busy GitHub's server farm is.

Discord provides an easy way to verify that the run has begun.
(A Discord client is not required.)

- Log in to your Discord account.
- Select the "github-builds" channel on the "jMonkeyEngine Community" server.
- Look for a recent message from the "GitHub" app saying
  "[jMonkeyEngine/jmonkeyengine] New release published".
  This indicates that a run has started, not that it's complete!

![release_published.png](/wiki-assets/docs/ROOT/assets/images/release_published.png)

You can monitor its progress in the "github-builds" channel,
where you will see job messages from the GitHub bot,
such as "[jmonkeyengine] Build natives for android success".
Each job message is linked to the GitHub webpage for that job.

From any GitHub job page, select the "Summary" link
to see a graphical summary of the run which contains the job.

![summary.png](/wiki-assets/docs/ROOT/assets/images/github/summary.png)

## Results of the Release Run

A successful release run automatically deploys various build products:

- It deploys the merged javadoc to https://javadoc.jmonkeyengine.org/
- It deploys the test chooser's executable (a ZIP file)
  as an asset listed under the release description at GitHub Releases.
- It also "stages" the signed Maven artifacts to Sonatype, as a "repository".
  However, staging to Sonatype does not publish the artifacts to Maven Central.
  For that to happen,
  the staging repository must be closed and synched.

## Managing Repos at Sonatype

The official instructions are available from
https://central.sonatype.org/publish/publish-portal-ossrh-staging-api/

Browse to [the Maven Central Repository site](https://central.sonatype.com/).

Select the "Sign In" link in the upper right corner of the page.

![login.png](/wiki-assets/docs/ROOT/assets/images/sonatype/login.png)

Type your Sonatype credentials into the text boxes
and click on the "Continue" button below.

![login_dialog.png](/wiki-assets/docs/ROOT/assets/images/sonatype/login_dialog.png)

Select the "Publish" link in the upper right corner of the page.

![sidebar.png](/wiki-assets/docs/ROOT/assets/images/sonatype/sidebar.png)

If you don't see a freshly staged "org.jmonkeyengine" deployment
on the left side of the page,
click on the "Refresh" button occasionally until its record appears
and its status changes to "VALIDATED".

Select the newly staged deployment.

![select_repo.png](/wiki-assets/docs/ROOT/assets/images/sonatype/select_repo.png)

Scroll down until you see the "Component Files" heading
on the right side of the page and
browse the contents of newly staged deployment.

When you're satisfied the deployment is correct and complete,
click on the "Publish" button to start the publication process.

![close.png](/wiki-assets/docs/ROOT/assets/images/sonatype/close.png)

The deployment's status should immediately change to "PUBLISHING".
When it changes to "PUBLISHED", the process is complete.
This usually takes about 10 minutes.

Allow an additional hour or two for the new release to show up
at [Maven Central Repository Search](https://central.sonatype.com/artifact/org.jmonkeyengine/jme3-core/versions).

## Follow-up Tasks

If the release description at GitHub is incomplete,
go back and flesh it out.

Announce the new release at [the Forum](https://hub.jmonkeyengine.org/).

For an important release, post an announcement
to [the Blog](https://jmonkeyengine.org/tags/blog/).
