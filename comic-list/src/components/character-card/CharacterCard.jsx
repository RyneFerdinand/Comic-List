import "./CharacterCard.css";

export default function CharacterCard(props) {
  return (
    <div className="character-card">
      <img
        src={props.character.image}
        alt=""
        className="character-card__image"
      />
      <h5 className="character-card__title">
        {props.character.name}
      </h5>
      <h5 className="character-card__subtitle">{props.character.role}</h5>
    </div>
  );
}
