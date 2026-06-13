import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <p className="hero-tag">Fast • Fresh • Delicious</p>
        <h1>Order your favorite food fast</h1>
        <p>
          Browse restaurants, choose delicious meals, and get food delivered fresh.
        </p>

        <a href="#menu">
          <button>Browse Menu</button>
        </a>
      </div>

      <img className="hero-image" src={heroImage} alt="Food delivery" />
    </section>
  );
}

export default Hero;