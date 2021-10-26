const {createProxyMiddleware} = require('http-proxy-middleware');
const morgan = require('morgan');

/**
 * Sets up proxy middleware to avoid CORS and limited request
 * @param app
 */
module.exports = function (app) {
    app.use(
        '/games',
        createProxyMiddleware({
            target: 'https://api.igdb.com/v4/',
            changeOrigin: true,
        })
    );

    app.use(
        '/platforms',
        createProxyMiddleware({
            target: 'https://api.igdb.com/v4/',
            changeOrigin: true,
        })
    );

    app.use(
        '/platform_versions',
        createProxyMiddleware({
            target: 'https://api.igdb.com/v4/',
            changeOrigin: true,
        })
    );

    app.use(
        '/genres',
        createProxyMiddleware({
            target: 'https://api.igdb.com/v4/',
            changeOrigin: true,
        })
    );

    app.use(
        '/companies',
        createProxyMiddleware({
            target: 'https://api.igdb.com/v4/',
            changeOrigin: true,
        })
    );

    app.use(
        '/game_modes',
        createProxyMiddleware({
            target: 'https://api.igdb.com/v4/',
            changeOrigin: true,
        })
    );



    app.use(morgan('combined'));

};
