import { Row, Col, Container, Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { useEffect, useState } from "react";
import TablesApi from "../Services/TablesApi";
import MainColors from "../Assets/Colors/MainColors"

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
            
            <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100Vh"}}>
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
                                                    <h5>#{table.tableId} {table.simpleName}</h5>
                                                </CardTitle>
                                                <CardBody className="p-0">
                                                    <hr></hr>
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
                                                    <p className="m-0"><span style={{color: "#7ecf2b"}}>POST</span> /create/{table.tableId}</p>

                                                </CardBody>
                                            </CardHeader>
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