import axios from "axios";
import { useEffect, useState } from "react";
import { __API_URL__ } from "../const";

export default function useHome() {
    const [state, setState] = useState<Home[]>();
    const [error, setError] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        setHasLoaded(false);
        var cancelHandler = axios.CancelToken.source();

        axios
            .get(`${__API_URL__}/api/home/`)
            .then((res) => {
                setState(res.data);
                setHasLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
    }, []);

    return { state, error, hasLoaded };
}
