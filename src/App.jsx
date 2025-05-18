import Section from "./components/Section";
import ScrollButton from "./components/Continue-button";
import CardCarousel from "./components/Card-carousel";
import Form from "./components/Form";
import Popup from "./components/Popup";
import AnimatedTitleBanner from "./components/Banner";
import ScrollMore from "./components/ScrollMore";
import Footer from "./components/Footer";

import "./App.css";

import image1 from "./assets/bg-1.jpg";
import image2 from "./assets/bg-2.jpg";
import image3 from "./assets/bg-3.jpg";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />

      <Section bgImage={image1}>
        <div className="banner">
          <AnimatedTitleBanner
            title="Start Planning Your Next Adventure."
            subtitle=""
          />
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <ScrollButton />
        </div>
      </Section>
      <Section
        bgImage={image2}
        isFirst={false}
        title={"Explore Popular Destinations"}
      >
        <CardCarousel />
        <ScrollMore />
      </Section>
      <Section
        bgImage={image3}
        title="Start Your Journey Now!"
        subtitle="Choose your location and let us guide you."
      >
        <div className="form-container">
          <Form />
        </div>
        <Footer />
      </Section>
    </div>
  );
}

export default App;
