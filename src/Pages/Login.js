import { Link } from "react-router-dom";
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

import MainColors from "../Assets/Colors/MainColors";

import fonts from "../Assets/Fonts/Fonts";

export default function Login() {


    return <>

        <Container fluid>
        
        <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100vh"}}>

            <Col md="4">

            </Col>
            <Col md="4">
                <Row>
                    <Col className="text-center mt-3" xl="12">
                    
                        <h3 style={{fontFamily: fonts.title, fontWeight: '700'}}>Bem Vindo ao CRUD Generator!</h3>
                    </Col>
                </Row>

                <Row className="mt-4 mb-4" style={{backgroundColor: MainColors.fourth, color: "black", borderRadius: "5px"}}>

                    <Col className="mt-3" xl="12">
                        <Row>
                            <Col className="text-center" xl="12">
                                <h4 style={{fontFamily: fonts.title, fontWeight: '700'}}>Faça seu login aqui!</h4>
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col xl="12">
                        <Form style={{fontFamily: fonts.title}}>
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
                                    <Button  className="mt-1 mb-3" style={{backgroundColor: MainColors.primary, color: MainColors.fourth}}>
                                        Login
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Form>
                    </Col>

                    
                </Row>

                <Row>
                    <Col className="text-end" xl="12" >
                        <Link to="/sign-up"style={{color: MainColors.fourth}} >Crie sua Conta!</Link>
                    </Col>
                </Row>
            </Col>

            <Col md="4">

            </Col>

            </Row>
        
        
        </Container>
        
        
       
    
    </>
}