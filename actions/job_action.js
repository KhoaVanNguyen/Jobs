import axios from 'axios'
import reverseGeocode from 'latlng-to-zip'
import qs from 'qs'
import { FETCH_JOBS_SUCCESS, 
         LIKE_JOB,
         RESET_JOB
 } from './type'

const ROOT_QUERY_URL = 'http://api.indeed.com/ads/apisearch?'
const JOB_QUERY_PARAMS = {
    publisher: '2771142258014455',
    format: 'json',
    q: 'javascript',
    radius: 100,
    v: '2',
    latlong: 1
}

const buildQueryUrl = (zip,job) => {
    let query = qs.stringify( { ...JOB_QUERY_PARAMS, l: zip, q: job  } )
    
    console.log('url: \n')
    console.log(`${ROOT_QUERY_URL}${query}`)
    return `${ROOT_QUERY_URL}${query}`
}
export const fetchJobs = (region, job, onSuccess) => async (dispatch) =>   {
    // let url = 'http://api.indeed.com/ads/apisearch?publisher=2771142258014455&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json'
    // axios.get(url).then( response => {
    //     console.log(response)
    // })


    try {
      let zipcode = await reverseGeocode(region)
      const url = buildQueryUrl(zipcode,job)     
      let { data } = await axios.get(url)
      // try payload with payloadsss
      console.log({ data })
      console.log({ })
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data  })
      onSuccess()
    } catch(e) {
        console.log('error: \n')
        console.log(e)
    }
}
export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    }
}
export const resetJob = (onSuccess) => {
    onSuccess()
    return {
        type: RESET_JOB,
    }
    
}