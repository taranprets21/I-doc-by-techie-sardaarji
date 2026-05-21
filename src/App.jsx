import { useState } from 'react';
import { useAuth } from './AuthProvider.jsx';
import FeatureCard from './components/FeatureCard.jsx';
import TestSimulator from './components/TestSimulator.jsx';
import LoginForm from './components/LoginForm.jsx';
import WorkflowDashboard from './components/WorkflowDashboard.jsx';
import ContactForm from './components/ContactForm.jsx';

const heroFeatures = [
  {
    title: 'Fast Mobile Diagnostics',
    description: 'Run comprehensive phone checks for iOS, Android, tablets, and Apple Watch in minutes.'
  },
  {
    title: 'Reliable Quality Reports',
    description: 'Generate detailed device reports that reduce returns and accelerate resale decisions.'
  },
  {
    title: 'B2B Workflow Ready',
    description: 'Designed for wholesalers, refurbishers, repair centers, and trade-in programs.'
  }
];

const diagnostics = [
  {
    title: 'Apple Device Diagnostics',
    description:
      'Test iPhone, iPad and Apple Watch hardware with non-original part detection, camera validation, Face ID checks and Apple-specific diagnostics.'
  },
  {
    title: 'Android Device Diagnostics',
    description:
      'Carefully inspect Samsung, Google Pixel, OnePlus, Xiaomi, Huawei and more with platform-specific test sequences and IMEI verification.'
  },
  {
    title: 'Apple Watch Testing',
    description:
      'Pair the watch with iPhone and validate screen, connectivity, sensors, battery and overall condition in under 2 minutes.'
  }
];

const testimonials = [
  {
    quote: 'I-doc transformed our workflow. Accurate results and transparent reports make every trade-in faster.',
    author: 'Sean, Operations Lead'
  },
  {
    quote: 'The IMEI verification and defect scoring gave us confidence to scale with used phone buying programs.',
    author: 'Paula, Warehouse Manager'
  },
  {
    quote: 'This platform helped reduce returns and improved our customer trust across the refurbishment chain.',
    author: 'Adil, Refurbishing Partner'
  }
];

function App() {
  const { user, logout } = useAuth();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <span className="brand-mark">I-doc</span>
          <span className="brand-name">by Techie Sardaarji</span>
        </div>
        <nav className={`site-nav ${navOpen ? 'open' : ''}`}>
          <a href="#features">Features</a>
          <a href="#diagnostics">Diagnostics</a>
          <a href="#simulator">Simulator</a>
          <a href="#workflow">Workflow</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Get Started</a>
          {user ? (
            <button className="button secondary" onClick={logout} type="button">
              Logout
            </button>
          ) : (
            <a href="#workflow">Login</a>
          )}
        </nav>
        <button className="nav-toggle" onClick={() => setNavOpen((open) => !open)}>
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Phone diagnostics for modern refurbishers</p>
            <h1>Automated device testing and quality reporting for the used device market.</h1>
            <p className="hero-text">
              I-doc delivers a full web-based inspection platform for used phones, tablets, and wearables.
              Accelerate trade-ins, verify authenticity, and publish diagnostic certificates with confidence.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Schedule a Demo
              </a>
              <a className="button secondary" href="#simulator">
                Try Diagnostics
              </a>
            </div>
          </div>
          <div className="hero-card">
            <div className="card-header">
              <span className="status-chip">Live demo</span>
              <span className="device-type">Smartphone Test</span>
            </div>
            <div className="card-body">
              <strong>Current result</strong>
              <p>Device health: 98% · No non-original parts detected · Battery 92%</p>
              <div className="summary-grid">
                <div>
                  <strong>Sensors</strong>
                  <p>Passed</p>
                </div>
                <div>
                  <strong>Camera</strong>
                  <p>Clear</p>
                </div>
                <div>
                  <strong>Connectivity</strong>
                  <p>Good</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="feature-section">
          <div className="section-header">
            <small>Core capabilities</small>
            <h2>Maximize efficiency, reduce returns, improve quality</h2>
          </div>
          <div className="feature-grid">
            {heroFeatures.map((feature) => (
              <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
            ))}
          </div>
        </section>

        <section id="diagnostics" className="diagnostics-section">
          <div className="section-header">
            <small>Comprehensive testing</small>
            <h2>60+ tests to detect over 100 possible hardware defects</h2>
          </div>
          <div className="diagnostics-grid">
            {diagnostics.map((item) => (
              <article key={item.title} className="diagnostic-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="simulator" className="simulator-section">
          <div className="section-header">
            <small>Interactive demo</small>
            <h2>Run a simulated device check</h2>
          </div>
          <TestSimulator />
        </section>

        <section id="workflow" className="workflow-section">
          <div className="section-header">
            <small>Device workflow</small>
            <h2>{user ? 'Secure diagnostics and report management' : 'Login to access the full testing workflow'}</h2>
          </div>
          {user ? <WorkflowDashboard /> : <LoginForm />}
        </section>

        <section id="reviews" className="reviews-section">
          <div className="section-header">
            <small>Trusted by used device teams</small>
            <h2>What our clients are saying</h2>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <blockquote key={item.author} className="testimonial-card">
                <p>“{item.quote}”</p>
                <cite>{item.author}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-header">
            <small>Get started</small>
            <h2>Arrange a demo and start inspecting devices</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-copy">
              <h3>I-doc helps teams inspect device condition faster.</h3>
              <p>
                Use the platform to validate hardware, detect non-original parts, verify IMEI and generate certificates that support resale and warranty workflows.
              </p>
              <ul>
                <li>Browser-based diagnostics workflow</li>
                <li>Device history and report generation</li>
                <li>Works for iPhone, Android, tablets and Apple Watch</li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 I-doc by Techie Sardaarji. Built for trusted used device inspections.</p>
      </footer>
    </div>
  );
}

export default App;
