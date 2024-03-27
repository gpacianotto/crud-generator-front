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
                            <b>Dados do Usuário</b>
                        </CardHeader>
                        <CardBody>
                            <h6><b>Usuário:</b> {info?.user?.email}</h6>
                            <h6><b>ID:</b> {info?.user?.userId}</h6>
                            <h6><b>Criado Em:</b> {new Date(info?.user?.createdAt).toString()}</h6>
                        </CardBody>
                    </Card>

                    <Card className="mt-3" style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                        <CardHeader>
                            <b>Dados da Conta</b>
                        </CardHeader>
                        <CardBody>
                            <h6><b>ID:</b> {info?.account?.accountId}</h6>
                            <h6><b>UID:</b> {info?.account?.accountUid}</h6>
                            <h6><b>Tipo:</b> {info?.account?.role}</h6>
                            <h6><b>Criado Em: </b>{new Date(info?.account?.createdAt).toString()}</h6>
                        </CardBody>
                    </Card>

                    <Card className="mt-3" style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                        <CardHeader>
                            <b>Dados da Sessão</b>
                        </CardHeader>
                        <CardBody>
                            <h6><b>ID:</b> {info?.session?.sessionId}</h6>
                            <h6><b>Token:</b> {info?.session?.token}</h6>
                            <h6><b>Criado Em:</b> {new Date(info?.session?.createdAt).toString()}</h6>
                            <h6><b>Usado Por Último em:</b> {new Date(info?.session?.lastUsed).toString()}</h6>
                            <h6><b>Expira em:</b> {new Date(info?.session?.expiresIn).toString()}</h6>
                        </CardBody>
                    </Card>
                    
                    <Card className="mt-3 mb-3" style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                        <CardHeader>
                            <b>Sistema</b>
                        </CardHeader>
                        <CardBody>
                            <small style={{color: "red"}}>*Dados do Sistema que a Conta pertence</small>
                            <h6><b>ID:</b> {info?.system?.systemId}</h6>
                            <h6><b>UID:</b> {info?.system?.uid}</h6>
                            <h6><b>Nome:</b> {info?.system?.name}</h6>
                            <h6><b>Token:</b> {info?.system?.systemToken}</h6>
                            <h6><b>Linguagem:</b> {info?.system?.lang}</h6>
                            <h6><b>Framework:</b> {info?.system?.framework}</h6>
                            <h6><b>URL Backend:</b> {info?.system?.urlBack}</h6>
                            <h6><b>URL Frontend:</b> {info?.system?.urlFront}</h6>
                            <h6><b>Criado Em:</b> {new Date(info?.system?.createdAt).toString()}</h6>
                        </CardBody>
                    </Card>

                </Col>
                <Col md="3">
                </Col>

                
            </Row>
        </Container>
    </>
}