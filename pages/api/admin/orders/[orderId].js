import nc from 'next-connect'
import dbConnect from '@/backend/config/dbConnect'
import onError from "@/backend/middlewares/errors";
import { authorizeRoles, isAuthenticatedUser } from '@/backend/middlewares/auth';
import { deleteOrder, getOrder, updateOrder, } from '@/backend/controllers/orderControllers';

const router = nc({onError})

dbConnect()

router.use(isAuthenticatedUser, authorizeRoles('admin')).get(getOrder);
router.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateOrder);
router.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteOrder);


export default router
