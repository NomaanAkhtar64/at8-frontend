import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

import { __API_URL__ } from "../const";
import useHeaders from "../hooks/useHeaders";
import "./TournamentConfirm.scss";
import Title from "../components/Title";
import { useState } from "react";

interface TournamentConfirmProps extends RouteComponentProps<{ id }> {}

const TournamentConfirm: React.FC<TournamentConfirmProps> = ({ match }) => {
  const headers = useHeaders();
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [isAlt, setIsAlt] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(true);
  const [dataExist, setDataExist] = useState(false);

  const confirm = () => {
    setDataUploaded(false);
    axios
      .put(
        `${__API_URL__}/api/players/${match.params.id}/`,
        {
          city,
          country,
          is_alternate: isAlt,
        },
        { headers }
      )
      .then(() => {
        setDataUploaded(true);
        setDataExist(true);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get(`${__API_URL__}/api/players/${match.params.id}/`, { headers })
      .then((res) => {
        setIsAlt(res.data.is_alternate);
        setUsername(res.data.username);
        setIsLoaded(true);
        if (res.data.city !== null && res.data.country !== null) {
          setDataExist(true);
        }
      })
      .catch((err) => console.log(err));
    axios
      .get("https://geolocation-db.com/json/")
      .then((res) => {
        setCity(res.data.city);
        setCountry(res.data.country_name);
      })
      .catch((err) => console.log(err));
  }, [headers, match.params.id]);

  return (
    <>
      <Title>Slot Confirm - AT8</Title>
      <div className="tournament-slot-confirm">
        {isLoaded ? (
          <div className="slot-confirm-page">
            <h2>Hey {username},</h2>
            {dataExist === false ? (
              <>
                <h3>Click on the button to confirm your slot</h3>
                {dataUploaded ? (
                  <button
                    className="btn btn-success"
                    onClick={confirm}
                    disabled={!dataUploaded}
                  >
                    Confirm
                  </button>
                ) : (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <h4>Your slot is successfully confirmed</h4>
                <p>
                  Now you can continue to the website <Link to="/">AT8</Link>
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
};

export default TournamentConfirm;
