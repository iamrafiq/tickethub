import  axios from "axios";
const LandingPage = ({currentUser})=>{
    //axios.get('/api/users/currentuser');
    console.log({currentUser})
    return "hello"
}
LandingPage.getInitialProps = async () =>{
    if (typeof window === 'undefined'){
        console.log("getInitialProps I am on the server");
        // we are on the server 
        // request should be mand to ingress
       // http://ingress-nginx.kube-system.svc.cluster.local
       const {data} = await axios.get('http://ingress-nginx-controller.kube-system.svc.cluster.local/api/users/currentuser', {
           headers:{
               host: 'ticketing.com'
           }
        });
       return data;
        return {}
    }else{
        console.log("getInitialProps I am on the browser");

        //we are on the browser
        // request can be made with a base url of '
        const {data} = await axios.get('/api/users/currentuser');
        return data;
    }
}
export default LandingPage;