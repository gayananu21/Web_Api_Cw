/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-global-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const express = require('express');

const router = express.Router();
const Cart = require('../Models/cart');
require('dotenv').config();

router.post('/', async (req, res) => {
  let cartProduct = new Cart({

    userId: req.body.userId,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    imgUrl: req.body.imgUrl,
    description:req.body.description

  });

  try {
    cartProduct = await cartProduct.save();
    return res.send(cartProduct);
  } catch (err) {
    for (name in err.errors) {
      console.log(err.errors[name].message);
      return res.status(400).json({
        success: false,
        error: err.errors[name].message,
      });
      // return res.status(400).send(err.errors[name].message);
    }

    for (category in err.errors) {
      console.log(err.errors[category].message);
      return res.status(400).json({
        success: false,
        error: err.errors[category].message,
      });
    }
    for (price in err.errors) {
      console.log(err.errors[price].message);
      return res.status(400).json({
        success: false,
        error: err.errors[price].message,
      });
    }
    for (description in err.errors) {
      console.log(err.errors[description].message);
      return res.status(400).json({
        success: false,
        error: err.errors[description].message,
      });
    }
    for (imgUrl in err.errors) {
      console.log(err.errors[imgUrl].message);
      return res.status(400).json({
        success: false,
        error: err.errors[imgUrl].message,
      });
    }
  }
});

router.post('/myCart', async (req, res) => {
  try {
    const avengersCart = await Cart.find({ userId: req.body.userId })
      .sort({ name: 'asc' })
      .select({
        name: 1, likeCount: 1, _id: 1, imgUrl: 1, movies: 1,
      });
    return res.send(avengersCart);
  } catch (ex) {
    return res.status(500).send('Error:', ex.message);
  }
});

router.delete('/:id', async (req, res) => {
  const requstedID = req.params.id;
  const avenger = await Cart.findById(requstedID);
  if (!avenger) {
    return res.status(404).send('Requested  Delete id not found');
  }

  const delAvengerCart = await avenger.deleteOne({ requstedID });

  return res.status(200).send(delAvengerCart);
});

module.exports = router;
