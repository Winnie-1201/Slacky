const GET_CHANNEL_MESSAGES = "channelMessage/getChannelMessages";
const CREATE_CHANNEL_MESSAGE = "channelMessage/createChannelMessage";
const EDIT_CHANNEL_MESSAGE = "channelMessage/editChannelMessage";
const DELETE_CHANNEL_MESSAGE = "channelMessage/deleteChannelMessage";

const getChannelMessages = (channelMessages) => {
  return { type: GET_CHANNEL_MESSAGES, channelMessages };
};
const createChannelMessage = (channelMessage) => {
  return { type: CREATE_CHANNEL_MESSAGE, channelMessage };
};
const editChannelMessage = (content) => {
  return { type: EDIT_CHANNEL_MESSAGE, content };
};
const deleteChannelMessage = (id) => {
  return { type: DELETE_CHANNEL_MESSAGE, id };
};

export const fetchChannelMessages = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/message/channels/${channelId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getChannelMessages(data.channel_messages));
    return data;
  }
  return response;
};
export const fetchCreateChannelMessage =
  (channelId, channelMessage) => async (dispatch) => {
    console.log("**************** THUNK channelId", channelId);
    console.log("**************** THUNK cm", channelMessage);
    const response = await fetch(`/api/message/channels/${channelId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(channelMessage),
    });
    console.log("**************** CREATE ****************", response);
    if (response.ok) {
      const data = await response.json();
      console.log("**************** CREATE DATA ****************", data);
      dispatch(createChannelMessage(data));
      return data;
    }
    return response;
  };
export const fetchEditChannelMessage = (id, content) => async (dispatch) => {
  const response = await fetch(`/api/message/channels/${id}`, {
    method: "PUT",
    body: JSON.stringify(content),
  });
  console.log("**************** EDIT****************", response);
  if (response.ok) {
    const data = await response.json();
    console.log("**************** EDIT DATA ****************", data);
    dispatch(editChannelMessage(data));
    return data;
  }
  return response;
};
export const fetchDeleteChannelMessage = (id) => async (dispatch) => {
  const response = await fetch(`/api/message/channels/${id}`, {
    method: "DELETE",
  });
  console.log("**************** DELETE ****************", response);
  dispatch(deleteChannelMessage(id));
  return response;
};

const initialState = {};

const channelMessageReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_CHANNEL_MESSAGES:
      newState = {};
      action.channelMessages.forEach((channelMessage) => {
        newState[channelMessage.id] = channelMessage;
      });
      return newState;
    case CREATE_CHANNEL_MESSAGE:
      return { ...state, [action.channelMessage.id]: action.channelMessage };
    case EDIT_CHANNEL_MESSAGE:
      return { ...state, [action.channelMessage.id]: action.channelMessage };
    case DELETE_CHANNEL_MESSAGE:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default channelMessageReducer;
