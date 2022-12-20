import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';
import UserDataService from '../Services/UserDataService';
export default function Sidebar(props) {

    const [show, setShow] = useState(false);
    const userDataService = UserDataService.getInstance();
    const navigate = useNavigate();

    return <>
    
        <Button style={{
            position: "fixed",
            top: "2%",
            left: "2%",
        }}
        onClick={() => {setShow(true)}}
        >
            Menu
        </Button>

        {show && <>
        
            <Offcanvas isOpen={show} fade>
                <OffcanvasHeader 
                toggle={() => {setShow(false)}}
                >
                    <strong>Menu</strong>
                    
                </OffcanvasHeader>

                <OffcanvasBody>
                    <Row>
                        <Col>
                            <Link to="/home">Home</Link>
                        </Col>
                    </Row>
                    <hr></hr>

                    <strong>Listas</strong>

                    <Row>
                        <Col>
                            <Link to="/list/systems">Sistemas</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link>Usuários</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link>Contas</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link>Sessões</Link>
                        </Col>
                    </Row>
                    <hr></hr>

                    <strong>Criar</strong>

                    <Row>
                        <Col>
                            <Link to="/create/systems">Sistemas</Link>
                        </Col>
                    </Row>

                    <Row className='mt-3'>
                        <Col>
                            <Button 
                            style={{width: "100%"}}
                            onClick={() => {
                                userDataService.clearUser();
                                window.history.go();
                            }}
                            >
                                LogOut
                            </Button>
                        </Col>
                    </Row>

                </OffcanvasBody>
            </Offcanvas>
        
        </>}

    </>
}