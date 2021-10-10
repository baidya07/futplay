import axios from 'axios';

export function getInvitations(receiverId) {
    return dispatch => {
        axios({url:'http://localhost:3000/api/invite/'+receiverId, method:'get'})
        .then((response)=>{
            if(response.data){
                dispatch({type: 'GET_MY_INVITATION',payload: response.data})
            }
        }).catch((err)=>console.log(err))
    }
}

