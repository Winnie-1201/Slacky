import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getSearch } from "../../store/search";
import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";
import "./search.css";

const SearchMessages = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const channel_message = Object.values(
    useSelector((state) => state.search.channelMessages)
  );

    const group_message = Object.values(
        useSelector((state) => state.search.groupMessages)
    );
    console.log("message in component", group_message);
  //console.log("message in component", channel_message);
//   channel_message.map((el) =>
//     // console.log("el+++++++",el)
//     el.map((msg) => console.log("msg++++++++", msg.content))
//   );

  useEffect(() => {
    dispatch(getSearch(keyword));
  }, [dispatch, keyword]);

  const user = useSelector((state) => state.session.user);

  return (
      user && (
          <>
      <div className="landing-grid">
        <div className="grid-nav-top"></div>
        <div className="grid-nav-top">
          <NavBarLoggedIn user={user} />
        </div>
        <div className="grid-sidebar">
          <SideBar user={user} />
              </div>

<div>
              <div>
              {channel_message.length
                          ? `${channel_message.length} channel(s) found for '${keyword}'`
          : `No Channel turned up for '${keyword}'`}



                  <div className="search-container">
          {/* <input placeholder='Search for messages' /> */}
          {channel_message.map(
            (msg) =>
              // <div className='channel_message' key={msg.channel_id}>

                  <div>
                    <div>
                       {/* Channel: {msg[0]?.channel_id} */}
                      </div>

                      <ul>
                          {msg.map(el =>
                              <div>
                              <div>Channel: {el.channel_name} -{el.created_at }</div>
                                  <img className="user-icon" src={el.user_img} alt='user-icon' />
                                  <div>{el.user_name}</div>
                                  <li>{el.content}</li>
                                  </div>

                          )}
                          </ul>

                  </div>

              // </div>
                      )}


                  </div>
                  </div>


              <div>
              <div>
              {group_message.length
                          ? `${group_message.length} group(s) found for '${keyword}'`
                                  : `No Group turned up for '${keyword}'`}
                              {group_message.map(
                                  (msg) =>
                                      // <div className='channel_message' key={msg.channel_id}>

                                      <div>
                                          <div>
                                              Group: {msg[0]?.group_id}
                                          </div>

                                          <ul>
                                              {msg.map(el =>
                                                  <>
                                                      <div>Group: {el.groupId}</div>
                                                      <img className="user-icon" src={el.user_img} alt='user-icon' />{el.user_name}
                                                      <li>{el.content}</li>
                                                  </>

                                              )}
                                          </ul>

                                      </div>
                              )}


</div>
          </div>
              </div>
              </div>


              </>
    )
  );
};

export default SearchMessages;
