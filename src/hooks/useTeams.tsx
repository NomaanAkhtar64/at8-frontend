import axios from "axios";
import { useEffect, useState } from "react";
import { __API_URL__ } from "../const";

export default function useTeams(user: number = null, id: number = null) {
    const teamStorage = localStorage.getItem("team");
    const [state, setState] = useState<Teams[]>(
        teamStorage ? JSON.parse(teamStorage) : []
    );
    const [team, setTeam] = useState<Teams[]>([]);
    const [error, setError] = useState("");
    const [hasLoaded, setHasLoaded] = useState(teamStorage ? true : false);

    useEffect(() => {
        var cancelHandler = axios.CancelToken.source();

        // setHasLoaded(false);
        axios
            .get(
                `${__API_URL__}/api/teams/${
                    user === null ? "" : "?user=" + user
                }`,
                {
                    cancelToken: cancelHandler.token,
                }
            )
            .then((res) => {
                setState(res.data);
                localStorage.setItem("team", JSON.stringify(res.data));
                setHasLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
        axios
            .get(`${__API_URL__}/api/teams/${id}`, {
                cancelToken: cancelHandler.token,
            })
            .then((res) => {
                setTeam(res.data);
                setHasLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
        return () => {
            cancelHandler.cancel();
        };
    }, [user]);

    return { state, team, error, hasLoaded };
}
