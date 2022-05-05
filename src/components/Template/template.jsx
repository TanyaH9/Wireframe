import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./template.module.css"
import { getItem, setItem } from "../LocalStorage/localStorage"


export const Template = () => {
    const [inputText, setInputText] = useState()
    const nav = useNavigate()
    const templateTitle = useSelector((state) => {
        return state.templateTitleReducer.title
      })

    const pageIndex = useSelector((state) => {
        return state.pageIndexReducer.index
    })

    const changeText = (e) => {
        setItem(templateTitle, e.target.value)
        setInputText(e.target.value)
    }

    useEffect(() => {
        setInputText(getItem(templateTitle))
    }, [])

    const closeTemplate = () => {
        nav(`/page/${pageIndex}`)
    }

    return (
        <div className={style.templateWrapper}>
            <div className={style.subtitleWrapper}>
                <div className={style.subtitle}>You're editing a template.</div>
                <div className={style.close} onClick={closeTemplate}>X</div>
            </div>
            <div className={style.title}>{templateTitle}</div>
            <div className={style.line}></div>
            <div className={style.text}>
                <textarea value={inputText} className={style.textArea} onChange={changeText} />
            </div>
        </div>
    )
}