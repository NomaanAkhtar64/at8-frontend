import React, { useState } from "react";
import parser from "html-react-parser";
import FormError from "../components/FormError";
import * as regex from "../regex";
import PlayerFields from "./PlayerFields";
import camelToWords from "../utils/camelToWords";
import { useEffect } from "react";
import axios from "axios";

interface TeamCaptainProps {
  onBack: () => void;
  onSuccess: (c: {
    captain: Player;
    captainTag: string;
    stream_url: string;
  }) => void;
  site: Site;
  game: Game;
  stream_required: boolean;
}

const TeamCaptain: React.FC<TeamCaptainProps> = ({
  onBack,
  onSuccess,
  site,
  game,
  stream_required,
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const streamRequired = stream_required;
  const [streamUrl, setStreamUrl] = useState("");
  const [captainTag, setCaptainTag] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [captain, setCaptain] = useState<Player>({
    url: "",
    username: "",
    is_alternate: false,
    country: "",
    city: "",
  });
  useEffect(() => {
    axios
      .get("https://geolocation-db.com/json/")
      .then((res) => {
        setCity(res.data.city);
        setCountry(res.data.country_name);
      })
      .catch((err) => console.log(err));
  }, [])
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
          updatePlayer={(p) => {
            p.city = city;
            p.country = country;
            setCaptain(p);
          }}
          isAlternate={captain.is_alternate}
          number={0}
        />
        {streamRequired && (
          <div className="form-group">
            <label>Game stream link</label>
            <input
              type="text"
              className="form-control"
              placeholder="Channel where you will stream"
              value={streamUrl}
              onChange={(e) => setStreamUrl(e.target.value)}
            />
          </div>
        )}

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
              onSuccess({ captain, captainTag, stream_url: streamUrl });
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
