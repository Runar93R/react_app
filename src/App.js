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
import {BrowserRouter as Router, Switch, Route, useParams} from "react-router-dom";
import {Badge, Button, Col, Container, Image, ListGroup, ListGroupItem, Row,} from "react-bootstrap";

import PlatformVersionData from "./components/PlatformVersionData";
import {Link} from "react-router-dom";
import {allFields, useClientData} from "./utilities/axios";
import {
    convertDate,
    cover_placeholder,
    large_placeholder,
    randomImage,
    rateColor,
    upscale
} from "./utilities/converters";
import {FaCalendarAlt, FaTheaterMasks} from "react-icons/fa";
import {
    ContentCol,
    GameCover,
    GameInfoRow,
    ImageGrid,
    ImageModal,
    MetaCol,
    RatingBar
} from "./components/CustomComponents";
import {GiGameConsole, GiGamepadCross, MdOutlineTheaterComedy} from "react-icons/all";
import {Calendar2Date} from "react-bootstrap-icons";
import {GiConsoleController} from "react-icons/gi";
import {useState} from "react";


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
                    <Route exact path='/game/:slug' render={(props) =>
                        <GameData {...props} key={Date.now()}/>}/>
                    <Route exact path="/platform" component={Platforms}/>
                    <Route exact path='/platform/:slug'
                           render={(props) =>
                               <PlatformData {...props} key={Date.now()}/>}/>
                    <Route exact path='/platform_version/:slug'
                           render={(props) =>
                               <PlatformVersionData {...props} key={Date.now()}/>}/>
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
    return (
        <div className="App vh-100" style={{backgroundColor: "#ffffff"}}>
            <BetaGame/>
        </div>
    )
}


export const BetaGame = () => {

    const {data: game} = useClientData('/games', allFields + 'w slug="grand-theft-auto-vice-city";');

    const [modalShow, setModalShow] = useState(false);
    const [image, setImage] = useState(large_placeholder)

    const handleModal = (image) => {
        setModalShow(true)
        setImage(image);
    }


    return (
        game ?
            <div>
                <Container fluid className="bg-white">
                    <Row className="align-items-md-end shadow"
                         style={{
                             backgroundImage: `url(${game.screenshots ?
                                 upscale(game.screenshots[randomImage(game.screenshots)].url) :
                                 large_placeholder})`,
                             backgroundSize: "cover",
                             backgroundPosition: "center",
                             height: "27vh",
                         }}>

                        <Col>
                            <Row>
                                <Col className="text-white pb-5">
                                    <h1 style={{
                                        lineHeight: "1.4",
                                        fontSize: "4.3vh",
                                        fontWeight: "600",
                                        textShadow: "3px 3px #000000",
                                        //  borderTop: "1px solid white",
                                    }}>{game.name}</h1>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>


                <Container className="border">

                    <Row className="py-4">

                        <Col lg={4}>
                            <GameCover props={game.cover ? upscale(game.cover.url) : cover_placeholder}/>
                            <Row className="justify-content-center pt-3">
                                <Col xs={8}>
                                    {rateColor(game.total_rating)}
                                    {game.total_rating_count ? game.total_rating_count : "0"} votes
                                </Col>
                            </Row>
                        </Col>

                        <ContentCol title={"Platforms"} icon={<GiConsoleController fontSize={"25"}/>} props={
                            game.platforms ?
                                <ListGroup variant="flush">
                                    {game.platforms.map(platform =>
                                        <ListGroupItem>
                                            <Row>
                                                <Col md={"auto"}>
                                                    {<Image style={{width : "2vw"}} src={platform.platform_logo && platform.platform_logo.url}/>}
                                                </Col>

                                                <Col>
                                                  {platform.name}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>)}
                                </ListGroup>
                                : "N/A"
                        }/>

                        <ContentCol title={"Genres"} icon={<FaTheaterMasks fontSize={"25"}/>} props={
                            game.platforms ?
                                <ListGroup variant="flush">
                                    {game.genres.map(genre =>
                                        <ListGroupItem>{genre.name}</ListGroupItem>)}
                                </ListGroup>
                                : "N/A"
                        }/>


                    </Row>

                    <Row>
                        <Col>
                            {game.summary && game.summary}
                        </Col>
                    </Row>


                </Container>

            </div>

            : <div>404!</div>
    )
}
export default App;
