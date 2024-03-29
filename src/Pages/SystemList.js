import MainColors from "../Assets/Colors/MainColors"
import { Row, Col, Container, Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import ListingTable from "../Components/ListingTable"
import { useEffect, useState } from "react"
import SystemApi from "../Services/SystemApi"


export default function SystemList(props) {
    const systemApi = SystemApi.getInstance();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function getRows(){
            await systemApi.listSystems(page).then((res) => {
                setRows(res);
                console.log(res);
            })
        }

        getRows();
    }, [page])

    return <>
    
    <Container fluid>
        
        <Row className="" style={{backgroundColor: MainColors.primary, color: MainColors.fourth, height: "100Vh"}}>
            <Col md="2">
            
            </Col>
            <Col md="8">
                <h1 className="text-center" style={{color: MainColors.fourth}}>Lista de Sistemas</h1>
                <Card style={{backgroundColor: MainColors.fourth, color: MainColors.primary, fontFamily: "consolas"}}>
                    <CardHeader>
                        <CardTitle>
                            Sistemas
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