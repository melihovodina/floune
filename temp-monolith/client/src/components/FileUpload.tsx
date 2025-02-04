import React, { useRef } from 'react';

interface FileUploadProps {
    setFile: (file: File | null) => void; // Specify that setFile can accept null
    accept: string;
    children: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children }) => {
    const ref = useRef<HTMLInputElement | null>(null); // Initialize with null

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null; // Check for null
        setFile(file);
    };

    return (
        <div onClick={() => ref.current?.click()}> {/* Optional chaining */}
            <input
                type="file"
                accept={accept}
                style={{ display: "none" }}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;