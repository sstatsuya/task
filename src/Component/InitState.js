import { useContext } from "react"
import { Context } from "./Provider"

const InitState = JSON.parse(localStorage.getItem('task')) || {
    isShowAdding: false,
    isShowEditing: false,
    jobEditId: null,
    levelInput: 'normal',
    jobInput: '',
    searchInput: '',
    filterLevel: '',
    filterDone: "",
    isFilter: false,
    jobsTemp: [],
    jobs: [
        {
            id: 0,
            name: 'Ăn cơm',
            level: 'easy',
            done: "done"
        },
        {
            id: 1,
            name: 'Đi học',
            level: 'normal',
            done: "undone"
        },
        {
            id: 2,
            name: 'Làm bài tập',
            level: 'hard',
            done: "done"
        }
    ]
}

export default InitState

export const setLocalData = (state) =>{
    localStorage.setItem('task', JSON.stringify(state))
}