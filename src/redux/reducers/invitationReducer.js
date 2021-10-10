const initial_state = {
    invitation:[],
    outgoing:[]
}

export default function invitationReducer(state=initial_state,action) {
    let newState= JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'GET_MY_INVITATION':
        newState.invitation = action.payload;
        return newState;
        default:
        return state;
        
    }
}