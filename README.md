# Bella Rahman Portfolio - Website V2

This is a static portfolio site built with plain HTML, CSS, and JavaScript. The structure is intentionally simple so it stays easy to update as new case studies, archive images, and media assets are added.

## Current Pages

- `index.html` is the homepage.
- `archive.html` is the archived work gallery.
- `projects/yoco-next.html` is the Yoco NEXT case study.
- `projects/savanna-tryjan.html` is the Savanna Tryjan case study.
- `projects/stitch-elevate.html` is the Stitch Elevate case study.
- `projects/yoco-counter.html` is the Yoco Counter case study.

## Folder Structure

```text
Website V2/
├── index.html
├── archive.html
├── projects/
│   ├── savanna-tryjan.html
│   ├── stitch-elevate.html
│   ├── yoco-counter.html
│   └── yoco-next.html
├── assets/
│   ├── images/
│   │   ├── archive/
│   │   └── reusable image files
│   ├── videos/
│   │   ├── archive/
│   │   └── yoco-counter.webm
│   └── vector/
│       └── SVG/
├── css/
│   ├── archive.css
│   ├── base.css
│   └── project.css
├── js/
│   └── main.js
└── README.md
```

## File Responsibilities

- `css/base.css` contains shared site styles used by the homepage and project pages.
- `css/project.css` contains shared case-study styles.
- `css/archive.css` contains archive-gallery styles.
- `js/main.js` contains shared interactions used across the site.
- `assets/vector/SVG/bella-favicon.svg` is the current favicon and nav logo.

Keep global styling in `base.css`. Add page-specific styling only when it clearly belongs to one page type, such as archive-only styles in `archive.css` or case-study-only styles in `project.css`.

## Path Rules

Root pages such as `index.html` and `archive.html` reference files directly from the root:

```html
<link rel="stylesheet" href="css/base.css">
<script src="js/main.js"></script>
<img src="assets/images/example.png" alt="">
<a href="projects/example.html">Project</a>
```

Project pages inside `projects/` must go up one folder before reaching shared assets:

```html
<link rel="stylesheet" href="../css/base.css">
<link rel="stylesheet" href="../css/project.css">
<script src="../js/main.js"></script>
<img src="../assets/images/example.png" alt="">
<a href="../index.html">Home</a>
```

Links between project pages can stay local because they sit in the same folder:

```html
<a href="stitch-elevate.html">Next Project</a>
```

## Adding A New Case Study

1. Duplicate an existing file in `projects/`, such as `projects/yoco-next.html`.
2. Rename it with a lowercase, hyphenated filename, for example `projects/new-project.html`.
3. Update the page title, intro copy, project details, video sources, alt text, and project navigation links.
4. Add the project card to the work section in `index.html`.
5. Add project media to `assets/video/` or `assets/images/` with lowercase, descriptive filenames.
6. Check that every media path starts with `../assets/` inside the project page.
7. Open the page in the browser and test the logo, Work/About links, previous/next links, media, and footer links.

## Asset Guidelines

- Use lowercase, descriptive filenames.
- Prefer hyphens over spaces, for example `brand-system-poster.jpg`.
- Put archive gallery images in `assets/images/archive/`.
- Put video files in `assets/video/`.
- Keep older archive motion files in `assets/video/archive/` unless they are promoted into selected work.
- Keep SVG brand/vector files in `assets/vector/`.

Current shared images still live in `assets/images/` for compatibility. Future media can gradually move into more specific folders when the page paths are updated.

## Archive Notes

`archive.html` uses video and image assets from `assets/video/archive/` and `assets/images/archive/`. When archive items change, update both the media path and visible hover label together.

## Navigation Notes

Homepage project cards currently link to:

- `projects/yoco-next.html`
- `projects/savanna-tryjan.html`
- `projects/stitch-elevate.html`
- `projects/yoco-counter.html`

Project-page next links currently move through:

- `yoco-next.html` to `savanna-tryjan.html`
- `savanna-tryjan.html` to `stitch-elevate.html`
- `stitch-elevate.html` to `yoco-counter.html`
- `yoco-counter.html` back to the homepage work section

When adding or reordering case studies, update both the homepage cards and the previous/next links inside the project pages.

## Local Preview

Because this is a static site, it can be opened directly in a browser from `index.html`.

For a more reliable preview, run a small local server from the project folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Pre-Launch Checklist

- Homepage work cards open the correct project pages.
- Project page logo links return to the homepage.
- Project page Work and About links jump back to the correct homepage sections.
- Footer email link is correct.
- Social links are updated from `#` placeholders.
- Archive images exist or missing archive items are removed.
- All images have meaningful alt text.
- Layout is checked on desktop and mobile.
- No unused old files are left in the root folder.
- Favicon loads correctly in the browser tab.

## Maintenance Rules

- Keep the root folder clean: only top-level pages, README, and major folders should live there.
- Do not add new CSS files unless a page type genuinely needs its own styling.
- Reuse existing project-page markup before creating a new layout pattern.
- Keep class names descriptive and consistent with the current naming style.
- Update this README whenever folders, page names, or major workflows change.
