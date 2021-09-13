import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { REACT_APP_APIURL } from '../../configs/apiConfig';
import { useServerTimeHub } from '../../services/server-time-hub';

import styles from './Counter.module.css';
import { RAND_ID } from './mockData';

export function Counter(){
    const count = useSelector((state: RootStateOrAny) =>state.value);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');
    // const {message, sound, unsubscribe} = useServerTimeHub(RAND_ID, REACT_APP_APIURL.replace("/api/", "/") + "server-time-hub")
    const {message, sound, unsubscribe} = useServerTimeHub(RAND_ID, "http://localhost:5000/gate-monitor-hub")
    
    const [time, setTime] = useState(message);
    useEffect(()=>{
        console.log("received message", message)
    },[message])
    const handleChange =(e:any) =>{
        // setTime(e.target.value);
    }

    const increment = () =>{
        var res = count + 1;
        dispatch({type: 'increment', payload: res})
    }
    const decrement = () =>{
        var res = count - 1

        dispatch({type: 'decrement', payload: res})
    }

    const IncrementByAmount =()=>{
        var res = count + Number(incrementAmount);

        dispatch({type: 'increment', payload: res || 0})
    }
    const IncrementAsync =() =>{
        var res = count + Number(incrementAmount);

        setTimeout(() =>{
            dispatch({type: 'increment', payload: res || 0})
        }, 1000)
    }

    return(
        <>   
                <div className={styles.rowmessage}>
                    <input
                        className={styles.messagebox}
                        aria-label="Set increment amount"
                        value={message}
                        onChange={(e:any) =>handleChange(e)}
                        // onChange={(e) =>setIncrementAmount(e.target.value)}
                        /> 
                </div>
                <div className={styles.row}>
                    <button
                        className={styles.button}
                        aria-label="Increment value"
                        onClick={increment}
                    >
                        +
                    </button>
                    <span className={styles.value}>{count}</span>
                    <button
                        className={styles.button}
                        aria-label="Decrement value"
                        onClick={decrement}
                    >
                        -
                    </button>
                </div>
                <div className={styles.row}>
                    <input
                        className={styles.textbox}
                        aria-label="Set increment amount"
                        value={incrementAmount}
                        onChange={(e) =>setIncrementAmount(e.target.value)}
                    />
                    <button
                        className={styles.button}
                        onClick={IncrementByAmount
                        }
                    >
                        Add Amount
                        
                    </button>
                    <button
                        className={styles.asyncButton}
                        onClick={IncrementAsync
                        }
                    >
                        Add Async
                    </button>
                </div>
        </>
    )
}