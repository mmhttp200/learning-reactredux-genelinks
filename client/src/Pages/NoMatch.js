import {Fragment} from 'react';
import {Col, Container, Row} from 'reactstrap';
import MainNavbar from '../ComposedComponents/MainNavbar';

export default function NoMatch(props){
    return (
<Container>
    <Row>
        <Col xs="12">
            <MainNavbar />
        </Col>
    </Row>
    <Row>
        <Col xs="12">
            <h1>Page not found.</h1>
        </Col>
    </Row>
</Container>
    );
}