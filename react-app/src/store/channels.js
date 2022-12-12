// constants
const SET_USER_CHANNELS = "channels/SET_USER_CHANNELS";
const SET_CHANNEL = "channels/SET_CHANNEL";
// const REMOVE_USER = "session/REMOVE_USER";

const setChannel = (channel) => ({
    type: SET_CHANNEL,
    payload: channel,
});

// const removeUser = () => ({
//     type: REMOVE_USER,
// });

// export const authenticate = () => async (dispatch) => {
//     const response = await fetch("/api/auth/", {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     if (response.ok) {
//         const data = await response.json();
//         if (data.errors) {
//             return;
//         }

//         dispatch(setUser(data));
//     }
// };

// export const login = (email, password) => async (dispatch) => {
//     const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             email,
//             password,
//         }),
//     });
//     console.log("***************** USER LOGIN", response);

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setUser(data));
//         return null;
//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data.errors;
//         }
//     } else {
//         return ["An error occurred. Please try again."];
//     }
// };

// export const logout = () => async (dispatch) => {
//     const response = await fetch("/api/auth/logout", {
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });

//     if (response.ok) {
//         dispatch(removeUser());
//     }
// };

// export const getUserChannels = (userId)

export const createChannel = (channel) => async (dispatch) => {
    console.log('---------------- create a channel thunk', channel, '----------------')
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

const initialState = { channel: null, userChannels: [] };
export default function channelsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CHANNEL:
            return { channel: action.payload };
        // case REMOVE_USER:
        //     return { user: null };
        default:
            return state;
    }
}
