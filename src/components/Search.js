import '../App.css'
import {client} from "../utilities/axios";
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from "react-bootstrap/ModalHeader";
import {BsSearch} from 'react-icons/bs';
import {
    Button,
    Col,
    Container,
    FormControl, Image,
    ModalBody,
    ModalFooter,
    Row, Table,
} from "react-bootstrap";
import Form from "react-bootstrap/Form"
import {checkGames, convertTime} from "../utilities/converters";

/**
 * Renders data when searching for a game
 * @param props input from search field
 * @returns {JSX.Element}
 * @constructor
 */
const Search = (props) => {

    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("");
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setError] = useState(false)



    useEffect(() => {
        fetchData()
        setError(false);
        setIsLoading(true);
    },[search])


    const fetchData = async () => {
        try {
            const response = await client.post('/games', `f name, first_release_date, id, cover.url ; search "${query}";`);
            setGames(response.data)
        } catch (error) {
            setError(true);
            console.log(error.message)
        }

        setIsLoading(false);
    }

    const clearModal = () => {
        setQuery("");
        setSearch("")
    }

    checkGames(games);


    return(
        <Modal {...props} size="lg">
            <ModalHeader closeButton onClick={clearModal}>
                {/*<ModalTitle id="searchModal">Search</ModalTitle>*/}
            </ModalHeader>
            <ModalBody className="show">
                    <Form onSubmit={event => {event.preventDefault();setSearch(query);}}>
                        <Container fluid>
                            <Row>
                                <Col md={10}>
                                    <FormControl
                                        type="search"
                                        placeholder="Search Games"
                                        aria-label="search"
                                        size="md"
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Button variant="secondary" type="submit"><BsSearch/></Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>

                {isError && <div>Something went wrong ...</div>}
                {isLoading ? (<div>
                Loading...
                </div>) : (
                    <Table responsive>
                        {games.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td><Image src={item.cover && item.cover.url} className="search-cover" alt="cover" rounded/></td>
                                    <td>
                                        <Link to={`/game/id/${item.id}`} key={item.id} className="search-link" onClick={props.onHide}>
                                            <p>{item.name}</p>
                                        </Link>
                                    </td>
                                    <td>
                                        {item.first_release_date && convertTime(item.first_release_date)}
                                    </td>
                                </tr>
                            )})}
                    </Table>
                    )}
            </ModalBody>
            <ModalFooter>
                {/*<Button variant="secondary" onClick={props.onHide}>Cancel</Button>*/}
            </ModalFooter>
        </Modal>
    )

}
export default Search