import {
  GET_BOOKINGS_START,
  GET_BOOKINGS_SUCCESS,
  GET_BOOKINGS_FAILURE,
  RESET_BOOKING_LIST,
  GET_CURRENT_BOOKING
} from '../constants';

const initial_state = {
  loading: false,
  list: [],
  error: '',
  currentBooking: { _id: '',
   date: '',
     1: false,
     2: false,
     3: false,
     4: false,
     5: false,
     6: false,
     groundId: '' 
    }
};

export default function bookingReducer(state = initial_state, action) {
  let newState = JSON.parse(JSON.stringify(state)); //change newstate values and send it as normal,prevents mutation of state ;)

  switch (action.type) {
    case GET_BOOKINGS_START:
      newState.loading = true;
      newState.list = [];
      newState.error = '';

    case GET_BOOKINGS_SUCCESS:
      newState.loading = false;
      newState.list = action.payload;
      newState.error = '';
      return newState;

    case GET_BOOKINGS_FAILURE:
      newState.loading = false;
      newState.list = [];
      newState.error = action.payload;
      return newState;

    case RESET_BOOKING_LIST:
      newState.loading = false;
      newState.list = [];
      newState.error = '';
      return newState;

    case GET_CURRENT_BOOKING:
      return { ...state,currentBooking:{...state.currentBooking, ...action.payload }};
    default:
      return state;
  }
}
