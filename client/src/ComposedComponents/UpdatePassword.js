import axios from "axios";
import { Fragment, useEffect, useState } from "react"
import { Button, Form, FormGroup } from "reactstrap";
import PasswordInput from '../BaseComponents/PasswordInput';

export default function UpdateEmail(props){

    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const result = await axios.patch('/api/account/update-password', {new_password: password}, {headers: {'Content-Type': 'application/json', 'token': sessionStorage.getItem('token')}})
                            .then((data)=>data)
                            .catch((err)=>err);

        console.log(result);

        if(result.data.success){
            setSuccess(true)
            setMessage(result.data.message)
        }else{
            setMessage(result.data.message);
        }
        

    }

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
            {message && <p className={(success) ? "p-2 border border-success" : "p-2 border border-danger"}>{message}</p>}
            <FormGroup>
            <PasswordInput {...props} value={password} onChange={(e)=>setPassword(e.target.value)} />
            </FormGroup>
            <Button>Update Password</Button>
            </Form>
        </Fragment>
    )
}