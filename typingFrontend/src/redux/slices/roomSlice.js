import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
    isRoomCreated:false,
    isGameStarted:false,
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
        }
    }
})

export const { saveUser,removeUser,saveRoomCreationState,saveGameState } = roomSlice.actions;
export default roomSlice.reducer;
