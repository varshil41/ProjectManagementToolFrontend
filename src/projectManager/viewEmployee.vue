<template>
<div>
  <menu1></menu1>
        <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>View Employee</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard"><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item active">Employee / View Employee</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="row clearfix">
                  <div class="tab-content" id="option-tabContent">
                        <div class="tab-pane fade show active" id="pills-option1" role="tabpanel"
                            aria-labelledby="pills-option1-tab">
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12"  v-for="(item,id) in empArr" v-bind:key="id">
                                    <div class="card">
                                        <div class="body text-center">
                                            <div class="team-lead">
                                                <img class="rounded-circle img-thumbnail mx-auto d-block mb-2"
                                                 style="height:150px; width:120px;"   v-bind:src="'http://localhost:3000/images/Employees/' + item.empProfile" alt="">
                                                <h6 class="project-title text-primary mb-2 font-15">{{item.empFirstName}} {{item.empMiddleName}} {{item.empLastName}}
                                                </h6>
                                                <p class="font-13">{{item.workAreaType}}</p>
                                            <p class="font-13">{{item.empEmailId}}</p>
                                            </div>
                                            <p class="pt-0 mb-0 font-16"><small><a> {{item.empContactNo}} </a> </small></p>
                                            <p class="pt-0 mb-0 font-16">
                                            <button @click="onprojectdetails(item.empId)" class="button button1">View Projects</button>
                                            </p>
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
import emp from '../services/employee'
export default {
  data:function(){
    return{
      empArr:[{}],

    }
  },
  created(){
    emp.getallemp().then(doc=>{
        this.empArr = doc.data;
    })
  },
  methods:{
    onprojectdetails:function(id){
        this.$router.push({path:'/empprojectdetails/' + id});
    },

  }
}
</script>

<style scoped>

.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 3px 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 10px 1px;
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

</style>
