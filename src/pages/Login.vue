<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <a class="ztit action-button" @click="home">关闭</a>
          <a class="zti">登录</a>
          <a class="ztit action-button" @click="reg">注册</a>
        </div>
      </el-col>
    </el-row>
    <div class="container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <div class="logo">
          <img src="../assets/logo.png" alt>
        </div>

        <el-form-item prop="username">
          <el-input placeholder="请输入手机号码" v-model="ruleForm.username">
            <el-button slot="prepend" icon="icon el-icon-mobile-phone"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password">
            <el-button slot="prepend" icon="icon el-icon-goods"></el-button>
          </el-input>
        </el-form-item>

        <el-button class="log" type="danger" @click="submitForm('ruleForm')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    reg() {
      this.$router.push("/reg");
    },
    home() {
      this.$router.push("/home");
			//显示导航条，数据应在store上修改，通过在当前组件触发事件修改数据
			//不严谨的做法
			this.$store.state.isShowTagger=true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this;
          this.$axios
            .post(
              "/local/login",
              qs.stringify(
                {
                  username: this.ruleForm.username,
                  password: this.ruleForm.password
                },
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                },
                {
                  withCredentials: true
                }
              )
            )
            .then(function(res) {
            	// console.log(res.data.code,_this.ruleForm.username);
              if (res.data.code) {
                localStorage.setItem("username", _this.ruleForm.username);
                _this.$router.push("/myperson");
              } else {
                alert("用户名或密码错误");
              }
            })
            .catch(function(error) {
              // console.log(error);
            });
        }
      });
    }
  },
  created() {
    // let username = localStorage.getItem("username");
    // if (username) {
    //   this.$router.push("/home");
    // }
  }
};
</script>
<style lang="css" scoped>
.el-row {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 20px;
  height: 2.75rem;
  z-index: 999;
}
.bg-purple-dark {
  background: #333333;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ztit {
  color: #ccc;
  font-size: 0.875rem;
}
.zti {
  color: #999;
  display: flex;
  flex: 1;
  font-size: 1rem;
  justify-content: center;
}
.container {
  display: flex;
  flex: 1;
  align-items: center;
  position: relative;
  padding-top: 4rem;
  width: 100%;
  background-color: white;
  height: 100%;
}
.el-form {
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  box-orient: vertical;
  -ms-flex-direction: column;
  flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  background-color: white;
}
.logo {
  display: flex;
  box-orient: horizontal;
  -ms-flex-direction: row;
  flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.input-field-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  width: 80%;
}
.icon {
  margin-right: 0.5rem;
  color: #999999;
  font-size: 1rem;
}
.input-field-container .input-edit-container {
  display: -ms-flexbox;
  display: flex;
  box-orient: horizontal;
  -ms-flex-direction: row;
  flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex: 1;
  flex: 1;
  border-bottom: 0.0625rem solid #cccccc;
  -ms-flex-align: end;
  align-items: flex-end;
  padding-bottom: 0.5rem;
}
.input-field-container .input-edit-container input {
  border: 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  margin: 0;
  padding: 0;
  color: #666666;
  font-size: 1rem;
  width: 100%;
  outline: none;
}
.log {
  margin-top: 2rem;
  width: 80%;
}
</style>
