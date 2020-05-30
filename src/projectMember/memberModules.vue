<template>
    <div>
      <membermenu></membermenu>
      <div id="main-content" class="taskboard">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2><a href="javascript:void(0);"></a>View Modules</h2>
                            <ul class="breadcrumb">
                                <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                                </li>
                                <li style="margin-top:5px;" class="breadcrumb-item">Project</li>
                                <li style="margin-top:5px;" class="breadcrumb-item active">View Projects</li>
                                <li style="margin-top:5px;" class="breadcrumb-item active">Project Details</li>
                                <li style="margin-top:5px;" class="breadcrumb-item active">View Modules</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row clearfix">

                    <div class="col-md-12">
                        <div class="card">
                    <div class="body">
                    <br>
                    <!-- <td v-if="modulearr.length==0" style="font-size:25px; text-align:center;color:red;font-family: serif;"><i class="fa fa-bell-slash" aria-hidden="true"></i> No modules created ...</td> -->
                         <div style="background-color:#ffcccb;" v-if="modulearr.length==0" class="card border ml-3">
                            <div class="body">
                                <div>
                                    <p style="margin-left:25%;font-size:20px;"><b>Heyy wait...Modules for this project is still not assigned</b></p>
                                </div>
                            </div>
                        </div>
                    <div v-if="modulearr.length>0" class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <router-link to="/memberprojectview"><i class="fa fa-arrow-left" style="float:left;width:20px;"></i></router-link>
                            <div class="body project_report">
                                <div class="table-responsive">

                                  <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>

                                  <md-table-toolbar>

                                  <md-field md-clearable class="md-toolbar-section-end">
                                  <md-input style="border:1px solid lightgrey;font-family:'Times New Roman', Times, serif;" placeholder=" Search by Module name..." v-model="search" @input="searchOnTable" />
                                  </md-field>
                                  </md-table-toolbar>

                                    <md-table-row v-bind:style="color1(index)" slot="md-table-row" slot-scope="{ item , index }" >

                                    <md-table-cell v-if="dflag == 1">
                                      <a v-if="item.moduleStatus!='Ready to deploy'" @click="ondelete(item.moduleId,index)" href="javascript:void(0);" class="btn btn-sm btn-outline-danger" title="Delete" data-type="confirm"><i class="icon-trash"></i></a>
                                      <a v-if="item.moduleStatus=='Ready to deploy'" disabled @click="ondelete(item.moduleId,index)" href="javascript:void(0);" class="btn btn-sm btn-outline-danger" title="Delete" data-type="confirm"><i class="icon-trash"></i></a>
                                      <a v-if="item.moduleStatus=='Deployed'" disabled @click="ondelete(item.moduleId,index)" href="javascript:void(0);" class="btn btn-sm btn-outline-danger" title="Delete" data-type="confirm"><i class="icon-trash"></i></a>
                                    </md-table-cell>

                                    <md-table-cell v-if="dflag == 1">
                                      <a  v-if="item.moduleStatus!='Ready to deploy'" @click="onedit(item.moduleId)" style="margin-left:-50px;" href="javascript:void(0);" class="btn btn-sm btn-outline-success" title="Delete" data-type="confirm"><i class="icon-pencil"></i></a>
                                      <a  v-if="item.moduleStatus=='Ready to deploy'" disabled @click="onedit(item.moduleId)" style="margin-left:-50px;" href="javascript:void(0);" class="btn btn-sm btn-outline-success" title="Delete" data-type="confirm"><i class="icon-pencil"></i></a>
                                      <a  v-if="item.moduleStatus=='Deployed'" disabled @click="onedit(item.moduleId)" style="margin-left:-50px;" href="javascript:void(0);" class="btn btn-sm btn-outline-success" title="Delete" data-type="confirm"><i class="icon-pencil"></i></a>
                                    </md-table-cell>


                                    <md-table-cell md-label="Module Name" style="text-transform: uppercase;" md-sort-by="projectName"><span style="color:black;"><b>{{ item.moduleName}}</b></span></md-table-cell>

                                    <md-table-cell md-label="Description" md-sort-by="moduleDescription"><a @click="onview(item.moduleDescription)" href="javascript:void(0);" data-toggle="modal" data-target="#addcontact">Description</a></md-table-cell>
                                    <md-table-cell  md-label="Start Date" md-sort-by="moduleStartDate"><span style="font-size:15px;">{{ item.moduleStartDate | moment("Do MMMM YYYY")}}</span></md-table-cell>
                                    <md-table-cell md-label="Deadline" md-sort-by="moduleDeadline"><span style="color:red;"><span style="font-size:15px;">{{item.moduleDeadline | moment("Do MMMM YYYY")}}</span></span></md-table-cell>
                                    <md-table-cell v-if="item.moduleStatus=='inprogress'" md-label="Status" md-sort-by="moduleStatus"><span class="badge badge-success"><strong>{{item.moduleStatus}}</strong></span></md-table-cell>
                                    <md-table-cell v-if="item.moduleStatus=='Ready to deploy'" md-label="Status" md-sort-by="moduleStatus"><span class="badge badge-warning"><strong>{{item.moduleStatus}}</strong></span></md-table-cell>
                                    <md-table-cell v-if="item.moduleStatus=='Deployed'" md-label="Status" md-sort-by="moduleStatus"><span class="badge badge-warning"><strong>{{item.moduleStatus}}</strong></span></md-table-cell>

                                    <md-table-cell v-if="item.moduleStatus=='idle'" md-label="Status" md-sort-by="moduleStatus"><span class="badge badge-primary
                                    "><strong>{{item.moduleStatus}}</strong></span></md-table-cell>


                                    <md-table-cell md-label="More Details">
                                         <router-link v-bind:to="'/memberteam/' + projectId + '/' + item.moduleId" class="btn btn-sm btn-outline-success">Members</router-link>
                                    </md-table-cell>

                                    <md-table-cell md-label="More Details">
                                         <router-link v-bind:to="'/membertaskboard/' + item.moduleId + '/' + projectId" class="btn btn-sm btn-outline-success">SubModules</router-link>
                                    </md-table-cell>

                                    <md-table-cell md-label="Issues">
                                         <router-link v-bind:disabled = "(color1(index) == 'background-color:white;' && empId != leaderId) || item.moduleStatus=='Ready to deploy' | item.moduleStatus=='Deployed'" v-bind:to="'/memberissue/' + item.moduleId + '/' + projectId" class="btn btn-sm btn-outline-success">Issues</router-link>
                                    </md-table-cell>


                                    </md-table-row>
                                    </md-table>
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
<div class="modal fade" id="addcontact" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="title" id="defaultModalLabel">View Module Details</h6>
            </div>
            <div class="modal-body">
                <div class="row clearfix">
                      <p style="margin-left:10px;">{{description}}</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">CLOSE</button>
            </div>
        </div>
    </div>
