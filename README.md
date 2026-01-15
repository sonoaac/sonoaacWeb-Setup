# Sonoaac Web - Deployment Guide

A full-stack web application built with React, TypeScript, Express, and Vite. Deployable to Vercel with GitHub integration.

## 🚀 Features

- **Web Design & Development**: Custom website design and development for small businesses
- **PC Builder**: Interactive PC configuration tool
- **Service Showcase**: Braiding and auto service demo components
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Real-time Updates**: React Query for data management

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git (for version control)
- A Vercel account (for deployment)
- A GitHub account (for repository hosting)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sonoaac/sonoaacWeb-Setup.git
   cd sonoaacWeb-Setup
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local` (if provided)
   - Configure any required environment variables

## 💻 Development

Start the development server:

```bash
npm run dev
```

This starts both the Vite dev server and Express backend. The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema (if using Drizzle)

## 🏗️ Project Structure

```
├── client/                 # Frontend React app
│   ├── public/            # Static assets (images, favicon)
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and helpers
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   └── index.html         # HTML template
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── db.ts              # Database connection
│   └── static.ts          # Static file serving
├── shared/                 # Shared types and utilities
├── script/                 # Build scripts
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── vercel.json            # Vercel deployment config
```

## 🎨 Customization

### Update Images

Replace placeholder images in `client/public/`:
- `sonoaac-logo.svg` - Company logo
- `gempages.svg` - Web design showcase image
- `gempages1.svg` - PC build showcase image
- `braidinghair1.svg` - Braiding service demo image
- `autoservicing.svg` - Auto service demo image

### Update Content

Edit the following files to customize content:
- `client/src/pages/Home.tsx` - Hero section and home page
- `client/src/pages/Services.tsx` - Services page
- `client/src/components/demos/BraidingDemo.tsx` - Braiding service demo
- `client/src/components/demos/MechanicDemo.tsx` - Auto service demo
- `client/src/pages/BuildPC.tsx` - PC builder configuration

## 📦 Building

Build the application for production:

```bash
npm run build
```

This creates:
- Optimized frontend build in `dist/public/`
- Compiled server code in `dist/index.cjs`

## 🚀 Deployment to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deployment-ready version"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect the settings from `vercel.json`
   - Click "Deploy"

3. **Set Environment Variables (if needed)**
   - Go to Project Settings → Environment Variables
   - Add any required environment variables
   - Redeploy

### Option 2: Deploy via CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** to configure your deployment

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```
NODE_ENV=development
# Add other environment variables as needed
```

For production, set these in your Vercel project settings.

## 🔗 Project Links

- **GitHub Repository**: [sonoaac/sonoaacWeb-Setup](https://github.com/sonoaac/sonoaacWeb-Setup)
- **Live Site**: [Your Vercel URL will be here]

## 🎯 Features in Development

- [ ] Database integration with Drizzle ORM
- [ ] User authentication
- [ ] Quote booking system
- [ ] Payment integration
- [ ] Advanced PC builder with compatibility checking
- [ ] Admin dashboard

## 📞 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with a detailed description
3. Contact the development team

## 📄 License

MIT License - Feel free to use this project for your needs

## 🙏 Credits

Built with:
- [React](https://react.dev) - UI library
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Vite](https://vitejs.dev) - Build tool
- [Express](https://expressjs.com) - Backend framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Radix UI](https://www.radix-ui.com) - Component library
- [Framer Motion](https://www.framer.com/motion) - Animations

---

**Ready to deploy? Push to GitHub and connect to Vercel in minutes!** 🚀
