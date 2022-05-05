import React from "react"
import style from "./addColumn.module.css"
import addIcon from "../../../pics/add.png"


export const Add = (props) => {
    const { addField, addPage } = props
    return (
        <div className={style.addPageWrapper}>
            <img src={addIcon} alt="+" className={style.addPageBtn} width="38px" height="38px" onClick={addPage}/>
            <p className={style.addPageP}>{addField}</p>
        </div>
    )
} 