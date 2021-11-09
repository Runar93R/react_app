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
import {Badge, Col, Container, Image, ListGroup, ListGroupItem, Row,} from "react-bootstrap";

import PlatformVersionData from "./components/PlatformVersionData";
import {Link} from "react-router-dom";
import {allFields, useClientData} from "./utilities/axios";
import {convertDate, cover_placeholder, large_placeholder, upscale} from "./utilities/converters";
import {FaTheaterMasks} from "react-icons/fa";
import {GameInfoRow, ImageGrid, ImageModal} from "./components/CustomComponents";
import {GiGameConsole, MdOutlineTheaterComedy} from "react-icons/all";
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
    return(
        <div className="App" style={{backgroundColor : "#000000"}}>
            <BetaGame/>
        </div>
    )
}


export const BetaGame = () => {

    const {data: game} = useClientData('/games', allFields + 'w slug="grand-theft-auto-v";');

    const [modalShow, setModalShow] = useState(false);
    const [image, setImage] = useState(large_placeholder)

    const handleModal = (image) => {
        setModalShow(true)
        setImage(image);
    }


    return(
        <Container className="text-white">

            <Row>
                <Col className="text-lg-start p-3">
                    <h1 style={{fontSize : "3vmax"}}>{game.name}</h1>
                </Col>
            </Row>

            <Row>

                <Col md={"auto"}>
                    <Image src={game.cover ? upscale(game.cover.url) : cover_placeholder}
                           className="border border-white"
                           style={{height : "300px"}}/>
                </Col>

                <Col md={6} className="align-self-center">


                    <GameInfoRow title={"First Released"} icon={<Calendar2Date/>} props={game.first_release_date ? convertDate(game.first_release_date) : null}/>

                    <GameInfoRow title={"Genres"} icon={<FaTheaterMasks/>} props={
                       game.genres ? game.genres.map((gen, index) => (<span>{(index ? ', ' : '') + gen.name}</span>)) : "N/A"
                   }/>

                    <GameInfoRow title={"Platforms"} icon={<GiConsoleController/>} props={
                        game.platforms ? game.platforms.map((platform, index) => (<span>{(index ? ', ' : '') + platform.name}</span>)) : "N/A"
                    }/>


                </Col>

            </Row>


                <Row className="mt-5">



                    {/** Screenshots **/}
                    {game.screenshots && (
                        <Col>
                        <>
                            <ImageGrid preview={
                                game.screenshots.slice(0, 3).map(x => (
                                    <Col className="pt-2" md={4}>
                                        <Image className="w-100"
                                               onClick={() => handleModal(x.url)}
                                               src={upscale(x.url)}/>
                                    </Col>
                                ))
                            } props={
                                game.screenshots.slice(3, game.screenshots.size).map(x => (
                                    <Col className="pt-3" md={4}>
                                        <Image className="w-100"
                                               onClick={() => handleModal(x.url)}
                                               src={upscale(x.url)}/>
                                    </Col>
                                ))}/>
                            <Row>
                                <ImageModal image={image} show={modalShow} onHide={() => setModalShow(false)}/>
                            </Row>
                        </>
                        </Col>
                    )}

                </Row>

        </Container>
    )
}
export default App;
