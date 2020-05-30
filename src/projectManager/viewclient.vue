<template>
  <div>
    <menu1></menu1>
   <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>Clients List</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard"><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item">Clients</li>
                                <li class="breadcrumb-item active">View Client</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <!-- <div class="body project_report">
                                <div class="table-responsive">
                                  <input type="text" id="myInput" placeholder="Search for names.." title="Type in a name">
                                    <table class="table table-hover js-basic-example dataTable table-custom m-b-0">
                                            <tr>
                                                <th>ClientFullName</th>
                                                <th>EmailId</th>
                                                <th>ContactNo</th>
                                                <th>Organization</th>
                                                <th>Address</th>
                                            </tr>
                                        <tbody>
                                            <tr v-for="(item,id) in  clientArr" v-bind:key="id">
                                                <td class="project-title">
                                                  {{item.clientFirstName}} {{item.clientMiddleName}} {{item.clientLastName}}
                                                </td>
                                                <td>
                                                  {{item.clientEmailId}}
                                                </td>
                                                 <td>
                                                   {{item.clientContactNo}}
                                                </td>

                                                <td>
                                                   {{item.clientOrgName}}
                                                </td>

                                                <td>
                                                  {{item.clientAddress}}
                                                </td>
                                                <td class="project-actions">
                                                    <router-link v-bind:to="'/updateclient/' + item.clientId" class="btn btn-sm btn-outline-success"><i
                                                            class="icon-pencil"></i></router-link>
                                                    <button @click="ondetails(item.clientId)" class="button button1">View Projects</button>
                                                </td>
                                            </tr>
                                       </tbody>
                                    </table>
                                </div>
                            </div> -->

                                                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12">
                                        <div class="card">
                                        <div class="body project_report">
                                            <div class="table-responsive">

                                  <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>

                                  <md-table-toolbar>
                                  <md-field md-clearable class="md-toolbar-section-end">
                                      <md-input style="border:1px solid lightgrey;font-family:'Times New Roman', Times, serif;" placeholder=" Search by Client name..." v-model="search" @input="searchOnTable" />
                                  </md-field>
                                  </md-table-toolbar>

                                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="Client Name" md-sort-by="clientFirstName" style="text-transform: uppercase;"><b>{{item.clientFirstName}}&nbsp;{{item.clientLastName}}</b></md-table-cell>

                                    <md-table-cell md-label="Email_Id" md-sort-by="emailId">{{ item.clientEmailId}}</md-table-cell>
                                    <md-table-cell md-label="Contact No." md-sort-by="clientContactNo"><span>{{ item.clientContactNo}}</span></md-table-cell>
                                    <md-table-cell md-label="Firm Name" md-sort-by="clientOrgName">{{item.clientOrgName}}</md-table-cell>
                                    <md-table-cell md-label="Address" md-sort-by="clientAddress">{{item.clientAddress}}</md-table-cell>
                                    <md-table-cell md-label="Project List" md-sort-by="actions"><button @click="ondetails(item.clientId)" class="button button1">Projects</button></md-table-cell>
                                    <md-table-cell md-label="Edit" md-sort-by="actions"><router-link v-bind:to="'/updateclient/' + item.clientId" class="btn btn-sm btn-outline-success"><i class="icon-pencil"></i></router-link></md-table-cell>


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
</template>

<script>


const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.clientFirstName).includes(toLower(term)))
    }

    return items
  }
import client from '../services/client'
export default {
  data:function(){
    return{
      clientArr:[{}],
      search: null,
      searched: [],
    }
  },
  created(){
    client.getAllClient().then(doc=>{
      this.clientArr = doc.data;
      this.searched=doc.data;
    })
  },
  methods:{
    ondetails:function(id){
       this.$router.push({path:'/projectview/' + id});
    },
    searchOnTable() {
        this.searched = searchByName(this.clientArr, this.search)
    },
  }
}
</script>

<style scoped>
#myInput {
  background-image: url('/css/searchicon.png');
  background-position: 10px 12px;
  background-repeat: no-repeat;
  width: 30%;
  font-size: 15px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}
.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 3px 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 2px 1px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
}

  .button1:hover {
    background-color: #4CAF50;
    color: white;
  }
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
