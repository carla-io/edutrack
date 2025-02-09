import React, { useRef, useState } from 'react';
import axios from 'axios';
import Nav2 from './Nav2';
import '../components/css/Documents.css';
import Footer from './Footer';

const Documents = () => {
    const gradesInputRef = useRef(null);
    const certificatesInputRef = useRef(null);
    const [imageURL, setImageURL] = useState("");

    const handleUploadClick = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob",
            });

            const imageBlob = new Blob([response.data], { type: "image/png" });
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageURL(imageObjectURL);
        } catch (error) {
            console.error("Upload failed", error);
        }
    };

    return (
        <>
            <Nav2 />
            <div className="container">
                <div className="upload-section">
                    {/* Process 1 - Upload Grades */}
                    <div className="upload-container">
                        <h2 className="process-text">PROCESS 1</h2>
                        <div className="upload-box">
                            <h3>UPLOAD YOUR GRADES</h3>
                            <div className="upload-area" onClick={() => handleUploadClick(gradesInputRef)}>
                                <img src="upload-icon.png" alt="Upload File" className="upload-icon"/>
                                <p>Place your file here</p>
                            </div>
                            <input 
                                type="file" 
                                ref={gradesInputRef} 
                                style={{ display: "none" }} 
                                onChange={handleFileChange} 
                            />
                            <button className="upload-button" onClick={() => handleUploadClick(gradesInputRef)}>UPLOAD</button>
                        </div>
                    </div>

                    {/* Display Uploaded Image */}
                    {imageURL && <img src={imageURL} alt="Processed Document" className="uploaded-image" />}
                </div>

                <button className="next-button" onClick={() => window.location.href = '/personal-question'}>NEXT</button>
            </div>
            <Footer />
        </>
    );
};

export default Documents;
