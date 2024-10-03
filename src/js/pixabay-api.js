import axios from "axios";


export async function fetchImages(searchString, pageToLoad = 1)
{
    const API_URL = 'https://pixabay.com/api/';
    const API_KEY = '46129097-db92c21a9f578a732dd89224e';
    const IMAGES_QTY = 15; 
    
    const requestParams = {
      key: API_KEY,
      q: encodeURIComponent(searchString),
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: IMAGES_QTY,
      page: pageToLoad
    };
    const encodedParams = new URLSearchParams(requestParams);
 
    const response = await axios.get([API_URL, encodedParams].join('?'));

    return response['data'];
}