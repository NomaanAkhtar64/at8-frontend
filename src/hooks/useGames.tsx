import axios from "axios";
import { useEffect, useState } from "react";

export default function useGames(slug = null) {
    const [state, setState] = useState<Games[]>([]);
    const [error, setError] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        setHasLoaded(false);
        axios
            .get(
                `https://at8-backend.herokuapp.com/api/games/${
                    slug == null ? "" : slug
                }`
            )
            .then((res) => {
                setState(res.data);
                setHasLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
    }, [slug]);
    return { state, error, hasLoaded };
}
