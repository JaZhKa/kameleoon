export interface ITest {
  siteName: string;
  id: string;
  name: string;
  type: string;
  status: string;
  siteId: number;
}

export interface ISite {
  id: string;
  url: string;
}

export interface IData {
  tests: ITest[];
  sites: ISite[];
}