</div>

    </div>
</template>

<script>

const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.moduleName).includes(toLower(term)))
    }

    return items
  }



import module from '../services/module'
import emp from '../services/employee'
import moduleAssign from '../services/moduleassign'
import submodule from '../services/submodule'
import issue from '../services/issue'
import project from '../services/project'
export default {
  data:function(){
    return{
        projectId:'',
        projectarr:[{}],
        description:'',
        modulearr:[{}],
        empId:'',
        c1:'background-color:white;',
        c2:'background-color:lavender',
        flag:[],
        search: null,
        leaderId:'',
        searched: [],
        updateEndDateArr:{
            projectEndDate:'',
            projectId:''
        },
        dflag:0
    }
  },
  created(){

      this.empId = localStorage.getItem('empId');
      this.leaderId = localStorage.getItem('leaderId');
      if(this.empId == localStorage.getItem('leaderId')){
        this.dflag = 1;
      }
      this.projectId = this.$route.params.projectId;
      project.getprojectByID(this.projectId).then(doc=>{
        this.projectarr = doc.data[0];
        })
      module.getModuleByProjectId(this.projectId).then(doc=>{
          this.modulearr = doc.data;
          this.searched=doc.data;
          for(let i=0;i<this.modulearr.length;i++){
                emp.getempbymoduleid(this.modulearr[i].moduleId).then(doc=>{
                    var flag1 = 0;
                    for(let j=0;j<doc.data.length;j++){
                      if(this.empId == doc.data[j].empId){
                          flag1 = 1;
                      }
                    }
                    if(flag1 == 0)this.flag.push(0);
                    else this.flag.push(1);
                })
          }
      })

  },
  methods:{
    onview:function(description){
          this.description = description;
    },
    color1:function(id){
        if(this.flag[id] == 0){
            return this.c1;
        }
        else{
          return this.c2;
        }
    },
    searchOnTable () {
        this.searched = searchByName(this.modulearr, this.search)
    },
    ondelete(id,index){
      var complete=0;
      var idle = 0;
      module.deletemodule(id).then(doc=>{
          this.modulearr.splice(index,1);
          for(let i=0;i<this.modulearr.length;i++){
            if(this.modulearr[i].moduleStatus == 'Ready to deploy'){
                complete++;
            }
            if(this.modulearr[i].moduleStatus == 'idle'){
                idle++;
            }
          }
          if(complete == this.modulearr.length){
             project.updateprojectstatus(this.$route.params.projectId,"Ready to deploy").then(doc1=>{
             var date=new Date();
             var month=date.getMonth()+1;
             this.updateEndDateArr.projectEndDate = date.getFullYear() + "-" + month + "-" + date.getDate();
             this.updateEndDateArr.projectId = this.$route.params.projectId;

             project.updateEndDate(this.updateEndDateArr).then(doc=>{});
             })

          }
          if(idle == this.modulearr.length){
             project.updateprojectstatus(this.$route.params.projectId,"idle").then(doc2=>{})
          }
      })

    },
    onedit(id){
      this.$router.push({path:'/membermoduleedit/' + id});
    }
  }
}
</script>
<style>
.md-field {
    max-width: 350px;
  }

  tr:hover{
      background-color: f1f1f1;
  }
  td{
      font-size:18px;
      font-family:'Times New Roman', Times, serif;
  }
a[disabled=disabled] {
  pointer-events: none;
  opacity: 0.4;
}
</style>
