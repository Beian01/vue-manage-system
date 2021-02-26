<template>
    <div>
     <el-dialog
  title="操作"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <!-- /*修改密码*/ -->
  <el-form  :model="edituser" status-icon label-width="100px" class="demo-ruleForm">
  <el-form-item label="账号">
  <el-input v-model="edituser.sStuNo" disabled></el-input>
  </el-form-item>
  <el-form-item label="数学">
  <el-input v-model="edituser.sShuxue"></el-input>
  </el-form-item>
  <el-form-item label="语文">
  <el-input v-model="edituser.sYuwen"></el-input>
  </el-form-item>
  <el-form-item label="英语">
  <el-input v-model="edituser.sEnglish"></el-input>
  </el-form-item>
  <el-form-item label="物理">
  <el-input v-model="edituser.sWuli"></el-input>
  </el-form-item>
  <el-form-item label="生物">
  <el-input v-model="edituser.sShengwu"></el-input>
  </el-form-item>
  <el-form-item label="化学">
  <el-input v-model="edituser.sHuaxue"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdits">确 定</el-button>
            </span>
     </el-dialog>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-select v-model="query.stuGrade" placeholder="年级" disabled class="handle-select mr10">
                    <el-option
                        v-for="item in stuGrades"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select> -->
                <el-select v-model="query.stuClasse" placeholder="班级" class="handle-select mr10">
                    <el-option
                        v-for="item in stuClasses"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                
                <el-select v-model="query.studate" placeholder="学期" class="handle-select mr10">
                    <el-option
                        v-for="item in studates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-upload2" @click="handleexport">导入</el-button>
                <el-button type="primary" icon="el-icon-download" @click="handleexported">导出</el-button>
            </div>
            <el-tabs v-if="grade" style="padding: 0 0 0 0;" type='card' v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
     
        v-for="item in cjtable"
        :key="item.sid"
        :label="item.sid"
        :name="item.sid"
      >
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="stuNoun" label="排名" width="55" align="center"></el-table-column>
                <el-table-column prop="stuNo" label="用户名"></el-table-column>
                <el-table-column label="分数">
                    <template slot-scope="scope">{{scope.row.stuScore}}分</template>
                </el-table-column>
               
                <el-table-column prop="stuSubject" label="科目"></el-table-column>
                
               
            </el-table>
    </el-tab-pane></el-tabs>
    <el-table
                v-else
                :data="tableData.filter(data => !search || data.stuNo.toLowerCase().includes(search.toLowerCase())  )"
                border
                class="table"
                ref="multipleTable"
                style="width:100%"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="stuNoun" label="年级排名" align="center"></el-table-column>
                <el-table-column label="班级排名" prop="stuNouns" align="center"></el-table-column>
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="stuNo" label="用户名" align="center"></el-table-column>
                <el-table-column prop="maths" label="数学" align="center"></el-table-column>
                <el-table-column prop="chinese" label="语文" align="center"></el-table-column>
                <el-table-column prop="shengwu" label="生物" align="center"></el-table-column>
                <el-table-column prop="wuli" label="物理" align="center"></el-table-column>
                <el-table-column prop="yinyu" label="英语" align="center"></el-table-column>
                <el-table-column prop="huaxue" label="化学" align="center"></el-table-column>
                <el-table-column prop="pinjun" label="平均分" align="center"></el-table-column>
                <el-table-column prop="zongfen" label="总分" align="center"></el-table-column>
                
                <el-table-column
                    label="操作"
                    align="right"
                    width="120">
                    <template slot="header" slot-scope="scope">
                    <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
                </template>
                    <template slot-scope="scope">
                        <el-button
                        @click="editRow(scope.row)"
                        type="text"
                        size="small">
                        修改
                        </el-button>
                    </template>
                    </el-table-column>
               
            </el-table>
        </div>
           
        <!-- 导出编辑框 -->
        <el-dialog title="导入" :visible.sync="exportVisible" width="30%">
            <el-upload
        class="ml-10"
        :limit="limitNum"
        :auto-upload="false"
        accept=".xls"
        :action="UploadUrl()"
        :before-upload="beforeUploadFile"
        :on-change="fileChange"
        :on-exceed="exceedFile"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
      >
        <!-- <el-button slot="trigger" size="small" type="primary">导入成绩</el-button> -->
        <i style="margin-top:18%;font-size:45px" class="el-icon-plus avatar-uploader-icon"></i>
        <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
        <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过10M</div>
        
      </el-upload>
