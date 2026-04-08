# detailed

## Entity System Details

### Hello ES

This wiki is dedicated to who want to do research about Entity System.

You should 've read a brief introduction here: [entitysystem:introduction](introduction.md)

And if you still have some concerns you are in the right place!

:::important
This wiki is a collection of known sources, authors from internet and our forum. Corrections are welcome! The main source is the discussion in this topic: [https://hub.jmonkeyengine.org/t/entity-system-topic-united/27193](https://hub.jmonkeyengine.org/t/entity-system-topic-united/27193)
:::

### Why you here?

'Cause:

1. You may read famous T-machine article about entity systems in MMORPGs.
1. You may come from Unity, UDK, or another engine that used it
1. You may come from Database and web world
1. You read a lot of articles, forums and try few projects with dramatic debates

But:

1. You still un sure/ clear about OOP ,COP, data driven…
1. You doubt ES concept, find its impossible to do ES right
1. You want to learn more

I hope this page will help you 30% the way to reach the destination. It's the place where we concern about the design wisdom of ES, and consider its detailed implementation in Java, eventually integrate in JME3 for a real-time game.

:::important
Before you start, I also want to mention that there are few implementations of ES in JME3, after read this page, you can judge the design of each one accordingly and choose one. Also read the interviews with each authors about their approaches!
:::

### Scope & Structure of this page

1) Introduction:

1. Basic idea of ES : Entity, Processor(System), other terms.
1. Core elements and its alternative
1. What is NOT an ES…

2) Why, when, where ES matter.

1. Pros – cons?
1. Know issues
1. OOP to COP, or else
1. Change of mindset

#### COP’s Entity System in OOP java

Entity System in turn is the Core and fundamental and most obvious implementation design of COP (Component oriented programming) in real-time application scale!!!

In fact the implementation details of Entity systems vary, some may resemble database core, some may have troubles with OOP incompatibility, some may appear to get all the good of Functional language…

but note that Entity System really stand on its own terminology on this single page:

:::warning
We are talking about the ES within COP, but implemented by a pure OOP like Java.
:::

## Ideas & Concepts

### Idea

### Concept

Slides

Pictures

### Core elements and its alternative

:::note
Definition notations:
:::

- Normal is clearly/no doubt in the definition.
- *Bold* is keywork.
- _Italic_ is example
- &lt;u&gt;Underling&lt;/u&gt; is doubt
- &lt;strike&gt;Strike-though&lt;/strike&gt; is implementation detail, not in the definition

#### Entity

An Entity is simply *an unique Id*. _Every Unit, Item, Bullet, etc. in your game will be represented by one of there entity Ids_.

#### Component

A Component is a class which only contains data. &lt;strike&gt;This means it has a constructor and only getter methods&lt;/strike&gt;.
_Examples for Components can be:
  * PositionComponent
  * MovementComponent
  * CollsisionComponent_

Components are *added* to the Entities.

There can *only exist one component* of the same class for one entity at the same time.

As you can see *Entities are made flexible up of different Components*. _You need your Armored Robot?_ No Problem, you only need to combine the right components. Besides you are able to remove/change/add components during the game &lt;strike&gt;which is a huge benefit of Entity Systems.&lt;/strike&gt;

#### Systems

Simply all other classes *except the components and the entities* can we consider as systems. You need to pay attention when you read about other Entity Systems because they can have different ideas of what a system is.

In the systems you can request all Entities which have special components.
_For example you can say that you want all entities who have a position and a movement component and now calculate the new position for these Entities &lt;strike&gt;by overwriting the old position component with a new one&lt;/strike&gt;._

### Ideas similarity:

from Component oriented architecture:

1. Decoupling
1. Reusable
1. Primitive Unit

from Data driven architecture:

1. Data who decide

from Data oriented architecture:

1. Everything is data
1. Repository existence
1. Homogeneous data
1. Regular workload
1. Simple dataflow

