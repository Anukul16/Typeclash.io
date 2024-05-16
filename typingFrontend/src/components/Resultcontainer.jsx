import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterOption } from '../redux/slices/resultContainerSlice';
import '../styles/Resultcontainer.css';
import '../styles/Testcontainer.css';
import socket from '../sockets/socket';

const Resultcontainer = () => {
    const dispatch = useDispatch();

    const userSettings = useSelector(state => state.resultContainer);
    const roomSelector = useSelector(state => state.room_Slice)
    const [isOwner, setOwner] = useState(false)

    const handleFilter = (filter, value) => {
        if (filter === 'test_duration') {
            socket.emit("selectedTiming", value);
        }
        dispatch(updateFilterOption({ filter, value }));
    };
    useEffect(() => {
        const sendFilters = async () => {
            const token = localStorage.getItem('logintoken')
            try {
                const resp = await fetch('http://localhost:5000/api/paragraph', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(userSettings)
                });
                const data = await resp.json();
                socket.emit("sendParagraph", data.paragraph)
                handleFilter('paragraph', data.paragraph)
                // console.log("Response: ", data);
            } catch (err) {
                console.error(err);
            }
        };
        sendFilters();
    }, [userSettings.test_duration, userSettings.punctuation, userSettings.numbers, userSettings.words_list]);

    

    return (
        <>


            <div id="results_settings_container" className='container'>
                <div id="result_container">
                    <div>
                        <div id="results">
                            <span id="wpm_result">
                                <span>{userSettings.wpm}&nbsp;</span>
                                <small>WPM</small>
                            </span>
                            <ul id="results_list">
                                <li>
                                    <span>Raw WPM</span>
                                    <span>{userSettings.rawWpm ? `${userSettings.rawWpm}` : "-"}</span>
                                </li>
                                <li>
                                    <span>Accuracy</span>
                                    <span>{userSettings.accuracy ? `${userSettings.accuracy} %` : '-'}</span>
                                </li>
                                <li>
                                    <span>Correct Characters</span>
                                    <span>{userSettings.correctChar ? `${userSettings.correctChar}` : "-"}</span>
                                </li>
                                <li>
                                    <span>Incorrect Characters</span>
                                    <span>{userSettings.incorrectChar ? `${userSettings.incorrectChar}` : userSettings.incorrectChar === 0 ? 0 : '-'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="settings_container">
                    <div id="settings_panel">
                        <ul id="settings_list">
                            <li>
                                <span>Test Duration</span>
                                <span>
                                    <span
                                        className={`filter_option ${userSettings.test_duration === 10 && 'active'}`}
                                        onClick={() => handleFilter('test_duration', 10)}
                                    >
                                        0:10
                                    </span>
                                    <span
                                        className={`filter_option ${userSettings.test_duration === 30 && 'active'}`}
                                        onClick={() => handleFilter('test_duration', 30)}
                                    >
                                        0:30
                                    </span>
                                    <span
                                        className={`filter_option ${userSettings.test_duration === 60 && 'active'}`}
                                        onClick={() => handleFilter('test_duration', 60)}
                                    >
                                        1:00
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>Punctuation</span>
                                <span>
                                    <span
                                        className={`filter_option ${userSettings.punctuation === 'on' && 'active'}`}
                                        onClick={() => handleFilter('punctuation', 'on')}
                                    >
                                        On
                                    </span>
                                    <span
                                        className={`filter_option ${userSettings.punctuation === 'off' && 'active'}`}
                                        onClick={() => handleFilter('punctuation', 'off')}
                                    >
                                        Off
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>Numbers</span>
                                <span>
                                    <span
                                        className={`filter_option ${userSettings.numbers === 'on' && 'active'}`}
                                        onClick={() => handleFilter('numbers', 'on')}
                                    >
                                        On
                                    </span>
                                    <span
                                        className={`filter_option ${userSettings.numbers === 'off' && 'active'}`}
                                        onClick={() => handleFilter('numbers', 'off')}
                                    >
                                        Off
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>Words List</span>
                                <span>
                                    <span
                                        className={`filter_option ${userSettings.words_list === 'simple' && 'active'}`}
                                        onClick={() => handleFilter('words_list', 'simple')}
                                    >
                                        Simple
                                    </span>
                                    <span
                                        className={`filter_option ${userSettings.words_list === 'advanced' && 'active'}`}
                                        onClick={() => handleFilter('words_list', 'advanced')}
                                    >
                                        Advanced
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>Show WPM</span>
                                <span>
                                    <span
                                        className={`filter_option ${userSettings.show_wpm === 'show' && 'active'}`}
                                        onClick={() => handleFilter('show_wpm', 'show')}
                                    >
                                        Show
                                    </span>
                                    <span
                                        className={`filter_option ${userSettings.show_wpm === 'hide' && 'active'}`}
                                        onClick={() => handleFilter('show_wpm', 'hide')}
                                    >
                                        Hide
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span>Show Timer</span>
                                <span>
                                    <span
                                        className={`filter_option ${userSettings.show_timer === 'show' && 'active'}`}
                                        onClick={() => handleFilter('show_timer', 'show')}
                                    >
                                        Show
                                    </span>
                                    <span
                                        className={`filter_option ${userSettings.show_timer === 'hide' && 'active'}`}
                                        onClick={() => handleFilter('show_timer', 'hide')}
                                    >
                                        Hide
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>

        </>
    );
};

export default Resultcontainer;
