<template>
<!-- 该房屋的实际成交价格为人民币（大写） -->
    <div class="transaction">
      <el-form  
              hide-required-asterisk 
               :model="transFrom">
        <el-form-item label="输入人民币（小写）" >
           <div class="price">
             <el-input 
               placeholder="￥:  请输入价格"
                :class="{'error-input':isNullInput}"
                clearable
                data-code = contractCode.HOUSING_TRANSACTION_PRICE
                data-content='transactionPrice'
                v-model="transFrom.transactionPrice" 
                @blur="forWard">
              </el-input>

              <div class="capitalizations" >{{Capitalization}}</div>
          </div>
       </el-form-item>
       
       <el-form-item label="显示人民币（大写）" >
           <div class="price">
              <el-input 
               placeholder="人民币(大写)"
               :readonly="isReadonly"
                v-model="transFrom.transactionPrice_value" >
              </el-input>
          </div>
       </el-form-item>
    </el-form>
  </div>
</template>


<script>
// 引入验证文件
import validate from "@/utils/validate.js"
// 引入验证文件
import {required} from "@/utils/required.js"

export default {
    data(){
        return {
            // 实际成交价格
            transFrom:{
                // 实际价格
                transactionPrice:''
                ,transactionPrice_value:''
            },
            // 大写金额验证提示信息
            Capitalization:'',
            isReadonly:true,
            isNullInput:false,
      }
},
 methods: {
    forWard(val) {
      //值验证
      this.Capitalization = this.proof(this.transFrom.transactionPrice);      
      // 值样式判断
      if(this.Capitalization =='只能输入阿拉伯数字和小数点后两位' || this.Capitalization =='输入不能为空' || this.Capitalization =='数字超出界限'){
        this.isNullInput = true;
        this.transFrom.transactionPrice_value="";
      }else{
        // 值转换
        this.transFrom.transactionPrice_value=required(this.transFrom.transactionPrice);
        this.isNullInput=false;
      }
    }, 
    proof(n) {
        if (n == '') {
            return '输入不能为空'
        }
        else if (!validate.isFloat(n,2)) {
            return "只能输入阿拉伯数字和小数点后两位";
        }
        else if (parseFloat(n) < 0) {
            return "数字超出界限";
        }
        else if (parseFloat(n) > 9999999999999999.99) {
            return "数字超出界限";
        }
    }
}
}
</script>
<style lang="scss">
.transaction{
  padding: 20px;
  .price{
    display: inline-block;
    width: 30rem;
    
    // 文本框
    .el-input__inner {
      height: 30px;
    //   line-height: 30px;
      width:100%;
    }
    .el-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      // width: 200px;
      width:100%;
    }
    .error-input .el-input__inner {
     border:1px solid red;
    }
      // 错误验证
    .capitalizations {
      position: absolute;
      color: red; 
    
      height: 20px;
      line-height:20px;
      font-size: 12px !important;
    }
  }
}
</style>