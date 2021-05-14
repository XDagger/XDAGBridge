import request from './request';


// const xdag = async (params) => {
//   const data = await request.post('/', params);
//   return data;
// };

const getStatus = async () => {
  const data = await request.get('/api/status');
  return data;
};

const search = async (params) => {
  const data = await request.get(`/api/block/${params}`);
  return data;
};
export default {
  // xdag
  getStatus,
  search,
};
