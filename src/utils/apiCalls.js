import axios from "axios";
import API_KEY from "./constans";

const fetchData = async (keyword, page) => {
  const { data } = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${keyword}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`);
  return data.hits;
};

export default fetchData;
// const getImages = (keyWord, page) => {
//   return axios
//     .get(
//       `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//     )
//     .then((response) => response.data);
// };

// export default getImages;

// const fetchInitialView = () => {
//   fetch(`https://pixabay.com/api/?key=23580980-4f75151f85975025bb6074227&q=${this.state.keyword}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.state.page}&per_page=12`)
//   .then(data => data.json())
//   .then(keyword => {
//     this.setState({images: keyword.hits})
//     console.log(keyword);
//     console.log(`Number of images array: `, keyword.hits);
//     console.log(`Display images state:`, this.state.images);
//     console.log(`Display page state: `, this.state.page)
//   })
//   .catch(error => console.log(error))
// }

// export default fetchData;