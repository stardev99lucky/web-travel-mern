import {Container, Row, Col} from 'react-bootstrap';

const FormContainer = ({children}) => {
    return (
        <Container>
            <Row className = 'justify-content-start'>
                <Col xs={12} md={12}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer;