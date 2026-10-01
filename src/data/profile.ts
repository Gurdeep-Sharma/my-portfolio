// Single source of truth for the site's copy. Everything here comes from the
// resume or the public tricity-rides repo; keep it that way when editing.

export const profile = {
  name: 'Gurdeep Sharma',
  role: 'Senior full-stack engineer',
  location: 'Mohali, India',
  email: 'gurdeep.sharma.5492@gmail.com',
  phone: '+91 79732 49610',
  phoneHref: 'tel:+917973249610',
  linkedin: 'https://www.linkedin.com/in/gurdeep-sharma-ai',
  github: 'https://github.com/Gurdeep-Sharma',
  resume: '/Gurdeep-Sharma-Resume.pdf',
  resumeSize: '145 KB',
}

export const intro = {
  lede: 'I build web apps end to end, from the React front end to the Node.js API, the database and the deploy. For seven years that has mostly meant client work: booking sites, marketplaces, an online course platform and a monday.com integration.',
  availability: 'I’m looking for a senior full-stack role, in India or remote, and can start right away.',
}

export const facts = [
  { label: 'Experience', value: '7 years, 2019 to 2026' },
  { label: 'Last role', value: 'Senior Full Stack Engineer, Boffin Coders' },
  { label: 'Shipped', value: '30+ production apps for clients abroad' },
  { label: 'Main stack', value: 'React, Next.js, Node.js, NestJS, TypeScript' },
  { label: 'Available', value: 'Now. Open to remote work and relocation.' },
]

export type Link = { label: string; href: string }

export type FeaturedProject = {
  name: string
  summary: string
  meta: string
  body: string[]
  caption: string
  pipeline: { step: string; detail: string }[]
  notes: string[]
  links: Link[]
}

export const featured: FeaturedProject = {
  name: 'Tricity Rides',
  summary: 'A lead-generation site for outstation taxis and airport transfers around Chandigarh, Mohali and Zirakpur.',
  meta: '2026 · Next.js · React 19 · TypeScript · Prisma · MongoDB · Zod · Tailwind CSS',
  body: [
    'It’s a single Next.js app. The pages, the lead API and the database layer share one codebase and ship as one deployment.',
    'Route and location pages are generated from typed data files and prerendered at build time. Adding a route means adding one object, and its page, metadata, sitemap entry and structured data follow from it.',
  ],
  caption: 'What POST /api/leads does when someone sends an enquiry, in order.',
  pipeline: [
    { step: 'Validate', detail: 'Shared Zod schema in strict mode, so unknown keys are rejected.' },
    { step: 'Honeypot', detail: 'Bots get a reply that looks like success. Nothing is stored or emailed.' },
    { step: 'De-duplicate', detail: 'The same trip sent again within 10 minutes returns the existing reference.' },
    { step: 'Rate limit', detail: '5 accepted enquiries per IP per hour. The sixth gets a 429 with Retry-After.' },
    { step: 'Save', detail: 'The database write has to succeed before any success response goes out.' },
    { step: 'Respond', detail: 'The customer gets a TR‑XXXXXX reference and a WhatsApp button.' },
    { step: 'Notify', detail: 'The email goes out after the response, so a mail failure can’t lose or duplicate a lead.' },
  ],
  notes: [
    'The duplicate check runs before the rate limit, so a customer who submits twice doesn’t use up their hourly allowance.',
    'There was no licensed photography, so every image is an SVG illustration. Nothing pictures a car or a place the business can’t promise.',
    'WhatsApp clicks are logged with sendBeacon and never awaited, so tracking can’t get in the way of the handoff.',
  ],
  // Add back { label: 'Code on GitHub', href: 'https://github.com/Gurdeep-Sharma/tricity-rides' } and the
  // docs/ARCHITECTURE.md link once the repo's main branch is restored to a clean commit.
  links: [],
}

export type Project = {
  name: string
  kind: string
  built: string
  flow: string[]
  stack: string
}

