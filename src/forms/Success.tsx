import React from "react";
import useEntries from "../hooks/useEntries";

interface SuccessProps {}

const Success: React.FC<SuccessProps> = () => {
  const entry = useEntries();
  console.log(entry)
  return (
    <>
      <div className="success-page">
        <div className="container bill pt-3 text-white">
          <div className="content">
            <h2 className="payment-heading">
              <b>Payment Bill</b>
            </h2>
            <div className="payment-details">
              <div className="left-side">
                <div className="heading">Bill To</div>
                <div className="bill-body">
                  <p>Team: </p>
                  <p>Captain: </p>
                  <p>Email: </p>
                  <h3 style={{ textAlign: "right" }}>Fees: Rs.500</h3>
                </div>
              </div>
            </div>
            <small>Upper details are also sent to you by mail</small>
          </div>
        </div>
        <div className="success">
          <h3>
            Your application is submitted successfully{" "}
            <svg
              width="58"
              height="51"
              viewBox="0 0 58 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="29" cy="25.5" rx="29" ry="25.5" fill="#3EBA68" />
              <path
                d="M26.3373 38.4325L14.4883 26"
                stroke="white"
                stroke-width="4"
              />
              <path d="M24 38L47 16" stroke="white" stroke-width="4" />
            </svg>
          </h3>
          <h5>
            Once we will verify your transaction your status will be updated.
          </h5>
        </div>
      </div>
    </>
  );
};

export default Success;
