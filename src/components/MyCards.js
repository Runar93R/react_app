import {Card, Col, Row} from "react-bootstrap";
import {FaStreetView} from "react-icons/fa";
import {useEffect, useState} from "react";

/**
 * Renders Card with game data
 * @param title category of the data
 * @param icon the icon
 * @param props the date
 * @returns {JSX.Element} renders card
 * @constructor
 */
export const MetaCard = ({title, icon, props}) => {

    return(
        <Card className="mb-2 py-2">
            <Row>
                <Col md={4} className="text-black-50 border-end">{title}<p>{icon}</p></Col>

                <Col className="text-lg-start px-4"><p>{props}</p></Col>
            </Row>
        </Card>
    )
}

export const MainCard = ({title, props}) => {
    return(
        <Row className="mb-2">
            <Card>
                <Col className="p-3">
                    <h4>{title}</h4>
                    <p>{props}</p>
                </Col>
            </Card>
        </Row>
    )
}