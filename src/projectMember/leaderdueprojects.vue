<template>
 <div>
   <membermenu></membermenu>
           <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2><a href="javascript:void(0);"></a>Due Project Submission</h2>
                            <ul class="breadcrumb">
                                <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                                <li style="margin-top:5px;" class="breadcrumb-item active">Due Project Submission</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="row clearfix" v-if="projectarr.length==0">
                                    <div class="col-sm-12">
                                        <div class="card" >
                                            <div class="body text-left pro-img">
                                                <img src="../assets/images/nodueproject.png" style="height:350px;margin-left:20%;">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        <div class="card" v-if="projectarr.length!=0">

                            <div class="body project_report">
                                <div class="table-responsive" v-if="projectarr.length!=0">

                                  <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>
                                  <br>
                                    <md-table-row  slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="Project Name" style="text-transform: uppercase;" v-if="item.projectStatus=='Ready to deploy' && item.leaderId == empId" md-sort-by="projectName"><span style="color:black;"><b>{{ item.projectName}}</b></span><label style="color:blue;font-size:12px;">&nbsp;(Leader)</label></md-table-cell>
                                    <md-table-cell md-label="Project Domain" md-sort-by="projectDomain" v-if="item.projectStatus=='Ready to deploy' && item.leaderId == empId">{{ item.projectDomain}}</md-table-cell>
                                    <md-table-cell md-label="Deadline" md-sort-by="projectDeadline" v-if="item.projectStatus=='Ready to deploy' && item.leaderId == empId"><span style="color:red;">{{item.projectDeadline | moment("Do MMMM YYYY")}}</span></md-table-cell>

                                    <md-table-cell v-if="item.projectStatus=='Ready to deploy' && item.leaderId == empId" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-warning"><strong>{{item.projectStatus}}</strong></span></md-table-cell>

                                    <md-table-cell md-label="Details">
                                    <button v-if="item.projectStatus=='Ready to deploy' && item.leaderId == empId" @click="ondetails(item.projectId)" class="btn btn-sm btn-outline-success">Details</button>
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

      for(let i=0;i<doc.data.length;i++)  {
          if(doc.data[i].projectStatus=='Ready to deploy' && doc.data[i].leaderId==this.empId)
          {
              this.projectarr.push(doc.data[i]);
          }
      }
    //   this.projectarr = doc.data;
      console.log(this.projectarr);
      this.searched=this.projectarr;
      this.projectarr.splice(0,1);
    })
  },
  methods:{

    onclickreadytodeploy:function(){
        project.getprojectBystatusandempid("Ready to deploy",this.empId).then(doc=>{
          this.projectarr = doc.data;
          this.searched=doc.data;
          this.type='Ready to deploy'
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
