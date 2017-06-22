import axios from 'axios'

export const fetchJobs = () => {
    let url = 'http://api.indeed.com/ads/apisearch?publisher=2771142258014455&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json'

    axios.get(url).then( response => {
        console.log(response)
    })

}