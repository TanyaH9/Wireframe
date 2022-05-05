import React from "react";
import style from "./pageColumn.module.css"
import deleteIcon from "../../../pics/delete.png"
import pageIcon from "../../../pics/page.png"

export const PageColumn = (props) => {
    const {title, index, deleteSession, navigateToPage } = props

    return (
        <div className={style.pageWrapper}>
            <div className={style.pageName} onClick={navigateToPage}>
                <img src={pageIcon} alt="page icon" width="38px" height="38px" />
                <p className={style.name}>{title}</p>
            </div>
            <div className={style.deletePage}>
            <img onClick={() => deleteSession(index)} src={deleteIcon} alt="delete icon" className={style.deleteBtn} width="15px" height="16.5px" />
            </div>
        </div>
    )
}