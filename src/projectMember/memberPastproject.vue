<template>
<div>
  <membermenu></membermenu>
   <div id="main-content" class="profilepage_1">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2><a href="javascript:void(0);"></a>Past Projects</h2>
                            <ul class="breadcrumb">
                              <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                              <li style="margin-top:5px;" class="breadcrumb-item active">Past Projects</li>

                            </ul>
                        </div>

                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="body">
                                <h5>Your Past Projects </h5>
                                <br><br>
                                <div class="row clearfix" v-if="projectreadytodeploy.length==0">
                                    <div class="col-sm-12">
                                        <div class="card" >
                                            <div class="body text-left pro-img">
                                                <img src="../assets/images/noproject.png" style="height:350px;margin-left:20%;">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-6 col-sm-12"  v-for="(item,id) in projectreadytodeploy" v-bind:key="id" >
                                        <div class="card border">
                                            <div class="body text-left pro-img">
                                                <img class="mx-auto d-block mb-3" src="../assets/images/projects/01.png"
                                                    alt="">
                                                <h6 class="project-title text-primary mb-3"><a
                                                        href="project-detail.html">{{item.projectName}}</a></h6>
                                                 <p>{{item.projectDescription}}</p>
                                                  <p><b>Deployment Date :-</b> <br><span style="color:blue;">{{item.projectEndDate | moment("Do MMMM YYYY")}}</span></p>
                                                  <button @click="onprojectdetails(item.projectId)" class="button button1" style="margin-left:50px;">Project Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
</div>
</template>

<script>
import project from '../services/project'
import emp from '../services/employee'
import employee from '../services/employee'
import moduleclass from '../services/module'
export default {
  data:function(){
    return{
      projectOngoing:[{}],
      projectIdle:[{}],
      projectreadytodeploy:[{}],
      clientName:'',
      cnt:0,
    }
  },
  created(){

    employee.getempbyid(localStorage.getItem('empId')).then(doc=>{
      this.clientName = doc.data[0].empFirstName + " " +  doc.data[0].empLastName
    })

    project.getprojectbyempid(localStorage.getItem('empId')).then(doc=>{
          for(let i=0;i<doc.data.length;i++){
            if(doc.data[i].projectStatus == "inprogress"){
               this.projectOngoing.push(doc.data[i]);
            }
            else if(doc.data[i].projectStatus == "Deployed"){
              this.projectreadytodeploy.push(doc.data[i]);
              this.cnt=this.projectreadytodeploy.length;
            }
            else if(doc.data[i].projectStatus == "idle"){
              this.projectIdle.push(doc.data[i]);
            }
         }
        this.projectreadytodeploy.sort(function(a, b) {
        var c = new Date(a.projectEndDate);
        var d = new Date(b.projectEndDate);
        return c-d;
});

    })

    this.projectreadytodeploy.splice(0,1);
    this.projectreadytodeploycal.splice(0,1);
  },
  methods:{
    onprojectdetails:function(id){
              this.$router.push({path:'/memberProjectdetails/' + id});
    },
  },


}
</script>

<style scoped>
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 3px 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 10px 1px 10px 30px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
}
.button1:hover {
    background-color: #4CAF50;
    color: white;
  }

</style>
