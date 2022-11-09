const { v2: cloudinary } = require('cloudinary');

const uploadImageCloudinary = async (filePath, mimetype) => {
    const fileType = mimetype.split('/');

    if (fileType[0] !== 'image') {
        throw new Error('Extension is not supported');
    }
    return await cloudinary.uploader.upload(filePath, {
        folder: 'avatares',
        transformation: { width: 400, crop: 'fill' },
    });
};

const deleteImageCloudinary = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
};

module.exports = { uploadImageCloudinary, deleteImageCloudinary };
