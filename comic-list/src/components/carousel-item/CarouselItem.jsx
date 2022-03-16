import './CarouselItem.css'
import { useNavigate } from 'react-router-dom';

export default function CarouselItem(props) {

  let navigate = useNavigate();

  const redirect = () => {
    navigate(`/comic/${props.id}`);
  }
  
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${props.data.image})` }}>
      <div className="hero-section__detail">
        <h1 className="hero-section__title">{props.data.title}</h1>
          <button className="more-button" onClick={redirect}>Read More</button>
      </div>
    </div>
  );
}
