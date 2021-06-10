import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

const useQueryString = ({ key }) => {
  const [controlsEnabled, setControlsEnabled] = useState(false)
  const { query, push } = useRouter()

  useEffect(() => {
    const hascontrolsEnabled = Object.keys(query).some((i) => i === key)
    if (!hascontrolsEnabled) {
      setControlsEnabled(false)
      return
    }

    const shouldHide = query[key] === 'false'
    if (shouldHide) {
      setControlsEnabled(false)
      return
    }

    setControlsEnabled(true)
  }, [query, key])

  const hideControls = useCallback(() => {
    push('.', '.', { shallow: false })
  }, [push])

  return [controlsEnabled, hideControls]
}

export default useQueryString
