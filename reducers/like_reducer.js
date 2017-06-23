import { LIKE_JOB } from '../actions/type'
import _ from 'lodash'

export default ( state = [], action  ) => {
    switch (action.type) {
        case LIKE_JOB:
            return _uniqBy( [
                action.payload, ...state
            ] , 'jobkey' )
        default:
            return state
    }
}