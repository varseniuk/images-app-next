const SAVE_RESULTS = 'saveResults';
const CLEAR_RESULTS = 'clearResults';

export const searchResultsActions = {
  saveResults: (query, results) => {
    return {
      type: SAVE_RESULTS,
      payload: {
        query,
        results,
      },
    };
  },

  clearResults: () => {
    return {
      type: CLEAR_RESULTS,
    };
  },
};

export const searchResultsReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_RESULTS:
      return action.payload;
    case CLEAR_RESULTS:
      return {};
    default:
      return state;
  }
};
