<template>
 <div>
   <menu1></menu1>
           <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2> Projects List</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard"
                    ><i class="icon-home"></i
                  ></router-link></li>
                                <li class="breadcrumb-item">Projects</li>
                                <li class="breadcrumb-item active">Projects List</li>
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
                                  <td v-if="searched.length==0" style="font-size:15px; text-align:center;color:red;font-family: serif;"><i class="fa fa-bell-slash" aria-hidden="true"></i> No {{type}} projects ...</td>

                                  <md-table-toolbar>
                                  <div class="md-toolbar-section-start">
                                  <button @click="onclickall" class="btn btn-sm btn-outline-success">All projects</button>&nbsp;&nbsp;
                                  <button @click="onclickonIdle" class="btn btn-sm btn-outline-success">Idle projects</button>&nbsp;&nbsp;
                                  <button @click="onclickongoing" class="btn btn-sm btn-outline-success">Ongoing projects</button>&nbsp;&nbsp;
                                  <button @click="onclickreadytodeploy" class="btn btn-sm btn-outline-success">Ready to deploy projects</button>&nbsp;&nbsp;
                                  </div>

                                  <md-field md-clearable class="md-toolbar-section-end">
                                      <md-input style="border:1px solid lightgrey;font-family:'Times New Roman', Times, serif;" placeholder=" Search by project name..." v-model="search" @input="searchOnTable" />
                                  </md-field>
                                  </md-table-toolbar>

                                    <md-table-row slot="md-table-row" slot-scope="{ item }" v-if="item.projectStatus!='Deployed'">
                                    <md-table-cell md-label="Project Name" style="text-transform: uppercase;" md-sort-by="projectName"><span style="color:black;"><b>{{ item.projectName}}</b></span></md-table-cell>

                                    <!-- <md-table-cell md-label="ClientName" md-sort-by="clientFirstName">{{ item.clientFirstName}}</md-table-cell> -->
                                    <md-table-cell md-label="Client Organization" md-sort-by="clientOrgName">{{ item.clientOrgName}}</md-table-cell>

                                    <md-table-cell md-label="Deadline" md-sort-by="projectDeadline"><span style="color:red;">{{item.projectDeadline | moment("Do MMMM YYYY")}}</span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='inprogress'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-success"><strong>{{item.projectStatus}}</strong></span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='Ready to deploy'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-warning"><strong>{{item.projectStatus}}</strong></span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='cancelled'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-danger"><strong>postponed</strong></span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='idle'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-primary"><strong>{{item.projectStatus}}</strong></span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='Deployed'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-info"><strong>{{item.projectStatus}}</strong></span></md-table-cell>

                                    <md-table-cell md-label="Details">
                                    <router-link v-bind:to="'/projectdetails/' + item.projectId" class="btn btn-sm btn-outline-success">Details</router-link>
                                    </md-table-cell>



                                    <md-table-cell>
                                      <a v-if="item.projectStatus!='cancelled' && item.projectStatus!='Ready to deploy'" @click="ondelete(item.projectId)" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-danger"
                                                        title="Delete" data-type="confirm"><i
                                                            class="icon-trash"></i>
                                      </a>

                                      <a v-if="item.projectStatus=='Ready to deploy'" @click="ondelete(item.projectId)" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-danger"
                                                        title="Delete" disabled data-type="confirm"><i
                                                            class="icon-trash"></i>
                                      </a>
                                      <a v-if="item.projectStatus=='cancelled'" @click="onresume(item.projectId)" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-success"
                                                        title="Resume Project" data-type="confirm"><i
                                                            class="icon-refresh"></i>
                                      </a>

                                    </md-table-cell>
                                    <md-table-cell>
                                      <a v-if="item.projectStatus!='Ready to deploy' && item.projectStatus!='cancelled'" style="margin-left:-50px;" @click="onedit(item.projectId)" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-success"
                                                        title="Edit" data-type="confirm"><i
                                                            class="icon-pencil"></i>
                                      </a>
                                      <a v-if="item.projectStatus=='Ready to deploy' || item.projectStatus=='cancelled'" style="margin-left:-50px;" @click="onedit(item.projectId)" href="javascript:void(0);"
                                                        class="btn btn-sm btn-outline-success"
                                                        disabled title="Edit" data-type="confirm"><i
                                                            class="icon-pencil"></i>
                                      </a>
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

