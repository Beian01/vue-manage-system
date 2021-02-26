<template>
    <div>
    <el-dialog
  title="操作"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <!-- /*修改密码*/ -->
  <el-form v-if="affair == 'editpwd'" :model="edituser" status-icon label-width="100px" class="demo-ruleForm">
  <el-form-item label="账号">
  <el-input v-model="edituser.user" disabled></el-input>
  </el-form-item>
  <el-form-item label="密码">
  <el-input v-model="edituser.password"></el-input>
  </el-form-item>
  </el-form>
  
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editpasswords">确 定</el-button>
  </span>
    </el-dialog>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/xueshen.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        本次登录时间：
                        <span>{{date}}</span>
                    </div>
                    <div class="user-info-list">
                        管理员登陆密码
                        <span>{{adminpassword}}</span>
                        <span style="cursor:pointer">
                            <i class="el-icon-edit" @click="editpassword"></i>
                        </span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>人员分布</span>
                    </div>
                    <el-progress :percentage="71.3"  color="#42b983"></el-progress>学生数量
                    <el-progress :percentage="24.1" style="margin-top:10%" color="#f1e05a"></el-progress>老师数量
                    <!-- <el-progress :percentage="13.7"></el-progress>HTML -->
                    <!-- <el-progress :percentage="5.9" color="#f56c6c"></el-progress> -->
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="12">
                        <el-card shadow="hover"  :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1" v-on:mouseover="changeActive($event)" v-on:mouseout="removeActive($event)">
                                <i  class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{teachernumber}}</div>
                                    <div>教师数量</div>
                                </div>
                                
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2" v-on:mouseover="changeActivte($event)" v-on:mouseout="removeActivte($event)">
                                <i  class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{studentnumber}}</div>
                                    <div>学生数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                   
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>我的信息</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">修改</el-button> -->
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                                
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>学校政策</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">添加</el-button> -->
                    </div>
                    <el-table :show-header="false" :data="todoLists" style="width:100%;">
                        
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                                
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            tSubject:'',
            dialogVisible:false,
            date:'',
            adminpassword:'',
            add:true,
            addte:true,
            affair:'',
            teachernumber:0,
            studentnumber:0,
            edituser:{
                user:'',
                password:''
            },
            addteacher:{
                tName:'',
                tPhone:'',
                tSubject:'',
                tGrade:'',
                tCard:''
            },
            addstudent:{
                stuId:'',
                stuGrade:'',
                stuName:'',
                stuClass:'',
                stuCard:''
            },
            value:'',
            stuClasses:[{
                 value: '1班',
                label: '1班'
                }, {
                value: '2班',
                label: '2班'
                }, {
                value: '3班',
                label: '3班'
                }, {
                value: '4班',
                label: '4班'
                }, {
                value: '5班',
                label: '5班'
            },{
                value: '6班',
                label: '6班'
            }
            ],
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
            todoLists: [
                {
                    title: '清华大学召开寒假务虚会',
                    status: false
                },
                {
                    title: '清华大学与美国布鲁金斯学会联合举办高级别闭门圆桌会议',
                    status: false
                },
                {
                    title: '傅莹新书《看世界2》发布暨研讨会举行',
                    status: false
                },
                {
                    title: '美术学院王红卫及其团队设计2021CCTV春晚生肖福礼——“福牛春碗”',
                    status: false
                },
                {
                    title: '清华大学第四教学楼室内设计荣获2020美国IDA国际设计奖金奖',
                    status: false
                },
                {
                    title: '马来西亚IOI产业集团董事长李耀昇捐赠清华大学',
                    status: false
                },
                {
                    title: '同心抗疫不松懈 用心守护暖寒冬——清华大学扎实开展寒假期间教职工疫情防控工作',
                    status: false
                }
            ],
            class:'',
            name: '',
            todoList: [
                {
                    title: `科目：   ${localStorage.getItem('tsubject')}`,
                    status: false
                },
                {
                    title: `姓名：  ${localStorage.getItem('tname')}`,
                    status: false
                },
                {
                    title: `年级：   ${localStorage.getItem('tgrade')}`,
                    status: false
                },
                {
                    title: `身份证：  ${localStorage.getItem('tcard')}`,
                    status: false
                },{
                    title: `班级：  ${localStorage.getItem('class')}`,
                    status: false
                }
            ],
            
            
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '教师';
        }
    },
    created() {
        // this.class = '22'
        this.name = localStorage.getItem('tname')
        console.log(this.name)
    },
    mounted() {
        this.getDates()
        this.getlength()
        
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        getClass(){
            this.$http.post('/getClass/getTeacherClass',{
                tPhone:localStorage.getItem('tphone'),
                tSubject:localStorage.getItem('tsubject')
            }).then(res=>{
                var data = res.data
                var arr = ''
                data.forEach(item=>{
                    arr += item.className + ','
                    // console.log(item.className)
                })
                localStorage.setItem('class',arr)

                })
        },
        getlength(){
            this.$http.get('/student/getAllStu').then(res=>{
                var data = res.data
                var datalength = data.length
                this.studentnumber = datalength
                })
            this.$http.get('/teacher/getAllTeacher').then(res=>{
                var aadata = res.data
                var aadatalenth = aadata.length
                this.teachernumber = aadatalenth
            })
        },
        addstudents(){
            this.affair = 'addstudent'
            this.dialogVisible = true
        },
        change(val){
        },
        addstu(){
            this.$http.post('/student/stuRegister',{
                stuId:this.addstudent.stuId,
                stuGrade:this.addstudent.stuGrade,
                stuName:this.addstudent.stuName,
                stuClass:this.addstudent.stuClass,
                stuCard:this.addstudent.stuCard
            }).then(res => {
                if(res.code == 200){
                    this.dialogVisible = false
                    this.$router.go(0)
                    this.$message.success('添加成功')
                }else{
                    this.$message.error('添加失败')
                    this.dialogVisible = false
                }
            })
        },
        addtea(){
            this.$http.post('/teacher/teacherRegister',{
                tPhone:this.addteacher.tPhone,
                tName:this.addteacher.tName,
                tSubject:this.addteacher.tSubject,
                tGrade:this.addteacher.tGrade,
                tCard:this.addteacher.tCard
            }).then(res => {
                if(res.code == 200){
                    this.dialogVisible = false
                    this.$router.go(0)
                    this.$message.success('添加成功')
                }else{
                    this.$message.error('添加失败')
                }
            })
        },
        addteachers(){
            this.affair = 'addteacher'
            this.dialogVisible = true
        },
        changeActive(val){
            this.add = false
        },
        removeActive(){
            this.add = true
        },
        changeActivte(val){
            this.addte = false
        },
        removeActivte(){
            this.addte = true
        },
        editpassword(){
            this.dialogVisible = true
            this.affair = 'editpwd'
            this.edituser.user = localStorage.getItem('tphone')
        },
        editpasswords(){
            var adminId = localStorage.getItem('id')
            this.$http.post('/teacher/teacherUpdatePwd',{
                tPhone:this.edituser.user,
                tPwd: this.edituser.password,
                // adminId:adminId
            }).then(res=>{
                if(res.code == 200){
                    this.dialogVisible = false
                    this.$message.success('修改成功')
                    this.adminpassword = this.edituser.password
                }else{
                    this.dialogVisible = false
                    this.$message.error('修改失败')
                }
            })
        },
        getDates(){
            var date = new Date()
            var year = date.getFullYear()
            var month = date.getMonth()
            var data = date.getDate()
            var hour = date.getHours()
            var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            this.date = year + '年' + month + '月' + data + '日' + hour + ':' + minute
            this.adminpassword = localStorage.getItem('tpwd')
            this.name = localStorage.getItem('tphone')
            this.getClass()
        localStorage.setItem('class','123')

            // console.log(year)
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
