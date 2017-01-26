const express = require('express');
const router = express.Router();
const Query = require('../db/query.js');

function validCheese(cheese) {
  let validTitle = typeof cheese.name == 'string' &&
                    cheese.name.trim() != '';
  let validImage = typeof cheese.image_url == 'string' &&
                    cheese.image_url.trim() != '';
  let validRating = typeof cheese.rating == 'number' &&
                    cheese.rating > 0 && cheese.rating < 6;
  return validTitle && validImage && validRating;
}

/**
 * @api {get} /cheese Request List of cheeses
 * @apiName Getcheeses
 * @apiGroup cheese
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *          "id": 1,
 *          "name": "Brie",
 *          "image_url": "https://www.splendidtable.org/sites/default/files/styles/lede_image/public/470340853.jpg?itok=7acsHkTk",
 *          "rating": 4,
 *          "user_id": 1
 *        },
 *        {
 *          "id": 2,
 *          "name": "Cheddar",
 *          "image_url": "https://www.splendidtable.org/sites/default/files/styles/lede_image/public/470340853.jpg?itok=7acsHkTk",
 *          "rating": 5,
 *          "user_id": 1
 *        }
 *     ]
 */
router.get('/', (req, res, next) => {
  Query
    .getAllCheese()
    .then((response) => {
      res.json(response);
    });
});


/**
 * @api {post} /cheese/new Create new cheese
 * @apiName Postcheeses
 * @apiGroup cheese
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *          "id": 1,
 *        }
 *     ]
 */
router.post('/new', (req, res, next) => {
  if (validCheese(req.body)) {
    Query
      .createNewCheese(req.body)
      .then((response) => {
        res.json({
          id: response
        });
      });
  } else {
    next(new Error('Invalid cheese entry'));
  }
});


/**
 * @api {get} /cheese/:id Request single cheese
 * @apiName GetOnecheese
 * @apiGroup cheese
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *          "id": 1,
 *          "name": "Brie",
 *          "image_url": "https://www.splendidtable.org/sites/default/files/styles/lede_image/public/470340853.jpg?itok=7acsHkTk",
 *          "rating": 4,
 *          "user_id": 1
 *        }
 *     ]
 */
router.get('/:id', (req, res, next) => {
  Query
    .getCheeseById(req.params.id)
    .then((response) => {
      if (response) {
        res.json(response);
      } else {
        next(new Error('Cheese does not exist'));
      }
    });
});


/**
 * @api {put} /cheese/:id Update a cheese
 * @apiName Putcheeses
 * @apiGroup cheese
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *          "id": 1,
 *          "name": "Brie",
 *          "image_url": "https://www.splendidtable.org/sites/default/files/styles/lede_image/public/470340853.jpg?itok=7acsHkTk",
 *          "rating": 4,
 *          "user_id": 1
 *        }
 *     ]
 */
router.put('/:id', (req, res, next) => {
  if (validCheese(req.body)) {
    Query
      .updateCheese(req.params.id, req.body)
      .then((response) => {
        if (response) {
          res.json({
            id: response
          });
        } else {
          next(new Error('Invalid update'));
        }
      });
  } else {
    next(new Error('Invalid cheese'));
  }
});


/**
 * @api {delete} /cheese/:id Delete single cheese
 * @apiName Deletecheeses
 * @apiGroup cheese
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *        {
 *          "message": "Cheese has been deleted!"
 *        }
 *     ]
 */
router.delete('/:id', (req, res, next) => {
  Query
    .deleteCheese(req.params.id)
    .then((response) => {
      if (response) {
        res.json({
          message: 'Cheese has been deleted!'
        });
      } else {
        next(new Error('Cheese does not exist!'));
      }
    });
});

module.exports = router;
