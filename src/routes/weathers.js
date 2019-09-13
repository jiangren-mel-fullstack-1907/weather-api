const express = require('express');
const router = express.Router();
const weatherRepository = require('../repositories/weathers');

router.get('/', async function (req, res, next) {
  try {
    let result = await weatherRepository.getAll(req.query);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async function (req, res, next) {
  try {
    let existingWeathers = await weatherRepository.getAll({ cityName: req.body.cityName });
    if (existingWeathers.length > 0) {
      res.status(400).json('weather existed');
    } else {
      let result = await weatherRepository.create(req.body);
      res.json(result);
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    let result = await weatherRepository.getById(req.params.id);
    console.log('result ===>>> ', result);
    if (!result) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
});

router.patch('/:id', async function (req, res, next) {
  try {
    let result = await weatherRepository.patch(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    let result = await weatherRepository.put(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    let result = await weatherRepository.deleteById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message)
  }
});

module.exports = router;
