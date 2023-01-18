import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputFile from '../../../components/inputFile';
import Loader from '../../../components/loader';

import { ResolveResponseData } from '../../../types';

import './style.css';

export default () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImageURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const postImage = async (formData: FormData) => {
    try {
      const res = await axios.post<ResolveResponseData>(
        '/api/resolve',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return {
        success: res.status === 200,
        data: res.data,
      };
    } catch (err) {
      return alert('Une erreur est survenue');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      setLoading(true);
      const res = await postImage(formData);
      setLoading(false);

      if (res && res.success) {
        navigate('/results', { state: res.data });
      }
    } else {
      setError('Veuillez selectionner une image');
    }
  };

  if (loading) return <Loader size={50} label="Envoi en cours..." />;

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit} className="form-image">
      <h1>Envoyer une image</h1>
      <InputFile onSelect={handleFileChange} preview={imageURL} />
      <button type="submit">Envoyer</button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
};
