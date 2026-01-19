import './landingPage.css';
import bgImage from '../../assets/images/slide1.jpg';

const LandingPage = () => {
  return (
    <section
      className="landing"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="landing-overlay">
        <div className="landing-left">
          <h1>Welcome to ShopEase</h1>
          <p>
            Discover the best products at unbeatable prices.
            Shop smart, shop fast, shop easy.
          </p>
          <button className="landing-btn">Start Shopping</button>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
