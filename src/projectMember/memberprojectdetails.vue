<template>
<div>
     <membermenu></membermenu>
       <div id="main-content" class="profilepage_1">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2><a href="javascript:void(0);"></a> Project Details</h2>
                            <ul class="breadcrumb">
                                <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                                </li>
                                <li style="margin-top:5px;" class="breadcrumb-item">Project</li>
                                <li style="margin-top:5px;" class="breadcrumb-item active">View Projects</li>
                                <li style="margin-top:5px;" class="breadcrumb-item active">Project Details</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="card">

                    <div class="row clearfix">

                    <div v-bind:class="col">

                        <div class="card border mt-3 ml-3">

                            <div class="body">
                                <h4 style="text-transform: uppercase;">{{projectarr.projectName}}</h4>
                                <h6 style="text-transform: uppercase;color:lightblue;">{{projectarr.projectType}}</h6>
                                <br>
                                <p><b>Project details along with the document uploaded.. </b><br>
                                {{projectarr.projectDescription}}
                                </p>

                                <label v-if="projectarr.projectStatus=='cancelled'">
                                   Project File :-
                                    <br>
                                    <a href="javascript:void(0)" @click="flag=true">{{projectarr.projectFile}}</a>
                                    <embed style="width:0%;height:0%;" v-if="flag" v-bind:src="'http://localhost:3000/images/projectFile/' + projectarr.projectFile">
                                </label>

                                <div v-if="projectarr.projectStatus!='cancelled'" class="progress-container progress-info m-b-25">
                                    <span class="progress-badge">Project Status</span>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" aria-valuenow="60"
                                            aria-valuemin="0" aria-valuemax="100" v-bind:style="'width:' + ((sum*100)/count) + '%;'">
                                            <span class="progress-value">{{((sum * 100)/count).toFixed(2)}}%</span>
                                        </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="projectarr.projectStatus!='cancelled'" class="card border ml-3">
                            <div class="body">
                                <ul class=" list-unstyled basic-list">
                                    <li>Started:<span class="badge-purple badge">{{projectarr.projectStartDate | moment("Do MMMM YYYY")}}</span></li>
                                    <li v-if="projectarr.projectStatus=='Ready to deploy'">EndDate:<span class="badge-dang badge ">{{projectarr.projectEndDate | moment("Do MMMM YYYY")}}</span></li>
                                    <li>Deadline:<span class="badge-dang badge ">{{projectarr.projectDeadline | moment("Do MMMM YYYY")}}</span></li>
                                    <li>Status<span class="badge-info badge">{{projectarr.projectStatus}}</span></li>
                                    <li v-if="projectarr.projectStatus!='cancelled'">Team Size:<span class="badge-danger badge">{{teamsize}}</span></li>

                                </ul>
                            </div>
                        </div>

                        <div style="background-color:#ffcccb;" v-if="projectarr.projectStatus=='cancelled'" class="card border ml-3">
                            <div class="body">
                                <div>
                                    <p style="margin-left:35%;font-size:20px;"><b>This Project has been cancelled</b></p>
                                </div>
                            </div>
                        </div>


                        <!-- submit project -->
                        <div v-if="btnflag && projectarr.projectStatus!='Deployed' && projectarr.projectStatus!='cancelled' " style="margin-left:4%;padding:0px;" class="card border col-sm-12">
                            <div class="body" style="padding:8px;">
                                <button @click="ondeployeproject()"  v-if="projectarr.projectStatus=='Ready to deploy'" style="width:100%;border-radius:5px;" class="btn btn-success rounded-3 waves-effect waves-light"><span style="font-size:15px;text-transform:uppercase;"><i style="font-size:20px;" class="fa fa-check-circle"></i>&nbsp;&nbsp;Deploye project</span></button>
                                <div v-if="projectarr.projectStatus!='Ready to deploy'"><button title="Project is still in Development phase" disabled v-if="projectarr.projectStatus!='Ready to deploy'" style="width:100%;border-radius:5px;" class="btn btn-success rounded-3 waves-effect waves-light"><span style="font-size:15px;text-transform:uppercase;">Deploye project</span></button></div>
                                <!-- <button @click="onresumeproject()"  v-if="projectarr.projectStatus=='done'" style="width:100%;border-radius:5px;" class="btn btn-danger rounded-3 waves-effect waves-light"><span style="font-size:15px;text-transform:uppercase;" class="btn-icon"><i class="icon-refresh"></i>&nbsp;Resume project access</span></button> -->
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-8 col-md-12" v-if="projectarr.projectStatus!='cancelled'">
                        <div class="card border mt-3 ">
                            <div class="body">
                                <div class="post-toolbar-b">
                                    <router-link v-bind:to="'/membermodule/' + projectId"><button type="button"
                                            class="btn btn-outline-success">View Modules <i
                                                class="icon-eye"></i></button></router-link>
                                    &nbsp;
                                    &nbsp;
                                    <router-link v-bind:to="'/leadermoduleadd/' + projectId"><button v-if="btnflag && projectarr.projectStatus!='cancelled' && projectarr.projectStatus!='Deployed'" type="button" class="btn btn-outline-dark">Add
                                            Module <i class="fa fa-plus-square"></i></button></router-link>

                                   <button v-if="btnflag && projectarr.projectStatus=='Deployed'" disabled type="button" class="btn btn-outline-dark">Add
                                            Module <i class="fa fa-plus-square"></i></button>
                                    &nbsp;
                                    &nbsp;
                                    <router-link v-bind:to="'/memberteam/' + projectId"  class="btn btn-sm btn-outline-success">Team Details</router-link>

                                </div>
                            </div>
                        </div>

                      <div class="card">
                            <div class="body">
                                     <h6>Created By :- {{leaderName}}</h6>
                                     <div class="timeline-item danger">
                                    <h5>Project Modules</h5>
                                    <br>
                                    <td v-if="modulearr.length==0" style="text-align:center;font-size:15px;color:red;font-family: serif;"><i class="fa fa-bell-slash" aria-hidden="true"></i> No Modules Created ...</td>

                                    <!-- <span>By: <a href="javascript:void(0);" title="Fidel Tonn">Fidel Tonn</a></span> -->
                                    <div class="msg">
                                        <ul class="list-unstyled">
                                            <li class="mb-2" v-for="(item,id) in modulearr" v-bind:key="id">
                                                <span>{{item.moduleName}}</span>
                                                <div class="progress progress-xs">
                                                    <div class="progress-bar progress-bar-danger" role="progressbar"
                                                        aria-valuenow="17" aria-valuemin="0" aria-valuemax="100"
                                                        v-bind:style="'width:' + modulecal[id] + '%;' ">
                                                    </div>
                                                </div>

                                            </li>
                                           </ul>
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
import team from '../services/Team'
import project from '../services/project'
import moduleclass from '../services/module';
import submoduleclass from '../services/submodule';
import emp from '../services/employee';
export default {
  data:function(){
    return{
      projectId:'',
      empId:'',
      teamsize:'',
      modulecal:[],
      modulearr:[{}],
      flag:false,
      btnflag:false,
      col:'',
      projectarr:{},
      projectCal:0,
      sum:0,
      leaderName:'',
      count:0,
      updateEndDateArr:{
            projectEndDate:'',
            projectId:''
        }
    }
  },
  mounted(){
    this.projectId = this.$route.params.projectId;
    var date=new Date();
    var month=date.getMonth()+1;
    this.updateEndDateArr.projectEndDate = date.getFullYear() + "-" + month + "-" + date.getDate();
    this.updateEndDateArr.projectId=this.$route.params.projectId;
    moduleclass.getModuleByProjectId(this.projectId).then(doc=>{
            this.modulearr = doc.data;
            this.count = this.modulearr.length * 100;
            for(let i=0;i<this.modulearr.length;i++){
              submoduleclass.getSubModuleByModuleId(this.modulearr[i].moduleId).then(doc=>{
                this.modulecal.push(doc.data[0].result);
                this.sum = this.sum + doc.data[0].result;
              })
            }
    })

    this.empId = localStorage.getItem('empId');
    team.getteamByprojectID(this.projectId).then(doc=>{
        this.teamsize = doc.data[0].teamSize;
        emp.getempbyid(doc.data[0].leaderId).then(doc1=>{
            this.leaderName = doc1.data[0].empFirstName + " " + doc1.data[0].empLastName;
        })
        localStorage.setItem('leaderId',JSON.stringify(doc.data[0].leaderId));
        if(this.empId == doc.data[0].leaderId){
            this.btnflag = true;
        }
    })
    project.getprojectByID(this.projectId).then(doc=>{
        this.projectarr = doc.data[0];
        if(this.projectarr.projectStatus == 'cancelled'){
          this.col = "col-lg-11 col-md-11"
        }
        else{
          this.col = "col-lg-4 col-md-12"
        }
    })
  },
  methods:{
      ondeployeproject:function(){

        this.$confirm("Are you sure want to Deploye this project?").then(()=>{
           project.updateprojectstatus(this.$route.params.projectId,"Deployed").then(doc1=>{})
                    this.$fire({
                    title: "Project Successfully Deployed",
                    type: "success",
                    timer: 3000
                    }).then(r => {
                    console.log(r.value);
                    });


                    project.updateEndDate(this.updateEndDateArr).then(doc=>{})
                    for(let i=0;i<this.modulearr.length;i++){
                      moduleclass.updatestatus("Deployed",this.modulearr[i].moduleId).then(doc2=>{})
                    }
                    this.$router.push({path:'/memberprojectview/'});
        })
      },
      onresumeproject:function(){

        this.$confirm("Are you sure want to resume this project?").then(()=>{
            project.updateprojectstatus(this.$route.params.projectId,"Ready to deploy").then(doc1=>{})

            this.$fire({
                    title: "Access allowed",
                    type: "success",
                    timer: 3000
                    }).then(r => {
                    console.log(r.value);
                    });

            this.$router.push({path:'/memberprojectview/'});
        })



      }
  }
}
</script>

<style scoped>
button[disabled=disabled] {
  pointer-events: none;
  opacity: 0.4;
}
</style>
