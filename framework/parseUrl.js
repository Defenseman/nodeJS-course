module.exports = (baseUrl) => (req, res) => {
    const parsedUrl = new URL(req.url, baseUrl);

    return {
        pathname: parsedUrl.pathname,
    }
}