<template>
<div  class="theme-orange">
    <!--     <div class="page-loader-wrapper">
        <div class="loader">
            <div class="m-t-30"><img src="http://www.wrraptheme.com/templates/lucid/hr/html/assets/images/logo-icon.svg"
                    width="48" height="48" alt="Lucid">
            </div>
            <p>Please wait...</p>
        </div>
       </div>
 -->
     <div id="wrapper">
        <nav class="navbar navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-btn">
                    <button type="button" class="btn-toggle-offcanvas"><i class="lnr lnr-menu fa fa-bars"></i></button>
                </div>

               <div class="navbar-brand">
                    <router-link to="/memberdashboard"><img style="height:40px; width:70px;" src="../assets/images/logo.png" alt="Lucid Logo"
                            class="img-responsive logo"></router-link>
                </div>

                <div class="navbar-right">

                    <div id="navbar-menu">
                        <ul class="nav navbar-nav">
                            <li class="dropdown">
                                <a href="javascript:void(0);" class="dropdown-toggle icon-menu" data-toggle="dropdown">
                                    <i class="icon-bell"></i>
                                    <span class="notification-dot"></span>
                                </a>
                                <ul class="dropdown-menu notifications animated shake">
                                    <li class="header"><strong>You have {{announcementArr.length}} today's Notifications</strong></li>


                                   <li v-for="(item,id) in announcementArr" v-bind:key="id">
                                        <a href="javascript:void(0);">
                                            <div class="media">
                                                <div class="media-left">
                                                    <i class="icon-info text-warning"></i>
                                                </div>
                                                <div class="media-body">
                                                    <p class="text" style="color:white;">{{item.announcementTitle}}</p>
                                                    <p class="text">{{item.announcementMessage}}</p>
                                                    <span class="timestamp">{{item.announcementTime | moment("HH:mm:ss")}}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="footer"><router-link to="/memberannouncement/"><a href="javascript:void(0);" class="more">See all
                                            notifications</a></router-link></li>

                                </ul>
                            </li>
                            <li><span class="icon-menu"><router-link to="/memberCalender"><i class="icon-calendar"></i></router-link></span></li>
                            <li><router-link to="/" class="icon-menu"><i @click="onlogout" class="icon-login"></i></router-link></li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav>



        <div id="left-sidebar" class="sidebar">
            <div class="sidebar-scroll">
                <div class="user-account">
                    <router-link to="/memberProfile"><img style="height:70px;width:60px;" v-bind:src="'http://localhost:3000/images/Employees/' + profilearr[0].empProfile" class="rounded-circle user-photo" alt="User Profile Picture"></router-link>
                    <div class="dropdown">
                        <br>
                        <span>Welcome,</span><br>
                        <strong>{{profilearr[0].empFirstName}}&nbsp;{{profilearr[0].empLastName}}</strong>
                    </div>


                    <hr>

                </div>

                <!-- Nav tabs -->
                <ul class="nav nav-tabs">
                    <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#project_menu">Menu</a></li>
                </ul>

                <!-- Tab panes -->

                <div class="tab-content p-l-0 p-r-0">

                    <div class="tab-pane animated fadeIn active" id="project_menu">
                        <nav class="sidebar-nav">
                            <ul class="main-menu metismenu ">
                                <li><router-link to="/memberdashboard"><i class="icon-speedometer"></i><span
                                            class="active">Dashboard</span></router-link>
                                </li>
                                 <li>
                                    <a @click="fp=!fp" class="has-arrow"><i
                                            class="fa fa-user" style="font-size:22px;"></i><span style="cursor:pointer;" >Profile</span></a>
                                    <ul>
                                        <li v-if="fp"><router-link to="/memberProfile">View Profile</router-link></li>
                                    </ul>
                                </li>
                                <li>
                                    <a @click="f=!f" class="has-arrow"><i
                                            class="icon-list"></i><span style="cursor:pointer;">Project</span></a>
                                    <ul>
                                        <li v-if="f"><router-link to="/memberprojectview" style="cursor:pointer;">View Projects</router-link></li>
                                    </ul>
                                </li>
                                <li>
                                    <router-link to="/memberannouncement">
                                        <i class="icon-bell"></i>
                                        <span class="active" style="margin-left:-5px;cursor:pointer;">Announcements</span>
                                    </router-link>
                                </li>
                                <li><router-link to="/leaderdueproject"><i class="icon-list"></i>Due Project submission</router-link></li>
                                <li><router-link to="/memberCalender"><i class="icon-calendar"></i>Calender</router-link></li>
                                <!-- <li><router-link to="/memberissue"><i class="icon-screen-tablet"></i>Issues</router-link></li> -->

                                 <li><router-link to="/memberPastproject"><i class="icon-list"></i>Past Projects</router-link></li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import announcement from '../services/Announcement'
import emp from '../services/employee'
export default {
    data:function(){
      return{
        emailId:'',
        announcementArr:[{}],
        profilearr:[{}],
        count:0,
        f:false,
        f1:false,
        fp:false
      }
    },
    created(){
      this.emailId = localStorage.getItem('empId');
      var date = new Date();
       announcement.getAllannouncement().then(doc=>{
          for(let i=doc.data.length-1;i>=0;i--){
              var dat = new Date(doc.data[i].announcementTime);
              if(date.getDate() == dat.getDate() && date.getMonth() == dat.getMonth() && date.getFullYear() == dat.getFullYear()){
                    this.announcementArr.push(doc.data[i]);
              }
              else{
                if(this.count==0){
                    break;
                }
              }
              this.count++;
        }
       })
       this.announcementArr.splice(0,1);


       emp.getempbyid(localStorage.getItem('empId')).then(doc=>{
        this.profilearr = doc.data;
        console.log(this.profilearr);
        })
    },
    methods:{
        onlogout:function(){
          localStorage.setItem('empId','');
          console.log("hello"+""+localStorage.getItem('empId'));
      }
    }
}
</script>
