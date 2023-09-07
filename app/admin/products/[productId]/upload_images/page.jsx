import React from 'react'
import UploadImages from '@/components/admin/UploadImages'


const UploadImagesPage =  ({ params }) => {

    return <UploadImages productId={params.productId} />
}

export default UploadImagesPage