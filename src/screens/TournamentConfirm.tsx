import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";

import { __API_URL__ } from "../const";
import useHeaders from "../hooks/useHeaders";
import "./TournamentConfirm.scss";

interface TournamentConfirmProps extends RouteComponentProps<{ id }> {}

const TournamentConfirm: React.FC<TournamentConfirmProps> = ({ match }) => {
  const headers = useHeaders();
  const confirm = () => {
    axios
      .put(
        `${__API_URL__}/api/players/?id=${match.params.id}`,
        { headers }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className="tournament-slot-confirm">
        <div className="slot-confirm-page">
          <h3>Click on the button to confirm your slot</h3>
          <button className="btn btn-success" onClick={confirm}>Confirm</button>
        </div>
      </div>
    </>
  );
};

export default TournamentConfirm;
