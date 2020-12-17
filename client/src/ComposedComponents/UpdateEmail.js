import axios from "axios";
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, FormGroup } from "reactstrap";
import EmailInput from '../BaseComponents/EmailInput';

export default function UpdateEmail(props){

    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();
    const dispatch = useDispatch();
    const update_email = (email)=>dispatch({type: 'UPDATE_EMAIL', email})

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const result = await axios.patch('/api/account/update-email', {new_email: email}, {headers: {'Content-Type': 'application/json', 'token': sessionStorage.getItem('token')}})
                            .then((data)=>data)
                            .catch((err)=>err);


        if(result.data.success){
            setSuccess(true)
            setMessage(result.data.message)
            update_email(email);
        }else{
            setMessage(result.data.message);
        }
        

    }

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
            {message && <p className={(success) ? "p-2 border border-success" : "p-2 border border-danger"}>{message}</p>}
            <FormGroup>
            <EmailInput {...props} value={email} onChange={(e)=>setEmail(e.target.value)} />
            </FormGroup>
            <Button>Update Email</Button>
            </Form>
        </Fragment>
    )
}