export type WineResponseData = {
  ID: number;
  ANNEE: string;
  APPELLATION: string;
  NOM: string;
  PAYS: string;
  REGION: string;
  PRODUCTEUR: string;
};

export type ImageResponseData = File;

export type ResolveResponseData = {
  imageIds: number[];
};

export type Wine = {
  wine?: WineResponseData;
  image?: string;
};
