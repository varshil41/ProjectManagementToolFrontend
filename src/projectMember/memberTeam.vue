<template>
<div>
        <membermenu></membermenu>
        <div id="main-content">
        <div class="container-fluid">
            <div class="block-header">
                <div class="row">
                    <div class="col-lg-6 col-md-8 col-sm-12">
                        <h2><a href="javascript:void(0);"></a> {{header}}</h2>
                        <ul class="breadcrumb">
                            <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                            <li style="margin-top:5px;" class="breadcrumb-item">{{subheader}}</li>
                        </ul>
                    </div>

                </div>
            </div>

            <div class="row clearfix">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="body">

                                  <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12">
                                        <div class="card">
                                        <router-link to="/memberprojectview"><i class="fa fa-arrow-left" style="float:left;width:20px;"></i></router-link>
                                        <div class="body project_report">
                                            <div class="table-responsive">

                                  <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>


                                  <md-table-toolbar>

                                  <md-field md-clearable class="md-toolbar-section-end">
                                      <md-input style="border:1px solid lightgrey;font-family:'Times New Roman', Times, serif;" placeholder=" Search by project name..." v-model="search" @input="searchOnTable" />
                                  </md-field>
                                  </md-table-toolbar>


                                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="Profile" md-sort-by="empImg" ><img  v-bind:src="'http://localhost:3000/images/Employees/' + item.empProfile" style="height:50px;width:50px;" class="rounded-circle avatar" alt=""></md-table-cell>
                                    <md-table-cell v-if="item.empId == leaderId" md-label="Member Name" md-sort-by="empFirstName" style="text-transform: uppercase;"><span style="color:black;"><b>{{ item.empFirstName}}&nbsp;{{ item.empLastName}}</b></span><label style="color:blue;font-size:12px;">&nbsp;(Leader)</label></md-table-cell>
                                    <md-table-cell v-else md-label="Member Name" md-sort-by="empFirstName" style="text-transform: uppercase;"><span style="color:black;"><b>{{ item.empFirstName}}&nbsp;{{ item.empLastName}}</b></span></md-table-cell>
                                    <md-table-cell md-label="Email_id" md-sort-by="empEmailId"><span style="font-size:15px;">{{ item.empEmailId}}</span></md-table-cell>
                                    <md-table-cell md-label="contact No." md-sort-by="empContactNo"><span style="font-size:15px;">{{item.empContactNo}}</span></md-table-cell>
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
</div>
</template>

<script>

  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.empFirstName).includes(toLower(term)))
    }

    return items
  }

import team from '../services/Team'
import emp from '../services/employee'
export default {
    data:function(){
        return{
            projectId:'',
            empId:'',
            teamarr:[{}],
            moduleId:'',
            flag:true,
            search: null,
            leaderId:'',
            searched: [],
            header:'',
            subheader:''

        }
    },
    created(){
        this.projectId = this.$route.params.projectId;
        this.moduleId = this.$route.params.moduleId;
        this.empId = localStorage.getItem('empId');
        this.leaderId = localStorage.getItem('leaderId');

        if(!this.moduleId){
           team.getteamByprojectID(this.projectId).then(doc=>{
            this.teamarr = doc.data;
            this.searched=doc.data;
            this.header = "Team Details"
            this.subheader = "Project / View Projects / Project Details / Team Details"
        })
        }

        else{
           this.flag = false;
           emp.getempbymoduleid(this.moduleId).then(doc=>{
             this.teamarr = doc.data;
             this.searched=doc.data;
             this.header = "Module Members"
             this.subheader = "Project / View Projects / Project Details / View Modules / Module Members"


           })
        }
    },
    methods:{
        searchOnTable () {
        this.searched = searchByName(this.teamarr, this.search)
        },
    }
}
</script>
