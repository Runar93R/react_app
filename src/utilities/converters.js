import {ImCheckmark, ImCross} from "react-icons/all";
import {ProgressBar} from "react-bootstrap";
import {RatingBar} from "../components/CustomComponents";

/**
 * Placeholder images when image data is missing
 * @type {string} the url of the images
 */
export const cover_placeholder = "https://via.placeholder.com/230x300.png?text=No+Image+Available";
export const large_placeholder = "https://via.placeholder.com/1920x1080.png?text=No+Image+Available";


/**
 * Converts unix time stamp to conventional numeric date
 * @param input unix time
 * @returns {string|*} numeric date
 */
export const convertDate = (input) => {
    if (isNaN(input)) {
        return input;
    } else {
        return new Date(input * 1000).toLocaleDateString("en-US", {day : "numeric", month: "numeric", year: 'numeric'})
    }
}

export const convertMultiplayer = (input) => {

    if (input === true) {
        return <ImCheckmark/>
    }
    else {
        return <ImCross/>
    }

}

export const rateColor = (input) => {

    if (isNaN(input)) {
        return <RatingBar color={"info"} score={100} label={"N/A"}/>
    }

    if (input >= 70) {
        return <RatingBar color={"success"} score={input} label={convertScore(input)}/>
    }

    if (input >= 40) {
        return <RatingBar color={"warning"} score={input} label={convertScore(input)}/>
    }

    else {
        return <RatingBar color={"danger"} score={input} label={convertScore(input)}/>
    }
}

/**
 * Converts ratings score to float with two decimals
 * @param input initial score
 * @returns {string}  score with two decimals
 */
export const convertScore = (input) => {
    return input.toFixed(1);
}

/**
 * Transforms image size by modifying size parameters of image
 * @param input initial image url
 * @returns {*} new image url
 */
export function resize(input) {
    if (input.includes('images.igdb.')) {  //only if image includes images.igdb
        return input.replace('thumb', 'cover_big_2x');   // replace 'thumb'
    } else {
        return input;
    }
}

/**
 * Tranforms image size of platform logo.
 * @param input initial image url
 * @returns {*} new image url
 */
export function logo_resize(input) {
    if (input.includes('images.igdb.')) {
        return input.replace('thumb', 'original');
    } else {
        return input;
    }
}

/**
 * Tranforms image size of screenshot images.
 * @param input
 * @returns {*}
 */
export function upscale(input) {
    if (input.includes('images.igdb.')) {
        return input.replace('thumb', '1080p_2x');
    } else {
        return input;
    }
}


/**
 * Checks if key-value pair of object is missing in dataset
 * @param obj object to check
 * @returns {{url: string}|[{cover: {url: string}}, {name: string}]} new image if missing, or initial image.
 */
export function checkData(obj) {
    if (!("cover" in obj)) { // if no cover key
        return obj["cover"] = {url : cover_placeholder }  // return cover key with placeholder image
    }
    if(!("similar_games" in obj)) {  // if no similar games
        return obj["similar_games"] = [{cover : {url : cover_placeholder}}, {name : "No similar games"}] // return cover key with placeholder image
    }
}

/**
 * Checks missing key-value pairs of object for platforms.
 * @param obj object to check
 * @returns {string} initial or new value
 */
export function checkPlatform(obj) {
    if (!("connectivity" in obj)) {
        return obj["connectivity"] = "N/A";
    }
    if(!("cpu" in obj)) {
        return obj["cpu"] = "N/A";
    }

    if (!("graphics" in obj)) {
        return obj["graphics"] = "N/A";
    }
    if(!("memory" in obj)) {
        return obj["memory"] = "N/A";
    }

    if (!("output" in obj)) {
        return obj["output"] = "N/A";
    }
    if(!("resolutions" in obj)) {
        return obj["resolutions"] = "N/A";
    }

    if (!("sound" in obj)) {
        return obj["sound"] = "N/A";
    }
    if(!("storage" in obj)) {
        return obj["storage"] = "N/A";
    }
}

/***
 *  Checks if key-value pair of object is missing in dataset
 * @param arr array of object to check
 */
export function checkGames(arr) {
    Object.keys(arr).forEach(key => {
        if (!arr[key].cover) {
            return arr[key].cover = {url: cover_placeholder}
        }

        if(!arr[key].first_release_date) {
            return arr[key].first_release_date = "No Date"
        }
    })
}

/**
 * Sorts data from A-Z
 * @param input
 */
export function sortData(input) {
    input.sort(function (a, b) {
    let textA = a.name.toUpperCase();
    let textB = b.name.toUpperCase();
    return(textA < textB) ? -1 : (textA > textB) ? 1: 0;
    });
}


/**
 * Converts numeric age ratings to PEGI and ESRB images
 * @param input inital age ratings
 * @returns {string} src for images
 */

export const convertAge = (input) => {
    if (input === 1) {
        return "/age_ratings/age-3.jpg" ;
    }
    if(input === 2) {
        return "/age_ratings/pegi7.png" ;
    }
    if(input === 3) {
        return "/age_ratings/pegi12.png" ;
    }
    if (input === 4) {
        return "/age_ratings/pegi16.png" ;
    }
    if (input === 5) {
        return "/age_ratings/pegi18.png" ;
    }
    if (input === 6) {
        return "/age_ratings/RP.svg";
    }
    if (input === 7) {
        return "/age_ratings/EC.jpeg>";
    }
    if (input === 8) {
        return "/age_ratings/everyone.svg";
    }
    if (input === 9) {
        return "/age_ratings/E10plus.svg";
    }
    if (input === 10) {
        return "/age_ratings/T.svg";
    }
    if (input === 11) {
        return "/age_ratings/M.svg";
    }
    if (input === 12) {
        return "/age_ratings/AO.svg";
    }
    if (input === 17) {
        return "/age_ratings/cero_z.png";
    }

    if (input === 22) {
        return "/age_ratings/grac_all.png";
    }

    if (input === 26) {
        return "/age_ratings/grac_test.png";
    }

    if(input === 33) {
        return "/age_ratings/acb_15.png";
    }

    if(input === 38) {
        return "/age_ratings/acb_r.png";
    }


}


/**
 * Converts numeric platform categories to string
 * @param input platform category
 * @returns {string} category in string
 */
export const convertPlatformCategory = (input) => {
    if (input === 1) {
        return "Console";
    }

    if (input === 2) {
        return "Arcade";
    }

    if (input === 3) {
        return "Platform";
    }

    if (input === 4) {
        return "Operating System";
    }

    if (input === 5) {
        return "Portable Console";
    }

    if (input === 6) {
        return "Computer";
    }
}

export const convertCategory = (input) => {
    if (input === 0) {
        return "Main Game";
    }

    if (input === 1) {
        return "DLC addon";
    }

    if (input === 2) {
        return "Expansion";
    }

    if (input === 3) {
        return "Bundle";
    }

    if (input === 4) {
        return "Standalone Expansion";
    }

    if (input === 5) {
        return "Mod";
    }

    if (input === 6) {
        return "Episode";
    }

    if (input === 7) {
        return "Season";
    }

    if (input === 8) {
        return "Remake";
    }

    if (input === 9) {
        return "Remaster";
    }

    if (input === 10) {
        return "Expanded Game";
    }

    if (input === 11) {
        return "Port";
    }

    if (input === 12) {
        return "Fork";
    }
}

