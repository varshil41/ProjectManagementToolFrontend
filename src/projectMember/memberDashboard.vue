<template>
<div>
<membermenu></membermenu>
        <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2></a>Dashboard</h2>
                            <ul class="breadcrumb">
                                <li style="margin-top:5px;" class="breadcrumb-item"><router-link to=""><i class="icon-home"></i></router-link>
                                </li>
                                <li style="margin-top:5px;"  class="breadcrumb-item active">Dashboard</li>
                            </ul>
                        </div>

                    </div>
                </div>
                      <div class="row clearfix">

                <div style="cursor:context-menu;" class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card text-center bg-warning">
                            <div class="body">
                                <div class="p-15 text-light">
                                    <h3>{{idleprojectcnt}}</h3>
                                    <span>Idle Projects</span>
                                </div>
                            </div>
                        </div>
                </div>

                    <div style="cursor:context-menu;" class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card text-center bg-info">
                            <div class="body">
                                <div class="p-15 text-light">
                                    <h3>{{OnGoingProjectCnt}}</h3>
                                    <span>Ongoing Projects</span>
                                </div>
                            </div>
                        </div>
                 </div>
                 <div style="cursor:context-menu;" class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card text-center bg-secondary">
                            <div class="body">
                                <div class="p-15 text-light">
                                    <h3>{{readytodeployProjectCnt}}</h3>
                                    <span>Ready to deploy Projects</span>
                                </div>
                            </div>
                        </div>
                  </div>

                    <div style="cursor:context-menu;" class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card text-center bg-dark">
                            <div class="body">
                                <div class="p-15 text-light">
                                    <h3>{{highpriorityissuecnt}}</h3>
                                    <span>Urgent issues</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 col-md-7">
                        <div class="card">
                            <div class="header">
                                <h2>Project wise Module Details</h2>
                            </div>
                            <div class="body">
                             <div class="col-lg-12 col-md-12 col-sm-12">

                  <div id="app">
                      <fusioncharts
                      :type="type"
                      :width="width"
                      :height="height"
                      :dataFormat="dataFormat"
                      :dataSource="dataSource"
                      ></fusioncharts>
                  </div>
                    </div>

                            <br>
                                <button style="font-size:15px;" v-for="(item,id) in joinarr" v-bind:key="id" @click="onbutton(item.projectId)">{{item.projectName}}</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <div class="card">
                            <div class="header">
                                <h2>High Priority Issues</h2>
                            </div>
                            <p v-if="issuearr.length==0" style="text-align:center;font-size:15px;color:red;"><b>&nbsp; No any high priority Issues ...</b></p>

                            <div v-else class="body todo_list">
                                <ul class="list-unstyled">

                                    <li @click="onhighissue(item.issueId)" v-for="(item,id) in issuearr" v-bind:key="id">
                                        <div style = "cursor:pointer;" class="m-l-35 m-b-30">
                                            <small style="font-size:15px;"><b>project Name:- {{item.projectName}}</b></small><br>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small>ModuleName :- {{item.moduleName}}</small><br>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small>IssueTitle :- {{item.issueTitle}}</small><br>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small>issue Date :-{{item.issueTime | moment("Do MMMM YYYY")}}</small><br>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                    <div class="row clearfix">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="card">

                            <div class="body">
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12">
                                        <div class="card">
                                        <div class="header">
                                            <h2 style="font-size:20px;"><b><span class="blinking">Your Ongoing Project List</span></b></h2>
                                        </div>
                                        <div class="body project_report">
                                            <div class="table-responsive">
                                            <span v-if="joinarr.length==0" style="font-style:'serif';margin-left:35%;color:orange;">Sorry, you dont have any ongoing projects</span>
                                  <md-table v-if="joinarr.length!=0" v-model="searched" md-sort="name" md-sort-order="asc" md-card>

                                  <md-table-toolbar>

                                  <md-field md-clearable class="md-toolbar-section-end">
                                      <md-input style="border:1px solid lightgrey;font-family:'Times New Roman', Times, serif;" placeholder=" Search by project name..." v-model="search" @input="searchOnTable" />
                                  </md-field>
                                  </md-table-toolbar>

                                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="Project Name" md-sort-by="projectName" style="text-transform: uppercase;"><span style="color:black;"><b>{{ item.projectName}}</b></span></md-table-cell>
                                    <md-table-cell md-label="Start Date" md-sort-by="projectStartDate">{{ item.projectStartDate | moment("Do MMMM YYYY")}}</md-table-cell>
                                    <md-table-cell md-label="Deadline" md-sort-by="projectDeadline"><span style="color:red;">{{item.projectDeadline | moment("Do MMMM YYYY")}}</span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='inprogress'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-success"><strong>{{item.projectStatus}}</strong></span></md-table-cell>
                                    <md-table-cell md-label="More Details">
                                         <router-link v-bind:to="'/memberprojectdetails/' + item.projectId"  class="btn btn-sm btn-outline-success">Details</router-link>
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

