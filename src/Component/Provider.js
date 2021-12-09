import InitState from "./InitState";
import reducer from './reducer'
import { createContext, useReducer } from "react";

export const Context = createContext()
function Provider({children}){
    const [state, dispatch] = useReducer(reducer, InitState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider