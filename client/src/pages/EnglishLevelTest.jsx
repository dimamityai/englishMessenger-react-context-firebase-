import React, {useEffect, useState} from 'react';
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../Firebase/firebase.js";
import {Button, Radio, Row} from "antd";
import Loader from "../components/Loader.jsx";
import { v4 } from 'uuid';

const EnglishLevelTest = () => {
    const [isStart, setIsStart] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    const [questions, setQuestions] = useState([])
    const [currentEventNumber, setCurrentEventNumber] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [currentQuestions, setCurrentQuestions] = useState({})
    const [userAnswer, setUserAnswer] = useState(0)
    const [answer, setAnswer] = useState([{userAnswer: 0, rightAnswer: ''}])
    const [uniqueKey, setUniqueKey] = useState(0)
    useEffect(() => {
        const getQuestions = () => {
            let arr = []
            const unsub = onSnapshot(doc(db, 'englishTest', 'questions'), (doc) => {
                Object.values(doc.data()).forEach(task => {
                    arr.push(task)
                    setAnswer(prev => [...prev, {userAnswer: 0, rightAnswer: task.rightAnswer}])
                })
                setQuestions(arr || [])
                setCurrentQuestions(arr[0])
                setIsLoading(false)
            });
            return () => {
                unsub();
            }
        }
        getQuestions()
    }, [])

    const saveAnswer = () =>{
        if (userAnswer){
            setAnswer(prev => {
                prev[currentEventNumber + 1].userAnswer = userAnswer
                return prev
            })
        }
        setUserAnswer(0)
    }

    useEffect(() => {
        setUniqueKey(v4())
        console.log(answer)
        setCurrentQuestions(questions[currentEventNumber])
    }, [currentEventNumber])

    if (isEnd) {
        return (
        <div className='formContainer'>
            <div
                style={{
                    display: 'flex',
                    width: '200px',
                    borderRadius: '1px solid black',
                }}
            >
                <div>

                </div>
            </div>
        </div>
        )
    }

    return (
        isStart
            ?
            <div className='formContainer'>
                {isLoading
                    ?
                    <Loader/>
                    :
                    <div
                        className='formContainer'
                        style={{width: '65%'}}
                    >

                            <div
                                style={{
                                    // border: '1px solid black',
                                    width: '1000px',
                                    height: '600px',
                                    borderRadius: '7px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: '20px',
                                }}
                            >
                                {currentQuestions &&
                                    <div
                                        style={{
                                            display: 'flex',
                                            height: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'start',
                                            flexDirection: 'column',
                                            gap: '20px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: 30,
                                                fontSize: '30px',
                                            }}
                                        >
                                            {currentQuestions.question}
                                        </div>
                                    <Radio.Group
                                        onChange={e => setUserAnswer(e.target.value)}
                                        value={userAnswer}
                                        key={currentEventNumber + uniqueKey}
                                        defaultValue={answer[currentEventNumber + 1].userAnswer}
                                        buttonStyle="solid"
                                        style={{display: 'flex', flexDirection: 'column', gap: '40px',}}
                                    >
                                        <Radio.Button
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '800px',
                                                height: '50px',
                                                fontSize: '25px',
                                                marginTop: '30px'
                                            }}
                                            value={1}
                                        >
                                            {currentQuestions.answer1}
                                        </Radio.Button>
                                        <Radio.Button
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '50px',
                                                fontSize: '25px',
                                            }}
                                            value={2}
                                        >
                                            {currentQuestions.answer2}
                                        </Radio.Button>
                                        <Radio.Button
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '50px',
                                                fontSize: '25px',
                                            }}
                                            value={3}
                                        >
                                            {currentQuestions.answer3}
                                        </Radio.Button>
                                        <Radio.Button
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '50px',
                                                fontSize: '25px',
                                            }}
                                            value={4}
                                        >
                                            {currentQuestions.answer4}
                                        </Radio.Button>

                                    </Radio.Group>
                                        <Row justify="center">
                                            {currentEventNumber > 0 &&
                                            <Button
                                                style={{
                                                    marginTop: 40,
                                                    width: '300px',
                                                    backgroundColor: 'lightblue',
                                                    fontSize: '20px',
                                                    height: '50px'
                                                }}
                                                value={currentEventNumber}
                                                    onClick={
                                                () => {

                                                    setCurrentEventNumber(prev => prev - 1)
                                                }}>
                                                Назад
                                            </Button>
                                            }
                                            <Button
                                                style={{
                                                    marginTop: 40,
                                                    marginLeft: currentEventNumber > 0 ? 170 : 0,
                                                    backgroundColor: 'lightblue',
                                                    width: '300px',
                                                    fontSize: '20px',
                                                    height: '50px'
                                                }}
                                                value={currentEventNumber}
                                                onClick={() => {
                                                    if (currentEventNumber < questions.length) {
                                                        saveAnswer();
                                                        setCurrentEventNumber(prev => prev + 1)
                                                    }
                                                    else {setIsEnd(true)}
                                                }}>
                                                {currentEventNumber < questions.length
                                                    ? 'Далее'
                                                    : 'Завершить'}
                                            </Button>
                                        </Row>
                                    </div>
                                }

                            </div>
                    </div>
                }
            </div>

            :
            <button onClick={() => setIsStart(true)}>
                Start
            </button>
    );
};

export default EnglishLevelTest;