import nc from 'next-connect'
import dbConnect from '@/backend/config/dbConnect'

import onError from '@/backend/middlewares/errors';
import upload from '@/backend/utils/multer';
import { authorizeRoles, isAuthenticatedUser } from '@/backend/middlewares/auth';
import { uploadProductImages } from '@/backend/controllers/productControllers';

const router = nc({onError})

dbConnect()

export const config = {
    api: {
        bodyParser: false
    }
}

const uploadMiddleware = upload.array("image", 2)

router.use(uploadMiddleware, isAuthenticatedUser,  authorizeRoles('admin')).put(uploadProductImages)


export default router
