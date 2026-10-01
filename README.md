# Gurdeep Sharma · Portfolio

Personal site for Gurdeep Sharma, senior full-stack engineer. Live at [gurdeep-sharma.vercel.app](https://gurdeep-sharma.vercel.app).

Built with React 19, TypeScript and Vite. The isometric desk at the top is a react-three-fiber scene; it loads in its own chunk after the page text, and clicking its objects jumps to the matching section.

## Develop

```bash
pnpm install
pnpm dev
```

`pnpm build` type-checks and writes the production build to `dist/`.

## Where things live

- `src/data/profile.ts`: all of the site's copy (projects, experience, skills, links)
- `src/components/`: page sections; `src/components/desk/` holds the 3D desk
- `src/styles/site.css`: design tokens and styles
- `public/`: resume PDF, favicon and the social preview image
