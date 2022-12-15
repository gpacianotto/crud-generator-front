import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from 'reactstrap';
export default function Sidebar(props) {

    const [show, setShow] = useState(false);
    

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
                            <Link>Home</Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link>Sistemas</Link>
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
                </OffcanvasBody>
            </Offcanvas>
        
        </>}

    </>
}