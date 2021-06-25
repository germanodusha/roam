import { useState, useEffect } from 'react'

const useDesappearState = ({
  stateToPersist,
  appearOnMs = 50,
  desappearOnMs = 550,
}) => {
  const [show, setShow] = useState(false)
  const [state, setState] = useState(false)

  useEffect(() => {
    if (stateToPersist) {
      setState(stateToPersist)
      const timeoutShow = setTimeout(() => {
        setShow(true)
      }, appearOnMs)
      return () => clearTimeout(timeoutShow)
    } else {
      setShow(false)
      const timeoutHide = setTimeout(() => {
        setState(false)
      }, desappearOnMs)
      return () => clearTimeout(timeoutHide)
    }
  }, [stateToPersist, appearOnMs, desappearOnMs])

  return [state, show]
}

export default useDesappearState
