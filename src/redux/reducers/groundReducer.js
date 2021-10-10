import { GET_FUTSAL_GROUNDS_START, GET_FUTSAL_GROUNDS_SUCCESS, GET_FUTSAL_GROUNDS_FAILURE } from '../constants';

const initial_state = {
  loading: false,
  list: [],
  error: '',
  ids:{}
};

export default function GroundReducer(state = initial_state, action) {
  let newState = JSON.parse(JSON.stringify(state)); //change newstate values and send it as normal,prevents mutation of state ;)

  switch (action.type) {
    case GET_FUTSAL_GROUNDS_START:
      newState.loading = true;
      newState.list = [];
      newState.error = '';
      newState.ids={};
      return newState;

    case GET_FUTSAL_GROUNDS_SUCCESS:
      newState.loading = false;
      newState.list = action.payload;
      newState.error = '';
      action.payload.map(ob=>newState.ids[ob._id]=ob)
      return newState;

    case GET_FUTSAL_GROUNDS_FAILURE:
      newState.loading = false;
      newState.list = [];
      newState.error = action.payload;
      newState.ids={};
      return newState;
      
    default:
      return state;
  }
}
