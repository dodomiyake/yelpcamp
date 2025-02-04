const Campground = require("../model/campground");
const Review = require('../model/review')

module.exports.createReview = async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);   
    console.log(review) 
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!')
    res.redirect(`/campgrounds/${campground._id}`)
  }

module.exports.deleteReviews = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Deleted a review!')
    res.redirect(`/campgrounds/${id}`);
  }