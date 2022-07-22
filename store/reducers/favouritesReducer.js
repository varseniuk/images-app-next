export const favouritesActions = {
  addImage: (img) => {
    return {
      type: 'add',
      payload: img,
    };
  },

  removeImg: (imgId) => {
    return {
      type: 'remove',
      payload: imgId,
    };
  },

  clearAll: () => {
    return {
      type: 'clear',
    };
  },
};

export const favouritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'remove':
      return state.filter((img) => img.id !== action.payload);
    case 'clear':
      return [];
    default:
      return state;
  }
};
