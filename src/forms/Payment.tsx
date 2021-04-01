import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import checkCreateEntryData from '../errors/check/checkCreateEntryData'
import createEntry from '../hooks/createEntry'
import useSite from '../hooks/useSite'

interface PaymentProps {
  toSuccess: () => void
  tournamentId: number
  teamId: number
  userId: number
}

const Payment: React.FC<PaymentProps> = ({
  toSuccess,
  teamId,
  tournamentId,
  userId,
}) => {
  // const [date, setDate] = useState(null)
  // const [time, setTime] = useState(null)
  // const [image, setImage] = useState<File>(null)
  // const [selectValue, setSelectValue] = useState('')
  // const [isDisabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [entry, setEntry] = useState<Entry>(null)

  const site = useSite()
  useEffect(() => {
    const fn = async () => {
      if (!entry) {
        let values: Entry = {
          team: teamId,
          tournament: tournamentId,
          user: userId,
        }
        let { isValid, message } = checkCreateEntryData(values)
        if (isValid) {
          const en = await createEntry(values)
          if (en) {
            setEntry(en)
          }
        } else {
          setError(message)
        }
      }
    }
    fn()
  }, [teamId, tournamentId, userId, entry])
  if (entry && entry.entry_id)
    return (
      <>
        <div className='payment-page text-white'>
          <div className='payment'>
            <div className='details'>
              <div className=''>
                <h3>Details of Transaction</h3>
                <p>{site.payement_details}</p>
              </div>
            </div>

            <div className='verify'>
              <div className='verify-form'>
                <h1>Bill</h1>
                <legend>Entry No. {entry.entry_id}</legend>
              </div>
              {/* {entry && entry.entry_id ? (
              <div className='verify-form'></div>
            ) : (
              <form
                className='verify-form'
                onSubmit={async (e) => {
                  e.preventDefault()
                  setDisable(true)
                  // const imgBase64 = await imgToBase64(image)
                  // const values: Entry = {
                  //   image_proof: imgBase64,
                  //   text_proof:
                  //     date && time ? `Date: ${date}\n Time: ${time}` : null,
                  //   team: teamId,
                  //   tournament: tournamentId,
                  //   user: userId,
                  // }
                  // let { isValid, message } = checkEntryData(values)
                  // if (isValid) {
                  //   const en = await enterTournament(values)
                  //   if (en) {
                  //     setEntry(en)
                  //   }
                  //   setDisable(true)
                  // } else {
                  //   setError(message)
                  //   setDisable(false)
                  // }
                }}
              >
                <legend>Upload any proof to verify your Verification.</legend>
                <select
                  className='form-select form-select-lg mb-3 payment-select'
                  aria-label='.form-select-lg example'
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setSelectValue(e.target.value)
                  }}
                  disabled={isDisabled}
                >
                  <option selected>Open this select menu</option>
                  <option value='text'>Date and Time of transaction</option>
                  <option value='image'>Image proof of transaction</option>
                </select>

                {selectValue === 'text' && (
                  <div className='form-group'>
                    <div className='form-group'>
                      <h4>
                        Select the date and time when you transacted the
                        payment.
                      </h4>
                      <label>Date</label>
                      <input
                        type='date'
                        className='form-control'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        disabled={isDisabled}
                      />
                      <label>Time</label>
                      <input
                        type='time'
                        className='form-control'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        disabled={isDisabled}
                        required
                      />
                    </div>
                    <p style={{ color: 'red' }}>{error}</p>
                    <button
                      type='button'
                      className='btn btn-success'
                      onClick={() => {
                        if (date !== '' && time !== '') {
                          toSuccess()
                        } else {
                          setError('Please enter values in fields')
                        }
                      }}
                    >
                      Enter
                    </button>
                  </div>
                )}
                {selectValue === 'image' && (
                  <div className='form-group'>
                    <div className='form-group'>
                      <label>Upload image file</label>
                      <div className='custom-file'>
                        <input
                          type='file'
                          accept='image/*'
                          className='custom-file-input'
                          id='inputGroupFile02'
                          required
                          onChange={(e) => {
                            setImage(e.target.files[0])
                          }}
                          disabled={isDisabled}
                        />
                        <label className='custom-file-label'>
                          {image['name'] ? (
                            <p>{image['name']}</p>
                          ) : (
                            'Choose file'
                          )}
                        </label>
                      </div>
                    </div>
                    <p style={{ color: 'red' }}>{error}</p>
                    <button
                      type='button'
                      className='btn btn-success'
                      onClick={() => {
                        if (image['name']) {
                          toSuccess()
                        } else {
                          setError('Please uplaod an image!')
                        }
                      }}
                    >
                      Enter
                    </button>
                  </div>
                )}
              </form>
            )} */}
            </div>
          </div>
        </div>
      </>
    )
  return <Loading />
}

export default Payment
