import { uploadData } from 'aws-amplify/storage';

/**
 * Uploads an image file to AWS S3 using Amplify Storage
 * @param imageFile - The image file to upload
 * @param imagePath - The desired path/key for the image in S3
 * @returns Promise that resolves with the upload result
 */
export async function uploadImage(imageFile: File, imagePath: string) {
    try {
        const result = await uploadData({
            key: imagePath,
            data: imageFile,
            options: {
                contentType: imageFile.type || 'image/jpeg',
                accessLevel: 'guest'
            }
        });
        console.log('Image uploaded successfully:', result);
        return result;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
} 