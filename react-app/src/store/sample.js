// constants
const GET_SAMPLE = "sample/GET_POST";
const POST_SAMPLE = "sample/POST_SAMPLE";
const EDIT_SAMPLE = "sample/EDIT_SAMPLE";
const DELETE_SAMPLE = "sample/DELETE_SAMPLE";

// action creators
const get = (payload) => ({
  type: GET_SAMPLE,
  payload,
});

const post = (payload) => ({
  type: POST_SAMPLE,
  payload,
});

const edit = (payload) => ({
  type: EDIT_SAMPLE,
  payload,
});

const deleteAction = (payload) => ({
  type: DELETE_SAMPLE,
  payload,
});

// thunks
export const getSamples = () => async (dispatch) => {
  const response = await fetch("/api/samples/");
  if (response.ok) {
    const data = await response.json();
    dispatch(get(data.samples));
    return data;
  }
};

export const createSample = (data) => async (dispatch) => {
  const response = await fetch("/api/samples/", {
    method: "POST",
    body: data,
  });

  try {
    const newSample = await response.json();
    if (response.ok) dispatch(post(newSample));
    return newSample;
  } catch (e) {
    return e;
  }
};

export const editSample = (data) => async (dispatch) => {
  const response = await fetch(`/api/samples/${data.id}`, {
    method: "PATCH",
    body: data.formData,
  });

  try {
    const editedSample = await response.json();
    if (response.ok) dispatch(edit(editedSample));
    return editedSample;
  } catch (e) {
    return e;
  }
};

export const deleteSample = (data) => async (dispatch) => {
  const response = await fetch(`/api/samples/${data.id}`, {
    method: "DELETE",
  });
  
  try {
    const deletedSample = await response.json();
    if (response.ok) dispatch(deleteAction(deletedSample.sample));
    return deletedSample;
  } catch (e) {
    return e;
  }
};

const initialState = {
  byId: {},
  allIds: [],
};
// samples: {
//   byId: {
//     "sample1": {},
//     "sample2": {},
//   },
//   allIds: ["sample1", "sample2"]
// }

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SAMPLE: {
      const newState = { ...state };
      action.payload.forEach((sample) => {
        newState.byId[sample.id] = sample;
        if (!newState.allIds.includes(sample.id)) {
          newState.allIds.push(sample.id);
        }
      });
      return newState;
    }
    case POST_SAMPLE: {
      const newState = { ...state };
      newState.byId[action.payload.sample.id] = action.payload.sample;
      newState.allIds.push(action.payload.sample.id);
      return newState;
    }
    case EDIT_SAMPLE: {
      const newState = { ...state };
      newState.byId[action.payload.sample.id] = action.payload.sample;
      return newState;
    }
    case DELETE_SAMPLE: {
      const newState = { ...state };
      newState.byId[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
