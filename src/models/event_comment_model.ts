export interface IEventComment {
  id: string
  interactionCount: number
  isInteracted: boolean
  message: string
  user: {
    fullName: string
    gender: number
    id: string
    profileImage: string
    userName: string
  }
}
