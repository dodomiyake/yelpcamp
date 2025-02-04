const express = require('express');
const multer  = require('multer');

const catchAsync = require("../utils/catchAsync");

const campgrounds = require('../controllers/campgrounds')

const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

const { storage } = require('../cloudinary');
const upload = multer({ storage })

const Campground = require("../model/campground");




const router = express.Router();

router.route('/')
    .get(isLoggedIn, catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
    

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)); 





  
  router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm ));
  

  module.exports = router;