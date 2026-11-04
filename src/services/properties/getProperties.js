import prisma from '../../config/prisma.js';

const getProperties = async (location, pricePerNight) => {
    const properties = await prisma.property.findMany({
       where: {
            ...(location !== undefined && { location }),
            ...(pricePerNight !== undefined && { pricePerNight }),
        },            
    });

    return properties;
};

export default getProperties;
