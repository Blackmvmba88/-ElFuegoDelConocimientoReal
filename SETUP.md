# 🔥 El Fuego del Conocimiento Real - Setup Guide

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── chambers/          # Cámaras (grades) page
│   ├── library/           # Biblioteca Viva page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── BookCard.tsx       # Book display component
│   ├── ChamberCard.tsx    # Chamber/grade display component
│   ├── ClientLayout.tsx   # Client-side layout wrapper
│   ├── Header.tsx         # Navigation header
│   ├── ThemeProvider.tsx  # Dark/light theme context
│   └── ThemeToggle.tsx    # Theme switcher button
├── lib/                   # Utilities and services
│   ├── chambers.ts        # Chambers/grades data and helpers
│   └── gutenberg-client.ts # Gutenberg API client
├── types/                 # TypeScript type definitions
│   └── index.ts          # Shared types
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Features Implemented (Fase 1)

### ✅ Completed Features

1. **Next.js App Structure**
   - TypeScript configuration
   - Tailwind CSS integration
   - App router (Next.js 14)

2. **Gutenberg API Integration**
   - Book search functionality
   - Topic-based filtering
   - Book details and downloads
   - Integration with [Gutendex API](https://gutendex.com)

3. **Dark/Light Theme**
   - System preference detection
   - Theme persistence (localStorage)
   - Smooth transitions
   - Custom color palette for alchemical theme

4. **Chamber/Grade System**
   - 33 Masonic grades representation
   - 5 elemental chambers (Silencio, Luz, Fuego, Aire, Éter)
   - Unlocking mechanism (vibration-based)
   - Visual grade cards with element icons

5. **UI Components**
   - Responsive navigation header
   - Book cards with cover images
   - Chamber cards with element theming
   - Theme toggle button
   - Landing page with project overview

## 🌐 API Integration

The application uses the [Gutendex API](https://gutendex.com) to access Project Gutenberg's collection of over 70,000 free eBooks.

### Available API Methods

```typescript
// Search books by query
gutenbergClient.searchBooks(query: string, page: number)

// Get books by topic
gutenbergClient.getBooksByTopic(topic: string, page: number)

// Get book by ID
gutenbergClient.getBookById(id: number)

// Get hermetic/philosophical books
gutenbergClient.getHermeticBooks()
```

## 🎨 Theme Customization

The theme uses a custom alchemical color palette defined in `tailwind.config.ts`:

- **Flame Colors**: Primary (#FF6B35), Secondary (#F7931E), Dark (#C1440E)
- **Shadow Colors**: Light (#1A1A2E), Dark (#0F0F1E)
- **Light Colors**: Primary (#F5F5F5), Secondary (#E8E8E8)

## 📝 Environment Variables

Currently, no environment variables are required. The application uses public APIs.

## 🔧 Development

### Linting

```bash
npm run lint
# or
yarn lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js. Below are detailed instructions for the most popular platforms.

### 🌟 Vercel (Recommended)

Vercel is the creators of Next.js and provides the best deployment experience.

#### Option 1: Deploy via Git Integration (Easiest)

1. **Push your code** to GitHub, GitLab, or Bitbucket
2. **Visit** [vercel.com](https://vercel.com)
3. **Import** your repository
4. **Configure** (optional - Vercel auto-detects Next.js)
5. **Deploy** - Your site will be live in minutes!

Your site will auto-deploy on every push to your main branch.

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Vercel Configuration

The project includes a `vercel.json` with optimized settings:
- Build command: `npm run build`
- Output directory: `.next`
- Node.js version: Auto-detected
- Security headers pre-configured

#### Environment Variables (if needed)

Add environment variables in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add variables for each environment:
   - `NEXT_PUBLIC_APP_NAME` (optional)
   - Future backend URL variables (Phase 2)

#### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is auto-configured

### 🚢 Netlify

Deploy with continuous integration:

1. **Connect** your repository to Netlify
2. **Configure** build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18 or higher
3. **Deploy** - Site goes live automatically

Add `netlify.toml` for advanced configuration:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 🐳 Docker

Build and run with Docker:

```bash
# Build image
docker build -t el-fuego-conocimiento .

# Run container
docker run -p 3000:3000 el-fuego-conocimiento
```

**Dockerfile** (to be added in future):
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### ☁️ Other Platforms

The application can also be deployed to:

- **AWS Amplify:** Connect repository and deploy
- **Google Cloud Run:** Build container and deploy
- **DigitalOcean App Platform:** Import from GitHub
- **Railway:** One-click deploy from GitHub
- **Render:** Connect and auto-deploy

### 📊 Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads correctly
- [ ] Dark/Light theme works
- [ ] Navigation functions properly
- [ ] Gutenberg API integration works
- [ ] All pages render without errors
- [ ] Mobile responsive design displays correctly
- [ ] SSL certificate is active (https)

### 🔍 Monitoring & Analytics (Optional)

Consider adding:

- **Vercel Analytics:** Built-in performance monitoring
- **Google Analytics:** User behavior tracking
- **Sentry:** Error tracking and monitoring
- **LogRocket:** Session replay for debugging

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive Web App ready (PWA support to be added)

## 🔮 Next Steps (Fase 2)

- [ ] Backend API with FastAPI
- [ ] PostgreSQL database integration
- [ ] Redis caching layer
- [ ] Semantic analysis module
- [ ] File synchronization (Drive, Dropbox)
- [ ] AI Hermética (Quantum Forge) module

## 🤝 Contributing

This is a personal masonic-alchemical project. Contributions aligned with the hermetic vision are welcome.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

## 📄 License

Dual License:
- **Software Code:** [MIT License](./LICENSE-MIT)
- **Content/Documentation:** [CC BY-NC-SA 4.0](./LICENSE-CC-BY-NC-SA)

See [LICENSING.md](./LICENSING.md) for details

---

> "No buscamos encender una llama más. Buscamos despertar el fuego que ya arde en cada alma."
