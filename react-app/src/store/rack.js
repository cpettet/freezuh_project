// constants
const GET_RACK = "rack/GET_RACK";
const POST_RACK = "rack/POST_RACK";
const EDIT_RACK = "rack/EDIT_RACK";
const DELETE_RACK = "rack/DELETE_RACK";

// action creators
const get = (payload) => ({
  type: GET_RACK,
  payload,
});

const post = (payload) => ({
  type: POST_RACK,
  payload,
});

const edit = (payload) => ({
  type: EDIT_RACK,
  payload,
});

const deleteAction = (payload) => ({
  type: DELETE_RACK,
  payload,
});

// thunks
export const getRacks = () => async (dispatch) => {
  const res = await fetch("/api/racks/");
  if (res.ok) {
    const data = await res.json();
    dispatch(get(data.racks));
    return data;
  }
};

export const createRack = (data) => async (dispatch) => {
  const res = await fetch("/api/racks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newRack = await res.json();
    if (res.ok) dispatch(post(newRack));
    return newRack;
  } catch (e) {
    return e;
  }
};

export const editRack = (data) => async (dispatch) => {
  const res = await fetch(`/api/racks/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const editedRack = await res.json();
    if (res.ok) dispatch(edit(editedRack));
    return editedRack;
  } catch (e) {
    return e;
  }
};

export const deleteRack = (data) => async (dispatch) => {
  const res = await fetch(`/api/racks/${data.id}`, {
    method: "DELETE",
  });

  try {
    const deletedRack = await res.json();
    if (res.ok) dispatch(deleteAction(deletedRack));
    return deletedRack;
  } catch (e) {
    return e;
  }
};

const initialState = {
  byId: {},
  allIds: [],
};
// racks: {
//   byId: {
//     "rack1": {},
//     "rack2": {},
//   },
//   allIds: ["rack1", "rack2"]
// }

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RACK: {
      const newState = { ...state };
      action.payload.forEach((rack) => {
        newState.byId[rack.id] = rack;
        if (!newState.allIds.includes(rack.id)) {
          newState.allIds.push(rack.id);
        }
      });
      return newState;
    }
    case POST_RACK: {
      const newState = { ...state };
      newState.byId[action.payload.rack.id] = action.payload.rack;
      newState.allIds.push(action.payload.rack.id);
      return newState;
    }
    case EDIT_RACK: {
      const newState = { ...state };
      newState.byId[action.payload.rack.id] = action.payload.rack;
      return newState;
    }
    case DELETE_RACK: {
      const newState = { ...state };
      newState.byId[action.payload.rack.id] = action.payload.rack;
      return newState;
    }
    default:
      return state;
  }
}
