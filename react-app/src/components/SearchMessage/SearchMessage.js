import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getSearch } from "../../store/search";
import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
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
  // console.log("message in component", group_message);
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

          <div className="grid-main-view">
            <div className="result_channel">
              {channel_message.length
                ? `${channel_message.length} channel(s) found for '${keyword}'`
                : `No Channel turned up for '${keyword}'`}
            </div>

            <div className="search-container">
              {/* <input placeholder='Search for messages' /> */}
              {channel_message.map(
                (msg) => (
                  <div>
                    {msg.map((el) => (
                      <div className="channel_msg_container" key={el.id}>
                        <div className="channel_name_ls">
                          <div className="first_line">
                            <div className="firsy_line_left">
                              <span id="channel_name">
                                # Channel: {el.channel_name}
                              </span>{" "}
                              -- {el.created_at}{" "}
                            </div>
                            <div className="first_line_right">
                              <Link
                                className="view_link"
                                to={`/channels/${el.channel_id}`}
                              >
                                view in channel
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="channel_msg_ls">
                          <div>
                            <img
                              className="user_icon"
                              src={el.user_img}
                              alt="user-icon"
                            />
                          </div>
                          <div className="samll_box">
                            <div id="user_name">{el.user_name}</div>
                            <p id="search_content">{el.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )

                // </div>
              )}
            </div>

            <div className="result_channel">
              {group_message.length
                ? `${group_message.length} group(s) found for '${keyword}'`
                : `No Group turned up for '${keyword}'`}
            </div>
            <div className="search-container">
              {group_message.map((msg) => (
                <div>
                  {/* <div>{msg[0]?.group_id}</div> */}
                  {msg.map((el) => (
                    <div className="channel_msg_container" key={el.id}>
                      <div className="channel_name_ls">
                      <div className="first_line">
                            <div className="firsy_line_left">
                        <span id="channel_name"># Group: {el.groupId}</span> --{" "}
                            {el.created_at}{" "}
                              </div>
                            <div className="first_line_right">
                        <Link
                          className="view_link"
                          to={`/groups/${el.groupId}`}
                        >
                          view in group
                        </Link>
                          </div>
                          </div>
                      </div>

                      <div className="channel_msg_ls">
                        <div>
                          <img
                            className="user_icon"
                            src={el.user_img}
                            alt="user-icon"
                          />
                        </div>
                        <div className="samll_box">
                          <div id="user_name">{el.user_name}</div>
                          <p id="search_content">{el.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid-footer">
            <Footer />
          </div>
        </div>
      </>
    )
  );
};

export default SearchMessages;
