import { Row, Col, Container, Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import { useEffect, useState } from "react";
import TablesApi from "../Services/TablesApi";
import MainColors from "../Assets/Colors/MainColors"
import Swal from "sweetalert2";

export default function TableList() {

    const tableApi = TablesApi.getInstance();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getTables() {
            await tableApi.listTables(page).then((res) => {
                console.log(res);
                if(res?.event === 'OK')
                {
                    setRows(res?.response?.rows);
                    
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        getTables();
    }, [page])


    return <>
    
        <Container fluid>
            
            <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100Vh", overflowY: "auto"}}>
                <Col md="1">
                
                </Col>
                <Col md="10">
                    <h1 className="text-center" style={{color: MainColors.fourth}}>Lista de Tabelas</h1>
                    <Card style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                        <CardHeader>
                            <CardTitle>
                                Tabelas
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                {rows.map((table) => <>
                                
                                    <Col md="4">
                                        <Card style={{backgroundColor: MainColors.primary, color: MainColors.fourth, fontFamily: "consolas"}}>
                                            <CardHeader>
                                                <CardTitle>
                                                    <h5 className="m-0">#{table.tableId} {table.simpleName}</h5>
                                                    
                                                    <hr className="mt-1 mb-0"></hr>
                                                </CardTitle>
                                                
                                            </CardHeader>
                                            <CardBody className="">
                                                <Row>
                                                    <Col md="12">
                                                        <h6 className="m-0" style={{fontWeight: 800}}>Collumns</h6>
                                                        <hr></hr>
                                                        {table.collumns.map((col) => <>
                                                            {!!col.optionPrimaryKey &&<p className="m-0 text-success">Chave Primária</p>}
                                                            <p className="m-0">Nome: {col.nameCollumn}</p>
                                                            <p className="m-0">Tipo: {col.type} | Allow Null: {!!col.optionAllowNull ? 'true' : 'false'}</p>
                                                            {!!col.sizeLabel && <p className="m-0">Tamanho: {col.sizeLabel}({col.sizeValue})</p>}
                                                            <hr/>
                                                        </>
                                                        )}
                                                        <p className="m-0">Manipular Linhas</p>
                                                        <p className="m-0"><span style={{color: "#7ecf2b"}}>POST</span> /create/{table.tableId}</p>
                                                        <p className="m-0"><span style={{color: "#a896f2"}}>GET</span> /read/{table.tableId}?pk={`{primaryKey}`}</p>
                                                        <p className="m-0"><span style={{color: "#a896f2"}}>GET</span> /list/{table.tableId}</p>
                                                        <p className="m-0"><span style={{color: "#df9a2a"}}>PUT</span> /update/{table.tableId}</p>
                                                        <p className="m-0"><span style={{color: "#ff5631"}}>DELETE</span> /destroy/{table.tableId}?pk={`{primaryKey}`}</p>
                                                        <Row className="mt-3 text-end">
                                                            <Col md="12">
                                                                <Button color="danger"
                                                                onClick={() => {
                                                                    Swal.fire({
                                                                        title: 'Você tem Certeza',
                                                                        text: 'Excluir uma tabela significa excluir também todos os registros nela!',
                                                                        icon: 'question',
                                                                        showDenyButton: true,
                                                                        confirmButtonText: 'Sim!',
                                                                        denyButtonText: `Não`,
                                                                    }
                                                                    ).then(async (result) => {
                                                                        if(result.isConfirmed)
                                                                        {
                                                                            await tableApi.deleteTables(table.tableId).then((res) => {
                                                                                if(res?.event === "OK")
                                                                                {
                                                                                    Swal.fire(
                                                                                        'Tabela deletada',
                                                                                        'Tabela deletada com sucesso! Retorno da API: ' + JSON.stringify(res),
                                                                                        'success'
                                                                                    )
                                                                                }
                                                                                else{
                                                                                    Swal.fire(
                                                                                        'Erro',
                                                                                        'Ocorreu algum erro! Retorno da API: ' + JSON.stringify(res),
                                                                                        'error'
                                                                                    )
                                                                                }
                                                                            }).catch(err => {
                                                                                Swal.fire(
                                                                                    'Erro',
                                                                                    'Ocorreu algum erro Interno! Retorno da API: ' + JSON.stringify(err),
                                                                                    'error'
                                                                                )
                                                                            })
                                                                        }
                                                                    })
                                                                }}
                                                                >
                                                                    Deletar
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                

                                            </CardBody>
                                        </Card>
                                    </Col>
                                </>
                                )}
                                
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="1">
                
                </Col>
            </Row>
        </Container>
    </>
}