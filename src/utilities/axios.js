import axios from "axios";
import {useEffect, useState} from "react";

/***
 * New client instance for HTTP requests.
 * @type {AxiosInstance} instance of client
 */
export const client = axios.create({
    dataType: 'JSON',
    headers: {
        'Accept': 'application/json',
        'Client-ID': '#',
        'Authorization': '#',
    },
})


/**
 * Adds data from HTTP request to state
 * @param url url of request
 * @param fields fields in JSON
 * @returns {{data: *[], setData: (value: (((prevState: *[]) => *[]) | *[])) => void}} Object of data
 */
export const useClient = (url, fields) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async() => {
            const response = await client.post(url, fields);
            setData(response.data);
            console.log(response.data);
        }
        getData();
    },[url, fields])
    return {data, setData};
}

/**
 * Adds data from a single object from HTTP request to state
 * @param url url of request
 * @param fields fields in JSON
 * @returns {{data: *[], setData: (value: (((prevState: *[]) => *[]) | *[])) => void}} Object of data
 */
export const useClientData = (url, fields) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async() => {
            const response = await client.post(url, fields);
            setData(response.data[0]); /** First object in array **/
        }
        getData();
    },[url, fields])
    return {data, setData};
}


/**
 * All relevant fields available for a game
 * @type {string} name of all fields
 */
export const allFields =
    "f alternative_names.*, artworks.url, aggregated_rating, aggregated_rating_count, age_ratings.rating," +
    "age_ratings.content_descriptions.description, cover.url, category, collection.*, collection.games.*," +
    "collection.games.cover.*, dlcs.*, dlcs.cover.*, first_release_date, franchises.name, game_modes.name, genres.name," +
    "id, involved_companies.company.name, name, platforms.name," +
    "platforms.abbreviation, platforms.platform_logo.url, platforms.slug," +
    "player_perspectives.name, release_dates.*, release_dates.platform.*," +
    "similar_games.name, similar_games.id," +
    "summary, similar_games.cover.url, screenshots.url, storyline, themes.name;";


/**
 * Limited fields for game
 * @type {string} name of fields
 */
export const limitFields = "f id, slug, name; where id=(7,168,48,8,9,165,167,38,11,12,49,169,6,14,130); limit 15;"