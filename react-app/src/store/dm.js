// constants
const GET_ALL = "messages/getAllMessage";
const CREATE_DM = "messages/createDirectMessage";
const UPDATE_DM = "messages/updateDirectMessage";
const DELETE_DM = "message/deleteDirectMessage";

export const getAll = (messages) => {
  return {
    type: GET_ALL,
    messages,
  };
};

export const createDm = (message) => {
  return {
    type: CREATE_DM,
    message,
  };
};

export const updateDm = (message) => {
  return {
    type: UPDATE_DM,
    message,
  };
};

export const deleteDm = (messageId) => {
  return {
    type: DELETE_DM,
    messageId,
  };
};

// thunks
export const getAllMessageThunk = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/messages/groups/${groupId}`);

  if (response.ok) {
    const messages = await response.json();
    // console.log("all dms in getAllMessageThunk: ", messages);
    dispatch(getAll(messages.group_messages));
    return messages;
  }
};

// thunks
export const createDmThunk = (data) => async (dispatch) => {
  // not sure if sendId is needed
  const { groupId, content } = data;
  const response = await fetch(`/api/messages/groups/${groupId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, groupId }),
  });

  if (response.ok) {
    const newMessage = await response.json();
    // console.log("Create a dm in createDmThunk: ", newMessage);
    dispatch(createDm(newMessage.direct_message));
    return newMessage;
  }
};

// thunks
export const updateDmThunk = (data) => async (dispatch) => {
  const { groupId, content, messageId } = data;
  const response = await fetch(`/api/messages/groups/${groupId}/${messageId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (response.ok) {
    const message = await response.json();
    // console.log("update dm in updateDmThunk: ", message);
    dispatch(updateDm(message.direct_message));
    return message;
  }
};

// thunks
export const deleteDmThunk = (data) => async (dispatch) => {
  const { groupId, messageId } = data;
  const response = await fetch(`/api/messages/groups/${groupId}/${messageId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const message = await response.json();
    // console.log("delete dm in deleteDmThunk: ", message);
    dispatch(deleteDm(messageId));
    return message;
  }
};

const dmReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL:
      newState = {};
      // console.log("get all msg dm reducer", action.messages);
      action.messages?.forEach((msg) => {
        newState[msg.id] = msg;
      });
      return newState;
    case CREATE_DM:
      newState = { ...state };
      newState[action.message.id] = action.message;
      return newState;
    // case UPDATE_DM:
    // case DELETE_DM:
    default:
      return state;
  }
};

export default dmReducer;
