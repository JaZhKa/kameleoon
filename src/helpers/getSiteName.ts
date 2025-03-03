import { ISite } from '../types/dataTypes';

const removeProtocol = (url: string) => {
  return url.replace(/^https?:\/\/?(www\.)?/, '');
};

const getSiteName = (data: ISite[], id: number) => {
  const site = data.find((site) => Number(site.id) === id);
  return site ? removeProtocol(site.url) : '';
};

export default getSiteName;
