# Deployment Guide

## 1. Create and publish the repository

1. Install Git on Windows if not already installed.
2. Open PowerShell in the project folder:
   ```powershell
   cd "C:\Users\Taran System\I-doc-by-techie-sardaarji"
   ```
3. Initialize git and push the project:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
4. If GitHub Pages is used, the workflow in `.github/workflows/deploy.yml` will deploy the site automatically on push to `main`.

## 2. Deploy to GitHub Pages

1. Install dependencies:
   ```powershell
   npm.cmd install
   ```
2. Run the GitHub Pages deployment:
   ```powershell
   npm.cmd run deploy
   ```
3. In the repository settings, enable GitHub Pages if needed and point it to the `gh-pages` branch.

## 3. Configure a custom domain

If you have a custom domain, add a `CNAME` file with your domain name to the root of this repository before deploying:

```text
www.your-domain.com
```

Then configure DNS for your domain provider with the GitHub Pages records from GitHub.

> If you are using the default GitHub Pages site, remove any stray `CNAME` file from the `gh-pages` branch. A stale `CNAME` can redirect traffic to an unexpected domain such as `taranpreets21.github-it.ae`.

## 4. GitHub Pages notes

- The repository uses `.github/workflows/deploy.yml` to build the app and publish `dist` to the `gh-pages` branch.
- The Vite config uses `base: '/I-doc-by-techie-sardaarji/'` so assets load correctly on the project site URL.
- The workflow requires `contents: write`, `pages: write`, and `id-token: write` permissions so the action can publish Pages reliably.
- A heartbeat workflow at `.github/workflows/heartbeat.yml` has been added to monitor the site and create an issue if the site ever returns a non-200 response.

## 5. Optional: Netlify publish

1. Connect your GitHub repository to Netlify.
2. Set the build command:
   ```bash
   npm run build
   ```
3. Set the publish directory:
   ```text
   dist
   ```

## Notes

- The frontend is a production-ready static build in `dist/`.
- The backend API is a local Node server and can be run separately with:
  ```powershell
  & 'C:\Program Files\nodejs\node.exe' server/index.js
  ```
