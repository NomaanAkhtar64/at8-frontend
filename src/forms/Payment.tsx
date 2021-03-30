import React, { useState } from "react";
import Loading from "../components/Loading";
import usePayment from "../hooks/usePayment";

interface PaymentProps {
    toSuccess: () => void;
}

const Payment: React.FC<PaymentProps> = ({ toSuccess }) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [image, setImage] = useState({});
    const [selectValue, setSelectValue] = useState("");
    const [error, setError] = useState("");

    const payment = usePayment();
    console.log(payment);
    return (
        <>
            <div className="payment-page text-white">
                <div className="payment">
                    {payment.hasLoaded ? (
                        <div className="details">
                            {payment.state.map((pay, i) => (
                                <div className="">
                                    <h3>Details of Transaction</h3>
                                    {/* <p>{pay.payment_details}</p> */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Loading />
                    )}

                    <div className="verify">
                        <form className="verify-form">
                            <legend>
                                Upload any proof to verify your Verification.
                            </legend>
                            <select
                                className="form-select form-select-lg mb-3 payment-select"
                                aria-label=".form-select-lg example"
                                style={{ width: "100%" }}
                                onChange={(e) => {
                                    setSelectValue(e.target.value);
                                }}
                            >
                                <option selected>Open this select menu</option>
                                <option value="text">
                                    Date and Time of transaction
                                </option>
                                <option value="image">
                                    Image proof of transaction
                                </option>
                            </select>

                            {selectValue === "text" && (
                                <div className="form-group">
                                    <div className="form-group">
                                        <h4>
                                            Select the date and time when you
                                            transacted the payment.
                                        </h4>
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={date}
                                            onChange={(e) =>
                                                setDate(e.target.value)
                                            }
                                            required
                                        />
                                        <label>Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            value={time}
                                            onChange={(e) =>
                                                setTime(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <p style={{ color: "red" }}>{error}</p>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => {
                                            if (date !== "" && time !== "") {
                                                toSuccess();
                                            } else {
                                                setError(
                                                    "Please enter values in fields"
                                                );
                                            }
                                        }}
                                    >
                                        Enter
                                    </button>
                                </div>
                            )}
                            {selectValue === "image" && (
                                <div className="form-group">
                                    <div className="form-group">
                                        <label>Upload image file</label>
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="custom-file-input"
                                                id="inputGroupFile02"
                                                required
                                                onChange={(e) => {
                                                    setImage(e.target.files[0]);
                                                }}
                                            />
                                            <label className="custom-file-label">
                                                {image["name"] ? (
                                                    <p>{image["name"]}</p>
                                                ) : (
                                                    "Choose file"
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                    <p style={{ color: "red" }}>{error}</p>
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => {
                                            if (image["name"]) {
                                                toSuccess();
                                            } else {
                                                setError(
                                                    "Please uplaod an image!"
                                                );
                                            }
                                        }}
                                    >
                                        Enter
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;
