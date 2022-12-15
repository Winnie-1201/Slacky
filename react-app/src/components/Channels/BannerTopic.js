import React from 'react'

export default function BannerTopic({channel}) {
    // console.log('-------- 3.2 BannerMembers component --------')
    // const editTopic = () => {
    //     // console.log('edit topic')
    // }

  return (
      <div className='channel-topic' >{channel.topic}</div>
  )
}
