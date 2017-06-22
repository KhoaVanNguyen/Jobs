import { FETCH_JOBS_SUCCESS  } from '../actions/type'

export default ( state = { }, action ) => {
    switch (action) {
        case FETCH_JOBS_SUCCESS:
            return state
            break;
        default:
            return state
            break;
    }
}