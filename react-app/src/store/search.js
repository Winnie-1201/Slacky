const SEARCH_MESSAGES = "search/getMessages";

export const search_chanel_messages = (message) => {
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
      console.log("get search in thunk++++++++: ", messages);
    dispatch(search_chanel_messages(messages));
    return messages;
  }
};


// //reducer
// const searchReducer = (state = {}, action) => {
//     let newState
//     switch (action.type) {
//         case search_chanel_messages:
//             newState = { ...state };
//             action.messages
//     }
// }
