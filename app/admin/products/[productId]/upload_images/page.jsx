import React from 'react'
import UploadImages from '@/components/admin/UploadImages'


const HomePage =  ({ params }) => {

    console.log({params})

    return <UploadImages productId={params.productId} />
}

export default HomePage