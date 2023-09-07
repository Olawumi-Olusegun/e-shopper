import nc from 'next-connect'
import dbConnect from '@/backend/config/dbConnect'
import { deleteAddress, getAddress, updateAddress, } from '@/backend/controllers/addressController'
import { isAuthenticatedUser } from '@/backend/middlewares/auth'
import onError from "@/backend/middlewares/errors";


const router = nc({onError})

dbConnect()

router.use(isAuthenticatedUser).get(getAddress)
router.use(isAuthenticatedUser).put(updateAddress)
router.use(isAuthenticatedUser).delete(deleteAddress)


export default router
