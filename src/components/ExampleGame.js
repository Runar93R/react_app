import {allFields, useClientData} from "../utilities/axios";
import {
    checkData,
    convertAge,
    convertCategory,
    convertScore,
    convertTime,
    logo_resize,
    resize,
    screenshotResize
} from "../utilities/converters";

import {MainCard, MetaCard, MyCard} from "./MyCards";

import {
    Accordion,
    Badge,
    Card, CardGroup, CardImg,
    Carousel,
    CarouselItem,
    Col,
    Container,
    Image, ListGroup, ListGroupItem,
    Row
} from "react-bootstrap";
import {Link} from "react-router-dom";
import {GiConsoleController} from "react-icons/gi";
import {AiOutlineCode} from "react-icons/ai";
import {RiCalendar2Fill, RiParentLine} from "react-icons/ri";
import {BiBuildingHouse, BiCategoryAlt} from "react-icons/bi"
import {FaCalendarAlt, FaNetworkWired, FaStreetView, FaTheaterMasks} from "react-icons/fa"

/**
 * Renders single game object for testing purpose
 * @returns {JSX.Element}
 * @constructor
 */
const ExampleGame = () => {

    const {data: game} = useClientData('/games', allFields + 'w id=546;') //19565

    checkData(game)

    return (

        <div className="App">

            {/** Hero **/}
            <Container fluid>

                {/** Hero image **/}
                <Row className="mb-2"
                    style={{
                        backgroundImage: `url(https:${game.screenshots 
                            ? screenshotResize(game.screenshots[0].url) 
                            : null
                        })`,
                        backgroundSize: "cover",
                        height: "35vh",
                        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.7)",
                        color : "white",
                    }}>

                    {/** Cover, title, release date and rating **/}
                    <Col className="align-self-center" lg={12}>

                        <Container>

                            {/** Cover image **/}
                            <Row className="align-items-center">
                                <Col md="auto">
                                    <Image fluid
                                           src={resize(game.cover.url && game.cover.url)} rounded
                                           style={{
                                               marginBottom: "10px",
                                               boxShadow: "4px 2px 2px 2px black",
                                               WebkitBoxShadow: "2px 2px 2px 2px black",
                                               border: "0.7px solid white",
                                               height: "30vh"
                                           }}/>
                                </Col>

                                {/** Title **/}
                                <Col md={7} className="text-start">
                                    <Row className="pb-3 mb-4">
                                        <span style={{
                                            textShadow: "2px 2px #000000",
                                            fontSize: "2.5vmax",
                                      }}>{game.name}</span>
                                    </Row>

                                    {/** First release date **/}
                                    {game.first_release_date && (
                                    <Badge className="p-2 shadow" style={{fontSize : "1vmax"}} bg="danger"><FaCalendarAlt/> {convertTime(game.first_release_date)}</Badge>
                                    )}

                                    {/** Genres **/}
                                    <Row className="mt-3">
                                        <Col style={{fontSize : "1.4vmax"}}>
                                            <Badge bg="dark" className="p-2"><FaTheaterMasks/> {" "}
                                                {game.genres && game.genres.map((genres, index) => (
                                                    <Link className="text-decoration-none" to={`/game/id/${genres.id}`}>
                                                        <span className="text-white">{ (index ? ', ' : '') + genres.name}</span>
                                                    </Link>
                                                ))}
                                            </Badge>
                                        </Col>
                                    </Row>

                                </Col>

                                {/** Rating SVG **/}
                                <Col className="align-self-center">
                                    <svg>
                                        <defs>

                                            <radialGradient id="myGradient">
                                                <stop offset="20%" stopColor="#141e30" />
                                                <stop offset="80%" stopColor="black" />
                                            </radialGradient>

                                            <linearGradient id="medium" x1="0" y1="0" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">

                                                <stop offset="0" stopColor="#d3e65c" />

                                                <stop offset="0.2" stopColor="#d9e35a" />

                                                <stop offset="0.4" stopColor="#e5dc56" />

                                                <stop offset="0.6000000000000001" stopColor="#f2d356" />

                                                <stop offset="0.8" stopColor="#fbcb58" />

                                                <stop offset="1" stopColor="#ffc859" />
                                            </linearGradient>

                                            <linearGradient id="best" x1="0" y1="0" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">

                                                <stop offset="0" stopColor="#54de10" />

                                                <stop offset="0.16666666666666666" stopColor="#00e55b" />

                                                <stop offset="0.3333333333333333" stopColor="#00e98b" />

                                                <stop offset="0.5" stopColor="#00edb3" />

                                                <stop offset="0.6666666666666666" stopColor="#00efd4" />

                                                <stop offset="0.8333333333333333" stopColor="#00efee" />

                                                <stop offset="1" stopColor="#00eeff" />

                                            </linearGradient>

                                        </defs>
                                        <circle cx="70" cy="70" r="70"
                                                stroke="white"
                                                strokeWidth="1"
                                                style={{fill : (game.aggregated_rating >= 75) ? "url(#best)" : "url(#myGradient)"}}
                                        />
                                        <text x="70" y="90"
                                              textAnchor="middle"
                                              fontSize="30px"
                                              fill="white"
                                              alignmentBaseline="middle">
                                            <tspan y="80" style={{textShadow: "1px 1px #000000",}}>{game.aggregated_rating && convertScore(game.aggregated_rating)}</tspan>
                                            <tspan fontSize="14px" x="70" dy="2em">{game.aggregated_rating_count && game.aggregated_rating_count} votes</tspan>
                                        </text>
                                    </svg>

                                </Col>


                            </Row>
                        </Container>
                    </Col>

                </Row>

            </Container>


            {/** Page content **/}
            <Container className="bg-transparent">

                {/** Main container **/}
                <Row>

                    {/** Main page **/}
                    <Col md={8} className="px-0">

                        <Row className="text-sm-start pt-2" style={{fontSize: "16px"}}>

                            {/** Summary **/}
                            {game.summary && (
                            <MainCard title={"Summary"} props={game.summary}/>
                            )}


                            {/** Storyline **/}
                            {game.storyline && (
                            <MainCard title={"Storyline"} props={game.storyline} />
                            )}


                            {/** Screenshots **/}
                            <Row>

                                {game.screenshots && (
                                    <Card>
                                <Col className="pt-2">
                                    <Carousel>
                                    {game.screenshots.map(image => (
                                        <CarouselItem>
                                            <Image src={image.url && screenshotResize(image.url)} fluid/>
                                        </CarouselItem>
                                    ))}
                                </Carousel>
                                </Col>


                                {/** Artworks **/}

                                        <Row className="px-4 mt-3">
                                    {game.artworks && game.artworks.map(art => (
                                        <Col md="auto" className="p-1">
                                            <Image
                                                src={art.url && resize(art.url)}
                                                style={{ width : "250px"}}
                                            />
                                        </Col>
                                    ))}
                                        </Row>
                                            </Card>
                                )}
                        </Row>


                            <Row>
                                {/** Collections **/}
                                {game.collection && (
                                    <Card>
                                        <Col className="p-3">
                                            <h4>Collection</h4>

                                            <Accordion className="text-start">
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>{game.collection.name}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <ListGroup>
                                                            {game.collection.games && game.collection.games.map(cg => (
                                                                <ListGroupItem>
                                                                    <Link className="text-decoration-none" to={`/game/id/${cg.id}`}>
                                                                        {cg.name}
                                                                    </Link>
                                                                </ListGroupItem>
                                                            ))}
                                                        </ListGroup>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Col>
                                    </Card>
                                )}

                            </Row>

                        </Row>


                    </Col>


                    {/** Sidebar **/}
                    <Col md={4} className="px-0 py-2" style={{fontSize: "1rem"}}>

                        {/** Category **/}
                        <MetaCard title={"Category"} icon={<BiCategoryAlt/>} props={game.category ? "N/A" : convertCategory(game.category)}/>

                        {/** Platforms **/}
                        {game.platforms && (
                            <MetaCard title={"Platforms"} icon={<GiConsoleController/>} props={
                                game.platforms.map(platforms => (
                                    <Link className="text-decoration-none" to={`/platform/${platforms.slug}`}>
                                        <Row className="my-3">
                                            <Col md="auto">
                                                <Image style={{width : "35px"}} src={platforms.platform_logo && logo_resize(platforms.platform_logo.url)}/>
                                            </Col>

                                            <Col>
                                                <p>{platforms.name}</p>
                                            </Col>
                                        </Row>
                                    </Link>
                                ))
                            }/>
                        )}


                        {/** Developers **/}
                        {game.involved_companies && (
                            <MetaCard title={"Developers"} icon={<AiOutlineCode/>} props={game.involved_companies.map(companies => (<p>{companies.company.name}</p>))}/>
                        )}


                        {/** Player perspective **/}
                        {game.player_perspectives && (
                            <MetaCard title={"Perspective"} icon={<FaStreetView/>} props={game.player_perspectives.map(pp => (<p>{pp.name}</p>))}/>
                        )}


                        {/** Game modes **/}
                        {game.game_modes && (
                            <MetaCard title={"Game Modes"} icon={<FaNetworkWired/>} props={game.game_modes.map(mode => (<p>{mode.name}</p>))}/>
                        )}


                        {/** Release dates **/}
                        {game.release_dates && (
                            <MetaCard title={"Release Dates"} icon={<RiCalendar2Fill/>}
                                    props={game.release_dates.map(date => (
                                        <Row className="pb-2">
                                            <p>{date.platform.name}: {date.human}</p>
                                        </Row>
                                    ))}
                            />
                        )}


                        {/** Age ratings **/}
                        <MetaCard title={"Age Ratings"} icon={<RiParentLine/>} props={
                            <>
                                <Row>
                                    {game.age_ratings && game.age_ratings.map(age => (
                                        <Col md={3}>
                                            <Image style={{height: "45px", width: "35px"}} src={convertAge(age.rating)}/>
                                        </Col>
                                    ))}
                                </Row>

                                {game.age_ratings && game.age_ratings.map(age => (
                                    <Row className="pt-2">
                                        {age.content_descriptions && age.content_descriptions.map(desc => (
                                            <p>{desc.description}</p>
                                        ))}
                                    </Row>
                                ))}
                            </>
                        }/>

                        {/** Franchises **/}
                        {game.franchises && (
                            <MetaCard title={"Franchises"} icon={<BiBuildingHouse/>} props={game.franchises.map(fr => (<p>{fr.name}</p>))}/>
                        )}

                    </Col>



                    <Row className="px-0 mt-2 text-start">

                    </Row>

                    <Row>
                        {/** DLCs **/}
                        {game.dlcs && (
                            <Row className="mb-2">
                                <Card>
                                    <Row className="p-3">
                                        <h4>DLCs </h4>
                                        {game.dlcs.map(dlc => (
                                            <Card className="text-center mx-3 p-0"  style={{width : "130px"}}>
                                                <Link to={`/game/id/${dlc.id}`}>
                                                    <Card.Img style={{height : "170px"}} src={dlc.cover && resize(dlc.cover.url)}
                                                    />
                                                    <Card.Body className="p-1">
                                                        <Card.Text style={{fontSize : "12px"}}>{dlc.name}</Card.Text>
                                                    </Card.Body>
                                                </Link>
                                            </Card>
                                        ))}
                                    </Row>
                                </Card>
                            </Row>
                        )}

                        {/** Expansions **/}
                        {game.expansions && (
                            <Row className="mb-2">
                                <Card>
                                    <Row className="p-3">
                                        <h4>Expansions </h4>
                                        {game.expansions.map(exp => (
                                            <Card className="text-center mx-3 p-0"  style={{width : "130px"}}>
                                                <Link to={`/game/id/${exp.id}`}>
                                                    <CardImg style={{height : "170px"}} src={exp.cover.url && resize(exp.cover.url)}/>
                                                    <Card.Body className="p-1">
                                                        <Card.Text style={{fontSize : "12px"}}>{exp.name}</Card.Text>
                                                    </Card.Body>
                                                </Link>
                                            </Card>
                                        ))}
                                    </Row>
                                </Card>
                            </Row>
                        )}

                        {/** Expandable games **/}
                        {game.expanded_games && (
                            <Row className="mb-2">
                                <Card>
                                    <Row className="p-3">
                                        <h4>Expansions </h4>
                                        {game.expanded_games.map(exp => (
                                            <Card className="text-center mx-3 p-0"  style={{width : "130px"}}>
                                                <Link to={`/game/id/${exp.id}`}>
                                                    <CardImg style={{height : "170px"}} src={exp.cover.url && resize(exp.cover.url)}/>
                                                    <Card.Body className="p-1">
                                                        <Card.Text style={{fontSize : "12px"}}>{exp.name}</Card.Text>
                                                    </Card.Body>
                                                </Link>
                                            </Card>
                                        ))}
                                    </Row>
                                </Card>
                            </Row>
                        )}

                    </Row>


                    <Row className="px-0 mt-2">
                        {/** Similar games **/}
                            <Col className="px-0">
                                {game.similar_games &&(
                                    <Card>
                                        <Row className="mt-4 border-top pt-2">
                                            <h5>Similar Games</h5>
                                            {game.similar_games.map(sim => (
                                                <Col md={2}>
                                                    <Link className="text-decoration-none" to={`/game/id/${sim.id}`}>
                                                        <Image style={{
                                                            width: "5vw",
                                                            borderStyle : "double",
                                                            boxShadow: "1px 1px 1px 1px black",
                                                            WebkitBoxShadow: "1px 1px 1px 1px black",
                                                            border: "0.5px solid white",
                                                        }} src={sim.cover && resize(sim.cover.url)}/>
                                                        <h5 key={sim.id}>{sim.name}</h5>
                                                    </Link>
                                                </Col>
                                            ))}
                                    </Row>
                                </Card>
                                )}
                            </Col>
                        </Row>

                    </Row>


            </Container>


        </div>

    )
}


export default ExampleGame;