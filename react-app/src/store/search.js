import { Manager } from "socket.io-client";

const SEARCH_MESSAGES = "search/getMessages";

export const search_messages = (message) => {
  return {
    type: SEARCH_MESSAGES,
    message,
  };
};

//thunk
export const getSearch = (keyword) => async (dispatch) => {
  const res = await fetch(`/api/search/${keyword}`);
  if (res.ok) {
      const messages = await res.json();
      dispatch(search_messages(messages));
      // console.log("get search in thunk%%%%%%%%%%: ", messages);
    return messages;
  }
};


//reducer
const initialState = {
    channelMessages: {},
    groupMessages: {}

}

const searchReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SEARCH_MESSAGES:
            // console.log("++++++++")
            newState = { ...state };
            // console.log("action in searchReducer", action)
            action.message.Channel_Message.forEach(msg => {
                newState["channelMessages"] = msg
            })
            action.message.Group_Message.forEach(msg => {
                newState["groupMessages"] = msg
            })
            return newState
        default:
            return state;
    }



}


export default searchReducer
