import { useState } from "react"
import MainColors from "../Assets/Colors/MainColors"
import { Row, Col, Container, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Button } from "reactstrap"
import SystemApi from "../Services/SystemApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function SystemCreate(props) {
    

    const [name, setName] = useState("");
    const [urlFront, setUrlFront] = useState("");
    const [framework, setFramework] = useState("");
    const [lang, setLang] = useState("");
    const systemApi = SystemApi.getInstance();
    const navigate = useNavigate();

    return <>
    
    <Container fluid>
        
        <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100Vh"}}>
            <Col md="3">
            
            </Col>
            <Col md="6">
                <h1 className="text-center" style={{color: MainColors.fourth}}>Cadastro de Sistema</h1>


                <Card style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                    <CardHeader>
                        Cadastro de Sistema
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Nome</Label>
                                <Input 
                                type="text"
                                id="name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="urlFront">URL Front</Label>
                                <Input 
                                type="text"
                                id="urlFront"
                                onChange={(e) => {
                                    setUrlFront(e.target.value);
                                }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Framework">Framewok</Label>
                                <Input 
                                type="text"
                                id="Framework"
                                onChange={(e) => {
                                    setFramework(e.target.value);
                                }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lang">Linguagem</Label>
                                <Input 
                                type="text"
                                id="lang"
                                onChange={(e) => {
                                    setLang(e.target.value);
                                }}
                                />
                            </FormGroup>
                            <FormGroup className="text-center">
                                <Button
                                    style={{
                                        color: MainColors.fourth,
                                        background: MainColors.primary
                                    }}
                                    onClick={async () => {

                                        const data = {
                                            name: name,
                                            urlFront: urlFront,
                                            framework: framework,
                                            lang: lang
                                        }

                                        await systemApi.createSystem(data).then((res) => {

                                            const dataRes = res.data;
    
                                            const event = dataRes?.event;

                                            if(!!event && event == "error")
                                            {
                                                Swal.fire(
                                                    'Erro!',
                                                    'Retorno da api: \n' + JSON.stringify(dataRes.message),
                                                    'error'
                                                ).then(() => {
                                                    return;
                                                })
                                                return;
                                            }
                                            else {
                                                Swal.fire('Pronto!', 'Sistema Criado com sucesso, retorno da api: ' + JSON.stringify(res), 'success').then(() => {
                                                
                                                    navigate('/home');
                                                })
                                            }
                                            
                                        });
                                    }}
                                >
                                    Cadastrar
                                </Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>

            </Col>
            <Col md="3">
            
            </Col>
        </Row>
    </Container>
    
    </>
}