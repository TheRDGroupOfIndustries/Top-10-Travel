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
async function main() {
  await prisma.user.deleteMany();
  await prisma.agency.deleteMany();
  await prisma.dMC.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.influencerData.deleteMany();
  console.log("deleted all existing");
  for (let i = 0; i < 10; i++) {
    const user1 = await prisma.user.create({
      data: {
        username: `infl-${i + 1}`,
        email: `infl-${i + 1}@example.com`,
        role: "Influencer",
      },
    });
    await prisma.influencerData.create({
      data: {
        name: user1.username,
        image: "/influencer.png",
        speciality: getRandomSpeciality(),
        description:
          "I am a renowned travel influencer, captivating audiences worldwide with breathtaking photography, engaging stories, and expert travel tips. With a passion for exploring new destinations and cultures, I offer a unique perspective on the world’s most beautiful and intriguing places. From luxury escapes to off-the-beaten-path adventures, my content inspires and guides followers to make the most of their own travel experiences. Known for my authentic voice and vibrant personality, I collaborate with top brands to bring the best travel experiences and recommendations to my dedicated and ever-growing audience.",
        user: { connect: { id: user1.id } },
        priority: 1,
        state_priority: 1,
        socialLinks: [
          "https://www.instagram.com/thisisbillgates/",
          "https://www.youtube.com/@Fireship",
          "https://www.facebook.com/fireship.tech/",
        ],
        country: `country ${i < 5 ? 1 : 2}`,
        state: `city ${i + 1}`,
      },
    });
    console.log("influencer", i);
  }
  for (let i = 0; i < 10; i++) {
    // Create Users
    const user1 = await prisma.user.create({
      data: {
        username: `user-${i + 1}`,
        email: `user-${i + 1}@example.com`,
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
        name: `Agency ${i + 1}`,
        country: `country ${i < 5 ? 1 : 2}`,
        city: `city ${i + 1}`,
        address: "123 Main St",
        contactPerson: "Alice Smith",
        contactEmail: `agency-${i + 1}@example.com`,
        contactPhoneNumber: "123-456-7890",
        websiteUrl: "https://agencyone.com",
        companyRegistrationNumber: "123456789",
        yearOfEstablishment: 2000,
        businessLicenseUpload: "https://example.com/business_license.pdf",
        insuranceCertificateUpload:
          "https://example.com/insurance_certificate.pdf",
        primaryServices: ["Travel Planning", "Consulting"],
        specializedTravelTypes: ["Luxury", "Adventure"],
        regionsOfOperation: ["Region A", "Region B"],
        internationalCertifications: ["ISO 9001"],
        memberships: ["Member A", "Member B"],
        numberOfEmployees: 50,
        keyPersonnel: {
          create: [
            {
              name: "Bob Johnson",
              position: "Manager",
              yearsOfExperience: 10,
              specialization: "Management",
            },
          ],
        },
        pastProjects: {
          create: [
            {
              projectName: "Project Alpha",
              clientName: "Client A",
              year: 2023,
              description: "Description of Project Alpha",
            },
          ],
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
        images: ["/stockPhoto.jpg", "/stockPhoto.jpg"],
        rating: 0,
        reviews: 0,
        description: "Leading travel agency",
        methodology: "Client-centric approach",
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
        name: `DMC ${i + 1}`,
        country: `country ${i < 5 ? 1 : 2}`,
        city: `city ${i + 1}`,
        address: "456 Market St",
        contactPerson: "Carol Davis",
        contactEmail: `dmc-${i + 1}@example.com`,
        contactPhoneNumber: "234-567-8901",
        websiteUrl: "https://dmcone.com",
        companyRegistrationNumber: "987654321",
        yearOfEstablishment: 2010,
        businessLicenseUpload: "https://example.com/business_license_dmc.pdf",
        insuranceCertificateUpload:
          "https://example.com/insurance_certificate_dmc.pdf",
        coreServices: ["Event Management", "Tour Packages"],
        specialization: ["Corporate Events", "Cultural Tours"],
        regionsCovered: ["Region C", "Region D"],
        internationalCertifications: ["ISO 14001"],
        memberships: ["Member C", "Member D"],
        numberOfEmployees: 30,
        keyPersonnel: {
          create: [
            {
              name: "Dave Wilson",
              position: "Coordinator",
              yearsOfExperience: 8,
              specialization: "Event Coordination",
            },
          ],
        },
        pastProjects: {
          create: [
            {
              projectName: "Project Beta",
              clientName: "Client B",
              year: 2024,
              description: "Description of Project Beta",
            },
          ],
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
        images: ["/stockPhoto.jpg", "/stockPhoto.jpg"],
        rating: 0,
        reviews: 0,
        description:
          "Welcome to our hotel, your perfect getaway destination offering comfort, convenience, and exceptional service. Nestled in the heart of the city, our hotel provides easy access to local attractions, shopping, and dining experiences. Whether you're here for business or leisure, our hotel promises a memorable stay with a variety of amenities designed to cater to your needs.",
        methodology: "Comprehensive planning",
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
        name: `Hotel ${i + 1}`,
        country: `country ${i < 5 ? 1 : 2}`,
        city: `city ${i + 1}`,
        address: "789 Hotel Ave",
        contactPerson: "Eve Thompson",
        contactEmail: `hotel-${i + 1}@example.com`,
        contactPhoneNumber: "345-678-9012",
        websiteUrl: "https://hotelone.com",
        companyRegistrationNumber: "1122334455",
        yearOfEstablishment: 2015,
        businessLicenseUpload: "https://example.com/business_license_hotel.pdf",
        insuranceCertificateUpload:
          "https://example.com/insurance_certificate_hotel.pdf",
        specialization: ["Luxury Rooms", "Spa Services"],
        services: ["Room Service", "Event Hosting"],
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
        images: ["/stockPhoto.jpg", "/stockPhoto.jpg"],
        rating: 0,
        reviews: 0,
        description: "Luxury hotel in the city",
        methodology: "Customer-focused approach",
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
