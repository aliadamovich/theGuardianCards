export type GuardianResponse<T extends 'list' | 'single'> = {
  response: {
    status: string;
    userTier: string;
    total: number;
  } & (T extends 'list' ? {
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    results: GuardianArticle[];
  } : {
    content: GuardianArticle;
  });
};

export type GuardianArticle = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId?: string;
  pillarName?: string;
	fields: {
    thumbnail?: string;
    trailText?: string;
    headline?: string;
    body?: string;
  };
}

export type SearchParams = {
	q?: string;
  page?: number;
  pageSize?: number;
  "show-fields"?: string;
}