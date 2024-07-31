const express = require('express');
const router = express.Router({ mergeParams: true });

const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware')

const Campground = require("../model/campground");
const Review = require('../model/review')

const catchAsync = require("../utils/catchAsync");

const reviews = require('../controllers/reviews')



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))
  
router.delete('/:reviewId', isLoggedIn, isReviewAuthor ,catchAsync(reviews.deleteReviews))




  module.exports = router;