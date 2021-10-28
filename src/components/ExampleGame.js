import {allFields, useClientData} from "../utilities/axios";
import {
    checkData,
    convertAge,
    convertScore,
    convertTime, logo_resize,
    resize,
    screenshotResize
} from "../utilities/converters";

import {
    Badge,
    Card,
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

    const {data: game} = useClientData('/games', allFields + 'w id=1877;') //19565

    checkData(game)

    return (

        <div className="App">

            {/** Header **/}
            <Container fluid>

                {/** Header image **/}
                <Row className="align-items-center mb-2"
                    style={{
                        backgroundImage: `url(https:${game.screenshots 
                            ? screenshotResize(game.screenshots[0].url) 
                            : null
                        })`,
                        backgroundSize: "cover",
                        height: "35vh",
                        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.7)", color : "white",
                    }}>


                    {/** Cover, title, release dates and cover **/}
                    <Col>
                        <Container>

                            <Row>
                                <Col md="auto">
                                    <Image fluid
                                           src={resize(game.cover.url && game.cover.url)} rounded
                                           style={{
                                               marginBottom: "10px",
                                               boxShadow: "4px 2px 2px 2px black",
                                               WebkitBoxShadow: "2px 2px 2px 2px black",
                                               border: "0.5px solid white",
                                               height: "25vh"
                                           }}/>
                                </Col>

                                <Col md={7} className="text-start">

                                    <Row className="pb-3">
                                        <span style={{
                                            textShadow: "2px 2px #000000",
                                            fontSize: "6vmin"
                                      }}>{game.name}</span>
                                    </Row>

                                    <Row className="pb-4">
                                        <Col>
                                            <span className="fs-5">First Released: {game.first_release_date && convertTime(game.first_release_date)}</span>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <span className="fs-5">
                                            {game.genres && game.genres.map((genres, index) => (
                                                <Link className="text-decoration-none" to={`/game/id/${genres.id}`}>
                                                    {/*<span*/}
                                                    {/*    style={{*/}
                                                    {/*        textShadow: "2px 2px #000000",*/}
                                                    {/*        color : "white"*/}
                                                    {/*    }}*/}
                                                    {/*>*/}
                                                    {/*    { (index ? ', ' : '') + genres.name}</span>*/}

                                                    <Badge style={{marginRight : "2%", padding : "8px"}} pill bg="myPill">{genres.name}</Badge>
                                                </Link>
                                            ))}
                                            </span>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col className="align-self-center">
                                    <svg>
                                        <defs>

                                            <linearGradient id="medium" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="8%" stopColor="#fca746" stopOpacity="1" />
                                                <stop offset="73%" stopColor="#f9dc5c" stopOpacity="1" />
                                            </linearGradient>

                                            <linearGradient id="best" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="27%" stopColor="#4eecbb" stopOpacity="1" />
                                                <stop offset="73%" stopColor="#69fc46" stopOpacity="1" />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="70" cy="70" r="70"
                                                stroke="white"
                                                strokeWidth="1"
                                                style={{fill : (game.aggregated_rating >= 87) ? "url(#best)" : "url(#medium)"}}
                                        />
                                        <text x="70" y="90"
                                              textAnchor="middle"
                                              fontSize="30px"
                                              fill="white"
                                              alignmentBaseline="middle">
                                            <tspan y="70">{game.aggregated_rating && convertScore(game.aggregated_rating)}</tspan>
                                            <tspan fontSize="14px" x="70" dy="2em">{game.aggregated_rating_count && game.aggregated_rating_count} votes</tspan>
                                        </text>
                                    </svg>

                                </Col>


                            </Row>
                        </Container>
                    </Col>
                </Row>

            </Container>


            {/** Cover, Title, Date, Genres, Plats **/}
            <Container className="bg-transparent">


                {/** Summary and Sidebar **/}
                <Row>

                    {/** Main Page **/}
                    <Col md={8} className="px-0">

                        <Row className="text-sm-start pt-2" style={{fontSize: "16px"}}>



                            {/** DLCs **/}

                            {game.dlcs && (
                                <Row className="mb-2">
                                    <Card>
                                        <Row className="p-3">
                                            <h4>DLCs & Expansions </h4>
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


                            {/** Summary and storyline **/}
                            <Row className="mb-2">
                                <Card>{game.summary && (<Col className="p-3"> <h4>Summary </h4> {game.summary} </Col>)}</Card>
                            </Row>

                            <Row className="mb-2">
                                <Card>{game.storyline && (<Col className="p-3"><h4>Storyline </h4> {game.storyline} </Col>)}</Card>
                            </Row>


                        {/** Screenshots **/}
                        <Row>

                                {game.screenshots && (
                                    <Card>
                                <Col>
                                <h4>Images</h4>

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

                        </Row>


                    </Col>


                    {/** Sidebar **/}
                    <Col md={4} className="px-0 py-2" style={{fontSize: "1rem"}}>

                        <Card className="">
                            <Row>
                                <Col md={4} className="text-black-50 border-end my-3">Platforms</Col>

                                <Col className="text-start px-4">
                                    {game.platforms && game.platforms.map(platforms => (
                                                <Link className="text-decoration-none" to={`/platform/${platforms.slug}`}>
                                                    <Row className="my-3">
                                                        <Col md="auto">
                                                            <Image style={{width : "35px"}} src={platforms.platform_logo && logo_resize(platforms.platform_logo.url)}/>
                                                        </Col>

                                                        <Col>
                                                            <p>{platforms.name} </p>
                                                        </Col>
                                                    </Row>
                                                </Link>
                                            ))}
                                </Col>
                            </Row>
                        </Card>

                        <Card className="mt-2 py-2">
                            <Row>
                                <Col md={4} className="text-black-50 border-end">Developers</Col>

                                <Col className="text-start px-4">
                                    {game.involved_companies && game.involved_companies.map(companies => (
                                        <p>{companies.company.name}</p>
                                    ))}
                                </Col>
                            </Row>
                        </Card>

                        <Card className="mt-2 py-2">
                            <Row>
                                <Col md={4} className="text-black-50 border-end">Release Dates</Col>

                                <Col className="text-start px-4">
                                    {game.release_dates && game.release_dates.map(date => (
                                                <Row className="pb-2">
                                                    <p className="">{date.platform.name}: {date.human} </p>
                                                </Row>
                                            ))}
                                </Col>
                            </Row>
                        </Card>


                        <Card>
                            <Row>
                                <Col md={4} className="text-black-50 border-end">Age Ratings</Col>

                                <Col>
                                    {game.age_ratings && game.age_ratings.map(age => (
                                        <Col className="p-2 text-end">
                                            <Image style={{height: "50px", width: "40px"}} src={convertAge(age.rating)}/>
                                        </Col>
                                    ))}
                                    <>
                                        {game.age_ratings && game.age_ratings.map(age => (
                                            <Col>
                                                {age.content_descriptions && age.content_descriptions.map(desc => (
                                                    <p>{desc.description}</p>
                                                ))}
                                            </Col>
                                        ))}
                                        </>
                                </Col>
                            </Row>
                        </Card>


                        {/*/!** Platforms **!/*/}
                        {/*<Row className="px-2">*/}
                        {/*    <Col className="text-start border-end">Platforms</Col>*/}
                        {/*    <Col className="text-end">*/}
                        {/*        {game.platforms && game.platforms.map(platforms => (*/}
                        {/*            <Link className="text-decoration-none" to={`/platform/${platforms.slug}`}>*/}
                        {/*                <p>{platforms.name} </p>*/}
                        {/*            </Link>*/}
                        {/*        ))}*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}

                        {/*/!** Detailed release dates **!/*/}
                        {/*    <Row className="px-2">*/}
                        {/*    <Col className="text-start border-end">Release Dates</Col>*/}
                        {/*    <Col className="text-start">*/}
                        {/*        {game.release_dates && game.release_dates.map(date => (*/}
                        {/*            <Row className="pb-4">*/}
                        {/*                <Col>{date.m}/{date.y} </Col>*/}
                        {/*                <Col>{date.platform.name}</Col>*/}
                        {/*            </Row>*/}
                        {/*        ))}*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}

                        {/*/!** Developers **!/*/}
                        {/*    <Row className="border px-2">*/}
                        {/*    <Col className="text-start border-end">Developers</Col>*/}
                        {/*    <Col className="text-end">*/}
                        {/*        {game.involved_companies && game.involved_companies.map(companies => (*/}
                        {/*            <p>{companies.company.name}</p>*/}
                        {/*        ))}*/}

                        {/*    </Col>*/}
                        {/*</Row>*/}

                        {/*/!** Age ratings **!/*/}
                        {/*<Row className="mt-2 mb-2 border">*/}
                        {/*    <Col className="text-start border-end">Age Ratings</Col>*/}
                        {/*    <Col>*/}
                        {/*        {game.age_ratings && game.age_ratings.map(age => (*/}
                        {/*            <Col className="p-2 text-end">*/}
                        {/*                <Image style={{height: "50px", width: "40px"}} src={convertAge(age.rating)}/>*/}
                        {/*            </Col>*/}
                        {/*        ))}*/}
                        {/*        <>*/}
                        {/*            {game.age_ratings && game.age_ratings.map(age => (*/}
                        {/*                <Col className="text-end">*/}
                        {/*                    {age.content_descriptions && age.content_descriptions.map(desc => (*/}
                        {/*                        <p>{desc.description}</p>*/}
                        {/*                    ))}*/}
                        {/*                </Col>))}*/}
                        {/*        </>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}

                        {/*/!** Player perspectives and game modes **!/*/}
                        {/*<Row className="border">*/}
                        {/*    <Row>*/}
                        {/*        <Col className="text-start border-end">Perspectives</Col>*/}
                        {/*        <Col className="text-end p-0">*/}
                        {/*            {game.player_perspectives && game.player_perspectives.map(pp => (*/}
                        {/*                <p>{pp.name}</p>*/}
                        {/*            ))}*/}
                        {/*        </Col>*/}
                        {/*    </Row>*/}

                        {/*    <Row>*/}

                        {/*        <Col className="text-start border-end">Game Modes</Col>*/}
                        {/*        <Col className="text-end p-0">*/}
                        {/*            {game.game_modes && game.game_modes.map(gm => (*/}
                        {/*                <p>{gm.name}</p>*/}
                        {/*            ))}*/}
                        {/*        </Col>*/}
                        {/*    </Row>*/}

                        {/*</Row>*/}

                        {/*/!** Franchises **!/*/}
                        {/*{game.franchises && (*/}
                        {/*    <Row className="pt-3 mt-3 border">*/}
                        {/*        <Col className="text-start">Franchises</Col>*/}
                        {/*        <Col className="text-end">*/}
                        {/*            {game.franchises.map(fr => (*/}
                        {/*                <p>{fr.name}</p>*/}
                        {/*            ))}*/}
                        {/*        </Col>*/}
                        {/*    </Row>*/}
                        {/*)}*/}

                        {/*</Card>*/}
                    </Col>

                </Row>


                {/** Similar games **/}
                <Row className="mt-4 border-top pt-2">
                    <h5>Similar Games</h5>
                    {game.similar_games && game.similar_games.map(sim => (
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

            </Container>


        </div>

    )
}


export default ExampleGame;