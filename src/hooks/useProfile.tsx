import axios from "axios";
import { useEffect, useState } from "react";

export default function useProfile() {
    const [rest, setRest] = useState<RestProfile[]>([]);
    const [api, setApi] = useState<ApiProfile[]>([]);
    const [error, setError] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        setHasLoaded(false);
        const token = `Token ` + localStorage.getItem("token");
        const headers = {
            Authorization: token,
        };
        axios
            .get("https://at8-backend.herokuapp.com/rest-auth/user/", {
                headers: headers,
            })
            .then((res) => {
                setRest(res.data);
                setHasLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
        axios
            .get("https://at8-backend.herokuapp.com/api/userprofile/")
            .then((res) => {
                setApi(res.data);
                setHasLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
    }, []);
    return { rest, api, error, hasLoaded };
}
