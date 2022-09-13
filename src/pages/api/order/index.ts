import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { Order } from '@/types/order';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method; // get method type from request

    if (method === 'POST') {
        // CREATE ORDER
        const { user, items }: Order = req.body;

        const result = await prisma.order.create({
            data: {
                user: {
                    connectOrCreate: {
                        where: {
                            tg: user.tg,
                        },
                        create: {
                            tg: user.tg,
                        },
                    },
                },
                items: {
                    create: [...items],
                },
            },
            // include: {
                
            // }
        });
        res.json(result);
    } else {
        // send error if requested method isn't supported
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
