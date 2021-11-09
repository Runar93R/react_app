import {allFields, useClientData} from "../utilities/axios";
import {
    checkData,
    convertAge,
    convertCategory, convertMultiplayer,
    convertScore,
    convertDate,
    logo_resize, rateColor,
    resize,
    upscale
} from "../utilities/converters";

import {GameAccordion, InfoCard, ContentCard} from "./CustomComponents";

import {
    Accordion,
    Badge,
    Card, CardGroup, CardImg,
    Carousel,
    CarouselItem,
    Col,
    Container,
    Image, ListGroup, ListGroupItem, Overlay, OverlayTrigger, Popover, PopoverBody, PopoverHeader, ProgressBar,
    Row, Tooltip
} from "react-bootstrap";
import {Link} from "react-router-dom";
import {GiConsoleController} from "react-icons/gi";
import {AiFillPlusSquare, AiOutlineCode, AiOutlineUnderline} from "react-icons/ai";
import {RiCalendar2Fill, RiParentLine} from "react-icons/ri";
import {BiBuildingHouse, BiCategoryAlt, BiUnderline} from "react-icons/bi"
import {Fa500Px, FaCalendarAlt, FaNetworkWired, FaStreetView, FaTheaterMasks} from "react-icons/fa"
import {
    CgDetailsMore,
    FcCheckmark,
    GoInfo,
    HiOutlineMinus, ImStarEmpty,
    MdFavoriteBorder,
    MdNetworkWifi,
    MdOutlineFavoriteBorder
} from "react-icons/all";
import {ListNested, Star, StarFill} from "react-bootstrap-icons";

/**
 * Renders single game object for testing purpose
 * @returns {JSX.Element}
 * @constructor
 */
