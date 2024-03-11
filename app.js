import express from "express";
const app = express();

const PORT = 8282;

import path from "path";
app.use(express.static("public"));

// file system - This module provides functions for interacting with the file system, such as reading and writing files, creating directories, and querying file metadata.
import fs from "fs";

// fs.readFileSync(): Synchronously reads the contents of a file. Blocks the main tread. It will render the pages on the server side before sending it to client side

/*
const header = fs.readFileSync("./public/components/header/header.html").toString();
const footer = fs.readFileSync("./public/components/footer/footer.html").toString();

const homepage = fs.readFileSync("./public/pages/homepage/homepage.html").toString();
const contact = fs.readFileSync("./public/pages/contact/contact.html").toString();
const matches = fs.readFileSync("./public/pages/matches/matches.html").toString();

const homepagePage = header + homepage + footer;
const contactPage = header + contact + footer;
const matchesPage = header + matches + footer;
*/

import getMatches from "./util/matches.js";

import { homepagePage, matchesPage, contactPage } from "./util/readPages.js";


//-------------- HTML --------------

// Homepage
app.get("/", (req, res) => {
  res.status(200).send(homepagePage);
  //res.status(200).sendFile(path.resolve("public/pages/homepage/homepage.html"));
});

// Contacts
app.get("/contacts", (req, res) => {
  res.status(200).send(contactPage);
  //res.status(200).sendFile(path.resolve("public/pages/contacts/contacts.html"));
});

// Matches
app.get("/matches", (req, res) => {
  res.status(200).send(matchesPage);
  //res.status(200).sendFile(path.resolve("public/pages/matches/matches.html"));
});


//-------------- API --------------
app.get("/api/matches", async (req, res) => {
  const matches = await getMatches();
  res.send({ data: matches });
});



app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});