import React from 'react'

export default function BannerTopic({channel}) {
    const editTopic = () => {
        console.log('edit topic')
    }

  return (
      <div className='channel-topic' onClick={editTopic}>{channel.topic}</div>
  )
}
