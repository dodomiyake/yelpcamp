const mongoose = require("mongoose");
const Campground = require("../model/campground");
const axios = require('axios');
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "CONNECTION ERROR"));
db.once("open", () => {
  console.log("DATABASE CONNECTED");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// async function seedImg() {
//     try {
//       const resp = await axios.get('https://api.unsplash.com/photos/random', {
//         params: {
//           client_id: 'UuFmt9Yh1CqS2fT5vya2qqDxRDEXgKLjcSgN87hEhCU',
//           collections: 483251,
//           w: 400,
//           h: 260
//         },
//       })
//       return `${resp.data.urls.raw}&w=400&h=260&fit=crop`;
//     } catch (err) {
//       console.error(err)
//     }
//   }

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      author: '669809660c01c135eba11951',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ad molestiae vel corrupti, inventore nisi, exercitationem soluta quia ab numquam repudiandae doloremque, commodi ipsa corporis dolorem necessitatibus perferendis rerum aut?",
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images:  [
        {
          url: 'https://res.cloudinary.com/df82cz2wy/image/upload/v1721918175/YelpCamp/yj7trdhb8ijz4gacswgv.jpg',
          filename: 'YelpCamp/yj7trdhb8ijz4gacswgv'
        },
        {
          url: 'https://res.cloudinary.com/df82cz2wy/image/upload/v1721918181/YelpCamp/kc4zzynt2v5fvmqso6xf.jpg',
          filename: 'YelpCamp/kc4zzynt2v5fvmqso6xf'
        },
        {
          url: 'https://res.cloudinary.com/df82cz2wy/image/upload/v1721918178/YelpCamp/iggkfhgusgcz9fi3zfvf.jpg',
          filename: 'YelpCamp/iggkfhgusgcz9fi3zfvf'
        },
        {
          url: 'https://res.cloudinary.com/df82cz2wy/image/upload/v1721918177/YelpCamp/s1gt0cvf8gaj7h7x45e7.jpg',
          filename: 'YelpCamp/s1gt0cvf8gaj7h7x45e7'
        },
        {
          url: 'https://res.cloudinary.com/df82cz2wy/image/upload/v1721918178/YelpCamp/qoicytypectwgimu72kj.jpg',
          filename: 'YelpCamp/qoicytypectwgimu72kj'
        },
        {
          url: 'https://res.cloudinary.com/df82cz2wy/image/upload/v1721918180/YelpCamp/uoyjgha3lqfdvntwheaz.jpg',
          filename: 'YelpCamp/uoyjgha3lqfdvntwheaz'
        }
      ]
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
