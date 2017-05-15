/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/topics              ->  index
 * POST    /api/topics              ->  create
 * GET     /api/topics/:id          ->  show
 * PUT     /api/topics/:id          ->  upsert
 * PATCH   /api/topics/:id          ->  patch
 * DELETE  /api/topics/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Topic from './topic.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Topics
export function index(req, res) {
  return Topic.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Topic from the DB
export function show(req, res) {
	return Topic.aggregate(
		{$match: { title: {$regex: req.params.id, $options: "i"}}},
		{$unwind:'$tweetsByText'},
		{$lookup: {"from": "status",
            "localField": "tweetsByText",
            "foreignField": "_id",
            "as": "tweets"
		}},
		{$unwind: {path: "$tweets", preserveNullAndEmptyArrays: true }},
		{$unwind: {path: "$tweets.items", preserveNullAndEmptyArrays: true }},
		{$lookup: {"from": "items",
			"localField": "tweets.items",
			"foreignField": "_id",
			"as": "tweets.items"
		}},
		{$sort:{id:1, title:1, 'tweets.retweet_count': -1, 'tweets.favorite_count': -1, 'tweets.timestamp_ms':-1}},
		{$group: {_id: '$_id', title:{$first:'$title'}, categories: { $addToSet : '$categories' }, 'tweets': {$push: '$tweets'}}},
		{$project: { _id: 1, title: 1, categories: 1, tweets: {$slice: [ "$tweets", 0, 1000 ]}}}
		).exec()
			.then(handleEntityNotFound(res))
			.then(respondWithResult(res))
			.catch(handleError(res));
	
  /* return Topic.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res)); */
}

// Creates a new Topic in the DB
export function create(req, res) {
  return Topic.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Topic in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Topic.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Topic in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Topic.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Topic from the DB
export function destroy(req, res) {
  return Topic.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
