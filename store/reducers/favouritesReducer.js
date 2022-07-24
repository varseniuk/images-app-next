const ADD_IMAGE = 'add';
const REMOVE_IMAGE = 'remove';
const CLEAR_ALL = 'clear';

export const favouritesActions = {
  addImage: (img) => {
    return {
      type: ADD_IMAGE,
      payload: img,
    };
  },

  removeImg: (imgId) => {
    return {
      type: REMOVE_IMAGE,
      payload: imgId,
    };
  },

  clearAll: () => {
    return {
      type: CLEAR_ALL,
    };
  },
};

export const favouritesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return [...state, action.payload];
    case REMOVE_IMAGE:
      return state.filter((img) => img.id !== action.payload);
    case CLEAR_ALL:
      return [];
    default:
      return state;
  }
};
