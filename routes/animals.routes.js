const express = require("express");

const router = express.Router();

const Animal = require("../models/animals.model");

const auth = require("../auth.middleware");

// router.get("/animals", async function (request, response, next) {
//   try {
//     let result = await Animal.find();

//     return response.status(200).json(result);
//   } catch (error) {
//     return next(error);
//   }
// });

// router.get("/animals/:id", auth, async function (request, response, next) {

//     try {

//         let result = await Animal.findById(request.params.id);

//         return response.status(200).json(result)

//     } catch (error) {

//     }

// })

router.get("/animals", async function (request, response, next) {
  let offset = parseInt(request.query.offset) || 0; // || = eller

  let limit = parseInt (request.query.limit) || 5;

  try {
    let count = (await Animal.find()).length;

    let results = await Animal.find().skip(offset).limit(limit);

    let queryStringNext = `?offset= ${offset + limit}&limit=${limit} `;

    let queryStringPrev = null;

    if (offset > 0 ) {
      queryStringPrev = `?offset=${offset - limit}&limit=${limit}`
    }

    let apiUrl = `${request.protocol}://${request.hostname}${
      request.hostname === "localhost" ? ":4000" : " "
    }`
    let apiPath = `${request.baseUrl}${request.path}`;

    console.log(request.originalUrl)

    let output = {
        count,
        next: offset + limit < count ? apiUrl + apiPath + queryStringNext : null,
        previous: offset > 0 ? apiUrl + apiPath + queryStringPrev : null,
        results,
        url: apiUrl + request.originalUrl
    }

    console.log(apiUrl);

    console.log(apiPath);

    return response.status(200).json(output);
  } catch (error) {
    return next(error);
  }
});

// adde et dyr

router.post("/animals", auth, async function (request, response, next) {
  try {
    let animal = await Animal.create(request.body);

    return response.status(201).json(animal);
  } catch (error) {
    return next(error);
  }
});

// Opdater et dyr, ved brug af id

router.patch("/animals/:id", async function (request, response, next) {
  try {
    let animal = await Animal.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );

    return response.status(200).json(animal);
  } catch (err) {
    return next(err);
  }
});

// slet et dyr, ved brug af id

router.delete("/animals/:id", async function (request, response, next) {
  try {
    await Animal.findByIdAndDelete(request.params.id);

    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