Short explanation

1. Decoupling : each piece can work together without aware of each other.
1. Reusable : can be easily bring to use again somewhere else
1. Primitive unit : each piece from a simplest form which contains, fulfills itself.
1. Data who decide: data decide each and every result, activities of the software
1. Everything is Data: all piece in the software system is Data
1. Repository existence: exist a place to keep all the data, the one door to reach them
1. Homogeneous data : data is treat the same
1. Regular workload : software that run at regular rate, kind of balance trade off between performance and complexity
1. Simple dataflow: the flow of the data is easy to watch, inspect, start stop, manipulate. As the root reason for regular workload!

Ideas similarities here actually is resulted from with decades of history of revolving of the paradigm. That's why you will see the same concepts of Entity system appear every where from a database to a repository. Of course because it have the same root.Check Pros and Cons chapter for full, detailed idea and design goals and successes.

## Terms

:::important
Here are some terms that will be mentioned below but usually have misunderstood or misplaced because of their confusions. Try to do another research to make sure you understand clearly all the terms first!
:::

- Object Oriented Programming
- Data Oriented Programming
- Component Oriented Programming
- Data driven programming
- Data driven solution (architecture)

Here is a short one to help you get start quickly : [terms](terms.md)

## What is NOT an ES ?

From more 'open' perspective the core elements can be viewed as, but remember the name as a noun can be mislead:
_This resulted as a discussion of @pspeed and toolforger, eventually is form a skeptical question, it's really interesting by how we all see this problem confused at first!!_

]
Entity -&gt; ID. It just binds the components together, in the sense that there is one function that creates a bunch of components with the same ID, and one function to destroy all components for an ID. An entity is the set of objects that have the same ID, entities don’t exist as coherent objects inside the code.

Component -&gt; Facet. A position is a facet of an entity, as its velocity, its health, its armor, its whatever. If entities were Java objects, facets would be groups of interrelated properties.

System -&gt; Processor. A function that operates on a slice of components.

This often result in mislead skepticism about the design. So get back to read it carefully one more time and some gotchas and practical wisdom below.

## Gotchas & Practical wisdom

:::tip
This area contain some best gotchas and practical wisdom when working with ES. I change this to upper position in the page be cause I think practical works save us more than theories. This page can be called a "`Design`" course after all without this section!!!
:::

### System ~ Processor?

In a pure ES, this is not a thing, really. Some implementations force this on you because they couldn’t think how to do the ES job efficiently… but it’s still not a thing. All of your code that isn’t an ES is a "`system`", technically.

System = everything that isn’t an Entity or a Component but uses Entities and Components.

### Entity ~ GameObject?

Entity should just be interpreted as a bunch of its Component. GameObject or anything else represented by an Entity is by accident. So no force to represent "`all-every`" gameobject as Entity; and no force that "`all-every`" Entity is gameobject.

### Has ~ Is?

From software designer POV, Relationship in COP is a sensitive topic; by nature, Component is against (or override) Relation.

The deception '`Has`' relationship between Entity and its Component actually represent everything in various meaning from the literature '`Is`' , or literature '`Has`'.. to '`related to`'. BUT keep in mind, this is blurry and it's almost always implemented as indirect access, not like a property in an object but involves processing-lookup under the curtain! So you may find this difficult to extract and detect these different from your traditional OOP software design!

### Some insights

This is the place to share the "`real`" world difficulties when working with ES, here in JME3 or in other engines. In Practical Wisdom, we will raise some known solutions for them. This section may revive some part of the Cons or known issues sections but practically.

### Practical wisdom

## ES done right

Because this topic is so debatable, there is no solid candidate for ES done right now in my POV, but Zay-ES and Artemis are closest one, Zay-ES a little bit better as its the later born.

### Why debatable [Short]?

Because apply to each game, the scenarios and usecases are very different. Situation changes, a design which should be right can be a failure!  You may see the point.

