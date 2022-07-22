export const actions = {
  addId: (id) => {
    return {
      type: 'addId',
      payload: img,
    };
  },

  removeId: (imgId) => {
    return {
      type: 'removeId',
      payload: imgId,
    };
  },

  clearAllIds: () => {
    return {
      type: 'clear',
    };
  },
};

export const favIdsReducer = (state = [], action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter((id) => id !== action.payload);
    case 'clear':
      return [];
    default:
      return state;
  }
};