const ExampleGame = () => {

    const {data: game} = useClientData('/games', allFields + 'w slug="grand-theft-auto-v";') //19565 // 145505

    checkData(game)

    return (

        <div className="App bg-white">

            {/** Banner **/}
            <Container className="px-0">

                {/** Banner image **/}
                <Row className="text-lg-start text-white px-5"
                     style={{
                         backgroundImage: `url(https:${game.screenshots
                             ? upscale(game.screenshots[0].url)
                             : null})`,
                         backgroundSize: "cover",
                         height: "auto",
                     }}>
                    {/** Info overlay **/}
                    <Col lg={12} className="py-4">
                        <Row className="py-2" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>

                            <Col md={"auto"}>
                                <Image src={game.cover && resize(game.cover.url)} className="border border-white"
                                       style={{height: "27vh"}}/>

                            </Col>


                            <Col md={7} className="align-self-end">
                                <Row>
                                    <Col>

                                        <h1 style={{
                                            fontSize: "4vh",
                                            textShadow: "3px 3px #000000",
                                            borderBottom: "1px solid white"
                                        }}>{game.name}</h1>

                                        {game.first_release_date && (
                                        <Row className="py-4"><span style={{fontSize: "1.3em"}}>
                                            <FaCalendarAlt/> {convertDate(game.first_release_date)}
                                        </span></Row>
                                        )}

                                        {game.genres && (
                                        <Row><span style={{fontSize: "1.4em"}}>
                                            <FaTheaterMasks/> {game.genres.map((genres) => (
                                            <Link className="mx-1 text-decoration-none" to={`/game/id/${genres.id}`}>
                                                <Badge pill bg={"myPill"} className="text-white">{genres.name}</Badge>
                                            </Link>
                                        ))}</span></Row>
                                        )}

                                    </Col>
                                </Row>
                            </Col>

                            <Col md={"auto"} style={{marginLeft : "auto", paddingRight : "1vw"}}>
                                <Row>
                                    <span className="fs-2"><ImStarEmpty style={{verticalAlign: 'baseline'}}/></span>
                                </Row>
                            </Col>

                        </Row>
                    </Col>

                </Row>
            </Container>


            {/** Page content **/}
            <Container className="bg-transparent">

                {/** Main container **/}
                <Row>

                    {/** Main page **/}
                    <Col md={8} className="px-0">

                        <Row className="text-sm-start py-2" style={{fontSize: "16px"}}>


                            {game.total_rating && (
                                <ContentCard title={""}
                                             props={
                                                 <>
                                                     <Row>
                                                         <Col md={4}>
                                                             Rating {rateColor(game.total_rating)}
                                                         </Col>
                                                     </Row>

                                                     <Row>
                                                         <span>{game.total_rating_count} votes </span>
                                                     </Row>

                                                 </>
                                             }/>
                            )}

                            {/** Summary **/}
                            {game.summary && (
                            <ContentCard title={"Summary"} props={game.summary}/>
                            )}


                            {/** Storyline **/}
                            {game.storyline && (
                            <ContentCard title={"Storyline"} props={game.storyline} />
                            )}


                            {/** Screenshots **/}
                            <Row>

                                {game.screenshots && (
                                    <Card>
                                <Col className="pt-2">
                                    <Carousel>
                                    {game.screenshots.map(image => (
                                        <CarouselItem>
                                            <Image src={image.url && upscale(image.url)} fluid/>
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


                            <Row className="px-0 mt-2">


                                <CardGroup>
                                <Card>

                                   <Col>
                                {/** Collections **/}
                                {game.collection && (
                                    <GameAccordion title={"Collection"} collection={game.collection.name}
                                                   id={game.collection.games.map(x => (x.id))}
                                                   name={game.collection.games.map(x => (x.name))}/>
                                )}

                                   </Col>

                                </Card>


                                <Card>

                                    <Col>

                                {/** DLCs **/}
                                {game.dlcs && (
                                    <GameAccordion title={"DLCs"} collection={game.dlcs.name}
                                                   id={game.dlcs.map(x => (x.id))}
                                                   name={game.dlcs.map(x => (x.name))}/>
                                )}

                                    </Col>

                                </Card>

                                </CardGroup>

                            </Row>

                        </Row>


                    </Col>


                    {/** Sidebar **/}
                    <Col md={4} className="px-0 py-2" style={{fontSize: "1rem"}}>


                        {/** Category **/}
{/*
                        <InfoCard title={"Category"} icon={<BiCategoryAlt/>}
                                  props={game.category ? "N/A" : convertCategory(game.category)}/>
*/}

                        {/** Platforms **/}
                        {game.platforms && (
                            <InfoCard title={"Platforms"} icon={<GiConsoleController/>} props={
                                game.platforms.map(platforms => (
                                    <ListGroupItem>
                                    <Link className="text-decoration-none" to={`/platform/${platforms.slug}`}>
                                        <Row>
                                            <Col md="auto">
                                                <Image style={{width: "35px"}}
                                                       src={platforms.platform_logo && logo_resize(platforms.platform_logo.url)}/>
                                            </Col>

                                            <Col>
                                                <p>{platforms.name}</p>
                                            </Col>
                                        </Row>
                                    </Link>
                                    </ListGroupItem>
                                ))
                            }/>
                        )}


                        {/** Developers **/}
                        {game.involved_companies && (
                            <InfoCard title={"Developers"} icon={<AiOutlineCode/>}
                                      props={game.involved_companies.map(companies => (
                                          <ListGroupItem>{companies.company.name}</ListGroupItem>))}/>
                        )}

                        {/** Age ratings **/}
                        <InfoCard title={"Age Ratings"} icon={<RiParentLine/>} props={
                            <>
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
                            </>
                        }/>


                        {/** Player perspective **/}
                        {game.player_perspectives && (
                            <InfoCard title={"Perspective"} icon={<FaStreetView/>}
                                      props={game.player_perspectives.map(pp => (<ListGroupItem>{pp.name}</ListGroupItem>))}/>
                        )}


                        {/** Game modes **/}
                        {game.game_modes && (
                            <InfoCard title={"Game Modes"} icon={<FaNetworkWired/>}
                                      props={
                                          game.game_modes.map(mode => (<ListGroupItem>{mode.name}</ListGroupItem>))}/>
                        )}

                        {/** Multiplayer modes**/}
                        {game.multiplayer_modes && (
                            <InfoCard title={"Multiplayer Modes"} icon={<MdNetworkWifi/>}
                                      props={
                                          game.multiplayer_modes.map((multi, key) => (
                                          <>
                                              <p>Coop : {convertMultiplayer(multi.campaigncoop)}</p>

                                              <p>Drop-in: {convertMultiplayer(multi.dropin)}</p>

                                              <p>LAN Coop {convertMultiplayer(multi.lancoop)}</p>

                                              <p>Offline Coop {convertMultiplayer(multi.offlinecoop)}</p>

                                              <p>Max players:{multi.offlinecoopmax}</p>

                                              <p>Max Offline: {multi.offlinemax}</p>

                                              <p>Online Coop: {convertMultiplayer(multi.onlinecoop)}</p>

                                              <p>Max players: {multi.onlinecoopmax}</p>

                                              <p>Max Online Players : {multi.onlinemax}</p>

                                              <p>Splitscreen: {convertMultiplayer(multi.splitscreen)}</p>

                                              <p>Splitscreen Online: {convertMultiplayer(multi.splitscreenonline)}</p>

                                          </>
                                      ))}/>
                        )}


                        {/** Release dates **/}
                        {game.release_dates && (
                            <InfoCard title={"Release Dates"} icon={<RiCalendar2Fill/>}
                                      props={game.release_dates.map(date => (
                                          <ListGroupItem>
                                              <><text className="text-black-50">{date.platform.name}</text>: {date.human}</>
                                          </ListGroupItem>
                                      ))}
                            />
                        )}


                        {/** Franchises **/}
                        {game.franchises && (
                            <InfoCard title={"Franchises"} icon={<BiBuildingHouse/>}
                                      props={game.franchises.map(fr => (<ListGroupItem>{fr.name}</ListGroupItem>))}/>
                        )}

                    </Col>


                    <Row>
                        {/** DLCs **/}
                        {game.dlcs && (
                            <Row className="mb-2">
                                <Card>
                                    <Row className="p-3">
                                        <h4>DLCs </h4>
                                        {game.dlcs.map(dlc => (
                                            <Card className="text-center mx-3 p-0"  style={{width : "130px"}}>
                                                <Link to={`/game/${dlc.slug}`}>
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
                                                <Link to={`/game/${exp.slug}`}>
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
                                                <Link to={`/game/${exp.slug}`}>
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
                                                    <Link className="text-decoration-none" to={`/game/${sim.slug}`}>
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