import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./CardCarousel.css";
import PopupComponent from "./Popup";

const rawCards = [
  {
    title: "Australia",
    desc: "Breathtaking trails and scenic beauty.",
    description:
      "Australia officially the Commonwealth of Australia, is a country comprising the mainland of the Australian continent, the island of Tasmania and numerous smaller islands. [N 6]  It has a total area of 7,688,287 km 2  (2,968,464 sq mi), making it the sixth-largest country in the world and the largest in Oceania. Australia is the world&#39;s flattest and driest inhabited continent. Contemporary Australian culture is diverse [366]  and reflects the country&#39;s Indigenous traditions, Anglo-Celtic heritage, and post-1945 history of multicultural immigration. [367][368]  The culture of the United States has also been influential. [369]  The evolution of Australian culture since British colonisation has given rise to distinctive cultural traits.",
    img: "./images/card1.jpg",
  },
  {
    title: "Dubai",
    desc: "Feel the waves and warm sand.",
    description:
      "Dubai is the most populous city in the United Arab Emirates and the capital of the Emirate of Dubai, the most populous out of the country's seven emirates.[11][12][13] As of 2024, the city has a population of around 3.79 million,[14] more than 90% of whom are expatriates. Dubai is situated on the Persian Gulf coast of the United Arab Emirates and is roughly at sea level (16 m or 52 ft above). The emirate of Dubai shares borders with Abu Dhabi in the south, Sharjah in the northeast, and the Sultanate of Oman in the southeast. Hatta, a minor exclave of the emirate, is surrounded on three sides by Oman and by the emirates of Ajman (in the west) and Ras Al Khaimah (in the north). The Persian Gulf borders the western coast of the emirate. Dubai is positioned at 25.2697°N 55.3095°E and covers an area of 1,588 sq mi (4,110 km2), which represents a significant expansion beyond its initial 1,500 sq mi (3,900 km2) designation due to land reclamation from the sea.",
    img: "/images/card2.jpg",
  },
  {
    title: "Rome",
    desc: "Step into stories of the past.",
    description:
      "Rome the capital city and most populated comune (municipality) of Italy, the architecture of Rome over the centuries has greatly developed from Ancient Roman architecture to Italian modern and contemporary architecture. Rome was once the world's main epicentres of Classical architecture, developing new forms such as the arch, the dome and the vault. Rome is a city known for its numerous fountains, built-in all different styles, from Classical and Medieval, to Baroque and Neoclassical. The city has had fountains for more than two thousand years, and they have provided drinking water and decorated the piazzas of Rome. Rome is well known for its statues but, in particular, the talking statues of Rome. These are usually ancient statues which have become popular soapboxes for political and social discussion, and places for people to (often satirically) voice their opinions.",
    img: "/images/card3.webp",
  },
  {
    title: "Kashmir",
    desc: "Sunsets and camel rides await.",
    description:
      "Kashmir is the northernmost geographical region of the Indian subcontinent. Until the mid-19th century, the term Kashmir denoted only the Kashmir Valley between the Great Himalayas and the Pir Panjal Range. The forests vary according to the climatic conditions and the altitude. Kashmir forests range from the tropical deciduous forests in the foothills of Jammu and Muzafarabad, to the temperate forests throughout the Vale of Kashmir and to the alpine grasslands and high altitude meadows in Gilgit-Baltistan and Ladakh.[55][56] The Kashmir region has four well defined zones of vegetation in the tree growth, due to the difference in elevation. The tropical forests up to 1500 m, are known as the Phulai (Acacia modesta) and Olive (Olea cuspid ata) Zone. Kashmir has a different climate for every region owing to the great variation in altitude. The temperatures ranges from the tropical heat of the Punjab summer to the intensity of the cold which keeps the perpetual snow on the mountains.",
    img: "/images/card4.webp",
  },
  {
    title: "Tokyo",
    desc: "Nature in its rawest form.",
    description:
      "Tokyo,[a] officially the Tokyo Metropolis,[b] is the capital and most populous city in Japan. Tokyo is home to a wide array of museums, art galleries, and libraries, catering to various interests. Ueno Park has the Tokyo National Museum, the country's largest museum specializing in traditional Japanese art,[212] the National Museum of Western Art, whose building designed by Le Corbusier is a world heritage site,[213] and the National Museum of Nature and Science. Ueno Zoo is also located within the park, near the Shinobazu Pond.  Michelin released their first guide for fine dining in Tokyo, awarding 191 stars in total, or about twice as many as Tokyo's nearest competitor, Paris. As of 2017, 227 restaurants in Tokyo have been awarded (92 in Paris). Natural settings for outdoor activities include Okutama and Mount Takao, which are known for their hiking trails and scenic views. Kasai Seaside Park provides coastal leisure activities. Ueno Park houses several museums, and a zoo, and is famous for its cherry blossoms.",
    img: "/images/card5.jpg",
  },
];

const CardCarousel = () => {
  const scrollRef = useRef();
  const fullCards = [...rawCards, ...rawCards, ...rawCards];

  // Popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const container = scrollRef.current;
    const cardWidth = container.firstChild.offsetWidth + 20;
    const middleScroll = cardWidth * rawCards.length;

    container.scrollLeft = middleScroll;

    const resetPosition = () => {
      const scrollLeft = container.scrollLeft;
      const totalWidth = container.scrollWidth;
      const visibleWidth = container.clientWidth;

      if (scrollLeft < cardWidth) {
        container.scrollLeft = middleScroll;
      } else if (scrollLeft > totalWidth - visibleWidth - cardWidth) {
        container.scrollLeft = middleScroll;
      }
    };

    container.addEventListener("scroll", resetPosition);

    const autoScroll = setInterval(() => {
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    }, 3000);

    return () => {
      container.removeEventListener("scroll", resetPosition);
      clearInterval(autoScroll);
    };
  }, []);

  const scroll = (dir) => {
    const container = scrollRef.current;
    const cardWidth = container.firstChild.offsetWidth + 20;
    container.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  const handleKnowMore = (card) => {
    setSelectedCard(card);
    setPopupOpen(true);
  };

  return (
    <>
      <div className="carousel-wrapper">
        <button className="nav-btn left" onClick={() => scroll(-1)}>
          ‹
        </button>
        <div className="card-carousel" ref={scrollRef}>
          {fullCards.map((card, i) => (
            <motion.div
              className="card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % rawCards.length) * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <img src={card.img} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <button
                onClick={() => handleKnowMore(card)}
                className="know-more-btn"
              >
                Know more →
              </button>
            </motion.div>
          ))}
        </div>
        <button className="nav-btn right" onClick={() => scroll(1)}>
          ›
        </button>
      </div>

      <PopupComponent
        open={popupOpen}
        handleClose={() => setPopupOpen(false)}
        card={selectedCard}
      />
    </>
  );
};

export default CardCarousel;
