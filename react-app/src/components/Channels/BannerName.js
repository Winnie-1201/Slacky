import React from 'react';

export default function BannerName({ channel, setShowModal, setActive }) {
  // console.log('-------- 3.1 BannerMembers component --------')
  const viewChannelDetail = () => {
    setShowModal(true)
    setActive('About')
  }

  return (
    <>
      <div className='channel-name' onClick={viewChannelDetail}>
          {channel.is_public ? '#' : <span style={{ 'display': 'flex', 'justifyContent': 'center', 'marginLeft': '5px' }}><i style={{ 'width': '20px' }} className="fa-solid fa-lock"></i></span>} 
          <span style={{'paddingLeft': '6px'}}>
            {channel.name}
            <svg viewBox="0 0 20 20" style={{ 'width': '18px' }}><path d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06Z"></path></svg>
          </span>
      </div>
    </>
  )
}
