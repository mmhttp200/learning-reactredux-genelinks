import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Form, Input, Button, Label} from 'reactstrap';

export default function LinkInput(props){

    const [typesOfLinks, setTypes] = useState([]);
    const [currentType, setCurrentType] = useState();
    const [uri, setURI] = useState();
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState();
    const history = useHistory();


    const handleSubmit = async (e)=>{
        e.preventDefault();

        

        if(currentType!=undefined){
            const regex = new RegExp(typesOfLinks[currentType].regex, 'g');
            const result = regex.test(uri);
            if(!result){
                setSuccess(false);
                return setMessage(typesOfLinks[currentType].description)
            };

            const resultCreation = await axios.post('/api/link/create-new-link', {link_type: typesOfLinks[currentType].name, link_uri: uri}, {headers: {'Content-Type':'application/json', 'token': sessionStorage.getItem('token')}})
                                        .then(data=>data.data)
                                        .catch(err=>({success: false, message: "Internal Error. Try later."}));
                
            if(resultCreation.success) return history.go(0);

                setSuccess(resultCreation.success);
                setMessage(resultCreation.message);
                setURI('');
                
                return;
            

        }

        setSuccess(false);
        setMessage('Select a type.');

    };


    useEffect(async ()=>{

        const result = await axios.post('/api/link/types-of-links', {}, {headers: {'Content-Type': 'application/json', 'token': sessionStorage.getItem('token')}})
                            .then((data)=>data)
                            .catch((err)=>err);

                        
        await setTypes(result.data.data);
    
    }, [])

    return (
        <Form onSubmit={handleSubmit}>
        {message && <p className={success ? "p-2 border border-success" : "p-2 border border-danger"}>{message}</p>}
        <Label for="type">Type:</Label>
        
        <Input type="select" name="type" id="type" onChange={(e)=>setCurrentType(e.target.value)}>
            <option value="none" selected disabled hidden key="none">Choose one option below</option>
          {typesOfLinks.map((item, index)=>{
              return <option value={index.toString()} key={index.toString()}>{item.name}</option>
          })}
        </Input>
        <Input type="text" {...props} value={uri} onChange={(e)=>setURI(e.target.value)} required="true" /><Button>Add</Button>
        </Form>
    );
}