import { useEffect, useState } from "react"
import AccountApi from "../Services/AccountApi"
import { Row, Col, Container, Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import MainColors from "../Assets/Colors/MainColors";
import ListingTable from "../Components/ListingTable";

export default function AccountList(props) {

    const accountsApi = AccountApi.getInstance();
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        async function getRows() {
            await accountsApi.listAccounts(page).then(res => {
                setRows(res);
                console.log(res);
            });
        }
        getRows();
    }, [])

    return <>
    
    <Container fluid>
    <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100Vh"}}>
            <Col md="2">
            
            </Col>
            <Col md="8">
                <h1 className="text-center" style={{color: MainColors.fourth}}>Lista de Contas</h1>
                <Card style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                    <CardHeader>
                        <CardTitle>
                            Contas
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ListingTable 
                            columns={['Nome', 'Token']}
                            rows={rows}
                            setPage={setPage}
                            page={page}
                        />
                    </CardBody>
                </Card>
            </Col>
            <Col md="2">
            
            </Col>
        </Row>
    </Container>
    
    </>
}