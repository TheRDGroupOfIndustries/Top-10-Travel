const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getRandomSpeciality = () => {
  const states = [
    "Blogging",
    "Hiking",
    "Youtuber",
    "Social Media Creator",
    "Instagram influencer",
  ];
  return states[Math.floor(Math.random() * 5)];
};
function getRandomCompanyName() {
  const adjectives = [
    "Sunny",
    "Wanderlust",
    "Dreamy",
    "Epic",
    "Vibrant",
    "Tranquil",
    "Globetrotter",
    "Adventure",
    "Majestic",
    "Radiant",
  ];
  const nouns = [
    "Journeys",
    "Travels",
    "Expeditions",
    "Voyages",
    "Odyssey",
    "Adventures",
    "Getaways",
    "Excursions",
    "Safaris",
    "Explorers",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective} ${noun}`;
}
function getRandomCountryAndCity() {
  const countries = {
    "United States": [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
    ],
    India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
    Japan: ["Tokyo", "Osaka", "Nagoya", "Kyoto", "Hiroshima"],
    France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
    Brazil: [
      "São Paulo",
      "Rio de Janeiro",
      "Brasília",
      "Salvador",
      "Fortaleza",
    ],
  };

  const countryNames = Object.keys(countries);
  const randomCountry =
    countryNames[Math.floor(Math.random() * countryNames.length)];
  // @ts-expect-error
  const cities = countries[randomCountry];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  return { country: randomCountry, city: randomCity };
}
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
function getRandomImage() {
  const imageCount = 4;
  const randomIndex = Math.floor(Math.random() * imageCount) + 1;
  return `/person${randomIndex}.jpg`;
}
function getRandomImageArray() {
  const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
    "/image5.jpg",
  ];

  // Shuffle the array to get a random order
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  return images;
}
const agencySpecial = ["Luxury Travel", "Budget Travel"];
const agencyPrimary = ["Corporate Travel", "Leisure Travel"];

const dmcCore = ["Event Planning & Execution", "Group Tours & Incentives"];
const dmcSpecial = ["Luxury Travel Experiences", "Adventure Tourism"];
const hotelSer = ["Room service", "Housekeeping"];
const hotelSpecial = ["Business Hotels", "Boutique Hotels"];
const pastProjects = [
  {
    projectName: "Wanderlust Retreats",
    clientName: "Global Adventures Travel",
    year: 2023,
    description:
      "An extensive campaign designed to curate and promote luxurious retreats across exotic destinations, targeting high-net-worth individuals seeking exclusive travel experiences.",
  },
  {
    projectName: "Cultural Immersion Tours",
    clientName: "Heritage Explorers",
    year: 2023,
    description:
      "A unique project focusing on developing customized cultural immersion tours that allow travelers to experience local traditions, cuisine, and lifestyles in remote regions.",
  },
  {
    projectName: "Eco-Friendly Journeys",
    clientName: "Sustainable Travel Co.",
    year: 2023,
    description:
      "A pioneering initiative aimed at promoting eco-friendly travel options, including carbon-neutral flights, sustainable accommodations, and environmentally responsible tours.",
  },
  {
    projectName: "Luxury Cruise Escapes",
    clientName: "Oceanic Voyages",
    year: 2023,
    description:
      "A high-end project that developed a series of luxury cruise packages, offering travelers exclusive experiences on board and at premium coastal destinations.",
  },
  {
    projectName: "Adventure Trails",
    clientName: "Epic Expeditions",
    year: 2023,
    description:
      "A project that designed and promoted adrenaline-pumping adventure trails, including trekking, mountain biking, and extreme sports activities, across rugged terrains and scenic landscapes.",
  },
];
async function main() {
  // await prisma.user.deleteMany();
  // await prisma.agency.deleteMany();
  // await prisma.dMC.deleteMany();
  // await prisma.hotel.deleteMany();
  // await prisma.influencerData.deleteMany();
  // console.log("deleted all existing");
  // for (let i = 0; i < 10; i++) {
  //   const { country, city } = getRandomCountryAndCity();
  //   const user1 = await prisma.user.create({
  //     data: {
  //       username: `infl-${i + 11}`,
  //       email: `infl-${i + 11}@example.com`,
  //       role: "Influencer",
  //     },
  //   });
  //   await prisma.influencerData.create({
  //     data: {
  //       name: getRandomPersonName(),
  //       image: getRandomImage(),
  //       speciality: getRandomSpeciality(),
  //       description:
  //         "I am a renowned travel influencer, captivating audiences worldwide with breathtaking photography, engaging stories, and expert travel tips. With a passion for exploring new destinations and cultures, I offer a unique perspective on the world’s most beautiful and intriguing places. From luxury escapes to off-the-beaten-path adventures, my content inspires and guides followers to make the most of their own travel experiences. Known for my authentic voice and vibrant personality, I collaborate with top brands to bring the best travel experiences and recommendations to my dedicated and ever-growing audience.",
  //       user: { connect: { id: user1.id } },
  //       priority: 1,
  //       state_priority: 1,
  //       socialLinks: [
  //         "https://www.instagram.com/thisisbillgates/",
  //         "https://www.youtube.com/@Fireship",
  //         "https://www.facebook.com/fireship.tech/",
  //       ],
  //       country,
  //       state: city,
  //     },
  //   });
  //   console.log("influencer", i);
  // }
  for (let i = 0; i < 10; i++) {
    // Create Users
    const c1 = getRandomCountryAndCity();
    const c2 = getRandomCountryAndCity();
    const c3 = getRandomCountryAndCity();

    const user1 = await prisma.user.create({
      data: {
        username: `user-${i + 11}`,
        email: `user-${i + 11}@example.com`,
        role: "USER",
      },
    });

    // Create Agencies
    const agency1 = prisma.agency.create({
      data: {
        priority: 1,
        city_priority: 1,
        isCertified: true,
        User: {
          connect: { id: user1.id },
        },
        name: getRandomCompanyName(),
        country: c1.country,
        city: c1.city,
        address: "123 Main St",
        contactPerson: "Alice Smith",
        contactEmail: `agency-${i + 11}@example.com`,
        contactPhoneNumber: "123-456-7890",
        websiteUrl: "https://agencyone.com",
        companyRegistrationNumber: "123456789",
        yearOfEstablishment: 2000,
        businessLicenseUpload: "https://example.com/business_license.pdf",
        insuranceCertificateUpload:
          "https://example.com/insurance_certificate.pdf",
        primaryServices: agencyPrimary,
        specializedTravelTypes: agencySpecial,
        regionsOfOperation: ["Region A", "Region B"],
        internationalCertifications: ["ISO 9001"],
        memberships: ["Member A", "Member B"],
        numberOfEmployees: 50,
        pastProjects: {
          create: pastProjects,
        },
        clientReferences: {
          create: [
            {
              clientName: "Client A",
              contactEmail: "clienta@example.com",
              contactPhone: "098-765-4321",
              testimonial: "Great service!",
            },
          ],
        },

        caseStudyPdf: "https://example.com/case_study.pdf",
        promotionalVideoUpload: "/stockVideo.mp4",
        images: getRandomImageArray(),
        rating: 4.5,
        reviews: 2,
        description:
          "Welcome to our agency, your perfect getaway destination offering comfort, convenience, and exceptional service. Nestled in the heart of the city, our hotel provides easy access to local attractions, shopping, and dining experiences. Whether you're here for business or leisure, our hotel promises a memorable stay with a variety of amenities designed to cater to your needs.",
        methodology:
          "Our agency is the best choice for your stay because of its unbeatable location, luxurious amenities, and exceptional service. Situated in the heart of the city, it offers easy access to popular attractions, shopping, and dining. Guests enjoy spacious, well-appointed rooms, a state-of-the-art fitness center, and a rooftop pool with stunning views. Our dedicated staff ensures personalized service, catering to your every need. With a renowned restaurant serving gourmet cuisine and versatile meeting spaces, our hotel is perfect for both leisure and business travelers.",
      },
    });

    // Create DMC
    const dmc1 = prisma.dMC.create({
      data: {
        priority: 1,
        city_priority: 1,
        isCertified: true,
        User: {
          connect: { id: user1.id },
        },
        name: getRandomCompanyName(),
        country: c2.country,
        city: c2.city,
        address: "456 Market St",
        contactPerson: "Carol Davis",
        contactEmail: `dmc-${i + 11}@example.com`,
        contactPhoneNumber: "234-567-8901",
        websiteUrl: "https://dmcone.com",
        companyRegistrationNumber: "987654321",
        yearOfEstablishment: 2010,
        businessLicenseUpload: "https://example.com/business_license_dmc.pdf",
        insuranceCertificateUpload:
          "https://example.com/insurance_certificate_dmc.pdf",
        coreServices: dmcCore,
        specialization: dmcSpecial,
        regionsCovered: ["Region C", "Region D"],
        internationalCertifications: ["ISO 14001"],
        memberships: ["Member C", "Member D"],
        numberOfEmployees: 30,
        pastProjects: {
          create: pastProjects,
        },
        clientReferences: {
          create: [
            {
              clientName: "Client B",
              contactEmail: "clientb@example.com",
              contactPhone: "567-890-1234",
              testimonial: "Exceptional service!",
            },
          ],
        },

        caseStudyPdf: "https://example.com/case_study_dmc.pdf",
        promotionalVideoUpload: "/stockVideo.mp4",
        images: getRandomImageArray(),
        rating: 4.5,
        reviews: 2,
        description:
          "Welcome to our dmc, your perfect getaway destination offering comfort, convenience, and exceptional service. Nestled in the heart of the city, our hotel provides easy access to local attractions, shopping, and dining experiences. Whether you're here for business or leisure, our hotel promises a memorable stay with a variety of amenities designed to cater to your needs.",
        methodology:
          "Our dmc is the best choice for your stay because of its unbeatable location, luxurious amenities, and exceptional service. Situated in the heart of the city, it offers easy access to popular attractions, shopping, and dining. Guests enjoy spacious, well-appointed rooms, a state-of-the-art fitness center, and a rooftop pool with stunning views. Our dedicated staff ensures personalized service, catering to your every need. With a renowned restaurant serving gourmet cuisine and versatile meeting spaces, our hotel is perfect for both leisure and business travelers.",
      },
    });

    // Create Hotels
    const hotel1 = prisma.hotel.create({
      data: {
        priority: 1,
        city_priority: 1,
        isCertified: true,
        User: {
          connect: { id: user1.id },
        },
        name: getRandomCompanyName(),
        country: c3.country,
        city: c3.city,
        address: "789 Hotel Ave",
        contactPerson: "Eve Thompson",
        contactEmail: `hotel-${i + 11}@example.com`,
        contactPhoneNumber: "345-678-9012",
        websiteUrl: "https://hotelone.com",
        companyRegistrationNumber: "1122334455",
        yearOfEstablishment: 2015,
        businessLicenseUpload: "https://example.com/business_license_hotel.pdf",
        insuranceCertificateUpload:
          "https://example.com/insurance_certificate_hotel.pdf",
        specialization: hotelSpecial,
        services: hotelSer,
        socialMediaLinks: {
          create: {
            facebook: "https://facebook.com/hotelone",
            instagram: "https://instagram.com/hotelone",
            linkedin: "https://linkedin.com/company/hotelone",
            twitter: "https://twitter.com/hotelone",
            youtube: "https://youtube.com/hotelone",
          },
        },
        promotionalVideoUpload: "/stockVideo.mp4",
        images: getRandomImageArray(),
        rating: 4.5,
        reviews: 2,
        description:
          "Welcome to our hotel, your perfect getaway destination offering comfort, convenience, and exceptional service. Nestled in the heart of the city, our hotel provides easy access to local attractions, shopping, and dining experiences. Whether you're here for business or leisure, our hotel promises a memorable stay with a variety of amenities designed to cater to your needs.",
        methodology:
          "Our hotel is the best choice for your stay because of its unbeatable location, luxurious amenities, and exceptional service. Situated in the heart of the city, it offers easy access to popular attractions, shopping, and dining. Guests enjoy spacious, well-appointed rooms, a state-of-the-art fitness center, and a rooftop pool with stunning views. Our dedicated staff ensures personalized service, catering to your every need. With a renowned restaurant serving gourmet cuisine and versatile meeting spaces, our hotel is perfect for both leisure and business travelers.",
      },
    });
    const [hotel, agency, dmc] = await Promise.all([hotel1, agency1, dmc1]);
    console.log("seeded", i);
  }

  console.log("Data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
