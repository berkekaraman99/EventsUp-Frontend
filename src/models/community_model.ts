export interface ICommunity {
  id: string
  admin: {
    id: string
    fullName: string
    userName: string
    profileImage: string
    gender: number
  }
  title: string
  description: string
  location: string
  bannerImage: string | null
  coverImage: string | null
  isVisible: boolean
  isPublic: boolean
  isOwner: boolean
  isRestricted: boolean
  participiantsCount: number
  isParticipiant: boolean
}
