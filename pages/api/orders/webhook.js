import nc from 'next-connect'
import dbConnect from '@/backend/config/dbConnect'
import onError from "@/backend/middlewares/errors";
import { isAuthenticatedUser } from '@/backend/middlewares/auth';
import {  webhook } from '@/backend/controllers/orderControllers';

const router = nc({onError})

dbConnect()

export const config = {
    api: {
        bodyParser: false
    }
};

router.post(webhook);


export default router
