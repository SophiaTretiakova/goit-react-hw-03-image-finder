import axios from 'axios';

const KEY = '38365619-1621c1d79dbc4654c84d21e00';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchArticlesWithQuery = async searchQuery => {
  const response = axios.get(
    `/?q=${searchQuery}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};
