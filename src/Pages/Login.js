import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";

import MainColors from "../Assets/Colors/MainColors";

import fonts from "../Assets/Fonts/Fonts";
import SignInApi from "../Services/SignInApi";
import UserDataService from "../Services/UserDataService";

export default function Login(props) {

    const {loggedIn, setLoggedIn} = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [childAccount, setChildAccount] = useState(false);
    const [systemId, setSystemId] = useState();
    const signInApi = SignInApi.getInstance();
    const userDataService = UserDataService.getInstance();

    const navigate = useNavigate();

    useEffect(() => {
        
        

        if(!!userDataService.isSessionExpired())
        {
            console.log("expirou!");
            userDataService.clearUser();
            setLoggedIn(false);
            
        }
        else{
            console.log("não expirou!");
            setLoggedIn(true);
            navigate('/home');
        }
        
    }, [])

    

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
                                onChange={(e) => {setEmail(e.target.value)}}
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
                                onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </FormGroup>

                            <FormGroup check>
                                <Input onChange={(e) => {setChildAccount(e.target.checked)}} type="checkbox" />
                                {' '}
                                <Label check>
                                Logar como Administrador
                                </Label>
                            </FormGroup>

                            { childAccount &&
                                <FormGroup>
                                    <Label for="systemId">
                                    ID do Sistema:
                                    </Label>
                                    <Input
                                    id="systemId"
                                    name="email"
                                    placeholder="ID do Sistema"
                                    type="number"
                                    onChange={(e) => {setSystemId(e.target.value)}}
                                    />
                                </FormGroup>
                            }

                            <Row className="text-center">
                                <Col>
                                    <Button  
                                    className="mt-1 mb-3" 
                                    style={{backgroundColor: MainColors.primary, color: MainColors.fourth}}
                                    onClick={async () => {

                                        const data = {
                                            email: email,
                                            password: password,
                                            systemId: systemId
                                        }
                                        console.log(data);
                                        await signInApi.login(data).then((response) => {
                                            if(response.status === "error")
                                            {  
                                                
                                                Swal.fire(
                                                    'Erro',
                                                    'Houve um Erro ao tentar fazer o Login <br/>' +
                                                    'Mensagem do servidor: ' + JSON.stringify(response.response),
                                                    'error'
                                                )
                                            }
                                            if(response.status === "success")
                                            {
                                                const event = response.response?.data?.event;
                                                const message = response.response?.data?.message;

                                                if(!event && !message)
                                                {
                                                    Swal.fire(
                                                        'Erro',
                                                        'Houve um Erro ao tentar fazer o Login <br/>' +
                                                        'Mensagem do servidor: ' + JSON.stringify(response.response),
                                                        'error'
                                                    ).then(() => {
                                                        return;
                                                    })
                                                }
                                                if(event === 'error')
                                                {
                                                    Swal.fire(
                                                        'Erro',
                                                        'Houve um Erro ao tentar fazer o Login <br/>' +
                                                        'Mensagem do servidor: ' + message,
                                                        'error'
                                                    ).then(() => {
                                                        return;
                                                    })
                                                }
                                                if(event === 'success')
                                                {
                                                    userDataService.saveUser(response.response.data.data);
                                                    setLoggedIn(true);
                                                    navigate('/home');
                                                }
                                            }
                                        })
                                    }}
                                    >
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