import axios from 'axios';
import { GET_FUTSAL_GROUNDS_START, GET_FUTSAL_GROUNDS_SUCCESS, GET_FUTSAL_GROUNDS_FAILURE } from '../constants';

export function getAllGrounds() {
  return dispatch => {
    dispatch({ type: GET_FUTSAL_GROUNDS_START });
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/grounds'
    })
      .then(response => {
        console.log(response);
        if(response.data){
        dispatch({ type: GET_FUTSAL_GROUNDS_SUCCESS, payload: response.data });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_FUTSAL_GROUNDS_FAILURE, payload: err });
      });
  };
}
