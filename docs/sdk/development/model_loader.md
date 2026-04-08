# jMonkeyEngine SDK: Creating a model importer

You can create custom model importers for the jMonkeyEngine SDK. The SDK supports NBM plugins.

1. [Create an NBM plugin](http://platform.netbeans.org/tutorials/nbm-filetype.html)
1. Add importer jar file (wrap jar file)
1. Add filetype (Template)
1. Change DataObject to extend SpatialAssetDataObject
1. Implement getAssetKey(): if(!assetKey instanceof MyKeyType)&#123;assetKey = new MyKeyType(oldKey);&#125; return key;
1. Maybe implement loadAsset method in DataObject (if necessary, most model formats should load normally via the loader)
1. Create AssetManagerConfigurator

See also:

- [Projects and Assets](projects_assets.md)
- [http://platform.netbeans.org/tutorials/nbm-filetype.html](http://platform.netbeans.org/tutorials/nbm-filetype.html)
