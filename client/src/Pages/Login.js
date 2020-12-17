import LoginForm from '../ComposedComponents/LoginForm';
import {Col, Container, Row} from 'reactstrap';
import MainNavbar from '../ComposedComponents/MainNavbar';

export default function Login(props){
    return (
<Container>
    <Row>
        <Col xs="12">
            <MainNavbar />
        </Col>
    </Row>
    <Row>
        <Col xs="4" className="mx-auto">
            <LoginForm />
        </Col>
    </Row>
</Container>
    );
}