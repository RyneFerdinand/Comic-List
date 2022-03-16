import "./CharacterCard.css";

export default function CharacterCard(props) {
  return (
    <div className="character-card">
      <img
        src={props.character.character.images.webp.image_url}
        alt=""
        className="character-card__image"
      />
      <h5 className="character-card__title">
        {props.character.character.name}
      </h5>
      <h5 className="character-card__subtitle">{props.character.role}</h5>
    </div>
  );
}