<span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadFile">确 定</el-button>
            </span>
                <!-- <el-upload
                    class="upload-demo"
                    drag
                    action="http://286j519933.picp.vip/core/importFile"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    
                    </el-upload> -->
                 
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            search:'',
            query: {
                stuGrade: '',
                name: '',
                stuClasse:'',
                studate:''
            },
            cjtable:[{sid:'语文'},{sid:'数学'},{sid:'英语'},{sid:'物理'},{sid:'化学'},{sid:'生物'},{sid:'总分'}],
            activeName:'语文',
            studates:[],
             limitNum: 1,  // 上传excell时，同时允许上传的最大数
        fileList: [],   // excel文件列表
        // dialogVisible: false,
            list:[],
            stuClasses:[
            ],
           
             stuGrades: [{
                value: '',
                label: '请选择'
                },{
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
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            dialogVisible:false,
            form: {},
            idx: -1,
            grade:false,
            exportVisible:false,
            id: -1,
            edituser:{
                sStuNo:'',
                sShuxue:'',
                sYuwen:'',
                sEnglish:'',
                sWuli:'',
                sShengwu:'',
                sHuaxue:''
            },
          
        };
    },
    watch:{
        // 'query.stuGrade':function(vnew,vold){
        //     var selecteds = vnew.slice(0,4)
        //     var selected = selecteds +'上'
        //     var selecteded = selecteds + '下'
        //     this.studates = [
        //         {
        //         value: '',
        //         label: '请选择'
        //         },{
        //         value: selected,
        //         label: selected
        //         }, {
        //         value: selecteded,
        //         label: selecteded
        //         }
        //     ]
        // }
    },
    created() {

        this.query.stuGrade = localStorage.getItem('stuGrade')
        this.$notify.success('请选择班级查询')
        // this.getData();
    },
    mounted() {
        this.getClass()
        this.getstuade()
    },
    methods: {
        UploadUrl() {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return "";
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length +
          fileList.length} 个`
      );
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log(file.raw);
      this.fileList.push(file.raw);
      console.log(this.fileList);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log("before upload");
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xls") {
        this.$message.warning("只能上传后缀是.xls的文件");
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M");
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success("文件上传成功");
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");
    },
    uploadFile() {
      if (this.fileList.length === 0) {
        this.$message.warning("请上传文件");
      } else {
        let form = new FormData();
        form.append("excelFile", this.fileList[0]);
        this.uploadXlsx('http://286j519933.picp.vip/core/importFile',form).then(res=>{
            if(res.data.code == 200){
                this.$message.success('导入成功')
                this.exportVisible=false
            }else{
                this.$message.error('导入失败')
                this.exportVisible=false
            }
            // console.log(res)
            //  this.fetchData()//重新获取自己表格列表的数据
        })
      }
    },
        handleexported(){
            if(this.query.stuClasse && this.query.studate){
                this.$http.post('core/exportFile',{
                    sId:this.query.studate,
                    sStuGrade:this.query.stuGrade,
                    sStuClass:this.query.stuClasse
                }).then(res=>{
                    if(res.code == 200){
                        this.$message.success('导出成功,已保存到C盘目录下')
                    }else{
                        this.$message.error('导出失败，不存在要查询的班级在此学期的成绩信息')
                    }
                })
            }else{
                this.$message.error('输入查询条件')
            }
        },
        handleexport(){
            this.exportVisible = true
        },
      
        getClass(){
            this.$http.post('/getClass/getTeacherClass',{
                tPhone:localStorage.getItem('tphone'),
                tSubject:localStorage.getItem('tsubject')
            }).then(res=>{
                var data = res.data
                var arr = [{
                value: '',
                label: '请选择'
                }]
                data.forEach(item=>{
                    var obj = {}
                    obj.value = item.className
                    obj.label = item.className
                    arr.push(obj)
                    // console.log(item.className)
                })
                this.stuClasses = arr
                // localStorage.setItem('class',arr)

                })
        },
        getstuade(){
            this.$http.get('/score/getAllId').then(res=>{
                var data = res.data
                var arr = [{
                value: '',
                label: '请选择'
                }]
                // data.forEach(item=>{
                //     // var obj = {}
                //     // obj.value = item.className
                //     // obj.label = item.className
                //     // arr.push(obj)
                //     console.log(item)
                // })
                for(var i in data){
                    var obj = {}
                    obj.value = data[i]
                    obj.label = data[i]
                    arr.push(obj)
                }
                this.studates = arr
                // localStorage.setItem('class',arr)

                })
        },
        saveEdits(){
            this.$http.post('/score/updateStuScore',{
                sStuNo:this.edituser.sStuNo ,
                sShuxue:this.edituser.sShuxue ,
                sYuwen:this.edituser.sYuwen,
                sEnglish:this.edituser.sEnglish,
                sWuli:this.edituser.sWuli,
                sShengwu:this.edituser.sShengwu,
                sHuaxue:this.edituser.sHuaxue,
                sId:this.query.studate
            }).then(res=>{
                if(res.code == 200){
                    this.$message.success('修改成功')
                    this.dialogVisible = false
                    this.handleSearch()
                }else{
                    this.dialogVisible = false
                    this.$message.error('修改失败')
                }
            })
        },
        editRow(val){
            this.edituser.sStuNo = val.stuNo,
            this.edituser.sShuxue = val.maths,
            this.edituser.sYuwen = val.chinese,
            this.edituser.sEnglish = val.yinyu,
            this.edituser.sWuli = val.wuli,
            this.edituser.sShengwu = val.shengwu,
            this.edituser.sHuaxue = val.huaxue
            this.dialogVisible = true
        },
        handleClick(val){
            var labels = val.label
            let list = this.list 
            if(labels == '语文'){
                this.tableData = list[0]
            }else if(labels == '数学'){
                this.tableData = list[1]
            }else if(labels == '英语'){
                this.tableData = list[2]
            }else if(labels == '物理'){
                this.tableData = list[5]
            }else if(labels == '化学'){
                this.tableData = list[3]
            }else if(labels == '生物'){
                this.tableData = list[4]
            }else if(labels == '总分'){
                this.tableData = list[6]
            }
        },
        // 获取 easy-mock 的模拟数据
        // getData() {
        //     fetchData(this.query).then(res => {
        //         this.tableData = res.list;
        //         this.pageTotal = res.pageTotal || 50;
        //     });
        // },
        // 触发搜索按钮
        handleSearch() {
            // this.$set(this.query, 'pageIndex', 1);
            // this.getData();
            if(this.query.studate && this.query.stuGrade && this.query.stuClasse){

                this.$http.post('/score/getAllScoreByClass',{
                    sId:this.query.studate,
                    sStuGrade:this.query.stuGrade,
                    sStuClass:this.query.stuClasse
                }).then(res=>{
                    this.grade = false
                    var aadata = res.data
                    var role = []
                    for(var i in aadata[0]){
                        role.push(aadata[0][i].stuNo)
                    }
                    var allarr = []
                    for(var i in role){
                        var arrlist = []
                        for(var j in aadata){
                            var arr = aadata[j].filter(item=>item.stuNo == role[i])
                            arrlist.push(arr)
                        }
                        allarr.push(arrlist)
                    }
                        
                        var finalarr = []
                    for(var i in allarr){
                        var obj = {}
                        obj.stuNo = allarr[i][0][0].stuNo
                        obj.stuNouns = allarr[i][6][0].stuNoun
                        obj.chinese = allarr[i][0][0].stuScore
                        obj.maths = allarr[i][1][0].stuScore
                        obj.yinyu = allarr[i][2][0].stuScore
                        obj.wuli = allarr[i][3][0].stuScore
                        obj.huaxue = allarr[i][4][0].stuScore
                        obj.shengwu = allarr[i][5][0].stuScore
                        obj.zongfen = allarr[i][6][0].stuScore
                        obj.pinjun = allarr[i][7][0].stuScore
                        finalarr.push(obj)
                    }
                    this.$http.post('/score/getAllScoreByGrade',{
                            sId:this.query.studate,
                            sStuGrade:this.query.stuGrade,
                        //     sStuClass:this.query.stuClasse
                        }).then(res=>{
                            var aadatas = res.data
                            let quanxiao = aadatas[6]
                            var arrzong = []
                            for(var i in finalarr){
                                for(var j in quanxiao){
                                    if(finalarr[i].stuNo == quanxiao[j].stuNo){
                                        var nianjis = Object.assign(finalarr[i] ,quanxiao[j]);
                                        // finalarr[i].nianji = nianjis
                                        arrzong.push(nianjis)
                                    }
                                }
                            }
                            function sortId(a,b){  
                        return  a.stuNouns - b.stuNouns  
                    }
                    arrzong.sort(sortId);
                    this.tableData  = arrzong

                        })
                    // function sortId(a,b){  
                    //     return b.zongfen  - a.zongfen
                    // }
                    // finalarr.sort(sortId);
                    // for(var i in finalarr){
                    //     finalarr[i].index = i
                    //     finalarr[i].index ++ 
                    // }
                    // this.tableData  = finalarr
                })
            }else if(this.query.studate && this.query.stuGrade && this.query.stuClasse == ''){
//  this.grade = true
//                 this.$http.post('/score/getAllScoreByGrade',{
//                     sId:this.query.studate,
//                     sStuGrade:this.query.stuGrade,
//                 //     sStuClass:this.query.stuClasse
//                 }).then(res=>{
//                     this.list = res.data
//                     var data = res.data[0]
//                     this.tableData = data
//                 })
//             }else{
                this.$message.error('请选择查询项')
            }
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
