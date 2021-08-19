// constants
const GET_FREEZERS = "freezer/GET_FREEZERS";
const POST_FREEZER = "freezer/POST_FREEZER";
const EDIT_FREEZER = "freezer/EDIT_FREEZER";
const DELETE_FREEZER = "freezer/DELETE_FREEZER";

// action creators
const get = (payload) => ({
  type: GET_FREEZERS,
  payload,
});

const post = (payload) => ({
  type: POST_FREEZER,
  payload,
});

const edit = (payload) => ({
  type: EDIT_FREEZER,
  payload,
});

const deleteAction = (payload) => ({
  type: DELETE_FREEZER,
  payload,
});

// thunks
export const getFreezers = () => async (dispatch) => {
  const res = await fetch("/api/freezers/");
  const data = await res.json();
  if (res.ok) {
    dispatch(get(data));
    return data;
  }
};

export const createFreezer = (data) => async (dispatch) => {
  const res = await fetch("/api/freezers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const newFreezer = await res.json();
    dispatch(post(newFreezer));
    return newFreezer;
  }
};

export const editFreezer = (data) => async (dispatch) => {
  const res = await fetch(`/api/freezers/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const editedFreezer = await res.json();
    if (res.ok) dispatch(edit(editedFreezer));
    return editedFreezer;
  } catch (e) {
    return e;
  }
};

export const deleteFreezer = (data) => async (dispatch) => {
  const res = await fetch(`/api/freezers/${data.id}`, {
    method: "DELETE",
  });

  try {
    const deletedFreezer = await res.json();
    if (res.ok) dispatch(deleteAction(deletedFreezer));
    return deletedFreezer;
  } catch (e) {
    return e;
  }
};

const initialState = {
  byId: {},
  allIds: [],
};
// freezers: {
//   byId: {
//     "freezer1": {},
//     "freezer2": {},
//   },
//   allIds: ["freezer1", "freezer2"]
// }

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_FREEZERS: {
      const newState = { ...state };
      action.payload.freezers.forEach((freezer) => {
        newState.byId[freezer.id] = freezer;
        if (!newState.allIds.includes(freezer.id)) {
          newState.allIds.push(freezer.id);
        }
      });
      return newState;
    }
    case POST_FREEZER: {
      const newState = { ...state };
      newState.byId[action.payload.freezer.id] = action.payload.freezer;
      newState.allIds.push(action.payload.freezer.id);
      return newState;
    }
    case EDIT_FREEZER: {
      const newState = { ...state };
      newState.byId[action.payload.freezer.id] = action.payload.freezer;
      return newState;
    }
    case DELETE_FREEZER: {
      const newState = { ...state };
      newState.byId[action.payload.freezer.id] = action.payload.freezer;
      return newState;
    }
    default:
      return state;
  }
}
