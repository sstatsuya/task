export const toggleAdding = (payload) =>{
    return{
        type: 'toggle-adding',
        payload
    }
}

export const toggleEditing = (payload) =>{
    return{
        type: 'toggle-editing',
        payload
    }
}

export const setJobInput = (payload) =>{
    return {
        type: 'set-job-input',
        payload
    }
}

export const setLevelInput = (payload) =>{
    return {
        type: 'set-level-input',
        payload
    }
}

export const addJob = (payload) =>{
    return {
        type: 'add-job',
        payload
    }
}

export const deleteJob = (payload) =>{
    return {
        type: 'delete-job',
        payload
    }
}

export const setJobEdit = (payload) =>{
    return {
        type: 'set-job-edit',
        payload
    }
}

export const editJob = (payload) =>{
    return {
        type: 'edit-job',
        payload
    }
}

export const setSearchInput = (payload) =>{
    return {
        type: 'set-search-input',
        payload
    }
}

export const setFilterLevel = (payload) =>{
    return {
        type: 'set-filter-level',
        payload
    }
}


export const setDone = (payload) =>{
    return {
        type: 'set-done',
        payload
    }
}

export const setFilterDone = (payload) =>{
    return {
        type: 'set-filter-done',
        payload
    }
}