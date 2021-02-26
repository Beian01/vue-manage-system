import axios from 'axios'
// 导入表格
export const uploadXlsx= (url,data)=>{
    return axios({
        method: "post",
        url: `${url}`,
        headers: {
        "Content-type": "multipart/form-data"
        },
        data: data
    })
}