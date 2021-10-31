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
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {
    Button,
    Card,
    Col,
    Container,
    Image, Row,
} from "react-bootstrap";
import PlatformVersionData from "./components/PlatformVersionData";

/**
 * Renders App
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
  return (
      <Router>
          <div className="App" style={{backgroundColor : "#e3e3e3"}}>
              <Navigation/>
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/game/all" component={Games} />
                  <Route exact path='/game/id/:id' render={(props) => <GameData {...props} key={Date.now()}/>}/>
                  <Route exact path ="/platform" component={Platforms}/>
                  <Route exact path='/platform/:slug' render={(props) => <PlatformData {...props} key={Date.now()}/>}/>
                  <Route exact path='/platform_version/:slug' render={(props) => <PlatformVersionData {...props} key={Date.now()}/>}/>
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
export const Home = () => (

        <Container>

            <Row id="header"
                 style={{
                     backgroundImage : "url(https://images.igdb.com/igdb/image/upload/t_original/lg34eavl7phmabgceods.jpg)",
                     backgroundSize : "cover",
                     height : "35vh",
                 }}/>

            <Row className="bg-dark text-white text-start">
                <Col>
                <span style={{ fontSize : "2vw"}}>Grand Theft Auto V</span>
                </Col>

                <Col>
                    <Button>
                        Favorite
                    </Button>
                </Col>
            </Row>


            <Row className="mt-2">



                <Col md={8} className="bg-white" style={{border : "2px 2px 2px 2px"}}>

                   <section className="text-sm-start mb-5">
                       <h4>Summary</h4>
                       The biggest, most dynamic and most diverse open world ever created, Grand Theft Auto V blends storytelling and gameplay in new ways as players repeatedly jump in and out of the lives of the game’s three lead characters, playing all sides of the game’s interwoven story.
                   </section>


                    <section className="text-sm-start mb-4">
                        <h4>Storyline</h4>
                        Los Santos: a sprawling sun-soaked metropolis full of self-help gurus, starlets and fading celebrities, once the envy of the Western world, now struggling to stay afloat in an era of economic uncertainty and cheap reality TV. Amidst the turmoil, three very different criminals plot their own chances of survival and success: Franklin, a street hustler looking for real opportunities and serious money; Michael, a professional ex-con whose retirement is a lot less rosy than he hoped it would be; and Trevor, a violent maniac driven by the chance of a cheap high and the next big score. Running out of options, the crew risks everything in a series of daring
                    </section>


                    <Row>
                        <Image fluid src="https://images.igdb.com/igdb/image/upload/t_1080p_2x/vfdeo6kgu0o4cyzd0sng.jpg"/>
                    </Row>

                </Col>


                <Col style={{ paddingLeft : "2%"}} className="text-sm-start">


                    <Row className="mb-3">
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col className="text-black-50 ">Genres</Col>

                                    <Col>
                                        <p>Shooter</p>
                                        <p>Action</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>

                    <Row className="mb-3">
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col className="text-black-50">Genres</Col>

                                    <Col>
                                        <p>Shooter</p>
                                        <p>Action</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>

                    <Row className="mb-3">
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col className="text-black-50">Genres</Col>

                                    <Col>
                                        <p>Shooter</p>
                                        <p>Action</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>

            </Col>
        </Row>

    </Container>



)
export default App;
