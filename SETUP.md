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

The application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect your repository
- **Docker**: Build with the included Dockerfile (to be added)

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

## 📄 License

MIT License - See LICENSE file for details

---

> "No buscamos encender una llama más. Buscamos despertar el fuego que ya arde en cada alma."
