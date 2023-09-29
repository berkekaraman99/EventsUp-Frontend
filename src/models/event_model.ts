export interface IEventModel {
  attendeesCount: number
  commentCount: number
  comments: Array<any>
  description: string
  endDate: string
  id: string
  images: Array<string>
  isAttendeed: boolean
  isLimited: boolean
  isPaid: boolean
  location: string
  participiantLimit: number
  price: number
  startDate: string
  title: string
  user: {
    fullName: string
    gender: number
    id: string
    profileImage: string | null | undefined
    userName: string
  }
}
