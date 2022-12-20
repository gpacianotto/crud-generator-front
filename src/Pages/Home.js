import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Container, 
    Row, 
    Col,
    Form,
    FormGroup,
    Input, 
    Label,
    Button,
    Card,
    CardBody,
    CardHeader
} from "reactstrap";
import MainColors from "../Assets/Colors/MainColors";

import fonts from "../Assets/Fonts/Fonts";
import UserDataService from "../Services/UserDataService";
export default function Home() {

    const userDataService = UserDataService.getInstance();

    const info = userDataService.loadUser();

    const navigate = useNavigate();

    useEffect(() => {
        if(!!userDataService.isSessionExpired())
        {
            console.log("expirou!");
            userDataService.clearUser();
            navigate('/');
            
        }
        
    }, [])

    return <>
    
        <Container fluid>
        
            <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100%"}}>
                <Col md="3">
                </Col>
                <Col md="6">
                    <h1>HOME</h1>

                    <Card style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                        <CardHeader>
                            Dados do Usuário
                        </CardHeader>
                        <CardBody>
                            <h6>Usuário: {info?.user?.email}</h6>
                            <h6>ID: {info?.user?.userId}</h6>
                            <h6>Criado Em: {new Date(info?.user?.createdAt).toString()}</h6>
                        </CardBody>
                    </Card>

                    <Card className="mt-3" style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                        <CardHeader>
                            Dados da Conta
                        </CardHeader>
                        <CardBody>
                            <h6>ID: {info?.account?.accountId}</h6>
                            <h6>UID: {info?.account?.accountUid}</h6>
                            <h6>Tipo: {info?.account?.role}</h6>
                            <h6>Criado Em: {new Date(info?.account?.createdAt).toString()}</h6>
                        </CardBody>
                    </Card>
                    
                    <Card className="mt-3 mb-3" style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                        <CardHeader>
                            Sistema
                        </CardHeader>
                        <CardBody>
                            <small style={{color: "red"}}>*Dados do Sistema que a Conta faz parte</small>
                            <h6>ID: {info?.system?.systemId}</h6>
                            <h6>UID: {info?.system?.uid}</h6>
                            <h6>Nome: {info?.system?.name}</h6>
                            <h6>Token: {info?.system?.systemToken}</h6>
                            <h6>Linguagem: {info?.system?.lang}</h6>
                            <h6>Framework: {info?.system?.framework}</h6>
                            <h6>URL Backend: {info?.system?.urlBack}</h6>
                            <h6>URL Frontend: {info?.system?.urlFront}</h6>
                            <h6>Criado Em: {new Date(info?.system?.createdAt).toString()}</h6>
                        </CardBody>
                    </Card>

                </Col>
                <Col md="3">
                </Col>

                
            </Row>
        </Container>
    </>
}