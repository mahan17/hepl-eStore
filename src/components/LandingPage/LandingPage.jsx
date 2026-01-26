import React from "react";
import "./landingPage.css";
// Replace this with the path to the shopping image I generated for you
import bgImage from "../../assets/images/landingPage.png"; 

const LandingPage = () => {
  const handleStartShopping = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

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

          {/* ACTIONABLE: COUPON CODE */}
          <div className="landing-promo">
            <span className="promo-badge">OFFER</span>
            <div className="promo-text">
              Use code <span className="code">NEW20</span> for 20% OFF
            </div>
          </div>

          <button className="landing-btn" onClick={handleStartShopping}>
            Start Shopping &rarr;
          </button>

          {/* ACTIONABLE: TRUST FEATURES */}
          <div className="landing-features">
            <div className="feature-item">
              <span className="feature-icon">🚚</span> Free Shipping
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛡️</span> Secure Pay
            </div>
            <div className="feature-item">
              <span className="feature-icon">↩️</span> Easy Returns
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default LandingPage;