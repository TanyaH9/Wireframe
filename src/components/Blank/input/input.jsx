import React from "react"
import style from "./input.module.css"

export const SessionInput = (props) => {
    const { placeholder, title, changeSessionName} = props
    return (
        <input value={title} placeholder={placeholder} className={style.sessionInput} onChange={changeSessionName}/>
    )
} 