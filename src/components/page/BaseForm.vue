<template>
    <div>
    <div style="display:flex;width:50%;margin-bottom:1%">
    <el-input v-model="input" placeholder="请输入学号进行搜索" style="width:60%;margin-right:5%"></el-input>
    <el-input v-model="input2" placeholder="请输入年级级进行搜索" style="width:60%;margin-right:5%"></el-input>
    <!-- <el-input v-model="input3" placeholder="请输入年级进行搜索" style="width:60%;margin-right:5%"></el-input> -->
    <el-button @click="searchs" type="primary">搜索</el-button>
    </div>
        <el-table
    
    ref="multipleTable"
      :data="tableDatas.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      
      tooltip-effect="dark"
      style="width: 100%"
      
    >
    <el-table-column
      prop="tphone"
      label="电话(用户名)"
      width="180">
    </el-table-column>
    
    <el-table-column
      prop="tgrade"
      label="年级"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tsubject"
      label="科类"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tname"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tcard"
      label="身份证">
    </el-table-column>
    <el-table-column label="操作">
    
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            @click="handleEdit(scope.row)">查看成绩
          </el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleedit(scope.row)">修改
          </el-button>
        </template>
      </el-table-column>
  </el-table>
    
  <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>
   
    <el-dialog
  
  :visible.sync="dialogVisible"
  width="50%"
  >
  
  <!-- /*修改密码*/ -->
  <el-form  :model="edituser" status-icon label-width="100px" class="demo-ruleForm">
  <el-form-item label="身份证">
  <el-input v-model="edituser.tcard" disabled></el-input>
  </el-form-item>
  <el-form-item label="账号">
  <el-input v-model="edituser.tphone" disabled ></el-input>
  </el-form-item>
  <el-form-item label="姓名">
  <el-input v-model="edituser.tname" disabled></el-input>
  </el-form-item>
  <el-form-item label="密码">
  <el-input v-model="edituser.tpwd" ></el-input>
  </el-form-item>
  <!-- <el-form-item label="账号"> -->
  <el-form-item label="所属科类">
  <el-radio-group v-model="edituser.tSubject" @change="change()">
      <el-radio-button label="语文"></el-radio-button>
      <el-radio-button label="数学"></el-radio-button>
      <el-radio-button label="英语"></el-radio-button>
      <el-radio-button label="化学"></el-radio-button>
      <el-radio-button label="物理"></el-radio-button>
      <el-radio-button label="生物"></el-radio-button>
    </el-radio-group>
  </el-form-item>
  <!-- </el-form-item> -->
  <el-form-item label="年级">
  <!-- <el-input v-model="addstudent.stuGrade"></el-input> -->
  <el-select style="width:100%" v-model="edituser.tgrade" placeholder="请选择">
    <el-option
      v-for="item in stuGrades"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editinformation">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    computed: {
      // table () {
      //   const input = this.input
      //   if (input) {
      //     // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
      //     // 注意： filter() 不会对空数组进行检测。
      //     // 注意： filter() 不会改变原始数组。
      //     return this.tableData.filter(data => {
      //       // some() 方法用于检测数组中的元素是否满足指定条件;
      //       // some() 方法会依次执行数组的每个元素：
      //       // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
      //       // 如果没有满足条件的元素，则返回false。
      //       // 注意： some() 不会对空数组进行检测。
      //       // 注意： some() 不会改变原始数组。
      //       return Object.keys(data).some(key => {
      //         // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
      //         // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
      //         return String(data[key]).toLowerCase().indexOf(input) > -1
      //       })
      //     })
      //   }
      //   return this.tableData
      // }
  },
    data() {
        return {
          search:'',
          input:'',
          input2:'',
          searchTableInfo:"",
          input3:'',
             stuGrades: [{
                value: '2016届',
                label: '2016届'
                }, {
                value: '2017届',
                label: '2017届'
                }, {
                value: '2018届',
                label: '2018届'
                }, {
                value: '2019届',
                label: '2019届'
                }, {
                value: '2020届',
                label: '2020届'
            },{
                value: '2021届',
                label: '2021届'
            }],
            dialogVisible:false,
            tableData: [],
            multipleSelection: [],
            total: 0,
            tableDatas:[],
            pagesize:20,
            currentPage:1,
            name:'2017上',
            cjtable: [],
            edituser:{
                tcard:'',
                tgrade:'',
                tSubject:'',
                tpwd:'',
                tname:'',
                tphone:'',

            },
            // sStuNo:''
        };
    },
    watch:{
      
    },
    methods: {
        searchs(){
          this.tableDatas =[]
          console.log(this.input,this.input2)
          this.tableData.forEach(item=>{
            // debugger
            if (item.tphone.indexOf(this.input) > -1 && item.tgrade.indexOf(this.input2) > -1){
              this.tableDatas.push(item)
            }
            // console.log(this.tableDatas)
          })
          // this.tableData = this.tableDatas
                // console.log(this.tableDatas)
        },
        editinformation(){
            this.$http.post('/teacher/teacherUpdate',{
            tcard:this.edituser.tcard,
            tsubject:this.edituser.tSubject,
            tgrade:this.edituser.tgrade,
            tpwd:this.edituser.tpwd,
            tname:this.edituser.tname,
            // tphone:this.edituser.tphone,
            }).then(res=>{
                if(res.code == 200){
                  this.$router.go(0)
                    this.$message.success('修改成功')
                    this.dialogVisible = false
                }else{
                    this.dialogVisible = false
                    this.$message.error('修改失败---' + res.msg)
                }
            })
        },
        handleedit(val){
            this.edituser.tcard = val.tcard
            this.edituser.tSubject = val.tsubject
            this.edituser.tgrade = val.tgrade
            this.edituser.tpwd = val.tpwd
            this.edituser.tname = val.tname
            this.edituser.tphone = val.tphone
            this.dialogVisible = true
        },
        handleClick(){

        },
        handleEdit(val){
            console.log(val.stuId)
            // this.sStuNo = val.stuId
            this.$http.post('/score/getStuById',{
                sStuNo:val.stuId
            }).then(res=>{
                console.log(res.data)
                this.cjtable = res.data
            })
            this.dialogVisible = true
        },
        getAll(){
            this.$http.get('/teacher/getAllTeacher').then(res=>{
                var data = res.data
                this.total = data.length
                this.tableData = data
                // this.searchs()
                this.tableDatas = data
            })
        },
         current_change:function(currentPage){
        this.currentPage = currentPage;
      },
    },
    mounted() {
        this.getAll()
        
    },

};
</script>