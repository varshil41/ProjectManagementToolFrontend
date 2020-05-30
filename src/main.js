import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import dashboard from './projectManager/Dashboard.vue'
import login from './projectManager/login.vue'
import forgetpassword from './projectManager/forgetpassword.vue'
import forgetpassword1 from './projectManager/forgetpassword1.vue'
import addproject from './projectManager/Addproject.vue'
import projectdetails from './projectManager/projectDetails.vue'
import projectview from './projectManager/projectView.vue'
import addclient from './projectManager/Addclient.vue'
import employeeview from './projectManager/viewEmployee.vue'
import issues from './projectManager/issue.vue'
import menu1 from './projectManager/menu1.vue'
import viewclient from './projectManager/viewclient.vue'
import updateclient from './projectManager/updateclient.vue'
import empprojectdetails from './projectManager/employeeProjectDetails.vue'
import announcement from './projectManager/Announcement.vue'
import announcementview from './projectManager/Announcementview.vue'
import updateannouncement from './projectManager/updateannouncement.vue'
import profile from './projectManager/profile.vue'
import editprofile from './projectManager/Editprofile.vue'
import editpassword from './projectManager/Editpassword.vue'
import ApexCharts from 'vue-apexcharts'
import vuemoment from 'vue-moment'
import calender from './projectManager/calender.vue'
import projectEdit from './projectManager/projectEdit.vue'
import deployedprojectview from './projectManager/deployedprojectview.vue'



import memberDashboard from './projectMember/memberDashboard.vue'
import membermenu from './projectMember/membermenu.vue'
import memberprojectdetails from './projectMember/memberprojectdetails.vue'
import memberprojectview from './projectMember/memberprojectview.vue'
import memberTeam from './projectMember/memberTeam.vue'
import memberIssue from './projectMember/memberIssues.vue'

import memberIssueChat from './projectMember/memberIssueChat.vue'
import memberTaskboard from './projectMember/memberTaskboard.vue'
import membermodule from './projectMember/memberModules.vue'
import leadermoduleadd from './projectMember/leaderModuleAdd.vue'
import memberProfile from './projectMember/memberProfile.vue'
import memberEditProfile from './projectMember/memberEditProfile.vue'
import memberEditPassword from './projectMember/memberEditPassword.vue'
import memberCalender from './projectMember/memberCalender.vue'
import memberannouncementview from './projectMember/memberannouncementview'
import membermoduleedit from './projectMember/memberModuleEdit.vue'
import memberPastproject from './projectMember/memberPastproject'
import leaderdueproject from './projectMember/leaderdueprojects.vue'
import notfoundpage from './notfoundpage.vue'


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import VueSimpleAlert from "vue-simple-alert";
import Datepicker from 'vuejs-datepicker';


Vue.use(VueFusionCharts, FusionCharts, Charts, FusionTheme)
Vue.use(VueRouter);
Vue.use(vuemoment);
Vue.use(ApexCharts);
Vue.use(VueMaterial)

Vue.use(VueSimpleAlert, { reverseButtons: true });

Vue.component('login',login);
Vue.component('forgetpassword',forgetpassword);
Vue.component('forgetpassword1',forgetpassword1);
Vue.component('dashboard',dashboard);
Vue.component('addproject',addproject);
Vue.component('projectdetails',projectdetails);
Vue.component('projectview',projectview);
Vue.component('addclient',addclient);
Vue.component('employeeview',employeeview);
Vue.component('issues',issues);
Vue.component('menu1',menu1);
Vue.component('viewclient',viewclient);
Vue.component('updateclient',updateclient);
Vue.component('empprojectdetails',empprojectdetails);
Vue.component('announcement','announcement');
Vue.component('announcementview',announcementview);
Vue.component('updateannouncement',updateannouncement);
Vue.component('profile',profile);
Vue.component('editprofile',editprofile);
Vue.component('editpassword',editpassword);
Vue.component('apexchart', ApexCharts)
Vue.component('calender',calender);
Vue.component('projectedit',projectEdit);
Vue.component('deployedprojectview',deployedprojectview);



Vue.component('memberDashboard',memberDashboard);
Vue.component('membermenu',membermenu);
Vue.component('memberprojectdetails',memberprojectdetails);
Vue.component('memberprojectview',memberprojectview);
Vue.component('memberteam',memberTeam);
Vue.component('memberissues',memberIssue);
Vue.component('memberissuechat',memberIssueChat);
Vue.component('membertaskboard',memberTaskboard);
Vue.component('membermodule',membermodule);
Vue.component('leadermoduleadd',leadermoduleadd);
Vue.component('memberannouncement',memberannouncementview);
Vue.component('membermoduleedit',membermoduleedit);
Vue.component('memberPastproject',memberPastproject);
Vue.component('leaderdueproject',leaderdueproject);
Vue.component('notfoundpage',notfoundpage);


const routes=[
  {path:'/',name:'login',component:login},
  {path:'/forgetpassword/:email',name:'forgetpassword',component:forgetpassword},
  {path:'/forgetpassword1/:email',name:'forgetpassword1',component:forgetpassword1},
  {path:'/dashboard/:email?',component:dashboard},
  {path:'/addproject',component:addproject},
  {path:'/projectdetails/:projectId',component:projectdetails},
  {path:'/projectview/:clientid?',component:projectview},
  {path:'/addclient',component:addclient},
  {path:'/employeeview',component:employeeview},
  {path:'/issues/:projectId?',component:issues},
  {path:'/viewclient',component:viewclient},
  {path:'/updateclient/:clientid',component:updateclient},
  {path:'/empprojectdetails/:empId',component:empprojectdetails},
  {path:'/announcement',component:announcement},
  {path:'/announcementview',component:announcementview},
  {path:'/updateannouncement/:id/:token',component:updateannouncement},
  {path:'/profile',component:profile},
  {path:'/editprofile',component:editprofile},
  {path:'/editpassword',component:editpassword},
  {path:'/calender',component:calender},
  {path:'/projectEdit/:projectId',component:projectEdit},
  {path:'/deployedprojectview',component:deployedprojectview},

  {path:'/memberDashboard/:email?',component:memberDashboard},
  {path:'/memberprojectdetails/:projectId',component:memberprojectdetails},
  {path:'/memberprojectview',component:memberprojectview},
  {path:'/memberteam/:projectId/:moduleId?',component:memberTeam},
  {path:'/memberissue/:moduleid/:projectid',component:memberIssue},
  {path:'/memberissuechat/:issueid',component:memberIssueChat},


  {path:'/membertaskboard/:moduleId/:projectId',component:memberTaskboard},
  {path:'/membermodule/:projectId',component:membermodule},
  {path:'/leadermoduleadd/:projectId',component:leadermoduleadd},
  {path:'/memberProfile',component:memberProfile},
  {path:'/memberEditProfile',component:memberEditProfile},
  {path:'/memberEditPassword',component:memberEditPassword},
  {path:'/memberCalender',component:memberCalender},
  {path:'/memberannouncement',component:memberannouncementview},
  {path:'/membermoduleedit/:moduleid',component:membermoduleedit},
  {path:'/memberPastproject',component:memberPastproject},
  {path:'/leaderdueproject',component:leaderdueproject},
  {path:'*',name:'notfound',component:notfoundpage},
]


const router=new VueRouter({
  routes:routes,
})

const openRoutes=['login','forgetpassword','forgetpassword1','notfound'];
router.beforeEach((to, from, next) => {
  if(openRoutes.includes(to.name)){
    next();
  }
  else if(localStorage.getItem('empId')!='')
  {
    next();
  }
  else
  {
    next('/');
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
  router:router,
})
