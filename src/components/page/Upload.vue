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
       
        <div class="container">
            <div class="handle-box" style="display:flex">
                <el-select v-model="query.stuGrade" placeholder="年级" class="handle-select mr10">
                    <el-option
                        v-for="item in stuGrades"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!-- <el-select v-model="query.studate" placeholder="学期" class="handle-select mr10">
                    <el-option
                        v-for="item in studates"
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
                <el-input style="width:20%;margin-right:5%" v-model="query.name" placeholder="请输入学号"></el-input>
               
                
                <el-button  type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
             <div class="schart-box" >
                <schart class="schart" canvasId="line" :options="options2"></schart>
            </div>
             <div class="schart-box" >
                <schart class="schart" canvasId="bar" :options="options1"></schart>
            </div>
            
        </div>
 
        <!-- 编辑弹出框 -->
       
    </div>
</template>
<script>
import Schart from 'vue-schart';
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    components: {
        Schart
    },
    data() {
        return {
            options1: {},
            search:'',
             options2:{
                 
            },
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
            list:[],
            stuClasses:[{
                value: '',
                label: '请选择'
                },{
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
             exportVisible:false,
            tableData: [],
            arraaa:[],
            yuwenscored:[],
            wuli: [],
            aasss: [],
            avgarrs:[],
            shengwu: [],
            classarr:[],
            yuwen: [],
            yinyu: [],
            shuxue :[],
            huaxue: [],
            avgscored: [],
            avgarr: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            dialogVisible:false,
            form: {},
            idx: -1,
            grade:true,
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
            beforegrade:'',
            cjtotal:{
                sid:'',
                yuWenRankGrade:'',
                wuliRankGrade:'',
                shuaxueBankGrade:'',
                shuXueRankGrade:'',
                shengWuRankGrade:'',
                englishRankGrade:'',
                countRankGrade:'',
                avgRankGrade:'',
            },
            becjtotal:{
                sid:'',
                yuWenRankGrade:'',
                wuliRankGrade:'',
                shuaxueBankGrade:'',
                shuXueRankGrade:'',
                shengWuRankGrade:'',
                englishRankGrade:'',
                countRankGrade:'',
                avgRankGrade:'',
            }
        };
    },
    watch:{
        
        'query.studate':function(vnew,vold){
            console.log(vnew.indexOf('上'))
            if(vnew.indexOf('下') != -1){
                this.beforegrade = vnew.slice(0,4) + '上'
                console.log(this.beforegrade)
            }else{
                var year = Number(vnew.slice(0,4)) - 1
                // console.log(year)
                this.beforegrade = year + '下'
            }
        }
    },
    mounted() {
        this.getstuade();
        this.getgrade();
        this.getClass();
        this.mapFn()
        this.mapfnss()
        },
    created() {
        this.$notify.success('请选择班级查询')
        // this.getData();
    },
    methods: {
        mapfnss(){
            console.log(this.shengwu)
            this.classarr = this.classarr.length == 0 ? ['','']:this.classarr
            this.huaxue = this.huaxue.length == 0 ? ['','']:this.huaxue
            this.wuli = this.wuli.length == 0 ? ['','']:this.wuli
             this.shengwu = this.shengwu.length == 0 ? ['','']:this.shengwu
            this.yuwen = this.yuwen.length == 0 ? ['','']:this.yuwen
             this.shuxue = this.shuxue.length == 0 ? ['','']:this.shuxue
            this.yinyu = this.yinyu.length == 0 ? ['','']:this.yinyu
            this.options2 = {
                type: 'line',
                title: {
                    text: '单科成绩趋势'
                },
                
                bgColor: '#fbfbfb',
                labels: this.classarr,
                datasets: [
                    {
                        label: '化学',
                        data: this.huaxue
                    },
                    {
                        label: '物理',
                        data: this.wuli
                    },
                    {
                        label: '生物',
                        data: this.shengwu
                    },
                     {
                        label: '语文',
                        data: this.yuwen
                    },
                    {
                        label: '英语',
                        data: this.yinyu
                    },
                    {
                        label: '数学',
                        data: this.shuxue
                    }
                ]
            }
        },
        getstuade(){
            this.$http.get('/score/getAllId').then(res=>{
                var data = res.data
                this.classarr = data
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
        getgrade(){
            this.$http.get('/score/getAllGrade').then(res=>{
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
                    this.stuGrades = arr
                // localStorage.setItem('class',arr)

                })
        },
         getClass(){
            this.$http.get('/score/getAllClass').then(res=>{
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
                    this.stuClasses = arr
                // localStorage.setItem('class',arr)

                })
        },
       mapFn(){
        
          this.classarr = this.classarr.length == 0 ?  ['',''] : this.classarr 
           this.avgscored = this.avgscored.length == 0 ? ['',''] : this.avgscored
           this.options1 = {
            type: 'bar',
                title: {
                    text: '各科年级排名'
                },
                bgColor: '#fbfbfb',
                labels: this.classarr ,
                datasets: [
                    {
                        label: '平均分',
                        
                        data: this.avgscored
                    },
                    
                ]
           }
       },
        
           
             
            
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
       
        handleSearch() {
           
        //    if(this.query.studate && this.query.stuGrade && this.query.stuClasse && this.query.name){
                
        //         this.$http.post('/core/getOne',{
        //             sId:this.query.studate,
        //             sStuGrade:this.query.stuGrade,
        //             sStuClass:this.query.stuClasse,
        //             sStuNo:this.query.name,
        //         }).then(res=>{
        //             var data = res.data
        //              if(data.length != 0){
        //             this.cjtotal.yuWenRankGrade = data[0].yuWenRankGrade
        //             this.cjtotal.sid = data[0].sid
        //             this.cjtotal.wuliRankGrade = data[0].wuliRankGrade
        //             this.cjtotal.shuaxueBankGrade = data[0].shuaxueBankGrade
        //             this.cjtotal.shuXueRankGrade = data[0].shuXueRankGrade
        //             this.cjtotal.shengWuRankGrade = data[0].shengWuRankGrade
        //             this.cjtotal.englishRankGrade = data[0].englishRankGrade
        //             this.cjtotal.countRankGrade = data[0].countRankGrade
        //             this.cjtotal.avgRankGrade = data[0].avgRankGrade
        //              }else{
        //                  this.$message.error('查询为空')
        //              }
        //             // this.cjtotal = array
        //             this.$http.post('/core/getOne',{
        //                 sId:this.beforegrade,
        //                 sStuGrade:this.query.stuGrade,
        //                 sStuClass:this.query.stuClasse,
        //                 sStuNo:this.query.name,
        //             }).then(ress=>{
        //                  var datas = ress.data
        //                   if(datas.length != 0){
        //             console.log(datas[0].yuWenRankGrade)
        //             this.becjtotal.yuWenRankGrade = datas[0].yuWenRankGrade
        //             this.becjtotal.wuliRankGrade = datas[0].wuliRankGrade
        //             this.becjtotal.sid = datas[0].sid
        //             this.becjtotal.shuaxueBankGrade = datas[0].shuaxueBankGrade
        //             this.becjtotal.shuXueRankGrade = datas[0].shuXueRankGrade
        //             this.becjtotal.shengWuRankGrade = datas[0].shengWuRankGrade
        //             this.becjtotal.englishRankGrade = datas[0].englishRankGrade
        //             this.becjtotal.countRankGrade = datas[0].countRankGrade
        //             this.becjtotal.avgRankGrade = datas[0].avgRankGrade
        //                   }else{
        //                       this.$$message.error('查询为空')
        //                   }
        //           var arr = []
        // var arrs = []
        // arr.push(this.cjtotal.sid)
        // arr.push(this.becjtotal.sid)
        // arrs.push(this.cjtotal.yuWenRankGrade)
        // arrs.push(this.becjtotal.yuWenRankGrade)
        //             this.mapFn(arr,arrs)
        //         })
        //         })
                
                
            //         var arr = this.cjtotal
            //         var bearr = this.becjtotal
            //             console.log(this.cjtotal)
                    
            //    console.log(this.becjtotal)
                    
            // }else{
            //     this.$message.error('请选择查询项')
            // }
             this.avgarrs = []
                    this.avgscored = []
                    var arr = this.classarr
                    // var array = []
                for(var i in arr){
                     this.$http.post('/core/getOne',{
                    sId:arr[i],
                    // sStuGrade:this.query.stuGrade,
                    // sStuClass:this.query.stuClasse,
                    // sId:this.query.studate,
                    sStuGrade:this.query.stuGrade,
                    sStuClass:this.query.stuClasse,
                    sStuNo:this.query.name,
                }).then(res=>{
                    var data = res.data
                    for(var j in data){
                      this.arraaa.push(data[j])
                    }
                })
                }
                var array = this.arraaa
                var datas = []
                for(var i = 0; i < array.length; i++) {
                    if(!datas[array[i].name]) {
                        var arree = [];
                        arree.push(array[i]);
                        datas[array[i].name] = arree;
                    }else {
                        datas[array[i].name].push(array[i])
                    }
                this.aasss = datas
                
                }
            //    this.aasss.forEach(function(item){
                    
            //          this.avgscored.push(item.avgRankGrade)
            //     })
                var aass = this.aasss['bbb0']
                for(var i in aass){
                    this.avgscored.push(aass[i].avgRankGrade)
                }
                // 化学
                var b = this.aasss['bbb0'].map((item)=>{return item.shuaxueBankGrade})
                // b.unshift(0)
                // var c = []
                this.huaxue = []
                for(var i = 0; i < b.length ; i++ ){
                     if(!b[i-1]){
                        b[i-1] = b[i]
                        var count = ((b[i] - b[i -1]) / b[i])
                    }else{
                        var count = ((b[i] - b[i -1]) / b[i]) + 2
                    }
                    this.huaxue.push(count)                   
                }
// 物理

var c = this.aasss['bbb0'].map((item)=>{return item.wuliRankGrade})
                // c.unshift(0)
                // var c = []
                this.wuli = []
                for(var i = 0; i < c.length ; i++ ){
                    if(!c[i-1]){
                        c[i-1] = c[i]
                        // var count = (b[i] - b[i -1]) / b[i]
                    var countwuli = ((c[i] - c[i -1]) / c[i])

                    }else{
                        // var count = (b[i] - b[i -1]) / b[i]
                    var countwuli = ((c[i] - c[i -1]) / c[i]) + 2

                    }
                    this.wuli.push(countwuli)                   
                }

// 生物

var d = this.aasss['bbb0'].map((item)=>{return item.shengWuRankGrade})
                // d.unshift(0)
                // var c = []
                this.shengwu = []
                for(var i = 0; i < d.length ; i++ ){
                   if(!d[i-1]){
                        d[i-1] = d[i]
                        var countshengwu = ((d[i] - d[i -1]) / d[i])
                    }else{
                    var countshengwu = ((d[i] - d[i -1]) / d[i] ) + 2
                    }
                    this.shengwu.push(countshengwu)                   
                }
// 语文

var e = this.aasss['bbb0'].map((item)=>{return item.yuWenRankGrade})
                // e.unshift(0)
                // var c = []
                this.yuwen = []
                for(var i = 0; i < e.length ; i++ ){
                    if(!e[i-1]){
                        e[i-1] = e[i]
                        var countyuwen = ((e[i] - e[i -1]) /e[i])
                    }else{
                        var countyuwen = ((e[i] - e[i -1]) /e[i]) + 2
                    }
                    this.yuwen.push(countyuwen)                   
                }
                // 数学

var f = this.aasss['bbb0'].map((item)=>{return item.shuXueRankGrade})
                // f.unshift(0)
                // var c = []
                this.shuxue = []
                for(var i = 0; i < f.length ; i++ ){
                   if(!f[i-1]){
                        f[i-1] = f[i]
                                            var countshuxue = ((f[i] - f[i -1]) /f[i])

                    }else{
                                            var countshuxue = ((f[i] - f[i -1]) /f[i]) + 2

                    }
                    this.shuxue.push(countshuxue)                   
                }
                // 英语

var g = this.aasss['bbb0'].map((item)=>{return item.englishRankGrade})
                // g.unshift(0)
                // var c = []
                this.yinyu = []
                for(var i = 0; i < g.length ; i++ ){
                    if(!g[i-1]){
                        g[i-1] = g[i]
                        var countyinyu = ((g[i] - g[i -1]) /g[i])
                    }else{
                        var countyinyu = ((g[i] - g[i -1]) /g[i]) + 2
                    }
                    this.yinyu.push(countyinyu)                   
                }


                // for(var i in array){
                //     // if(array[i].stuSubject == '平均分'){
                //         var len = array[i].stuSubject
                //         if(array[i].stuSubject.length == 3){
                //             this.avgarr.push(array[i])
                //         }
                //     // }
                // }
                // var aaaa = this.avgarr
                // for(var i in aaaa){
                //     this.avgarrs.push(aaaa[i].stuId)
                //     this.avgscored.push(aaaa[i].stuRank)
                //     // this.yuwenscored.push(aaaa[i].)
                // }

                            this.mapFn()
                    this.mapfnss()

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
.schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 1500px;
    height: 500px;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
</style>
