import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
    isRoomCreated:false,
    isGameStarted:false,
    broadcastToEveryone:false,
    waitingTime:10,
    isWaitingTimerRunning:false,
    startRoomTest:false,
    username:''
}

const roomSlice = createSlice({
    name: 'room_Slice',
    initialState,
    reducers: {
        saveUser(state, action) {
            state.rooms=action.payload
        },
        removeUser(state,action){
            state.rooms=state.rooms.filter((name)=> name !== action.payload)
        },
        saveRoomCreationState(state,action){
            state.isRoomCreated=action.payload
        },
        saveGameState(state,action){
            state.isGameStarted=action.payload
        },
        broadcast(state,action){
            state.broadcastToEveryone=action.payload
        },
        saveWaitingTime(state,action){
            state.waitingTime=action.payload
        },
        saveWaitingTimerState(state,action){
            state.isWaitingTimerRunning=action.payload
        },
        startRoomTestFn(state,action){
            state.startRoomTest=action.payload
        },
        saveUsername(state,action){
            state.username=action.payload
        }
    }
})

export const {
            saveUsername, 
            saveUser,
            startRoomTestFn,
            removeUser,
            saveRoomCreationState,
            saveGameState,
            broadcast ,
            saveWaitingTime,
            saveWaitingTimerState
            } = roomSlice.actions;
export default roomSlice.reducer;
