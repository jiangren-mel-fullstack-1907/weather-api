var express = require('express');
var router = express.Router();
var weatherRepository = require('../repositories/weathers');

router.get('/', function(req, res, next) {
  weatherRepository.getAll(req.query, function(docs, err) {
    res.json(docs);
  })
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  weatherRepository.create(req.body, function(result, err) {
    res.json(result);
  })
});

router.get('/:id', function(req, res, next) {
  weatherRepository.getById(req.params.id, function(result, err) {
    res.json(result);
  })
});

router.patch('/:id', function(req, res, next) {
  weatherRepository.patch(req.params.id, req.body, function(result, err) {
    res.json(result);
  })
});

router.put('/:id', function(req, res, next) {
  weatherRepository.put(req.params.id, req.body, function(result, err) {
    res.json(result);
  })
});

router.delete('/:id', function(req, res, next) {
  weatherRepository.deleteById(req.params.id, function(result, err) {
    res.json(result);
  })
});

module.exports = router;
