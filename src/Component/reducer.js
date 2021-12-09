import { setLocalData } from "./InitState"

function reducer(state, action){
    const filter = (job, searchInput, filterLevel, filterDone)=>{
        let jobNameRes = searchInput==="" || job.name.toLowerCase().includes(searchInput)
        let jobLevelRes = filterLevel==="" || job.level === filterLevel
        let jobDoneRes = filterDone === "" || job.done === filterDone
        return jobNameRes&&jobLevelRes&&jobDoneRes
    }
    let finalState
    switch(action.type){
        case 'toggle-adding':
            return{
                ...state,
                isShowAdding: action.payload,
                isShowEditing: action.payload?false:state.isShowEditing
            }
        case 'toggle-editing':
            return{
                ...state,
                isShowEditing: action.payload,
                isShowAdding: action.payload?false:state.isShowAdding
            }
        case 'set-job-input':
            return{
                ...state,
                jobInput: action.payload
            }
        case 'set-level-input':
            return{
                ...state,
                levelInput: action.payload
            }
        case 'add-job':
            let maxId = 0
            state.jobs.forEach((job)=>{
                if(job.id > maxId) maxId = job.id
            })
            finalState = {
                ...state,
                isFilter: false,
                searchInput: "",
                filterLevel: "",
                filterDone: "",
                jobInput: "",
                levelInput: "normal",
                jobs: [...state.jobs, {id: maxId+1, name: state.jobInput, level: state.levelInput, done: "undone"}]
            }
            setLocalData(finalState)
            return finalState
        case 'delete-job':
            let deletedJobs = state.jobs.filter(job=>{
                return Number(job.id) !== action.payload
            })
            let deletedTempJobs = state.jobsTemp.filter(job=>{
                return Number(job.id) !== action.payload
            })
            finalState = {
                ...state,
                jobs: [...deletedJobs],
                jobsTemp: [...deletedTempJobs]
            }
            setLocalData(finalState)
            return finalState
        case 'set-job-edit':
            return{
                ...state,
                jobEditId: action.payload
            }
        case 'edit-job':
            let editedJobs = [...state.jobs]
            editedJobs.forEach(job=>{
                if(job.id === state.jobEditId){
                    job.name = state.jobInput
                    job.level = state.levelInput
                    return
                }
            })
            finalState = {
                ...state,
                jobs: [...editedJobs]
            }
            setLocalData(finalState)
            return finalState
        case 'set-search-input':
            let filteredSearchJobs = []
            filteredSearchJobs = state.jobs.filter(job=>{
                return filter(job, action.payload, state.filterLevel, state.filterDone)
            })
            return{
                ...state,
                searchInput: action.payload,
                isFilter: action.payload !=="" || state.filterLevel !== "" || state.filterDone !== "" ?true:false,
                jobsTemp: [...filteredSearchJobs]
            }
        case 'set-filter-level':
            let filterLevelJobs = []
            filterLevelJobs = state.jobs.filter(job=>{
                return filter(job, state.searchInput, action.payload, state.filterDone)
            })
            return{
                ...state,
                isFilter: state.searchInput !=="" || action.payload !== "" || state.filterDone !== "" ?true:false,
                filterLevel: action.payload,
                jobsTemp: [...filterLevelJobs]
            }
        case 'set-done':
            let setDoneJobs = [...state.jobs]
            setDoneJobs.forEach(job=>{
                if(job.id === action.payload){
                    job.done = "done"
                    return
                }
            })
            let filteredJobs = []
            filteredJobs = setDoneJobs.filter(job=>{
                return filter(job, state.searchInput, state.filterLevel, state.filterDone)
            })
            finalState = {
                ...state,
                jobs: [...setDoneJobs],
                jobsTemp: [...filteredJobs]
            }
            setLocalData(finalState)
            return finalState
        case 'set-filter-done':
            let filterDoneJobs = []
            filterDoneJobs = state.jobs.filter(job=>{
                console.log(filter(job, state.searchInput, state.filterLevel, action.payload))
                return filter(job, state.searchInput, state.filterLevel, action.payload)
            })
            return{
                ...state,
                isFilter: state.searchInput !=="" || state.filterLevel !== "" || action.payload !== "" ?true:false,
                filterDone: action.payload,
                jobsTemp: [...filterDoneJobs]
            }
        
        default:
            throw new Error('Invalid action!!!')
    }
}

export default reducer