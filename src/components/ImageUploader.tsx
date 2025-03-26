import React, { useState } from 'react';
import { uploadImage } from '../utils/imageUpload';
import './ImageUploader.css';

export const ImageUploader: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setUploadStatus('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file first');
            return;
        }

        setIsUploading(true);
        setUploadStatus('Uploading...');

        try {
            // Create a unique filename using timestamp
            const timestamp = new Date().getTime();
            const imagePath = `images/${timestamp}-${selectedFile.name}`;
            
            await uploadImage(selectedFile, imagePath);
            setUploadStatus('Upload successful!');
            setSelectedFile(null);
        } catch (error) {
            setUploadStatus('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="image-uploader">
            <h2>Image Upload</h2>
            <div className="upload-controls">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                />
                <button 
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                >
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                </button>
            </div>
            {uploadStatus && (
                <p className="status-message">{uploadStatus}</p>
            )}
            {selectedFile && (
                <p className="file-info">
                    Selected file: {selectedFile.name}
                    <br />
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
            )}
        </div>
    );
}; 