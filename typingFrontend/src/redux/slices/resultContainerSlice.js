import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    test_duration: 10,
    punctuation: 'on',
    numbers: 'on',
    words_list: 'simple',
    show_wpm: 'show',
    show_timer: 'show',
    paragraph:'',
    wpm:'',
    rawWpm:'',
    accuracy:'',
    correctChar:'', 
    incorrectChar:''
};

const resultContainerSlice = createSlice({
    name: 'resultContainer',
    initialState,
    reducers: {
        updateFilterOption(state, action) {
            const { filter, value } = action.payload;
            state[filter] = value;
        },
        updateResult(state, action) {
            const { wpm, rawWpm, accuracy, correctChar, incorrectChar } = action.payload;
            state.wpm = wpm;
            state.rawWpm = rawWpm;
            state.accuracy = accuracy;
            state.correctChar = correctChar;
            state.incorrectChar = incorrectChar;
        }
        
    }
});

export const { updateFilterOption, updateResult } = resultContainerSlice.actions;
export default resultContainerSlice.reducer;
