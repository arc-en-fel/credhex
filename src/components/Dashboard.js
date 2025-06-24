import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import UploadForm from './UploadForm';
import './Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      alert(`Failed to fetch certificates: ${error.message}`);
      setCerts([]);
    } else {
      setCerts(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome to CredHex, {user.email}</h2>
        <div className="controls">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      <UploadForm user={user} onUpload={fetchCertificates} />
      <h3>Your Certificates</h3>

      {loading ? (
        <p>Loading certificates...</p>
      ) : certs.length === 0 ? (
        <p>You have not uploaded any certificates yet.</p>
      ) : (
        <div className="certificate-grid">
          {certs.map(cert => (
            <div className="certificate-preview-card" key={cert.id}>
              <div className="file-preview">
                {cert.file_url.endsWith('.pdf') ? (
                  <iframe src={cert.file_url} title={cert.file_name} frameBorder="0"></iframe>
                ) : (
                  <img src={cert.file_url} alt={cert.file_name} />
                )}
              </div>
              <div className="certificate-details">
                <strong>{cert.file_name}</strong>
                <small>Uploaded on: {new Date(cert.created_at).toLocaleDateString()}</small>
                <a href={cert.file_url} target="_blank" rel="noopener noreferrer">View Full</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