export const projects: Project[] = [
  {
    name: 'NearNex',
    kind: 'Local services marketplace, like OLX but for services',
    built:
      'I built authentication and the service-listing flows, real-time chat between users over WebSockets, and search with filters and location.',
    flow: ['Next.js app', 'NestJS API + WebSockets', 'MongoDB'],
    stack: 'Next.js, NestJS, MongoDB, WebSockets',
  },
  {
    name: 'Direct Stay',
    kind: 'Property booking platform, Airbnb-style',
    built:
      'I built host authentication and onboarding, and the REST APIs for host and guest profiles. I also built the listing and booking flows, with search filters, location-based discovery and pickup/drop availability.',
    flow: ['Next.js app', 'Node.js REST API', 'PostgreSQL'],
    stack: 'Next.js, Node.js, PostgreSQL',
  },
  {
    name: 'BoardSync',
    kind: 'monday.com app that syncs boards to Google BigQuery',
    built: 'I built the BigQuery authentication, the conversion of monday.com boards into BigQuery tables, and the sync workflows between the two.',
    flow: ['monday.com board', 'Node.js sync service', 'BigQuery table'],
    stack: 'Node.js, React, MongoDB, Google BigQuery',
  },
  {
    name: 'English Learning Platform',
    kind: 'Online course platform, Udemy-style, with live classes',
    built:
      'I built the teacher and admin panels: book management, course filtering and leave workflows for teachers and students. I also integrated the Zoom API for scheduling classes and messaging, and an SMS API for notifications.',
    flow: ['React panels', 'Node.js REST API', 'Zoom API + SMS API'],
    stack: 'React, Node.js, REST APIs, Zoom API, SMS API',
  },
  {
    name: 'ISaveLife',
    kind: 'Blood donation platform',
    built: 'I built the donor–recipient matching workflows, the user dashboards, notifications and the admin panel APIs.',
    flow: ['React dashboards', 'Node.js API', 'MongoDB'],
    stack: 'React, Node.js, MongoDB',
  },
]

export type Job = {
  years: string
  dates: string
  role: string
  company: string
  summary: string
  highlights: string[]
}

export const experience: Job[] = [
  {
    years: '2020–2026',
    dates: 'Jul 2020 – Aug 2026',
    role: 'Senior Full Stack Engineer',
    company: 'Boffin Coders',
    summary:
      'Led development of 30+ production SaaS, enterprise and mobile apps for international clients, across frontend, backend and deployment.',
    highlights: [
      'Built backend services and REST APIs in Node.js, NestJS and Express, with JWT and OAuth 2.0 auth and PostgreSQL and MongoDB data models.',
      'Built React and Next.js (TypeScript) frontends from Figma designs, with Redux, Tailwind CSS and Material UI.',
      'Built real-time features such as in-app chat with WebSockets and Socket.IO.',
      'Integrated Stripe, Razorpay and PayPal payments, Twilio voice and SMS, Zoom and Google BigQuery.',
      'Set up CI/CD with GitHub Actions and GitLab CI, and deployed to AWS (EC2, S3) and GCP with Nginx and PM2.',
      'Reviewed code, mentored junior developers and took part in architecture planning.',
    ],
  },
  {
    years: '2019–2020',
    dates: 'May 2019 – Jun 2020',
    role: 'Full Stack Developer',
    company: 'Mars WebTech',
    summary: 'Built client web applications and business websites with React, Node.js and MySQL.',
    highlights: [
      'Built reusable frontend components, backend modules and REST APIs.',
      'Customized enterprise solutions for clients, working alongside senior developers.',
    ],
  },
]

export const education = {
  years: '2016–2019',
  degree: 'Bachelor of Computer Applications',
  school: 'Punjabi University',
}

export const skills = [
  { group: 'Frontend', items: 'React, Next.js, TypeScript, Redux, Tailwind CSS, Material UI' },
  { group: 'Backend', items: 'Node.js, NestJS, Express, REST API design, WebSockets, Socket.IO' },
  { group: 'Data', items: 'PostgreSQL, MongoDB, MySQL, Google BigQuery, Prisma' },
  { group: 'Payments and APIs', items: 'Stripe, Razorpay, PayPal, Twilio, Zoom API, monday.com API' },
  { group: 'Auth', items: 'JWT, OAuth 2.0 (Google Sign-In), Firebase Authentication' },
  { group: 'Cloud and CI/CD', items: 'AWS (EC2, S3), Google Cloud, GitHub Actions, GitLab CI, Nginx, PM2' },
  { group: 'Every day', items: 'Git, Figma, Cursor, Claude Code, OpenAI Codex' },
]

export const about = [
  'I’ve been writing software professionally since 2019, first at Mars WebTech and then for six years at Boffin Coders, in sprint teams with product owners and designers on projects for clients abroad. A typical feature for me starts as a Figma file and ends as an API, a database change and a deploy.',
  'I also review code, mentor junior developers and help plan architecture. I use Cursor, Claude Code and Codex every day to speed up delivery.',
]