This topic start flame in almost every discussions I've come through, someone should be like OOP versus COP, ES is not for all,..etc. At first, the debate should focus into a specific scope, specific genre. Here (this page) we still arrange the statements like general scope. But later in the interviews you can see some "`real`" applications and implementations.

#### Should be?

Theoretically a Java ES done right should be:

1. Pure data : very debatable
  1. – Mutable : as bean with setter and getter
  1. – Immutable : as bean with getter, should be replaced if changed.

1. Multi-threading, concurrency enable : very debatable
  1. – As my experience, pure data or not is not clear contract to multi-threading success. Consider other things happen outside of ES scope, so it not an solid warranty that those component will not be touched by any other thread.
  1. – Also if there is a contract that no other thread touching those data, in Java style via synchronization or other paradigm like actor… multi-threading also consider success but just more complicated!

1. Communication: very debatable
  1. – Event messaging enable
  1. – No event or messaging : update beat, no need of inter-com or events. How can we do network messaging?

1. Is database (and other kind of persistent) friendly
  1. – Save to XML?
  1. – Send over network?
  1. – Change sets are resembling Database concept, what about transactions?

1. Is enterprise friendly (expandable/ extensible/ modularizable)
  1. – Spring, as lazy loaded, injected?

1. Script possibilities
  1. – Can be script, non trivial work in pure data!
  1. – Can be use with other JVM language than java like groovy, or scala, jython?

1. Restrictions and limitations
  1. – No dynamic Java object methods in Component ? What about Entities and Systems ( Processors)
  1. – An overall way to manage and config Systems, freely chose? How to hook to its routine?

1. Dependencies
  1. – The separation of components are clear, as no dependencies at all. Hard cored, scripted or injected will break the overall contract!
  1. – The separation of Entities. What about dependencies of entities? Ex: parent/ child relationship in JME spatial. How the framework handle that?
  1. – The separation of Systems. Ex: any contract about that?

Detailed explanation : [points](points.md)

## Design

:::important
In Design phase, even don't know any of implementation detail, we judge upon the design concepts and its Infrastructure!!!. Detailed implementation judge will be considered later!
:::

:::important
This is a short checklist that help you open your mind before going to design an ES. It's short and trusted; the Pos and cons section needed previewing and under heavy concerning!
:::

### Why, when, where ES matter.

#### Why?

1. BLOB aka The fall of inheritance: Complex type can not be represent as class in java OOP!
1. Tired of OOP. Compose over old-skool programming . Like artists.
1. Reusable via prefab (well, this is very debatable as compare OOP!!)
1. …

#### When?

1. Trade off between complexity and performance is carefully considered.
1. Input and output are well setup. Assets are all in good format, output are well defined, workflow and routines are fixed. Seen in commercial 3D game engine.

#### Where?

1. Mainly to handles/ manage your data and entities.
1. Usually in MMO where BLOB happen.
1. Batch/ cache processing environment, device, GPU, others.

### Why not?

1. It’s easy to get it wrong as you often come from OOP world (of course, because you are Java developer).
1. Can result in done wrong too much time, that un affordable!!
1. It’s *not* an certainly proved technology (that why we here)
1. Its have bad issues
1. Only suite for cases (not every)
1. No good IDE, &lt;abbr title="Graphical User Interface"&gt;GUI&lt;/abbr&gt; support in Java or JME3 world currently

#### When not?

1. Limited time and first try! ( can be good if in limited time but ES is production mode ready)
1. Small game, simple gameplay …

### Pros – cons?

Here, I listed the pros – cons of the COP and Pure data ES.

:::warning
needed previewing and under heavy concerning!
:::

:::important
You can see I try as the one who repeat sentences that speak out by others in various sources as a short manner! So this list and information need clarification of correction afterward!
:::

### Pros:

1. No BLOB anti-pattern, no deep inheritance consider bad effects

