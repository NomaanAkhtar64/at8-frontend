import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import supportForm from "../hooks/supportForm";
import useFAQ from "../hooks/useFAQ";
import "./FAQ.scss";
import "./FAQArticle.scss";
import Title from "../components/Title";

interface FAQListBoxProps {
  faq: FAQ;
}
const FAQListBox: React.FC<FAQListBoxProps> = ({ faq }) => {
  const { images, name, description, slug } = faq;
  return (
    <>
      <div className="faq-list-box">
        <Title>FAQs - AT8</Title>
        <div className="faq-lb-content">
          <div>
            <Link to={"/faq/" + slug} className="faq-lb-title">
              {name}
            </Link>
          </div>
          <div className="faq-body">
            <div className="faq-image">
              <img src={images.length > 0 ? images[0].image : ""} alt="" />
            </div>
            <div>
              <div className="faq-lb-description">{parse(description)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface FAQProps extends RouteComponentProps {}
const FAQ: React.FC<FAQProps> = () => {
  const [request, setRequest] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const FAQs = useFAQ();
  useEffect(() => {
    document.title = "FAQ - AT8";
  }, []);

  return (
    <>
      <div className="faq-list-container">
        {FAQs.state.map((fq, i) => (
          <FAQListBox key={i} faq={fq} />
        ))}
      </div>
      <div className="support">
        {request ? (
          <div className="request-form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                supportForm(email, firstName, lastName, issue);
                setRequest(false);
                setEmail("");
                setFirstName("");
                setLastName("");
                setIssue("");
              }}
            >
              <legend>Support request form</legend>
              <div className="form-name">
                <div className="form-group" style={{ width: "45%" }}>
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group" style={{ width: "45%" }}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@abc.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Issue</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  placeholder="State your issue descriptively"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setRequest(false);
                  setEmail("");
                  setFirstName("");
                  setLastName("");
                  setIssue("");
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-outline-primary btn-lg"
            onClick={() => setRequest(true)}
          >
            Submit a request?
          </button>
        )}
      </div>
    </>
  );
};

export default FAQ;
