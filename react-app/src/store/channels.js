// constants
const SET_CHANNEL = "channels/SET_CHANNEL";
const SET_ALL_CHANNELS = 'channels/SET_ALL_CHANNELS';
const REMOVE_CHANNEL = "channels/REMOVE_CHANNEL";

const setChannel = (channel) => ({
    type: SET_CHANNEL,
    payload: channel,
});

const setAllChannels = (channels) => ({
    type: SET_ALL_CHANNELS,
    payload: channels
})

const removeChannel = () => ({
    type: REMOVE_CHANNEL,
});

export const getOneChannel = (channelId) => async (dispatch) => {
    // console.log('---------------- get one channels thunk', '----------------')
    const response = await fetch(`/api/channels/${channelId}`);

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
}


export const getAllChannel = () => async (dispatch) => {
    // console.log('---------------- get all channels thunk', '----------------')
    const response = await fetch("/api/channels");

    if (response.ok) {
        const data = await response.json();
        const channelObj = {}
        if (data.channels) data.channels.forEach(channel => {
            channelObj[channel.id] = channel
        });

        dispatch(setAllChannels(channelObj));
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
        return { 'newChannel': data };
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return { 'errors': "An error occurred. Please try again." };
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
        return { 'errors': "An error occurred. Please try again." };
    }
};


export const deleteOneChannel = (channelId) => async (dispatch) => {
    // console.log('---------------- remove a channel thunk', channelId, '----------------')
    const response = await fetch(`/api/channels/${channelId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        // const data = await response.json();
        dispatch(removeChannel());
        dispatch(getOneChannel(1));
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


export const deleteUserChannel = (pair) => async (dispatch) => {
    // console.log('---------------- leave a channel thunk', pair, '----------------')
    const response = await fetch('/api/users-channels', {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pair),
    });

    if (response.ok) {
        dispatch(removeChannel());
        dispatch(getOneChannel(1));
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

export const addUserChannel = (pair) => async (dispatch) => {
    // console.log('---------------- add a channel thunk', pair, '----------------')
    const response = await fetch('/api/users-channels', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pair),
    });

    if (response.ok) {
        // dispatch(getAllChannel());
        // dispatch(getUser(pair.user_id));
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


const initialState = { channel: null, allChannels: {} };
export default function channelsReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case SET_CHANNEL:
            newState.channel = action.payload
            return newState;
        case SET_ALL_CHANNELS:
            newState.allChannels = action.payload
            return newState;
        case REMOVE_CHANNEL:
            return { ...state, channel: null };            
        default:
            return state;
    }
}
