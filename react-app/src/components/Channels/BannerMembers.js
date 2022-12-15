import { useEffect, useState } from 'react';

export default function BannerMembers({ channel, setShowModal, setActive }) {
    // console.log('-------- 3.3 BannerMembers component --------')
    const [firstThree, setFirstThree] = useState([]);

    const viewAllMembers = () => {
        setShowModal(true)
        setActive('Members')
    }

    useEffect(() => {
        setFirstThree([...channel.channel_members?.slice(0,3)])
    }, [channel])

  return (
      <div className='channel-members' onClick={viewAllMembers}>
          <div className='channel-members-pics' >
            {/* {console.log(channel.channel_members)}
            {console.log(firstThree)} */}
            {firstThree?.map((user, i) => {
                return (
                    <div key={user.id} className={`member-pics-div-outer position-${i}`}>
                        {user.image_url ?
                            <span style={{ 'height': '22px', 'width': '24px', 'borderRadius': '4px', 'overflow': 'hidden' }}>
                                <img style={{ 'height': '22px', 'width': '22px', 'borderRadius': '4px', 'overflow': 'hidden', 'objectFit': 'cover' }} src={`${user.image_url}`} alt={`${user.name}`}></img>
                            </span>
                            :
                            <span>
                                <button style={{ 'height': '22px', 'width': '22px', 'borderRadius': '4px', 'overflow': 'hidden', 'border': 'none' }}>
                                    <i className="fa-solid fa-user"></i>
                                </button>
                            </span>
                        }
                    </div>
                )
            })}
            <span className='member-total'>{channel?.channel_members?.length}</span>
          </div>
          <div className='channel-members-add' >
              <svg viewBox='0 0 20 20' style={{ 'width': '20px' }}>
                  <path d="M6 6.673c0-1.041.352-1.824.874-2.345C7.398 3.805 8.139 3.5 9 3.5c.86 0 1.602.305 2.126.828.522.521.874 1.304.874 2.345a3.894 3.894 0 0 1-1.05 2.646c-.629.678-1.38 1.014-1.95 1.014-.57 0-1.321-.336-1.95-1.014A3.894 3.894 0 0 1 6 6.673ZM9 2c-1.222 0-2.356.438-3.186 1.267C4.98 4.1 4.5 5.277 4.5 6.673a5.394 5.394 0 0 0 1.951 4.14 9.891 9.891 0 0 0-1.873.658c-1.464.693-2.811 1.828-3.448 3.557-.3.811-.067 1.59.423 2.132.475.526 1.193.84 1.947.84h8.75a.75.75 0 0 0 0-1.5H3.5c-.35 0-.657-.15-.834-.346-.163-.18-.212-.382-.129-.607.463-1.256 1.459-2.14 2.683-2.72C6.449 12.246 7.853 12 9 12c.907 0 1.981.154 3.004.51a.75.75 0 0 0 .494-1.416c-.315-.11-.632-.203-.95-.28a5.394 5.394 0 0 0 1.951-4.14c.001-1.397-.48-2.575-1.313-3.407C11.356 2.438 10.223 2 9 2Zm6.5 9a.75.75 0 0 1 .75.75v2h2a.75.75 0 0 1 0 1.5h-2v2a.75.75 0 0 1-1.5 0v-2h-2a.75.75 0 0 1 0-1.5h2v-2a.75.75 0 0 1 .75-.75Z"></path>
              </svg>
          </div>
      </div>
  )
}
