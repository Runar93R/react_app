import {Card, Col, Row} from "react-bootstrap";
import {FaStreetView} from "react-icons/fa";
import {useEffect, useState} from "react";

export const MyCard = ({props}) => {


    return(
    <Card className="mt-2 py-2">
        <Row>
            <Col md={4} className="text-black-50 border-end"><p><FaStreetView/></p></Col>

            <Col className="text-lg-start px-4">
                <>
                    {props.map(x =>
                        <p>{x}</p>
                )}</>
            </Col>
        </Row>
    </Card>
    )
}