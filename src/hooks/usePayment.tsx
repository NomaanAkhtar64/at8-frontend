import axios from "axios";
import { useEffect, useState } from "react";
import { __API_URL__ } from "../const";

export default function usePayment() {
    const [state, setState] = useState<Payment[]>([]);
    const [error, setError] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        var cancelHandler = axios.CancelToken.source();

        setHasLoaded(false);
        axios
            .get(`${__API_URL__}/api/payment/`, {
                cancelToken: cancelHandler.token,
            })
            .then((res) => {
                setState(res.data);
                setHasLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
        return () => {
            cancelHandler.cancel();
        };
    }, []);

    return { state, error, hasLoaded };
}
