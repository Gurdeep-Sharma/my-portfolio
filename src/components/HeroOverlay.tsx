export default function HeroOverlay({ faded }: { faded: boolean }) {
  return (
    <div className={`hero-overlay ${faded ? 'faded' : ''}`}>
      <div className="hero-top">
        <div className="hero-logo">// Gurdeep Sharma</div>
      </div>

      <div className="hero-bottom-left">
        <h1>Building the<br />Future, One<br />Pixel at a Time.</h1>
        <p>Full-stack developer crafting seamless digital experiences with the MERN stack, Three.js, and a love for clean architecture.</p>
        <div className="hero-hint">
          <span className="dot"></span>
          Scroll down to explore the desk
        </div>
      </div>
    </div>
  )
}
