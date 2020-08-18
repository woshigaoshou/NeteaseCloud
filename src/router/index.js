import Vue from 'vue'
import VueRouter from 'vue-router'
import { getPlaylistDetail } from '../network/home';

const Home = () => import('@/views/Home/Home');
const Login = () => import('@/views/Login/Login');
const Register = () => import('@/views/Register/Register');
const Profile = () => import('@/views/Profile/Profile');
const Rank = () => import('@/views/Rank/Rank');
const Singer = () => import('@/views/Singer/Singer');
const Recommend = () => import('@/views/Recommend/Recommend');
const PlaylistDetail = () => import('@/views/PlaylistDetail/PlaylistDetail');
const SingerPlaylist = () => import('@/views/SingerPlaylist/SingerPlaylist');
const RecentPlay = () => import('@/views/RecentPlay/RecentPlay');
const MusicDetail = () => import('@/views/MusicDetail/MusicDetail');
const Search = () => import('@/views/Search/Search');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    component: Home,
    children: [{
      path: '/',
      redirect: '/Home/Recommend'
    },
    {
      path: 'Recommend',
      component: Recommend
    },
    {
      path: 'Profile',
      component: Profile
    },
    {
      path: 'Rank',
      component: Rank
    },
    {
      path: 'Singer',
      component: Singer
    }]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  // {
  //   path: '/playlistDetail/:id',   //动态路由方法，用params传递参数
  //   component: PlaylistDetail
  // },
  {
    path: '/playlistDetail',   //query传递方式
    component: PlaylistDetail
  },
  {
    path: '/singerPlaylist',
    component: SingerPlaylist
  },
  {
    path: '/recentPlay',
    component: RecentPlay
  },
  {
    path: '/musicDetail',
    component: MusicDetail
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
