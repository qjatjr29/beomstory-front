export interface Story {
  id: number
  title: string
  description?: string
  startDate: string
  endDate: string
  category: string
  createdAt: string
  updatedAt: string
}

export interface StoryDetailResponse {
  id: number
  title: string
  description?: string
  startDate: string
  endDate: string
  category: string
  createdAt: string
  updatedAt: string
}

export interface StorySummaryResponse {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  category: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface StoryUpdateRequest {
  title?: string
  description?: string
  startDate?: string
  endDate?: string
  category?: string
}

export interface StoryCreateRequest {
  title: string
  description: string
  startDate: string
  endDate: string
  category: string
}


