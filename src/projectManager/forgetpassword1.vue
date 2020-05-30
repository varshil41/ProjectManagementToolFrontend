<template>
   <div class="theme-orange">
        <div id="wrapper">
		<div class="vertical-align-wrap">
			<div class="vertical-align-middle auth-main">
				<div class="auth-box">
                   <div class="top">
                        <img src="../assets/images/logologin.png" style="border-radius:30px;">
                    </div>
					<div class="card">
                        <div class="header">
                            <p class="lead">Reset your password</p>
                        </div>
                        <div class="body">
                            <form class="form-auth-small" name="f1" @submit.prevent="Onupdate">
                                <div class="form-group">
                                    <input type="password"  v-model="newpassword"  class="form-control"  placeholder="Enter new password"><br>
                                    <input type="password"  v-model="confirmpassword"  class="form-control"  placeholder="Confirm new password">
                                    <div id="emailerror" class="error-message"></div>
                                </div>
                                <button type="submit" @click="Onupdate" class="btn btn-primary btn-lg btn-block">RESET PASSWORD</button>
                                <div class="bottom">
                                    <span class="helper-text">Know your password? <router-link to="/">Login</router-link></span>
                                </div>
                            </form>
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
import login from '../services/login'
export default {
    data:function(){
      return{
        email:'',
        newpassword:'',
        confirmpassword:'',
        emparr:{},
      }
    },
    created(){
      this.email=this.$route.params.email;
        login.getempbyemailid(this.email).then(doc=>{
         this.emparr=doc.data[0];
        console.log(this.emparr);
      })
    },
    methods:{
      Onupdate:function(){
        if(this.newpassword==this.confirmpassword)
        {
            this.emparr.empPassword=this.newpassword;
            employee.updateemppassword(this.emparr).then(doc=>{
            console.log(doc.data);
            this.$fire({
                    title: "Your password updated successfully",
                    type: "success",
                    timer: 3000
                    }).then(r => {
                    console.log(r.value);
            });
                        
            this.$router.push("/");
            })
        }
        else
        {
            this.$fire({
                    title: "confirm password and new password doesn't match",
                    type: "warning",
                    timer: 3000
                    }).then(r => {
                    console.log(r.value);
            });
        }
        
     }
    }

}
</script>

<style scoped>
.error-message {
  color: #cc0033;
  display: inline-block;
  font-size: 12px;
  line-height: 15px;
  margin: 5px 0 0;
}

</style>
