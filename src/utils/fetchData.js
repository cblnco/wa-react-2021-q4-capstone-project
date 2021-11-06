import axios from 'axios';

const fetchData = async url => {
  let response = null;

  try {
    const { data, status } = await axios(url);
    response = status !== 200 ? {} : data;
  } catch (err) {
    response = {};
  }

  return response;
};

export default fetchData;
