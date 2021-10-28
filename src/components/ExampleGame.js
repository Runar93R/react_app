import {allFields, useClientData} from "../utilities/axios";
import {
    checkData,
    convertAge,
    convertScore,
    convertTime,
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

    const {data: game} = useClientData('/games', allFields + 'w id=19441;')

    checkData(game)

    return (

        <div className="App">

            {/** Header **/}
            <Container fluid>

                {/** Header image **/}
                <Row className="align-items-center"
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

                                <Col md={8} className="text-start">

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
                                            <radialGradient id="myGradient">
                                                <stop offset="10%" stopColor="#141e30" />
                                                <stop offset="90%" stopColor="black" />
                                            </radialGradient>
                                        </defs>
                                        <circle cx="80" cy="80" r="70"
                                                stroke="white"
                                                strokeWidth="2"
                                                fill="url(#myGradient)"
                                        />
                                        <text x="80" y="90"
                                              textAnchor="middle"
                                              fontSize="25px"
                                              fill="white"
                                              alignmentBaseline="middle">

                                            <tspan y="80">{game.aggregated_rating && convertScore(game.aggregated_rating)}</tspan>
                                            <tspan fontSize="14px" x="80" dy="2em">{game.aggregated_rating_count && game.aggregated_rating_count} votes</tspan>
                                        </text>
                                    </svg>

                                </Col>


                            </Row>
                        </Container>
                    </Col>
                </Row>

            </Container>


            {/** Cover, Title, Date, Genres, Plats **/}
            <Container className="bg-white">

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
                <Row className="mt-1">

                    {/** Main Page **/}
                    <Col md={8}>

                        <Row className="text-sm-start pt-4" style={{fontSize: "16px"}}>

                            {/** DLCs **/}
                            <Row className="mb-2 px-4">
                                {game.dlcs && (
                                    <>
                                        <h4>DLCs & Expansions: </h4>
                                        {game.dlcs.map(dlc => (
                                            <Col className="text-center border border-dark">
                                                <Image src={dlc.cover.url && resize(dlc.cover.url)}
                                                       style={{width : "100px", height : "130px"}}
                                                />
                                                <p style={{fontSize : "12px"}}>{dlc.name}</p>
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </Row>

                            {/** Summary and storyline **/}
                            <Row className="mb-5 px-4">
                                <>{game.storyline && (<Col> <h4>Storyline </h4> {game.storyline} </Col>)}</>
                            </Row>

                            <Row className="mb-5 px-4">
                                <>{game.storyline && (<Col> <h4>Storyline </h4> {game.storyline} </Col>)}</>
                            </Row>

                        </Row>

                        {/** Screenshots **/}
                        <Row>

                            <Col>
                                <Card>
                                    <span className="bg-dark text-white fs-5">Screenshots</span>
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

                        {/** Artworks **/}
                        <Row className="mt-3 p-2">
                            {game.artworks && game.artworks.map(art => (
                                <Col md={4} className="m-1 p-1">
                                    <Image
                                        src={art.url && resize(art.url)}
                                        style={{ width : "150px"}}
                                    />
                                </Col>
                            ))}
                        </Row>

                    </Col>


                    {/** Sidebar **/}
                    <Col md className="p-3" style={{marginLeft: "2%", fontSize: "1rem"}}>


                        {/** Platforms **/}
                        <Row className="border">
                            <Col className="text-start border-end">Platforms</Col>
                            <Col className="text-end">
                                {game.platforms && game.platforms.map(platforms => (
                                    <Link className="text-decoration-none" to={`/platform/${platforms.slug}`}>
                                        <p>{platforms.name} </p>
                                    </Link>
                                ))}
                            </Col>
                        </Row>

                        {/** Detailed release dates **/}
                        <Row className="border">
                            <Col className="text-start border-end">Release Dates</Col>
                            <Col className="text-start">
                                {game.release_dates && game.release_dates.map(date => (
                                    <Row className="pb-4">
                                        <Col>{date.m}/{date.y} </Col>
                                        <Col>{date.platform.name}</Col>
                                    </Row>
                                ))}
                            </Col>
                        </Row>

                        {/** Developers **/}
                        <Row className="border">
                            <Col className="text-start border-end">Developers</Col>
                            <Col className="text-end">
                                {game.involved_companies && game.involved_companies.map(companies => (
                                    <p>{companies.company.name}</p>
                                ))}

                            </Col>
                        </Row>

                        {/** Age ratings **/}
                        <Row className="mt-2 mb-2 border">
                            <Col className="text-start border-end">Age Ratings</Col>
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

                        {/** Player perspectives and game modes **/}
                        <Row className="border">
                            <Row>
                                <Col className="text-start border-end">Perspectives</Col>
                                <Col className="text-end p-0">
                                    {game.player_perspectives && game.player_perspectives.map(pp => (
                                        <p>{pp.name}</p>
                                    ))}
                                </Col>
                            </Row>

                            <Row>

                                <Col className="text-start border-end">Game Modes</Col>
                                <Col className="text-end p-0">
                                    {game.game_modes && game.game_modes.map(gm => (
                                        <p>{gm.name}</p>
                                    ))}
                                </Col>
                            </Row>

                        </Row>

                        {/** Franchises **/}
                        {game.franchises && (
                            <Row className="pt-3 mt-3 border">
                                <Col className="text-start">Franchises</Col>
                                <Col className="text-end">
                                    {game.franchises.map(fr => (
                                        <p>{fr.name}</p>
                                    ))}
                                </Col>
                            </Row>
                        )}
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