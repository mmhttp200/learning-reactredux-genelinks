import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';
import {useState} from 'react';
import EmailInput from '../BaseComponents/EmailInput';
import PasswordInput from '../BaseComponents/PasswordInput';
import { Link } from 'react-router-dom';

export default function RegistrationForm(props){

    const [fullname, setFullname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [re_password, setRePassword] = useState();
    const [result, setResult] = useState(false);
    const [message, setMessage] = useState();

    //Alerts after submition
    const [emailAlert, setEmailAlert] = useState();
    const [passwordAlert, setPasswordAlert] = useState();
    const [rePasswordAlert, setRePasswordAlert] = useState();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const password_regexp = /^([a-zA-Z0-9@*#]{8,15})$/;
        const email_regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!password_regexp.test(password)) {return setPasswordAlert('Your password can have between 8 and 15 alphanumeric characters (abc..., 123...).')} else {setPasswordAlert()};
        if(password != re_password) {return setRePasswordAlert('You wrote a different password.')} else {setRePasswordAlert()};
        if(!email_regexp.test(email)) {return setEmailAlert('Write a valid email.')} else {setEmailAlert()};
        
        const result = await axios.post('/api/account/create-new-account', {fullname, email, password, re_password}, {headers: {'Content-Type': 'application/json'}})
                                .then((data)=>data.data)
                                .catch((err)=>({success: false, message: "Try again later. Internal error."}));

        setResult(result.success);
        setMessage(result.message);

    }

    if(result){
        return (<h1 className="p-2 border border-success">Your account was created with success. <Link to="/login">Click here</Link> to do login.</h1>)
    }
    else{ return (
    <Form onSubmit={handleSubmit}>
        {message && <p className={result ? "p-2 border border-success" : "p-2 border border-warning"}><b>{message}</b></p>}
        <FormGroup>
        <Label for="fullname">Fullname:</Label>
        <Input required="true" name="fullname" id="fullname" placeholder="Your name and surname" value={fullname} onChange={(e)=>setFullname(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <EmailInput required="true" name="email" id="email" placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)} alert={emailAlert} />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <PasswordInput required="true" name="password" id="password" placeholder="Choose a password" value={password} onChange={(e)=>setPassword(e.target.value)} alert={passwordAlert} />
      </FormGroup>    
      <FormGroup>
        <Label for="re_password">Confirm your password</Label>
        <PasswordInput required="true" name="re_password" id="re_password" placeholder="Confirm the password" value={re_password} onChange={(e)=>setRePassword(e.target.value)} alert={rePasswordAlert} />
      </FormGroup>  
      <FormGroup check>
        <Label check>
          <Input type="checkbox" required />{' '}
          Check me out
        </Label>
      </FormGroup>
      <Button>Confirm registration</Button>
    </Form>
    )}
}