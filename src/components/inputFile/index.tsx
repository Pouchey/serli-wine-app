import Image from '../image';

import './style.css';

interface InputFileProps {
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
}

export default ({ onSelect, preview }: InputFileProps) => {
  return (
    <div className={`input-wrapper ${preview ? 'preview' : ''}`}>
      {preview && (
        <div className="input-preview">
          <Image src={preview} alt="image-selected" size={200} />
        </div>
      )}
      <input
        type="file"
        id="input-file"
        placeholder="Choisir une image"
        accept="image/*"
        className="input-file"
        onChange={onSelect}
      />
      {!preview && <div className="input-zone"></div>}
    </div>
  );
};
