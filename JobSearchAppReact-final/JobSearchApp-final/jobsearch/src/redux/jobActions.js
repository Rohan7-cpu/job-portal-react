
import axios from 'axios';

export const submitJobData = (formData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/Job/create', formData);
      console.log('Server response:', response.data);
      
      // Dispatch an action on successful submission if needed
      // dispatch({ type: 'JOB_SUBMITTED', payload: response.data });

    } catch (error) {
      console.error('Error submitting form:', error);
      // Dispatch an action on error if needed
      // dispatch({ type: 'SUBMISSION_ERROR', payload: error });
    }
  };
};
