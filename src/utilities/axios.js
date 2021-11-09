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
    "age_ratings.synopsis, age_ratings.content_descriptions.description, alternative_names.*, cover.url, category, collection.*, collection.games.*," +
    "collection.games.cover.*, dlcs.*, dlcs.cover.*, dlcs.slug, expanded_games.*, expanded_games.slug, expanded_games.cover.*," +
    " expansions.*, expansions.slug, expansions.cover.url, first_release_date, franchises.name, game_modes.name, genres.name, " +
    "game_engines.*, id, involved_companies.company.name, multiplayer_modes.*," +
    "name, platforms.name, platforms.abbreviation, platforms.platform_logo.url, platforms.slug," +
    "player_perspectives.name, ports.*, release_dates.*, release_dates.platform.*," +
    "similar_games.name, similar_games.id, similar_games.slug," +
    "summary, similar_games.cover.url, screenshots.url, storyline, themes.name, " +
    "total_rating, total_rating, total_rating_count, version_title, videos.*, websites.*;";


/**
 * Limited fields for game
 * @type {string} name of fields
 */
export const limitFields = "f id, slug, name; where id=(7,168,48,8,9,165,167,38,11,12,49,169,6,14,130); limit 15;"