import {allFields, useClientData} from "../utilities/axios";
import {checkData, convertAge, convertTime, resize, screenshotResize} from "../utilities/converters";
import {
    Badge,
    Button, Card,
    Carousel,
    CarouselItem,
    Col,
    Container,
    Image,
    Row
} from "react-bootstrap";
import {Link} from "react-router-dom";


/**
 * Renders single game object for testing purpose
 * @returns {JSX.Element}
 * @constructor
 */
const ExampleGame = () => {

    const {data: game} = useClientData('/games', allFields + 'w id=1020;')

    checkData(game)

    return (

        <div className="App bg-myBgBg">

            {/** Header Image **/}
            <Container>
                <Row style={{
                    backgroundImage: `url(https:${game.screenshots
                        ? screenshotResize(game.screenshots[0].url)
                        : null
                    })`,
                    backgroundSize: "cover",
                    height: "35vh",
                    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.7)",
                    color : "white",
                }}>

                    <Col md="auto" className="text-end align-self-center">
                        <Image fluid src={resize(game.cover.url && game.cover.url)} rounded
                               style={{
                                   marginBottom: "10px",
                                   boxShadow: "4px 2px 2px 2px black",
                                   WebkitBoxShadow: "2px 2px 2px 2px black",
                                   border: "0.5px solid white",
                                   height: "25vh"
                               }}/>
                    </Col>


                    <Col md={8} className="text-start align-self-center">
                        <Row>
                            <span
                                  style={{
                                      textShadow: "2px 2px #000000",
                                      fontSize: "3vmax"
                                  }}
                            >
                                {game.name}
                            </span>
                        </Row>


                        <Row>
                            <Col md={3}>
                                <h6>First Released: {game.first_release_date && convertTime(game.first_release_date)}</h6>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                {game.genres && game.genres.map(gen => (
                                    <Badge pill bg="primary" style={{marginRight : "10px"}}>{gen.name}</Badge>
                                ))}
                            </Col>
                        </Row>

                    </Col>
                </Row>

            </Container>


            {/** Cover, Title, Date, Genres, Plats **/}
            <Container className="pt-1">

                {/*/!** Header **!/*/}
                {/*<Row className="mt-0 bg-myDark text-white p-3">*/}
                {/*    <Col md={"auto"}>*/}
                {/*        <Image fluid src={resize(game.cover.url && game.cover.url)} rounded*/}
                {/*               style={{*/}
                {/*                   marginBottom: "10px",*/}
                {/*                   boxShadow : "4px 2px 2px 2px black",*/}
                {/*                   WebkitBoxShadow :"2px 2px 2px 2px black",*/}
                {/*                   border : "0.5px solid white",*/}
                {/*                   height: "25vh"}}/>*/}
                {/*    </Col>*/}


                {/*    <Col md={8} className="text-sm-start px-3">*/}

                {/*        <Row className="border-bottom mb-2">*/}
                {/*            <h1 style={{fontSize : "2.5vw"}}>*/}
                {/*                {game.name}*/}
                {/*            </h1>*/}
                {/*        </Row>*/}

                {/*        <Row className="mb-2">*/}
                {/*            <h6>First Released: {game.first_release_date && convertTime(game.first_release_date)}</h6>*/}
                {/*        </Row>*/}

                {/*        <Row className="mb-3">*/}
                {/*            <Col>*/}
                {/*                {game.genres && game.genres.map(genres => (*/}
                {/*                    <Badge pill className="bg-myGrad" style={{fontSize : "1vmin", padding : "10px", marginRight : "14px"}}>{genres.name}</Badge>*/}
                {/*                ))}*/}
                {/*            </Col>*/}
                {/*        </Row>*/}

                {/*        <Row className="mt-4">*/}
                {/*            <Col>Rating: {game.aggregated_rating && game.aggregated_rating}</Col>*/}
                {/*        </Row>*/}

                {/*    </Col>*/}

                {/*</Row>*/}


                {/** Summary and Sidebar **/}
                <Row className="mt-3 text-white">

                    {/** Main Page **/}
                    <Col md={8}>

                        <Row className="text-sm-start bg-myDark pt-4" style={{fontSize: "16px"}}>

                            <Row className="mb-5 px-4">
                                <h4>Summary</h4>
                                <article>{game.summary && game.summary}</article>
                            </Row>

                            <Row className="mb-5 px-4">
                                <h4>Storyline</h4>
                                <article>{game.storyline && game.storyline}</article>
                            </Row>

                        </Row>

                        <Row>

                            <Col className="bg-myDark">
                                <Card>
                                    <Carousel>
                                        {game.screenshots && game.screenshots.map(image => (
                                            <CarouselItem>
                                                <Image src={image.url && screenshotResize(image.url)} fluid/>
                                            </CarouselItem>
                                        ))}
                                    </Carousel>

                                </Card>
                            </Col>
                        </Row>

                    </Col>


                    {/** Sidebar **/}
                    <Col md className="text-white" style={{marginLeft: "2%", fontSize: "1rem"}}>


                        <Row className="pt-3 bg-myDark mb-2">
                            <Col className="text-white-50 text-start">Platforms</Col>
                            <Col className="text-end">
                                {game.platforms && game.platforms.map(platforms => (
                                    <p>{platforms.name}</p>
                                ))}
                            </Col>
                        </Row>


                        <Row className="pt-3 bg-myDark mb-2">
                            <Col className="text-white-50 text-start">Age Ratings</Col>
                            <Col>
                                {game.age_ratings && game.age_ratings.map(age => (
                                    <Col className="p-2 text-end">
                                        <Image style={{height: "50px", width: "40px"}} src={convertAge(age.rating)}/>
                                    </Col>
                                ))}
                                <>
                                    {game.age_ratings && game.age_ratings.map(age => (
                                        <Col className="text-end">
                                            {age.content_descriptions && age.content_descriptions.map(desc => (
                                                <p>{desc.description}</p>
                                            ))}
                                        </Col>))}
                                </>
                            </Col>
                        </Row>


                        <Row className="bg-myDark text-white pt-3">
                            <Row>
                                <Col className="text-white-50 text-start">Perspectives</Col>
                                <Col className="text-end p-0">
                                    {game.player_perspectives && game.player_perspectives.map(pp => (
                                        <p>{pp.name}</p>
                                    ))}
                                </Col>
                            </Row>

                            <Row>

                                <Col className="text-white-50 text-start">Game Modes</Col>
                                <Col className="text-end p-0">
                                    {game.game_modes && game.game_modes.map(gm => (
                                        <p>{gm.name}</p>
                                    ))}
                                </Col>
                            </Row>

                        </Row>


                        <Row className="pt-3 mt-3 bg-myDark text-white">
                            <Col className="text-white-50 text-start">Developers</Col>
                            <Col className="text-end">
                                {game.involved_companies && game.involved_companies.map(companies => (
                                    <p>{companies.company.name}</p>
                                ))}

                            </Col>
                        </Row>

                        <Row className="bg-myDark text-white pt-3 mt-3">
                            <Col className="text-white-50 text-start">Franchises</Col>
                            <Col className="text-end">
                                {game.franchises && game.franchises.map(fr => (
                                    <p>{fr.name}</p>
                                ))}
                            </Col>
                        </Row>

                    </Col>
                </Row>


                <Row className="mt-2 bg-myDark text-white">
                    <h5>Similar Games</h5>
                    {game.similar_games && game.similar_games.map(sim => (
                        <Col md={3}>
                            <Link className="text-decoration-none" to={`/game/id/${sim.id}`}>
                                <Image style={{width: "10vw"}} src={sim.cover && resize(sim.cover.url)}/>
                                <p key={sim.id}>{sim.name}</p>
                            </Link>
                        </Col>
                    ))}
                </Row>

            </Container>


        </div>
    )
}

export default ExampleGame;