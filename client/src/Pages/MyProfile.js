import axios from 'axios';
import {Fragment, useState} from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Button, Col, Container, Form, Row, Table} from 'reactstrap';
import LinkInput from '../BaseComponents/LinkInput';
import MainNavbar from '../ComposedComponents/MainNavbar';

export default function MyProfile(props){

    const profile = useSelector((data)=>data.session);
    const [fullname, setFullname] = useState(profile.fullname);
    const [genelinks, setGenelinks] = useState(profile.genelinks);
    const [nanoid, setNanoID] = useState(profile.nanoid);
    const history = useHistory();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const link_id = e.target.getAttribute('data-id');
        
            const result = await axios.delete('/api/link/delete-link',{data: {link_id}, headers: {'Content-Type': 'application/json', 'token': sessionStorage.getItem('token')}})
            .then((data)=>data)
            .catch(err=>({success: false}))
        
        if(result.data.success) return history.go(0);

    }

    return (
<Container>
    <Row xs="12">
        <Col>
            <MainNavbar />
        </Col>
    </Row>
    <Row>
        <Col xs="12" className="text-center">
        <h1>{fullname}</h1>
        </Col>
    </Row>
    <Row>
        <Col xs="12" className="text-center">
        <p className="p-2 border border-primary">
            <b>Your profile code:</b> {nanoid}
        </p>
        </Col>
    </Row>
    <Row>
        <Col xs="4" className="text-center mx-auto text-center">
        <LinkInput placeholder="The URL or code" />
        </Col>
    </Row>
    <br />
    <Row>
        <Col xs="4" className="mx-auto text-center">
          <Table>
            <thead>
                <tr>
                <th>Source</th>
                <th>Link / Code</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {genelinks.map((link)=>{
                    return (
                        <tr key={link._id.toString()}>
                        <td>{link.type}</td>
                        <td>{link.uri}</td>
                        <td><Form onSubmit={(e)=>handleSubmit(e)} data-id={link._id}><Button>Delete</Button></Form></td>
                        </tr>
                    );
                })}
                
            </tbody>
            </Table>
        </Col>
    </Row>
</Container>
    );
}