import nc from 'next-connect'
import dbConnect from '@/backend/config/dbConnect'
import { getAddresses, newAddress } from '@/backend/controllers/addressController'
import { isAuthenticatedUser } from '@/backend/middlewares/auth'
import onError from "@/backend/middlewares/errors";


const router = nc({onError})

dbConnect()

router.use(isAuthenticatedUser).get(getAddresses)
router.use(isAuthenticatedUser).post(newAddress)


export default router
