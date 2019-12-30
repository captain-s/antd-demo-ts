import React, { createContext, ReactNode, useReducer } from 'react';

const initstate:number = 0;
const reduer = (state:number,action:string) => {
    switch (action) {
      case 'increment' : 
        return state + 1;
      case 'decrement' : 
        return state - 1;
      case 'reset' : 
        return 0;
      default:
        throw new Error();
    }
}

interface Injected {
  counter: number,
  increment: () => any,
  decrement: () => any,
  reset: () => any
}
export const context = createContext<Injected>({} as Injected);

interface Props {
  children?: ReactNode
}

export function CounterProvider ({ children }: Props) {
    const [counter,dispatch] = useReducer(reduer,initstate)
    const value = {
      counter,
      increment: () => dispatch('increment'),
      decrement: () => dispatch('decrement'),
      reset: () => dispatch('reset')
    }

    return (
      <context.Provider value={value} > {children} </context.Provider>
    )
}