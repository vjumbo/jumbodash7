const express = require('express');
const router = express.Router([]);
const mongoose = require('mongoose');
const cors = require('cors');
const Vendor = require('../models/vendor');

router.options('*', cors());

router.get('/:crmid', cors(), function(req, res, next) {
  Vendor.findOne({ crmid: req.params.crmid }, function (err, vendor) {
      if (!vendor) {
          // res.sendStatus(404);
          res.json(false);
      } else {
          if (err) return next(err);
          return res.json(vendor);
      }
  }).populate('hoteles');
});

router.post('/', cors(),function(req, res, next) {
  Vendor.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', cors(),function(req, res, next) {
  Vendor.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
