<template>
 <div>
   <membermenu></membermenu>
           <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2><a href="javascript:void(0);"></a>View Projects</h2>
                            <ul class="breadcrumb">
                                <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                                <li style="margin-top:5px;" class="breadcrumb-item">Project</li>
                                <li style="margin-top:5px;" class="breadcrumb-item active">View Projects</li>
                            </ul>
                        </div>
                    </div>
                </div>

    <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="body project_report">
                                <div class="table-responsive">

                                  <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>
                                  <br>
                                  <td v-if="searched.length==0" style="font-size:15px; text-align:center;color:red;font-family: serif;">
                                        <div class="body">
                                            <div>
                                                <p style="margin-left:20px;font-size:20px;"><b><i style="font-size:25px;" class="fa fa-exclamation-circle"></i>&nbsp;You don't have any <span style="color:red;text-transform:uppercase;">{{type}}</span> project</b></p>
                                            </div>
                                        </div>
                                  </td>

                                  <md-table-toolbar>
                                  <div class="md-toolbar-section-start">
                                  <button @click="onclickall" class="btn btn-sm btn-outline-success">All projects</button>&nbsp;&nbsp;
                                  <button @click="onclickonidle" class="btn btn-sm btn-outline-success">Idle projects</button>&nbsp;&nbsp;
                                  <button @click="onclickongoing" class="btn btn-sm btn-outline-success">Ongoing projects</button>&nbsp;&nbsp;
                                  <button @click="onclickreadytodeploy" class="btn btn-sm btn-outline-success">Ready to deploy projects</button>&nbsp;&nbsp;
                                  </div>

                                  <md-field md-clearable class="md-toolbar-section-end">
                                      <md-input style="border:1px solid lightgrey;" placeholder=" Search by name..." v-model="search" @input="searchOnTable" />
                                  </md-field>
                                  </md-table-toolbar>
                                    <md-table-row slot="md-table-row" slot-scope="{ item }" v-if="item.projectStatus!='Deployed'">
                                    <md-table-cell md-label="Project Name" style="text-transform: uppercase;" v-if="item.leaderId == empId" md-sort-by="projectName"><span style="color:black;"><b>{{ item.projectName}}</b></span><label style="color:blue;font-size:12px;">&nbsp;(Leader)</label></md-table-cell>
                                    <md-table-cell md-label="Project Name" style="text-transform: uppercase;" v-if="item.leaderId != empId" md-sort-by="projectName"><span style="color:black;"><b>{{ item.projectName}}</b></span><label style="color:#fada5e; font-size:12px;">&nbsp;(Member)</label></md-table-cell>
                                    <md-table-cell md-label="Project Domain" md-sort-by="projectDomain">{{ item.projectDomain}}</md-table-cell>
                                    <md-table-cell md-label="Deadline" md-sort-by="projectDeadline"><span style="color:red;">{{item.projectDeadline | moment("Do MMMM YYYY")}}</span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='inprogress'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-success"><strong>{{item.projectStatus}}</strong></span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='Ready to deploy'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-warning"><strong>{{item.projectStatus}}</strong></span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='cancelled'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-danger"><strong>{{item.projectStatus}}</strong></span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='idle'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-primary"><strong>{{item.projectStatus}}</strong></span></md-table-cell>

                                    <md-table-cell md-label="Details">
                                    <button @click="ondetails(item.projectId)" class="btn btn-sm btn-outline-success">Details</button>
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
</template>

<script>

  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.projectName).includes(toLower(term)))
    }

    return items
  }



import project from '../services/project'
export default {
  data:function(){
    return{
      empId:'',
      projectarr:[{}],
      search: null,
      searched: [],
      type:''
    }
  },
  created(){
    this.empId = localStorage.getItem('empId');
    project.getprojectbyempid(this.empId).then(doc=>{
      this.projectarr = doc.data;
      console.log(this.projectarr);
      this.searched=doc.data;
    })
  },
  methods:{
    onclickall:function(){
      project.getprojectbyempid(this.empId).then(doc=>{
      this.projectarr = doc.data;
      this.searched=doc.data;
    })
    },
    onclickreadytodeploy:function(){
        project.getprojectBystatusandempid("Ready to deploy",this.empId).then(doc=>{
          this.projectarr = doc.data;
          this.searched=doc.data;
          this.type='Ready to deploy'
        })
    },

    onclickongoing:function(){
        project.getprojectBystatusandempid("inprogress",this.empId).then(doc=>{
          this.projectarr = doc.data;
          this.searched=doc.data;
          this.type = 'ongoing'
        })
    },

   onclickonidle:function(){
        project.getprojectBystatusandempid("idle",this.empId).then(doc=>{
          this.projectarr = doc.data;
          this.searched=doc.data;
          this.type = 'idle'
        })
    },

    onviewmodule:function(item){
        this.$router.push({path:'/membermodule/' + item.projectId});
        localStorage.setItem('leaderId',JSON.stringify(item.leaderId));
    },
    searchOnTable () {
        this.searched = searchByName(this.projectarr, this.search)
    },
    ondetails:function(id){
           localStorage.setItem(
                  "projectId",
                  JSON.stringify(id)
                );
           this.$router.push({path:'/memberprojectdetails/' + id});

    }
  }
}
</script>

<style scoped>
.md-field {
    max-width: 350px;
  }

  tr:hover{
      background-color: f1f1f1;
  }
  th,td{
      font-size:16px;
      font-family:'Times New Roman', Times, serif;
      font-style: fa-bold;
  }

</style>
