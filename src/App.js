import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Navigation from "./components/Navbar";
import Games from "./components/Games";
import GameData from "./components/GameData";
import Platforms from "./components/Platforms";
import PlatformData from "./components/PlatformData";
import ExampleGame from "./components/ExampleGame"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {
    Badge,
    Button,
    Card, Carousel, CarouselItem,
    Col,
    Container,
    Image, ListGroup, ListGroupItem, Row,
} from "react-bootstrap";

import {MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBListGroupItem, MDBRow} from "mdb-react-ui-kit";
import PlatformVersionData from "./components/PlatformVersionData";
import {BiTerminal, FaCalendarDay, IoGameControllerOutline} from "react-icons/all";
import {Calendar2CheckFill, Calendar2DateFill, TerminalFill} from "react-bootstrap-icons";
import {FaCalendarAlt, FaTheaterMasks} from "react-icons/fa";
import {MDBListGroup} from "mdbreact";
import {GiConsoleController} from "react-icons/gi";
import {InfoCard} from "./components/CustomComponents";
import {allFields, useClientData} from "./utilities/axios";
import {convertAge, convertTime, logo_resize, resize, screenshotResize} from "./utilities/converters";
import {useState} from "react";
import {RiParentLine} from "react-icons/ri";

/**
 * Renders App
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

    return (
        <Router>
            <div className="App" style={{backgroundColor: "#e3e3e3"}}>
                <Navigation/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/game/all" component={Games}/>
                    <Route exact path='/game/id/:id' render={(props) => <GameData {...props} key={Date.now()}/>}/>
                    <Route exact path="/platform" component={Platforms}/>
                    <Route exact path='/platform/:slug'
                           render={(props) => <PlatformData {...props} key={Date.now()}/>}/>
                    <Route exact path='/platform_version/:slug'
                           render={(props) => <PlatformVersionData {...props} key={Date.now()}/>}/>
                    <Route exact path='/exgame' component={ExampleGame}/>
                </Switch>
            </div>
        </Router>
    );
}


/**
 * Home page
 * @returns {JSX.Element}
 * @constructor
 */
export const Home = () => {

    const [color, setColor] = useState( "#ffffff");
    const [fs, setFs] = useState("1em");

    const setStyle = (color,fs) => {
        setColor(color)
        setFs(fs)
    };


    const {data: game} = useClientData('/games', allFields + 'w id=642;');

    return (

        <div className="App bg-white">

            <Container>

                {/** Banner **/}
                <Row className="text-lg-start text-white px-5"
                     style={{
                         backgroundImage: `url(https:${game.screenshots
                             ? screenshotResize(game.screenshots[0].url)
                             : null
                         })`,
                         backgroundSize: "cover",
                         height: "auto",
                     }}>


                    <Col lg={12} className="align-self-center py-4">

                        <Row className="py-2" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>

                            <Col md={"auto"}>
                                <Image src={game.cover && resize(game.cover.url)} className="border border-white"
                                       style={{height: "28vh"}}/>
                            </Col>

                            <Col md={8}>
                                <Row>
                                    <Col>
                                        <h1 style={{
                                            fontSize: "4vw",
                                            textShadow: "3px 3px #000000",
                                            borderBottom: "1px solid white"
                                        }}>{game.name}</h1>

                                        <Row className="py-4">
                                            <h6>
                                                <FaCalendarAlt/>{" "}{game.first_release_date && convertTime(game.first_release_date)}
                                            </h6>
                                        </Row>

                                        <Row>
                                            <Col>
                                                <FaTheaterMasks/> {game.genres && game.genres.map((genres, key) => (
                                                    <Link key={key} className="text-decoration-none" to={`/game/id/${genres.id}`}>
                                                        <span
                                                            style={{color : color, fontSize : fs}}
                                                            onMouseEnter={() => setStyle("#FFA500", "1.2em")}
                                                            onMouseLeave={() => setStyle("#FFFFFF", "1em")}
                                                        >{(key ? ', ' : '') + genres.name}</span>
                                                    </Link>
                                            ))}
                                            </Col>
                                        </Row>

                                    </Col>

                                </Row>
                            </Col>


                            {/*
                        <Col>
                           {/* <svg>
                                <circle cx="200" cy="80" r="70" stroke={"#ffffff"} fill={"#000000"}/>
                                <text x="200" y="90" alignmentBaseline="middle" textAnchor={"middle"}>
                                    <tspan y="85" x="200" fontSize={"30px"} fill={"#ffffff"}>89</tspan>
                                    <tspan x={"200"} dy="2em" fontSize={"14px"} fill={"#ffffff"}>29 votes</tspan>
                                </text>
                            </svg>
                        </Col>
                        */}

                        </Row>

                    </Col>

                </Row>


                {/** Content **/}
                <Row className="mt-4 text-lg-start">
                    <Col>
                        {game.summary && game.summary}
                    </Col>
                </Row>

                <Row>
                    <Col md={5}>
                        {game.screenshots && (
                            <Carousel>
                                {game.screenshots.map(image => (
                                    <CarouselItem>
                                        <Image src={image.url && screenshotResize(image.url)} fluid/>
                                    </CarouselItem>
                                ))}
                            </Carousel>
                        )}
                    </Col>
                </Row>

                <Row className="mt-4 text-lg-start">

                    <Col md={3}>
                        <Card>
                        <Col><h5 className="text-center">Platforms <GiConsoleController/></h5>

                            <ListGroup variant="flush">
                                {game.platforms && game.platforms.map(platforms => (
                                    <ListGroupItem>
                                    <Row>
                                        <Col md="auto">
                                            <Image style={{width: "35px"}}
                                                   src={platforms.platform_logo && logo_resize(platforms.platform_logo.url)}/>
                                        </Col>

                                        <Col>
                                            <p>{platforms.name}</p>
                                        </Col>
                                    </Row>
                                    </ListGroupItem>
                                    ))}
                            </ListGroup>
                        </Col>
                        </Card>
                    </Col>


                    <Col md={3}>
                        <Card>
                            <Col><h5 className="text-center">Developers <BiTerminal/></h5>

                                <ListGroup variant="flush">
                                    {game.involved_companies && game.involved_companies.map(companies => (
                                        <ListGroupItem>{companies.company.name}</ListGroupItem>))}
                                </ListGroup>
                            </Col>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <Col>
                                <h5 className="text-center">Age Ratings <RiParentLine/></h5>
                        <Row>
                            {game.age_ratings && game.age_ratings.map(age => (
                                <Col md={3}>
                                    <Image style={{height: "75px", width: "55px"}}
                                           src={convertAge(age.rating)}/>
                                </Col>
                            ))}
                        </Row>

                        {game.age_ratings && game.age_ratings.map(age => (
                            <Row className="pt-2">
                                {age.content_descriptions && age.content_descriptions.map(desc => (
                                    <ListGroupItem>{desc.description}</ListGroupItem>
                                ))}
                            </Row>
                        ))}
                            </Col>
                        </Card>
                    </Col>


                </Row>


            </Container>

        </div>

    )

}
export default App;
