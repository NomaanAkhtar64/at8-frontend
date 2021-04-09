import React from "react";
import parse from "html-react-parser";

import "./Bill.scss";
import useEntries from "../hooks/useEntries";

interface BillProps {}

const Bill: React.FC<BillProps> = () => {
  const entry = useEntries();
  return (
    <div className="bill-page">
      <div className="container bill pt-3">
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
                <h3 style={{textAlign: "right"}}>Fees: Rs.500</h3>
              </div>
            </div>
          </div>
          <small>Upper details are also sent to you by mail</small>
        </div>
      </div>
    </div>
  );
};

export default Bill;
