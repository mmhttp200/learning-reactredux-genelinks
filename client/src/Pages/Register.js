import {Col, Container, Row} from 'reactstrap';
import RegistrationForm from '../ComposedComponents/RegistrationForm';
import MainNavbar from '../ComposedComponents/MainNavbar';

export default function Register(props){
    return (
<Container>
    <Row>
        <Col xs="12">
            <MainNavbar />
        </Col>
    </Row>
    <Row>
        <Col xs="4" className="mx-auto">
            <RegistrationForm />
        </Col>
    </Row>
</Container>
    );
}