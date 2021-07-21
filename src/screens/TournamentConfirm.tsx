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
  const [location, setLocation] = useState("");
  const [isAlt, setIsAlt] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(true);
  const [dataExist, setDataExist] = useState(false);
  const [error, setError] = useState(false);

  const confirm = () => {
    setDataUploaded(false);
    axios
      .put(
        `${__API_URL__}/api/players/${match.params.id}/`,
        {
          id: match.params.id,
          location,
          is_alternate: isAlt,
        },
        { headers }
      )
      .then(() => {
        setDataUploaded(true);
        setDataExist(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  useEffect(() => {
    axios
      .get(`${__API_URL__}/api/players/${match.params.id}/`, { headers })
      .then((res) => {
        setIsAlt(res.data.is_alternate);
        setUsername(res.data.username);
        setIsLoaded(true);
        if (
          res.data.location !== "" &&
          res.data.location !== null
        ) {
          setDataExist(true);
        }
      })
      .catch((err) => console.log(err));
    axios
      .get("https://extreme-ip-lookup.com/json/")
      .then((res) => {
        setLocation(
          res.data.continent + "," + res.data.country + "," + res.data.city
        );
      })
      .catch((err) => console.log(err));
  }, [headers, match.params.id]);

  return (
    <>
      <Title>Slot Confirm - AT8</Title>
      <div className="tournament-slot-confirm">
        {isLoaded ? (
          <div className="slot-confirm-page">
            <h2>Hi {username},</h2>
            {error ? (
              <div className="alert alert-danger text-center">
                <strong>Oh snap!</strong> Try reloading the page and try again. <br />
                If still doesn't work then try contacting us on our discord
                server.
              </div>
            ) : (
              <>
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
                    <h4>Your player is successfully confirmed</h4>
                    <p>
                      Now you can continue to the website{" "}
                      <Link to="/">AT8</Link>
                    </p>
                  </>
                )}
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
