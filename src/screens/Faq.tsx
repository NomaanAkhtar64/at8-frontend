import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import useFAQ from '../hooks/useFaq'
import art from '../assets/at8_art.jpg'
import './Faq.scss'

interface FAQListBoxProps {
  faq: FAQ
}
const FAQListBox: React.FC<FAQListBoxProps> = ({ faq }) => {
  console.log(faq)
  const { images, name, description, slug } = faq
  return (
    <div className='faq-list-box'>
      <div className='faq-lb-content'>
        <div>
          <Link to={'/faq/' + slug} className='faq-lb-title'>
            {name}
          </Link>
        </div>
        <div className='faq-body'>
          <div className='faq-image'>
            <img
              src={
                art
                // images[0].image
              }
              alt=''
            />
          </div>
          <div>
            <div className='faq-lb-description'>{description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface FAQProps extends RouteComponentProps {}
const FAQ: React.FC<FAQProps> = ({}) => {
  const FAQs = useFAQ()
  return (
    <div className='faq-list-container'>
      {FAQs.state.map((fq, i) => (
        <FAQListBox key={i} faq={fq} />
      ))}
    </div>
  )
}

export default FAQ
