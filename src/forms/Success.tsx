import React from "react";
import { Link } from "react-router-dom";

interface SuccessProps {
  tournamentFee: number;
}

const Success: React.FC<SuccessProps> = ({ tournamentFee }) => {
  return (
    <div className="success-page">
      {tournamentFee !== 0 ? (
        <div className="success">
          <h3>Your application is awaiting verification</h3>
          <h6>
            Verify your payment transaction to complete your application.{" "}
            <Link to="/profile/entries">Verify</Link>
          </h6>
        </div>
      ) : (
        <div className="success">
          <h3>Your application is submitted successfully</h3>
          <h6>
            You can see your tournament entry{" "}
            <Link to="/profile/entries">here</Link>
          </h6>
        </div>
      )}
    </div>
  );
};

export default Success;
