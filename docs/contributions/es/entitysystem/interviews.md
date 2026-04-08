# interviews

## ES Approaches

Entity System implementations are various!

As said, we are talking about Component oriented programming Entity System, implemented in an Object oriented programming language and environment like Java!

So,we are

- *not talking* about Groovy, Scala, Closure.. or any Java extension!
- *not talking* about Entity system in any scope other than in a real-time application!
- *focusing* in 'core' features, which exclude many specific usecases
- *trying* to be unprejudiced , impersonal to make equitable judge.

### Outline

1. Initial philosophy
1. Pure data or not?
1. Multi-threading, concurrency enable or not?
1. Communication: Event messaging enable or not?
1. Is database (and other kind of persistent) friendly or not?
1. Is enterprise friendly (expandable/ extensible/ modulizable) or not?
1. Script possibilities?
1. Restrictions and limitation
1. Dependencies
1. Current status: Long term, stable, community?

The comparisons will focus in these below points, follow with the scope, status of each projects
Detailed explanation of above points [points](points.md)

## ES projects interviews

These interviews are short but focus discussion to help you get a clear view of underlying implementation of each project.

### Artemis: General

GoogleCode: [https://code.google.com/archive/p/artemis-framework/](https://code.google.com/archive/p/artemis-framework/)

Website: [http://gamadu.com/artemis/index.html](http://gamadu.com/artemis/index.html)

Wiki: [http://entity-systems.wikidot.com/artemis-entity-system-framework](http://entity-systems.wikidot.com/artemis-entity-system-framework)

#### Short conclusion

Artemis approach

1. Initial philosophy : Lightweight, small footprint and 1.5+
1. Pure data: No
1. Multi-threading, concurrency: with care
1. Communication: Event messaging enable or not? No implementation yet
1. Is database (and other kind of persistent) friendly or not? No implementation yet
1. Is enterprise friendly (expandable/ extensible/ modulizable) or not? Not clear but because not pure data, consider Yes
1. Script possibilities? Yes
1. Restrictions and limitation: Custom System has to be extends base System; Processor base; Aspect base, Has documented about Dependencies between System
1. External library dependencies : No
1. Current status: Long term, stable, community? The earliest Java ES, more than 3 years, kind of inactive, has a forum.

Read the full review for details

### Zay-ES : @pspeed

Forum : [https://hub.jmonkeyengine.org/c/user-code-projects/zay-es](https://hub.jmonkeyengine.org/c/user-code-projects/zay-es)

Wiki: [entitysystem](entitysystem.md)

Links: [https://hub.jmonkeyengine.org/t/zay-es-links-more-chars-because-forum-is-dumb/27135](https://hub.jmonkeyengine.org/t/zay-es-links-more-chars-because-forum-is-dumb/27135)

:::important
In my POV, Zay-ES has the most active development status and also the maintainer is a core JME3 dev, that's why all its functions and wisdom are close to JME3!
:::

#### Short conclusion

Zay-ES approach

1. Initial philosophy : Lightweight, small footprint and 1.5+
1. Pure data: Yes
1. Multi-threading, concurrency: free, by design, but still _need better design contract_
1. Communication: Event messaging enable or not? No implementation yet
1. Is database (and other kind of persistent) friendly or not? No implementation yet
1. Is enterprise friendly (expandable/ extensible/ modulizable) or not? Not clear, _lack of design contract_
1. Script possibilities? Yes
1. Restrictions and limitation: Free of System implementation, but _lack of design contract_
1. External library dependencies : No
1. Current status: Long term, stable, community? more than 2 years, open source recently, active, has a forum in Jmonkey's hub.

Read the full review for details

### EntityMonkey : @zzuegg

Post: [https://hub.jmonkeyengine.org/t/entitymonkey-a-simple-entity-system-for-jme/23235](https://hub.jmonkeyengine.org/t/entitymonkey-a-simple-entity-system-for-jme/23235)

### Private : @Empire phoenix

## Others

### Java & Java extension

#### Spartan: [used for Slick. abandoned]

GoogleCode: [https://code.google.com/archive/p/spartanframework/](https://code.google.com/archive/p/spartanframework/)

### Not Java

#### C++

#### JavaScript

#### C#

#### ActionScript
