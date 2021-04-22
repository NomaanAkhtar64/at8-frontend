import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import useFAQ from "../hooks/useFAQ";
import parse from "html-react-parser";
import "./FAQ.scss";
import Title from "../components/Title";

interface FAQListBoxProps {
  faq: FAQ;
}
const FAQListBox: React.FC<FAQListBoxProps> = ({ faq }) => {
  const { images, name, description, slug } = faq;
  return (
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
  );
};

interface FAQProps extends RouteComponentProps {}
const FAQ: React.FC<FAQProps> = () => {
  const FAQs = useFAQ();
  useEffect(() => {
    document.title = "FAQ - AT8";
  }, []);

  return (
    <div className="faq-list-container">
      {FAQs.state.map((fq, i) => (
        <FAQListBox key={i} faq={fq} />
      ))}
    </div>
  );
};

export default FAQ;