Read: [http://gamearchitect.net/Articles/GameObjects1.html](http://gamearchitect.net/Articles/GameObjects1.html)

A lot of good things come if done "`right`"!

1. Simple, intuitive
1. Communication made simple
1. What you see is what you have → composing
1. Reusable with prefab
1. Batch / Concurrent processing/caching as in modern CPU, GPU
1. … ten more

### Cons:

:::important
'Problem' here means the 'problem' to solve not a bad situation!
:::

1. No OOP: COP Done "`right`" means forget about almost all OOP things: Pure data, Class become Type, no inheritance, encapsulation…etc , no best of both world!
1. Splitting dilemma: Same with OOP Classify problem: How to split, how to change the data when you change the splits?
1. Duplicated component: Same root as confusion in component splitting but, this problem about how can we made a more than one component of a kind per object entity… Ex: Car with 4 wheels, the component will be a 1stWheel, 2ndWheel, or a single list of WheelComponent… ?
1. Data resampling problem in game, data such as textures, text, 3d models everything … should be crafted: made, converted again to suite with existing data model – that’s the component in the ES.
1. Mindset change problem: One will have to re-code a few times to implement an ES, in initial, half ass and full level.
1. Flat table problem: Because ES is a big table by nature, with component set is a row. It’s as efficient even less than a big table, which form the flat table problem as seen in many indexed base database. Tree, Graph and other data structure will almost immediately break the ES contract!!
1. Observation problem: As update beat over listening method, ES restrict the observation methods a lot.
1. Security problem : No encapsulation, kind of no private POJO mean no java power in protecting data, a lot of security holes! ES implementations and COP forget all about security danger as Component contracted to be processed by Processor but not hiding its content.
1. Scale : In theory, ES should scale well..!!! But read this carefully or mislead it, enterprise system need much more than just a way to organize your data!!!

:::tip
Because a lot of people find interests about the downside of ES, I've listed them carefully here cons. After knowing the acceptable solutions from the authors, I will remove or marked the solved problem! [Peace! :p]
:::

### ES consider good design in real-time app?

:::warning
Of course, ES has its missing features!!!!
:::

But for some reason its designs are considered good for real-time application like a "`common`" video Game, or "`common`" simulation; especially common in MMO world.

Here is a short of '`why`' answers from a software architecture designer view, explain based on its borrowed ideas: [This is very different from various sources you've read, because it's not embedded any implementation details!!!]

1. Decoupling : each piece can work together without aware of each other.
1. Reusable : can be easily put to use again somewhere else.
1. Composable : pieces can work together

have fundamental relationship with decoupling.

1. Primitive unit : each piece from a simplest form which contains, fulfills itself.

have fundamental relationship with decoupling.

(*) These lead to advantages in development:

1. do it in one place only when doing implementation (coding, configs…), .
1. intuitive and ease of development jobs (compose entity with component drag and drop)
1. distributed jobs, assets
1. reuse data, code which in existed component
1. unit test
1. [more]

——————————————————————————————

1. Data who decide: data decide each and every result, activities of the software
1. Everything is Data: all piece in the software system is Data
1. Repository existence: exist a place to keep all the data, the one door to reach them

(*) These open the world of complex gameplay and distributed persistent like seen in MMO. A single data change can result in change in the gameplay; a
——————————————————————————————

1. Homogeneous data : data is treat the same
1. Regular workload : software that run at regular rate, kind of balance trade off between performance and complexity
1. Simple dataflow: the flow of the data is easy to watch, inspect, start stop, manipulate. As the root reason for regular workload!

(*) These lead to a lot of simple but efficient algorithm to get high performance in runtime for a software such like a "`common`" video game, which run in console, GPU, CPU which involve and share the same model with cache and batch instructions, an a certain heartbeat…Notice the bottleneck of CPU-GPU and between different processing unit, platform is the most headache of Game designer for decade is ease with the regular workload; let the game run smoothly and stable, result into nice visual representation..

### ES consider bad design in …?

From @pspeed:

It is a bad design choice where:
- there aren’t many entities and/or the behavior is so clearly defined that you’d just implement it one or two classes. Thing card games, a lot of puzzle games, etc..
- the game is so simple that it’s just implemented as JME controls and a few app states. You could use an ES here but it would be wasted.
- the game logic cuts across all objects nearly all the time. (I think of card games and puzzle games again.) This usually implies that there are few entities, though.
- the team doing the work will have trouble understanding an ES. To me this is a huge one. Sometimes our choice of technologies is not dictated by what might be technically best… but what is technically best for the skills of the team. For example, if your artist only knows Sketchup then Blender is probably not the right tool even if it is superior in many ways.

### Known issues:

Even if done right, the ES also have it underlying issues which noticed by its authors, (that means annoying things)!

*Why this section has things from the Cons section but consider differently?*

The Cons section describes problems should be concerned, likely to be done wrong, or the limit of the design they can be solved in implementations or not is not important!

Known issue means the problem persists in even the well designed; or persist due to the underlying infrastructure, application, programming language, etc!!

#### Communication:

Happens in non pure data solution, when Components don’t function independently of each other. Some means of communication is necessary.

- Two approaches (both viable):
  - Direct communication using dynamic cast and function calls
  - Indirect communication using message passing

In pure data solution, by not query or just loop through interested component at one update cycle, the Processor eases out the need of other communication, but in complex scenario, such as combine with outer event handling such as Network, where message passing is nature, the problem still persist!

#### Script

The "`script problem`" happens for the same reason with the "`communication problem`" mixed with "`pure`" data or "`not`" problem. When a component is hard to inspect, its outer relationship hard to define and its property is rejected to change, how can you script it?

Read: [http://blog.gemserk.com/2011/11/13/scripting-with-artemis/](http://blog.gemserk.com/2011/11/13/scripting-with-artemis/)

Nearly one end up back to half-assed solution, not a pure data ES if their really need scripting in.

#### Arbitrary Routine and Query

[https://hub.jmonkeyengine.org/t/in-range-detection-with-lots-of-entities/26910](https://hub.jmonkeyengine.org/t/in-range-detection-with-lots-of-entities/26910)

## Implementation Approaches

## OOP to COP . or else?

&lt;u&gt;@atomix POV:&lt;/u&gt;

As said, as a long term Java developer and also an artist. I can not see a strong, confident reason why we should switch over to COP at the moment.

BLOB is not a problem with a carefully designed software, same as hard as split your components… Deep inheritance even multi inheritance problem can not be reached in an indie project, and even it reached, maintain it always easier than redesign a 3D model to change the export pipeline!!!

Also the tangled wires between inheritance form the nature of programming and matter in the universal. :p

*BUT* They have IDE support, profiler, proved technologies, lot more… We talking about a no IDE support paradigm with plain text editor, table and some black magic, tell me more about the company will approve your plan?

Some alternative solutions may solve almost your design goals when you are likely to use an ES:

1. Smart bean framework : try Spring, EJB. For Enterprise, if you've known EJB and Spring, you will not bet in home grown ES, don't you?
1. Actor framework: try AKKA
1. If you see Java as a failure, try Scala’s trail …

:::warning
So, my last advice is: If you are not doing MMO *Take a look in other alternative technologies.* !!!!
:::

1. Try Scala and AKKA and read more about concurrency , don't use flat table!!!

## Change of mindset

:::important
I think this should be in another page or even in a book! :p
:::

This chapter dedicated to people still who really want to *switch to this new paradigm* after all the warnings and awarenesses.
So this chapter will mainly answer the BIG question:

*What should be changed to adapt to this new paradigm?*

### What will we face

### What should be change

### OOP Object Modeling vs COP Object Modeling

### Team management

## Java Entity System projects

Some open source Entity System implementation projects:

### Artemis: General

GoogleCode: [https://code.google.com/archive/p/artemis-framework/](https://code.google.com/archive/p/artemis-framework/)

Website: [http://gamadu.com/artemis/index.html](http://gamadu.com/artemis/index.html)

Wiki: [http://entity-systems.wikidot.com/artemis-entity-system-framework](http://entity-systems.wikidot.com/artemis-entity-system-framework)

:::important
Review: HERE! artemis because I can not contact with author of Artemis at the moment so I will have a short review of it with some of my experience working on it and base on its source code!
:::

#### Spartan: [used for Slick. abandoned]

GoogleCode: [https://code.google.com/archive/p/spartanframework/](https://code.google.com/archive/p/spartanframework/)

### JME integrated

#### Zay-ES : @pspeed

Post: [https://hub.jmonkeyengine.org/t/my-es-in-contrib-zay-es/25702](https://hub.jmonkeyengine.org/t/my-es-in-contrib-zay-es/25702)

Forum : [https://hub.jmonkeyengine.org/c/user-code-projects/zay-es](https://hub.jmonkeyengine.org/c/user-code-projects/zay-es)

Wiki: [entitysystem](entitysystem.md)

Links: [https://hub.jmonkeyengine.org/t/zay-es-links-more-chars-because-forum-is-dumb/27135](https://hub.jmonkeyengine.org/t/zay-es-links-more-chars-because-forum-is-dumb/27135)

Interview:

#### EntityMonkey : @zzuegg

Post: [https://hub.jmonkeyengine.org/t/entitymonkey-a-simple-entity-system-for-jme/23235](https://hub.jmonkeyengine.org/t/entitymonkey-a-simple-entity-system-for-jme/23235)

#### Private : @Empire phoenix

Interview:

### Implementation and scope of each project:

The comparisons will focus in these below points, follow with the scope, status of each projects

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

[More]

:::important
The comparison table is in Google Docs: Help me fill it!!!!
:::

[https://docs.google.com/document/d/1pRTZPFtHz7pUzYcoFiSTm-mUCA-BVYvFpUp6diIsuEo/edit?usp=sharing](https://docs.google.com/document/d/1pRTZPFtHz7pUzYcoFiSTm-mUCA-BVYvFpUp6diIsuEo/edit?usp=sharing)

## Researches & Articles

Link to articles, researches and papers you should read:

*Start of the wave*

[1] [http://t-machine.org/index.php/2007/09/03/entity-systems-are-the-future-of-mmog-development-part-1/](http://t-machine.org/index.php/2007/09/03/entity-systems-are-the-future-of-mmog-development-part-1/)

*Sploreg ES in JME introduction in indiedb*

[2] [http://www.indiedb.com/games/attack-of-the-gelatinous-blob/news/the-entity-system](http://www.indiedb.com/games/attack-of-the-gelatinous-blob/news/the-entity-system)

*Worth to read, pspeed conversation with Michael Leahy, also lead another ES project TyphonRT*

[3]
[http://t-machine.org/index.php/2011/06/24/using-an-entity-system-with-jmonkeyengine-mythruna/](http://t-machine.org/index.php/2011/06/24/using-an-entity-system-with-jmonkeyengine-mythruna/)

*Our wiki link*

[4] [entitysystem:introduction](introduction.md)

*Beside of BLOB anti pattern, explain why ES suite as data in modern GPU, CPU!*

[5]
[http://gamesfromwithin.com/data-oriented-design](http://gamesfromwithin.com/data-oriented-design)

*Worth to read, paper of another C++ ES leader of cistron project [https://code.google.com/archive/p/cistron/](https://code.google.com/archive/p/cistron/)*

*Link to other entity system approaches in its own wikidot!*

[8] [http://entity-systems.wikidot.com/es-approaches](http://entity-systems.wikidot.com/es-approaches)

*[More?]*
