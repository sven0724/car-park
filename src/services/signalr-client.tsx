
/* eslint-disable */

import { HubConnectionBuilder } from '@microsoft/signalr';
import {useState, useMemo} from 'react';

export const useSignalrClient = (url: string) => {

    const [isConnected, setIsConnect] = useState(false);

    const conn = useMemo(()=>{
        const connection = new HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .build();
        return connection;
    }, [url]);

    const startConnection = () => {
        if(conn && !isConnected){
            return conn.start().then(()=>
            {
                setIsConnect(true);
                console.log("signalr connected")
            }).catch((err)=>console.error("cannot connect to signalr" , err));
        }
        return new Promise((resolve)=>resolve(null));
    }

    const stopConnection = () => {
        if(conn && isConnected){
            return conn.stop().then(()=>{
                setIsConnect(false);
            })
        }
        return new Promise((resolve)=>resolve(null));
    }

    const sendMessage = async (method: string, body: any)=> {
        if(isConnected){
            try{
                await conn.invoke(method, body);
            }
            catch(e){
                console.error("error when send message", e);
            }
        }
        else{
            throw("signalr is not connected");
        }
    }

    const setMessageHandler = (message: string, handler: (...args: any[]) => void) => {
        if(conn){
            conn.on(message, handler)
        }
    } 

    return {startConnection, stopConnection, sendMessage, setMessageHandler, isConnected};
}