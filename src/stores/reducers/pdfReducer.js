const initialState = {
  pdf: {}, //on upload
  originalName: '', // on upload
  signedPdf: {}, //after user sign
  replyDocument: {},
  documentDetail: {},
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
    case 'pdf/setSignedPdf':
      return {
        ...state,
        signedPdf: action.payload,
      };
    case 'pdf/setReplyDocument':
      return {
        ...state,
        replyDocument: action.payload,
      };
    case 'pdf/setDocumentDetail':
      return {
        ...state,
        documentDetail: action.payload,
      };
    default:
      return state;
  }
};

export default pdfReducer;
