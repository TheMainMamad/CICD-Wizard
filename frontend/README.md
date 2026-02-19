# CI/CD Wizard Frontend

A React + Tailwind CSS frontend for generating production-ready CI/CD pipelines for Jenkins and GitLab.

## Features

- **Interactive Form UI** with selectable components
- **Real-time Preview** of generated YAML configuration
- **Support for Multiple Build Types**: Bare builds and Docker builds
- **Support for Multiple Deploy Types**: Bare servers, Docker Compose, and Kubernetes
- **Optional CI/CD Features**: Testing, Linting, Security scanning (Trivy), Artifact management
- **Download Configuration**: Export Jenkinsfile or .gitlab-ci.yml directly
- **TypeScript Support** for type safety
- **Responsive Design** with Tailwind CSS

## Prerequisites

- **Node.js** 18+ (required)
- **npm** or **yarn** or **pnpm** (required)
- CICD-Wizard backend running on `http://localhost:8000`

## Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:8000/api/v1
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Features:
- **Hot Module Reload (HMR)** for instant updates
- **Automatic proxy** to backend API
- **TypeScript** for development

## Building for Production

```bash
npm run build
```

This generates optimized files in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── ProjectSection.tsx      # Project name, version, service, app type
│   ├── BuildSection.tsx        # Build configuration (Bare/Docker)
│   ├── DeploySection.tsx       # Deploy configuration (Bare/Docker/K8s)
│   ├── AdditionalSection.tsx   # Optional CI features
│   └── PreviewModal.tsx        # YAML preview modal
├── services/
│   └── api.ts                  # API client with TypeScript types
├── App.tsx                     # Main application component
├── main.tsx                    # React entry point
└── index.css                   # Tailwind CSS styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## UI Components

### Form Sections:
1. **Project Section** - Basic project information
2. **Build Section** - Choose build type (Bare/Docker)
3. **Deploy Section** - Choose deployment method
4. **Additional Section** - Optional features (tests, linting, security, artifacts)

### Actions:
- **Preview YAML** - See generated configuration before downloading
- **Download File** - Download as Jenkinsfile or .gitlab-ci.yml
- **Configuration Summary** - Real-time summary of current settings

## API Integration

The frontend communicates with the CICD-Wizard backend:

- `POST /api/v1/generate/` - Generate YAML and return as JSON
- `POST /api/v1/generate/download` - Generate and download YAML as plain text

## Design

- **Responsive Layout** adapts to mobile and desktop
- **Tailwind CSS** for modern styling
- **Modal Preview** for YAML inspection
- **Sticky Summary** sidebar for quick reference
- **Error Handling** with user-friendly messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
