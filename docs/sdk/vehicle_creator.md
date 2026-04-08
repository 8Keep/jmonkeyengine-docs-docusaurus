# jMonkeyEngine SDK: Vehicle Creator

Best results when car is facing in z direction (towards you).

## Usage

1. Select a j3o that contains a vehicle model and press the vehicle button (or right-click → edit vehicle)
1. The VehicleCreator automatically adds a PhysicsVehicleControl to the rootNode of the model if there is none
1. Select the Geometry or Node that contains the chassis in the SceneExplorer and press "`create hull shape from selected`"
1. Select a Geometry that contains a wheel and press "`make selected spatial wheel`", select the "`front wheel`" checkboxes for front wheels
1. Do so for all wheels

New wheels will get the current suspension settings, you can edit single wheels via the SceneExplorer (update VehicleControl if wheels don't show up) or apply settings created with the settings generator to wheel groups.

Press the "`test vehicle`" button to drive the vehicle, use WASD to control, Enter to reset.

## Known Issues

Don't save while testing the vehicle, you will save the location and acceleration info in the j3o.

## Code Sample

Code Example to load vehicle:

```java

//load vehicle and access VehicleControl
Spatial car=assetManager.loadModel("Models/MyCar.j3o");
VehicleControl control=car.getControl(VehicleControl.class);
rootNode.attachChild(car);
physicsSpace.add(control);
 
//then use the control to control the vehicle:
control.setPhysicsLocation(new Vector3f(10,2,10));
control.accelerate(100);

```
