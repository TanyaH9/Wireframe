import React from "react";
import style from "./sessionColumn.module.css"
import deleteIcon from "../../../pics/delete.png"
import sessionIcon from "../../../pics/session.png"

export const SessionColumn = (props) => {
    const {title, month, day, index, deleteSession, navigateToPage } = props
    return (
        <div className={style.sessionWrapper} >
            <div className={style.sessionName} onClick={navigateToPage}>
                <img src={sessionIcon} alt="paper icon" width="38px" height="38px" />
                <p className={style.name}>{title}</p>
            </div>
            <div className={style.deleteSession}>
                <p className={style.date}>{month} {day}</p>
                <img onClick={() => deleteSession(index)} src={deleteIcon} alt="delete icon" className={style.deleteBtn} width="15px" height="16.5px" />
            </div>
        </div>
    )
}