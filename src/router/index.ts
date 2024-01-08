import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthView/AuthView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView/HomeView.vue')
    // alias: '/'
  },
  {
    path: '/forget-password',
    name: 'forgetpassword',
    component: () => import('@/views/ResetPasswordView/ResetPasswordView.vue')
  },
  {
    path: '/communities',
    name: 'communities',
    component: () => import('@/views/CommunitiesView/CommunitiesView.vue')
  },
  {
    path: '/community/:id',
    name: 'communitydetails',
    component: () => import('@/views/CommunityDetailsView/CommunityDetailsView.vue'),
    props: true
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/EventsView/EventsView.vue')
  },
  {
    path: '/event/:id',
    name: 'eventdetails',
    component: () => import('@/views/EventDetailsView/EventDetailsView.vue'),
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView/ProfileView.vue')
  },
  {
    path: '/profile-settings',
    name: 'profileSettings',
    component: () => import('@/views/SettingsView/SettingsView.vue')
  },
  {
    path: '/profile/:id',
    name: 'userprofile',
    component: () => import('@/views/UserProfileView/UserProfile.vue'),
    props: true
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView/SearchView.vue')
  },
  {
    path: '/post/:id',
    name: 'postcomments',
    component: () => import('@/views/PostCommentsView/PostCommentsView.vue'),
    props: true
  },
  {
    path: '/post/:postid/comment/:commentid',
    name: 'CommentReplies',
    component: () => import('@/views/CommentRepliesView/CommentReplies.vue'),
    props: true
  },
  // CREATE PAGES
  {
    path: '/createcommunity',
    name: 'createCommunity',
    component: () => import('@/views/CreateCommunityView/CreateCommunityView.vue')
  },
  {
    path: '/create-event',
    name: 'createEvent',
    component: () => import('@/views/CreateEventView/CreateEvent.vue')
  },
  {
    path: '/createpost',
    name: 'createPost',
    component: () => import('@/views/CreatePostView/CreatePostView.vue')
  },
  {
    // CHAT PAGE
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/ChatView/ChatVue.vue')
  },
  {
    // TEST PAGE
    path: '/test',
    name: 'test',
    component: () => import('@/views/TestView/TestView.vue')
  },
  {
    // NOT FOUND CATCH ALL 404
    path: '/:notFound(.*)',
    name: 'notfound',
    component: () => import('@/views/PageNotFound/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  }
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore()
    const { _user: user } = storeToRefs(authStore)
    const authNotRequiredRoutes: string[] = ['auth', 'forgetpassword']

    if (user.value === null && !authNotRequiredRoutes.includes(to.name?.toString() ?? '')) {
      next({ name: 'auth' })
    } else if (user.value !== null && authNotRequiredRoutes.includes(to.name?.toString() ?? '')) {
      next({ name: 'home' })
    } else next()
  }
)

export default router
