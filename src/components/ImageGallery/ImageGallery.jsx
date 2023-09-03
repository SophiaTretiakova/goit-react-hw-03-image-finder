import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ images }) => {
  return (
    <ol className="gallery">
      {images.length > 0 &&
        images.map(image => {
          return <ImageGalleryItem key={nanoid()} image={image} />;
        })}
      {/* <div>
        <button onClick={handleLoadMore}>Load more</button>
      </div> */}
    </ol>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      searchQuery: PropTypes.string,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
};
