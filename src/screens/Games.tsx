import React, { useEffect, useState } from "react";

import "./Games.scss";
import axios from "axios";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
    const [games, setGames] = useState<any[]>([]);

    useEffect(() => {
        axios
            .get("https://at8-backend.herokuapp.com/api/games/")
            .then((res) => {
                console.log(res.data);
                setGames(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <div className="grand-parent">
                {games.map((game, i) => (
                    <div key={i} className="parent">
                        <div className="game-child">
                            <div className="image-container">
                                <img
                                    src={game.picture}
                                    alt="Tournament Thumbnail"
                                />
                            </div>
                            <div className="caption">
                                <h1>{game.name}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
