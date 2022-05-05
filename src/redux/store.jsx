import { combineReducers, createStore } from "redux"

const pageIndexState = { index: ""}
const templateTitle = {title: ""}
const pageIndexReducer = (state = pageIndexState, action) => {
    if (action.type === "setIndex"){
        return ({
            ...state, 
            index: action.payload
        })
    }
    return state
}

const templateTitleReducer = (state = templateTitle, action) => {
    if (action.type === "setTemplateTitle"){
        return ({
            ...state, 
            title: action.payload
        })
    }
    return state
}
export const store = createStore(combineReducers({
    pageIndexReducer,
    templateTitleReducer
}))


