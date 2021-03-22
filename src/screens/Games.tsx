import React from "react";

import "./Games.scss";
import useGames from "../hooks/useGames";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const games = useGames();
    return (
        <>
            {games.error ? (
                <div className="container text-center">{games.error}</div>
            ) : (
                <div className="grand-parent">
                    {games.hasLoaded ? (
                        <>
                            {games.state.map((game, i) => (
                                <div key={i} className="parent">
                                    <div className="game-child">
                                        <div className="image-container">
                                            <img
                                                src={game.picture}
                                                alt="Tournament Thumbnail"
                                            />
                                        </div>
                                        {/* <div className="caption">
                                            <h1>{game.name}</h1>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div
                            className="spinner-border text-light"
                            role="status"
                        >
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Home;
