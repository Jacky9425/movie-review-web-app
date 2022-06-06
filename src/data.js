import Morbius from "./image/Morbius.jpg";
import TopGun from "./image/topgun.jpg";
import DrStrange from "./image/drstrange.jpg";

const reviewData = [
  {
    id: 1,
    image_path: Morbius,
    date_of_review: "30 Mar 2022",
    screening_date: "26 Mar 2022",
    cast: [{ actor: "Jared Leto", character: "Dr Michael Morbius" }],
    name: "Morbius",
    rating: 1.5,
    description: "Not good enough",
  },
  {
    id: 2,
    image_path: TopGun,
    date_of_review: "5 June 2022",
    screening_date: "27 May 2022",
    cast: [{ actor: "Tom Cruise", character: "Pet Maverick Mitchell" }],
    name: "Top Gun: Maverick",
    rating: 4.5,
    description: "Good character development",
  },
  {
    id: 3,
    image_path: DrStrange,
    date_of_review: "13 May 2022",
    screening_date: "4 May 2022",
    cast: [
      { actor: "Elizabeth Olsen", character: "Wand Maximoff / Scarlet Witch" },
    ],
    name: "Dr Strange",
    rating: 3,
    description: "Good try but wanted more",
  },
];

export { reviewData };
