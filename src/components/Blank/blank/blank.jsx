import React from "react"
import style from "./blank.module.css"

export const Blank = (props) => {
    const { children } = props
    return (
        <div className={style.mainTemplate}>
            {children}
        </div>
    )
}