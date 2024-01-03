import { useState, useEffect } from "react";

//CUSTOM HOOk
export const useFetch = (url) => {

    const [data, setData] = useState(null);


    //CONFIGURANDO
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);


    //LOADING
    const [loading, setLoading] = useState(false);

    const httpConfig = (data, method) => {
        if(method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
            });
            setMethod(method);
        }
    }

    useEffect(() => {

        setLoading(true);

        const fetchData = async () => {
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
            setLoading(false);
        };

        fetchData();
    }, [url, callFetch]);

    // REFATORANDO POST
    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST") {
                let fetchOptions = [url, config];
                const res = await fetch(...fetchOptions);
                const json = await res.json();
                setCallFetch(json);
            }
        }
        
        httpRequest();
    }, [config, method, url]);

    return { data, httpConfig, loading };

}
