<template>
<div>
    <menu1></menu1>
        <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>Dashboard</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to=""><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item active">Dashboard</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row clearfix">
                    <div style="cursor:context-menu;" class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card text-center bg-info">
                            <div class="body">
                                <div class="p-15 text-light">
                                    <h3>{{readytodeployProjectCnt}}</h3>
                                    <span style="font-size:15px;font-family:serif;">Ready to deploy Projects</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="cursor:context-menu;" class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card text-center bg-secondary">
                            <div class="body">
                                <div class="p-15 text-light">
                                    <h3>{{OnGoingProjectCnt}}</h3>
                                    <span style="font-size:15px;font-family:serif;">Ongoing Projects</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="cursor:context-menu;" class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card text-center bg-warning">
                            <div class="body">
                                <div class="p-15 text-light">
                                    <h3>{{clientcnt}}</h3>
                                    <span style="font-size:15px;font-family:serif;">Total Clients</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="cursor:context-menu;" class="col-lg-3 col-md-6 col-sm-6">
                        <div class="card text-center bg-dark">
                            <div class="body">
                                <div class="p-15 text-light">
                                    <h3>{{empcnt}}</h3>
                                    <span style="font-size:15px;font-family:serif;">Total Employees</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Work report Chart -->
                <div class="row clearfix">
                                      <div class="col-lg-6 col-md-6 col-sm-12">

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

                    <div class="card text-center col-lg-6 col-md-6 col-sm-12">
                        <div class="body">
                            <h5 >Developers </h5>
                          <div id="chart">
                                    <apexchart type="pie" width="480" :options="chartOptions" :labels="chartOptions.labels" :series="series"></apexchart>
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
                                            <h2>Ongoing Project List</h2>
                                        </div>
                                        <div class="body project_report">
                                            <div class="table-responsive">
                                    <p v-if="searched.length==0" style="text-align:center;font-size:15px;color:red;"><b><i style="font-size:15px;" class="fa fa-bell-slash" aria-hidden="true"></i>&nbsp; No Ongoing Projects ...</b></p>
                                   <md-table v-else v-model="searched" md-sort="name" md-sort-order="asc" md-card>

                                  <md-table-toolbar>
                                  <md-field md-clearable class="md-toolbar-section-end">
                                      <md-input style="border:1px solid lightgrey;font-family:'Times New Roman', Times, serif;" placeholder=" Search by project name..." v-model="search" @input="searchOnTable" />
                                  </md-field>
                                  </md-table-toolbar>

                                    <md-table-row style="cursor:pointer;" @click="onclick(item.projectId)" slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="Project Name" md-sort-by="projectName" style="text-transform: uppercase;"><span style="color:black;"><b>{{ item.projectName}}</b></span></md-table-cell>

                                    <md-table-cell md-label="Client Info." md-sort-by="clientFirstName">{{ item.clientOrgName}}</md-table-cell>
                                    <md-table-cell md-label="Start Date" md-sort-by="projectStartDate">{{ item.projectStartDate | moment("Do MMMM YYYY")}}</md-table-cell>
                                    <md-table-cell md-label="Deadline" md-sort-by="projectDeadline"><span style="color:red;">{{item.projectDeadline | moment("Do MMMM YYYY")}}</span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='inprogress'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-success"><strong>{{item.projectStatus}}</strong></span></md-table-cell>
                                    <md-table-cell v-if="item.projectStatus=='Ready to deploy'" md-label="Status" md-sort-by="projectStatus"><span class="badge badge-warning"><strong>{{item.projectStatus}}</strong></span></md-table-cell>
                                    <md-table-cell md-label="More Details">
                                         <router-link v-bind:to="'/projectdetails/' + item.projectId"  class="btn btn-sm btn-outline-success">Details</router-link>
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


import dashboardclass from '../services/Dashboard'
import workarea from '../services/workarea'



