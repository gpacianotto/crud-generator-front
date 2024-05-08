import { Link } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";

export default function HelpUs() {
    return <>
    <Row>
        <Col xl="2">
            
            <Link to={"/"}>
                <Button 
                    style={{
                        position: "absolute",
                        top:"2%",
                        left: "1%"
                    }}
                    
                >
                    Voltar ao Início
                </Button>
            </Link>
            
        </Col>

        <Col className="mt-4 text-justify" xl="8">
        <p>Crud Generator é um trabalho de conclusão de curso de um aluno da graduação em Ciência da Computação. Ajude-o a concluir o trabalho nos fornecendo seu feedback sobre a ferramenta.</p>
        <iframe style={{border: "1px solid gray"}} src="https://docs.google.com/forms/d/e/1FAIpQLSfusMcvhGhlz0xF5h0ES6BAHmX5vZ4N8G3vh3pK-Fr44vvR-w/viewform?embedded=true" width="100%" height="500px" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe>
        </Col>

        <Col xl="2"/>

    </Row>
    </>
}