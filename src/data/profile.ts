// Single source of truth for the site's copy. Everything here comes from the
// resume or the public tricity-rides repo; keep it that way when editing.

export const profile = {
  name: 'Gurdeep Sharma',
  role: 'Senior Full Stack Engineer',
  location: 'Mohali, India',
  email: 'gurdeep.sharma.5492@gmail.com',
  phone: '+91 79732 49610',
  phoneHref: 'tel:+917973249610',
  linkedin: 'https://www.linkedin.com/in/gurdeep-sharma-ai',
  github: 'https://github.com/Gurdeep-Sharma',
  resume: '/Gurdeep-Sharma-Resume.pdf',
}

export const stats = [
  { value: '7+ years', label: 'building and shipping production web apps' },
  { value: '30+ apps', label: 'delivered for international clients' },
  { value: 'End to end', label: 'UI, APIs, databases, CI/CD and cloud' },
  { value: 'Immediate', label: 'joiner, with no notice period to serve' },
]

export type Link = { label: string; href: string }

export type FeaturedProject = {
  name: string
  kind: string
  summary: string
  description: string
  pipelineTitle: string
  pipeline: { step: string; detail: string }[]
  decisions: string[]
  stack: string[]
  links: Link[]
}

export const featured: FeaturedProject = {
  name: 'Tricity Rides',
  kind: 'Open source',
  summary:
    'Lead-generation site for outstation taxis and airport transfers from Chandigarh, Mohali and Zirakpur.',
  description:
    'One Next.js codebase holds the site, the lead API and the database layer, in a single deployment. Route and location pages are generated from typed data and prerendered at build time, so adding a route means adding one object.',
  pipelineTitle: 'POST /api/leads',
  pipeline: [
    { step: 'Validate', detail: 'Shared Zod schema in strict mode, so unknown keys are rejected.' },
    { step: 'Honeypot', detail: 'Bots get a success-shaped reply. Nothing is stored or emailed.' },
    { step: 'De-duplicate', detail: 'The same trip within 10 minutes returns the existing reference, not a new row.' },
    { step: 'Rate limit', detail: '5 accepted enquiries per IP per hour. The 6th gets a 429 with Retry-After.' },
    { step: 'Persist', detail: 'The database write must succeed before any success response goes out.' },
    { step: 'Respond', detail: 'The customer gets a TR-XXXXXX reference and a WhatsApp button.' },
    { step: 'Notify', detail: 'Email is sent after the response, so a mail failure can’t lose or duplicate a lead.' },
  ],
  decisions: [
    'The duplicate check runs before the rate limit, so a customer who re-submits doesn’t use up their hourly allowance.',
    'With no licensed photography, every image is a designed SVG scene. Nothing implies a vehicle or a place the business can’t promise.',
    'WhatsApp clicks are recorded with sendBeacon and never awaited, so tracking can’t block the handoff.',
  ],
  stack: ['Next.js', 'React 19', 'TypeScript', 'Prisma', 'MongoDB', 'Zod', 'Tailwind CSS'],
  // Add back { label: 'Code on GitHub', href: 'https://github.com/Gurdeep-Sharma/tricity-rides' } and the
  // docs/ARCHITECTURE.md link once the repo's main branch is restored to a clean commit.
  links: [],
}

export type Project = {
  name: string
  kind: string
  summary: string
  flow: string[]
  built: string[]
  stack: string[]
}

