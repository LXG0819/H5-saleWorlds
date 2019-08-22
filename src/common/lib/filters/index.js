
export default{
    install(Vue){
        //距离过滤器
        Vue.filter('examTimeFilter', (value, ...rest)=>{
            var min = parseInt(value/60) + ''
            var second = parseInt(value%60) + ''
            if(min.length == 1){
                min = '0' + min
            }else if(second.length == 1){
                second = '0' + second
            }
            return min + '分' + second + '秒'
            
        })
        //学习课程创建时间过滤
        Vue.filter('courseTime', (value, ...rest)=>{
            if(!value){
                return '--'
            }else{
                var time = value.substring(0, 10)
           
                return time 
            }
        })
        //学习进度
        Vue.filter('courseProgress', (value, ...rest)=>{
            if(value == 0){
                return '未开始'
            }else if(value == 50){
                return  "未考试"
            }
        })
        //阅读数
        Vue.filter('courseTaCount', (value, ...rest)=>{
            var valStr = value 
            if(value.length > 9999){
                return (parseInt(value/1000))/10
            }else{
                return  value
            }
        })
    }
}