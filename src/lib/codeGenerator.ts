import { GeneratedArchitecture } from "./aiEngine";
import { GeneratedCode } from "./store";

export async function generateProjectCode(data: GeneratedArchitecture): Promise<GeneratedCode> {
  const structure = `project/
├── frontend/ (Production-Ready React)
├── backend/ (Scalable Express API)
├── database/ (Optimized SQL)
└── package.json (Workspace Root)`;

  const files: Record<string, string> = {
    // --- ROOT ---
    "package.json": `{
  "name": "${data.title.toLowerCase().replace(/\s+/g, '-')}-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "install:all": "npm install && cd frontend && npm install && cd ../backend && npm install",
    "dev": "concurrently \\"npm run dev:backend\\" \\"npm run dev:frontend\\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev"
  },
  "devDependencies": {
    "concurrently": "^8.2.1"
  }
}`,

    // --- FRONTEND ---
    "frontend/package.json": `{
  "name": "${data.title.toLowerCase().replace(/\s+/g, '-')}-frontend",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.284.0",
    "framer-motion": "^10.16.4",
    "axios": "^1.5.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27"
  }
}`,
    "frontend/vite.config.ts": `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true }
});`,
    "frontend/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.title} | AI Architected</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#030303] text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
    "frontend/src/main.tsx": `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    "frontend/src/index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-['Inter',sans-serif];
  }
}

.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.glass-active {
  background: rgba(168, 85, 247, 0.1);
  border-color: rgba(168, 85, 247, 0.2);
}`,
    "frontend/tailwind.config.js": `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#a855f7', hover: '#9333ea' },
        surface: { DEFAULT: '#030303', paper: '#0a0a0a' }
      }
    }
  },
  plugins: [],
}`,
    "frontend/postcss.config.js": `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`,

    "frontend/src/App.tsx": `import React, { useState } from 'react';
import { Layout, Dashboard } from './components/layout';
import { Overview } from './pages/Overview';
import { Features } from './pages/Features';

export default function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  return (
    <Layout activePage={currentPage} onPageChange={setCurrentPage}>
      {currentPage === 'overview' ? <Overview /> : <Features />}
    </Layout>
  );
}`,

    "frontend/src/components/layout.tsx": `import React from 'react';
import { Layout as LayoutIcon, Rocket, Server, Activity, ChevronRight, User } from 'lucide-react';

export function Layout({ children, activePage, onPageChange }) {
  return (
    <div className="flex h-screen bg-[#030303]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 gap-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/20" />
          <span className="font-bold text-lg tracking-tight">${data.title.split(' ')[0]}</span>
        </div>

        <nav className="space-y-1">
          <NavItem active={activePage === 'overview'} onClick={() => onPageChange('overview')} icon={LayoutIcon} label="System Overview" />
          <NavItem active={activePage === 'features'} onClick={() => onPageChange('features')} icon={Rocket} label="Live Features" />
          <NavItem active={false} icon={Activity} label="Monitoring" disabled />
          <NavItem active={false} icon={Server} label="Infrastructure" disabled />
        </nav>

        <div className="mt-auto p-4 rounded-xl glass text-xs text-white/40 leading-relaxed">
          <div className="font-semibold text-white/60 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AI Architect Active
          </div>
          System initialized with ${data.techStack.backend[0]} logic.
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between glass z-10">
          <div className="text-sm font-medium text-white/40 flex items-center gap-2">
            Console <ChevronRight className="w-4 h-4" /> <span className="text-white/80 capitalize">{activePage}</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/60 font-mono tracking-tighter">API: READY</div>
             <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <User className="w-4 h-4 text-white/60" />
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 relative">
           <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
           <div className="max-w-5xl mx-auto relative">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ active, icon: Icon, label, onClick, disabled }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all \${active ? 'glass-active text-purple-400' : 'text-white/60 hover:bg-white/5 hover:text-white'} \${disabled ? 'opacity-40 cursor-not-allowed' : ''}\`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
      {active && <div className="ml-auto w-1 h-1 rounded-full bg-purple-400" />}
    </button>
  );
}`,

    "frontend/src/pages/Overview.tsx": `import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Database, Shield, Zap, Globe } from 'lucide-react';

export function Overview() {
  const [status, setStatus] = useState('checking...');

  useEffect(() => {
    axios.get('http://localhost:5000/health')
      .then(res => setStatus(res.data.status))
      .catch(() => setStatus('offline'));
  }, []);

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">${data.title}</h1>
        <p className="text-xl text-white/50 max-w-2xl leading-relaxed">${data.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Backend Status" value={status} color="text-emerald-400" />
        <StatCard label="Response Time" value="24ms" />
        <StatCard label="Uptime" value="100%" />
        <StatCard label="AI Engine" value="Gemini-Pro" color="text-purple-400" />
      </div>

      <section>
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-500" /> System Protocols
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <ArchitectureCard 
              title="State Layer" 
              desc="Atomic state management powered by ${data.techStack.frontend[1] || 'modern hooks'}." 
              icon={Zap}
           />
           <ArchitectureCard 
              title="Data Integrity" 
              desc="Persistent storage via ${data.techStack.database[0]} with automated migrations." 
              icon={Database}
           />
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, color = "text-white/80" }) {
  return (
    <div className="p-6 rounded-2xl glass border border-white/5">
      <div className="text-xs text-white/40 font-bold uppercase tracking-widest mb-1">{label}</div>
      <div className={\`text-2xl font-black capitalize \${color}\`}>{value}</div>
    </div>
  );
}

function ArchitectureCard({ title, desc, icon: Icon }) {
    return (
        <div className="p-6 rounded-3xl glass hover:bg-white/[0.05] transition-colors group">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-white/90">{title}</h3>
            <p className="text-sm text-white/50 leading-relaxed font-medium">{desc}</p>
        </div>
    );
}`,

    "frontend/src/pages/Features.tsx": `import React from 'react';
import { motion } from 'framer-motion';

export function Features() {
  const features = [
    ${data.features.map(f => `"${f}"`).join(', ')}
  ];

  return (
    <div className="space-y-8">
       <header>
          <h2 className="text-3xl font-bold tracking-tight">Active Module Registry</h2>
          <p className="text-white/40 mt-2">Dynamic feature injection based on architected blueprint.</p>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
             <motion.div 
               key={f}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.05 }}
               className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 group"
             >
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-xs font-bold text-purple-400 tabular-nums">
                   {(i+1).toString().padStart(2, '0')}
                </div>
                <div>
                   <h3 className="font-bold text-white/90">{f}</h3>
                   <div className="text-xs text-white/40 font-mono mt-1 uppercase tracking-tighter">Initialized • production.v1.0</div>
                </div>
             </motion.div>
          ))}
       </div>
    </div>
  );
}`,

    // --- BACKEND ---
    "backend/package.json": `{
  "name": "${data.title.toLowerCase().replace(/\s+/g, '-')}-backend",
  "version": "0.1.0",
  "main": "src/server.js",
  "type": "commonjs",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}`,
    "backend/src/server.js": `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const { errorHandler } = require('./middleware/error');

const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', apiRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'online', 
    service: '${data.title}',
    timestamp: new Date().toISOString() 
  });
});

app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(\`🚀 [API] http://localhost:\${PORT} | Architecting Success\`);
});`,
    "backend/src/routes/api.js": `const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/features', mainController.getFeatures);

module.exports = router;`,
    "backend/src/middleware/error.js": `exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Architecture Overflow - Server Error'
  });
};`,
    "backend/src/controllers/mainController.js": `exports.getFeatures = async (req, res, next) => {
  try {
    const features = [
       ${data.features.map(f => `"${f}"`).join(',\n       ')}
    ];
    res.status(200).json({ success: true, count: features.length, data: features });
  } catch (error) {
    next(error);
  }
};`,

    "database/schema.sql": `-- AI Generated SQL Schema
${data.database.map(table => `CREATE TABLE ${table.toLowerCase()} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);`).join('\n\n')}`,

    "README.md": `# ${data.title}

AI-Architected Full-Stack System.

## Architecture
- Frontend: **${data.techStack.frontend.join(' + ')}**
- Backend: **${data.techStack.backend.join(' + ')}**
- Database: **${data.techStack.database.join(', ')}**

## Quick Start
1. Run \`npm run install:all\` in the root
2. Run \`npm run dev\` in the root
3. Open http://localhost:5173
`
  };

  return { structure, files };
}
