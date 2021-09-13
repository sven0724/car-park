/* eslint-disable */

import {useState, useEffect} from 'react';
import { useSignalrClient } from './signalr-client';

export const useWorkstationHub = (id: string, hubUrl: string) => {

    const [message, setMessage] = useState("");
    const [sound, setSound] = useState(-1);

    const {startConnection, stopConnection, sendMessage, setMessageHandler, isConnected} = useSignalrClient(hubUrl);
    useEffect(()=>{


        setMessageHandler('NewMessage', (id, message, sound)=>{
            console.log("UpdateGateMessage...", id, message, sound)
            setMessage(message);
            setSound(sound);
        })

        startConnection()
    }, [id, hubUrl, isConnected])

    useEffect(()=>{
        if(isConnected){
            sendMessage("Subscribe", id).then(()=>{
                // console.log("subscribed", id);
            });
        }
    }, [isConnected, id, sendMessage])

    const unsubscribe = ()=>{
        sendMessage('Unsubscribe', id).then(()=>{
            console.log("unsubscribed");
            stopConnection().then(()=>{
                console.log("connection ended");
            })
        });
    }

    return {message, sound, unsubscribe, isConnected};
}