export const projects: Project[] = [
  {
    name: 'NearNex',
    kind: 'Local services marketplace',
    summary: 'A marketplace where people offer and find local services: OLX-style, for services instead of goods.',
    flow: ['Next.js', 'NestJS + WebSockets', 'MongoDB'],
    built: [
      'Authentication and service-listing flows.',
      'Real-time chat between users over WebSockets.',
      'Search filters and location-based service search.',
    ],
    stack: ['Next.js', 'NestJS', 'MongoDB', 'WebSockets'],
  },
  {
    name: 'Direct Stay',
    kind: 'Property booking platform',
    summary: 'An Airbnb-style platform where hosts list properties and guests search for and book them.',
    flow: ['Next.js', 'Node.js REST API', 'PostgreSQL'],
    built: [
      'Host authentication and onboarding, with REST APIs for host and guest profiles.',
      'Property listing and booking flows.',
      'Search filters, location-based discovery and pickup/drop availability.',
    ],
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    name: 'BoardSync',
    kind: 'monday.com to BigQuery sync',
    summary: 'A monday.com app that syncs board data into Google BigQuery.',
    flow: ['monday.com board', 'Node.js sync', 'BigQuery table'],
    built: [
      'Google BigQuery authentication.',
      'Conversion of monday.com boards into BigQuery tables.',
      'The data sync workflows between the two.',
    ],
    stack: ['Node.js', 'React', 'MongoDB', 'Google BigQuery'],
  },
  {
    name: 'English Learning Platform',
    kind: 'Online course platform',
    summary: 'A Udemy-style course platform with live classes over Zoom, run through teacher and admin panels.',
    flow: ['React panels', 'Node.js API', 'Zoom · SMS'],
    built: [
      'Teacher and admin panels with book management, course filtering and leave workflows for teachers and students.',
      'Zoom API integration for class scheduling and messaging.',
      'SMS notifications.',
    ],
    stack: ['React', 'Node.js', 'REST APIs', 'Zoom API', 'SMS API'],
  },
  {
    name: 'ISaveLife',
    kind: 'Blood donation platform',
    summary: 'Connects blood donors with the recipients who need them.',
    flow: ['React dashboards', 'Node.js API', 'MongoDB'],
    built: ['Donor–recipient matching workflows.', 'User dashboards and notifications.', 'Admin panel APIs.'],
    stack: ['React', 'Node.js', 'MongoDB'],
  },
]

export type Job = {
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
}

export const experience: Job[] = [
  {
    company: 'Boffin Coders',
    role: 'Senior Full Stack Engineer',
    period: 'Jul 2020 – Aug 2026',
    summary:
      'Led development of 30+ production SaaS, enterprise and mobile apps for international clients, across frontend, backend and deployment.',
    highlights: [
      'Built backend services and REST APIs in Node.js, NestJS and Express, with JWT and OAuth 2.0 auth and PostgreSQL and MongoDB data models.',
      'Built React and Next.js (TypeScript) frontends from Figma designs, using Redux, Tailwind CSS and Material UI.',
      'Shipped real-time features such as in-app chat with WebSockets and Socket.IO.',
      'Integrated Stripe, Razorpay and PayPal payments, plus Twilio voice and SMS, Zoom and Google BigQuery.',
      'Set up CI/CD with GitHub Actions and GitLab CI, and deployed to AWS (EC2, S3) and GCP with Nginx and PM2.',
      'Reviewed code, mentored junior developers and took part in architecture planning.',
    ],
  },
  {
    company: 'Mars WebTech',
    role: 'Full Stack Developer',
    period: 'May 2019 – Jun 2020',
    summary: 'Built client web applications and business websites with React, Node.js and MySQL.',
    highlights: [
      'Built reusable frontend components, backend modules and REST APIs.',
      'Customized enterprise solutions for clients, working alongside senior developers.',
    ],
  },
]

export const education = {
  degree: 'Bachelor of Computer Applications (BCA)',
  school: 'Punjabi University',
  period: '2016 – 2019',
}

export const skills = [
  {
    group: 'Frontend',
    note: 'Responsive apps built from Figma designs.',
    items: ['React', 'Next.js', 'TypeScript', 'Redux', 'Tailwind CSS', 'Material UI'],
  },
  {
    group: 'Backend',
    note: 'REST APIs and real-time features.',
    items: ['Node.js', 'NestJS', 'Express', 'REST API design', 'WebSockets', 'Socket.IO'],
  },
  {
    group: 'Data',
    note: 'Data models, query optimization and caching.',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Google BigQuery', 'Prisma'],
  },
  {
    group: 'Payments & APIs',
    note: 'Payment gateways and third-party integrations.',
    items: ['Stripe', 'Razorpay', 'PayPal', 'Twilio', 'Zoom API', 'monday.com API'],
  },
  {
    group: 'Auth',
    note: 'Token-based and social sign-in.',
    items: ['JWT', 'OAuth 2.0 (Google Sign-In)', 'Firebase Authentication'],
  },
  {
    group: 'Cloud & delivery',
    note: 'CI/CD pipelines and deployments.',
    items: ['AWS (EC2, S3)', 'Google Cloud', 'GitHub Actions', 'GitLab CI', 'Nginx', 'PM2'],
  },
]

export const tools = ['Git', 'GitHub', 'Figma', 'Cursor', 'Claude Code', 'OpenAI Codex']
