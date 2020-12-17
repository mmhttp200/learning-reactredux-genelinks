import {Fragment, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Col, Container, Row} from 'reactstrap';
import MainNavbar from '../ComposedComponents/MainNavbar';

export default function Logout(props){

    const history = useHistory();
    const dispatch = useDispatch();
    const session_close = ()=>dispatch({type: "SESSION_CLOSE"});

    useEffect(()=>{
        sessionStorage.removeItem('token');
        session_close();
        history.push('/login');
    })

    return (
<Container>
    <Row>
        <Col xs="12">
            <MainNavbar />
        </Col>
    </Row>
</Container>
    );
}