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
const editChannelMessage = (id, content) => {
  return { type: EDIT_CHANNEL_MESSAGE, id, content };
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
    const response = await fetch(`/api/message/channels/${channelId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(channelMessage),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(createChannelMessage(data));
      return data;
    }
    return response;
  };
export const fetchEditChannelMessage = (id, message) => async (dispatch) => {
  const response = await fetch(`/api/message/channels/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editChannelMessage(id, data));
    return data;
  }
  return response;
};
export const fetchDeleteChannelMessage = (id) => async (dispatch) => {
  const response = await fetch(`/api/message/channels/${id}`, {
    method: "DELETE",
  });
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
      return { ...state, [action.id]: action.content };
    case DELETE_CHANNEL_MESSAGE:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default channelMessageReducer;
