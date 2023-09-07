import nc from 'next-connect'
import dbConnect from '@/backend/config/dbConnect'
import { newProduct, listProducts } from '@/backend/controllers/productControllers'
import onError from "@/backend/middlewares/errors";

const router = nc({onError})

dbConnect()

router.post(newProduct)
router.get(listProducts)


export default router
