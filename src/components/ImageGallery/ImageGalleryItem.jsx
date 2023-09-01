export const ImageGalleryItem = ({ searchTitle, url }) => {
  return (
    <li class="gallery-item">
      <img src={url} alt={searchTitle} />
    </li>
  );
};
