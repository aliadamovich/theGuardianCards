export type GuardianResponse = {
	response: {
		status: string
		userTier: string
		total: number
		startIndex: number
		pageSize: number
		currentPage: number
		pages: number
		results: GuardianArticle[]
	}
}

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
	fields?: {
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