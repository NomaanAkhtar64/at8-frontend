import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Announcement.scss";

interface AnnouncementsProps {}

const Announcements: React.FC<AnnouncementsProps> = ({}) => {
    const [announcements, setAnnouncements] = useState<any[]>([]);

    useEffect(() => {
        axios
            .get("https://at8-backend.herokuapp.com/api/announcements/")
            .then((res) => {
                console.log(res.data);
                setAnnouncements(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <div className="announcement-grand-parent">
                {announcements.map((announcement, i) => (
                    <div className="parent announcement-parent" key={i}>
                        <div className="announcement-child">
                            <h1 className="announcement-heading">
                                {announcement.subject}
                            </h1>
                            <div className="announcement-image">
                                <img src={announcement.image} alt="Announcement"/>
                            </div>
                            <div className="announcement-text">
                                <p>{announcement.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Announcements;
