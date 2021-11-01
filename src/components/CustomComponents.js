import {Accordion, Card, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {FaStreetView} from "react-icons/fa";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

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

export const GameAccordion = ({title, collection, id, name}) => {
    return(
                <Col className="p-3">
                    <h4>{title}</h4>
                    <Accordion className="text-start">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>{collection}</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup variant="flush">
                                    <ListGroupItem>
                                        <Link className="text-decoration-none" to={`/game/id/${id}`}>
                                            {name}
                                        </Link>
                                    </ListGroupItem>
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
    )
}