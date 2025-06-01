import React, { useState } from 'react';

const FileInput = ({ onFileLoaded }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                onFileLoaded(e.target.result);
            };
            reader.readAsText(file);
        } else {
            setFileName('');
            onFileLoaded(null);
        }
    };

    return (
        <div className="file-input-container">
            <label htmlFor="file-upload" className="file-upload-button">
                Seleccionar Archivo
            </label>
            <input
                id="file-upload"
                type="file"
                accept=".txt, .html, .md"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <span className="file-name">
                {fileName || 'Ningún archivo seleccionado'}
            </span>
        </div>
    );
};

export default FileInput;
