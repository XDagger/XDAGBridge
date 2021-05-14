import request from './request';

const balance = async (params) => {
  const data = await request.get(`/api/balance/${params}`);
  return data;
};
export default {
  balance,
};
