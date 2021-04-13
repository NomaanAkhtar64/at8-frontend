import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { __API_URL__ } from '../const'

export default function useFAQ(slug: string | null = null) {
  const cachedFAQ = useMemo(() => !slug && localStorage.getItem('faqs'), [slug])
  const [state, setState] = useState<FAQ[]>(
    cachedFAQ ? JSON.parse(cachedFAQ) : []
  )
  const [hasLoaded, setHasLoaded] = useState(cachedFAQ ? true : false)

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source()
    axios
      .get(`${__API_URL__}/api/faq/${slug ? '?slug=' + slug : ''}`, {
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        setState(res.data)
        if (!slug) {
          localStorage.setItem('faqs', JSON.stringify(res.data))
        }
        setHasLoaded(true)
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.log(err)
        }
      })
    return () => {
      cancelHandler.cancel()
    }
  }, [slug])

  return { state, hasLoaded }
}
