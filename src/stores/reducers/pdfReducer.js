const initialState = {
  pdf: {},
};

const pdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'pdf/setPdf':
      return {
        ...initialState,
        pdf: {
          schemas: [],
          basePdf: action.payload,
        },
      };
    default:
      return state;
  }
};

export default pdfReducer;
