// constants
const GET_SAMPLE = "sample/GET_POST";
const POST_SAMPLE = "sample/POST_SAMPLE";
const EDIT_SAMPLE = "sample/EDIT_SAMPLE";
const DELETE_SAMPLE = "sample/DELETE_SAMPLE";

// action creators
const get = (samples) => ({
  type: GET_SAMPLE,
  samples,
});

const post = (sample) => ({
  type: POST_SAMPLE,
  sample,
});

const edit = (sample) => ({
  type: EDIT_SAMPLE,
  sample,
});

const deleteAction = (sample) => ({
  type: DELETE_SAMPLE,
  sample,
});

// thunks
export const getSamples = () => async (dispatch) => {
  const response = await fetch("/api/samples");
  const data = await response.json();
  dispatch(get(data.samples));
  return data;
};

export const createSample = (data) => async (dispatch) => {
  const response = await fetch("/api/samples", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const newSample = await response.json();
    dispatch(post(newSample));
  }
};

export const editSample = (data) => async (dispatch) => {
  const response = await fetch(`/api/samples/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const editedSample = await response.json();
    dispatch(edit(editedSample));
  }
};

export const deleteSample = (data) => async (dispatch) => {
  const response = await fetch(`/api/samples/${data.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deletedSample = await response.json();
    dispatch(deleteAction(deletedSample));
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
      action.samples.forEach((sample) => {
        newState.byId[sample.id] = sample;
        if (!newState.allIds.includes(sample.id)) {
          newState.allIds.push(sample.id);
        }
      });
      return newState;
    }
    case POST_SAMPLE: {
      const newState = { ...state };
      newState.byId[action.sample.id] = action.sample;
      newState.allIds.push(action.sample.id);
      return newState;
    }
    case EDIT_SAMPLE: {
      const newState = { ...state };
      newState.byId[action.sample.id] = action.sample;
      return newState;
    }
    case DELETE_SAMPLE: {
      const newState = { ...state };
      newState.byId[action.sample.id] = action.sample;
      return newState;
    }
    default:
      return state;
  }
}
