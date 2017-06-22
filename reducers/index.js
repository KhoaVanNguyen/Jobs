import { combineReducers } from 'redux'
import auth from './auth_reducer'
import job from './job_reducer'
export default combineReducers({
    auth,
    job
})