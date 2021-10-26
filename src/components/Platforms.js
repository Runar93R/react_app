import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {client} from "../utilities/axios";

/**
 * Rennders data for multiple platforms
 * @returns {JSX.Element}
 * @constructor
 */
const Platforms = () => {

    useEffect(() => {
        fetchPlatforms();
    },[]);

    const [platforms, setPlatforms] = useState([])

    const fetchPlatforms = async () => {
        const response = await client.post('/platforms', 'fields name, id, slug;');
        setPlatforms(response.data);
    }

    return (
        <>
            <h3>Platforms</h3>
            {platforms.map(platform => (
                <Link to={`platform/${platform.slug}`}>
                    <h5 key={platform.id}>{platform.name}</h5>
                </Link>
            ))}
        </>
    );
}

export default Platforms;