import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./LandingSlider.css";

const LandingSlider = ({ products }) => {
  return (
    <div className="hero-container">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 3500 }}
        loop
        navigation
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="hero-banner">
              {/* LEFT */}
              <div className="hero-left">
                <h1>
                  Are you ready to <br />
                  <span>lead the way</span>
                </h1>

                <p>Luxury meets ultimate sitting comfort</p>

                <button className="hero-btn">Discover</button>

                <div className="hero-thumbs">
                  {products.slice(0, 3).map((p) => (
                    <img key={products.id} src={p._thumbnail} alt="" />
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="hero-right">
                <img src={item.thumbnail} alt={item.title} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingSlider;
