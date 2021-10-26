import {useParams} from "react-router-dom";
import {useClientData} from "../utilities/axios";
import {Card, Col, Container, Image, Row, Table} from "react-bootstrap";
import {logo_resize} from "../utilities/converters";


/**
 * Renders data for specific version of platform
 * @returns {JSX.Element}
 * @constructor
 */
const PlatformVersionData = () => {

    const {slug} = useParams();

    const {data: platform} = useClientData('/platform_versions', `f *, companies.company.name, platform_version_release_dates, platform_logo.*; w slug=${`"` + slug + `"`};` );

    return(
        <div key={platform.id} className="App">
            <Container className="bg-white pt-3">
                <Row>
                    <Col className="border-bottom pb-3">
                        <Image src={platform.platform_logo && logo_resize(platform.platform_logo.url)}
                               style={{width : "10vw"}}
                        />
                    </Col>
                    <h2>{platform.name}</h2>
                </Row>

                <Row className="justify-content-around">
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    {platform.summary}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <Card.Title>Company</Card.Title>
                            <Card.Body>
                                <Card.Text>
                                    {platform.companies && platform.companies.map(comp => (
                                        <p>{comp.company.name && comp.company.name}</p>
                                    ))}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col md={7} className="text-start">
                        <Card>
                            <Card.Title className="text-center">Specs</Card.Title>
                            <Card.Body>
                            <Table responsive={"sm"}>
                                <tbody>

                                <tr>
                                    <td>Processor</td>
                                    <td>{platform.cpu && platform.cpu}</td>
                                </tr>


                                <tr>
                                    <td>GPU</td>
                                    <td>{platform.graphics && platform.graphics}</td>
                                </tr>

                                <tr>
                                    <td>Memory</td>
                                    <td>{platform.memory && platform.memory}</td>
                                </tr>

                                <tr>
                                    <td>Storage</td>
                                    <td>{platform.storage && platform.storage}</td>
                                </tr>

                                <tr>
                                    <td>Video Output</td>
                                    <td>{platform.output && (platform.output ? platform.output : "N/A")}</td>
                                </tr>

                                <tr>
                                    <td>Max. Resolution</td>
                                    <td>{platform.resolutions && platform.resolutions}</td>
                                </tr>

                                <tr>
                                    <td>Network Connectivity</td>
                                    <td>{platform.connectivity && platform.connectivity}</td>
                                </tr>

                                <tr>
                                    <td>Operating System</td>
                                    <td>{platform.os && platform.os}</td>
                                </tr>

                                <tr>
                                    <td>Media Support</td>
                                    <td>{platform.media && platform.media}</td>
                                </tr>

                                <tr>
                                    <td>Sound Chipset</td>
                                    <td>{platform.sound && platform.sound}</td>
                                </tr>

                                </tbody>
                            </Table>
                            </Card.Body>

                        </Card>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default PlatformVersionData