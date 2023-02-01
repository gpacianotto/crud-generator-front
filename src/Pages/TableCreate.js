import { Row, Col, Container, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Button } from "reactstrap";
import MainColors from "../Assets/Colors/MainColors";
import { useEffect, useState } from "react";
import TablesApi from "../Services/TablesApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function TableCreate() {

    const [name, setName] = useState("");
    const tablesApi = TablesApi.getInstance();
    const navigate = useNavigate();
    const [collumns, setCollumns] = useState([{
        name: "id",
        type: "integer",
        options: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    }]);



    return <>
        <Container fluid>
        
            <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100vh", overflowY: "auto"}}>
                <Col md="2">
                
                </Col>
                <Col md="8">
                    <h1 className="text-center" style={{color: MainColors.fourth}}>Cadastro de Tabelas</h1>


                    <Card style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                        <CardHeader>
                            Dados da Nova Tabela
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="name">Nome da Tabela</Label>
                                    <Input 
                                    type="text"
                                    id="name"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    />
                                </FormGroup>
                                <hr></hr>
                                <h2>COLUNAS</h2>

                                <Row>
                                    <Col  md='12'>
                                        
                                        {collumns.map((collumn, index) => <>
                                            <Row className="mt-3" style={{border: "1px solid black"}}>
                                                <Col className="p-3" style={{borderRight: "1px solid black"}}  md="11">
                                                    <Row>
                                                        <Col>
                                                            <Label for={"name" + index}>Nome da Coluna</Label>
                                                            <Input 
                                                            value={collumn.name} 
                                                            type="text" id={"name" + index} 
                                                            onChange={(e) => {
                                                                setCollumns(old => {
                                                                    let newCollumns = [...old];

                                                                    newCollumns[index].name = e.target.value;
                                                                    return newCollumns;
                                                                })
                                                            }}
                                                            />
                                                            
                                                        </Col>
                                                        <Col>
                                                            <Label for={"type" + index}>Tipo da coluna</Label>
                                                            <Input 
                                                                value={collumn.type} 
                                                                type="select" 
                                                                id={"type" + index}
                                                                onChange={(e) => {

                                                                    setCollumns(prev => {
                                                                        let newCol = [...prev];
                                                                        
                                                                        if(e.target.value === "integer")
                                                                        {
                                                                            newCol[index].size.label = null;
                                                                            newCol[index].size.value = null;
                                                                        }

                                                                        newCol[index].type = e.target.value;
    
                                                                        return newCol
                                                                    })
                                                                    
                                                                }}
                                                            >
                                                                <option value="string">
                                                                    string
                                                                </option>
                                                                <option value="integer">
                                                                    integer
                                                                </option>
                                                            </Input>
                                                        </Col>
                                                    </Row>
                                                                
                                                    {collumn?.type === "string" &&
                                                        <Row>
                                                            <Col>
                                                                <Label>
                                                                    Tipo do Tamanho
                                                                </Label>
                                                                <Input 
                                                                    id={"labelSize" + index} 
                                                                    type="select"
                                                                    value={collumn?.size?.label}
                                                                >
                                                                    <option value="variable">
                                                                        Variável (VARCHAR)
                                                                    </option>
                                                                    <option value="fixed">
                                                                        Fixo (CHAR)
                                                                    </option>
                                                                </Input>
                                                            </Col>
                                                            <Col>
                                                                <Label>
                                                                    Valor do Tamanho
                                                                </Label>
                                                                <Input 
                                                                    id={"valueSize" + index} 
                                                                    type="number"
                                                                    min={1}
                                                                    max={65535}
                                                                >
                                                                    
                                                                </Input>
                                                            </Col>
                                                        </Row>
                                                    }

                                                    <Row className="mt-3">
                                                        <Col>
                                                            
                                                            <Input 
                                                            checked={collumn.options.primaryKey} 
                                                            id={"primaryKey" + index} 
                                                            type="checkbox" 
                                                            onChange={(e) => {
                                                                setCollumns(prev => {
                                                                    let newCol = [...prev];

                                                                    newCol.map((c, i) => {
                                                                        c.options.primaryKey = false;
                                                                    })

                                                                    newCol[index].options.primaryKey = e.target.checked;

                                                                    return newCol;
                                                                })
                                                            }} 
                                                            />
                                                            {' '}
                                                            <Label for={"primaryKey" + index}>
                                                                Chave Primária
                                                            </Label>
                                                        </Col>
                                                        {collumn?.type === "integer" &&
                                                            <Col>
                                                            
                                                            <Input 
                                                            checked={collumn.options?.autoIncrement} 
                                                            id={"autoIncrement" + index} 
                                                            type="checkbox" 
                                                            onChange={(e) => {
                                                                setCollumns(prev => {
                                                                    let newCol = [...prev];

                                                                    newCol[index].options.autoIncrement = e.target.checked;

                                                                    return newCol
                                                                })
                                                            }}
                                                            />
                                                            {' '}
                                                            <Label for={"autoIncrement" + index}>
                                                                Auto-incremento
                                                            </Label>
                                                            </Col>
                                                        }
                                                        <Col>
                                                            <Input 
                                                            checked={collumn.options.allowNull} 
                                                            id={"allowNull" + index} 
                                                            type="checkbox" 
                                                            onChange={(e) => {
                                                                setCollumns(prev => {
                                                                    let newCol = [...prev];

                                                                    newCol[index].options.allowNull = e.target.checked;

                                                                    return newCol
                                                                })
                                                            }}
                                                            />
                                                            {' '}
                                                            <Label for={"allowNull" + index}>
                                                                Permitir Valor Nulo
                                                            </Label>
                                                        </Col>

                                                    </Row>
                                                </Col>
                                                <Col className="text-center my-auto" md="1">
                                                    <Button
                                                    id={index}
                                                    color="danger"
                                                    onClick={(e) => {
                                                        

                                                        setCollumns(old => {
                                                            return old.filter((item, i) => i!==index);
                                                        })
                                                    }}
                                                    >
                                                        X
                                                    </Button>
                                                </Col>
                                            </Row>
                                            
                                            </>
                                        )}
                                    </Col>
                                    
                                </Row>

                                <Row className="mt-3">
                                    <Col lg="6">
                                        <Button 
                                        color="success"
                                        onClick={() => {
                                            let newCollumn = {
                                                    name: "info",
                                                    type: "string",
                                                    size: {
                                                        label: "variable",
                                                        value: 200
                                                    },
                                                    options: {
                                                        primaryKey: false,
                                                        autoIncrement: false,
                                                        allowNull: false
                                                    }
                                                };
                                           
                                            setCollumns([...collumns, newCollumn]);
                                        }}
                                        >
                                            Adicionar Coluna
                                        </Button>
                                    </Col>

                                    <Col className="text-end" lg="6">
                                        <Button color="success" onClick={async () => {
                                            
                                            if(!name)
                                            {
                                                alert("Sua tabela precisa de um nome");
                                                return;
                                            }
                                            const sendObject = {
                                                name: name,
                                                collumns: collumns
                                            }

                                            console.log(sendObject);

                                            await tablesApi.createTable(sendObject).then((result) => {
                                                const dataRes = result.data;
    
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
                                                    Swal.fire('Pronto!', 'Sistema Criado com sucesso, retorno da api: ' + JSON.stringify(result), 'success').then(() => {
                                                    
                                                        navigate('/home');
                                                    })
                                                }
                                            })

                                        }}>
                                            Salvar
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
}