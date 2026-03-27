# AGENTS.md

## Project Overview
This is a static web lab assignment consisting of a single HTML page (`index.html`) and two CSS stylesheets (`style-1.css`, `style-2.css`) for background color themes. The page uses an external script to enable style switching.

## Architecture
- **Main Entry Point**: `index.html` - Minimal HTML5 structure with empty body, title "Daniel Włodarczyk (55774) - PTW LAB A".
- **Stylesheets**:
  - `style-1.css`: Sets `body { background-color: #dfecff; }` (light blue theme).
  - `style-2.css`: Sets `body { background-color: #ecfbe6; }` (light green theme).
- **External Dependency**: Script from `//wi.arturk.pl/zen-style.js.php?styles[]=style-1&styles[]=style-2` loads and switches between stylesheets.
- **Assets**: `assets/` folder contains `.gitignore` (likely empty or ignored content).

No server-side logic, databases, or complex components; purely client-side static files.

## Workflows
- **Viewing**: Open `index.html` directly in a web browser to see the page with style switching capability.
- **Editing**: Modify CSS files directly; changes reflect immediately on reload.
- No build tools, package managers, or test suites required.

## Conventions
- **Stylesheet Naming**: Use `style-{number}.css` format (e.g., `style-1.css`, `style-2.css`) for theme files.
- **Style Loading**: External script expects stylesheets named in URL parameters (e.g., `styles[]=style-1`).
- **File Structure**: Keep stylesheets in project root alongside `index.html`; use `assets/` for any additional resources.

## Integration Points
- Relies on `wi.arturk.pl` domain for style switching functionality; ensure internet access for full operation.</content>
<parameter name="filePath">I:\Semestr 4\Podstawy technologii webowych\Laboratoria\danielwlodarczyk.github.io\lab-a\AGENTS.md
