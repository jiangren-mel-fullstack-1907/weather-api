var express = require('express');
var router = express.Router();
var weatherRepository = require('../repositories/weathers');

router.get('/', function (req, res, next) {
  weatherRepository.getAll(req.query).then(docs => res.json(docs));
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  // unique name check
  weatherRepository.getAll({ name: req.body.name }).then(existingWeathers => {
    if (existingWeathers.length > 0) {
      res.status(400).json('weather existed');
    } else {
      weatherRepository.create(req.body).then(result => 
        res.json(result)
      ).catch(createError => 
        res.status(500).send(createError)  
      );
    }
  }).catch(getAllError => 
    res.status(500).send(getAllError)  
  )
});

router.get('/:id', function (req, res, next) {
  weatherRepository.getById(req.params.id).then(result => {
    console.log('result ===>>> ', result);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  }).catch(error => 
    res.status(500).send(error)
  );
});

router.patch('/:id', function (req, res, next) {
  weatherRepository.patch(req.params.id, req.body).then(result => 
    res.json(result)
  ).catch(error => 
    res.status(500).send(error)
  );
});

router.put('/:id', function (req, res, next) {
  weatherRepository.put(req.params.id, req.body).then(result => 
    res.json(result)
  ).catch(error => 
    res.status(500).send(error)
  );
});

router.delete('/:id', function (req, res, next) {
  weatherRepository.deleteById(req.params.id).then(result => 
    res.json(result)
  ).catch(error => 
    res.status(500).send(error)
  );
});

module.exports = router;
