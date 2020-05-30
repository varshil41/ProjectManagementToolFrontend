<template>
  <div>
    <menu1></menu1>
         <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2><a href="javascript:void(0);" class="btn btn-xs btn-link btn-toggle-fullwidth"><i
                                        class="fa fa-arrow-left"></i></a> Update Your Password</h2>
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard"><i class="icon-home"></i></router-link></li>
                                <li class="breadcrumb-item">Employee</li>
                                <li class="breadcrumb-item">profile</li>
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
                                            <input type="text" class="form-control" placeholder="Middle Name"  v-model="newpassword">
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
        console.log(this.emparr);
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
            console.log(doc.data);
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
