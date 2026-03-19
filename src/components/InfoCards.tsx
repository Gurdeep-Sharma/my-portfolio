const SECTIONS = [
  { id: 'hero', title: '', content: null },
  {
    id: 'about',
    icon: '☕',
    label: 'About Me',
    title: 'Gurdeep Sharma',
    subtitle: 'Full-Stack Developer',
    content: 'I build performant, beautiful web applications with the MERN stack.\n\nPassionate about clean code, 3D on the web, and creating cozy digital experiences that users love.',
    tags: ['Creative Thinker', 'Problem Solver', 'Team Player'],
  },
  {
    id: 'skills',
    icon: '📚',
    label: 'Skills',
    title: 'Knowledge Base',
    subtitle: 'Technologies & Tools',
    content: null,
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Express.js', 'Three.js', 'Next.js', 'PostgreSQL', 'Docker', 'Git', 'Figma', 'REST APIs', 'Tailwind CSS', 'HTML', 'CSS', "Nginx", "Apache HTTP Server"],
  },
  {
    id: 'projects',
    icon: '📺',
    label: 'Projects',
    title: 'Featured Work',
    subtitle: "Recent projects I've built",
    content: null,
    projects: [
      { name: 'Isometric Portfolio', tech: 'React · Three.js · R3F', emoji: '🌐' },
      { name: 'E-Commerce Platform', tech: 'Next.js · Stripe · MongoDB', emoji: '🛒' },
      { name: 'Analytics Dashboard', tech: 'React · D3.js · Express', emoji: '📊' },
      { name: 'Chat Application', tech: 'React · Node.js · MongoDB', emoji: '💬' },
      { name: 'Task Management System', tech: 'React · Node.js · MongoDB', emoji: '📝' },
      { name: 'Inventory Management System', tech: 'React · Node.js · MongoDB', emoji: '📦' },
      { name: 'Event Management System', tech: 'React · Node.js · MongoDB', emoji: '🎉' },
      { name: 'Blog Platform', tech: 'React · Node.js · MongoDB', emoji: '📝' },
      { name: 'Social Media Platform', tech: 'React · Node.js · MongoDB', emoji: '💬' },
    ],
  },
  {
    id: 'experience',
    icon: '💼',
    label: 'Experience',
    title: 'Work History',
    subtitle: 'Professional background',
    content: null,
    experiences: [
      { role: 'Full-Stack Developer', company: 'Boffin Coders Private Limited', duration: 'July 2020 - November 2025' },
      { role: 'Freelancer', company: 'Self-employed', duration: 'November 2025 - Present' },
    ],
  },
  {
    id: 'contact',
    icon: '📬',
    label: 'Contact',
    title: 'Get in Touch',
    subtitle: "Let's build something together",
    content: null,
    contactInfo: [
      { icon: '📱', label: 'Phone', value: '+91 79732 49610' },
      { icon: '✉️', label: 'Email', value: 'gurdeepsharma5492@gmail.com' },
    ],
  },
  {
    id: 'infrastructure',
    icon: '🖧',
    label: 'Infrastructure',
    title: 'Server Architecture',
    subtitle: 'Self-hosted services and deployments',
    content: 'Experienced in deploying, managing, and scaling web applications using modern DevOps practices and cloud infrastructure.',
    tags: ['Linux', 'Docker', 'Nginx', 'AWS', 'CI/CD'],
  },
]

export default function InfoCards({ activeSection }: { activeSection: number }) {
  if (activeSection === 0) return null

  const data = SECTIONS[activeSection] as any

  return (
    <div className="scroll-card visible" key={data.id}>
      <div className="scroll-card-inner">
        <div className="scroll-card-label">
          <span className="scroll-card-icon">{data.icon}</span>
          <span className="scroll-card-label-text">{data.label}</span>
        </div>

        <h2 className="scroll-card-title">{data.title}</h2>
        {data.subtitle && <p className="scroll-card-subtitle">{data.subtitle}</p>}

        {data.content && (
          <p className="scroll-card-body">{data.content}</p>
        )}

        {data.tags && (
          <div className="scroll-card-tags">
            {data.tags.map((tag: string) => (
              <span key={tag} className="scroll-card-tag">{tag}</span>
            ))}
          </div>
        )}

        {data.projects && (
          <div className="scroll-card-projects">
            {data.projects.map((p: any) => (
              <div key={p.name} className="scroll-card-project">
                <span className="project-emoji">{p.emoji}</span>
                <div>
                  <div className="project-name">{p.name}</div>
                  <div className="project-tech">{p.tech}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {data.experiences && (
          <div className="scroll-card-experiences" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {data.experiences.map((exp: any, i: number) => (
              <div key={i} className="scroll-card-experience" style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontWeight: 600, color: '#f5f5f0', fontSize: '1rem', letterSpacing: '0.01em' }}>{exp.role}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#a0c4ff' }}>{exp.company}</span>
                  <span style={{ color: '#8b949e' }}>{exp.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {data.contactInfo && (
          <div className="scroll-card-contact">
            {data.contactInfo.map((c: any) => (
              <div key={c.label} className="contact-row">
                <span className="contact-row-icon">{c.icon}</span>
                <div>
                  <div className="contact-row-label">{c.label}</div>
                  <div className="contact-row-value">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="scroll-dots">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`scroll-dot ${activeSection === i ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  )
}
