const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils/asyncHandler');
const cityRepository = require('../repositories/cities');
const weatherRepository = require('../repositories/weathers');
const { formatResponse } = require('../utils/helper');
const validateId = require('../middlewares/validateId');

router.get('/', asyncHandler(async function (req, res, next) {
  let result = await cityRepository.getAllWithWeathers(req.query);
  return formatResponse(res, result);
}));

router.post('/', asyncHandler(async function (req, res, next) {
  let existingCities = await cityRepository.getAll({ name: req.body.name });
  if (existingCities.length > 0) {
    return formatResponse(res, 'city existed', 400);
  }
  let result = await cityRepository.create(req.body);
  return formatResponse(res, result);
}));

// add a weather
router.post('/:id/weathers', validateId, asyncHandler(async function (req, res, next) {
  let aCity = await cityRepository.getById(req.params.id);
  if (!aCity) {
    return formatResponse(res, 'Not found', 404);
  }
  let newWeather = await weatherRepository.create(req.body);
  await cityRepository.addWeather(req.params.id, newWeather.id);
  return formatResponse(res, newWeather);
}));

//delete a weather
router.delete('/:id/weathers/:weatherId', validateId, asyncHandler(async function (req, res, next) {
  const deletedWeather = await weatherRepository.deleteById(req.params.weatherId);
  if (!deletedWeather) {
    return formatResponse(res, 'Not found', 404);
  }
  await cityRepository.removeWeather(req.params.id, req.params.weatherId);
  return formatResponse(res, deletedWeather);
}));

router.get('/:id', validateId, asyncHandler(async function (req, res, next) {
  let result = await cityRepository.getById(req.params.id);
  if (!result) {
    return formatResponse(res, 'Not found', 404);
  }
  return formatResponse(res, result);
}));

// get weathers
router.get('/:id/weathers', validateId, asyncHandler(async function (req, res, next) {
  let aCity = await cityRepository.getWeathersByCityId(req.params.id);
  if (!aCity) {
    return formatResponse(res, 'Not found', 404);
  }

  return formatResponse(res, aCity);
}));

router.patch('/:id', validateId, asyncHandler(async function (req, res, next) {
  let aCity = await cityRepository.getWeathersByCityId(req.params.id);
  if (!aCity) {
    return formatResponse(res, 'Not found', 404);
  }

  let result = await cityRepository.patch(req.params.id, req.body);
  return formatResponse(res, result);
}));

router.put('/:id', validateId, asyncHandler(async function (req, res, next) {
  let aCity = await cityRepository.getWeathersByCityId(req.params.id);
  if (!aCity) {
    return formatResponse(res, 'Not found', 404);
  }

  let result = await cityRepository.put(req.params.id, req.body);
  return formatResponse(res, result);
}));

router.delete('/:id', validateId, asyncHandler(async function (req, res, next) {
  let aCity = await cityRepository.deleteById(req.params.id);
  if (!aCity) {
    return formatResponse(res, 'Not found', 404);
  }
  return formatResponse(res, result);
}));

module.exports = router;
