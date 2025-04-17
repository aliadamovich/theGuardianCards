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
export interface ArticleFields {
	thumbnail: string;
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
  fields: ArticleFields;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}