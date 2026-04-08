# Working Blender and OgreXML Versions

Here you can find working combinations of Blender and the OgreXML exporter, with any tips or bugs associated with each.

:::warning
As of Blender version 2.8+, OgreXML is no longer compatible for exporting. See [Supported External File Types](../../../../getting-started/features.md#supported-external-file-types) for other options.
:::

<table>
  <thead>
    <tr>
      <th>Blender Version</th>
      <th>OgreXML Exporter Version</th>
      <th>Notes<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2.78-2.79</td>
      <td>[0.6.0](https://code.google.com/archive/p/blender2ogre/downloads)</td>
      <td>Root bone, no transforms on object, no envelopes<br /></td>
    </tr>
    <tr>
      <td>2.6.3</td>
      <td>[0.5.8](https://code.google.com/archive/p/blender2ogre/downloads)</td>
      <td>Root bone, no transforms on object, no envelopes<br /></td>
    </tr>
    <tr>
      <td>2.6.2</td>
      <td>[0.5.5](https://code.google.com/archive/p/blender2ogre/downloads)</td>
      <td>Root bone, no transforms on object, no envelopes<br /></td>
    </tr>
    <tr>
      <td>2.6.1</td>
      <td>?</td>
      <td><br /></td>
    </tr>
    <tr>
      <td>2.6.0</td>
      <td>?</td>
      <td><br /></td>
    </tr>
  </tbody>
</table>

## Tips

Tips for exporting animations through OgreXML correctly:

- apply all transformations
- armature should have 0,0,0 transformation (loc,rot,scale)
- model object should have 0,0,0 transformation (loc,rot,scale)
- root bone should have 0,0,0 transformation (loc,rot,scale)
- no envelopes

image:how-to/modeling/blender/ogre_solved.jpg[ogre_solved.jpg,width="",height=""]
image:how-to/modeling/blender/ogre_solved2.png[ogre_solved2.png,width="",height=""]

## Troubleshooting

*Q:* _My animation is stretched._

*A:* Use the exporting tips provided above
