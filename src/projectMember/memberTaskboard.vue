<template>
<div>
 <membermenu></membermenu>
               <div id="main-content" class="taskboard">
        <div class="container-fluid">
            <div class="block-header">
                <div class="row">
                    <div class="col-lg-6 col-md-8 col-sm-12">
                        <h2><a href="javascript:void(0);"></a>Submodules</h2>
                        <ul class="breadcrumb">
                            <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                            <li style="margin-top:5px;" class="breadcrumb-item">Project</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">View Projects</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">Project Details</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">View Modules</li>
                            <li style="margin-top:5px;" class="breadcrumb-item active">Submodules</li>
                        </ul>
                    </div>
                </div>
            </div>

             <div class="row clearfix">

                <div class="col-lg-4 col-md-12">
                    <div class="card planned_task">
                        <div class="header">
                            <h2>Idle</h2>
                            <ul class="header-dropdown">
                                <li v-if="projectarr.projectStatus!='Deployed'"><a v-if="addflag" href="javascript:void(0);" data-toggle="modal" data-target="#addcontact"><i class="icon-plus"></i></a></li>
                            </ul>
                        </div>
                        <div class="body">
                            <div>
                                <ol class="dd-list">
                                    <li v-for="(item,id) in idleSubmodulesArr" v-bind:key="id">
                                        <div class="dd-handle">
                                            <span style="float:right;color:blue;font-size:12px;">Deadline</span><br>
                                            <span style="float:right;color:blue;font-size:12px;">{{item.subModuleDeadline | moment("Do MMMM YYYY")}}</span><br>
                                            <h6>{{item.subModuleName}}</h6>
                                            <p>{{item.subModuleDescription}}</p>
                                            <br>
                                            <h5 v-if="btnflag"><i @click="onprogress(item)" class="fa fa-arrow-right" style="float:right;"></i></h5>
                                       </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-12">
                    <div class="card progress_task">
                        <div class="header">
                            <h2>In progress</h2><br>
                            <p style="font-size:12px;">If your submodule's issue is not resolved then you can't move further</p>


                        </div>
                        <div class="body">
                            <div>
                                <ol class="dd-list">
                                    <li v-for="(item,id) in inprogressSubmodulesArr" v-bind:key="id">
                                        <div class="dd-handle">
                                            <span style="float:right;color:orange;font-size:12px;">Deadline</span><br>
                                            <span style="float:right;color:orange;font-size:12px;">{{item.subModuleDeadline | moment("Do MMMM YYYY")}}</span><br>
                                            <h6>{{item.subModuleName}}</h6>
                                            <p>{{item.subModuleDescription}}</p>
                                            <br>
                                            <h5 v-if="btnflag"><i @click="gobacktoidle(item,id)" class="fa fa-arrow-left" style="float:left;"></i>
                                            <i v-if="issuestatusflag[id] != 0" @click="onreadytodeploy(item)" class="fa fa-arrow-right" style="float:right;"></i></h5>

                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-12">
                    <div class="card bg-dark completed_task">
                        <div class="header">
                            <h2>Ready To Deploy</h2>

                        </div>
                        <div class="body">
                            <div>
                                <ol class="dd-list">
                                    <li v-for="(item,id) in readytodeploySubmodulesArr" v-bind:key="id">
                                        <div class="dd-handle">
                                            <span style="float:right;color:green;font-size:12px;">Deadline</span><br>
                                            <span style="float:right;color:green;font-size:12px;">{{item.subModuleDeadline | moment("Do MMMM YYYY")}}</span><br>
                                            <h6>{{item.subModuleName}}</h6>
                                            <p>{{item.subModuleDescription}}</p>
                                            <br>
                                            <h5 v-if="btnflag && projectarr.projectStatus!='Deployed'"><i @click="gobackprogress(item)" class="fa fa-arrow-left" style="float:left;"></i>
                                            </h5>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>



     <div class="modal fade" id="addcontact" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="title" id="defaultModalLabel">Add New Sub Module</h6>
            </div>
            <div class="modal-body">
                <div class="row clearfix">

                    <div class="col-12">
                        <div class="form-group">
                            <input type="text" id="name" class="form-control" placeholder="Sub Module Title" autocomplete="off">
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <textarea id="content1" class="form-control" placeholder="Description"></textarea>
                        </div>
                    </div>
                    <div class="col-6">
                        <label>StartDate</label>
                              <input type="text" id="startdate1" data-provide="datepicker" data-date-autoclose="true"
                                                class="form-control" placeholder="Start Date">
                    </div>

                    <div class="col-6">
                        <label>Deadline</label>
                              <input type="text" id="deadline1" data-provide="datepicker" data-date-autoclose="true"
                                                class="form-control" placeholder="Deadline">
                    </div>


                </div>
            </div>
            <p v-if="addflag1" style="margin-left:15px; color:green; text-align:center;">SubModule Added</p>

            <div class="modal-footer">
                <button @click="onaddsubmodule" type="button" class="btn btn-primary">Add</button>
                <button @click="addflag1=false" type="button" class="btn btn-secondary" data-dismiss="modal">CLOSE</button>
            </div>
        </div>
    </div>
