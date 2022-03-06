This repo contains the tree parsing functions which are used in multiple repos throughout the project.

## treeStringToJson
This parses a tree output into JSON for further use. Sample JSON format is below. Node names are stored in the keys and children are stored as an object in the value.
```json
[
  {
    "name": "AboutView",
    "children": [],
  },
  {
    "name": "App",
    "children": [
      {
        "name": "Header",
        "children": [
          {
            "name": "index.tsx",
            "children": [],
          }
        ]
      },
      {
        "name": "index.tsx",
        "children": [],
      },
      {
        "name": "style.ts",
        "children": [],
      }
    ]
  }
]
```

## treeJsonToString
This is used to convert the JSON back to a formatted string for logging or storing in a file.
```tree
├── AboutView
└── App
  ├── Header
  │  └── index.tsx
  ├── index.tsx
  └── style.ts
```