export interface Place {
    id?: number | null
    latitude: number
    longitude: number
    name: string
    description: string
    address: string
    visitedDate?: string
    category?: string
    image?: File | null
    // images?: string[]
  }

  export interface PlaceCreateRequest {
    storyId: number
    name: string
    description: string
    category: string
    latitude: number
    longitude: number
    address: string
    visitedDate: string 
    image?: string[]
  }

  export interface PlaceDetailResponse {
    id: number
    storyId: number
    name: string
    description?: string
    imageUrl?: string
    category: string
    latitude?: number
    longitude?: number
    address: string
    visitedDate: string
    createdAt: string
    updatedAt: string
  }