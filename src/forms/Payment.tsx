import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import checkCreateEntryData from '../errors/check/checkCreateEntryData'
import createEntry from '../hooks/createEntry'
import useSite from '../hooks/useSite'

interface PaymentProps {
  toSuccess: () => void
  teamId: number
  userId: number
  tournament: TournamentRegister['tournament']
}

const Payment: React.FC<PaymentProps> = ({
  toSuccess,
  teamId,
  userId,
  tournament,
}) => {
  const [error, setError] = useState('')
  const [entry, setEntry] = useState<Entry>(null)
  const site = useSite()
  useEffect(() => {
    const fn = async () => {
      if (!entry) {
        let values: Entry = {
          team: teamId,
          tournament: tournament.id,
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
  }, [teamId, tournament, userId, entry])
  if (entry && entry.entry_id && entry.has_paid)
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
              <div className='row'>
                <h1>Entry No</h1>
                <h2 className='ml-auto'>#{entry.entry_id}</h2>
              </div>
              {tournament.hasFee && (
                <div className='row'>
                  <h1>Total Cost</h1>
                  <h2>{tournament.price}</h2>
                </div>
              )}
              <div className='row'>
                <h1>Payment Status</h1>
                <h2 className='ml-auto'>
                  {entry.has_paid ? 'Paid' : 'Unpaid'}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  return <Loading />
}

export default Payment
