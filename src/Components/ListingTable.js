import { useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";

export default function ListingTable(props) {

    const {columns, rows, setPage, page} = props;

    let colRender = [];
    if(!!rows && (rows.length > 0))
    {
        colRender = Object.entries(rows[0]);

        
    }

    return <>
    
        <Table className="text-center" responsive>
            {!!columns && <>
            
                <thead>
                    <tr>
                        {(colRender?.length > 0) && <>
                        
                            {colRender.map((col) => {
                                return <>
                                
                                    <th>{col[0]}</th>
                                </>
                            })}
                        
                        </>}
                    </tr>
                </thead>

                <tbody>
                    {(rows?.length > 0) && 
                        <>
                        {rows.map((row) => {
                            
                            const rowRender = Object.entries(row);
                            return <tr>

                                    {rowRender.map((cell) => {
                                        return <td>{cell[1]}</td>
                                    })}

                                </tr>
                        
                            }
                        )}
                        </>
                            
                        
                    }

                </tbody>
            </>}
        </Table>
        <Row className="mt-3">
            <Col className="text-center" xl="12">
                <Row>
                    <Col>
                        <Button className="mr-2"
                        onClick={() => {
                            if((page - 1) > 0)
                            {
                                setPage(page - 1);
                            }
                            
                        }}
                        >
                            {`<`}
                        </Button>
                    </Col>
                    <Col><Button>{page}</Button></Col>
                    <Col>
                        <Button className="ml-2"
                            onClick={() => {
                                setPage(page + 1);
                            }}
                        >
                            {`>`}
                        </Button>
                    </Col>
                    
                </Row>
                
            </Col>
        </Row>
    </>
}