// (C) 2022 GoodData Corporation
const http = require("http");
const statik = require("node-static");
// const { SERVER_PORT, SERVER_URL } = require("./src/constants");

const SERVER_PORT = 8445;
const SERVER_URL = `http://localhost:${SERVER_PORT}`;

const fileServer = new statik.Server("./dist");

function runPluginsServer() {
    const server = http
        .createServer(function (request, response) {
            request
                .addListener("end", function () {
                    fileServer.serve(request, response, function interceptor(err) {
                        if (err) {
                            // eslint-disable-next-line no-console
                            console.error("Error serving " + request.url + " - " + err.message);
                            response.writeHead(err.status, err.headers);
                            response.end();
                        }
                    });
                })
                .resume();
        })
        .listen(SERVER_PORT)
        .on("listening", () => {
            // eslint-disable-next-line no-console
            console.info(`Serving app and plugins on ${SERVER_URL}`);
        });
}

module.exports = {
    runPluginsServer,
};
