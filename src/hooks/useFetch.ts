import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE = 'https://dummyjson.com';

export function useFetch<T>(endpoint : string) {
    const[data, setData] = useState<T | null>(null);
    const[loading, setLoading] = useState<boolean>(true);
    const[error, setError] = useState< string | null>(null);

    useEffect (() => {
        const fetchData = async () => {
            try{
                const response = await axios.get(`${API_BASE}${endpoint}`);
                setData(response.data);
            }catch(err){
                if(err instanceof Error){
                    setError(err.message);
                }else{
                    setError('Unknown Error Occurred');
                }
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    },[endpoint]);
    return {data,loading,error};
};