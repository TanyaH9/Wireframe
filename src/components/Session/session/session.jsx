import React, { useEffect, useState } from "react";
import style from "./session.module.css"
import { SessionColumn } from "../sessionColumn/sessionColumn";
import { Blank } from "../../Blank/blank/blank";
import { SessionInput } from "../../Blank/input/input";
import { Add } from "../../Blank/addColumn/addColumn";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { getItem, setItem, columnInfo } from "../../LocalStorage/localStorage"

export const Session = () => {

    const month = new Date().toLocaleString('default', { month: 'short' })
    const day = new Date().getDate()
    const [sessions, setSessions] = useState([])
    const [title, setTitle] = useState()
    const [searchValue, setSearchValue] = useState()
    const [filteredSessions, setFilteredSessions] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        !localStorage.getItem("sessions") ? 
        setItem("sessions",[]) :
        setSessions(getItem("sessions").map((item) => {
            return columnInfo(item)
        }))
    }, [])

    const changeSessionName = (e) => {
        setTitle(e.target.value)
    }

    const addPage = () => {
        if (title) {
            let isUniqe = true
            for (let i = 0; i < sessions.length; i++){
                if (sessions[i].title === title){
                    isUniqe = false
                }
            }
            if (!isUniqe){
                alert("This session already exists!")
                setTitle("")
                isUniqe = true
            }else {
                const storageData = getItem("sessions")
                storageData.push({title: title, month: month, day: day})
                setItem("sessions", storageData)
                setSessions(storageData.map((item) => {
                    return columnInfo(item)
                }))
                setItem(title, [])
                setTitle("")
            }
        }else {
            alert("This field can't be empty.")
        }
    }

    const deleteSession = (index) => {
        const storageData = getItem("sessions").filter((item) => {
            return index.title !== item.title
        }).map((item) => {
             return columnInfo(item)
        });
        setItem("sessions",storageData)
        setSessions(storageData.map((item) => {
            return columnInfo(item)
        }))
        getItem(index.title).map((item) => {
            return localStorage.removeItem(item)
        })
        localStorage.removeItem(index.title)
    }

    const dispatch = useDispatch()
    const navigateToPage = (item) => {
        dispatch({
            type: "setIndex",
            payload: item.title
        })
        nav(`/page/${item.title}`)
    }

    const searchSession = (e) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        if (searchValue){
            const filtered = sessions.filter((item) => {
                return item.title.includes(searchValue)
            })
            setFilteredSessions(filtered)  
        }else {
            setFilteredSessions("")  
        }
    }, [searchValue])

    
    return (
        <Blank>
           <SessionInput placeholder="SESSION NOTES" title={title} changeSessionName={changeSessionName} />
           <div className={style.line}></div>
           <input value={searchValue} placeholder="Search" className={style.searchBar} onChange={searchSession} />
            {filteredSessions !== "" ? filteredSessions.map((item, index) => {
                return <SessionColumn deleteSession={() => deleteSession(item)} navigateToPage={() => navigateToPage(item)} index={index} title={item.title} month={item.month ? item.month : month} day={item.day ? item.day : day} key={index}/>
            }) : sessions.map((item, index) => {
                return <SessionColumn deleteSession={() => deleteSession(item)} navigateToPage={() => navigateToPage(item)} index={index} title={item.title} month={item.month ? item.month : month} day={item.day ? item.day : day} key={index}/>
            })}
            <Add addField="Add session" addPage={addPage} />
        </Blank>
    )
}

