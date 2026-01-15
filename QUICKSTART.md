# 🚀 Quick Start - Local Development

Get your development environment up and running in 5 minutes.

## 1️⃣ Installation

```bash
# Install dependencies
npm install
```

## 2️⃣ Run Development Server

```bash
# Start dev server (runs on localhost:5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 3️⃣ Start Coding

Edit files in `client/src/` and see changes instantly with hot reload.

### Key Directories

- **`client/src/pages/`** - Page components (Home, Services, BuildPC, Contact)
- **`client/src/components/`** - Reusable components
- **`client/public/`** - Static assets (images, logos)
- **`server/`** - Backend API routes
- **`shared/`** - Shared types and utilities

## 🎨 Customization

### Update Logo
Replace `client/public/sonoaac-logo.svg` with your logo

### Update Images
Add your images to `client/public/` and reference them in components:
```tsx
<img src="/your-image.jpg" alt="description" />
```

### Change Content
Edit pages in `client/src/pages/`:
- `Home.tsx` - Homepage content
- `Services.tsx` - Services listing
- `Contact.tsx` - Contact form
- `BuildPC.tsx` - PC builder tool

### Modify Styling
Edit `client/index.css` or use Tailwind classes in JSX

## 🔧 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build locally
npm run check    # TypeScript type checking
npm run db:push  # Push database schema (if using DB)
```

## 📦 Build & Deploy

When ready to deploy:

```bash
# Build production version
npm run build

# Push to GitHub
git add .
git commit -m "Your message"
git push origin main

# Vercel automatically deploys! 🎉
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000  # Use different port
```

**Module not found errors?**
```bash
rm -r node_modules package-lock.json
npm install
```

**Changes not showing?**
- Save the file
- Check browser console for errors
- Hard refresh (Ctrl+Shift+R)

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Express.js](https://expressjs.com)

---

**Ready to deploy? See [DEPLOYMENT.md](./DEPLOYMENT.md)** 🚀
