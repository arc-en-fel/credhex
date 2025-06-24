// src/components/UploadForm.js
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './UploadForm.css';

export default function UploadForm({ user, onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a PDF file first.');
      return;
    }

    setUploading(true);

    const filePath = `${user.id}/${Date.now()}_${file.name}`;

    try {
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('certificates')
        .upload(filePath, file);

      if (uploadError) throw new Error('Upload failed: ' + uploadError.message);

      // Get public URL for the uploaded file
      const { data: urlData, error: urlError } = supabase.storage
        .from('certificates')
        .getPublicUrl(filePath);

      if (urlError || !urlData?.publicUrl) throw new Error('Failed to get file URL.');

      const insertData = {
        user_id: user.id,
        file_name: file.name,
        file_url: urlData.publicUrl,
      };

      console.log('Inserting certificate metadata:', insertData);

      // Insert metadata into certificates table
      const { error: insertError } = await supabase
        .from('certificates')
        .insert([insertData]);

      if (insertError) throw new Error('Failed to save certificate metadata: ' + insertError.message);

      alert('Certificate uploaded successfully!');
      setFile(null);
      onUpload();
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-form">
      <label htmlFor="file-upload" className="upload-label">Select PDF to upload:</label>
      <input
        id="file-upload"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="upload-input"
      />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="upload-button"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
