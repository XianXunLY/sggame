import Vue from "vue";
//引入vue-router
import VueRouter from "vue-router";

//引入单文件组件
import Community from "../pages/Community.vue";
import Cart from "../pages/Cart.vue";
import User from "../pages/user/User.vue";
import Note from "../pages/note/Note.vue";
import Group from "../pages/group/Group.vue";
import Home from "../pages/Home.vue";
import Headlines from "../pages/Headlines.vue";
import Product from "../pages/Product.vue";
import Title from "../pages/Headlines/Title.vue";
import Login from '../pages/Login';
import Reg from '../pages/Reg';
import MyPerson from '../pages/MyPerson';
import Info from '../pages/Info';

// 拓展路由
Vue.use(VueRouter);

// 实例化路由
let router = new VueRouter({
	//参数
	routes: [{
			path: "/", //重定向：当浏览器url地址为/,自动跳转到/home
			redirect: "/home"
		},
		{
			name: "Home",
			path: "/home",
			component: Home
		},
		{
			name: "Headlines",
			path: "/headlines",
			component: Headlines
		},
		{
			name: "Product",
			path: "/product/:product_id",
			component: Product
		},
		{
			name: "Title",
			path: "/title/:id",
			component: Title
		},
		{
			name: "Community",
			path: "/community",
			component: Community
		},
		{
			name: "Cart",
			path: "/cart",
			component: Cart,
			meta: { requiresAuth: true },
			beforeEnter: (to, from, next) => {
				// ...
				next()
			}
		},
		{
			name: "User",
			path: "/user",
			component: User
		},
		{
			name: "Note",
			path: "/note",
			component: Note
		},
		{
			name: "Group",
			path: "/group",
			component: Group
		},
		{
			name: 'Login',
			path: '/login',
			component: Login
		},
		{
			name: 'Reg',
			path: '/reg',
			component: Reg
		},
		{
			name: 'MyPerson',
			path: '/myperson',
			component: MyPerson,
			meta: { requiresAuth: true }
		},
		{
			name: 'Info',
			path: '/info',
			component: Info
		}
	]
});

//路由拦截
router.beforeEach((to,from,next)=>{
	//to要去到的路由
	//form本来的路由
    // console.log('beforeEach',to)
		//判断需要登录的模块
    if(to.meta.requiresAuth){
        // 需要登录的模块，判断是否已登录
        let username = localStorage.getItem('username');
        if(username){
            next();
        }else{
            // console.log('from:',to.fullPath)
            // 重定向到登录页面
            next({
                path:'/login'
            })
        }
    }else{
        next();
    }
});

//暴露router
export default router;