import dashboardclass from '../services/LeaderMemberDashboard'
import module from '../services/module'
import submoduleclass from '../services/submodule';
import issue from '../services/issue';
var dataSource=
  {
  "chart": {
    "caption": "OnGoing Project Module's Status",
    "xAxisName": "Module Name",
    "yAxisName": "Status",
    "numberSuffix": "%",
    "theme": "fusion"
  },
  "data":[],
}

export default {
  data:function(){
    return{

        width: '100%',
        height: '300',
        type: 'column2d',
        dataFormat: 'json',
        dataSource: dataSource,

    search: null,
    searched: [],


      emailId:'',
      readytodeployProjectCnt:'',
      OnGoingProjectCnt:'',
      highpriorityissuecnt:'',
      idleprojectcnt:'',
      pendingissuecnt:'',
      issuearr:[{}],
      modulearr:[],
      joinarr:[],
      lblarr:[],
      srarr:[],
     }
  },
  destroyed(){
      this.onlabeladd();
  },
  created(){
    this.emailId = this.$route.params.email;
    dashboardclass.getProjectDeatailsCOUNT(localStorage.getItem('empId'),"inprogress").then(doc=>{
                this.OnGoingProjectCnt=doc.data[0].cnt;
    })

    dashboardclass.getProjectDeatailsCOUNT(localStorage.getItem('empId'),"Ready to deploy").then(doc=>{
                this.readytodeployProjectCnt=doc.data[0].cnt;
    })

    dashboardclass.getProjectDeatailsCOUNT(localStorage.getItem('empId'),"idle").then(doc=>{
                this.idleprojectcnt=doc.data[0].cnt;
    })

    dashboardclass.getongoingProjectDeatails(localStorage.getItem('empId'),"inprogress").then(doc=>{
        this.joinarr=doc.data;
        this.searched=doc.data;
        if(doc.data.length!=0)
        {
            this.onlabeladd();
        }
        else{
            dataSource.data=[];
        }
        module.getModuleByProjectId(this.joinarr[0].projectId).then(doc1=>{
            dataSource.data.splice(doc1.data.length,(10 - doc1.data.length));
            for(let i=0;i<doc1.data.length;i++){
                      dataSource.data[i].label = doc1.data[i].moduleName;
                      submoduleclass.getSubModuleByModuleId(doc1.data[i].moduleId).then(submodule=>{
                      dataSource.data[i].value = submodule.data[0].result;
              })

            }
        })
  })

    // dashboardclass.getHighpriorityIssueCount(localStorage.getItem('empId'),"pending","high").then(doc=>{
    //     this.highpriorityissuecnt=doc.data[0].cnt;
    // })


    dashboardclass.getPendingissueCount(localStorage.getItem('empId'),"pending").then(doc=>{
        this.pendingissuecnt=doc.data[0].cnt;
    })

    issue.highissue(localStorage.getItem('empId')).then(doc=>{
        this.issuearr = doc.data;
        this.highpriorityissuecnt=doc.data.length;
    })
 },
 methods:{
     onlabeladd:function(){
        dataSource.data = [{
             label:null,
             value:null,
             },
             {
             label:null,
             value:null,
             },
             {
             label:null,
             value:null,
             },
             {
             label:null,
             value:null,
             },
             {
             label:null,
             value:null,
             },
             {
             label:null,
             value:null,
             },
             {
             label:null,
             value:null,
             },
             {
             label:null,
             value:null,
             },
             {
             label:null,
             value:null,
             },
             {
             label:null,
             value:null,
             }]
     },
     onbutton:function(id){
          this.onlabeladd();
          module.getModuleByProjectId(id).then(doc=>{
            dataSource.data.splice(doc.data.length,(dataSource.data.length-doc.data.length));
            for(let i=0;i<doc.data.length;i++)
             {
                        dataSource.data[i].label = doc.data[i].moduleName;
                        submoduleclass.getSubModuleByModuleId(doc.data[i].moduleId).then(doc=>{
                        dataSource.data[i].value = doc.data[0].result;
                        if(dataSource.data[i].value == null) dataSource.data[i].value = 0;
              })
             }
    })

      },
     searchOnTable () {
        this.searched = searchByName(this.joinarr, this.search)
    },
    onhighissue:function(issueid){
        this.$router.push({path:'/memberissuechat/'+issueid});
    }
 },
}
</script>

<style scoped>
button {
  background-color: #b0e0e6; /* Green background */
  padding: 10px 24px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  border-radius:10px;
  font-family: serif;
  margin-left:10px;
}

/* Clear floats (clearfix hack) */
.btn-group:after {
  content: "";
  clear: both;
  display: table;
}

.btn-group button:not(:last-child) {
  border-right: none; /* Prevent double borders */
}

/* Add a background color on hover */
button:hover {
  background-color:#01b2c6  ;
}

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

 	.blink{
		width:200px;
		height: 50px;
		padding: 15px;
		text-align: center;
		line-height: 50px;
    animation: blink 1s linear infinite;
	}

@keyframes blink{
0%{opacity: 0;}
50%{opacity: .5;}
100%{opacity: 1;}
}
</style>
