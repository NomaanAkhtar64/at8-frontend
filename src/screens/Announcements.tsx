import React, { useEffect } from "react";

import "./Announcement.scss";
import useAnnouncements from "../hooks/useAnnouncements";
import Loading from "../components/Loading";
import parse from "html-react-parser";
interface AnnouncementsProps {}

const Announcements: React.FC<AnnouncementsProps> = () => {
  const announcements = useAnnouncements();

  useEffect(() => {
    document.title = "Announcements - AT8"
  }, [])

  if (announcements.hasLoaded) {
    return (
      <div className="a1-wrapper">
        <div className="a1-heading">Announcements</div>
        {announcements.state.length === 0 && (
          <h3 className="a1-body">No Announcement Found</h3>
        )}
        {announcements.state.reverse().map((announcement, i) => (
          <div className="announcement-parent" key={i}>
            {announcement.image && (
              <div className="announcement-image">
                <img src={announcement.image} alt="" />
              </div>
            )}

            <div className="announcement-child">
              <h3 className="announcement-heading">{announcement.subject}</h3>
              <div className="announcement-text">
                <div>{parse(announcement.text)}</div>
                <a href={announcement.link} rel="noreferrer" target="_blank">
                  {announcement.link}
                </a>
                <p className="announcement-date">{announcement.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <Loading />;
};

export default Announcements;
