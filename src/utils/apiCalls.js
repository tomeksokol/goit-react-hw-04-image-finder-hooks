import axios from "axios";

const API_KEY = "23580980-4f75151f85975025bb6074227";

const getImages = (keyWord, page) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data);
};

export default getImages;
