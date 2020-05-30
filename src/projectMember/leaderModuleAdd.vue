<template>
<div>
    <membermenu></membermenu>
    <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2><a href="javascript:void(0);"></a> Add Module</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/memberdashboard"><i class="icon-home"></i></router-link></li>
                               <li style="margin-top:5px;" class="breadcrumb-item">Project</li>
                               <li style="margin-top:5px;" class="breadcrumb-item active">View Projects</li>
                               <li style="margin-top:5px;" class="breadcrumb-item active">Project Details</li>
                               <li style="margin-top:5px;" class="breadcrumb-item active">Add Module</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="card">
                            <div class="body">
                                <div class="row clearfix">
                                    <div class="col-sm-12  ">
                                        <div class="form-group">
                                            <input autocomplete="off" @input="onmname" id="mname" v-model="moduleArr.moduleName" type="text" class="form-control" placeholder="Module Name *">
                                        </div>
                                    </div>

                                   <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                       <input type="text" v-bind:data-date-start-date="startval" id="startdate" name="startdate" data-provide="datepicker" data-date-autoclose="true"
                                                class="form-control" placeholder="Start Date" autocomplete="off">
                                      </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <input @click="ondeadlineclick" type="text" v-bind:data-date-start-date="deadlineval" id="deadline" data-provide="datepicker" data-date-autoclose="true"
                                                class="form-control" placeholder="DeadLine" autocomplete="off">
                                        </div>
                                    </div>

                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <select class="form-control show-tick" id="lstMembers" @change="onassignmember">
                                                <option value="0">Assign members</option>
                                                <option v-bind:value="item.empId" v-for="(item,id) in teamarr" v-bind:key="id">{{item.empFirstName}} {{item.empLastName}}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-5 col-sm-12"></div>
                                    <div class="col-md-6 col-sm-12"></div>
                                    <div class="col-md-1 col-sm-12">
                                          <button @click="onaddmember" type="submit" class="btn btn-primary" v-bind:disabled="addflag">Add</button>
                                    </div>
                            </div>


                    <div class="col-lg-6 col-md-6 col-sm-12" v-if="flag">
                        <div class="card">
                            <div class="body project_report">
                                <div class="table-responsive">
                                    <table class="table table-hover js-basic-example dataTable table-custom m-b-0">
                                            <tr>
                                                <th>MemberName</th>
                                            </tr>
                                        <tbody>
                                            <tr v-for="(item,id) in memberarr" v-bind:key="id">
                                                <td v-if="id!=0">
                                                   {{item.empFirstName}} {{item.empLastName}}
                                                 </td>
                                                 <td class="project-actions">
                                                    <a v-if="id!=0" @click="ondelete(item.empId)" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-danger"
                                                        title="Delete" data-type="confirm"><i
                                                            class="icon-trash"></i></a>
                                                </td>
                                            </tr>

                                       </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br>
                    <div class="row clearfix">
                                <div class="col-md-12 col-sm-12">
                                <div class="form-group">
                                        <textarea @input="mdescription" id="content" class="form-control" rows="10"></textarea>
                                </div>
                                </div>

                    <div class="body">
                             <div class="row clearfix" v-if="submoduleflag">
                                  <div class="col-sm-12  ">
                                      <div class="form-group">
                                            <input autocomplete="off" id="name" @input="moname" type="text" class="form-control" placeholder="Sub Module Name *">
                                      </div>
                                  </div>

                                   <div class="col-md-4 col-sm-12">
                                      <div class="form-group">
                                       <input type="text" v-bind:data-date-start-date="startval" id="startdate1" data-provide="datepicker" data-date-autoclose="true"
                                                class="form-control" placeholder="Start Date">
                                      </div>
                                    </div>

                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <input type="text" v-bind:data-date-start-date="deadlineval" id="deadline1" data-provide="datepicker" data-date-autoclose="true"
                                                class="form-control" placeholder="DeadLine">
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-sm-12">
                                        <div class="form-group">
                                            <textarea @input="modescription" id="content1" class="form-control" col="10" rows="10"></textarea>
                                        </div>
                                    </div>


                                 </div>

                       </div>

                                    <div class="col-sm-12" v-if="submoduleflag==false">
                                          <button @click="submodule" type="submit" class="btn btn-primary">Add Submodules</button>
                                    </div>

                                    <div class="col-sm-12" v-if="submoduleflag">
                                          <button @click="onaddsubmodule" type="submit" class="btn btn-primary">Add</button>
                                    </div>

                <div class="col-lg-6 col-md-6 col-sm-12" v-if="flag1">
                        <div class="card">
                            <div class="body project_report">
                                <div class="table-responsive">
                                    <table class="table table-hover js-basic-example dataTable table-custom m-b-0">
                                            <tr>
                                                <th>SubModuleName</th>
                                            </tr>
                                        <tbody>
                                            <tr v-for="(item,id) in submoduleArr1" v-bind:key="id">
                                                <td v-if="id!=0">
                                                   {{item.subModuleName}}
                                                </td>
                                                 <td class="project-actions">
                                                    <a @click="onsubmoduledelete(item.subModuleName)" v-if="id!=0" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-danger"
                                                        title="Delete" data-type="confirm"><i
                                                            class="icon-trash"></i></a>
                                                </td>
                                            </tr>

                                       </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                                    <div class="col-sm-12">
                                        <div class="mt-4">
                                            <!-- <p style="color:green;" v-if="addsuccessflag">Added Successfully</p> -->
                                            <button @click="oncreate" type="submit" class="btn btn-primary">Create</button>
                                            <button @click="oncancel" type="submit" class="btn btn-outline-secondary">Cancel</button>
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
import emp from '../services/employee'
import module from '../services/module'
import moduleassign from '../services/moduleassign'
import subModule from '../services/submodule'
import project from '../services/project'