import dashboardclass from '../services/Dashboard'
import projectclass from '../services/project'
import module from '../services/module'
export default {
  data:function(){
    return{
      joinarr:[{}],
      clientId:'',
      projectid:'',
      search: null,
      searched: [],
      type:""


    }
  },
  created(){
   if(!this.$route.params.clientid){
   dashboardclass.getAllProject().then(doc=>{
        console.log(doc);
        for(let i=0;i<doc.data.length;i++)
        {

            this.joinarr=doc.data;
            this.searched = this.joinarr

            console.log(this.joinarr);
        }
    })
   }
   else{
     projectclass.getprojectbyclientid(this.$route.params.clientid).then(doc=>{
        this.joinarr = doc.data;
        this.searched = doc.data;
     })
   }
  },
  methods:{
      ondelete:function(id){
          this.projectid = id;

          for(let i=0;i<this.joinarr.length;i++){
              if(this.searched[i].projectId == id){
                this.searched[i].projectStatus = "cancelled";
              }
          }
           projectclass.updateprojectstatusondelete(id).then(doc=>{
             console.log(doc.data);
           })
      },
      onresume:function(id){
         this.projectid = id;
         var idle = 0;
         module.getModuleByProjectId(id).then(doc=>{
           for(let i=0;i<doc.data.length;i++){
              if(doc.data[i].moduleStatus == 'idle'){
                idle++;
              }
           }
           if(idle == doc.data.length){
             projectclass.updateprojectstatus(id,"idle").then(doc1=>{
               for(let i=0;i<this.joinarr.length;i++){
               if(this.searched[i].projectId == id){
                 this.searched[i].projectStatus = "idle";
               }
              }
             })
           }
           else{
               projectclass.updateprojectstatus(id,"inprogress").then(doc1=>{
               for(let i=0;i<this.joinarr.length;i++){
               if(this.searched[i].projectId == id){
                 this.searched[i].projectStatus = "inprogress";
               }
              }
             })

           }
         })
      },
      onclickreadytodeploy:function(){
          this.type="Ready to deploy";
          if(!this.$route.params.clientid){
          projectclass.getprojectBystatus("Ready to deploy").then(doc=>{
              this.joinarr=doc.data;
              this.searched = doc.data;
          })
          }
          else{
          projectclass.getprojectbyclientidstatus(this.$route.params.clientid,"Ready to deploy").then(doc=>{
              this.joinarr=doc.data;
              this.searched = doc.data;
          })
        }
      },
      onclickongoing:function(){
        this.type="ongoing";
      if(!this.$route.params.clientid){
          projectclass.getprojectBystatus("inprogress").then(doc=>{
              this.joinarr=doc.data;
              this.searched = doc.data;
          })
          }
           else{
          projectclass.getprojectbyclientidstatus(this.$route.params.clientid,"inprogress").then(doc=>{
              this.joinarr=doc.data;
              this.searched = doc.data;
          })
        }
      },
      onclickonIdle:function(){
        this.type="idle";
        if(!this.$route.params.clientid){
          projectclass.getprojectBystatus("idle").then(doc=>{
              this.joinarr=doc.data;
              this.searched = doc.data;
          })
          }
           else{
          projectclass.getprojectbyclientidstatus(this.$route.params.clientid,"idle").then(doc=>{
              this.joinarr=doc.data;
              this.searched = doc.data;
          })
        }
      },
      onclickall:function(){
        if(!this.$route.params.clientid){
           dashboardclass.getAllProject().then(doc=>{
            this.joinarr=doc.data;
            this.searched = doc.data;
          })
        }
        else{
          projectclass.getprojectbyclientid(this.$route.params.clientid).then(doc=>{
            this.joinarr = doc.data;
            this.searched = doc.data;
          })
        }
    },
    searchOnTable () {
      this.searched = searchByName(this.joinarr, this.search)
    },
    onedit:function(id){
        this.$router.push({path:"/projectEdit/" + id});
    }
  }
}
</script>

<style lang="scss" scoped>
.md-field {
    max-width: 350px;
  }

  tr:hover{
      background-color: f1f1f1;
  }
  th,td{
      font-size:14px;
      font-family:'Times New Roman', Times, serif;
      font-style: fa-bold;
  }
 button{
     border-radius:10px;
 }
 a[disabled=disabled] {
  pointer-events: none;
  opacity: 0.4;
}
</style>
