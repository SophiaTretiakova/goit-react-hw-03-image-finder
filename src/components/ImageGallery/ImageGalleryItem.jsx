// import propTypes from 'prop-types';

export const ImageGalleryItem = ({ searchTitle, url }) => {
  return (
    <li className="gallery-item">
      <img src={url} alt={searchTitle} />
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
