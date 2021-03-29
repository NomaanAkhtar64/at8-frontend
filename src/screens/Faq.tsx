import parse from "html-react-parser";
import React, { useState } from "react";

import Loading from "../components/Loading";
import useFaq from "../hooks/useFaq";
import "./Faq.scss";

interface FaqProps {}

const Faq: React.FC<FaqProps> = () => {
    const [request, setRequest] = useState(false);
    const faqs = useFaq();
    console.log(faqs);
    return (
        <>
            <div className="main-faq">
                {faqs.hasLoaded ? (
                    <div className="faq-page">
                        {faqs.state.map((faq, i) => (
                            <div key={i} className="faq">
                                {console.log(faq.details)}
                                <h2 className="faq-name">{faq.name}</h2>
                                {parse(`<p>${faq.details}</p>`)}

                                <hr />
                                <div className="faq-steps">
                                    {faq.images.map((step, i) => (
                                        <div key={i} className="step">
                                            {parse(`<h6>${step.caption}</h6>`)}
                                            <img
                                                src={step.image}
                                                alt="Thread Image"
                                                width="100%"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Loading />
                )}

                <div className="support">
                    {request ? (
                        <div className="request-form">
                            <form>
                                <legend>Support request form</legend>
                                <div className="form-name">
                                    <div className="form-group" style={{width: "45%"}}>
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="form-group" style={{width: "45%"}}>
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>
                                        State your issue descriptively
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => setRequest(true)}
                        >
                            Submit a request?
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Faq;
