# Atom Snippets

Copy and paste this text into your Atom Editor "File &gt; Snippets..." page to add some useful shortcuts. Feel free to contribute any changes so other editors can benifit by selecting the "`Edit this Page`" link in the header of this page and submitting a pull request in the wiki repo.

```
# Your snippets
#
# Atom snippets allow you to enter a simple prefix in the editor and hit tab to
# expand the prefix into a larger code block with templated values.
#
# You can create a new snippet in this file by typing "snip" and then hitting
# tab.
#
# An example CoffeeScript snippet to expand log to console.log:
#
# '.source.coffee':
#   'Console log':
#     'prefix': 'log'
#     'body': 'console.log $1'
#
# Each scope (e.g. '.source.coffee' above) can only be declared once.
#
# This file uses CoffeeScript Object Notation (CSON).
# If you are unfamiliar with CSON, you can read more about it in the
# Atom Flight Manual:
# http://flight-manual.atom.io/using-atom/sections/basic-customization/#_cson
'.source.asciidoc':
  'Cross reference internal element, same page':
    'prefix': 'xrefI'
    'body': '$&#123;2:label text&#125;'
  'Cross reference internal element, same module':
    'prefix': 'xrefIsm'
    'body': '$&#123;3:label text&#125;'
  'Cross reference internal element, named module':
    'prefix': 'xrefInm'
    'body': '$&#123;4:label text&#125;'
  'Cross reference page, same module':
    'prefix': 'xrefPsm'
    'body': '$&#123;2:link text&#125;'
  'Cross reference page, named module':
    'prefix': 'xrefPnm'
    'body': '$&#123;3:link text&#125;'
  'Cross reference page, ROOT module':
    'prefix': 'xrefPrm'
    'body': '$&#123;2:link text&#125;'
  'Admonition Block':
    'prefix': 'admonB'
    'body': """
    [$&#123;1:NOTE&#125;$&#123;2:TIP&#125;$&#123;3:IMPORTANT&#125;$&#123;4:CAUTION&#125;$&#123;5:WARNING&#125;]
    ====
    $6
    ====
    $7
    """
  'Admonition Block with Title':
    'prefix': 'admonBwT'
    'body': """
    [$&#123;1:NOTE&#125;$&#123;2:TIP&#125;$&#123;3:IMPORTANT&#125;$&#123;4:CAUTION&#125;$&#123;5:WARNING&#125;]
    .$&#123;6:Optional Title&#125;
    ====
    $7
    ====
    $8
    """
  'Admonition Paragraph':
    'prefix': 'admonP'
    'body': """
    $&#123;1:NOTE&#125;$&#123;2:TIP&#125;$&#123;3:IMPORTANT&#125;$&#123;4:CAUTION&#125;$&#123;5:WARNING&#125;: $6
    """
  'Admonition Paragraph with Title':
    'prefix': 'admonPwT'
    'body': """
    .$&#123;1:Optional Title&#125;
    $&#123;2:NOTE&#125;$&#123;3:TIP&#125;$&#123;4:IMPORTANT&#125;$&#123;5:CAUTION&#125;$&#123;6:WARNING&#125;: $7
    """
  'Include partial same module':
    'prefix': 'part'
    'body': 'include::partial$$&#123;1:partial-filename&#125;.adoc[$&#123;3:line=&#125;$&#123;4:tag=&#125;$&#123;5:tags=&#125;]'
  'Include partial different module':
    'prefix': 'partM'
    'body': 'include::$&#123;1:module&#125;:partial$$&#123;2:partial-filename&#125;.adoc[$&#123;3:line=&#125;$&#123;4:tag=&#125;$&#123;5:tags=&#125;]'
  'Include partial ROOT':
    'prefix': 'partR'
    'body': 'include::ROOT:partial$$&#123;1:partial-filename&#125;.adoc[$&#123;2:line=&#125;$&#123;3:tag=&#125;$&#123;4:tags=&#125;]'
  'Module inline image':
    'prefix': 'imgMI'
    'body': '![$&#123;3:&#125;](/wiki-assets/docs-wiki/ROOT/assets/images/$&#123;1:module&#125;:$&#123;2:target-resource-filename.ext&#125;)'
  'Module block image':
    'prefix': 'imgMB'
    'body': '![$&#123;3:&#125;](/wiki-assets/docs-wiki/ROOT/assets/images/:$&#123;1:module&#125;:$&#123;2:target-resource-filename.ext&#125;)'
  'ROOT inline image':
    'prefix': 'imgRI'
    'body': '![$&#123;2:&#125;](/wiki-assets/docs-wiki/ROOT/assets/images/$&#123;1:target-resource-filename.ext&#125;)'
  'ROOT block image':
    'prefix': 'imgRB'
    'body': '![$&#123;2:&#125;](/wiki-assets/docs-wiki/ROOT/assets/images/:ROOT:$&#123;1:target-resource-filename.ext&#125;)'
```
