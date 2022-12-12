// // constants
// const LOAD_ALL = "groups/getAllGroups";
// const CREATE_GROUP = "groups/createNewGroup";

// export const loadAll = (groups) => {
//   return {
//     type: LOAD_ALL,
//     groups,
//   };
// };

// export const createGroup = (group) => {
//   return {
//     type: CREATE_GROUP,
//     group,
//   };
// };

// // thunk
// export const getAllGroupsThunk = () => async (dispatch) => {
//   const response = await fetch("/api/groups");

//   if (response.ok) {
//     const groups = await response.json();
//     dispatch(loadAll(groups.groups));
//     return groups;
//   }
// };

// // reducer
