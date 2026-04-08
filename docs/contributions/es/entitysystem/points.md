# points

## ES Design goals explained

This page revive and explain more about points of design goals and implementations for an ES and its usefulness (means features) to corporate with other Java and game software techs and layers.

Theoretically a Java ES done right should be:

1. Pure data : very debatable
  1. Mutable : as bean with setter and getter
  1. Immutable : as bean with getter, should be replace if changed.

1. Multi-threading, concurrency enable : very debatable
  1. As my experience, pure data or not is not clear contract to multi-threading success. Consider other things happen outside of ES scope, so it not an solid warranty that those component will not be touched by any other thread.
  1. Also if there is a contract that no other thread touching those data, in Java style via synchronization or other paradigm like actor… multi-threading also consider success but just more complicated!

1. Communication: very debatable
  1. Event messaging enable
  1. No event or messaging : update beat, no need of inter-com or events. How can we do network messaging?

1. Is database (and other kind of persistent) friendly
  1. Save to XML (file, serialized)?
  1. Send over network?
  1. Change sets are resembling Database concept, what about transactions?

1. Is enterprise friendly (expandable/ extensible/ modulizable)
  1. Spring, as lazy loaded, injected?

1. Script possibilities
  1. Can be script, non trivial work in pure data!
  1. Can be use with other JVM language than java like groovy, or scala, jython?

1. Restrictions and limitation
  1. No dynamic Java object methods in Component ? What about Entities and Systems ( Processors)
  1. An overall way to manage and config Systems, freely chose? How to hook to its routine?

1. Dependencies
  1. The separation of components are clear, as no dependencies at all. Hard cored, scripted or injected will break the overall contract!
  1. The separation of Entities. What about dependencies of entities? Ex: parent/ child relationship in JME spatial. How the framework handle that?
  1. The separation of Systems. Ex: any contract about that?
