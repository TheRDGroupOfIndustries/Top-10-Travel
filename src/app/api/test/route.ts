import { db } from "@/core/client/db";
// import { Company, CompanyData } from "@prisma/client";
import { NextResponse } from "next/server";

// const agency = [
//   {
//     legalName: "Grand Luxury Resort12",
//     rating: 4.8,
//     methodology: "Lorem ipsum dolor sit amet, buhdun dwbsh hwdywd elit.",
//     image:
//       "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
//   },
//   {
//     legalName: "Seaside Paradise Hotel12",
//     rating: 4.5,
//     methodology: "Lorem ipsum dolor sit amet, buhdun dwbsh hwdywd elit.",
//     image:
//       "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
//   },
//   {
//     legalName: "Mountain View Lodge12",
//     rating: 4.7,
//     methodology: "Lorem ipsum dolor sit amet, buhdun dwbsh hwdywd elit.",
//     image:
//       "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
//   },
//   {
//     legalName: "Urban Chic Boutique12",
//     rating: 4.6,
//     methodology: "Lorem ipsum dolor sit amet, buhdun dwbsh hwdywd elit.",
//     image:
//       "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
//   },
//   {
//     legalName: "Tropical Oasis Resort12",
//     rating: 4.9,
//     methodology: "Lorem ipsum dolor sit amet, buhdun dwbsh hwdywd elit.",
//     image:
//       "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
//   },
//   {
//     legalName: "Tropical Resort12",
//     rating: 4.0,
//     methodology: "Lorem ipsum dolor sit amet, buhdun dwbsh hwdywd elit.",
//     image:
//       "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
//   },
//   {
//     legalName: "Oasis Resort12",
//     rating: 2.9,
//     methodology: "Lorem ipsum dolor sit amet, buhdun dwbsh hwdywd elit.",
//     image:
//       "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
//   },
//   {
//     legalName: "Tropical Oasis12",
//     rating: 4.3,
//     methodology: "Lorem ipsum dolor sit amet, buhdun dwbsh hwdywd elit.",
//     image:
//       "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
//   },
//   {
//     legalName: "Tropical Resort22",
//     rating: 4.2,
//     methodology: "Lorem ipsum dolor sit amet, buhdun dwbsh hwdywd elit.",
//     image:
//       "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
//   },
//   {
//     legalName: "Oasis Resort32",
//     rating: 3.9,
//     methodology: "Lorem ipsum dolor sit amet, buhdun dwbsh hwdywd elit.",
//     image:
//       "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
//   },
// ];
const getRandomState = () => {
  const states = ["Delhi", "Uttar Pradesh", "Assam", "Jharkhand", "Orrisa"];
  return states[Math.floor(Math.random() * 5)];
};
const getRandomCity = () => {
  const states = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Surat",
  ];
  return states[Math.floor(Math.random() * 10)];
};
// const getNewuser = async (i: number) => {
//   const testuser = await db.user.create({
//     data: { email: `user${i}@email.com`, username: "user" + i },
//   });
//   return testuser.id;
// };
const getPriority = () => {
  return Math.floor(Math.random() * 30);
};
function generateRandomNum() {
  let randomNumber = "";
  for (let i = 0; i < 20; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}
const companyDetail = {
  pincode: "123456",
  address: "123 main street, XYZ state, ABC Country",
  city: "City",
  companyContact: "12343123414",
  ownerName: "Owner John doe",
  phone: "34124123",
  images: [
    "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
    "https://img.freepik.com/free-photo/beautiful-landscape-cityscape-hua-hin-city-around-sea-ocean-bay_74190-9225.jpg?t=st=1722272228~exp=1722275828~hmac=2e3c124d9545a4d0ce1e2191854d1df99672eed18d5cbb9fd06401780493415f&w=826",
  ],
};
export async function GET() {
  let data = [];

  // agency.forEach(async (a, ind) => {
  //   const d = {
  //     ...a,
  //     companyRole: "HOTEL",
  //     country: "India",
  //     isCertified: false,
  //     isSuspended: false,
  //     priority: 0,
  //     state: getRandomState(),
  //   };
  //   await db.company.create({
  //     data: { ...d, user: { connect: { id: await getNewuser(ind+20) } } },
  //   });
  // });
  //   console.log(await db.company.createMany({ data: data }))
  //   console.log(await db.company.count());
  // console.log(await db.user.deleteMany({where:{email:{contains:"user"}}}))
  // await db.companyData.deleteMany();
  // const companies = await db.company.findMany();
  // //   console.log(companies);
  // for (const company of companies) {
  //   await db.companyData.create({
  //     data: {
  //       ...companyDetail,
  //       business_reg_number: generateRandomNum(),
  //       company: { connect: { id: company.id } },
  //     },
  //   });
  // }
  // console.log(await db.companyData.count());
  // console.log(
  //   await db.companyData.updateMany({
  //     data: {
  //       description:
  //         "Welcome to our hotel, your perfect getaway destination offering comfort, convenience, and exceptional service. Nestled in the heart of the city, our hotel provides easy access to local attractions, shopping, and dining experiences. Whether you're here for business or leisure, our hotel promises a memorable stay with a variety of amenities designed to cater to your needs.",
  //     },
  //   })
  // );
  // console.log(
  //   await db.company.updateMany({
  //     data: {
  //       methodology:
  //         "Our hotel is the best choice for your stay because of its unbeatable location, luxurious amenities, and exceptional service. Situated in the heart of the city, it offers easy access to popular attractions, shopping, and dining. Guests enjoy spacious, well-appointed rooms, a state-of-the-art fitness center, and a rooftop pool with stunning views. Our dedicated staff ensures personalized service, catering to your every need. With a renowned restaurant serving gourmet cuisine and versatile meeting spaces, our hotel is perfect for both leisure and business travelers. Experience the perfect blend of comfort, convenience, and elegance at our top-rated hotel.",
  //     },
  //   })
  // );
  // console.log(
  //   await db.companyData.updateMany({
  //     data: {
  //       images: {
  //         push: [
  //           "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  //           "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
  //           "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  //         ],
  //       },
  //     },
  //   })
  // );
  // console.log(await db.influencerData.deleteMany());
  // const getRandomSpeciality = () => {
  //   const states = [
  //     "Blogging",
  //     "Hiking",
  //     "Youtuber",
  //     "Social Media Creator",
  //     "Instagram influencer",
  //   ];
  //   return states[Math.floor(Math.random() * 5)];
  // };
  // const users = await db.user.findMany();
  // //   console.log(companies);
  // for (const user of users) {
  //   await db.influencerData.create({
  //     data: {
  //       name: user.username,
  //       image: "/influencer.png",
  //       speciality: getRandomSpeciality(),
  //       description:
  //         "I am a renowned travel influencer, captivating audiences worldwide with breathtaking photography, engaging stories, and expert travel tips. With a passion for exploring new destinations and cultures, I offer a unique perspective on the world’s most beautiful and intriguing places. From luxury escapes to off-the-beaten-path adventures, my content inspires and guides followers to make the most of their own travel experiences. Known for my authentic voice and vibrant personality, I collaborate with top brands to bring the best travel experiences and recommendations to my dedicated and ever-growing audience.",
  //       user: { connect: { id: user.id } },
  //       priority: getPriority(),
  //       state_priority: getPriority(),
  //       socialLinks: [
  //         "https://www.instagram.com/thisisbillgates/",
  //         "https://www.youtube.com/@Fireship",
  //         "https://www.facebook.com/fireship.tech/",
  //       ],
  //       country: "India",
  //       state: getRandomState(),
  //     },
  //   });
  // }
  // console.log(await db.influencerData.count())
  // const companies = await db.company.findMany();
  // //   console.log(companies);
  // let i = 1;
  // for (const company of companies) {
  //   await db.reviews.createMany({
  //     data: [
  //       {
  //         ip: "192.168.1.1",
  //         name: "John Doe",
  //         rating: 5,
  //         review:
  //           "Absolutely fantastic stay! The hotel staff were incredibly attentive and the amenities were top-notch. Highly recommend!",
  //       },
  //       {
  //         ip: "192.168.1.2",
  //         name: "Jane Smith",
  //         rating: 4,
  //         review:
  //           "Great experience overall. The location was perfect and the room was very comfortable. Will definitely return.",
  //       },
  //       {
  //         ip: "192.168.1.3",
  //         name: "Alice Johnson",
  //         rating: 3,
  //         review:
  //           "The hotel was good but there were a few minor issues with the service. Otherwise, a pleasant stay.",
  //       },
  //       {
  //         ip: "192.168.1.4",
  //         name: "Bob Brown",
  //         rating: 2,
  //         review:
  //           "The room was not as clean as expected and the service was slow. Needs improvement.",
  //       },
  //       {
  //         ip: "192.168.1.5",
  //         name: "Charlie Davis",
  //         rating: 5,
  //         review:
  //           "Outstanding! The food was amazing, and the views from the room were breathtaking. Will come back for sure.",
  //       },
  //       {
  //         ip: "192.168.1.6",
  //         name: "Diana Evans",
  //         rating: 4,
  //         review:
  //           "Very good stay. The staff were friendly and the facilities were excellent. A few small improvements needed.",
  //       },
  //     ].map((d) => ({ ...d, companyId: company.id })),
  //   });
  //   i++;
  // }
  // const c = await db.company.findMany();
  // for(const data of c){
  //   await db.user.update({where:{id:data.userId}, data:{role:"COMPANY"}});
  // }
  // const users = await db.user.findMany({select:{id:true, role:true}})
  // for(const user of users){
  //   const description = "I am having trouble accessing my account. When I try to log in, I receive an error message stating that my username or password is incorrect. I have tried resetting my password, but I still cannot log in. Can you please assist me in resolving this issue?"
  //   const title = "Unable to Access Account"
  //   await db.helpDesk.create({data:{title, description, user:{connect:{id:user.id}}, status:"PENDING"}})
  // }
  // await db.companyData.updateMany({data:{socialLinks:[
  //   "https://www.google.com/travel/search?q=hotel%20near%20me&g2lb=4814050%2C4874190%2C4893075%2C4965990%2C4969803%2C72277293%2C72302247%2C72317059%2C72406588%2C72414906%2C72421566%2C72470899%2C72471280%2C72472051%2C72473841%2C72481459%2C72485658%2C72486593%2C72494250%2C72499705%2C72512010%2C72520082%2C72536387%2C72569093%2C72570850%2C72602734%2C72616120%2C72619927%2C72620306%2C72628719%2C72634630%2C72647020%2C72648289%2C72653660%2C72658035%2C72662543%2C72670818%2C72671093%2C72684992%2C72686036%2C72690755%2C72691753&hl=en-IN&gl=in&cs=1&ssta=1&ts=CAESCAoCCAMKAggDGhwSGhIUCgcI6A8QCBgQEgcI6A8QCBgRGAEyAhAAKgcKBToDSU5S&qs=CAEyFENnc0lyTlBJeTlqSHB0ejBBUkFCOApCCREcjHAWkKT4-kIJEY1NvpPciv9YQgkR626NpAAbmHBaRwgBMkOqAUAQASoJIgVob3RlbCgAMh4QASIatf__fwa8HPR4qqKKWRTU8aV6NyfsQzXRfeEyERACIg1ob3RlbCBuZWFyIG1l&ap=aAG6AQhvdmVydmlldw&ictx=111&ved=0CAAQ5JsGahcKEwjwt9H12-SHAxUAAAAAHQAAAAAQDg",
  //   "https://www.youtube.com/@TravelTop10",
  //   "https://www.instagram.com/traveltop10.in/",
  //   "https://x.com/traveltop_10"
  // ]}})
  // function getRandomName() {
  //   const adjectives = [
  //     "Sunny",
  //     "Wanderlust",
  //     "Dreamy",
  //     "Epic",
  //     "Vibrant",
  //     "Tranquil",
  //     "Globetrotter",
  //     "Adventure",
  //     "Majestic",
  //     "Radiant",
  //   ];
  //   const nouns = [
  //     "Journeys",
  //     "Travels",
  //     "Expeditions",
  //     "Voyages",
  //     "Odyssey",
  //     "Adventures",
  //     "Getaways",
  //     "Excursions",
  //     "Safaris",
  //     "Explorers",
  //   ];
  //   const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  //   const noun = nouns[Math.floor(Math.random() * nouns.length)];

  //   return `${adjective} ${noun}`;
  // }
  // const [hotels, dmcs] = await Promise.all([
  //   db.hotel.findMany(),
  //   db.dMC.findMany(),
  // ]);

  // for (const dmc of dmcs) {
  //   await db.dMC.update({
  //     where: { id: dmc.id },
  //     data: {
  //      images: [
  //        "/image2.jpg",
  //        "/image3.jpg",
  //        "/image1.jpg",
  //         "/image4.jpg",
  //         "/image5.jpg",
  //       ],
  //     },
  //   });
  //   console.log("dmc Updated")
  // }
  // for (const hotel of hotels) {
  //   await db.hotel.update({
  //     where: { id: hotel.id },
  //     data: {

  //       images: [
  //         "/image5.jpg",
  //         "/image4.jpg",
  //         "/image1.jpg",
  //         "/image2.jpg",
  //         "/image3.jpg",
  //       ],
  //     },
  //   });
  //   console.log("hotel Updated")
  // }
  // const [agencies, dmcs] = await Promise.all([
  //   db.agency.findMany(),
  //   db.dMC.findMany(),
  // ]);

  // for (const agency of agencies) {
  //   await db.agency.update({
  //     where: { id: agency.id },
  //     data: {
  //       pastProjects: {
  //         create: [
  //           {
  //             projectName: "Wanderlust Retreats",
  //             clientName: "Global Adventures Travel",
  //             year: 2023,
  //             description:
  //               "An extensive campaign designed to curate and promote luxurious retreats across exotic destinations, targeting high-net-worth individuals seeking exclusive travel experiences.",
  //           },
  //           {
  //             projectName: "Cultural Immersion Tours",
  //             clientName: "Heritage Explorers",
  //             year: 2023,
  //             description:
  //               "A unique project focusing on developing customized cultural immersion tours that allow travelers to experience local traditions, cuisine, and lifestyles in remote regions.",
  //           },
  //           {
  //             projectName: "Eco-Friendly Journeys",
  //             clientName: "Sustainable Travel Co.",
  //             year: 2023,
  //             description:
  //               "A pioneering initiative aimed at promoting eco-friendly travel options, including carbon-neutral flights, sustainable accommodations, and environmentally responsible tours.",
  //           },
  //           {
  //             projectName: "Luxury Cruise Escapes",
  //             clientName: "Oceanic Voyages",
  //             year: 2023,
  //             description:
  //               "A high-end project that developed a series of luxury cruise packages, offering travelers exclusive experiences on board and at premium coastal destinations.",
  //           },
  //           {
  //             projectName: "Adventure Trails",
  //             clientName: "Epic Expeditions",
  //             year: 2023,
  //             description:
  //               "A project that designed and promoted adrenaline-pumping adventure trails, including trekking, mountain biking, and extreme sports activities, across rugged terrains and scenic landscapes.",
  //           },
  //         ],
  //       },
  //     },
  //   });
  //   console.log("update aagency");
  // }
  // for (const dmc of dmcs) {
  //   await db.dMC.update({
  //     where: { id: dmc.id },
  //     data: {
  //       pastProjects:{
  //         create:[
  //           {
  //             "projectName": "Wanderlust Retreats",
  //             "clientName": "Global Adventures Travel",
  //             "year": 2023,
  //             "description": "An extensive campaign designed to curate and promote luxurious retreats across exotic destinations, targeting high-net-worth individuals seeking exclusive travel experiences."
  //           },
  //           {
  //             "projectName": "Cultural Immersion Tours",
  //             "clientName": "Heritage Explorers",
  //             "year": 2023,
  //             "description": "A unique project focusing on developing customized cultural immersion tours that allow travelers to experience local traditions, cuisine, and lifestyles in remote regions."
  //           },
  //           {
  //             "projectName": "Eco-Friendly Journeys",
  //             "clientName": "Sustainable Travel Co.",
  //             "year": 2023,
  //             "description": "A pioneering initiative aimed at promoting eco-friendly travel options, including carbon-neutral flights, sustainable accommodations, and environmentally responsible tours."
  //           },
  //           {
  //             "projectName": "Luxury Cruise Escapes",
  //             "clientName": "Oceanic Voyages",
  //             "year": 2023,
  //             "description": "A high-end project that developed a series of luxury cruise packages, offering travelers exclusive experiences on board and at premium coastal destinations."
  //           },
  //           {
  //             "projectName": "Adventure Trails",
  //             "clientName": "Epic Expeditions",
  //             "year": 2023,
  //             "description": "A project that designed and promoted adrenaline-pumping adventure trails, including trekking, mountain biking, and extreme sports activities, across rugged terrains and scenic landscapes."
  //           }
  //         ]

  //       }
  //     },
  //   });
  //   console.log("update dmc");
  // }
  // const agencySpecial = ["Luxury Travel", "Budget Travel"];
  // const agencyPrimary = ["Corporate Travel", "Leisure Travel"];

  // const dmcCore = ["Event Planning & Execution", "Group Tours & Incentives"];
  // const dmcSpecial = ["Luxury Travel Experiences", "Adventure Tourism"];
  // const hotelSer = ["Room service", "Housekeeping"];
  // const hotelSpecial = ["Business Hotels", "Boutique Hotels"];

  //
  // function getRandomCountryAndCity() {
  //   const countries = {
  //     "United States": [
  //       "New York",
  //       "Los Angeles",
  //       "Chicago",
  //       "Houston",
  //       "Phoenix",
  //     ],
  //     India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
  //     Japan: ["Tokyo", "Osaka", "Nagoya", "Kyoto", "Hiroshima"],
  //     France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
  //     Brazil: [
  //       "São Paulo",
  //       "Rio de Janeiro",
  //       "Brasília",
  //       "Salvador",
  //       "Fortaleza",
  //     ],
  //   };

  //   const countryNames = Object.keys(countries);
  //   const randomCountry =
  //     countryNames[Math.floor(Math.random() * countryNames.length)];
  //   // @ts-expect-error
  //   const cities = countries[randomCountry];
  //   const randomCity = cities[Math.floor(Math.random() * cities.length)];

  //   return { country: randomCountry, city: randomCity };
  // }
  function getRandomPersonName() {
    const names = [
      "John Doe",
      "Jane Smith",
      "Alice Johnson",
      "Michael Brown",
      "Emily Davis",
      "David Wilson",
      "Sophia Garcia",
      "James Miller",
      "Olivia Martinez",
      "Ethan Rodriguez",
    ];

    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }
  // function getRandomImage() {
  //   const imageCount = 4;
  //   const randomIndex = Math.floor(Math.random() * imageCount) + 1;
  //   return `/person${randomIndex}.jpg`;
  // }
  // const influencers = await db.influencerData.findMany();
  // for (const inf of influencers) {
  //   const { country, city } = getRandomCountryAndCity();
  //   await db.influencerData.update({
  //     where: { id: inf.id },
  //     data: {
  //       country,
  //       state: city,
  //       name: getRandomPersonName(),
  //       image: getRandomImage(),
  //     },
  //   });
  //   console.log("inf update");
  // }
  // const reviews = await db.reviews.findMany({ include: { user: true } });
  // for(const review of reviews){
  //   await db.reviews.update({where:{id:review.id}, data:{
  //       name:getRandomPersonName()
  //   }})
  //   console.log("inf update")
  // }
  // function getRandomImageArray() {
  //   const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg", "/image4.jpg", "/image5.jpg"];

  //   // Shuffle the array to get a random order
  //   for (let i = images.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [images[i], images[j]] = [images[j], images[i]];
  //   }

  //   return images;
  // }
  // const [agencies, dmcs, hotels] = await Promise.all([
  //     db.agency.findMany(),
  //     db.dMC.findMany(),
  //     db.hotel.findMany(),
  //   ]);
  //   for (const agency of agencies) {
  //     const {country, city} = getRandomCountryAndCity()
  //     await db.agency.update({
  //       where: { id: agency.id },
  //       data: {
  //           images: getRandomImageArray(),
  //           country,
  //           city
  //       },
  //     });
  //     console.log("agency update")
  //   }
  //   for (const agency of dmcs) {
  //     const {country, city} = getRandomCountryAndCity()

  //     await db.dMC.update({
  //       where: { id: agency.id },
  //       data: {
  //         images: getRandomImageArray(),
  //         country,
  //         city
  //       },
  //     });
  //     console.log("dmc update")
  //   }
  //   for (const agency of hotels) {
  //     const {country, city} = getRandomCountryAndCity()
  //     await db.hotel.update({
  //       where: { id: agency.id },
  //       data: {
  //         images: getRandomImageArray(),
  //         country,
  //         city
  //       },
  //     });
  //     console.log("hotel update")
  //   }
  // const all = await db.user.findMany();
  // const user1 = all[0];
  // const user2 = all[1];
  // console.log(user1.email, user2.email)
  // const review =
  //   "The service was exceptional and the experience was unforgettable.";
  // const review2 = "Had a pleasant stay, but there were a few minor issues.";
  // const [agencies, dmcs, hotels] = await Promise.all([
  //   db.agency.findMany(),
  //   db.dMC.findMany(),
  //   db.hotel.findMany(),
  // ]);
  //   for (const agency of agencies) {
  //     await db.agency.update({
  //       where: { id: agency.id },
  //       data: {
  //         reviews:{increment:2}
  //       },
  //     });
  //     console.log("agency update")
  //   }
  //   for (const agency of dmcs) {

  //     await db.dMC.update({
  //       where: { id: agency.id },
  //       data: {
  //         reviews:{increment:2}
  //       },
  //     });
  //     console.log("dmc update")
  //   }
  //   for (const agency of hotels) {
  //     await db.hotel.update({
  //       where: { id: agency.id },
  //       data: {
  //         reviews:{increment:2}
  //       },
  //     });
  //     console.log("hotel update")
  //   }
  return NextResponse.json("hi");
}
