# JMonkey Entity System Usage

## Initialize the Entity System

```java

EntitySystem entitySystem = new EntitySystem(new DefaultEntityData());

```

## Writing an own Component

```java

public class MovementComponent extends Component {

    private Vector3f movement;

    public MovementComponent(Vector3f movement)
    {
        this.movement=movement;
    }

    public Vector3f getMovement()
    {
        return movement;
    }
}
```

## Adding a new Entity

```java

Component[] components = new Component[6];

components[0] = new VisualRepComponent("Models/HoverTank/Tank2.mesh.xml");
components[1] = new PositionComponent(v3f,new Quaternion());
components[2] = new MovementComponent(Vector3f.ZERO);
components[3] = new InSceneComponent(true);
components[4] = new PlayerComponent();
components[5] = new CollisionComponent(5);

entitySystem.newEntity(components);

```

## Creating a new EntitySet

```java

Entity Set entitySet = entitySystem.getEntitySet(MovementComponent.class, PositionComponent.class);

```

For the single parts of your program who deal with special components it is recommended to use [AppStates](../../../core/app/state/application_states.md).

## Loop through all entities

```java

entitySet.applyChanges()

Iterator<Entity> iterator = entitySet.getIterator();
while (iterator.hasNext()) {
      Entity entity = iterator.next();
	//do something
}

```

## Only get changed Entities

```java

if(entitySet.applyChanges())
{
 	entitySet.getAddedEntities(); //Get the Set of new added entities
        entitySet.getChangedEntities(); //Get the Set of changed entities
        entitySet.getRemovedEntities(); //Get the Set of removed entities
}

```

## Update a component

```java

entity.setComponent(new PositionComponent(new Vector3f()));

```

## Destroy an entity

```java

entity.destroy();

```

## How to display Spatials if it not allowed to save them into the components?

Use an EntityControl class which is able to display Entitys with visual components.
In an AppState with a Map containing Entities and and EntityControls they can be merged together and updated.
