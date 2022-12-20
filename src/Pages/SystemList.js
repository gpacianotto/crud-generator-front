import MainColors from "../Assets/Colors/MainColors"
import { Row, Col, Container } from "reactstrap"


export default function SystemList(props) {
    


    return <>
    
    <Container fluid>
        
        <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100Vh"}}>
            <Col md="3">
            
            </Col>
            <Col md="6">
                <h1 className="text-center" style={{color: MainColors.fourth}}>Lista de Sistemas</h1>

            </Col>
            <Col md="3">
            
            </Col>
        </Row>
    </Container>
    
    </>
}