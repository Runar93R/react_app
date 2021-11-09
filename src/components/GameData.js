import {allFields, useClientData} from "../utilities/axios";
import {
    checkData,
    convertAge,
    convertScore,
    convertDate,
    resize,
    upscale, large_placeholder, cover_placeholder, rateColor, logo_resize, convertCategory
} from "../utilities/converters";
import {
    Card,
    Carousel,
    CarouselItem,
    Col,
    Container,
    Image, ListGroup, ListGroupItem,
    Row,
} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import {
    AiOutlineEye, BiBuilding,
    BiCategory,
    BiTerminal,
    BsDot, BsGear,
    BsListStars,
    IoGameControllerOutline,
    MdFavoriteBorder, MdLanguage
} from "react-icons/all";
import {ContentCol, ContentRow, ImageGrid, ImageModal, MetaCol} from "./CustomComponents";
import {FaNetworkWired, FaTheaterMasks} from "react-icons/fa";
import {YouTubeFrame} from "../utilities/YouTubeFrame";

/**
 * Renders data for a single game object
 * @returns {JSX.Element}
 * @constructor
 */
const GameData = () => {

    /** useParam to get unique id for game **/
    const {slug} = useParams();
    const {data: game} = useClientData('/games', allFields +`w slug="${slug}";` );

    const [modalShow, setModalShow] = useState(false);
    const [image, setImage] = useState(large_placeholder)

    const handleModal = (image) => {
        setModalShow(true)
        setImage(image);
    }

    return (

        <div className="App bg-white">

            {/** Banner **/}
            <Container fluid>

                {/** Banner image **/}
                <Row className="text-lg-start text-white"
                     style={{
                         backgroundImage: `url(${game.screenshots
                             ? upscale(game.screenshots[0].url)
                             : large_placeholder})`,
                         backgroundSize: "cover",
                         backgroundPosition: "",
                         height: "auto",
                     }}>

                    {/** Info overlay **/}
                    <Col lg={12} className="py-4">

                        <Container>


                            <Row className="py-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>

                                {/** Cover image **/}
                                <Col md={"auto"}>
                                    <Image className="border border-white"
                                           src={game.cover ? resize(game.cover.url) : cover_placeholder}
                                           style={{height: "25vh"}}/>
                                </Col>

                                <Col className="px-0 align-self-start">

                                    {/** Title, release date and summary **/}
                                    <Col md={10}>

                                        <h1 style={{
                                            lineHeight : "1.4",
                                            fontSize: "5vh",
                                            fontWeight : "600",
                                            textShadow: "3px 3px #000000",
                                            borderBottom: "1px solid white",
                                        }}>{game.name}</h1>

                                        {game.first_release_date ?
                                            <Row className="">
                                                <Col>
                                                    <p style={{fontSize : "1em"}}>
                                                        <BsDot/>First released: {convertDate(game.first_release_date)}
                                                    </p>
                                                </Col>
                                            </Row> : "No release date" }

                                        {game.summary ?
                                            <Row>
                                                <Col className="py-4 shadow">
                                                    <h5>{game.summary}</h5>
                                                </Col>
                                            </Row> : null}

                                    </Col>


                                </Col>


                                {/** Add to favorite **/}
                                <Col md={"auto"} style={{marginLeft : "auto", paddingRight : "0.7vw"}}>
                                    <Row>
                                        <span className="fs-2"><MdFavoriteBorder style={{verticalAlign: 'baseline'}}/></span>
                                    </Row>
                                </Col>
                            </Row>

                        </Container>

                    </Col>

                </Row>
            </Container>


            {/** Page content **/}
            <Container>

                {/** Main container **/}
                <Row>
                    <Col lg={12} className="text-lg-start">

                        <Row className="py-2" style={{fontSize: "16px"}}>

                            {/** Rating **/}
                            <ContentCol title={"Rating"} icon={<BsListStars/>}
                                        props={
                                            <>
                                                {rateColor(game.total_rating && game.total_rating)}
                                                <Row className="text-center">
                                                    <Col>
                                                        {game.total_rating_count ? game.total_rating_count : 0} votes
                                                    </Col>
                                                </Row>
                                            </>
                                        }/>

                            {/** Genres **/}
                            {game.genres && (
                                <ContentCol title={"Genres"} icon={<FaTheaterMasks/>} props={
                                    <ListGroup variant="flush">
                                        {game.genres.map(genre => (
                                            <ListGroupItem>
                                                {genre.name}
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                }/>
                            )}

                            {/** Platforms **/}
                            <ContentCol title={"Platforms"} icon={<IoGameControllerOutline/>}
                                        props={
                                            <ListGroup variant="flush">
                                                {game.platforms && game.platforms.map(platforms => (
                                                    <ListGroupItem>
                                                        <Row>
                                                            <Col xs={4} className="text-end">
                                                                <Image style={{width: "32px"}}
                                                                       src={platforms.platform_logo &&
                                                                       logo_resize(platforms.platform_logo.url)}/>
                                                            </Col>

                                                            <Col className="btn-group-vertical">
                                                                <span>{platforms.name}</span>
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                ))}
                                            </ListGroup>
                                        }/>


                            {/** Text and Images **/}
                            <Col>

                                {/** Screenshots **/}
                                {game.screenshots && (
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
                                )}


                                {/** Storyline **/}
                                {game.storyline && (
                                    <ContentRow title={"Storyline"} props={game.storyline}/>
                                )}

                            </Col>


                            {/** Meta data of the game **/}

                            <Row className="mx-auto">

                                {/** Category **/}
                                <Col lg={3} className="mb-5">
                                    <Row>
                                        <Col>
                                            <span style={{color : "rgba(63,63,63,0.88)"}}>
                                                Category <BiCategory/>
                                            </span>
                                        </Col>
                                    </Row>

                                    <Row className="pt-2">
                                        <Col>
                                            {convertCategory(game.category)}
                                        </Col>
                                    </Row>
                                </Col>

                                {/** Developer **/}
                                {game.involved_companies && (
                                    <MetaCol title={"Developers"} icon={<BiTerminal/>}
                                             props={game.involved_companies.map(dev => dev.company.name)}/>
                                )}

                                {/** Game mode **/}
                                {game.game_modes && (
                                    <MetaCol title={"Game Modes"} icon={<FaNetworkWired/>}
                                             props={game.game_modes.map(mode => mode.name)}/>
                                )}

                                {/** Player perspective **/}
                                {game.player_perspectives && (
                                    <MetaCol title={"P.O.V"} icon={<AiOutlineEye/>}
                                             props={game.player_perspectives.map(pov => pov.name)} />
                                )}

                                {/** Game engine **/}
                                {game.game_engines && (
                                    <MetaCol title={"Game Engine"} icon={<BsGear/>}
                                             props={game.game_engines.map(engine => engine.name)}/>
                                )}

                                {/** Developers **/}
                                {game.franchises && (
                                    <MetaCol title={"Franchises"} icon={<BiBuilding/>}
                                             props={game.franchises.map(fran => fran.name)}/>
                                )}

                                {/** Alternative name **/}
                                {game.alternative_names && (
                                    <MetaCol title={"Alternative Names"} icon={<MdLanguage/>}
                                             props={game.alternative_names.map(alt => alt.name)}/>
                                )}

                            </Row>


                            <Col>

                                {/** Videos **/}
                                {game.videos && (
                                    <Row className="text-center">
                                        {game.videos.map(vid => (
                                            <YouTubeFrame id={vid.video_id} video={vid.name}/>
                                        ))}
                                    </Row>
                                )}



                                {/**
                                 ____________________________
                                 CONTENT
                                 ToDo:

                                 Row with the games' collection.

                                 - Col of DLC games
                                 - Col of Expansions and Expanded Games
                                 - Series of the game (Collection)


                                 Age Ratings with descriptions

                                 Multiplayer Modes

                                 Similar Games and Themes

                                 Artworks, if necessary?

                                 _______________________________

                                 DATA

                                 ToDo:
                                 Create Link to other components, e.g. <Link to platform.slug/>

                                 Placeholder and progress for every component that contains props

                                 **/}

                            </Col>

                            <Col>
                                {game.similar_games && (
                                <Row>
                                    {game.similar_games.map(sim => (
                                        <Col><Link to={`/game/${sim.slug}`}>{sim.name}</Link></Col>
                                    ))}
                                </Row>
                                )}
                            </Col>

                        </Row>

                        <Row className="mt-4 text-center">
                            <h2>Footer</h2>
                        </Row>

                    </Col>
                </Row>

            </Container>

        </div>

    )
}

export default GameData;