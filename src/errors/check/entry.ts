export const checkEntryVerify = (data: Partial<Entry>, selected: string) => {
  let isValid = true
  let message = ''
  const setError = (err: string) => {
    isValid = false
    message = err
  }

  if (selected === 'text') {
    if (!data.date_transaction || !data.time_transaction) {
      setError('Please Enter the date and time')
    }
  }
  else if (selected === 'image') {
    if (!data.image_proof) {
      setError('Please Upload An Image')
    }
  }
  return { isValid, message }
}
