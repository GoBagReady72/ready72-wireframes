# ready72-wireframes

Scene-by-scene static wireframes for Ready72 with four explicit routes per scene:
- `desktop/` — wraps the canonical responsive wireframe for a 1440×900 canvas
- `tablet/` — wraps the canonical responsive wireframe for a 1024×768 canvas
- `mobile-portrait/` — serves the provided mobile-portrait wireframe (no changes), via wrapper
- `mobile-landscape/` — serves the provided mobile-landscape wireframe (no changes), via wrapper

## WF01 structure
```
WF01_intro/
  common/
    index.html            # exact provided responsive file (no edits)
  desktop/
    index.html            # iframe wrapper → ../common/index.html (1440×900)
  tablet/
    index.html            # iframe wrapper → ../common/index.html (1024×768)
  mobile-portrait/
    index.html            # iframe wrapper → ./raw.html (to be replaced with your mobile portrait)
    raw.html              # replace with your provided mobile portrait HTML
  mobile-landscape/
    index.html            # iframe wrapper → ./raw.html (to be replaced with your mobile landscape)
    raw.html              # replace with your provided mobile landscape HTML
  vercel.json
```

## Deploy (Vercel, static)
- Framework: **Other**
- Root Directory: **WF01_intro**
- Build Command: *(empty)* or `:`
- Output Directory: **.**
- Clean URLs are enabled via `vercel.json`.
