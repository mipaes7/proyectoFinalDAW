import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';


const Recommendations = ({ recommendationsByManga }) => {
  const navigate = useNavigate();

  const handleClick = (param) => {
    navigate(`/manga/${param}`)
  };

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {recommendationsByManga.map((rec) => (
        <div key={uuidv4()} className="recommendation-slide">
          <img src={rec.entry.images.jpg.image_url} alt={rec.entry.title} />
          <h3>{rec.entry.title}</h3>
          <button onClick={() => handleClick(rec.entry.mal_id)}>See more {"\u{027A4}"}</button>
        </div>
      ))}
    </Slider>
  );
};

export default Recommendations;
