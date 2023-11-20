import axios from 'axios'
const API_KEY = '39116189-e82791a954216ad4c4e04f473';
axios.defaults.baseURL = 'https://pixabay.com/api/'; 


const getImages = async (query, page) => {
  const { data } = await axios(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};

export default getImages;