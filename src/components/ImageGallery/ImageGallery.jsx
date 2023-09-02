import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, handleLoadMore }) => {
  return (
    <ul className="gallery">
      {images.length > 0 &&
        images.map(image => (
          <ImageGalleryItem
            key={image.id}
            searchTitle={image.searchQuery}
            url={image.webformatURL}
          ></ImageGalleryItem>
        ))}
      <div>
        <button onClick={handleLoadMore}>Load more</button>
      </div>
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      searchQuery: PropTypes.string,
      webformatURL: PropTypes.string,
    })
  ),
};
