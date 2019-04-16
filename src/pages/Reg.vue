<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <a class="ztit action-button" @click="login">登录</a>
          <a class="zti">注册</a>
          <a class="ztit action-button"></a>
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

        <el-form-item>
          <el-input placeholder="请输入验证码" v-model="aaa" @blur="checkNum">
            <el-button slot="append" v-html="bbb" @click="createCode"></el-button>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password">
            <el-button slot="prepend" icon="icon el-icon-goods"></el-button>
          </el-input>
        </el-form-item>

        <el-button class="reg" type="danger" @click="submitForm('ruleForm')">注册</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          this.$axios
            .post(
              "/local/find",
              qs.stringify(
                {
                  username: value
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
              if (res.data.code) {
                return callback(new Error("已存在"));
              } else {
                callback();
              }
            })
            .catch(function(error) {
              // console.log(error);
            });
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      aaa: "",
      bbb: "",
      ccc: "",
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    createCode() {
      var code = "";
      var codeLength = 4; //验证码的长度
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ); //随机数
      for (var i = 0; i < codeLength; i++) {
        //循环操作
        var index = Math.floor(Math.random() * 62); //取得随机数的索引（0~35）
        code += random[index]; //根据索引取得随机数加到code上
      }
      this.bbb = code; //把code值赋给验证码
    },
    checkNum() {
      var num = this.aaa.toUpperCase(); //输入内容全部转化为大写
      var num2 = this.bbb.toUpperCase();
      if (num != num2) {
        alert("验证码错误");
        this.createCode();
        this.aaa = "";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid&&this.aaa) {
          let _this = this;
          this.$axios.post("/local/reg",
              qs.stringify(
                {
                  username: this.ruleForm.username,
                  password: this.ruleForm.password,
                  name:"blueberry"
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
           ).then(function(res) {
           		res.data.msg
              alert(res.data.msg);
              if(!res.data.code){
              	_this.$router.push("/login");
              }
           })
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    this.createCode();
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
  flex-direction: column;
  flex: 1;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  background-color: white;
}
.logo {
  display: flex;
  box-orient: horizontal;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;
}
.input-field-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
  width: 80%;
}
.icon {
  margin-right: 0.5rem;
  color: #999999;
  font-size: 1rem;
}
.input-field-container .input-edit-container {
  display: flex;
  box-orient: horizontal;
  flex-direction: row;
  flex: 1;
  border-bottom: 0.0625rem solid #cccccc;
  align-items: flex-end;
  padding-bottom: 0.5rem;
}
.input-field-container .input-edit-container input {
  border: 0;
  display: -ms-flexbox;
  display: flex;
  flex: 1;
  margin: 0;
  padding: 0;
  color: #666666;
  font-size: 1rem;
  width: 100%;
  outline: none;
}
.reg {
  margin-top: 2rem;
  width: 80%;
}
.verification {
  width: 5rem;
  background: white;
}
.msg {
  width: 70%;
  display: block;
  margin-bottom: 1rem;
}
</style>
