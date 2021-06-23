import React, { useState } from "react";
import parser from "html-react-parser";
import FormError from "../components/FormError";
import * as regex from "../regex";
import PlayerFields from "./PlayerFields";
import camelToWords from "../utils/camelToWords";

interface TeamCaptainProps {
  onBack: () => void;
  onSuccess: (c: {
    captain: Player;
    captainTag: string;
  }) => void;
  site: Site;
  game: Game;
}

const TeamCaptain: React.FC<TeamCaptainProps> = ({
  onBack,
  onSuccess,
  site,
  game,
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [captainTag, setCaptainTag] = useState("");
  const [captain, setCaptain] = useState<Player>({
    url: "",
    username: "",
    email: "",
    is_alternate: false,
    country: "",
    city: "",
  });
  return (
    <div className="register-form">
      <div className="back-btn ml-3">
        <button
          className="btn btn-warning"
          style={{
            borderTopLeftRadius: "50px",
            borderBottomLeftRadius: "50px",
          }}
          onClick={onBack}
        >
          Back
        </button>
      </div>
      <form className="form">
        <legend>Team Captain</legend>
        <div className="form-group">
          <label>Discord username + Tag</label>
          <input
            type="text"
            className="form-control"
            placeholder="name#1234"
            value={captainTag}
            onChange={(e) => setCaptainTag(e.target.value)}
            required
          />
        </div>
        <PlayerFields
          game={game}
          player={captain}
          updatePlayer={(p) => setCaptain(p)}
          isAlternate={captain.is_alternate}
          number={0}
        />
        <FormError errors={errors} />
        <button
          type="button"
          className="btn btn-success"
          style={{ width: "100%" }}
          onClick={() => {
            let isValid = true;
            let errs = [];
            const fieldName = game.type.type === "url" ? "url" : "username";

            if (game.type.validation_regex) {
              const validationRegex = new RegExp(
                game.type.validation_regex,
                "g"
              );
              if (captain[fieldName].match(validationRegex) === null) {
                isValid = false;
                errs.push(`${camelToWords(game.type.name)} Is Invalid`);
              }
            }

            if (game.type.required && captain[fieldName] === "") {
              isValid = false;
              errs.push(`${camelToWords(game.type.name)} Is Required`);
            }

            if (captainTag.match(regex.DISCORD_TAG) === null) {
              isValid = false;
              errs.push("Discord Username Is Invalid");
            }

            setErrors(errs);

            if (isValid) {
              onSuccess({ captain, captainTag });
            }
          }}
        >
          Enter
        </button>
      </form>

      <div className="hint">
        <h1>Help text</h1>
        <div>{parser(site.help_team_captain)}</div>
      </div>
    </div>
  );
};

export default TeamCaptain;
