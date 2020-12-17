import {Fragment} from 'react';
import {Col, Container, Row} from 'reactstrap';
import MainNavbar from '../ComposedComponents/MainNavbar';

export default function Profile(props){
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