import React, { useEffect, useState } from "react";
import style from "./page.module.css"
import { Blank } from "../../Blank/blank/blank";
import { SessionInput } from "../../Blank/input/input";
import { Add } from "../../Blank/addColumn/addColumn";
import { useDispatch, useSelector } from "react-redux";
import { PageColumn } from "../pageColumn/pageColumn";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../../LocalStorage/localStorage"
import arrow from "../../../pics/arrow.png"


export const Page = () => {

    const [pages, setPages] = useState([])
    const [title, setTitle] = useState()
    const nav = useNavigate()

    const pageIndex = useSelector((state) => {
        return state.pageIndexReducer.index
    })
      
    useEffect(() => {
        setPages(getItem(pageIndex))
    }, [])
    
    const changeSessionName = (e) => {
        setTitle(e.target.value)
    }

    const addPage = () => {
        if (title){
            if (pages.includes(title)){
                alert("This page already exists!")
                setTitle("")
            }else {
                const storageData = JSON.parse(localStorage.getItem(pageIndex))
                storageData.push(title)
                setItem(pageIndex, storageData)
                setPages(storageData.map((item) => {
                    return item
                }))
                setItem(title, "")
                setTitle("")
            }
        }
    }

    const deleteSession = (index) => {
        const storageData = getItem(pageIndex).filter((item) => {
            return index !== item
        })
        setItem(pageIndex, storageData)
        setPages(storageData)
        localStorage.removeItem(index)
    }

    const dispatch = useDispatch()

    const navigateToPage = (item) => {
        dispatch({
            type: "setTemplateTitle",
            payload: item
        })
        nav(`/template/${item}`)
    }
    
    const backTopages = () => {
        nav("/")
    }
    
    return (
        <Blank>
            <button className={style.backWrapper} onClick={backTopages}>
                <div className={style.backBtn}>
                    <img src={arrow} width="20px" height="20px"/>
                    <div>Back to sessions</div>
                </div>
            </button>
            <SessionInput placeholder="ADD PAGE" title={title} changeSessionName={changeSessionName}/>
            <div className={style.line}></div>
            {pages.map((item, index) => {
                return <PageColumn deleteSession={() => deleteSession(item)} navigateToPage={() => navigateToPage(item)} index={index} title={item} />
            })}
            <Add addField="New template" addPage={addPage}/>
        </Blank>
    )
}