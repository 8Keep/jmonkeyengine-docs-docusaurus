import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "doc",
      id: "documentation",
      label: "Getting Started"
    },
    {
      type: "link",
      label: "JavaDoc",
      href: "https://javadoc.jmonkeyengine.org"
    },
    {
      type: "doc",
      id: "release",
      label: "Release Guide"
    },
    {
      type: "doc",
      id: "tutorials/beginner/beginner",
      label: "Beginner Tutorials"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_simpleapplication",
      label: "Hello SimpleApplication"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_node",
      label: "Hello Node"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_asset",
      label: "Hello Asset"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_main_event_loop",
      label: "Hello Update Loop"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_input_system",
      label: "Hello Input System"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_material",
      label: "Hello Material"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_animation",
      label: "Hello Animation"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_picking",
      label: "Hello Picking"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_collision",
      label: "Hello Collision"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_terrain",
      label: "Hello Terrain"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_audio",
      label: "Hello Audio"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_effects",
      label: "Hello Effects"
    },
    {
      type: "doc",
      id: "tutorials/beginner/hello_physics",
      label: "Hello Physics"
    },
    {
      type: "category",
      label: "Key Concepts",
      items: [
        {
          type: "doc",
          id: "tutorials/concepts/best_practices",
          label: "Best Practices"
        },
        {
          type: "doc",
          id: "tutorials/concepts/optimization",
          label: "Optimization"
        },
        {
          type: "doc",
          id: "tutorials/concepts/faq",
          label: "Frequently Asked Questions"
        },
        {
          type: "doc",
          id: "tutorials/concepts/math_for_dummies",
          label: "Math for Dummies"
        },
        {
          type: "doc",
          id: "tutorials/concepts/math",
          label: "Math overview"
        },
        {
          type: "doc",
          id: "tutorials/concepts/math_cheet_sheet",
          label: "3D math \"cheat sheet\""
        },
        {
          type: "doc",
          id: "tutorials/concepts/rotate",
          label: "3-D Rotation"
        },
        {
          type: "doc",
          id: "tutorials/concepts/math_video_tutorials",
          label: "Math video tutorial series"
        },
        {
          type: "doc",
          id: "tutorials/concepts/multi-media_asset_pipeline",
          label: "Multi-Media Asset Pipeline"
        },
        {
          type: "doc",
          id: "tutorials/concepts/the_scene_graph",
          label: "The Scene Graph"
        },
        {
          type: "doc",
          id: "tutorials/concepts/scenegraph_for_dummies",
          label: "Scene Graph for Dummies"
        },
        {
          type: "doc",
          id: "tutorials/concepts/terminology",
          label: "3D Graphics Terminology"
        },
        {
          type: "doc",
          id: "tutorials/concepts/transparency_sorting",
          label: "Transparency Sorting"
        }
      ]
    },
    {
      type: "category",
      label: "Articles and How-to's",
      items: [
        {
          type: "category",
          label: "How to Model",
          items: [
            {
              type: "doc",
              id: "tutorials/how-to/modeling/3dsmax/3dsmax",
              label: "3dsmax"
            },
            {
              type: "doc",
              id: "tutorials/how-to/modeling/blender/blender",
              label: "Blender"
            },
            {
              type: "doc",
              id: "tutorials/how-to/modeling/blender/blender_buffer_clearing",
              label: "Buffer Clearing"
            },
            {
              type: "doc",
              id: "tutorials/how-to/modeling/blender/blender_gltf",
              label: "Export as GlTF"
            },
            {
              type: "doc",
              id: "tutorials/how-to/modeling/blender/blender_ogre_export",
              label: "Export as Ogre XML"
            },
            {
              type: "doc",
              id: "tutorials/how-to/modeling/blender/blender_ogre_compatibility",
              label: "Ogre Compatibility"
            },
            {
              type: "doc",
              id: "tutorials/how-to/modeling/blender/makehuman",
              label: "MakeHuman"
            },
            {
              type: "doc",
              id: "tutorials/how-to/modeling/blender/makehuman_blender_ogrexml_toolchain",
              label: "MakeHuman toolchain"
            }
          ]
        },
        {
          type: "category",
          label: "How to Animate",
          items: [
            {
              type: "category",
              label: "Mixamo",
              items: [
                {
                  type: "doc",
                  id: "tutorials/how-to/modeling/blender/mixamo",
                  label: "Blender Models"
                }
              ]
            }
          ]
        },
        {
          type: "doc",
          id: "tutorials/how-to/debugging",
          label: "Debugging with Wireframes"
        },
        {
          type: "doc",
          id: "tutorials/how-to/util/free_skymaps",
          label: "How to create free skymaps"
        },
        {
          type: "category",
          label: "Java Tips",
          items: [
            {
              type: "doc",
              id: "tutorials/how-to/java/localization",
              label: "Localization"
            },
            {
              type: "doc",
              id: "tutorials/how-to/java/swing_canvas",
              label: "Swing Canvas"
            },
            {
              type: "doc",
              id: "tutorials/how-to/java/logging",
              label: "Logging"
            },
            {
              type: "doc",
              id: "tutorials/how-to/java/read_graphic_card_capabilites",
              label: "Read Graphics Capabilities"
            }
          ]
        },
        {
          type: "category",
          label: "Articles",
          items: [
            {
              type: "category",
              label: "Physically Based Rendering",
              items: [
                {
                  type: "doc",
                  id: "tutorials/how-to/articles/pbr/pbr_part1",
                  label: "PBR – Part one"
                },
                {
                  type: "doc",
                  id: "tutorials/how-to/articles/pbr/pbr_part2",
                  label: "PBR – Part two"
                },
                {
                  type: "doc",
                  id: "tutorials/how-to/articles/pbr/pbr_part3",
                  label: "PBR – Part three"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      type: "category",
      label: "Core Engine",
      items: [
        {
          type: "doc",
          id: "core/app/simpleapplication",
          label: "SimpleApplication"
        },
        {
          type: "doc",
          id: "core/system/appsettings",
          label: "AppSettings"
        }
      ]
    },
    {
      type: "category",
      label: "Controlling Game Logic",
      items: [
        {
          type: "doc",
          id: "core/app/update_loop",
          label: "Update Loop"
        },
        {
          type: "doc",
          id: "core/app/state/application_states",
          label: "Application States"
        },
        {
          type: "doc",
          id: "core/scene/control/custom_controls",
          label: "Custom Controls"
        },
        {
          type: "category",
          label: "Video",
          items: [
            {
              type: "link",
              label: "Control any scene node",
              href: "https://www.youtube.com/watch?v=MNDiZ9YHIpM"
            },
            {
              type: "link",
              label: "Control a character",
              href: "https://www.youtube.com/watch?v=-OzRZscLlHY"
            },
            {
              type: "link",
              label: "Video Source Code",
              href: "https://wiki.jmonkeyengine.org/Scenes/SDK-UsecaseDemo_1.zip"
            }
          ]
        },
        {
          type: "doc",
          id: "core/app/multithreading",
          label: "Multithreading"
        }
      ]
    },
    {
      type: "category",
      label: "Scene Graph",
      items: [
        {
          type: "doc",
          id: "core/scene/traverse_scenegraph",
          label: "Traverse SceneGraph"
        },
        {
          type: "doc",
          id: "core/scene/spatial",
          label: "Spatial: Node vs Geometry"
        },
        {
          type: "doc",
          id: "core/scene/mesh",
          label: "Mesh"
        },
        {
          type: "doc",
          id: "core/scene/custom_meshes",
          label: "Custom Meshes"
        },
        {
          type: "doc",
          id: "core/scene/shape/shape",
          label: "Shape"
        },
        {
          type: "doc",
          id: "core/scene/3d_models",
          label: "3D Models"
        },
        {
          type: "doc",
          id: "core/asset/asset_manager",
          label: "Asset Manager"
        },
        {
          type: "doc",
          id: "core/export/save_and_load",
          label: "Saving and Loading Nodes"
        },
        {
          type: "doc",
          id: "core/collision/collision_and_intersection",
          label: "Collision and Intersection"
        },
        {
          type: "doc",
          id: "core/scene/control/level_of_detail",
          label: "Level of Detail"
        }
      ]
    },
    {
      type: "category",
      label: "Animation, Scene",
      items: [
        {
          type: "doc",
          id: "core/animation/animation_new",
          label: "Animation with AnimComposer"
        },
        {
          type: "doc",
          id: "core/animation/animation",
          label: "Animation-Old (AnimControl)"
        },
        {
          type: "doc",
          id: "core/cinematic/cinematics",
          label: "Cinematics (cutscenes, fake destruction physics)"
        },
        {
          type: "doc",
          id: "core/cinematic/motionpath",
          label: "MotionPaths and Waypoints"
        }
      ]
    },
    {
      type: "category",
      label: "Material, Light, Shadow",
      items: [
        {
          type: "doc",
          id: "core/material/how_to_use_materials",
          label: "How to use Materials"
        },
        {
          type: "doc",
          id: "core/material/j3m_material_files",
          label: ".j3m Material Files"
        },
        {
          type: "doc",
          id: "core/material/material_definitions",
          label: ".j3md Material Definitions"
        },
        {
          type: "doc",
          id: "core/material/materials_overview",
          label: ".j3md Properties"
        },
        {
          type: "doc",
          id: "core/shader/jme3_shaders",
          label: "Shaders and JME3"
        },
        {
          type: "doc",
          id: "core/shader/jme3_shadernodes",
          label: "Shader Node System"
        },
        {
          type: "doc",
          id: "core/shader/shader_video_tutorials",
          label: "Shader Video Tutorials"
        },
        {
          type: "doc",
          id: "core/light/light_and_shadow",
          label: "Light and Shadow"
        },
        {
          type: "doc",
          id: "core/texture/anisotropic_filtering",
          label: "Anisotropic Filtering"
        },
        {
          type: "doc",
          id: "core/system/jme3_srgbpipeline",
          label: "Gamma Correction"
        },
        {
          type: "doc",
          id: "core/material/normal_types",
          label: "Normal Map Conventions"
        }
      ]
    },
    {
      type: "category",
      label: "Audio, Video",
      items: [
        {
          type: "doc",
          id: "core/audio/audio",
          label: "Playing Sounds"
        },
        {
          type: "doc",
          id: "core/audio/audio_environment_presets",
          label: "Audio Environment Presets"
        },
        {
          type: "doc",
          id: "core/app/state/screenshots",
          label: "Capture Screenshots"
        },
        {
          type: "doc",
          id: "core/app/state/capture_audio_video_to_a_file",
          label: "Capture Audio/Video"
        }
      ]
    },
    {
      type: "category",
      label: "Filter, Effect",
      items: [
        {
          type: "doc",
          id: "core/effect/effects_overview",
          label: "Overview"
        },
        {
          type: "doc",
          id: "core/effect/bloom_and_glow",
          label: "Bloom and Glow"
        },
        {
          type: "doc",
          id: "core/effect/particle_emitters",
          label: "Particle Emitters"
        }
      ]
    },
    {
      type: "category",
      label: "Landscapes",
      items: [
        {
          type: "doc",
          id: "core/util/sky",
          label: "Sky"
        },
        {
          type: "doc",
          id: "core/terrain/terrain",
          label: "Terrain (TerraMonkey)"
        },
        {
          type: "doc",
          id: "core/collision/terrain_collision",
          label: "Terrain Collision"
        },
        {
          type: "doc",
          id: "core/effect/water",
          label: "Simple Water"
        },
        {
          type: "doc",
          id: "core/effect/post-processor_water",
          label: "Post-Processor Water"
        }
      ]
    },
    {
      type: "category",
      label: "Camera",
      items: [
        {
          type: "doc",
          id: "core/renderer/camera",
          label: "Camera"
        },
        {
          type: "doc",
          id: "core/renderer/making_the_camera_follow_a_character",
          label: "Follow a Character"
        },
        {
          type: "doc",
          id: "core/renderer/remote-controlling_the_camera",
          label: "Remote-Controlling"
        },
        {
          type: "doc",
          id: "core/renderer/multiple_camera_views",
          label: "Multiple Camera Views"
        },
        {
          type: "doc",
          id: "core/renderer/jme3_renderbuckets",
          label: "Render Buckets"
        }
      ]
    },
    {
      type: "category",
      label: "Rendering",
      items: [
        {
          type: "doc",
          id: "core/renderer/render_pipeline",
          label: "Render Pipelines"
        }
      ]
    },
    {
      type: "category",
      label: "User Interaction",
      items: [
        {
          type: "doc",
          id: "core/input/input_handling",
          label: "Input Handling"
        },
        {
          type: "doc",
          id: "core/input/combo_moves",
          label: "Combo Moves"
        },
        {
          type: "doc",
          id: "core/input/mouse_picking",
          label: "Mouse Picking"
        }
      ]
    },
    {
      type: "doc",
      id: "core/gui/topic_gui",
      label: "Graphical User Interface"
    },
    {
      type: "category",
      label: "Nifty GUI",
      items: [
        {
          type: "doc",
          id: "core/gui/nifty_gui",
          label: "Integration Tutorial"
        },
        {
          type: "doc",
          id: "core/gui/nifty_gui_best_practices",
          label: "Best Practices"
        },
        {
          type: "doc",
          id: "core/gui/nifty_gui_scenarios",
          label: "Scenarios"
        }
      ]
    },
    {
      type: "doc",
      id: "core/ui/hud",
      label: "Head-Up Display (HUD)"
    },
    {
      type: "category",
      label: "Virtual Reality",
      items: [
        {
          type: "doc",
          id: "core/vr/virtualreality",
          label: "Virtual Reality"
        },
        {
          type: "doc",
          id: "core/vr/legacyOpenVr",
          label: "Virtual Reality Legacy Support"
        },
        {
          type: "doc",
          id: "core/vr/virtualrealitycontrollers",
          label: "Virtual Reality Legacy Controller Support"
        }
      ]
    },
    {
      type: "doc",
      id: "physics/physics",
      label: "Physics"
    },
    {
      type: "doc",
      id: "physics/bullet_multithreading",
      label: "Multi-Threaded Physics"
    },
    {
      type: "doc",
      id: "physics/collision/physics_listeners",
      label: "Collision Detection"
    },
    {
      type: "doc",
      id: "physics/joint/hinges_and_joints",
      label: "Hinges and Joints"
    },
    {
      type: "doc",
      id: "physics/control/walking_character",
      label: "Walking Character"
    },
    {
      type: "doc",
      id: "physics/control/ragdoll",
      label: "Ragdoll"
    },
    {
      type: "doc",
      id: "physics/control/vehicles",
      label: "Vehicles"
    },
    {
      type: "doc",
      id: "physics/control/softbody",
      label: "Softbody"
    },
    {
      type: "doc",
      id: "physics/bullet_pitfalls",
      label: "Bullet Physics Pitfalls"
    },
    {
      type: "category",
      label: "Networking",
      items: [
        {
          type: "doc",
          id: "networking/networking",
          label: "Networking (SpiderMonkey)"
        },
        {
          type: "doc",
          id: "networking/headless_server",
          label: "Headless Server"
        },
        {
          type: "doc",
          id: "networking/monkey_zone",
          label: "Multi-Player Demo Code"
        },
        {
          type: "doc",
          id: "networking/networking_video_tutorials",
          label: "Networking Video Tutorials"
        }
      ]
    },
    {
      type: "category",
      label: "User Contributions",
      items: [
        {
          type: "doc",
          id: "contributions/contributions",
          label: "User Made Utilities"
        },
        {
          type: "category",
          label: "Shader",
          items: [
            {
              type: "doc",
              id: "contributions/shader/shaderblow_project",
              label: "ShaderBlow Project"
            }
          ]
        },
        {
          type: "category",
          label: "Landscapes",
          items: [
            {
              type: "doc",
              id: "contributions/lanscapes/vegetationsystem/vegetationsystem",
              label: "Vegetation System"
            }
          ]
        },
        {
          type: "category",
          label: "Networking",
          items: [
            {
              type: "doc",
              id: "contributions/networking/open_game_finder",
              label: "Open Game Finder"
            }
          ]
        },
        {
          type: "category",
          label: "Entity System",
          items: [
            {
              type: "html",
              value: "The Zay-ES Entity System",
              defaultStyle: true
            }
          ]
        },
        {
          type: "category",
          label: "Artificial Intelligence",
          items: [
            {
              type: "doc",
              id: "contributions/ai/recast",
              label: "Recast Navigation"
            },
            {
              type: "doc",
              id: "contributions/ai/building_recast",
              label: "Updating and building Recast Native Bindings"
            },
            {
              type: "doc",
              id: "contributions/ai/monkey_brains",
              label: "Monkey Brains"
            },
            {
              type: "doc",
              id: "contributions/ai/steer_behaviours",
              label: "Steer Behaviours"
            },
            {
              type: "doc",
              id: "contributions/ai/jme3_ai",
              label: "jME3 Artificial Intelligence"
            }
          ]
        },
        {
          type: "doc",
          id: "contributions/gui/topic_contributions_gui",
          label: "GUI"
        },
        {
          type: "html",
          value: "Lemur - a native jME3 GUI library with scene graph tools",
          defaultStyle: true
        },
        {
          type: "html",
          value: "tonegodGUI - a native jME3 GUI library",
          defaultStyle: true
        },
        {
          type: "html",
          value: "Immediate graphical user interface",
          defaultStyle: true
        },
        {
          type: "category",
          label: "Tools",
          items: [
            {
              type: "doc",
              id: "contributions/tools/navigation",
              label: "Mercator Projection Tool (Marine Navigation)"
            },
            {
              type: "doc",
              id: "contributions/tools/charts",
              label: "Visualizing Maps in JME3 (Marine Charts)"
            }
          ]
        },
        {
          type: "doc",
          id: "contributions/vr/topic_contributions_vr",
          label: "Virtual Reality (And augmented reality)"
        },
        {
          type: "html",
          value: "Tamarin OpenXR",
          defaultStyle: true
        },
        {
          type: "category",
          label: "Projects",
          items: [
            {
              type: "doc",
              id: "contributions/projects/rise_of_mutants_project",
              label: "Rise of Mutants Project"
            }
          ]
        }
      ]
    },
    {
      type: "doc",
      id: "sdk/sdk",
      label: "SDK"
    },
    {
      type: "category",
      label: "Video Tutorials",
      items: [
        {
          type: "category",
          label: "SDK Use Case Tutorials",
          items: [
            {
              type: "link",
              label: "Demo 1 (Quixote demo)",
              href: "http://www.youtube.com/watch?v=-OzRZscLlHY"
            },
            {
              type: "link",
              label: "Demo 2 (Models and Materials)",
              href: "http://www.youtube.com/watch?v=6-YWxD3JByE"
            }
          ]
        },
        {
          type: "category",
          label: "SDK Tutorials",
          items: [
            {
              type: "link",
              label: "Basics",
              href: "http://www.youtube.com/watch?v=M1_0pbeyJzI"
            },
            {
              type: "link",
              label: "Importing Models",
              href: "http://www.youtube.com/watch?v=nL7woH40i5c"
            },
            {
              type: "link",
              label: "Dragging&amp;Dropping Nodes",
              href: "http://www.youtube.com/watch?v=DUmgAjiNzhY"
            },
            {
              type: "link",
              label: "Scene Composing",
              href: "http://www.youtube.com/watch?v=ntPAmtsQ6eM"
            },
            {
              type: "link",
              label: "Terrain with Collision Shape",
              href: "http://www.youtube.com/watch?v=zgPV3W6dD4s"
            },
            {
              type: "link",
              label: "Working with Materials",
              href: "http://www.youtube.com/watch?v=Feu3-mrpolc"
            },
            {
              type: "link",
              label: "Custom Controls",
              href: "http://www.youtube.com/watch?v=MNDiZ9YHIpM"
            },
            {
              type: "link",
              label: "WebStart Deployment",
              href: "http://www.youtube.com/watch?v=oZnssg8TBWQ"
            },
            {
              type: "link",
              label: "Animation and Effect TrackEditing",
              href: "http://www.youtube.com/watch?v=D7JM4VMKqPc"
            }
          ]
        }
      ]
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
        {
          type: "doc",
          id: "sdk/update_center",
          label: "Updating jMonkeyEngine SDK"
        },
        {
          type: "doc",
          id: "sdk/troubleshooting",
          label: "Troubleshooting"
        }
      ]
    },
    {
      type: "category",
      label: "Java Development Features",
      items: [
        {
          type: "doc",
          id: "sdk/project_creation",
          label: "Project Creation"
        },
        {
          type: "doc",
          id: "sdk/code_editor",
          label: "Code Editor and Palette"
        },
        {
          type: "doc",
          id: "sdk/version_control",
          label: "File Version Control"
        },
        {
          type: "doc",
          id: "sdk/debugging_profiling_testing",
          label: "Debug, Profile, Test"
        },
        {
          type: "doc",
          id: "sdk/application_deployment",
          label: "Application Deployment"
        },
        {
          type: "doc",
          id: "sdk/default_build_script",
          label: "Default Build Script"
        },
        {
          type: "doc",
          id: "sdk/android",
          label: "Android"
        },
        {
          type: "doc",
          id: "sdk/android_cheat_sheet",
          label: "Android Cheat Sheet"
        },
        {
          type: "doc",
          id: "sdk/ios",
          label: "iOS"
        }
      ]
    },
    {
      type: "category",
      label: "Unique Features",
      items: [
        {
          type: "doc",
          id: "sdk/model_loader_and_viewer",
          label: "Import, View, Convert Models"
        },
        {
          type: "doc",
          id: "sdk/asset_packs",
          label: "Asset Packs"
        },
        {
          type: "doc",
          id: "sdk/scene_explorer",
          label: "The SceneExplorer"
        },
        {
          type: "doc",
          id: "sdk/scene_composer",
          label: "Composing a Scene"
        },
        {
          type: "doc",
          id: "sdk/terrain_editor",
          label: "Terrain Editor"
        },
        {
          type: "doc",
          id: "sdk/sample_code",
          label: "Sample Code"
        },
        {
          type: "doc",
          id: "sdk/material_editing",
          label: "Material Editing"
        },
        {
          type: "doc",
          id: "sdk/font_creation",
          label: "Creating Bitmap Fonts"
        },
        {
          type: "link",
          label: "Audio and Effect Track Editing",
          href: "https://hub.jmonkeyengine.org/t/effecttrack-and-audiotrack-editing-in-the-sdk/23378"
        },
        {
          type: "link",
          label: "Video: Effect and AudioTrack editing in jMonkeyEngine 3 sdk",
          href: "https://www.youtube.com/watch?v=D7JM4VMKqPc"
        },
        {
          type: "doc",
          id: "sdk/filters",
          label: "Post-Processor Filter Editor and Viewer"
        },
        {
          type: "doc",
          id: "core/app/state/application_states",
          label: "Application States"
        },
        {
          type: "doc",
          id: "core/scene/control/custom_controls",
          label: "Custom Controls"
        },
        {
          type: "doc",
          id: "sdk/vehicle_creator",
          label: "Vehicle Creator"
        },
        {
          type: "doc",
          id: "sdk/assetbrowser",
          label: "Asset Browser"
        },
        {
          type: "doc",
          id: "sdk/animations",
          label: "Animations"
        }
      ]
    },
    {
      type: "category",
      label: "Advanced Usage",
      items: [
        {
          type: "doc",
          id: "sdk/build_platform",
          label: "Building jMonkeyEngine SDK"
        },
        {
          type: "html",
          value: "Using your own (modified) version of jME3 in jMonkeyEngine SDK",
          defaultStyle: true
        },
        {
          type: "doc",
          id: "sdk/increasing_heap_memory",
          label: "Increasing Heap Memory"
        },
        {
          type: "doc",
          id: "sdk/log_files",
          label: "Log Files"
        }
      ]
    },
    {
      type: "category",
      label: "Available external plugins",
      items: [
        {
          type: "doc",
          id: "contributions/contributions",
          label: "Contributions"
        },
        {
          type: "doc",
          id: "sdk/neotexture",
          label: "Neo Texture Editor for procedural textures"
        },
        {
          type: "link",
          label: "Video: Mesh Tool &amp; Physics Editor",
          href: "http://www.youtube.com/watch?v=yS9a9o4WzL8"
        }
      ]
    },
    {
      type: "doc",
      id: "sdk/development",
      label: "Developing plugins for jMonkeyEngine SDK"
    },
    {
      type: "doc",
      id: "sdk/development/setup",
      label: "Creating a plugin"
    },
    {
      type: "doc",
      id: "sdk/development/general",
      label: "Creating components"
    },
    {
      type: "doc",
      id: "sdk/development/scene",
      label: "The Main Scene"
    },
    {
      type: "doc",
      id: "sdk/development/sceneexplorer",
      label: "The Scene Explorer"
    },
    {
      type: "doc",
      id: "sdk/development/projects_assets",
      label: "Projects and Assets"
    },
    {
      type: "doc",
      id: "sdk/development/extension_library",
      label: "Create a library plugin from a jar file"
    },
    {
      type: "doc",
      id: "sdk/development/model_loader",
      label: "Create a new or custom model filetype and loader"
    },
    {
      type: "doc",
      id: "wiki/wiki_contributor",
      label: "Contributor"
    },
    {
      type: "doc",
      id: "wiki/wiki_admin",
      label: "Admin"
    },
    {
      type: "doc",
      id: "wiki/emoji",
      label: "Emoji"
    },
    {
      type: "doc",
      id: "wiki/atom_editor",
      label: "Atom Editor"
    },
    {
      type: "doc",
      id: "wiki/atom_snippets",
      label: "Atom Snippets"
    }
  ],
};

export default sidebars;
