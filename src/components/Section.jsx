import { useEffect, useRef, useState } from "react";

const Section = ({ bgImage, title, subtitle, children }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    return () => window.removeEventListener("scroll", checkVisibility);
  }, []);

  return (
    <section
      ref={ref}
      className="parallax-section"
      style={{
        backgroundImage: `
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.4) 60%,
        rgba(0, 0, 0, 0.9) 100%
      ),
      url(${bgImage})
    `,
      }}
    >
      <div className="content" style={
        { fontWeight: "700"}
      }>
        <h1 className={`animate ${isVisible ? "show" : ""}`}>{title}</h1>
        <p className={`animate ${isVisible ? "show" : ""}`}>{subtitle}</p>
        {children}
      </div>
    </section>
  );
};

export default Section;
