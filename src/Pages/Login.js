import { 
    Container, 
    Row, 
    Col,
    Form,
    FormGroup,
    Input, 
    Label,
    Button
} from "reactstrap";

export default function Login() {


    return <>

        <Container fluid>
        
        <Row style={{backgroundColor: "#a162f7", color: "#fefff1", height: "100vh"}}>

            <Col md="3">

            </Col>
            <Col md="6">
                <Row>
                    <Col className="text-center mt-3" xl="12">
                    
                        <h3 style={{fontFamily: "Muli", fontWeight: '700'}}>Bem Vindo ao CRUD Generator!</h3>
                    </Col>
                </Row>

                <Row className="mt-4 mb-4" style={{backgroundColor: "#fefff1", color: "black", borderRadius: "5px"}}>

                    <Col className="mt-3" xl="12">
                        <Row>
                            <Col className="text-center" xl="12">
                                <h4 style={{fontFamily: "Muli", fontWeight: '700'}}>Faça seu login aqui!</h4>
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col xl="12">
                        <Form style={{fontFamily: "Muli"}}>
                            <FormGroup>
                                <Label for="exampleEmail">
                                Email
                                </Label>
                                <Input
                                id="exampleEmail"
                                name="email"
                                placeholder="Email"
                                type="email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">
                                Senha
                                </Label>
                                <Input
                                id="examplePassword"
                                name="password"
                                placeholder="Senha"
                                type="password"
                                />
                            </FormGroup>

                            <Row className="text-center">
                                <Col>
                                    <Button  className="mt-1 mb-3" style={{backgroundColor: "#a162f7", color: "#fefff1"}}>
                                        Login
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Form>
                    </Col>

                    
                </Row>
            </Col>

            <Col md="3">

            </Col>

            </Row>
        
        
        </Container>
        
        
       
    
    </>
}