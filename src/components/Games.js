import {limitFields, useClient} from "../utilities/axios";
import {checkGames, resize, sortData} from "../utilities/converters";
import {Accordion, Badge, Card, CardGroup, Col, Container, Form, FormCheck, FormControl, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState} from "react";
import AccordionItem from "react-bootstrap/AccordionItem";
import AccordionBody from "react-bootstrap/AccordionBody";

/**
 * Renders data for multiple games
 * @returns {JSX.Element}
 * @constructor
 */
const Games = () => {

    const [filter2, setFilter2] = useState([{genre : []}]);

    const [filter, setFilter] = useState();
    const [isToggled, setToggle] = useState(false)
    const [isActive, setActive] = useState(false);
    const [activeText, setActiveText] = useState('');
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("");

    const handleToggle = () => {
        if (isToggled) {setFilter('')}
        setToggle(!isToggled);
    };

    const handleActive = (e) => {
        setActive(!isActive);
        setActiveText(e)
    }

    const handle2 = (e) => {
        const {name, value} = e.target;
        setFilter2(prevState => [...prevState, value]);
        console.log(filter2);
    }

    const handleChange = e => {
        const {value} = e.target;
        const {name} = e.target;
        setFilter(`w ${e.target.id}.slug=("${value}");`);
        handleActive(name)
        console.log(isActive)
        handleToggle();
        console.log(filter)
        console.log(isToggled)
    }


    const {data: games} = useClient('/games', `f id, name, cover.url, platforms.name, genres.name; limit 25; ${filter};`);
    const {data: platforms} = useClient('/platforms', limitFields);
    const {data: genres} = useClient('/genres', 'f id, name, slug; limit 35;')
    const {data : game_modes} = useClient('/game_modes', 'f id, name, slug;');

    const {data: allPlatforms} = useClient('/platforms', `f id, name, slug; search "${query}";`);



    sortData(genres)
    sortData(platforms)
    checkGames(games)

    return (
        <Container>
            <Row style={{paddingTop: "30px"}}>

                <Col sm={8}>
                    <h3>Games</h3>

                    <>
                        {isActive ?
                            <Badge pill bg="primary">{activeText}</Badge>
                            :
                            <></>
                        }

                    </>

                    <Row sm={4} xs={2}>
                        {games.map(game => (
                            <Col className="p-3">
                                <Link to={`/game/id/${game.id}`} className="gamelink" key={game.id}>
                                    <CardGroup>
                                        <Card bg="dark" style={{width: "186", height : "300px"}}>
                                            <Card.Img
                                                style={{height : "248px"}}
                                                variant="top"
                                                src={game.cover && resize(game.cover.url)}
                                            />
                                            <Card.Text style={{color : "white", margin : "auto", padding: "5px"}}>
                                                {game.name}
                                            </Card.Text>
                                        </Card>
                                    </CardGroup>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col sm={4}>

                    <h3>Advanced Search</h3>

                    <Accordion defaultActiveKey="0">

                        <AccordionItem eventKey="0">
                            <Accordion.Header>Genres</Accordion.Header>
                            <AccordionBody>
                                <Form onChange={e => handle2(e)}>
                                    {genres.map(gen => (
                                        <FormCheck type="switch" id="genres" name={gen.name} value={gen.slug} label={gen.name}/>
                                    ))}
                                </Form>
                            </AccordionBody>
                        </AccordionItem>

                        <AccordionItem eventKey="0">
                            <Accordion.Header>Platforms</Accordion.Header>
                            <AccordionBody>
                                <Form onChange={e => handleChange(e)} onSubmit={event => {event.preventDefault(); setSearch(query)}}>
                                    {platforms.map(plat => (
                                        <FormCheck type="switch" id="platforms" name={plat.name}  value={plat.slug} label={plat.name}/>
                                    ))}
                                    <FormControl
                                        type="search"
                                        placeholder="Search Platforms"
                                        aria-label="search"
                                        size="md"
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                    />
                                </Form>
                                <Col>
                                    {allPlatforms.map(plat => (
                                        <FormCheck type="switch" id="platforms" name={plat.name} value={plat.slug} label={plat.name}/>
                                    ))}
                                </Col>
                            </AccordionBody>
                        </AccordionItem>

                        <AccordionItem eventKey="1">
                            <Accordion.Header>Game Modes</Accordion.Header>
                            <AccordionBody>
                            <Form onChange={e => handleChange(e)}>
                                {game_modes.map(gm => (
                                    <FormCheck type="switch" id="game_modes" name={gm.name} value={gm.slug} label={gm.name}/>
                                ))}
                            </Form>
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>

                </Col>
            </Row>
        </Container>
    )

}


export default Games;