import nc from 'next-connect'
import dbConnect from '@/backend/config/dbConnect'

import { registerUser } from '@/backend/controllers/authControllers'
import onError from '@/backend/middlewares/errors';

const router = nc({onError})

dbConnect()

router.post(registerUser)


export default router
