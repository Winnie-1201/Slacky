import React, {useState} from 'react';
import DetailsAbout from './DetailsAbout';
import DetailsMembers from './DetailsMembers';

export default function DetailsContent({ channel, active, setActive, setShowModal }) {
    // const [active, setActive] = useState('About')

  return (
    <>
      <div className='channel-details-nav'>
        <span className={active === 'About' ? 'channel-details-active' : ''} onClick={() => {setActive('About')}}>About</span>
        <span className={active === 'Members' ? 'channel-details-active' : ''} onClick={() => {setActive('Members')}}>Members</span>
      </div>    
        {active === 'About' &&
            <div className='channel-details-body-about'>
              <DetailsAbout channel={ channel } setShowModal={setShowModal} />
            </div>
        }
        {active === 'Members' &&
            <div className='channel-details-body-members'>
              <DetailsMembers channel={channel} />
            </div>
        }
           
    </>
  )
}
