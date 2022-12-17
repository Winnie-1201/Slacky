// constants
const LOAD_ALL = "groups/getAllGroups";
const CREATE_GROUP = "groups/createNewGroup";
const LOAD_CURR = "groups/getCurrentUserGroups";
const LOAD_ONE = "groups/getOneGroup";

export const loadAll = (groups) => {
  return {
    type: LOAD_ALL,
    groups,
  };
};

const loadOne = (group) => {
  return {
    type: LOAD_ONE,
    group,
  };
};

export const createGroup = (group) => {
  return {
    type: CREATE_GROUP,
    group,
  };
};

export const LoadCurr = (groups) => {
  return {
    type: LOAD_CURR,
    groups,
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

export const getOneGroupThunk = (groupId) => async (dispatch) => {
  const response = await fetch(`/api/groups/${groupId}`);

  if (response.ok) {
    const group = await response.json();
    await dispatch(loadOne(group.group));
    return group.group;
  }
};

export const getCurrentUserGroupsThunk = () => async (dispatch) => {
  const response = await fetch("/api/groups/current");

  if (response.ok) {
    const groups = await response.json();
    // console.log("current user groups", groups);
    dispatch(LoadCurr(groups.groups));
    return groups;
  }
};

// export const getGroupThunk = () => async;

export const CreateGroupThunk = (data) => async (dispatch) => {
  // console.log("data in create group thunk", data);
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
    // console.log("new group created in thunk", group);
    return group;
  }
};

// reducer
const initialState = { userGroups: [], allGroups: [], currGroup: null };
export default function groupReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_ALL:
      newState.allGroups = action.groups;
      return newState;
    // return { ...state, allGroups: action.groups };
    case LOAD_CURR:
      newState.userGroups = action.groups;
      // return { ...state, userGroups: action.groups };
      return newState;
    case LOAD_ONE:
      newState.currGroup = action.group;
      return newState;
    // return { ...state, currGroup: action.group };
    case CREATE_GROUP:
      return { ...state, userGroups: [action.group] };
    default:
      return state;
  }
}
