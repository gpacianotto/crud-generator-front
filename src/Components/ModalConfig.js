import { useState } from "react";
import { Col, Row, Modal, ModalBody, ModalHeader, Label, Input, Form, FormGroup, Button } from "reactstrap";
import MainColors from "../Assets/Colors/MainColors";
import Configs from "../Services/Configs";

export default function ModalConfig(props) {
    const {showModal, setShowModal} = props;
    const configs = Configs.getInstance();
    const [url, setUrl] = useState(configs.getServerURL());
    
    const toggle = () => setShowModal(!showModal);
    return <>
    
    <Modal isOpen={showModal} toggle={toggle}>

        <ModalHeader toggle={toggle}>
            Configurações
        </ModalHeader>
        <ModalBody>
            <h4>Servidor</h4>
            <Row>
                <Col xl="12">
                    <Form >
                        <FormGroup>
                            <Label for="email">
                            URL
                            </Label>
                            <Input
                            value={url}
                            id="email"
                            name="email"
                            placeholder="ex: http://localhost:3000"
                            type="email"
                            onChange={(e) => {setUrl(e.target.value)}}
                            />
                        </FormGroup>
                    </Form>
                </Col>

                <Col className="text-end" xl="12">
                    <Button 
                    style={{backgroundColor: MainColors.primary}}
                    onClick={() => {configs.setServerURL(url)}}
                    >
                        Salvar
                    </Button>
                </Col>
            </Row>
        </ModalBody>
    </Modal>
    
    </>

}