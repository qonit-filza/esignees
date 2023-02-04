const initialState = {
  pdf: {},
  originalName: '',
};

const pdfReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'pdf/setPdf':
      return {
        ...state,
        pdf: {
          schemas: [],
          basePdf: action.payload,
        },
      };
    case 'pdf/setOriginalName':
      return {
        ...state,
        originalName: action.payload,
      };
    default:
      return state;
  }
};

export default pdfReducer;
