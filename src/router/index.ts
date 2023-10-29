import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import {
  createRouter,
  createWebHashHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'

const routes = [
  // {
  //   path: "/",
  //   name: "login",
  //   component: () => import("@/views/LoginView/LoginView.vue"),
  // },
  {
    path: '/',
    name: 'auth',
    component: () => import('@/views/AuthView/AuthView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/HomeView/HomeView.vue')
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
    // children: [
    //   {
    //     path: '',
    //     name: 'community-details',
    //     component: () => import('@/components/common/community/CommunityAbout.vue')
    //   },
    //   {
    //     path: 'posts',
    //     name: 'community-posts',
    //     component: () => import('@/components/common/community/CommunityPosts.vue')
    //   },
    //   {
    //     path: 'participiants',
    //     name: 'community-participiants',
    //     component: () => import('@/components/common/community/CommunityParticipiants.vue')
    //   },
    //   {
    //     path: 'settings',
    //     name: 'community-settings',
    //     component: () => import('@/components/common/community/CommunitySettings.vue')
    //   }
    // ]
  },
  {
    path: '/event/:id',
    name: 'eventdetails',
    component: () => import('@/views/EventDetailsView/EventDetailsView.vue'),
    props: true
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
  {
    path: '/profile/:id',
    name: 'userprofile',
    component: () => import('@/views/UserProfileView/UserProfile.vue'),
    props: true
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/EventsView/EventsView.vue')
  },

  // {
  //   path: "/signup",
  //   name: "signup",
  //   component: () => import("@/views/SignUpView/SignUpView.vue"),
  // },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView/SearchView.vue')
  },
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
    path: '/createpost',
    name: 'createPost',
    component: () => import('@/views/CreatePostView/CreatePostView.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/ChatView/ChatVue.vue')
  },
  {
    path: '/forget-password',
    name: 'forgetpassword',
    component: () => import('@/views/ResetPasswordView/ResetPasswordView.vue')
  },
  //catch all 404
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/PageNotFound/NotFound.vue')
  },
  //Test
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/TestView/TestView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
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
