export const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const setItem = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

export const columnInfo = (item) => { 
    return {
        title: item.title,
        month: item.month,
        day: item.day
    }
}