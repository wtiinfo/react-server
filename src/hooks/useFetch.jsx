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

    //TRATANDO ERROS
    const [error, setError] = useState(null);

    const [itemId, setItemId] = useState(null);

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
            });
            setMethod(method);
        } else if (method === "DELETE") {
            setConfig({
                method,
                headers: {
                    "Content-type": "application/json"
                }
            });
            setMethod(method);
            setItemId(data)
        }
    }

    useEffect(() => {

        setLoading(true);

        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.log(error.message);
                setError("Houve algum erro ao carregar os dados");
            }



            setLoading(false);
        };

        fetchData();
    }, [url, callFetch]);

    // REFATORANDO POST
    useEffect(() => {
        const httpRequest = async () => {
            let json;

            if (method === "POST") {
                let fetchOptions = [url, config];
                const res = await fetch(...fetchOptions);
                json = await res.json();
                setCallFetch(json);
            } else if (method === "DELETE") {
                const deleteUrl = `${url}/${itemId}`;
                const res = await fetch(deleteUrl, config);
                json = await res.json();
            }
            setCallFetch(json);
        }

        httpRequest();
    }, [config, method, url]);

    return { data, httpConfig, loading, error };

}
