import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice'

const Counter = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch();

  return (
    <>
     <h2>Counter {count}</h2>
      <button onClick={() => dispatch(increment())}>Increase (+) </button>
      <button  onClick={() => dispatch(decrement())}>Decrease (-)</button>
      <button  onClick={() => dispatch(incrementByAmount(22))}>incrementByAmount (-)</button>
    </>
  )
}

export default Counter