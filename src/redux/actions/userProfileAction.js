import axios from "axios";
import * as userProfileConstrants from "./../constants/userProfileConstrants";
import {getInvitations} from './invitation';

export function getUserProfile(Username) {
    return dispatch => {
      dispatch({ type: userProfileConstrants.USER_PROFILE_REQUEST });

      axios({
          method: 'get',
          url: "http://localhost:3000/api/user/"+Username,
       
      })
        .then(response => {
           console.log(response);
            if(response.data && response.data.data.length>0) {
               
                dispatch({ type: userProfileConstrants.USER_PROFILE_SUCCESS, payload: response.data.data[0] });
                dispatch(getInvitations(response.data.data[0]._id));
            }
        })
        .catch(err => {
          console.log(err);
          dispatch({ type: userProfileConstrants.USER_PROFILE_FAILURE, payload: err });
        });
    };
  }