import parse from 'html-react-parser'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import checkCreateEntryData from '../errors/check/checkCreateEntryData'
import createEntry from '../hooks/createEntry'
import useSite from '../hooks/useSite'
import useTeam from '../hooks/useTeam'

interface PaymentProps {
  toSuccess: () => void
  teamId: number
  userId: number
  tournament: Tournament
}

const Payment: React.FC<PaymentProps> = ({
  toSuccess,
  teamId,
  userId,
  tournament,
}) => {
  const [entry, setEntry] = useState<Entry>(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const site = useSite()
  const team = useTeam(userId, teamId)
  useEffect(() => {
    if (!entry) {
      let values: Entry = {
        team: teamId,
        tournament: tournament.id,
        user: userId,
      }
      let { isValid } = checkCreateEntryData(values)
      if (isValid) {
        createEntry(values).then((en) => {
          if (en) {
            setEntry(en)
            setHasLoaded(true)
          }
        })
      }
    }
  }, [teamId, tournament, userId, entry])

  if (hasLoaded && team.hasLoaded)
    return (
      // <>
      // <div className='payment-page text-white'>
      //     <div className='payment'>
      //       <div className='details'>
      //         <div className=''>
      //           <h3>Details of Transaction</h3>
      //           <div>{parse(site.payement_details)}</div>
      //         </div>
      //       </div>

      //       <div className='verify'>
      //         <div className='row'>
      //           <h1>Entry No</h1>
      //           <h2 className='ml-auto'>#{entry.entry_id}</h2>
      //         </div>
      //         {tournament.hasFee && (
      //           <div className='row'>
      //             <h1>Total Cost</h1>
      //             <h2>{tournament.fee}</h2>
      //           </div>
      //         )}
      //         <div className='row'>
      //           <h1>Payment Status</h1>
      //           <h2 className='ml-auto'>
      //             {entry.has_paid ? 'Paid' : 'Unpaid'}
      //           </h2>
      //         </div>
      //       </div>
      //     </div>
      //     <button
      //       type='button'
      //       className='btn btn-success'
      //       onClick={() => toSuccess()}
      //     >
      //       Confirm
      //     </button>
      //   </div>
      // </>
      <div className='payment-page text-white register'>
        <div className='register-form'>
          <div className='container bill pt-3'>
            <div className='content'>
              <h2 className='payment-heading'>
                <b>Payment Bill</b>
              </h2>
              <div className='payment-details'>
                <div className='left-side'>
                  <div className='heading'>Bill To</div>
                  <div className='bill-body'>
                    <div className='row'>
                      <div className='col-6'>Entry No.: </div>
                      <div className='col-6'>#{entry.entry_id}</div>
                    </div>
                    <div className='row'>
                      <div className='col-6'>Team:</div>
                      <div className='col-6'>{team.state.name}</div>
                    </div>
                    <div className='row'>
                      <div className='col-6'>Tournament: </div>
                      <div className='col-6'>{tournament.name}</div>
                    </div>
                    {tournament.hasFee && (
                      <h3 style={{ textAlign: 'right' }}>
                        Fees: ${tournament.fee}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              type='button'
              style={{ width: '100%', margin: '20px 0px' }}
              className='display-block btn btn-success'
              onClick={() => toSuccess()}
            >
              Confirm
            </button>
          </div>
          <div className='hint'>
            <h1>Help Text</h1>
            <div>{parse(site.payement_details)}</div>
          </div>
        </div>
      </div>
    )
  return <Loading />
}

export default Payment
