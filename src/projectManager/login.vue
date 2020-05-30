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
                            <p class="lead">Login to your account</p>
                        </div>
                        <div class="body">
                            <form class="form-auth-small" name="f1" @submit.prevent="onlogin">
                                <div class="form-group">
                                    <label for="signin-email" class="control-label sr-only">Email</label>
                                    <input @input="onemail" type="email"
                                     v-model="email" class="form-control" pattern="[^ @]*@[^ @]*" id="email" name="email" placeholder="Email" autocomplete="off">
                                    <div id="emailerror" class="error-message"></div>
                                </div>
                                <div class="form-group">
                                    <label for="signin-password" class="control-label sr-only">Password</label>
                                    <input @input="onpassword" type="password" minlength="8" maxlength="15" v-model="password" class="form-control" name="password"  placeholder="Password">
                                    <div id="passworderror" class="error-message"></div>

                                </div>
                                <button type="submit" value="LOGIN" class="btn btn-primary btn-lg btn-block">Login</button>
                                <div class="bottom">
                                    <!-- <span class="helper-text m-b-10"><i class="fa fa-lock"></i><router-link to="/forgetpassword"> Forgot password?</router-link></span> -->
                                    <span class="helper-text m-b-10"><i class="fa fa-lock" style="color:orange;"></i><a @click="forgetpassword" style="color:blue;pointer:cursor;"><span style="cursor:pointer;">Forgot password?</span></a></span>
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
import loginclass from '../services/login'
export default {
data () {
    return {
      email:'',
      password:'',
      mail:{
        to:'',
        subject:'',
        message:''
      }
    }
    },
    methods:{
        forgetpassword:function(){
            this.$prompt("Please your Emailid").then((text1) => {
            this.forgetemail=text1;
            console.log(this.forgetemail);
                  loginclass.getpassword(this.forgetemail).then(doc=>{
                      if(doc.data.length>0)
                      {
                          var otp= Math.floor(1000 + Math.random() * 9000);
                          loginclass.updateotp(this.forgetemail,otp).then(doc=>{
                                console.log(otp);

                                    this.mail.to = this.forgetemail;
                                    this.mail.subject = "OTP for Reset password";
                                    this.mail.message = "Your one time OTP is " + otp;
                                    loginclass.sendmail(this.mail).then(doc=>{
                                    }).catch(err=>{
                                        console.log(err);
                                    })

                                this.$fire({
                                  title: "OTP send to your Registered Emailid",
                                  type: "success",
                                  timer: 3000
                                }).then(r => {
                                  console.log(r.value);
                                });
                            this.$router.push({path:'/forgetpassword/' + this.forgetemail});

                          })
                      }
                      else
                      {
                            this.$fire({
                                  title: "Emailid is not registered with us",
                                  type: "warning",
                                  timer: 3000
                                }).then(r => {
                                  console.log(r.value);
                                });
                        
                      }
                })
                  
                console.log(this.forgetemail);
                
        });
        },
        onlogin:function(){
                var passwordflag = 0;
                var emailflag = 0;

                if(document.f1.email.value == ""){
                    emailflag = 1;
                    document.getElementById("emailerror").innerHTML = "Please enter a email";
                }

                if(document.f1.password.value == ""){
                    passwordflag = 1;
                    document.getElementById("passworderror").innerHTML = "Please enter a password";
                }

           if(passwordflag == 0 && emailflag == 0)
           {
           loginclass.getEmpByEmailPassword(this.email,this.password).then(doc=>{
             if(doc.data.length>0){
               if(doc.data[0].empTypeId == 1){
                this.$router.push({path:'/dashboard/' + this.email});
                    localStorage.setItem('empId',JSON.stringify(doc.data[0].empId));

              }
              else{
                this.$router.push({path:'/memberDashboard/' + this.email});
                    localStorage.setItem('empId',JSON.stringify(doc.data[0].empId));
              }
             }
            else{
              this.$fire({
                    title: "Emailid & password doesn't match",
                    type: "warning",
                    timer: 3000
                    }).then(r => {
                    console.log(r.value);
            });
            }
           })
           }
         },
         onemail:function(){
           if(document.f1.email.value != ""){
              document.getElementById("emailerror").innerHTML = "";
           }
           if(document.f1.email.value == ""){
              document.getElementById("emailerror").innerHTML = "Please enter a email";
           }


         },
         onpassword:function(){
           if(document.f1.password.value != ""){
              document.getElementById("passworderror").innerHTML = "";
           }
           if(document.f1.password.value == ""){
              document.getElementById("passworderror").innerHTML = "Please enter a password";
           }


         }
    },
    created(){
        localStorage.setItem('empId','');
    },
    filters:{

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
