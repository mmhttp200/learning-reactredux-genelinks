import {Col, Container, Row, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import MainNavbar from '../ComposedComponents/MainNavbar';

export default function Home(props){
    return (
<Container>
    <Row>
        <Col xs="12">
            <MainNavbar />
        </Col>
    </Row>
    <Row>
        <Col xs="12" className="home-message">
            <h1>
                Share your genetic and genealogic links with the world.<br />
                <Link to="/register">Click here</Link> to sign up for free.
            </h1>
        </Col>
    </Row>
</Container>
    );
}