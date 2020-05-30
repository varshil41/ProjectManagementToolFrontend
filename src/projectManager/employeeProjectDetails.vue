<template>
<div>
  <menu1></menu1>
   <div id="main-content" class="profilepage_1">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>Your projects list</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard"><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item">{{clientName}}</li>
                                <li class="breadcrumb-item active">Project details</li>
                            </ul>
                        </div>

                    </div>
                </div>

                  <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="body">
                                <h5>Idle Projects </h5>
                                <br>
                                <td v-if="projectIdle.length==0" style="font-size:15px; text-align:center;color:red;font-family: serif;"><i class="fa fa-bell-slash" aria-hidden="true"></i> No idle projects ...</td>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-6 col-sm-12"  v-for="(item,id) in projectIdle" v-bind:key="id">
                                        <div class="card border">
                                            <div class="body text-left pro-img">
                                                <img class="mx-auto d-block mb-3" src="../assets/images/projects/01.png"
                                                    alt="">
                                                <h6 class="project-title text-primary mb-3"><a
                                                        href="project-detail.html">{{item.projectName}}</a></h6>
                                                <p>{{item.projectDescription}}</p>
                                          <button @click="onprojectdetails(item.projectId)" class="button button1">Project Details</button>


                                            </div>
                                        </div>
                                    </div>
                              </div>


                            </div>
                        </div>

                    </div>

                </div>



                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="body">
                                <h5>Ongoing Projects </h5>
                                <br>
                                <span v-if="projectOngoing.length==0" style="font-size:17px;margin-left:40%;text-align:center;color:red;font-family: serif;">No ongoing projects ...</span>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-6 col-sm-12"  v-for="(item,id) in projectOngoing" v-bind:key="id">
                                        <div class="card border">
                                            <div class="body text-left pro-img">
                                                <img class="mx-auto d-block mb-3" src="../assets/images/projects/01.png"
                                                    alt="">
                                                <h6 class="project-title text-primary mb-3"><a
                                                        href="project-detail.html">{{item.projectName}}</a></h6>
                                                <p>{{item.projectDescription}}</p>
                                          <button @click="onprojectdetails(item.projectId)" class="button button1">Project Details</button>


                                            </div>
                                        </div>
                                    </div>
                              </div>


                            </div>
                        </div>

                    </div>

                </div>


                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="body">
                                <h5>Ready to deploy Projects </h5>
                                <br>
                                <span v-if="projectreadytodeploy.length==0" style="font-size:17px;margin-left:40%;text-align:center;color:red;font-family: serif;">No data ...</span>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-6 col-sm-12"  v-for="(item,id) in projectreadytodeploy" v-bind:key="id" >
                                        <div class="card border">
                                            <div class="body text-left pro-img">
                                                <img class="mx-auto d-block mb-3" src="../assets/images/projects/01.png"
                                                    alt="">
                                                <h6 class="project-title text-primary mb-3"><a
                                                        href="project-detail.html">{{item.projectName}}</a></h6>
                                                 <p>{{item.projectDescription}}</p>
                                                  <button @click="onprojectdetails(item.projectId)" class="button button1">View Projects</button>


                                            </div>
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>

                    </div>

                </div>

               <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <div class="card">
                            <div class="body">
                                <h5>Deploy Projects </h5>
                                <br>
                                <span v-if="projectdeploy.length==0" style="font-size:17px;margin-left:40%;text-align:center;color:red;font-family: serif;">No Deployed projects ...</span>

                                <div class="row clearfix">
                                    <div class="col-lg-3 col-md-6 col-sm-12"  v-for="(item,id) in projectdeploy" v-bind:key="id" >
                                        <div class="card border">
                                            <div class="body text-left pro-img">
                                                <img class="mx-auto d-block mb-3" src="../assets/images/projects/01.png"
                                                    alt="">
                                                <h6 class="project-title text-primary mb-3"><a
                                                        href="project-detail.html">{{item.projectName}}</a></h6>
                                                 <p>{{item.projectDescription}}</p>
                                                  <button @click="onprojectdetails(item.projectId
                                                  )" class="button button1">View Projects</button>


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
import project from '../services/project'
import emp from '../services/employee'
import employee from '../services/employee'
import moduleclass from '../services/module'
export default {
  data:function(){
    return{
      projectOngoing:[{}],
      projectIdle:[{}],
      projectreadytodeploy:[{}],
      projectdeploy:[{}],
      clientName:'',

    }
  },
  created(){

    employee.getempbyid(this.$route.params.empId).then(doc=>{
      this.clientName = doc.data[0].empFirstName + " " +  doc.data[0].empLastName
    })

    project.getprojectbyempid(this.$route.params.empId).then(doc=>{
          for(let i=0;i<doc.data.length;i++){
            if(doc.data[i].projectStatus == "inprogress"){
               this.projectOngoing.push(doc.data[i]);
            }
            else if(doc.data[i].projectStatus == "Ready to deploy"){
              this.projectreadytodeploy.push(doc.data[i]);
            }
            else if(doc.data[i].projectStatus == "idle"){
              this.projectIdle.push(doc.data[i]);
            }
            else if(doc.data[i].projectStatus == "Deployed"){
              this.projectdeploy.push(doc.data[i]);
            }

         }
    })
    this.projectOngoing.splice(0,1);
    this.projectreadytodeploy.splice(0,1);
    this.projectIdle.splice(0,1);
    this.projectdeploy.splice(0,1);
    this.projectongoingcal.splice(0,1);
    this.projectreadytodeploycal.splice(0,1);
    this.projectidlecal.splice(0,1);

  },
  methods:{
    onprojectdetails:function(id){
              this.$router.push({path:'/projectdetails/' + id});
    },
  },


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
  margin: 10px 1px 10px 30px;
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
