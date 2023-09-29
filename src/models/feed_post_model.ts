import type { IFileModel } from './file_model'
import type { IInteractionPreview } from './interaction_preview_model'
import type { IIsInteracted } from './is_interacted_model'

export interface IFeedPost {
  id: string
  user: {
    id: string
    fullName: string
    userName: string
    profileImage: string
    gender: number
  }
  createdAt: string
  isFollowing: boolean
  description: string
  files: Array<IFileModel>
  community: Object | null
  event: Object | null
  interactionPreviews: Array<IInteractionPreview>
  isInteracted: IIsInteracted | null
  isSaved: boolean
  commentCount: number
  interactionCount: number
}
