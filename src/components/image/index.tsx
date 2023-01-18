interface ImageProps {
  src: string;
  alt: string;
  size?: number;
}

export default ({ src, alt, size = 300 }: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
        objectFit: 'cover',
        borderRadius: '8px',
      }}
    />
  );
};
