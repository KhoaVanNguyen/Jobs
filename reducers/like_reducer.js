import { LIKE_JOB, RESET_JOB  } from '../actions/type'
import _ from 'lodash'

export default ( state = [], action  ) => {
    switch (action.type) {
        case LIKE_JOB:
            return _.uniqBy( [
                action.payload, ...state
            ] , 'jobkey' )
        case RESET_JOB:
            return []
        default:
            return state
    }
}