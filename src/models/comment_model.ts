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
    firstName: string
    gender: number
    id: string
    lastName: string
    profileImage: string
    userName: string
  }
}
