# 🚀 Vercel Deployment Guide - Step by Step

This guide will walk you through deploying **Sonoaac Web** to Vercel with GitHub integration.

## Prerequisites

Before you start, ensure you have:
- ✅ A GitHub account (free at github.com)
- ✅ A Vercel account (free at vercel.com)
- ✅ Git installed on your computer
- ✅ The project ready to deploy

---

## Step 1: Prepare Your GitHub Repository

### 1.1 Initialize Git (if not already done)

```bash
cd c:\Users\chuch\Downloads\sonoaacWeb-Setup
git init
```

### 1.2 Add GitHub Remote

Go to [GitHub](https://github.com/new) and create a new repository called `sonoaacWeb-Setup`

Then, run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/sonoaacWeb-Setup.git
git branch -M main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 1.3 Commit and Push

```bash
git add .
git commit -m "Initial commit - ready for Vercel deployment"
git push -u origin main
```

---

## Step 2: Connect to Vercel

### 2.1 Visit Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click **"New Project"**

### 2.2 Import Your Repository

1. Click **"Import Git Repository"**
2. Paste your GitHub repository URL:
   ```
   https://github.com/YOUR_USERNAME/sonoaacWeb-Setup
   ```
3. Click **"Continue"**

### 2.3 Configure Project Settings

Vercel should auto-detect these settings from `vercel.json`:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Review the settings carefully**, then click **"Deploy"**

---

## Step 3: Monitor Deployment

1. Vercel will show a deployment progress screen
2. Watch for the build to complete
3. Once done, you'll see your live URL (e.g., `https://sonoaacweb-setup.vercel.app`)
4. Click the URL to view your live site! 🎉

---

## Step 4: Custom Domain (Optional)

To use your own domain:

1. In Vercel Project Dashboard, go to **Settings**
2. Click **Domains**
3. Enter your custom domain (e.g., `sonoaac.com`)
4. Follow Vercel's DNS instructions
5. Update your domain's DNS records

---

## Step 5: Environment Variables (If Needed)

If your project needs environment variables:

1. Go to **Project Settings** → **Environment Variables**
2. Add your variables:
   - Key: `NODE_ENV`
   - Value: `production`
3. Click **Save**
4. Redeploy the project

---

## Step 6: Continuous Deployment Setup

Great news! Once connected, Vercel automatically:
- ✅ Deploys when you push to `main` branch
- ✅ Creates preview URLs for pull requests
- ✅ Handles SSL certificates automatically
- ✅ Provides CDN distribution globally

---

## Troubleshooting

### Build Fails

**Issue**: Build fails with `Cannot find module` error

**Solution**:
1. Ensure `package.json` has all dependencies listed
2. Run locally: `npm install && npm run build`
3. Push changes to GitHub
4. Redeploy from Vercel Dashboard

### Images Not Loading

**Issue**: Images appear broken on Vercel

**Solution**:
1. Ensure images are in `client/public/` folder
2. Reference them with `/filename` (not relative paths)
3. Check image file names match exactly
4. Clear Vercel cache and redeploy

### Environment Variables Not Working

**Issue**: App throws errors related to missing variables

**Solution**:
1. Go to Project Settings → Environment Variables
2. Add the missing variables
3. Click "Redeploy" button at top of page

---

## Updating Your Site

After initial deployment, to update your site:

```bash
# Make changes locally
git add .
git commit -m "Updated content and images"
git push origin main

# Vercel automatically deploys!
# Check deployment status at vercel.com
```

---

## Performance Optimization

Your Vercel deployment includes:
- 🚀 **Automatic image optimization**
- 🌍 **Global CDN distribution**
- ⚡ **Automatic minification**
- 📦 **Edge caching**

No extra configuration needed!

---

## Useful Vercel Commands

### View Deployment Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"**
4. Click the deployment to see logs

### Rollback to Previous Version

1. In **Deployments** tab
2. Find the previous version
3. Click the 3-dot menu
4. Select **"Promote to Production"**

### View Environment Variables

Settings → Environment Variables

---

## What's Deployed?

Your deployment includes:

```
✅ React frontend (client/)
✅ Express backend (server/)
✅ Static assets (client/public/)
✅ Database configuration
✅ All npm dependencies
```

---

## Support & Next Steps

### After Deployment

1. **Test your site** at the provided Vercel URL
2. **Update images** in `client/public/` as needed
3. **Add custom domain** for professional look
4. **Monitor performance** in Vercel Analytics
5. **Set up error tracking** (optional)

### Need Help?

- 📚 [Vercel Documentation](https://vercel.com/docs)
- 💬 [Vercel Support](https://vercel.com/support)
- 🐛 [GitHub Issues](https://github.com/YOUR_USERNAME/sonoaacWeb-Setup/issues)

---

## Next: Customize Your Site

Now that your site is deployed, consider:

1. **Update the logo** → Replace `client/public/sonoaac-logo.svg`
2. **Change content** → Edit pages in `client/src/pages/`
3. **Update images** → Add high-quality images to `client/public/`
4. **Customize colors** → Edit `tailwind.config.ts`
5. **Add features** → Extend components and pages

---

## Quick Reference

| Task | Command |
|------|---------|
| Deploy | Push to GitHub → Auto deploys |
| View Logs | Vercel Dashboard → Deployments |
| Add Domain | Settings → Domains |
| Set Variables | Settings → Environment Variables |
| Rollback | Deployments → Promote Previous |

---

**Congratulations! 🎉 Your site is now live on Vercel!**

For questions or updates, check the main [README.md](./README.md)
