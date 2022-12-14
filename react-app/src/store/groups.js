// constants
const LOAD_ALL = "groups/getAllGroups";
const CREATE_GROUP = "groups/createNewGroup";

export const loadAll = (groups) => {
  return {
    type: LOAD_ALL,
    groups,
  };
};

export const createGroup = (group) => {
  return {
    type: CREATE_GROUP,
    group,
  };
};

// thunk
export const getAllGroupsThunk = () => async (dispatch) => {
  const response = await fetch("/api/groups");

  if (response.ok) {
    const groups = await response.json();
    dispatch(loadAll(groups.groups));
    return groups;
  }
};

// export const getGroupThunk = () => async;

export const CreateGroupThunk = (data) => async (dispatch) => {
  const response = await fetch("/api/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const group = await response.json();
    await dispatch(createGroup(group));
    console.log("new group created in thunk", group);
    return group;
  }
};

// reducer
const initialState = { group: {}, userGroups: [] };
export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL:
      return { ...state, userGroups: action.groups };
    case CREATE_GROUP:
      return { ...state, group: action.group };
    default:
      return state;
  }
}
