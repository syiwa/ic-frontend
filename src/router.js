import Vue from 'vue'
import Router from 'vue-router'
import store from '@/stores'

import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import User from './views/User.vue'

import UserList from './components/User/UserList.vue'
import UserForm from './components/User/UserForm.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: 'Home'
      }
    },{
      path: '/dashboard',
      component: Dashboard,
      meta: {
      	auth: true,
        title: 'Dashboard'
      }
    },{
      path: '/users',
      component: User,
      meta: {
        auth: true,
        roles: ['admin'],
      },
      children: [
        {
          path: '/',
          component: UserList,
          meta: {
            auth: true,
            roles: ['admin'],
            title: 'Users List'
          }
        },{
          path: 'add',
          component: UserForm,
          meta: {
            auth: true,
            roles: ['admin'],
            title: 'Add User'
          }
        },{
          path: ':id/edit',
          component: UserForm,
          meta: {
            auth: true,
            roles: ['admin'],
            title: 'Update User'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
	var passed = true;
  if(store.state.auth.authReadyForCheck){
    if(to.meta.auth && !store.state.auth.isAuth){
  		store.dispatch('notification/show', `You must login to access ${to.meta.title} page.`)
      passed = false;
  		next('/');
  	}

    if(to.meta.roles && to.meta.roles.length > 0){
      var rolesPassed = false;
      for(var i = 0; i < to.meta.roles.length; i++){
        if(store.getters['auth/hasRole'](to.meta.roles[i])){
          rolesPassed = true;
          break;
        }
      }
      if(!rolesPassed){
        store.dispatch('notification/show', `You are not authorized to see ${to.meta.title} page.`)
        passed = false;
        next('dashboard');
      }
    }
  }

  if(passed){
    next();
  }

});

export default router