</div>

</div>
</template>

<script>
import submodule from '../services/submodule'
import module from  '../services/module'
import moduleassign from '../services/moduleassign'
import project from '../services/project'
import issue from '../services/issue'
export default {
    data:function(){
      return{
          projectId:'',
          projectarr:[{}],
          moduleId:'',
          idleSubmodulesArr:[{}],
          inprogressSubmodulesArr:[{}],
          readytodeploySubmodulesArr:[{}],
          idlecount:0,
          progresscount:0,
          readytodeploycount:0,
          leaderId:'',
          projectongoingflag:0,
          projectreadytodeployflag:0,
          btnflag:false,
          addflag1:false,
          empId:'',
          addflag:0,
          issuestatusflag:[],

          submoduleArr:{
            moduleId:'',
            subModuleName:'',
            subModuleDescription:'',
            subModuleStartDate:'',
            subModuleDeadline:'',
            subModuleStatus:'idle'
        },
        updateEndDateArr:{
            projectEndDate:'',
            projectId:''
        }
       }
    },
    created(){
        this.leaderId = localStorage.getItem('leaderId');
        this.empId = localStorage.getItem('empId');
        this.updateEndDateArr.projectId = this.$route.params.projectId;
        var date=new Date();
        var month=date.getMonth()+1;
        this.updateEndDateArr.projectEndDate = date.getFullYear() + "-" + month + "-" + date.getDate();
        if(this.leaderId == this.empId) this.addflag = true;
        this.moduleId = this.$route.params.moduleId;

        moduleassign.getempbymoduleid(this.moduleId).then(doc=>{
            for(let i=0;i<doc.data.length;i++){
              if(this.empId == doc.data[i].empId){
                this.btnflag = true;
              }
            }
        })

        submodule.getSubModuleByModuleIdAndStatus(this.moduleId,"idle").then(doc=>{
          this.idlecount = doc.data.length;
          this.idleSubmodulesArr = doc.data;
        })

        submodule.getSubModuleByModuleIdAndStatus(this.moduleId,"inprogress").then(doc=>{
          this.progresscount = doc.data.length;
          this.inprogressSubmodulesArr = doc.data;
          for(let i=0;i<this.inprogressSubmodulesArr.length;i++){
              issue.issuestatusbysubmoduleid(this.inprogressSubmodulesArr[i].subModuleId).then(doc1=>{
                if(doc1.data[0].cnt == 0){
                  this.issuestatusflag.push(1);
                }
                else{
                  this.issuestatusflag.push(0);
                }
              })
          }

        })

        submodule.getSubModuleByModuleIdAndStatus(this.moduleId,"Ready to deploy").then(doc=>{
          this.readytodeploycount = doc.data.length;
          this.readytodeploySubmodulesArr = doc.data;
          console.log(this.readytodeploySubmodulesArr)
        })

        this.projectId = this.$route.params.projectId;
        project.getprojectByID(this.projectId).then(doc=>{
        this.projectarr = doc.data[0];
        console.log(this.projectarr)
        })
    },
    methods:{
        onprojectstatus:function(){
            module.getModuleByProjectId(this.$route.params.projectId).then(doc=>{
                this.projectongoingflag = 0;
                var c1=0;
                var c2=0;
                for(let i=0;i<doc.data.length;i++){
                  if(doc.data[i].moduleStatus == "inprogress"){
                    this.projectongoingflag = 1;
                    break;
                  }
                  else{
                    if(doc.data[i].moduleStatus != "Ready to deploy"){
                        c1 = 1;
                    }
                    else{
                      if(doc.data[i].moduleStatus != "idle"){
                        c2 = 1;
                      }
                    }
                  }
                }
                if(this.projectongoingflag == 1){
                      project.updateprojectstatus(this.$route.params.projectId,"inprogress").then(doc=>{})
                      this.updateEndDateArr.projectEndDate = null;
                      project.updateEndDate(this.updateEndDateArr).then(doc=>{})

                }
                else if(c1 == 0){
                      project.updateprojectstatus(this.$route.params.projectId,"Ready to deploy").then(doc=>{});
                         var date=new Date();
                         var month=date.getMonth()+1;
                         this.updateEndDateArr.projectEndDate = date.getFullYear() + "-" + month + "-" + date.getDate();
                         project.updateEndDate(this.updateEndDateArr).then(doc=>{});
                }
                else if(c2 == 0){
                       project.updateprojectstatus(this.$route.params.projectId,"idle").then(doc=>{})
                       this.updateEndDateArr.projectEndDate = null;
                       project.updateEndDate(this.updateEndDateArr).then(doc=>{})
                }
            })
        },
        onprogress:function(item){
            for(let i=0;i<this.idleSubmodulesArr.length;i++){
                if(item.subModuleId == this.idleSubmodulesArr[i].subModuleId){
                    submodule.updatestatus("inprogress",item.subModuleId).then(doc=>{
                        this.idlecount--;
                        this.progresscount++;
                        this.idleSubmodulesArr.splice(i,1);
                        this.inprogressSubmodulesArr[this.inprogressSubmodulesArr.length] = item;
                        issue.issuestatusbysubmoduleid(item.subModuleId).then(doc1=>{
                        if(doc1.data[0].cnt == 0){
                          this.issuestatusflag.push(1);
                        }
                        else{
                          this.issuestatusflag.push(0);
                        }
                        })

                        })
                        module.updatestatus("inprogress",this.moduleId).then(doc=>{
                           this.onprojectstatus();
                    })
                }
            }
        },
        onreadytodeploy:function(item){
            for(let i=0;i<this.inprogressSubmodulesArr.length;i++){
                if(item.subModuleId == this.inprogressSubmodulesArr[i].subModuleId){
                    this.readytodeploycount++;
                    this.progresscount--;
                    submodule.updatestatus("Ready to deploy",item.subModuleId).then(doc=>{
                        this.inprogressSubmodulesArr.splice(i,1);
                        this.readytodeploySubmodulesArr[this.readytodeploySubmodulesArr.length] = item;
                        this.issuestatusflag = [];
                        for(let j=0;j<this.inprogressSubmodulesArr.length;j++){
                        issue.issuestatusbysubmoduleid(this.inprogressSubmodulesArr[j].subModuleId).then(doc1=>{
                          if(doc1.data[0].cnt == 0){
                            this.issuestatusflag.push(1);
                          }
                          else{
                            this.issuestatusflag.push(0);
                          }
                        })
                        }

                  })
                  if(this.idlecount == 0 && this.progresscount==0){
                      module.updatestatus("Ready to deploy",this.moduleId).then(doc=>{
                             this.onprojectstatus();
                      })
                  }

                }
            }
        },
        gobackprogress:function(item,id){
            for(let i=0;i<this.readytodeploySubmodulesArr.length;i++){
                if(item.subModuleId == this.readytodeploySubmodulesArr[i].subModuleId){
                    this.readytodeploycount--;
                    this.progresscount++;
                    submodule.updatestatus("inprogress",item.subModuleId).then(doc=>{
                        this.readytodeploySubmodulesArr.splice(i,1);
                        this.inprogressSubmodulesArr[this.inprogressSubmodulesArr.length] = item;
                        issue.issuestatusbysubmoduleid(item.subModuleId).then(doc1=>{
                        if(doc1.data[0].cnt == 0){
                          this.issuestatusflag.push(1);
                        }
                        else{
                          this.issuestatusflag.push(0);
                        }
                        })


                    })
                  module.updatestatus("inprogress",this.moduleId).then(doc=>{
                        this.onprojectstatus();
                  })
                }
            }
        },
        gobacktoidle:function(item){
            for(let i=0;i<this.inprogressSubmodulesArr.length;i++){
                if(item.subModuleId == this.inprogressSubmodulesArr[i].subModuleId){
                    this.progresscount--;
                    this.idlecount++;
                    submodule.updatestatus("idle",item.subModuleId).then(doc=>{
                        this.inprogressSubmodulesArr.splice(i,1);
                        this.idleSubmodulesArr[this.idleSubmodulesArr.length] = item;
                        this.issuestatusflag = [];
                        for(let j=0;j<this.inprogressSubmodulesArr.length;j++){
                        issue.issuestatusbysubmoduleid(this.inprogressSubmodulesArr[j].subModuleId).then(doc1=>{
                          if(doc1.data[0].cnt == 0){
                            this.issuestatusflag.push(1);
                          }
                          else{
                            this.issuestatusflag.push(0);
                          }
                        })
                        }

                    })
                    if(this.progresscount == 0 && this.readytodeploycount == 0){
                        module.updatestatus("idle",this.moduleId).then(doc=>{
                                 this.onprojectstatus();
                         })
                    }
                }
            }
         },
         onaddsubmodule:function(){
              this.submoduleArr.moduleId = this.moduleId;
              this.submoduleArr.subModuleName = document.getElementById("name").value;
              this.submoduleArr.subModuleDescription = document.getElementById("content1").value;
              var date3 = new Date($("#startdate1").datepicker().val());
              var date4 = new Date($("#deadline1").datepicker().val());
              this.submoduleArr.subModuleStartDate = date3.getFullYear() + "-" + date3.getMonth() + "-" + date3.getDate();
              this.submoduleArr.subModuleDeadline = date4.getFullYear() + "-" + date4.getMonth() + "-" + date4.getDate();
              this.submoduleArr.subModuleStatus = 'idle'
              if(this.progresscount==0 && this.idlecount==0){
                module.updatestatus("inprogress",this.moduleId).then(doc=>{})
              }
              submodule.addSubModule(this.submoduleArr).then(doc=>{
                   this.idleSubmodulesArr.push(this.submoduleArr);
                   this.idlecount++;
                   this.addflag1 = true;
                   document.getElementById("name").value = "";
                   document.getElementById("startdate1").value = "";
                   document.getElementById("deadline1").value = "";
                   document.getElementById("content1").value = "";
              })

        }

    },

}
</script>
