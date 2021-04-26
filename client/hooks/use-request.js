import axios from "axios";
import { useState } from "react";
export default ({url, method, body, onSuccess})=>{
    const [errors, setErrors] = useState(null);

    const doRequest = async () =>{
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            console.log("signout res", response)
            if (onSuccess){
                onSuccess(response.data);
            }
        } catch (error) {
            console.log("signout err", error)

            setErrors(<div className="apert alert-danger">
            <h4>Ooops....</h4>
            <ul className="my-0">
            {error.response.data.errors.map(err=><li key={err.message}>{err.message}</li>)}
            </ul>
            </div>)
        }
    };

    return {doRequest, errors}
}