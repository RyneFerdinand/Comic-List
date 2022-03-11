import './CarouselItem.css'

export default function CarouselItem(props) {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${props.data.image})` }}>
      <div className="hero-section__detail">
        <h1 className="hero-section__title">{props.data.title}</h1>
          <button className="add-button">Read More</button>
      </div>
    </div>
  );
}
