# I-doc by Techie Sardaarji

A web-based demo application inspired by NSYS Diagnostics, built as a modern product landing page with interactive diagnostics simulation.

## Features

- Responsive React + Vite frontend
- Landing page styled for B2B used device diagnostics
- Interactive test simulator for device inspection workflows
- Schedule demo contact form with success feedback
- Sections for Apple/Android/Apple Watch diagnostics and testimonials

## Run locally

1. Open a terminal inside the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend API server in one terminal:
   ```bash
   npm run server
   ```
4. Start the frontend app in another terminal:
   ```bash
   npm run dev
   ```
5. Open the URL shown in the terminal (typically `http://localhost:5173`).

## Login credentials

- Username: `admin`
- Password: `password`

## Build

```bash
npm run build
```

## Deploy options

### GitHub Pages

1. Create a GitHub repository and push this project to it.
2. Ensure your main branch is named `main`.
3. Run:
   ```bash
   npm install
   npm run deploy
   ```
4. Enable GitHub Pages for the repository if needed and point it to the `gh-pages` branch.

### Netlify

1. Create a Netlify account and connect your GitHub repository.
2. Set the build command to:
   ```bash
   npm run build
   ```
3. Set the publish directory to:
   ```bash
   dist
   ```
4. Netlify will deploy the site automatically after the first push.

### GitHub Actions (automated deploy)

This repository includes a workflow at `.github/workflows/deploy.yml` that will build and deploy `dist/` to GitHub Pages on every push to `main`.

## Notes

This project is ready for production deployment as a static Vite site with an optional backend API.
