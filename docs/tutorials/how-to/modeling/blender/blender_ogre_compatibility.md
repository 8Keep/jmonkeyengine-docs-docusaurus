# Working Blender and OgreXML Versions

Here you can find working combinations of Blender and the OgreXML exporter, with any tips or bugs associated with each.

:::warning
As of Blender version 2.8+, OgreXML is no longer compatible for exporting. See [Supported External File Types](../../../../getting-started/features.md#supported-external-file-types) for other options.
:::

| Blender Version |
| --- |
| OgreXML Exporter Version |
| Notes<br /> |
| 2.78-2.79 |
| [0.6.0](https://code.google.com/archive/p/blender2ogre/downloads) |
| Root bone, no transforms on object, no envelopes<br /> |
| 2.6.3 |
| [0.5.8](https://code.google.com/archive/p/blender2ogre/downloads) |
| Root bone, no transforms on object, no envelopes<br /> |
| 2.6.2 |
| [0.5.5](https://code.google.com/archive/p/blender2ogre/downloads) |
| Root bone, no transforms on object, no envelopes<br /> |
| 2.6.1 |
| ? |
| <br /> |
| 2.6.0 |
| ? |
| <br /> |

## Tips

Tips for exporting animations through OgreXML correctly:

- apply all transformations
- armature should have 0,0,0 transformation (loc,rot,scale)
- model object should have 0,0,0 transformation (loc,rot,scale)
- root bone should have 0,0,0 transformation (loc,rot,scale)
- no envelopes

![ogre_solved.jpg](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/ogre_solved.jpg)
![ogre_solved2.png](/wiki-assets/docs/tutorials/assets/images/how-to/modeling/blender/ogre_solved2.png)

## Troubleshooting

*Q:* _My animation is stretched._

*A:* Use the exporting tips provided above
