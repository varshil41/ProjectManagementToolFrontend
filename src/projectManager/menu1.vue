<template>
 <div class="theme-orange">

    <div id="wrapper">

        <nav class="navbar navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-btn">
                    <button type="button" class="btn-toggle-offcanvas"><i class="lnr lnr-menu fa fa-bars"></i></button>
                </div>

                <div class="navbar-brand">
                    <router-link to="/dashboard"><img style="height:40px; width:70px;" src="../assets/images/logologin.png" alt="Lucid Logo"
                            class="img-responsive logo"></router-link>
                </div>

                <div class="navbar-right">

                    <div id="navbar-menu">
                        <ul class="nav navbar-nav">
                              <li><router-link to="/announcement"><button class="btn btn-warning">Announcement</button></router-link></li>
                              <li><span class="icon-menu"><router-link to="/calender"><i class="icon-calendar"></i></router-link></span></li>

                            <li><span class="icon-menu"><router-link to="/"><i @click="onlogout" class="icon-login"></i></router-link></span></li>
                      </ul>
                    </div>


                </div>
            </div>
        </nav>



        <div id="left-sidebar" class="sidebar">
            <div class="sidebar-scroll">
                <div class="user-account">
                    <router-link to="/profile"><img style="height:70px;width:60px;" v-bind:src="'http://localhost:3000/images/Employees/' + profilearr[0].empProfile" class="rounded-circle user-photo" alt="User Profile Picture"></router-link>
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
                                <li><router-link to="/dashboard"><i class="icon-speedometer"></i><span
                                            class="active">Dashboard</span></router-link>
                                </li>
                                <li><router-link to="/profile"><i
                                            class="fa fa-user" style="font-size:22px;"></i><span style="cursor:pointer;">Profile</span></router-link>
                                </li>
                                <li>
                                    <a @click="f=!f" class="has-arrow"><i
                                            class="icon-list"></i><span style="cursor:pointer;">Projects</span></a>
                                    <ul>
                                        <li v-if="f"><router-link to="/addproject">Add Projects</router-link></li>
                                        <li v-if="f"><router-link to="/projectview">View Projects</router-link></li>
                                        <li v-if="f"><router-link to="/deployedprojectview">All Deployed project</router-link></li>
                                    </ul>
                                </li>
                                <li>
                                    <a @click="f1=!f1" class="has-arrow"><i
                                            class="icon-user"></i><span style="cursor:pointer;">Clients</span></a>
                                    <ul>
                                        <li v-if="f1"><router-link to="/addclient">Add Client</router-link></li>
                                        <li v-if="f1"><router-link to="/viewclient">View Client</router-link></li>
                                        <!-- <li><a href="#">View Clients List</a></li> -->
                                    </ul>
                                </li>

                                <li><a @click="f2=!f2"  class="has-arrow"><i
                                            class="icon-users"></i><span style="cursor:pointer;">Employees</span></a>
                                    <ul>
                                        <li v-if="f2"><router-link to="/employeeview">View Employee</router-link></li>
                                    </ul>
                                </li>
                                <!-- <li><a href="#!"><i class="icon-tag"></i>Taskboard</a></li> -->
                               <li><router-link to="/issues"><i class="icon-screen-tablet"></i><span
                                            class="active">Issue</span></router-link>
                                </li>
                                <li><router-link to="/calender"><i class="icon-calendar"></i><span
                                            class="active">Calender</span></router-link>
                                </li>

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
import emp from '../services/employee'
export default {
  data:function(){
    return{
      profilearr:[{}],
      f:false,
      fp:false,
      f1:false,
      f2:false
    }
  },
  created(){
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
