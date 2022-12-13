// constants
const SET_USER_CHANNELS = "channels/SET_USER_CHANNELS";
const SET_CHANNEL = "channels/SET_CHANNEL";
const SET_ALL_CHANNELS = 'channels/SET_ALL_CHANNELS';
// const REMOVE_USER = "session/REMOVE_USER";

const setChannel = (channel) => ({
    type: SET_CHANNEL,
    payload: channel,
});

const setAllChannels = (channels) => ({
    type: SET_ALL_CHANNELS,
    payload: channels
})

// const removeUser = () => ({
//     type: REMOVE_USER,
// });

export const getAllChannel = () => async (dispatch) => {
    console.log('---------------- get all channels thunk', '----------------')
    const response = await fetch("/api/channels");

    if (response.ok) {
        const data = await response.json();
        dispatch(setAllChannels(data.channels));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};


export const createChannel = (channel) => async (dispatch) => {
    // console.log('---------------- create a channel thunk', channel, '----------------')
    const response = await fetch("/api/channels", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(channel),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setChannel(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};


export const editChannel = (channel) => async (dispatch) => {
    // console.log('---------------- edit a channel thunk', channel, '----------------')
    const response = await fetch(`/api/channels/${channel.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(channel),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setChannel(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};


const initialState = { channel: null, userChannels: [], allChannels: [] };
export default function channelsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CHANNEL:
            return { channel: action.payload };
        case SET_ALL_CHANNELS:
            return { allChannels: action.payload };            
        // case REMOVE_USER:
        //     return { user: null };
        default:
            return state;
    }
}
