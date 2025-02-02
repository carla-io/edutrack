import React, { useRef } from 'react';
import Nav2 from './Nav2';
import '../components/css/Documents.css';
import Footer from './Footer';

const Documents = () => {
    const gradesInputRef = useRef(null);
    const certificatesInputRef = useRef(null);

    const handleUploadClick = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.click();
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
                            <div className="upload-area">
                                <img src="upload-icon.png" alt="Upload File" className="upload-icon"/>
                                <p>Place your file here</p>
                            </div>
                            <input 
                                type="file" 
                                ref={gradesInputRef} 
                                style={{ display: "none" }} 
                            />
                            <button className="upload-button" onClick={() => handleUploadClick(gradesInputRef)}>UPLOAD</button>
                        </div>
                    </div>

                    {/* Process 2 - Upload Certificates */}
                    <div className="upload-container">
                        <h2 className="process-text">PROCESS 2</h2>
                        <div className="upload-box">
                            <h3>UPLOAD YOUR CERTIFICATES</h3>
                            <div className="upload-area">
                                <img src="upload-icon.png" alt="Upload File" className="upload-icon"/>
                                <p>Place your file here</p>
                            </div>
                            <input 
                                type="file" 
                                ref={certificatesInputRef} 
                                style={{ display: "none" }} 
                            />
                            <button className="upload-button" onClick={() => handleUploadClick(certificatesInputRef)}>UPLOAD</button>
                        </div>
                    </div>
                </div>

                <button className="next-button" onClick={() => window.location.href = '/personal-question'}>NEXT</button>
            </div>
            <Footer />
        </>
    );
};

export default Documents;
