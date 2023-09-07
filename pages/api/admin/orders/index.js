import nc from 'next-connect'
import dbConnect from '@/backend/config/dbConnect'
import onError from "@/backend/middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from '@/backend/middlewares/auth';
import { getOrders, } from '@/backend/controllers/orderControllers';

const router = nc({onError})

dbConnect()

router.use(isAuthenticatedUser, authorizeRoles('admin')).get(getOrders);


export default router
