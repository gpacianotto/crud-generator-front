import { useState } from "react";
import { Col, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Swal from "sweetalert2";
import MainColors from "../Assets/Colors/MainColors";
import fonts from "../Assets/Fonts/Fonts";
import newAccount from "../Services/SignUpApi";


export default function SignUp(props) {
    
    const [email, setEmail] = useState("");
    const [type, setType] = useState("root");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [systemToken, setSystemToken] = useState("");


    return <>
    
        <Row style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100vh", width:"100%"}}>
            <Col xl="3">
            
            </Col>

            <Col xl="6">
                <Row>
                    <Col className="text-center mt-3" xl="12">
                    
                        <h3 style={{fontFamily: fonts.title, fontWeight: '700'}}>Criar Conta</h3>
                    </Col>
                </Row>



                <Row className="mt-4 mb-4" style={{backgroundColor: MainColors.fourth, color: "black", borderRadius: "5px"}}>

                    <Col className="mt-3" xl="12">
                        <Row>
                            <Col className="text-center" xl="12">
                                <h4 style={{fontFamily: fonts.title, fontWeight: '700'}}>Preencha seus dados</h4>
                            </Col>
                        </Row>
                    </Col>

                    <Col xl="12">
                        <Form >
                            <FormGroup>
                                <Label for="email">
                                Email
                                </Label>
                                <Input
                                id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">
                                Senha
                                </Label>
                                <Input
                                id="password"
                                placeholder="Senha"
                                type="password"
                                onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="password-confirm">
                                Confirmar Senha
                                </Label>
                                <Input
                                id="password-confirm"
                                placeholder="Confirmar Senha"
                                type="password"
                                onChange={(e) => {setConfirmPassword(e.target.value)}}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="token">
                                Token do Sistema
                                </Label>
                                <Input
                                id="token"
                                placeholder="Token"
                                type="password"
                                onChange={(e) => {setSystemToken(e.target.value)}}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="account-type">
                                Tipo de Conta
                                </Label>
                                <Input
                                id="account-type"
                                type="select"
                                value={type}
                                onChange={(e) => {setType(e.target.value)}}
                                >
                                <option>
                                    root
                                </option>
                                <option>
                                    admin
                                </option>
                                
                                
                                </Input>
                            </FormGroup>

                            <Row className="text-center">
                                <Col>
                                    <Button  
                                    className="mt-1 mb-3" 
                                    style={{backgroundColor: MainColors.primary, color: MainColors.fourth}}
                                    onClick={async () => {
                                        
                                        const data = {
                                            email: email,
                                            password: password,
                                            systemToken: systemToken,
                                            type: type,
                                        }

                                        await newAccount(data).then((res) => {

                                            const dataRes = res.data;

                                            const event = dataRes?.event;

                                            if(!!event && event == "error")
                                            {
                                                Swal.fire(
                                                    'Erro!',
                                                    'Retorno da api: \n' + JSON.stringify(dataRes.message),
                                                    'error'
                                                )
                                            }
                                            else {
                                                Swal.fire(
                                                    'Usuário Cadastrado',
                                                    'Seu usuário do tipo ' + data.type + ' foi cadastrado com Sucesso!',
                                                    'success'
                                                )
                                            }

                                            
                                            console.log(res);
                                        }).catch((err) => {
                                            Swal.fire(
                                                'Erro!',
                                                'Retorno da api: \n' + JSON.stringify(err),
                                                'error'
                                            )
                                            console.log(err);
                                        });

                                        

                                    }}
                                    >
                                        Criar Conta
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Form>
                    </Col>
                </Row>
            </Col>

            <Col xl="3">
            
            </Col>
        </Row>

    </>
}