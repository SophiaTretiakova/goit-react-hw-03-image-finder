// import propTypes from 'prop-types';

export const ImageGalleryItem = ({ image }) => {
  return (
    <li className="gallery-item">
      <img
        src={image.webformatURL}
        // large={image.largeImageURL}
        alt={image.tags}
      />
    </li>
  );
};

// ImageGalleryItem.propTypes = {
//   images: propTypes.arrayOf(
//     propTypes.shape({
//       searchTitle: propTypes.string,
//       url: propTypes.string,
//     })
//   ),
// };
