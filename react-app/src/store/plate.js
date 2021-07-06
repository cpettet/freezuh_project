// constants
const GET_ALL_PLATES = "sample/GET_PLATES";
const POST_PLATE = "sample/POST_PLATE";
const EDIT_PLATE = "sample/EDIT_PLATE";
const DELETE_PLATE = "sample/DELETE_PLATE";

// action creators
const getAll = (payload) => ({
  type: GET_ALL_PLATES,
  payload,
});

const post = (payload) => ({
  type: POST_PLATE,
  payload,
});

const edit = (payload) => ({
  type: EDIT_PLATE,
  payload,
});

const deleteAction = (payload) => ({
  type: DELETE_PLATE,
  payload,
});

// thunks
export const getPlates = () => async (dispatch) => {
  const response = await fetch("/api/plates/");
  const data = await response.json();
  dispatch(getAll(data.plates));
  return data;
};

export const createPlate = (data) => async (dispatch) => {
  const response = await fetch("/api/plates/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const newPlate = await response.json();
    dispatch(post(newPlate));
    return newPlate;
  }
};

export const editPlate = (data) => async (dispatch) => {
  const response = await fetch(`/api/plates/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const editedPlate = await response.json();
    dispatch(edit(editedPlate));
    return editedPlate;
  }
};

export const deletePlate = (data) => async (dispatch) => {
  const response = await fetch(`/api/plates/${data.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedPlate = await response.json();
    dispatch(deleteAction(deletedPlate));
    return deletedPlate;
  }
};

const initialState = {
  byId: {},
  allIds: [],
};
// plates: {
//   byId: {
//     "plate1": {},
//     "plate2": {},
//   },
//   allIds: ["plate1", "plate2"]
// }

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PLATES: {
      const newState = { ...state };
      action.payload.forEach((plate) => {
        newState.byId[plate.id] = plate;
        if (!newState.allIds.includes(plate.id)) {
          newState.allIds.push(plate.id);
        }
      });
      return newState;
    }
    case POST_PLATE: {
      const newState = { ...state };
      newState.byId[action.payload.plate.id] = action.payload.plate;
      newState.allIds.push(action.payload.plate.id);
      return newState;
    }
    case EDIT_PLATE: {
      const newState = { ...state };
      newState.byId[action.payload.plate.id] = action.payload.plate;
      return newState;
    }
    case DELETE_PLATE: {
      const newState = { ...state };
      newState.byId[action.payload.plate.id] = action.payload.plate;
      return newState;
    }
    default:
      return state;
  }
}
