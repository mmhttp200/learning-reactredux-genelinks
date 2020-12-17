import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';
import {useState} from 'react';
import EmailInput from '../BaseComponents/EmailInput';
import PasswordInput from '../BaseComponents/PasswordInput';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function LoginForm(props){

    const history = useHistory();
    const dispatch = useDispatch();
    const session_start = (data)=>dispatch({type: "SESSION_START", data});

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [result, setResult] = useState(false);
    const [message, setMessage] = useState();

    //Alerts after submition
    const [emailAlert, setEmailAlert] = useState();
    const [passwordAlert, setPasswordAlert] = useState();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const password_regexp = /^([a-zA-Z0-9@*#]{8,15})$/;
        const email_regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!password_regexp.test(password)) {return setPasswordAlert('Enter a valid password.')} else {setPasswordAlert()};
        //if(password != re_password) {return setRePasswordAlert('You wrote a different password.')} else {setRePasswordAlert()};
        if(!email_regexp.test(email)) {return setEmailAlert('Enter a valid email.')} else {setEmailAlert()};
        
        const result = await axios.post('/api/account/login', {email, password}, {headers: {'Content-Type': 'application/json'}})
                                .then((data)=>data.data)
                                .catch((err)=>({success: false, message: "Try again later. Internal error."}));

        if(result.success){
            sessionStorage.setItem('token', result.token);
            session_start(await result.data);
            history.push('/my-profile');
        }else{
            setResult(result.success);
            setMessage(result.message);
        }

    }

    if(result){
        return (<h1 className="p-2 border border-success">Your account was logged with success. <Link to="/my-profile">Click here</Link> to do see your profile.</h1>)
    }
    else{ return (
    <Form onSubmit={handleSubmit}>
        {message && <p className={result ? "p-2 border border-success" : "p-2 border border-warning"}><b>{message}</b></p>}
      <FormGroup>
        <Label for="email">Email</Label>
        <EmailInput required="true" name="email" id="email" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)} alert={emailAlert} />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <PasswordInput required="true" name="password" id="password" placeholder="Choose a password" value={password} onChange={(e)=>setPassword(e.target.value)} alert={passwordAlert} />
      </FormGroup>     
      <Button>Confirm registration</Button>
    </Form>
    )}
}