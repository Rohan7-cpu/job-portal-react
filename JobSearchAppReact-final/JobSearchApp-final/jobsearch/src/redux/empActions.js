// actions/empActions.js
export const sendEmpDataToMongo = (data) => async (dispatch) => {
    try {
      // Perform API call to send employer data to MongoDB
      const response = await fetch('http://localhost:5000/Emp/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      // Handle response if needed
  
      // Dispatch action on successful data submission
      dispatch({ type: 'EMP_DATA_SUBMITTED_SUCCESSFULLY', payload: response });
    } catch (error) {
      // Handle errors
      dispatch({ type: 'EMP_DATA_SUBMISSION_FAILED', payload: error.message });
    }
  };
  