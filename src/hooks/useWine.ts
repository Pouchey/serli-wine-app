import axios from 'axios';
import { WineResponseData } from '../types';

export default () => {
  const getWine = async (id: number) => {
    try {
      const res = await axios.get<WineResponseData>(`/api/wines/${id}`);
      return res.data;
    } catch (err) {
      // return alert('Une erreur est survenue');
    }
  };

  const getImage = async (id: number) => {
    try {
      const res = await axios
        .get<File>(`/api/wines/${id}/image`, {
          responseType: 'blob',
        })
        .then((res) => {
          return URL.createObjectURL(res.data);
        });

      return res;
    } catch (err) {
      // return alert('Une erreur est survenue');
    }
  };

  const getWines = async (imageIds: number[]) => {
    const wines = await Promise.all(
      imageIds.map(async (id: number) => {
        const wine = await getWine(Number(id));
        const image = await getImage(Number(id));
        return {
          wine,
          image,
        };
      })
    );
    return wines;
  };

  return {
    getWine,
    getImage,
    getWines,
  };
};
