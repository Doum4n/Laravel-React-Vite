import { Container, Row, Col } from "react-bootstrap"
import { Image, Form } from "react-bootstrap";

const Comment = ({ImageSrc, nameUser, comment}) => {
    return (
        <Container className="mb-3">
            <Row>
                <Col xs="auto">
                    <Image src={ImageSrc} roundedCircle style={{ width: '50px', height: '50px' }} />
                </Col>
                <Col>
                    {nameUser}
                    <Form className="mt-1">
                        <Form.Control as="textarea" rows={3} disabled value={comment} />
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Comment