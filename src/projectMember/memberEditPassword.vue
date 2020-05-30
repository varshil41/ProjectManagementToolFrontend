<template>
  <div>
    <membermenu></membermenu>
         <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>Update Your Password</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                                <li class="breadcrumb-item">Memberprofile</li>
                                <li class="breadcrumb-item active">EditPassword</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-12">
                        <div class="card">
                            <div class="body">
                                <div class="row clearfix">
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Enter Your Existing Password *" v-model="enteredpassword">
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-12">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Enter Your New Password"  v-model="newpassword">
                                        </div>
                                    </div>
                                </div>
                                <button type="button" @click="Onupdate" class="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>

</template>

<script>
import employee from '../services/employee'
export default {
    data:function(){
      return{
        empId:'',
        enteredpassword:'',
        newpassword:'',
        emparr:{},
      }
    },
    created(){
      employee.getempbyid(localStorage.getItem('empId')).then(doc=>{
        this.emparr = doc.data[0];
      })
    },
    methods:{
      Onupdate:function(){
        employee.getempbyid(localStorage.getItem('empId')).then(doc=>{
        if(this.enteredpassword==doc.data[0].empPassword)
        {
            this.emparr=doc.data[0];
            this.emparr.empPassword=this.newpassword;
            employee.updateemppassword(this.emparr).then(doc=>{
            alert("updated");
            this.$router.push("/profile");
            })
        }
        else
        {
            alert("Entered Password Was not registered..please Write Correct password to Update new password");
        }
        })
     }
    }

}
</script>
