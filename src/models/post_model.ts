import type { IFileModel } from './file_model'
import type { IInteractionPreview } from './interaction_preview_model'
import type { IIsInteracted } from './is_interacted_model'

export interface IPostModel {
  id: string
  user: {
    id: string
    fullName: string
    userName: string
    profileImage: string | null
    gender: number
  }
  communityTitle: string | null
  description: string
  createdAt: string
  isInteracted: IIsInteracted | null
  isUserFollowing: boolean
  interactionCount: number
  interactionPreviews: Array<IInteractionPreview>
  files: Array<IFileModel>
  commentCount: number
  isSaved: boolean
  comments: Array<any>
}
