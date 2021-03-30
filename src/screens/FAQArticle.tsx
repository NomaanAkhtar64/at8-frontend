import parse from 'html-react-parser'
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'

import Loading from '../components/Loading'
import supportForm from '../hooks/supportForm'
import useFAQ from '../hooks/useFaq'
import useProfile from '../hooks/useProfile'
import './FAQArticle.scss'

interface FAQArticleProps extends RouteComponentProps<{ slug: string }> {}

const FAQArticle: React.FC<FAQArticleProps> = ({ match }) => {
  const [request, setRequest] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [issue, setIssue] = useState('')
  const { slug } = match.params
  const FAQs = useFAQ(slug)
  const FAQ = FAQs.state[0]
  const profile = useProfile()

  if (FAQs.hasLoaded) {
    return (
      <>
        <div className='main-faq'>
          <div className='faq-page'>
            <div className='faq'>
              <h2 className='faq-name'>{FAQ.name}</h2>
              {parse(`<p>${FAQ.details}</p>`)}

              <hr />
              <div className='faq-steps'>
                {FAQ.images.map((step, i) => (
                  <div key={i} className='step'>
                    {parse(`<h6>${step.caption}</h6>`)}
                    <img src={step.image} alt='Thread' width='100%' />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='support'>
            {request ? (
              <div className='request-form'>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    supportForm(
                      profile.profile.user,
                      firstName,
                      lastName,
                      issue
                    )
                  }}
                >
                  <legend>Support request form</legend>
                  <div className='form-name'>
                    <div className='form-group' style={{ width: '45%' }}>
                      <label>First Name</label>
                      <input
                        type='text'
                        className='form-control'
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className='form-group' style={{ width: '45%' }}>
                      <label>Last Name</label>
                      <input
                        type='text'
                        className='form-control'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='form-group'>
                    <label>State your issue descriptively</label>
                    <input
                      type='text'
                      className='form-control'
                      required
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                    />
                  </div>
                  <button type='submit' className='btn btn-success'>
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <button
                type='button'
                className='btn btn-outline-primary btn-lg'
                onClick={() => setRequest(true)}
              >
                Submit a request?
              </button>
            )}
          </div>
        </div>
      </>
    )
  }
  return <Loading />
}

export default FAQArticle