export default {
    data:function(){
      return{
        moduleArr:{
          moduleName:'',
          projectId:'',
          moduleStartDate:'',
          moduleDeadline:'',
          moduleStatus:'idle',
          moduleDescription:''
        },
        submoduleArr:{
            moduleId:'',
            subModuleName:'',
            subModuleDescription:'',
            subModuleStartDate:'',
            subModuleDeadline:'',
            subModuleStatus:'idle'
        },
        submoduleArr1:[{}],
        description:'',
        teamarr:[{}],
        empId:'',
        count:0,
        memberId:'',
        flag:false,
        flag1:false,
        moduleId:'',
        displayflag:0,
        addsuccessflag:false,
        startval:"+0d",
        deadlineval:"+0d",
        cnt:29,
        memberarr:[{}],
        submoduleflag:false,
        moduleflag:false,
        addflag:true,
        moduleassignArr:{
          moduleId:'',
          empId:''
        },
        updateEndDateArr:{
            projectEndDate:'',
            projectId:''
        },
      }
    },
    mounted(){
    this.moduleArr.projectId = this.$route.params.projectId;
      this.empId = localStorage.getItem('empId');
      team.getteamByprojectID(this.moduleArr.projectId).then(doc=>{
          this.teamarr = doc.data;
      })
    },
    methods:{

      oncreate:function(){
            if(this.moduleArr.moduleName == ""){
                document.getElementById("mname").focus();
                document.getElementById("mname").style = "border-color:red;"
            }
            else if(document.getElementById("startdate").value == ""){
                document.getElementById("startdate").focus();
            }
            else if(document.getElementById("deadline").value == ""){
                document.getElementById("deadline").focus();
            }
            else if(this.memberarr.length == 1){
                document.getElementById("lstMembers").focus();
                document.getElementById("lstMembers").style = "border-color:red;"
            }
            else{
                   var date1 = new Date($("#startdate").datepicker().val());
                   var date2 = new Date($("#deadline").datepicker().val());
                   var month = date1.getMonth() + 1;
                   var month1 = date2.getMonth() + 1;
                   this.moduleArr.moduleStartDate = date1.getFullYear() + "-" + month + "-" + date1.getDate();
                   this.moduleArr.moduleDeadline = date2.getFullYear() + "-" + month1 + "-" + date2.getDate();


                   this.moduleArr.moduleDescription = document.getElementById("content").value;

                   if(this.submoduleArr1.length == 1){
                        module.addModule(this.moduleArr).then(doc=>{
                        this.moduleId = doc.data.insertId;

                             for(let i=1;i<this.memberarr.length;i++){
                                this.moduleassignArr = {};
                                this.moduleassignArr.moduleId = this.moduleId;
                                this.moduleassignArr.empId = this.memberarr[i].empId;
                                moduleassign.addModuleAssign(this.moduleassignArr).then(doc=>{
                                    this.addsuccessflag = true;
                                })
                              }

                                 module.getModuleByProjectId(this.$route.params.projectId).then(doc1=>{
                                   var idle=0;
                                   for(let i=0;i<doc1.data.length;i++){
                                     if(doc1.data[i].moduleStatus == 'idle'){
                                       idle++;
                                     }
                                    }
                                    if(idle != doc1.data.length){
                                         project.updateprojectstatus(this.$route.params.projectId,"inprogress").then(doc2=>{
                                         });
                                    }
                                 })
                        })
                        this.$fire({
                                    title: "Module Added successfully",
                                    type: "success",
                                    timer: 3000
                                    }).then(r => {
                                    console.log(r.value);
                                    });
                                    this.$router.push({path:'/memberprojectdetails/' + this.moduleArr.projectId});
                   }
                   else{
                              module.addModule(this.moduleArr).then(doc=>{
                              this.moduleId = doc.data.insertId;

                              for(let i=1;i<this.memberarr.length;i++){
                                  this.moduleassignArr = {};
                                  this.moduleassignArr.moduleId = this.moduleId;
                                  this.moduleassignArr.empId = this.memberarr[i].empId;
                                  moduleassign.addModuleAssign(this.moduleassignArr).then(doc=>{
                                })
                              }

                              for(let i=1;i<this.submoduleArr1.length;i++){
                                this.submoduleArr1[i].moduleId = this.moduleId;
                                  subModule.addSubModule(this.submoduleArr1[i]).then(doc=>{
                                      this.addsuccessflag = true;
                                  })
                                }
                                 module.getModuleByProjectId(this.$route.params.projectId).then(doc1=>{
                                   var idle=0;
                                   for(let i=0;i<doc1.data.length;i++){
                                     if(doc1.data[i].moduleStatus == 'idle'){
                                       idle++;
                                     }
                                    }
                                    if(idle != doc1.data.length){
                                         project.updateprojectstatus(this.$route.params.projectId,"inprogress").then(doc2=>{
                                           this.addsuccessflag = true;
                                         });
                                    }
                                 })
                                })

                                 this.$fire({
                                    title: "Module Added successfully",
                                    type: "success",
                                    timer: 3000
                                    }).then(r => {
                                    console.log(r.value);
                                    });
                                    this.$router.push({path:'/memberprojectdetails/' + this.moduleArr.projectId});
                                }
                   }

      },
      onaddmember:function(){
          if(document.getElementById("lstMembers").value != "0"){
          for(let i=0;i<this.memberarr.length;i++){
            if(this.memberId == this.memberarr[i].empId){
                this.displayflag = 1;
            }
          }

          this.flag = true;

          if(this.displayflag == 0){
          emp.getempbyid(this.memberId).then(doc=>{
            this.memberarr.push(doc.data[0]);
            document.getElementById("lstMembers").value = "0"
            for(let i=0;i<this.teamarr.length;i++){
              if(this.teamarr[i].empId == doc.data[0].empId){
                this.teamarr.splice(i,1);
              }
            }
          })
          }
          else{
            alert("Already Added");
          }
          }

      },

      ondeadlineclick:function(){
        /* var s = $("#startdate").datepicker("getDate");
        var today = new Date();
        if(s.getDate() == today.getDate() && s.getMonth() == today.getMonth() && s.getFullYear() == today.getFullYear())
        {
          this.deadlineval = "+0d";
        }
        else{
        var diff = parseInt((s.getTime()-today.getTime())/(24*3600*1000));
        diff = diff + 1;
        this.deadlineval = "";
        this.deadlineval = "+" + diff + "d";
       } */
      },
      oncancel:function(){
       this.$router.push({path:'/memberprojectdetails/' + localStorage.getItem("projectId")});
      },
      onmname:function(){
        document.getElementById("mname").style = "border-color:lightgrey;"
      },
      moname:function(){
          document.getElementById("name").style = "border-color:lightgrey;"
      },
      modescription:function(){
          document.getElementById("content1").style = "border-color:lightgrey;"
      },
      mdescription:function(){
          document.getElementById("content").style = "border-color:lightgrey;"
      },

      onassignmember:function(event){
          document.getElementById("lstMembers").style = "border-color:lightgrey;"
          if(event.target.value == 0){
            this.addflag = true;
          }
          else{
            this.addflag = false;
            this.memberId = event.target.value;
          }
      },
      ondelete:function(id){
          for(let i=0;i<this.memberarr.length;i++){
              if(id == this.memberarr[i].empId){
                this.teamarr.push(this.memberarr[i]);
                this.memberarr.splice(i,1);
              }
          }
          if(this.memberarr.length == 1){
            document.getElementById("lstMembers").value = "0"
            this.flag = false;
            this.addflag = true;
          }
      },
      onsubmoduledelete:function(name){
          for(let i=0;i<this.submoduleArr1.length;i++){
              if(name == this.submoduleArr1[i].subModuleName){
                  this.submoduleArr1.splice(i,1);
              }
          }
          if(this.submoduleArr1.length == 1){
              this.flag1 = false;
          }
      },
      submodule:function(){
            if(this.moduleArr.moduleName == ""){
                document.getElementById("mname").focus();
                document.getElementById("mname").style = "border-color:red;"
            }
            else if(document.getElementById("startdate").value == ""){
                document.getElementById("startdate").focus();
            }
            else if(document.getElementById("deadline").value == ""){
                document.getElementById("deadline").focus();
            }
            else if(this.memberarr.length == 1){
                document.getElementById("lstMembers").focus();
                document.getElementById("lstMembers").style = "border-color:red;"
            }
            else if(document.getElementById("content").value==""){
                document.getElementById("content").focus();
                document.getElementById("content").style = "border-color:red;"
            }
            else {
              this.moduleflag = true;
              this.submoduleflag = true;
             }
      },
      onaddsubmodule:function(){
            if(document.getElementById("name").value == ""){
                document.getElementById("name").focus();
                document.getElementById("name").style = "border-color:red;"
            }
            else if(document.getElementById("startdate1").value == ""){
                document.getElementById("startdate1").focus();
            }
            else if(document.getElementById("deadline1").value == ""){
                document.getElementById("deadline1").focus();
            }
            else if(document.getElementById("content1").value == ""){
                document.getElementById("content1").focus();
                document.getElementById("content1").style = "border-color:red;";
            }
          else{

          this.flag1 = true;
          this.submoduleArr = {}
          this.submoduleArr.moduleId = 0;
          this.submoduleArr.subModuleName = document.getElementById("name").value;
          this.submoduleArr.subModuleDescription = document.getElementById("content1").value;
          var date3 = new Date($("#startdate1").datepicker().val());
          var date4 = new Date($("#deadline1").datepicker().val());
          var d = date3.getMonth() + 1;
          var d1 = date4.getMonth() + 1;
          this.submoduleArr.subModuleStartDate = date3.getFullYear() + "-" + d + "-" + date3.getDate();
          this.submoduleArr.subModuleDeadline = date4.getFullYear() + "-" + d1 + "-" + date4.getDate();
          this.submoduleArr.subModuleStatus = 'idle'
          this.submoduleArr1.push(this.submoduleArr);
          document.getElementById("name").value = "";
          document.getElementById("startdate1").value = "";
          document.getElementById("deadline1").value = "";
          document.getElementById("content1").value = "";
         }
      }
    }
}
</script>
