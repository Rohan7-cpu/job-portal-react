const initialState = {
  jobSeeker: {
    dataSent: false,
    loading: false,
    error: null,
  },
  employer: {
    loading: false,
    error: null,
  },
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DATA_SENT_SUCCESS':
      return {
        ...state,
        jobSeeker: {
          ...state.jobSeeker,
          dataSent: true,
          error: null,
        },
      };
    case 'DATA_SENT_FAILURE':
      return {
        ...state,
        jobSeeker: {
          ...state.jobSeeker,
          dataSent: false,
          error: action.payload,
        },
      };
    case 'EMP_DATA_SUBMITTED_SUCCESSFULLY':
      return {
        ...state,
        employer: {
          ...state.employer,
          loading: false,
          error: null,
          // Handle success if needed
        },
      };
    case 'EMP_DATA_SUBMISSION_FAILED':
      return {
        ...state,
        employer: {
          ...state.employer,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};

export default dataReducer;
