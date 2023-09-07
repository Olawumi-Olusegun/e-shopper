import nc from 'next-connect'
import dbConnect from '@/backend/config/dbConnect'
import { findProductById } from '@/backend/controllers/productControllers'
import onError from "@/backend/middlewares/errors";

const router = nc({onError})

dbConnect()

router.get(findProductById)


export default router
