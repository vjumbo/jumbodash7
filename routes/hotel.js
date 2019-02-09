const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const cors = require('cors');
const Hotel = require('../models/hotel');
const hotelTypes = require("../def/hotelTypes");

router.options('*', cors());

router.get('/', cors(), (req, res, next) => {
  Hotel.find( (err, hoteles) => {
      if (!hoteles) {
          res.json([]);
      } else {
          if (err) return next(err);
          res.json(hoteles);
      }
  }).populate('sistema.usuarioCreador', 'username')
      .populate('sistema.usuarioAsignado', 'username')
      .populate('habitaciones').populate('servicios')
      .populate('serviciosNoIncluidos').populate('penalidades');
});

router.get('/hoteltypes', cors(), (req, res, next) => {
  res.json(hotelTypes);
});

router.get('/:id', cors(), (req, res, next) => {
  Hotel.findById(req.params.id,  (err, hotel) => {
    if (err) return next(err);
    res.json(hotel);
  }).populate('habitaciones').populate('servicios')
      .populate('serviciosNoIncluidos').populate('penalidades');
});

router.get('/hotelesby/:search/:field', cors(), (req, res, next)=> {
  const user = {};
  const filters = req.params.search.split('##');
  const values = req.params.field.split('##');
  filters.forEach((value, indx) => {
    user[value] = values[indx];
  });
  Hotel.findOne(user,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  }).populate('habitaciones').populate('servicios')
      .populate('serviciosNoIncluidos').populate('penalidades');
});

router.post('/', cors(),(req, res, next) => {
  Hotel.create(req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', cors(),(req, res, next) => {
  Hotel.findByIdAndUpdate(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', cors(), (req, res, next) => {
  Hotel.findByIdAndRemove(req.params.id, req.body,  (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
