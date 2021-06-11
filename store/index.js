import create from 'zustand'
import produce, { original } from 'immer'

export const useStore = create((set) => {
  const setState = (fn) => set(produce(fn))

  const initialState = { }

  return initialState
})
