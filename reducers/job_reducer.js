import { FETCH_JOBS_SUCCESS  } from '../actions/type'


const INITIAL_STATE = {
    results: []
}

export default ( state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case FETCH_JOBS_SUCCESS:
            return action.payload
        default:
            return state
    }
}