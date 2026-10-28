import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bookingData from "../data/bookings.json" with { type: "json" };
import userData from "../data/users.json" with { type: "json" };
import hostData from "../data/hosts.json" with { type: "json" };
import amenityData from "../data/amenities.json" with { type: "json" };
import propertyData from "../data/properties.json" with { type: "json" };
import reviewData from "../data/reviews.json" with { type: "json" };
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
});

async function main() {
    const { users } = userData;
    const { hosts } = hostData;
    const { properties } = propertyData;
    const { amenities } = amenityData;
    const { reviews } = reviewData;
    const { bookings } = bookingData;

    // 1. Seed users
    for (const user of users) {
        await prisma.user.upsert({
        where: { id: user.id },
        update: {
            password: await bcrypt.hash(user.password, 10),
        },
        create: {
            id: user.id,
            username: user.username,
            password: await bcrypt.hash(user.password, 10),
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber ?? null,
            pictureUrl: user.pictureUrl ?? user.pictureURL ?? null,
        },
        });
    }

    // 2. Seed hosts
    for (const host of hosts) {
        await prisma.host.upsert({
        where: { id: host.id },
        update: {
            password: await bcrypt.hash(host.password, 10),
        },
        create: {
            id: host.id,
            username: host.username,
            password: await bcrypt.hash(host.password, 10),
            name: host.name,
            email: host.email,
            phoneNumber: host.phoneNumber ?? null,
            pictureUrl: host.pictureUrl ?? null,
            aboutMe: host.aboutMe ?? null,
        },
        });
    }

    // 3. Seed properties
    for (const property of properties) {
        await prisma.property.upsert({
        where: { id: property.id },
        update: {},
        create: {
            id: property.id,
            title: property.title,
            description: property.description,
            location: property.location,
            pricePerNight: property.pricePerNight,
            bedroomCount: property.bedroomCount,
            bathRoomCount: property.bathRoomCount,
            maxGuestCount: property.maxGuestCount,
            rating: property.rating ?? null,
            hostId: property.hostId,
        },
        });
    }

    // 4. Seed amenities
    for (const amenity of amenities) {
        await prisma.amenity.upsert({
        where: { name: amenity.name },
        update: {},
        create: {
            id: amenity.id,
            name: amenity.name,
        },
        });
    }

    // 5. Seed reviews
    for (const review of reviews) {
        await prisma.review.upsert({
        where: { id: review.id },
        update: {},
        create: {
            id: review.id,
            userId: review.userId,
            propertyId: review.propertyId,
            rating: review.rating,
            comment: review.comment ?? null,
            createdAt: review.createdAt
            ? new Date(review.createdAt)
            : new Date(),
        },
        });
    }

    // 6. Seed bookings   
    for (const booking of bookings) {
        const status = (booking.bookingStatus ?? "PENDING").toUpperCase();

        const bookingStatus =
            status === "CANCELED" ? "CANCELLED" : status;

        await prisma.booking.upsert({
            where: { id: booking.id },
            update: {},
            create: {
            id: booking.id,
            userId: booking.userId,
            propertyId: booking.propertyId,
            checkinDate: new Date(booking.checkinDate),
            checkoutDate: new Date(booking.checkoutDate),
            numberOfGuests: booking.numberOfGuests,
            totalPrice: booking.totalPrice,
            bookingStatus,
            },
        });
    }

    console.log("Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });