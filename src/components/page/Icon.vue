<template>
    <div>
     
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 我的成绩
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-select v-model="query.stuGrade" placeholder="年级" class="handle-select mr10">
                    <el-option
                        v-for="item in stuGrades"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select> -->
                <el-select v-model="query.studate" placeholder="学期" class="handle-select mr10">
                    <el-option
                        v-for="item in studates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <!-- <el-select v-model="query.stuClasse" placeholder="班级" class="handle-select mr10">
                    <el-option
                        v-for="item in stuClasses"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select> -->
                
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            
    <el-table
               
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
            </el-table>
        </div>

        
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
                stuGrade: '2017届',
                name: '',
                stuClasse:'',
                studate:''
            },
            cjtable:[{sid:'语文'},{sid:'数学'},{sid:'英语'},{sid:'物理'},{sid:'化学'},{sid:'生物'},{sid:'总分'}],
            activeName:'语文',
            studates:[],
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
            tableData: [],
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
            }
        };
    },
    watch:{
        'query.stuGrade':function(vnew,vold){
            var selecteds = vold.slice(0,4)
            var selected = selecteds +'上'
            var selecteded = selecteds + '下'
            this.studates = [
                {
                value: '',
                label: '请选择'
                },{
                value: selected,
                label: selected
                }, {
                value: selecteded,
                label: selecteded
                }
            ]
        }
    },
    created() {
        this.$notify.success('请选择班级查询')
        this.query.stuGrade = localStorage.getItem('stuGrade')
        this.query.stuClasse = localStorage.getItem('stuClass')
        //  var selecteds = this.query.stuGrade.slice(0,4)
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
        this.getstuade();
    },
    methods: {
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
                    console.log(arrzong)
                    var stuIDD = localStorage.getItem('stuId')
                    var arraylist = arrzong.filter(item=>item.stuNo == stuIDD)
                    console.log(arraylist)
                    this.tableData  = arraylist

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
            }else{
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
