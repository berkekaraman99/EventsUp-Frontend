export interface IComment {
  createdAt: string
  id: string
  interactionCounts: {
    likeCount: number
    dislikeCount: number
  }
  isEdited: boolean
  isInteracted: {
    like: boolean
    dislike: boolean
  }
  message: string
  replyCount: number
  user: {
    fullName: string
    gender: number
    id: string
    profileImage: string
    userName: string
  }
}
