import {Fragment, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Col, Container, Row} from 'reactstrap';
import MainNavbar from '../ComposedComponents/MainNavbar';
import UpdateEmail from '../ComposedComponents/UpdateEmail';
import UpdatePassword from '../ComposedComponents/UpdatePassword';

export default function EditAccount(props){
    const profile = useSelector((data)=>data.session);

    return (
<Container>
    <Row>
        <Col xs="12">
            <MainNavbar />
        </Col>
    </Row>
    <Row>
        <Col>
        <h1>Update your email:</h1>
        <p><b>Your current email:</b><br />
        <output>{profile.email}</output>
        </p>
        Write your new e-mail: <br />
        <UpdateEmail required="true" placeholder="Write your new email." />
        </Col>
    </Row>
    <Row>
        <Col>
        <h1>Update your password:</h1>
        Write your new password: <br />
        <UpdatePassword required="true" placeholder="Write your new password." />
        </Col>
    </Row>
</Container>
    );
}