import React from "react";
import Field from "../components/Field";

interface PlayerFieldsProps {
  number: number;
  isAlternate: boolean;
  player: PI;
  disabled?: boolean;
  game: Game;
  updatePlayer: (p: PI) => void;
}

const PlayerFields: React.FC<PlayerFieldsProps> = ({
  number,
  isAlternate,
  player,
  updatePlayer,
  game,
  disabled = false,
}) => {
  const email = "email";
  const fieldName = game.type.type === "url" ? "url" : "username";
  
  return (
    <div>
      {number !== 0 && (
        <label>
          <strong>
            {isAlternate ? "Alternate Player" : `Player ${number + 1}`}
          </strong>
        </label>
      )}
      <Field
        type={game.type.type}
        name={game.type.name}
        placeholderText={game.type.placeholder ? game.type.placeholder : ""}
        value={player[fieldName]}
        onChange={(v: string, e) => {
          updatePlayer({ ...player, [fieldName]: v });
        }}
        required={!isAlternate}
        disable={disabled}
      />
      <Field
        type="email"
        name="email"
        placeholderText=""
        value={player[email]}
        onChange={(v: string, e) => {
          updatePlayer({ ...player, [email]: v });
        }}
        required={!isAlternate}
        disable={disabled}
      />
    </div>
  );
};

export default PlayerFields;
