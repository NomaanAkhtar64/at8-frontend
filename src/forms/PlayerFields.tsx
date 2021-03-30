import React from "react";

interface Player {
    idx: number;
    username: string;
    url: string;
}

interface PlayerFieldsProps {
    number: number;
    players: Player[];
    setPlayers: (p: Player[]) => void;
}

const PlayerFields: React.FC<PlayerFieldsProps> = ({
    number,
    players,
    setPlayers,
}) => {
    const player = players.find(pl => pl.idx === number)
    return (
        <div className="form-group">
            <label>
                <strong>
                    {number === 5 ? "Alternate Player" : `Player ${number + 1}`}
                </strong>
            </label>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    required={number !== 5}
                    value={player.username}
                    onChange={(e) =>
                        setPlayers([
                            ...players.filter((pl) => pl.idx !== number),
                            { ...player, username: e.target.value },
                        ])
                    }
                />
            </div>
            <div className="form-group">
                <label>Steam Profile Link</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Steam Profile Url"
                    required={number !== 5}
                    value={player.url}
                    onChange={(e) =>
                        setPlayers([
                            ...players.filter((pl) => pl.idx !== number),
                            { ...player, url: e.target.value },
                        ])
                    }
                />
            </div>
        </div>
    );
};

export default PlayerFields;