var dataSource=
  {
  "chart": {
    "caption": "Number Of Projects Received [2020-21]",
    "xAxisName": "Months",
    "yAxisName": "Projects",
    "numberSuffix": "",
    "theme": "fusion"
  },
  "data": [
    {
      "label": "Jan",
      "value": 0
    },
    {
      "label": "Feb",
      "value": 0
    },
    {
      "label": "Mar",
      "value": 0
    },
    {
      "label": "Apr",
      "value": 0
    },
    {
      "label": "May",
      "value": 0
    },
    {
      "label": "Jun",
      "value": 0
    },
    {
      "label": "Jul",
      "value": 0
    },
    {
      "label": "Aug",
      "value": 0
    },
    {
      "label": "Sep",
      "value": 0
    },
    {
      "label": "Oct",
      "value": 0
    },
    {
      "label": "Nov",
      "value": 0
    },
    {
      "label": "Dec",
      "value": 0
    },
  ]
}
export default {
  data:function(){
    return{

        width: '100%',
        height: '400',
        type: 'column3d',
        dataFormat: 'json',
        dataSource: dataSource,



      search: null,
      searched: [],
      emailId:'',
      count:[],
      empcnt:'',
      clientcnt:'',
      readytodeployProjectCnt:'',
      OnGoingProjectCnt:'',
      projectDates:[],
      joinarr:[{}],
      webDev:'',
      sofDev:'',
      appDev:'',
      tester:'',
      deskDev:'',
          series: [],
          chartOptions: {
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: [],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },


          series1: [{
              name: "projectss",
              data: []
          }],
         chartOptions1: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: '',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
            }
          },
    }
  },
  created(){


    /*
    console.log(this.series1[0].data[0]); */
    this.emailId = this.$route.params.email;

    dashboardclass.getEmpcount().then(doc=>{
      this.empcnt = doc.data[0].cnt;

    })

    dashboardclass.getClientcount().then(doc=>{
      this.clientcnt = doc.data[0].cnt;
    })

    dashboardclass.getProjectcount("Ready to deploy").then(doc=>{
      this.readytodeployProjectCnt = doc.data.length;
    })

    dashboardclass.getProjectcount("inprogress").then(doc=>{
      this.OnGoingProjectCnt = doc.data.length;
    })
    dashboardclass.getAllProject().then(doc=>{
        console.log(doc);
        var pos=0;;

        for(let i=0;i<doc.data.length;i++)
        {
            if(doc.data[i].projectStatus == 'inprogress'){
            this.joinarr[pos]=doc.data[i];
            this.searched[pos] = doc.data[i];
            pos++;
            }
        }

    })

    dashboardclass.getEmployeeType("1").then(doc=>{
      this.webDev = doc.data.length;
      this.chartOptions.labels.push("Web Developer");
      this.series.push(doc.data.length);
    })

    dashboardclass.getEmployeeType("2").then(doc=>{
      this.tester = doc.data.length;
      this.chartOptions.labels.push("Desktop Developer");
         this.series.push(doc.data.length);
    })

    dashboardclass.getEmployeeType("3").then(doc=>{
      this.sofDev = doc.data.length;
      this.chartOptions.labels.push("IOS Developer");
         this.series.push(doc.data.length);
    })

    dashboardclass.getEmployeeType("4").then(doc=>{
      this.deskDev = doc.data.length;
      this.chartOptions.labels.push("Android Developer");
         this.series.push(doc.data.length);
    })

    dashboardclass.getEmployeeType("5").then(doc=>{
      this.appDev = doc.data.length;
      this.chartOptions.labels.push("QA Testers");
         this.series.push(doc.data.length);
    })

    for(let i=0;i<12;i++){
        dashboardclass.getProjectDateCount(i).then(doc=>{
            dataSource.data[i].value = doc.data[0].count;
       /*       this.series1[0].data[i] = doc.data[0].count;
       */  })
    }
 },
 methods:{
    searchOnTable () {
        this.searched = searchByName(this.joinarr, this.search)
    },
    onclick:function(projectid){
      this.$router.push({path:'/projectdetails/' + projectid});
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

</style>
