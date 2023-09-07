import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (file, folder) => {

    return new Promise((resolve, reject) => {
        return cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder
        }, (error, result) => {
                if(error) {
                return reject(error);
            }
            
            return resolve({ public_id: result?.public_id, url: result?.secure_url });
        })
    })
}

export { uploads, cloudinary };