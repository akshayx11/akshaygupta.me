# Akshay Kumar Gupta Portfolio

Static portfolio site for [akshaygupta.me](https://akshaygupta.me), built for GitHub Pages.

## Files

- `index.html` - page content and structure
- `styles.css` - responsive layout and visual system
- `script.js` - active section navigation
- `assets/Akshay-Kumar-Gupta-Resume.pdf` - downloadable resume
- `CNAME` - custom domain for GitHub Pages
- `.github/workflows/pages.yml` - GitHub Pages deployment workflow

## Local Preview

Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## GitHub Pages Setup

1. Create a GitHub repository, for example `akshaygupta.me`.
2. Push this repository to GitHub.
3. In GitHub, go to Settings -> Pages.
4. Set Source to `GitHub Actions`.
5. Make sure DNS for `akshaygupta.me` points to GitHub Pages.

The included `CNAME` file keeps the custom domain attached after deployment.
