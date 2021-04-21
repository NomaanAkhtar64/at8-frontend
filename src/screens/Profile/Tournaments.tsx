import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEntry } from "../../hooks/entry";

interface TournamentsProps {
  entries: EntryDetail[];
}

const Tournaments: React.FC<TournamentsProps> = ({ entries }) => {
  const [entriesState, setEntries] = useState(entries);
  console.log(entries);

  useEffect(() => {
    document.title = "Tournament Entries - AT8";
  }, []);

  return (
    <div className="tournament-data">
      {entriesState.length !== 0 ? (
        <table className="table table-hover table-dark text-center my-4">
          <thead>
            <tr>
              <th scope="col">Entry ID</th>
              <th style={{ width: "20%" }} scope="col">
                Tournament
              </th>
              <th style={{ width: "20%" }} scope="col">
                Game
              </th>
              <th style={{ width: "20%" }} scope="col">
                Team
              </th>
              <th style={{ width: "20%" }} scope="col">
                Payment
              </th>
              <th style={{ width: "20%" }} scope="col">
                Date
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entriesState.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.entry_id}</td>
                <td>{entry.tournament.name}</td>
                <td>{entry.tournament.game.name}</td>
                <td>{entry.team.name}</td>
                <td>
                  {entry.has_paid ? (
                    "Paid"
                  ) : (
                    <>
                      Pending
                      {((!entry.date_transaction && !entry.time_transaction) ||
                        !entry.image_proof ||
                        !entry.transaction_id) && (
                        <Link
                          to={`/entry/verify/${entry.entry_id}`}
                          style={{ display: "block" }}
                        >
                          Verify
                        </Link>
                      )}
                    </>
                  )}
                </td>
                <td>{entry.date.split("T")[0]}</td>

                {parseInt(entry.tournament.ending_time.split("-")[2]) <=
                  parseInt(entry.date.split("-")[2].split("T")[0]) && (
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="red"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                      onClick={async () => {
                        await deleteEntry(entry.id);
                        setEntries(
                          entriesState.filter((e) => e.id !== entry.id)
                        );
                      }}
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3 className="a1-body">No Tournament entries Found</h3>
      )}
    </div>
  );
};

export default Tournaments;
