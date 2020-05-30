<template>
  <div>
    <menu1></menu1>
         <div id="main-content">
            <div class="container-fluid">
                <div class="block-header">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-12">
                            <h2>Update Your Profile</h2>
                            <ul class="breadcrumb">
                                <li style="margin-top:5px;" class="breadcrumb-item"><router-link to="/memberDashboard"><i class="icon-home"></i></router-link>
                                <li style="margin-top:5px;" class="breadcrumb-item">Profile</li>
                                <li style="margin-top:5px;" class="breadcrumb-item">View Profile</li>
                                <li style="margin-top:5px;" class="breadcrumb-item active">Edit Profile</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="row clearfix">
                    <div class="col-12">
                        <div class="card">
                            <div class="body">
                                <div style="margin-left:20%;" class="row clearfix">
                                    <div class="col-sm-8">
                                        <div class="form-group">
                                            <input type="text" @input="onfname" id="fname" class="form-control" placeholder="First Name" v-model="emparr.empFirstName">
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="form-group">
                                            <input type="text" @input="onmname" id="mname" class="form-control" placeholder="Middle Name"  v-model="emparr.empMiddleName">
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="form-group">
                                            <input type="text" @input="onlname" id="lname" class="form-control" placeholder="Last Name"  v-model="emparr.empLastName">
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="form-group">
                                            <input disabled type="email" id="email" class="form-control" placeholder="Email ID *"  v-model="emparr.empEmailId">
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="form-group">
                                            <input type="tel" maxlength="10" class="js-input-mobile form-control" @input="onmno" id="mno"  placeholder="Mobile No"  v-model="emparr.empContactNo">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                <button style="width:50%;margin-left:50%;" type="button" @click="Onupdate" class="btn btn-primary">Update</button>
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
import employee from '../services/employee'
export default {
    data:function(){
      return{
        empId:'',
        emparr:{},
        mflag:false,
      }
    },
    created(){
      employee.getempbyid(localStorage.getItem('empId')).then(doc=>{
        this.emparr = doc.data[0];
        console.log(this.emparr);
      })
    },
    methods:{
      onfname:function(){
         document.getElementById("fname").style = "border-color:lightgrey;"
      },
      onmname:function(){
         document.getElementById("mname").style = "border-color:lightgrey;"
      },
      onlname:function(){
         document.getElementById("lname").style = "border-color:lightgrey;"
      },
      onmno:function(event){
        $('body').on('keyup', '.js-input-mobile', function () {
        var $input = $(this),
        value = $input.val(),
        length = value.length,
        inputCharacter = parseInt(value.slice(-1));

        if (!((length > 0 && inputCharacter >= 0 && inputCharacter <= 10) || (length === 1 && inputCharacter >= 7 && inputCharacter <= 10))) {
            $input.val(value.substring(0, length - 1));
        }
        });
        document.getElementById("mno").style = "border-color:lightgrey;"
      },
      Onupdate:function(){

        if(document.getElementById("fname").value == ""){
            document.getElementById("fname").focus();
            document.getElementById("fname").style = "border-color:red;"
        }
        else if(document.getElementById("mname").value == ""){
            document.getElementById("mname").focus();
            document.getElementById("mname").style = "border-color:red;"
        }
        else if(document.getElementById("lname").value == ""){
            document.getElementById("lname").focus();
            document.getElementById("lname").style = "border-color:red;"
        }
         else if(document.getElementById("mno").value.length != 10){
            document.getElementById("mno").focus();
            document.getElementById("mno").style = "border-color:red;"
        }

        else{
        employee.updateemp(this.emparr).then(doc=>{
          console.log(doc.data);
          this.$fire({
                title: "Profile updated successfully",
                type: "success",
                timer: 3000
                }).then(r => {
                console.log(r.value);
           });
          this.$router.push("/profile");
        })
      }
      }
    }

}
</script>
