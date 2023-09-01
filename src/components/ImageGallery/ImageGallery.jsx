import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ articles }) => {
  return (
    <ul class="gallery">
      {articles.map(({ objectID, webformatURL, searchQuery }) => (
        <ImageGalleryItem
          searchTitle={searchQuery}
          url={webformatURL}
          key={objectID}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
};
