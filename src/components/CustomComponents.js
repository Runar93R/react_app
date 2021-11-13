import {
    Accordion,
    Card,
    Col,
    Collapse, Image,
    ListGroup,
    ListGroupItem,
    Modal, ModalBody,
    ProgressBar,
    Row
} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";
import {
    FaChevronDown,
    FaChevronUp,
} from "react-icons/all";
import ModalHeader from "react-bootstrap/ModalHeader";
import {upscale} from "../utilities/converters";
import {FaTheaterMasks} from "react-icons/fa";


/**
 * Render a row with content. Usually raw text data
 * @param title title of the content
 * @param props properties that renders
 * @returns {JSX.Element}
 * @constructor
 */
export const ContentRow = ({title, props}) => {
    return(
        <Row className="py-4 mb-4 border-bottom">
            <Col className="p-3" md={10} style={{lineHeight : "2"}}>
                <h4>{title}</h4>
                <p>{props}</p>
            </Col>
        </Row>
    )
}


/***
 * Render a column with content.
 * @param title title of the content
 * @param icon any icon
 * @param props the properties to be rendered
 * @returns {JSX.Element} column of content
 * @constructor
 */
export const ContentCol = ({title, icon, props}) => {
    return(
        <Col className="border text-lg-center" lg={4}>
            <Row>
                <h5>{title} {icon}</h5></Row>
            <Row>
                <Col>{props}</Col></Row>
        </Col>
    )
}

/**
 * Render a column with meta data of the game.
 * @param title the title of the column
 * @param icon any icon
 * @param props the data
 * @returns {JSX.Element}
 * @constructor
 */
export const MetaCol = ({title, icon, props}) => {
    return (
        <Col lg={3} className="mb-5">
            <Row>
                <Col><span style={{fontSize : "20px", color : "rgba(63,63,63,0.88)"}}>{title} {icon}</span></Col>
            </Row>

            <Row className="pt-2">
                <Col>
                    {props.map((props, index) => (props && <span>{(index ? ', ' : '') + props}</span>))}
                </Col>
            </Row>
        </Col>
    )
}

export const GameCover = ({props}) => {
    return(
        <Image src={props}
               className="border border-white"
               style={{
                   maxHeight : "20vh",
                   boxShadow : " 6px 4px 6px 4px rgba(0,0,0,0.78)"
                }}
        />
    )
}


/**
 * Render a grid of screenshot images from the game
 * @param preview the first images (max 3)
 * @param props the rest of the images in a collapsable row
 * @returns {JSX.Element} grid of images
 * @constructor
 */
export const ImageGrid = ({preview, props}) => {

    // state of collapsable row
    const [open, setOpen] = useState(false)

    return(
        <Row className="justify-content-around">
            <Row>{preview}</Row>

            <Collapse in={open}>
                <Row id="image_row">{props}</Row>
            </Collapse>

            {preview.length < 3 ? // if more than 3 images, render the rest
                null :
                <Row className="text-center">
                    <Col onClick={() => setOpen(!open)}
                         aria-controls={"image_row"}
                         aria-expanded={open}>
                        {!open ? <FaChevronDown className="border-bottom border-secondary fs-2 m-3"/>
                            : <FaChevronUp className="border-bottom border-secondary fs-2 m-3"/>}
                    </Col>
                </Row>
            }
        </Row>
    )
}


/**
 * Render a modal that showcases an image from the game
 * in higher resolution and size
 * @param props the image data
 * @returns {JSX.Element} modal with an image
 * @constructor
 */
export const ImageModal = (props) => {

    return(
        <Modal
            {...props}
            size={"xl"}
            centered
        >
            <ModalHeader closeButton>
                <Modal.Title className="text-center fs-5"/>
            </ModalHeader>
            <ModalBody>
                <Image fluid src={upscale(props.image)} alt={props.name}/>
            </ModalBody>
        </Modal>
    )
}


export const GameInfoRow = ({title, icon, props}) => {
    return(

    <Row className="text-lg-start py-3">
        <Col md={6}>{icon} {title}</Col>
        <Col>{props}</Col>
    </Row>
    )
}


export const InfoCard = ({title, icon, props}) => {

    return(
        <Row style={{paddingLeft : "1vw"}}>
            <Card className="mb-2 py-2">
                <Row>
                    <Col md={4} className="text-black-50 border-end">{title}<p>{icon}</p></Col>

                    <Col className="px-4"><ListGroup variant={"flush"} className="text-lg-start">{props}</ListGroup></Col>
                </Row>
            </Card>
        </Row>
    )
}


export const ContentCard = ({title, props}) => {
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


export const RatingBar = ({color, score, label}) => {
    return (
        <ProgressBar style={{height : "4vh", fontSize : "1.75em"}} variant={color} striped  now={score} label={label}/>
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