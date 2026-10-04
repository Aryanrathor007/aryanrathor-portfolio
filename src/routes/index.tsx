import { createFileRoute } from '@tanstack/react-router'
import {
  Award,
  Blocks,
  Braces,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  FileCode2,
  GitBranch,
  Github,
  Globe2,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageSquareCode,
  Network,
  PackageOpen,
  Rocket,
  Send,
  Server,
  Sparkles,
  TerminalSquare,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

const navItems = ['Home', 'About', 'Education', 'Projects', 'Skills', 'Achievements', 'Contact']

const stack = [
  'C++',
  'Python',
  'React Native',
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'Generative AI',
]

const education = [
  {
    institution: 'Rajiv Gandhi Institute of Petroleum Technology (RGIPT)',
    course: 'B.Tech in Information Technology',
    meta: 'Upcoming',
    icon: GraduationCap,
  },
  {
    institution: 'Sanskar Shiksha Academy',
    course: 'Senior Secondary (12th)',
    meta: 'Final Score 77%',
    icon: FileCode2,
  },
  {
    institution: 'Sanskar Shiksha Academy',
    course: 'Secondary (10th)',
    meta: 'Final Score 88%',
    icon: FileCode2,
  },
]

const skillGroups: Record<string, Array<{ name: string; icon: LucideIcon }>> = {
  Languages: [
    { name: 'C++', icon: Braces },
    { name: 'Python', icon: Code2 },
    { name: 'JavaScript', icon: FileCode2 },
  ],
  'Frontend & Backend': [
    { name: 'HTML', icon: Globe2 },
    { name: 'CSS', icon: Sparkles },
    { name: 'React', icon: Blocks },
    { name: 'React Native', icon: Cpu },
    { name: 'Tailwind CSS', icon: Wrench },
  ],
  'DevOps & Cloud': [
    { name: 'Netlify', icon: Cloud },
    { name: 'GitHub', icon: Github },
    { name: 'CI / CD', icon: Network },
  ],
  Tools: [
    { name: 'Git', icon: GitBranch },
    { name: 'VS Code', icon: TerminalSquare },
    { name: 'Generative AI', icon: Sparkles },
  ],
}

const projects = [
  {
    index: '01',
    title: 'StudySync',
    description:
      'A collaborative study platform that helps students stay focused with group study rooms, Pomodoro timers, leaderboards, and real-time progress tracking.',
    tags: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Git', 'GitHub', 'Netlify'],
    status: 'In Progress',
    featured: true,
  },
  { index: '02', title: 'Next build loading...', description: 'A new idea is moving from notes to code.', tags: [], status: 'Reserved' },
  { index: '03', title: 'Future project', description: 'This slot is ready for the next shipped experience.', tags: [], status: 'Reserved' },
  { index: '04', title: 'Open experiment', description: 'A space for prototypes, AI experiments, and useful tools.', tags: [], status: 'Reserved' },
]

const certifications = [
  { title: 'Anthropic Certification 1', verificationUrl: 'https://verify.skilljar.com/c/g7qseaxmfqxz' },
  { title: 'Anthropic Certification 2', verificationUrl: 'https://verify.skilljar.com/c/2jpyfe4c8szs' },
  { title: 'Anthropic Certification 3', verificationUrl: 'https://verify.skilljar.com/c/sn394cbqhwm6' },
  { title: 'Anthropic Certification 4', verificationUrl: 'https://verify.skilljar.com/c/tro7wg2adqyr' },
]

type ContactValues = { name: string; email: string; message: string }
type ContactErrors = Partial<Record<keyof ContactValues, string>>

const emptyContact: ContactValues = { name: '', email: '', message: '' }

function validateContact({ name, email, message }: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (!name.trim()) errors.name = 'Name is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address.'
  if (message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  return errors
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSkill, setActiveSkill] = useState('Languages')
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [contactValues, setContactValues] = useState<ContactValues>(emptyContact)
  const [contactErrors, setContactErrors] = useState<ContactErrors>({})
  const [botField, setBotField] = useState('')

  const updateContact = (field: keyof ContactValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target
    setContactValues((current) => ({ ...current, [field]: value }))
    setContactErrors((current) => ({ ...current, [field]: undefined }))
    if (formStatus === 'success' || formStatus === 'error') setFormStatus('idle')
  }

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formStatus === 'sending') return

    const errors = validateContact(contactValues)
    setContactErrors(errors)
    if (Object.keys(errors).length > 0) return

    setFormStatus('sending')
    const encodedData = new URLSearchParams({
      'form-name': 'contact',
      'bot-field': botField,
      name: contactValues.name.trim(),
      email: contactValues.email.trim(),
      message: contactValues.message.trim(),
    })

    try {
      // Posting to the static form document lets Netlify Forms handle the submission instead of the SSR function.
      const response = await fetch('/contact.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedData.toString(),
      })
      if (!response.ok) throw new Error('Submission failed')
      setContactValues(emptyContact)
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <main className="site-shell">
      <nav className="top-nav" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Aryan Rathor portfolio home">
          <TerminalSquare size={20} />
          <span>$ portfolio_</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      <section className="hero section" id="home">
        <div className="motion-field" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <span className="particle p1" />
          <span className="particle p2" />
          <span className="particle p3" />
          <span className="particle p4" />
        </div>

        <div className="hero-copy reveal-up">
          <div className="eyebrow"><span>01</span> Hello, world. I&apos;m</div>
          <h1>ARYAN<br /><span>RATHOR</span></h1>
          <p className="hero-tagline">Building before the world says I&apos;m ready.<span className="cursor">_</span></p>
          <p className="hero-subtext">IT undergraduate passionate about building impactful digital experiences.</p>
          <div className="hero-actions">
            <a className="primary-button" href="/Aryan-Rathor-Resume.txt" download>
              <Download size={17} /> Download Resume
            </a>
            <a className="text-link" href="#projects">Explore work <ChevronRight size={17} /></a>
          </div>
        </div>

        <div className="hero-status reveal-up delay-one" aria-label="Developer status">
          <div className="window-bar"><span /><span /><span /><small>aryan@portfolio:~</small></div>
          <div className="terminal-lines">
            <p><b>$</b> whoami</p>
            <p className="output">IT_STUDENT / BUILDER / LEARNER</p>
            <p><b>$</b> current_focus</p>
            <p className="output">shipping_meaningful_products</p>
            <p><b>$</b> status --live</p>
            <p className="success"><Check size={14} /> accepting_internships</p>
          </div>
        </div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXECUTE</span><i /></a>
      </section>

      <section className="section about" id="about">
        <SectionHeading label="WHO I AM" title="About Me" number="02" />
        <div className="about-grid">
          <div className="about-copy">
            <div className="availability"><i /> Available · Open to Internships</div>
            <h3>I build things that <em>ship, learn,</em> and grow.</h3>
            <p>I&apos;m Aryan Rathor — an IT undergraduate passionate about building impactful digital experiences. I enjoy turning ideas into clean, functional products while constantly learning software development, AI, and modern web technologies.</p>
            <div className="stack-block">
              <span className="mini-label">// CORE_STACK</span>
              <div className="tag-list">
                {stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </div>

          <div className="pipeline-card glow-card">
            <div className="card-topline"><span><GitBranch size={15} /> build_pipeline.yml</span><small>main</small></div>
            <div className="pipeline-body">
              <p><span className="line-no">01</span><b>name:</b> build-the-future</p>
              <p><span className="line-no">02</span><b>on:</b> [curiosity, ideas]</p>
              <p><span className="line-no">03</span><b>jobs:</b></p>
              <div className="pipeline-step"><Check /> <span><b>learn</b><small>Knowledge acquired</small></span><time>0.8s</time></div>
              <div className="pipeline-step"><Check /> <span><b>build</b><small>Idea compiled</small></span><time>2.4s</time></div>
              <div className="pipeline-step active"><Rocket /> <span><b>ship</b><small>Deploying impact...</small></span><time>live</time></div>
            </div>
            <div className="pipeline-footer"><span>● ALL SYSTEMS OPERATIONAL</span><small>build #0042</small></div>
          </div>
        </div>
      </section>

      <section className="section education" id="education">
        <SectionHeading label="ACADEMIC LOG" title="Academic Journey" number="03" />
        <div className="timeline">
          {education.map((entry, index) => {
            const Icon = entry.icon
            return (
              <article className="timeline-entry" key={entry.course}>
                <div className="timeline-index">0{index + 1}</div>
                <div className="timeline-node"><Icon /></div>
                <div className="timeline-content">
                  <div><span className="mini-label">EDUCATION_ENTRY</span><h3>{entry.institution}</h3><p>{entry.course}</p></div>
                  <strong>{entry.meta}</strong>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section projects" id="projects">
        <SectionHeading label="SELECTED WORK" title="Featured Projects" number="04" />
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.featured ? 'featured' : 'placeholder'}`} key={project.index}>
              <div className="project-head"><span>{project.index} / PROJECT</span><i>{project.status}</i></div>
              {project.featured ? (
                <>
                  <div className="project-icon"><MessageSquareCode /></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list compact">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-footer"><span><GitBranch size={15} /> main</span><span className="project-link">Building now <Rocket size={15} /></span></div>
                </>
              ) : (
                <div className="placeholder-body">
                  <PackageOpen />
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span>awaiting_commit();</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section skills" id="skills">
        <SectionHeading label="TECHNICAL ARSENAL" title="Skills & Tools" number="05" />
        <div className="skill-tabs" role="tablist" aria-label="Skill categories">
          {Object.keys(skillGroups).map((group) => (
            <button key={group} type="button" role="tab" aria-selected={activeSkill === group} className={activeSkill === group ? 'active' : ''} onClick={() => setActiveSkill(group)}>
              <span>$</span> {group}
            </button>
          ))}
        </div>
        <div className="skill-grid" role="tabpanel">
          {skillGroups[activeSkill].map(({ name, icon: Icon }, index) => (
            <article className="skill-card" key={name} style={{ '--delay': `${index * 70}ms` } as CSSProperties}>
              <Icon />
              <div><span>{name}</span><small>ready_to_use</small></div>
              <i>0{index + 1}</i>
            </article>
          ))}
        </div>
      </section>

      <section className="section achievements" id="achievements">
        <SectionHeading label="PROOF OF LEARNING" title="Achievements & Certifications" number="06" />
        <div className="certificate-grid">
          {certifications.map(({ title, verificationUrl }) => (
            <a className="certificate-card" href={verificationUrl} key={title} target="_blank" rel="noreferrer">
              <div className="certificate-icon"><Award /></div>
              <div><span>ANTHROPIC</span><h3>{title}</h3><p>Click to verify credential.</p></div>
              <ExternalLink size={17} />
            </a>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact-grid">
          <div className="contact-column">
            <div className="command-heading"><span>$</span> send --message</div>
            <p className="contact-intro">Have an opportunity, idea, or just want to say hello? Drop a message into the terminal.</p>
            <form className="contact-form glow-card" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submitContact} noValidate>
              <input type="hidden" name="form-name" value="contact" />
              <p className="honeypot"><label>Don&apos;t fill this out: <input name="bot-field" value={botField} onChange={(event) => setBotField(event.target.value)} tabIndex={-1} autoComplete="off" /></label></p>
              <div className="window-bar"><span /><span /><span /><small>new-message.js</small></div>
              <div className="form-code">
                <div className="code-line">
                  <span className="line-number">01</span>
                  <label className="code-key" htmlFor="contact-name"><b>contact</b> name =</label>
                  <input id="contact-name" name="name" value={contactValues.name} onChange={updateContact('name')} placeholder='"your name"' autoComplete="name" aria-invalid={Boolean(contactErrors.name)} aria-describedby={contactErrors.name ? 'contact-name-error' : undefined} />
                  {contactErrors.name && <p className="field-error" id="contact-name-error">{contactErrors.name}</p>}
                </div>
                <div className="code-line">
                  <span className="line-number">02</span>
                  <label className="code-key" htmlFor="contact-email"><b>contact</b> email =</label>
                  <input id="contact-email" name="email" type="email" value={contactValues.email} onChange={updateContact('email')} placeholder='"you@email.com"' autoComplete="email" aria-invalid={Boolean(contactErrors.email)} aria-describedby={contactErrors.email ? 'contact-email-error' : undefined} />
                  {contactErrors.email && <p className="field-error" id="contact-email-error">{contactErrors.email}</p>}
                </div>
                <div className="code-line message-line">
                  <span className="line-number">03</span>
                  <label className="code-key" htmlFor="contact-message"><b>contact</b> message =</label>
                  <textarea id="contact-message" name="message" value={contactValues.message} onChange={updateContact('message')} placeholder='"let’s build something..."' aria-invalid={Boolean(contactErrors.message)} aria-describedby={contactErrors.message ? 'contact-message-error' : undefined} />
                  {contactErrors.message && <p className="field-error" id="contact-message-error">{contactErrors.message}</p>}
                </div>
              </div>
              <button className="submit-button" type="submit" disabled={formStatus === 'sending'} aria-busy={formStatus === 'sending'}>
                <Send size={16} /> {formStatus === 'sending' ? 'pushing...' : 'git push origin/message'}
              </button>
              <div aria-live="polite">
                {formStatus === 'success' && <p className="form-message success"><Check size={15} /> Message pushed successfully. I&apos;ll get back to you soon.</p>}
                {formStatus === 'error' && <p className="form-message error">Push failed. Please try again or email me directly.</p>}
              </div>
            </form>
          </div>

          <div className="contact-column methods">
            <div className="command-heading"><span>$</span> contact --methods</div>
            <p className="contact-intro">Choose your preferred protocol. Replies are human-powered.</p>
            <a className="contact-card" href="mailto:aryanrathor174@gmail.com"><Mail /><div><span>EMAIL</span><strong>aryanrathor174@gmail.com</strong></div><ChevronRight /></a>
            <div className="contact-card"><MapPin /><div><span>LOCATION</span><strong>Currently at RGIPT</strong></div><i className="status-dot" /></div>
            <a className="contact-card" href="https://www.linkedin.com/in/aryan-rathor-1732b4262/" target="_blank" rel="noreferrer"><Linkedin /><div><span>LINKEDIN</span><strong>Connect with Aryan</strong></div><ExternalLink /></a>
            <div className="response-card"><Server /><div><span>EXPECTED_RESPONSE_TIME</span><strong>&lt; 24 hours</strong></div><small>ONLINE</small></div>
          </div>
        </div>
      </section>

      <footer>
        <a className="brand" href="#home"><TerminalSquare size={18} /> <span>$ portfolio_</span></a>
        <p>Designed &amp; built by Aryan Rathor <span>·</span> 2026</p>
        <p className="footer-status"><i /> SYSTEM ONLINE</p>
      </footer>
    </main>
  )
}

function SectionHeading({ label, title, number }: { label: string; title: string; number: string }) {
  return (
    <div className="section-heading">
      <div><span className="mini-label">// {label}</span><h2><b>$</b> {title}</h2></div>
      <span className="section-number">{number}</span>
    </div>
  )
}
