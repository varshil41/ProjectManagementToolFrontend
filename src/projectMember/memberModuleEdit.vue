<template>
<div>
    <membermenu></membermenu>
    <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2><a href="javascript:void(0);" class="btn btn-xs btn-link btn-toggle-fullwidth"><i
                                        class="fa fa-arrow-left"></i></a> Add Module</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/memberdashboard"><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item">Projects</li>
                                <li class="breadcrumb-item active">Add Module</li>
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
                                        <input v-model="moduleArr.moduleStartDate" type="text" id="startdate" data-provide="datepicker" data-date-autoclose="true"
                                                class="form-control" placeholder="Start Date" autocomplete="off">

                                      </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <input v-model="moduleArr.moduleDeadline" type="text" id="deadline" data-provide="datepicker" data-date-autoclose="true"
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
                                                <td>
                                                   {{item.empFirstName}} {{item.empLastName}}
                                                 </td>
                                                 <td class="project-actions">
                                                      <a @click="ondelete(item.empId)" href="javascript:void(0);"
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
                                        <textarea v-model="moduleArr.moduleDescription" @input="mdescription" id="content" class="form-control" rows="10"></textarea>
                                </div>
                                </div>
                                <p style="margin-left:15px; color:green;" v-if="updateflag">Update Successfully</p>
                                <div class="col-sm-12">
                                          <button @click="updatemodule" type="submit" class="btn btn-primary">Update Module</button>
                                </div>



                    <br><br>
                    <div class="body">
                             <div class="row clearfix" v-if="submoduleflag">
                                  <div class="col-sm-12  ">
                                      <div class="form-group">
                                            <input autocomplete="off" id="name" @input="moname" type="text" class="form-control" placeholder="Sub Module Name *">
                                      </div>
                                  </div>

                                   <div class="col-md-4 col-sm-12">
                                      <div class="form-group">
                                       <input type="text" id="startdate1" data-provide="datepicker" data-date-autoclose="true"
                                                class="form-control" placeholder="Start Date">
                                      </div>
                                    </div>

                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <input type="text" id="deadline1" data-provide="datepicker" data-date-autoclose="true"
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
                                          <button @click="submodule" type="submit" class="btn btn-primary">Update Submodules</button>
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
                                                <td>
                                                   {{item.subModuleName}}
                                                </td>
                                                 <td class="project-actions">
                                                    <a @click="onsubmoduledelete(item.subModuleName)" href="javascript:void(0);"
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
                                            <button type="submit" @click="onback" class="btn btn-outline-secondary">Back</button>
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
export default {
    data:function(){
      return{
        moduleArr:{
          moduleName:'',
          moduleStartDate:'',
          moduleDeadline:'',
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
        flag:true,
        flag1:false,
        moduleId:'',
        displayflag:0,
        memberarr:[{}],
        updateflag:false,
        submoduleflag:false,
        moduleflag:false,
        addflag:true,
        moduleassignArr:{
          moduleId:'',
          empId:''
        }
      }
    },
    mounted(){
          module.getmodulebyid(this.$route.params.moduleid).then(doc=>{
          this.moduleArr = doc.data[0];
          var date1 = new Date(doc.data[0].moduleStartDate);
          var date2 = new Date(doc.data[0].moduleDeadline);
          var d = date1.getMonth() + 1;
          var d1 = date2.getMonth() + 1;

          this.moduleArr.moduleStartDate = date1.getFullYear() + "-" + d + "-" + date1.getDate();
          this.moduleArr.moduleDeadline = date2.getFullYear() + "-" + d1 + "-" + date2.getDate();


          moduleassign.getempbymoduleid(this.$route.params.moduleid).then(doc1=>{
              this.memberarr = doc1.data;
          })

          team.getteamByprojectID(this.moduleArr.projectId).then(doc=>{
          this.teamarr = doc.data;
          for(let i=0;i<this.teamarr.length;i++){
            for(let j=0;j<this.memberarr.length;j++){
              if(this.teamarr[i].empId == this.memberarr[j].empId){
                this.teamarr.splice(i,1);
              }
            }
          }
          })


      })
      this.empId = localStorage.getItem('empId');

      subModule.getsubmodulebymoduleid(this.$route.params.moduleid).then(doc=>{
          this.submoduleArr1 = doc.data;
      })

    },
    methods:{
      updatemodule:function(){
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
            else if(this.memberarr.length == 0){
                document.getElementById("lstMembers").focus();
                document.getElementById("lstMembers").style = "border-color:red;"
            }
            else{
                 var date3 = new Date($("#startdate").datepicker().val());
                 var date4 = new Date($("#deadline").datepicker().val());
                 var dd = date3.getMonth() + 1;
                 var dd1 = date4.getMonth() + 1;
                 this.moduleArr.moduleStartDate = date3.getFullYear() + "-" + dd + "-" + date3.getDate();
                 this.moduleArr.moduleDeadline = date4.getFullYear() + "-" + dd1 + "-" + date4.getDate();

                 module.updatemodule(this.moduleArr).then(doc=>{
                      for(let i=0;i<this.memberarr.length;i++){
                          moduleassign.getdatebymoduleidandempid(this.memberarr[i].empId,this.$route.params.moduleid).then(doc1=>{
                            if(doc1.data.length==0){
                               this.moduleassignArr = {};
                               this.moduleassignArr.moduleId = this.$route.params.moduleid;
                               this.moduleassignArr.empId = this.memberarr[i].empId;
                               moduleassign.addModuleAssign(this.moduleassignArr).then(doc2=>{
                               })
                            }
                          })
                      }
                      this.updateflag = true;




                 })

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
                 moduleassign.deletemember(this.$route.params.moduleid,this.memberarr[i].empId).then(doc=>{})
                 this.teamarr.push(this.memberarr[i]);
                 this.memberarr.splice(i,1);
              }
          }
          if(this.memberarr.length == 0){
            document.getElementById("lstMembers").value = "0"
            this.flag = false;
            this.addflag = true;
          }
      },
      onsubmoduledelete:function(name){
          for(let i=0;i<this.submoduleArr1.length;i++){
              if(name == this.submoduleArr1[i].subModuleName){
                  subModule.deletesubmodulebyid(this.submoduleArr1[i].subModuleId).then(doc=>{})
                  this.submoduleArr1.splice(i,1);
              }
          }
          if(this.submoduleArr1.length == 0){
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
              this.flag1 = true;
             }
      },
      onback:function(){
        this.$router.push({path:'/membermodule/' + localStorage.getItem('projectId')})
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
          this.submoduleArr.moduleId = this.$route.params.moduleid;
          this.submoduleArr.subModuleName = document.getElementById("name").value;
          this.submoduleArr.subModuleDescription = document.getElementById("content1").value;
          var date5 = new Date($("#startdate1").datepicker().val());
          var date6 = new Date($("#deadline1").datepicker().val());
          var ddd = date5.getMonth() + 1;
          var ddd2 = date6.getMonth() + 1;
          this.submoduleArr.subModuleStartDate = date5.getFullYear() + "-" + ddd + "-" + date5.getDate();
          this.submoduleArr.subModuleDeadline = date6.getFullYear() + "-" + ddd2 + "-" + date6.getDate();

          this.submoduleArr.subModuleStatus = 'idle'
          subModule.addSubModule(this.submoduleArr).then(doc=>{
              subModule.getSubmoduleBySubmoduleId(doc.data.insertId).then(doc=>{
                 this.submoduleArr1.push(doc.data[0]);
                 document.getElementById("name").value = "";
                 document.getElementById("startdate1").value = "";
                 document.getElementById("deadline1").value = "";
                 document.getElementById("content1").value = "";
              })
          })
         }
      }
    }
}
</script>
<style scoped>

</style>
