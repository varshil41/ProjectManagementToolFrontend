<template>
  <div>
    <menu1></menu1>
        <div id="main-content" class="profilepage_1">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>Project Details</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard"><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item">Project Details</li>
                                <li class="breadcrumb-item active">{{projectarr.projectName}}</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="row clearfix">
                    <div v-bind:class="col">
                      <div class="card">
                            <div class="body">
                                <h4 style="text-transform: uppercase;">{{projectarr.projectName}}</h4>
                                <br>
                                <p><b>Project details along with the document uploaded.. </b>
                                  {{projectarr.projectDescription}}
                                </p>
                                <label>
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
                                <button v-if="issueflag" style="width:100%;" @click="onissue" class="btn btn-sm btn-outline-danger">View Issues</button>
                            </div>
                        </div>
                        <div class="card">
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
                        <div v-if="projectarr.projectStatus!='cancelled'" class="card">
                            <div class="header">
                                <h2>Team Members</h2>
                            </div>

                            <div class="body">
                                <div class="w_user">
                                  <h3 v-if="teamarr[0].leaderId==null">No leader</h3>
                                  <div v-if="teamarr[0].leaderId!=null">
                                  <img class="rounded-circle" style="height:70px;width:60px;" v-bind:src="'http://localhost:3000/images/Employees/' + leaderdetail.empProfile" alt="">
                                    <div class="wid-u-info">
                                        <h5>{{leaderdetail.empFirstName}}</h5>
                                        <span>{{leaderdetail.empEmailId}}</span>
                                        <p class="text-muted m-b-0">Team Leader
                                        </p>
                                     </div>
                                  </div>
                                   <hr>
                                </div>
                                <ul class="right_chat list-unstyled mb-0">
                                    <li class="online" v-for="(item,id) in teamarr" v-bind:key="id">
                                        <a href="javascript:void(0);">
                                            <div class="media">
                                                <img class="media-object " v-bind:src="'http://localhost:3000/images/Employees/' + item.empProfile" alt="">
                                                <div class="media-body">
                                                    <span class="name">{{item.empFirstName}}</span>
                                                    <span class="message">{{item.workAreaType}}</span>
                                                     <a v-if="projectarr.projectStatus!='Ready to deploy' && projectarr.projectStatus!='Deployed'" style="float:right;" @click="ondelete(item)" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-danger"
                                                        title="Edit" data-type="confirm"><i
                                                            class="icon-trash"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                </ul>
                       <p style="color:red;" v-if="!teamleaderflag">Please add Team Leader *</p>

                      <button @click="onaddmember" v-if="projectarr.projectStatus!='Ready to deploy' && projectarr.projectStatus!='Deployed' " style="text-align:center;" type="submit" class="btn btn-outline-secondary">
                       <a style="color:darkblue; text-decoration:none;" href="javascript:void(0);" data-toggle="modal" data-target="#addmember">Add New Member</a>
                      </button>
                      <button v-bind:disabled="teamleaderflag" @click="onaddteamleader" v-if="projectarr.projectStatus!='Ready to deploy' && projectarr.projectStatus!='Deployed'" style="text-align:center;" type="submit" class="btn btn-outline-secondary">
                       <a style="color:darkblue;text-decoration:none;" href="javascript:void(0);" data-toggle="modal" v-bind:data-target="addmember">Add Team Leader</a>
                      </button>
                            </div>

                        </div>


                    </div>
                    <div v-if="projectarr.projectStatus!='cancelled'" class="col-lg-8 col-md-12">
                        <div class="card">
                            <div class="header">
                                <h2>Project Announcements</h2>
                            </div>
                            <div class="body">
                                <div class="form-group" style="margin-top: -2em;">
                                    <input v-if="projectarr.projectStatus!='Deployed'" type="text" class="form-control no-resize"
                                        placeholder="Title..." v-model = "projectAnnouncementArr.projectAnnouncementTitle">

                                     <input disabled v-if="projectarr.projectStatus=='Deployed'" type="text" class="form-control no-resize"
                                        placeholder="Title..." v-model = "projectAnnouncementArr.projectAnnouncementTitle">
                                </div>

                                <div class="form-group" style="margin-top: 0em;">
                                    <textarea v-if="projectarr.projectStatus!='Deployed'" rows="3" class="form-control no-resize"
                                        placeholder="Type Message Here..." v-model = "projectAnnouncementArr.projectAnnouncementMessage"></textarea>

                                    <textarea disabled v-if="projectarr.projectStatus=='Deployed'" rows="3" class="form-control no-resize"
                                        placeholder="Type Message Here..." v-model = "projectAnnouncementArr.projectAnnouncementMessage"></textarea>
                                </div>
                                <!-- <p style="color:green;" v-if="sendflag">Send Announcement Successfully</p> -->

                                <div class="post-toolbar-b">
                                    <button v-if="projectarr.projectStatus!='Deployed'" v-bind:disabled="projectAnnouncementArr.projectAnnouncementMessage=='' || projectAnnouncementArr.projectAnnouncementTitle==''" class="btn btn-warning" @click="onaddanc">Make Announcement</button>
                                    <button disabled v-if="projectarr.projectStatus=='Deployed'" class="btn btn-warning" @click="onaddanc">Make Announcement</button>
                                    <button v-if="projectarr.projectStatus!='Deployed'" class="btn btn-warning" @click="onclear">Clear</button>
                                    <button disabled v-if="projectarr.projectStatus=='Deployed'" class="btn btn-warning" @click="onclear">Clear</button>
                                </div>
                            </div>
                        </div>


                        <div class="card">
                            <div class="body">
                                  <h6>By: <a href="javascript:void(0);">{{leaderdetail.empFirstName}} {{leaderdetail.empLastName}}</a></h6>
                                  <div class="timeline-item danger">
                                    <h5>Project Modules</h5>
                                    <br>
                                    <td v-if="modulearr.length==0" style="text-align:center;font-size:15px;color:red;font-family: serif;"> No Modules Created ...</td>
                                    <div v-else class="msg">
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
  <div class="modal fade" id="addmember" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
       <div class="modal-content">
                         <div  class="card">
                          <div class="body">
                           <div class="row clearfix">
                              <div class="col-md-12 col-sm-12">
                            <div class="form-group">
                              <select
                                class="form-control show-tick"
                                @change="onselectmembertype"
                                id="type"
                              >
                                <option value="0">Select MemberType</option>
                                <option
                                  v-bind:value="item.workAreaId"
                                  v-for="(item, id) in workareaArr"
                                  v-bind:key="id">{{item.workAreaType}}</option
                                >
                              </select>
                            </div>
                          </div>
                    <div class="col-md-12 col-sm-12">
                    <!-- <label>Type</label> -->
                    <div class="form-group">
                      <select
                        class="form-control show-tick"
                        id="teammemberid"
                        @change="onselectteammember"
                        >
                        <option v-if="lflag" value="0">Select TeamLeader</option>
                        <option v-if="!lflag" value="0">Select TeamMember</option>
                        <option
                          v-bind:value="item.empId"
                          v-for="(item, id) in emparr"
                          v-bind:key="id"
                          >{{ item.empFirstName }} {{ item.empMiddleName }}
                          {{ item.empLastName }}</option
                        >
                      </select>
                    </div>
                    </div>

                          <div class="col-md-4 col-sm-12">
                            <!-- <label>Type</label> -->
                            <div class="form-group">
                              <button @click="onaddteammember"
                                type="submit"
                                class="btn btn-primary"
                                v-bind:disabled="empid=='' || workareaid==0"
                                data-dismiss="modal"
                              >
                                Add
                              </button>
                              <button
                                @click="oncancel"
                                type="submit"
                                class="btn btn-primary"
                                data-dismiss="modal"
                              >
                                Cancel
                              </button>

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
import projectclass from '../services/project';
import teamclass from '../services/Team';
import projectAnnouncementclass from '../services/projectAnnouncement';
import moduleclass from '../services/module';
import submoduleclass from '../services/submodule';
import issueclass from '../services/issue';
import workarea from "../services/workarea";
import employee from "../services/employee";
import teammember from "../services/teammember";
export default
{
  data:function(){
    return{
      projectId:'',
      projectDescription:'',
      projectName:'',
      projectDomain:'',
      projectStartDate:'',
      projectEndDate:'',
      projectDeadline:'',
      totalCount:'',
      subCount:'',
      addmember:'',
      modulecal:[],
      teamleaderflag:true,
      projectStatus:'',
      projectarr:{},
      teamarr:[{}],
      teammemberArr:[{}],
      workareaArr:[{}],
      leaderdetail:{},
      modulearr:[{}],
      projectCal:0,
      issueflag:false,
      sendflag:false,
      flag:false,
      teamsize:'',
      delname:'Member',
      sum:0,
      col:'',
      lflag:false,
      addflag:false,
      emparr:[{}],
      memberflag:false,
      count:0,
      workareaid:'',
      empid:'',
      projectAnnouncementArr:{
        projectAnnouncementTitle:'',
        projectAnnouncementMessage:'',
        projectId:''
      }
    }
  },
  mounted(){

    this.projectId=this.$route.params.projectId;

    issueclass.gettotalprojectissueCOUNT(this.projectId).then(doc=>{
      if(doc.data[0].cnt>0){
        this.issueflag = true;
      }
    })

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

    projectclass.getprojectByID(this.projectId).then(doc=>{
        this.projectarr=doc.data[0];
        if(this.projectarr.projectStatus == 'cancelled'){
          this.col = "col-lg-12 col-md-12";
        }
        else{
          this.col = "col-lg-4 col-md-12"
        }
    })

    teamclass.getteamByprojectID(this.projectId).then(doc=>{
        for(let i=0;i<doc.data.length;i++)
        {

            if(doc.data[i].leaderId==doc.data[i].empId)
            {
                this.leaderdetail=doc.data[i];
            }
            else
            {
                this.teamarr=doc.data;
            }
        }
        this.teamsize = this.teamarr[0].teamSize;
        if(this.teamarr[0].leaderId == null){
          this.teamleaderflag = false;
          this.addmember = "#addmember";
        }

    })

  },
  methods:{
    onselectteammember:function(event){
      if(event.target.value == 0){
        this.empid = "";
      }
      else{
      this.empid = event.target.value;
      }
    },
    onselectmembertype: function(event) {
      this.workareaid = parseInt(event.target.value);
      if(this.workareaid != 0){
      employee.getempbyworktypeid(this.workareaid).then(result => {
        this.emparr = result.data;
        teammember.getteambyteamid(this.teamarr[0].teamId).then(doc1=>{
              for(let i=0;i<doc1.data.length;i++){
              for(let j=0;j<this.emparr.length;j++){
                if(this.emparr[j].empId == doc1.data[i].empId){
                  this.emparr.splice(j,1);
                }
              }
            }
        })
      });
      }
      else{
        employee.getallemp().then(doc => {
           this.emparr = doc.data;
           teammember.getteambyteamid(this.teamarr[0].teamId).then(doc1=>{
           for(let i=0;i<this.emparr.length;i++){
              for(let j=0;j<doc1.data.length;j++){
                if(this.emparr[i].empId == doc1.data[j].empId){
                  this.emparr.splice(i,1);
                }
              }
            }
        })
        });

      }
    },
    oncancel:function(){
      this.memberflag = false;
      this.lflag = false;
      this.empid='';
      this.workareaid=0;
    },
    onaddteammember:function(){
        teammember.addteamMember(this.teamarr[0].teamId,this.empid).then(doc=>{
            if(this.lflag == true){
              teamclass.updateleaderid({leaderId:this.empid,teamId:this.teamarr[0].teamId}).then(d=>{
                this.teamleaderflag = true;
                this.addmember = "";
              })
            }
            this.teamsize++;
            teamclass.updateteamsize({teamSize:this.teamsize,teamId:this.teamarr[0].teamId}).then(doc2=>{
              teamclass.getteamByprojectID(this.projectId).then(doc1=>{
              for(let i=0;i<doc1.data.length;i++)
              {
                if(doc1.data[i].leaderId==doc1.data[i].empId)
                {
                    this.leaderdetail=doc1.data[i];
                }
                else
                {
                    this.teamarr=doc1.data;
                }
              }
             })
           });
             this.empid='';
            this.workareaid=0;

          })
    },
    ondelete:function(item){
       if(item.leaderId == item.empId){
         this.delname = "Leader";
       }
       else{
         this.delname = "Member";
       }
       this.$confirm("Are you sure want remove selected " + this.delname + " ?").then(() => {
       teammember.deleteteammember(item.teamMemberId).then(doc=>{
            for(let i=0;i<this.teamarr.length;i++){
              if(this.teamarr[i].empId == item.empId){
                this.teamarr.splice(i,1);
                this.teamsize--;
                teamclass.updateteamsize({teamSize:this.teamsize,teamId:item.teamId}).then(doc1=>{
                   if(item.leaderId == item.empId){
                    this.teamleaderflag = false;
                    this.addmember = "#addmember";
                    teamclass.updateleaderid({leaderId:null,teamId:item.teamId}).then(doc2=>{
                      for(let j=0;j<this.teamarr.length;j++){
                        this.teamarr[j].leaderId = null;
                      }
                    })
                 }
                })
              }
            }
          })
          });
     },
    onaddteamleader:function(){
        document.getElementById("teammemberid").value = "0";
        document.getElementById("type").value = "0";

        this.memberflag = true;
        this.lflag = true;
        workarea.getallworkarea().then(doc => {
        this.workareaArr = doc.data;
        });

        employee.getallemp().then(doc => {
           this.emparr = doc.data;
           teammember.getteambyteamid(this.teamarr[0].teamId).then(doc1=>{
           for(let i=0;i<this.emparr.length;i++){
              for(let j=0;j<doc1.data.length;j++){
                if(this.emparr[i].empId == doc1.data[j].empId){
                  this.emparr.splice(i,1);
                }
              }
            }
        })
        });



    },
    onaddmember:function(){
        document.getElementById("teammemberid").value = "0";
        document.getElementById("type").value = "0";

        this.memberflag = true;

        workarea.getallworkarea().then(doc => {
        this.workareaArr = doc.data;
        });

        employee.getallemp().then(doc => {
           this.emparr = doc.data;
           teammember.getteambyteamid(this.teamarr[0].teamId).then(doc1=>{
           for(let i=0;i<this.emparr.length;i++){
              for(let j=0;j<doc1.data.length;j++){
                if(this.emparr[i].empId == doc1.data[j].empId){
                  this.emparr.splice(i,1);
                }
              }
            }
        })
        });



    },
    onaddanc:function(){
      this.projectAnnouncementArr.projectId = this.projectId;
      projectAnnouncementclass.addprojectAnnouncement(this.projectAnnouncementArr).then(doc=>{
          this.sendflag = true;
          this.$fire({
                    title: "Announcement Send successfully",
                    type: "success",
                    timer: 3000
                    }).then(r => {
                    console.log(r.value);
                    });
                    });
    },
    onissue:function(){
        this.$router.push({path:'/issues/' + this.projectId});
    },
    onclear:function(){
      this.projectAnnouncementArr = {};
      this.sendflag = false;
    }
  },

}
</script>

<style scoped>
.highlight {
            background-color: #f8f9fa;
            padding: 20px;
        }

        .highlight pre code {
            font-size: inherit;
            color: #212529;
        }

        .nt {
            color: #2f6f9f;
        }

        .na {
            color: #4f9fcf;
        }

        .s {
            color: #d44950;
        }

        pre.prettyprint {
            background-color: #eee;
            border: 0px;
            margin: 0;
            padding: 20px;
            text-align: left;
        }

        .atv,
        .str {
            color: #05AE0E;
        }

        .tag,
        .pln,
        .kwd {
            color: #3472F7;
        }

        .atn {
            color: #2C93FF;
        }

        .pln {
            color: #333;
        }

        .com {
            color: #999;
        }
        #list  p {
           font: arial;
          font-size: 14px;
        }

input[disabled=disabled] {
  pointer-events: none;
  opacity: 0.4;
}
textarea[disabled=disabled] {
  pointer-events: none;
  opacity: 0.4;
}
button[disabled=disabled] {
  pointer-events: none;
  opacity: 0.4;
}
</style>
