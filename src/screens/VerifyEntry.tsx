import React, { FormEvent, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import Loading from '../components/Loading'
import { checkEntryVerify } from '../errors/check/entry'
import { useEntry, editEntry } from '../hooks/entry'
import imgToBase64 from '../utils/imgToBase64'
import './VerifyEntry.scss'

const VerifyEntry: React.FC<RouteComponentProps<{ id: string }>> = ({
  match,
  history,
}) => {
  const [error, setError] = useState('')
  const [selectValue, setSelectValue] = useState('')

  const [isDisabled, setDisable] = useState(false)
  const entry = useEntry(match.params.id)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [image, setImage] = useState<File>(null)
  const [imageB64, setimageB64] = useState<string>(null)

  useEffect(() => {
    if (entry.hasLoaded) {
      if (entry.state) {
        if (entry.state.date_transaction) setDate(entry.state.date_transaction)
        if (entry.state.time_transaction) setTime(entry.state.date_transaction)
        if (entry.state.image_proof) setimageB64(entry.state.image_proof)
      }
    }
  }, [entry])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setDisable(true)

    let imgBase64: string
    if (image) {
      imgBase64 = await imgToBase64(image)
    } else {
      imgBase64 = null
    }

    let values: Partial<Entry> = {
      image_proof: imgBase64,
      date_transaction: date,
      time_transaction: time,
    }

    let { isValid, message } = checkEntryVerify(values, selectValue)

    if (isValid) {
      await editEntry(entry.state.id, values)
      setDisable(false)

      history.push('/profile/entries')
    } else {
      setError(message)
      setDisable(false)
    }
  }

  if (entry.hasLoaded) {
    if (entry.state) {
      return (
        <div className='verify-form-container container'>
          <form className='verify-form' onSubmit={onSubmit}>
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
                    Select the date and time when you transacted the payment.
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
                    onChange={(e) => {
                      setTime(e.target.value)
                      console.log(e.target.value)
                    }}
                    disabled={isDisabled}
                    required
                  />
                </div>
                <p style={{ color: 'red' }}>{error}</p>
                <button type='submit' className='btn btn-success'>
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
                      {image ? (
                        <p>{image['name']}</p>
                      ) : imageB64 ? (
                        imageB64
                      ) : (
                        'Choose file'
                      )}
                    </label>
                  </div>
                </div>
                <p style={{ color: 'red' }}>{error}</p>
                <button type='submit' className='btn btn-success'>
                  Enter
                </button>
              </div>
            )}
          </form>
        </div>
      )
    }
    return (
      <div className='entry-verify-error'>
        <span>No Entry Found</span>
      </div>
    )
  }
  return <Loading />
}

export default VerifyEntry
