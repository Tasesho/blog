"use strict";

const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");

const port = Number(process.env.PORT || 3000);
const dataFile = process.env.DATA_FILE || path.join(__dirname, "visits.json");

async function readCount() {
  try {
    const data = JSON.parse(await fs.readFile(dataFile, "utf8"));
    return Number.isSafeInteger(data.count) && data.count >= 0 ? data.count : 0;
  } catch (error) {
    if (error.code === "ENOENT") return 0;
    throw error;
  }
}

let count = 0;
let writeQueue = Promise.resolve();

const server = http.createServer(async (request, response) => {
  if (request.url !== "/api/visits") {
    response.writeHead(404).end();
    return;
  }

  if (request.method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    response.end(JSON.stringify({ count }));
    return;
  }

  if (request.method === "POST") {
    writeQueue = writeQueue.then(async () => {
      count += 1;
      const temporaryFile = `${dataFile}.tmp`;
      await fs.mkdir(path.dirname(dataFile), { recursive: true });
      await fs.writeFile(temporaryFile, JSON.stringify({ count }), "utf8");
      await fs.rename(temporaryFile, dataFile);
      response.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      response.end(JSON.stringify({ count }));
    }).catch((error) => {
      console.error("Could not persist visitor count:", error);
      if (!response.headersSent) response.writeHead(500).end();
    });
    return;
  }

  response.writeHead(405, { Allow: "GET, POST" }).end();
});

readCount()
  .then((savedCount) => {
    count = savedCount;
    server.listen(port, "0.0.0.0", () => console.log(`Visitor counter listening on ${port}`));
  })
  .catch((error) => {
    console.error("Could not load visitor count:", error);
    process.exitCode = 1;
  });
