import {
  GET_BOOKINGS_START,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_FAILURE,
  RESET_BOOKING_LIST,
  GET_CURRENT_BOOKING
} from '../constants';
import axios from 'axios';

export function getUserBookings(userId) {
  return dispatch => {
    dispatch({ type: GET_BOOKINGS_START });

    axios({
      method: 'get',
      url: 'http://localhost:3000/api/booking/' + userId
    })
      .then(response => {
        dispatch({ type: GET_BOOKINGS_SUCCESS, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_BOOKINGS_FAILURE, payload: err });
      });
  };
}

export function getFilteredBookings(groundId, date) {
  return dispatch => {
    dispatch({ type: GET_BOOKINGS_START });

    axios({
      method: 'get',
      url: 'http://localhost:3000/api/booking/' + groundId + '/' + date
    })
      .then(response => {
        dispatch({ type: GET_BOOKINGS_SUCCESS, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_BOOKINGS_FAILURE, payload: err });
      });
  };
}

export function resetBookingList() {
  return dispatch => dispatch({ type: RESET_BOOKING_LIST });
}

export function deleteBooking(id, userid) {
  return dispatch => {
    axios({ method: 'delete', url: 'http://localhost:3000/api/booking/' + id }).then(() =>
      dispatch(getUserBookings(userid))
    );
  };
}

export function getAvailability(groundId, date) {
  return dispatch => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/booking/' + groundId + '/' + date
    })
      .then(response => {
        dispatch({
          type: GET_CURRENT_BOOKING,
          payload: response.data
            ? response.data
            : {
                _id: '',
                date: '',
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                groundId: ''
              }
        });
      })
      .catch(err => {});
  };
}
