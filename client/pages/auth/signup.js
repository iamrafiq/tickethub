import {useState} from 'react';
import Router from 'next/router';
import useRequest from "../../hooks/use-request";
const  Signup=  () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {doRequest, errors} = useRequest({
        url:'/api/users/signup', 
        method:'post', 
        body:{
            email, 
            password
        },
        onSuccess:(data)=>{
            Router.push('/');
        }
    })
    const onSubmit = async(event)=>{
       event.preventDefault();
       await doRequest();
    }
    return <form onSubmit = {onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
            <lable>Email Address</lable>
            <input value = {email} onChange={(e)=>setEmail(e.target.value)} type="text" className="from-control"/>
        </div>
        <div className="form-group">
            <lable>Password</lable>
            <input value = {password} onChange = {(e)=>setPassword(e.target.value)} type="password" className="from-control"/>
        </div>
      { errors}
        <button className="btn btn-primary">Sign Up</button>
    </form>
}

export default Signup