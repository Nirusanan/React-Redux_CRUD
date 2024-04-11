import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    tasksList: [],
    selectedTask: {},
    isLoading: false,
    error: '',
}

const BASE_URL = 'http://localhost:8000/tasks'

//GET
export const getTasksFromServer = createAsyncThunk(
    "tasks/getTasksFromServer",
    async (_, {rejectWithValue}) =>{
        const response = await fetch(BASE_URL)
        if (response.ok){
            const jsonResponse = await response.json() 
            return jsonResponse
        } else {
            return rejectWithValue({error:'No Tasks Found'})
        }
    }
)

//POST
export const addTasksToServer = createAsyncThunk(
    "tasks/addTasksToServer",
    async (task, {rejectWithValue}) =>{
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL, options)
        if (response.ok){
            const jsonResponse = await response.json() 
            return jsonResponse
        } else {
            return rejectWithValue({error:'Task Not Added'})
        }
    }
)

const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        addTaskToList:(state, action) =>{
            const id = Math.round(Math.random() * 100)
            console.log(id);
            let task = {...action.payload, id};
            state.tasksList.push(task);
        },

        removeTaskFromList:(state,action) => {
            state.tasksList = state.tasksList.filter((task) => task.id !== action.payload.id)
        },

        updateTaskInList:(state,action) => {
            state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
        },

        setSelectedTask:(state,action) => {
            state.selectedTask = action.payload
        }
    },
    extraReducers:(builder) =>{
        builder
            .addCase(getTasksFromServer.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(getTasksFromServer.fulfilled, (state, action) =>{
                state.isLoading = false
                state.error= ''
                state.tasksList = action.payload
            })
            .addCase(getTasksFromServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.tasksList = []
            })
            .addCase(addTasksToServer.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(addTasksToServer.fulfilled, (state, action) =>{
                state.isLoading = false
                state.error= ''
                state.tasksList.push(action.payload)
            })
            .addCase(addTasksToServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
    }

})
export const {addTaskToList, removeTaskFromList, updateTaskInList, setSelectedTask} = tasksSlice.actions
export default tasksSlice.reducer