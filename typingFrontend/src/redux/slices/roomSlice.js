import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: {},
    isRoomCreated:false,
    isGameStarted:false,
}

const roomSlice = createSlice({
    name: 'room_Slice',
    initialState,
    reducers: {
        saveUser(state, action) {
            const { username, roomId } = action.payload;
            if (!state.rooms[roomId]) {
                state.rooms[roomId] = [username];
            } else {
                state.rooms[roomId].push(username);
            }
        },
        saveRoomCreationState(state,action){
            const {resp} = action.payload
            state.isRoomCreated=resp
        },
        saveGameState(state,action){
            state.isGameStarted=true
        }
    }
})

export const { saveUser,saveRoomCreationState,saveGameState } = roomSlice.actions;
export default roomSlice.reducer;
