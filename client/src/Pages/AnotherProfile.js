import axios from 'axios';
import { set } from 'mongoose';
import {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {Col, Container, Row, Table} from 'reactstrap';
import MainNavbar from '../ComposedComponents/MainNavbar';

export default function AnotherProfile(props){

    const history = useHistory();
    const {nanoid} = useParams();
    const nanoidUpper = nanoid.toUpperCase();
    const [fullname, setFullname] = useState();
    const [genelinks, setGenelinks] = useState([]);

    useEffect(async ()=>{
        const regex_verification = /^[A-Z1-9]{10}$/.test(nanoidUpper);
        console.log(nanoidUpper)
        if(!regex_verification) history.push('/404');

        const profile = await axios.get(`/api/profile/profile-information/${nanoidUpper}`)
                        .then((data)=>data.data)
                        .catch(err=>({success: false, message:"Try again later. Internal error."}));

        console.log(profile)
        if(!profile.success) history.push('/404');
        
        setFullname(profile.fullname);
        setGenelinks(profile.genelinks);

    },[])
    

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
        <Col xs="4" className="mx-auto text-center">
          <Table>
            <thead>
                <tr>
                <th>Source</th>
                <th>Link / Code</th>
                </tr>
            </thead>
            <tbody>
                {genelinks.map((link)=>{
                    return (
                        <tr>
                        <td>{link.type}</td>
                        <td>{link.uri}</td>
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