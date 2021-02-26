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
      prop="stuId"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="stuClass"
      label="班级"
      width="180">
    </el-table-column>
    <el-table-column
      prop="stuGrade"
      label="年级"
      width="180">
    </el-table-column>
    
    <el-table-column
      prop="stuName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="stuCard"
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
            type="primary"
            @click="handleedit(scope.row)">查看
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
  
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="item in gradearray" :key="item.sid" :label='item.sid' :name="item.sid"  >
    <el-form  :model="edituser" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="学期">
  <el-input v-model="edituser.grade" disabled></el-input>
  </el-form-item>
   <el-form-item label="学号">
  <el-input v-model="edituser.sid" disabled></el-input>
  </el-form-item>
  <el-form-item label="班级">
  <el-input v-model="edituser.grades" disabled></el-input>
  </el-form-item>
  <el-form-item label="年级">
  <el-input v-model="edituser.nianji" disabled></el-input>
  </el-form-item>
  <el-form-item label="英语">
  <el-input v-model="edituser.senglish" ></el-input>
  </el-form-item>
  <el-form-item label="化学">
  <el-input v-model="edituser.shuaxue" ></el-input>
  </el-form-item>
  <el-form-item label="生物">
  <el-input v-model="edituser.sshengwu" ></el-input>
  </el-form-item>
  <el-form-item label="数学">
  <el-input v-model="edituser.sshuxue" ></el-input>
  </el-form-item>
  <el-form-item label="物理">
  <el-input v-model="edituser.swuli" ></el-input>
  </el-form-item>
  <el-form-item label="语文">
  <el-input v-model="edituser.syuwen" ></el-input>
  </el-form-item>
  
  <!-- <el-form-item label="账号"> -->
  
  </el-form>
  </el-tab-pane>
   
  </el-tabs>
  
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
            array: [],
            multipleSelection: [],
            total: 0,
            tableDatas:[],
            pagesize:20,
            gradearray:[],
            currentPage:1,
            name:'2017上',
            cjtable: [],
            activeName:'',
            edituser:{
              sid:'',
              grade:'',
              senglish:'',
              shuaxue:'',
              sshengwu:'',
              sshuxue:'',
              swuli:'',
              syuwen:'',
              grades:'',
              nianji:''
            },
            // sStuNo:''
        };
    },
    watch:{
      'activeName':function(vold){
        // console.log(vold)
      }
    },
    methods: {
        searchs(){
          this.tableDatas =[]
          console.log(this.input,this.input2)
          this.tableData.forEach(item=>{
            // debugger
            if (item.stuId.indexOf(this.input) > -1 && item.stuGrade.indexOf(this.input2) > -1){
              this.tableDatas.push(item)
            }
            // console.log(this.tableDatas)
          })
          // this.tableData = this.tableDatas
                // console.log(this.tableDatas)
        },
        editinformation(){
            this.$http.post('score/updateStuScore',{
            sStuNo:this.edituser.sid,
            sId:this.edituser.grade,
            sStuGrade:this.edituser.nianji,
            sStuClass:this.edituser.grades,
            sEnglish:this.edituser.senglish,
            sShengwu:this.edituser.shuaxue,
            sShuxue:this.edituser.sshuxue,
            sHuaxue:this.edituser.sshengwu,
            sWuli:this.edituser.swuli,
            sYuwen:this.edituser.syuwen,
            }).then(res=>{
                if(res.code == 200){
                    this.$message.success('修改成功')
                    this.dialogVisible = false
                }else{
                    this.dialogVisible = false
                    this.$message.error('修改失败---' + res.msg)
                }
            })
        },
       
        handleClick(tab, event) {
        console.log(tab, event)
      },
        handleedit(val){
          // console.log(val)
          this.edituser.sid = val.stuId
          this.edituser.grades = val.stuClass
          this.edituser.nianji = val.stuGrade
           this.gradearray =[]
            this.$http.post('score/getStuById',{
                sStuNo:val.stuId
            }).then(res=>{
                var data = res.data
                this.array = data
                data.forEach(item=>{
                  var obj = {}
                    obj.sid = item.sid
                    this.gradearray.push(obj)
                })
                    // console.log(this.gradearray)
                    if(this.gradearray){
                      this.activeName = this.gradearray[0].sid
                        this.edituser.grade = this.activeName
                        this.edituser.senglish = this.array[0].senglish
                        this.edituser.shuaxue = this.array[0].shuaxue
                        this.edituser.sshengwu = this.array[0].sshengwu
                        this.edituser.sshuxue = this.array[0].sshuxue
                        this.edituser.syuwen = this.array[0].syuwen
                        this.edituser.swuli = this.array[0].swuli
                        this.dialogVisible = true
                    }else{
                      this.$message.error('未查询到信息')
                    }
                })
        },
        handleClick(val){
          // console.log(this.array)
          var objs = this.array.filter(item=>item.sid == val.name)
          this.edituser.grade = objs[0].sid
          this.edituser.senglish = objs[0].senglish
          this.edituser.shuaxue = objs[0].shuaxue
          this.edituser.sshengwu = objs[0].sshengwu
          this.edituser.sshuxue = objs[0].sshuxue
          this.edituser.syuwen = objs[0].syuwen
          this.edituser.swuli = objs[0].swuli
          console.log(objs)
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
            this.$http.get('student/getAllStu').then(res=>{
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