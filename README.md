# us-states-ref
## Intro
Quick reference of info related to U.S. states, e.g. sample addresses, driver's license formats, etc. 

Includes simple web page for viewing data, exposes endpoints for your testing scripts/other personal work.

## Pre-req's
Node 4.6.0, npm

## Setup
1. Copy or clone project to computer.

2. Install the dependencies listed in package.json, e.g. in the command prompt, nav to state-cheatsheet/server and `npm install`

4. After that's done, stay in the same folder and run `node app.js`

5. Go to http://localhost:3000/app to view the quickie index.html I whipped up. If it loads, you're all set!

## Code of interest

## Wishlist
1. Sample addresses for all states, which will pass the remaining failing jasmine specs.

2. Change driver's license format field to list of formats (currently one field with line breaks between different entries).

3. Put all sample addresses into a single cell.

4. Some extra endpoint for finer grained data - see apiController for ideas.

## Last thoughts
Drivers license format source - the Internet... your mileage may vary.
