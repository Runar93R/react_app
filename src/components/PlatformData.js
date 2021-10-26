import {useParams} from "react-router-dom";
import {useClientData} from "../utilities/axios";
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import {convertPlatformCategory, logo_resize} from "../utilities/converters";
import {Link} from "react-router-dom";

/**
 * Renders data for single platform object
 * @returns {JSX.Element}
 * @constructor
 */
const PlatformData = () => {


    const {slug} = useParams();
    const {data: platform} = useClientData('/platforms', `f *, platform_logo.*, versions.*, platform_family.name; w slug=${`"` + slug + `"`};` );


    return(
        <div key={platform.id} className="App">
            <Container>
                <Row>

                    <Row className="align-items-center bg-white border pt-3">
                        <Row>
                            <Col className="border-bottom">
                                <Image src={platform.platform_logo && logo_resize(platform.platform_logo.url)}
                                       style={{width : "10vw"}}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h1>{platform.name}</h1>
                            </Col>
                        </Row>


                        <Row>
                            <Col>
                                <p>{platform.summary && platform.summary}</p>
                            </Col>
                        </Row>

                    </Row>




                    <Row className="mt-2">

                        <Col md>
                            <Card>
                                <Card.Title>
                                    Category
                                </Card.Title>

                                <Card.Body>
                                    <Card.Text>{platform.category && convertPlatformCategory(platform.category)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md>
                            <Card>
                                <Card.Title>
                                    Versions
                                </Card.Title>

                                <Card.Body>
                                    {platform.versions && platform.versions.map(version => (
                                        <Card.Text>
                                            <Link className="text-decoration-none" to={`/platform_version/${version.slug}`}>
                                                <a>{version.name} </a>
                                            </Link>
                                        </Card.Text>
                                    ))}
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col>
                            <Card>
                                <Card.Title>
                                    Platform Family
                                </Card.Title>

                                <Card.Body>
                                    <Card.Text>{platform.platform_family && platform.platform_family.name}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>



                </Row>
            </Container>
        </div>
    )
}

export default PlatformData