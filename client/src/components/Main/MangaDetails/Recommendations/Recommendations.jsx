import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Recommendations = ({ recommendationsByManga }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/manga/${id}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    trl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="recommendations">
      <Slider {...settings}>
        {recommendationsByManga.map((rec) => (
          <div key={uuidv4()} className="recommendation-slide">
            <img
              src={rec.entry.images.jpg.image_url}
              alt={rec.entry.title}
              loading="lazy"
            />
            <h3>{rec.entry.title}</h3>
            <button onClick={() => handleClick(rec.entry.mal_id)}>
              See more {"\u{027A4}"}
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Recommendations;
