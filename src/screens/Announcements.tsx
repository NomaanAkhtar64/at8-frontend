import React from 'react'

import './Announcement.scss'
import useAnnouncements from '../hooks/useAnnouncements'
import Loading from '../components/Loading'

interface AnnouncementsProps {}

const Announcements: React.FC<AnnouncementsProps> = () => {
  const announcements = useAnnouncements()

  if (announcements.hasLoaded) {
    return (
      <div className='announcement-grand-parent'>
        {announcements.state.map((announcement, i) => (
          <div className='announcement-parent' key={i}>
            <div className='announcement-image'>
              <img src={announcement.image} alt='Announcement' />
            </div>
            <div className='announcement-child'>
              <h3 className='announcement-heading'>{announcement.subject}</h3>
              <div className='announcement-text'>
                <p>{announcement.text}</p>
                <a href={announcement.link} rel='noreferrer' target='_blank'>
                  {announcement.link}
                </a>
                <p className='announcement-date'>{announcement.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return <Loading />
}

export default Announcements
