import React, { useEffect, useRef, useState } from 'react'
import '../styles/Testcontainer.css'
import Resultcontainer from './Resultcontainer'
import LoopIcon from '@mui/icons-material/Loop';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateResult } from '../redux/slices/resultContainerSlice';
import socket from '../sockets/socket';
import Waitingtime from '../screens/Waitingtime';
import { saveWaitingTimerState } from '../redux/slices/roomSlice';

let paraIdx = 0, correctChar = 0, incorrectChar = 0, isPrevCorrect = [], accuracy = 0, wpm = 0, rawWpm = 0;

const Testcontainer = () => {

    const dispatch = useDispatch();
    const currSelector = useSelector(state => state.resultContainer)
    const roomSelector = useSelector(state => state.room_Slice);
    // console.log(currSelector);
    const [timerRunningState, setTimerRunningState] = useState(false)
    const [timer, setTimer] = useState('')
    const [roomParagraph, setRoomParagraph] = useState('')
    const inputRef = useRef('');
    const spanref = useRef([]);

    useEffect(() => {
        const checkTimer = () => {
            if (timerRunningState) {
                console.log("Timer is running");
                setTimer(currSelector.test_duration)
                setTimerRunningState(false)
            } else {
                setTimer(currSelector.test_duration)
            }
        }
        checkTimer()
    }, [currSelector.test_duration, currSelector.punctuation, currSelector.numbers, currSelector.words_list]);
    console.log(currSelector);
    // useEffect(()=>{
    //     const defaultAfterTest = () => {
    //         if(timer <= 0){
    //             console.log("Timer: ",timer);
    //             inputRef.current.focus()
    //         }
    //     }
    //     defaultAfterTest()
    // },[currSelector.test_duration,currSelector.punctuation,currSelector.numbers,currSelector.words_list])

    

    if (currSelector.paragraph.length > 0 && inputRef.current) {
        inputRef.current.focus();
    }


    const backspace_clicked = (event) => {
        console.log(event);

        if (event.nativeEvent.inputType === 'deleteContentBackward') {
            return true;
        }
        return false;
    }
    const moveToNextWord = (idx, para) => {
        let tempIdx = idx;
        while (idx < para.length && para[idx] !== ' ') {
            spanref.current[idx].style.color = '#EE6060'
            idx++;
        }
        while (tempIdx >= 0 && para[tempIdx] !== ' ') {
            spanref.current[tempIdx].style.color = '#EE6060'
            tempIdx--;
        }
        return idx + 1;
    }
    const notify = () => {
        toast("Login to save your results", {
            type: 'success',
            position: 'top-right',
            autoClose: 3000,
        });
    };
    const calculateAccuracy = (correctChar, incorrectChar) => {
        if (correctChar === 0 && incorrectChar === 0) return 0;
        return ((correctChar / (correctChar + incorrectChar)) * 100).toFixed(2);
    };

    const calculateWordsPerMinute = (correctChar, time) => {
        if (time === 0) return 0;
        return Math.round(correctChar / (5 * (time / 60)));
    };

    const calculateRawWordsPerMinute = (correctChar, incorrectChar, time) => {
        if (time === 0) return 0;
        return Math.round((correctChar + incorrectChar) / (5 * (time / 60)));
    };

    const backToDefault = (idx) => {
        const spanElements = [...spanref.current].slice(0, idx + 1);
        spanElements.forEach((span, index) => {
            span.style.color = 'whitesmoke';
        });
    }

    useEffect(() => {
        let intervalId;

        if (timerRunningState) {
            const startTimer = () => {
                intervalId = setInterval(() => {
                    setTimer((prevSecond) => {
                        if (prevSecond <= 0) {
                            clearInterval(intervalId);
                            inputRef.current.value = '';
                            inputRef.current.disabled = true;
                            if (!localStorage.getItem("logintoken")) {
                                notify();
                            }
                            dispatch(updateResult({ wpm, rawWpm, accuracy, correctChar, incorrectChar,paraIdx }));
                            dispatch(saveWaitingTimerState(true))
                            paraIdx = 0; correctChar = 0; incorrectChar = 0; isPrevCorrect = []; accuracy = 0; wpm = 0; rawWpm = 0;
                            return 0;
                        }
                        accuracy = calculateAccuracy(correctChar, incorrectChar);
                        wpm = calculateWordsPerMinute(correctChar, currSelector.test_duration);
                        rawWpm = calculateRawWordsPerMinute(correctChar, incorrectChar, currSelector.test_duration);
                        console.log(accuracy, " ", wpm);
                        dispatch(updateResult({paraIdx:paraIdx}))
                        return prevSecond - 1;
                    });
                }, 1000);
            };
            startTimer();
        } else {
            console.log('here');
            inputRef.current.value = ''
            inputRef.current.disabled=false
            inputRef.current.focus()
            // console.log("CurrPara: ",currSelector.paraIdx);
            backToDefault(currSelector.paraIdx);
            dispatch(updateResult({wpm:'',rawWpm:'',accuracy:'',correctChar:'',incorrectChar:''}))
            paraIdx = 0; correctChar = 0; incorrectChar = 0; isPrevCorrect = []; accuracy = 0; wpm = 0; rawWpm = 0;
        }


        return () => {
            console.log("or there");
            clearInterval(intervalId)
        }
    }, [timerRunningState]);



    const compareCharacters = (curr_user_char, curr_para_char) => {
        // console.log("From compare: ",paraIdx);
        spanref.current[paraIdx].style.color = 'yellow'
        if (curr_user_char === curr_para_char) {
            correctChar++;
            spanref.current[paraIdx - 1].style.color = '#82ff62'
            isPrevCorrect.push("correct");
            console.log("Correct: ", curr_user_char);
            // console.log("UserIdx: ",userIdx," ","ParaIdx: ",paraIdx," ","UserInput: ",userInput[userIdx]," ","para: ",para[paraIdx]);

        } else {
            // console.log(curr_user_char, " ", curr_para_char);
            incorrectChar++;
            spanref.current[paraIdx - 1].style.color = '#EE6060'
            isPrevCorrect.push("incorrect");
            console.log("Wrong ", curr_user_char, " ", curr_para_char);
        }
    }

    const compareText = (event, paragraph) => {
        
        if (!timerRunningState) {
            setTimerRunningState(true)
        }
        let userInput = event.target.value;
        let para = paragraph.split("");


        if (backspace_clicked(event)) {
            // console.log("clicked");
            paraIdx -= 1;
            if (isPrevCorrect[isPrevCorrect.length - 1] === 'correct') {
                correctChar--;
                isPrevCorrect.pop()
            } else {
                isPrevCorrect.pop()
                incorrectChar--;
            }
            if (paraIdx >= 0) {
                spanref.current[paraIdx].style.color = 'whitesmoke'
                spanref.current[paraIdx + 1].style.color = 'whitesmoke'
            }
            // console.log("Paraidx after backspace hit: ",paraIdx," ",curr_user_char);
        } else {
            let curr_user_char = userInput[userInput.length - 1];
            let curr_para_char = para[paraIdx];
            console.log("paraidx: ", paraIdx);
            // if user press space empty input field
            if (curr_user_char === ' ') {
                inputRef.current.value = ''
            }

            // if user press space but there is no space in paragraph then move to the next word of paragraph

            if (curr_user_char === ' ' && curr_para_char !== ' ') {
                let prevParaIdx = paraIdx;
                paraIdx = moveToNextWord(paraIdx, para);
                incorrectChar = incorrectChar + (paraIdx - prevParaIdx - 1);
            } else {
                paraIdx++;
            }
            // checking usertyped character and paragraph character
            compareCharacters(curr_user_char, curr_para_char);
        }
        console.log("Correct: ", correctChar, " ", "Incorrect: ", incorrectChar);
    }


    const formatSecondsToTimeString = (seconds) => {
        console.log(seconds);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes < 10 ? String(minutes) : String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(()=>{
        socket.on("paragraph", paragraph => {
            setRoomParagraph(paragraph)
        })
        // socket.emit('duration',currSelector.test_duration)
        socket.on("timing",time=>{
            setTimer(time)
        })
    },[])
   
    
    // console.log("RoomPara: ", roomParagraph);
    // console.log("GameState:",roomSelector.isGameStarted);
    // console.log();
    return (
        <>
            <ToastContainer />
            {roomSelector.broadcastToEveryone ? <Waitingtime /> :null}
            <div className='container' id="test-container">
                <div id="text-container">
                    <div id="text_highlight"></div>
                    <div id="test-text">
                        {
                            (roomParagraph || currSelector.paragraph)?.split('').map((char, index) => (
                                <span
                                    key={index}
                                    className='spanchar'
                                    ref={(el) => spanref.current[index] = el}
                                >
                                    {char}
                                </span>
                            ))
                        }
                    </div>


                </div>
                <div id="test-bar">
                    <div className="input_item">
                        <input
                            type="text"
                            id='input_field'
                            autoComplete='off'
                            onChange={(event) => compareText(event, roomParagraph)}
                            onInput={backspace_clicked}
                            ref={inputRef}
                            onKeyDown={roomSelector.isWaitingTimerRunning ? (e) => e.preventDefault() : undefined}
                            onPaste={(e) => e.preventDefault()}
                        />
                    </div>
                    <div className="bar-items">
                        <div id="wpm_display_container" className='speed_classes'>
                            {currSelector.show_wpm === 'show' ? <span>{wpm} <small>WPM</small></span> : ""}
                        </div>
                        <div id="timer_display_container" className='speed_classes'>
                            {currSelector.show_timer === 'show' ? formatSecondsToTimeString(timer) : ""}
                        </div>

                        <button id="reset_button"><LoopIcon /></button>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Testcontainer




















