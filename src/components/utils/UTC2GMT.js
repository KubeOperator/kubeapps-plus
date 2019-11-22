/**
 * 将UTC时间转化为当地时区时间（UTC转GMT）
 * time: UTC时间格式一般为 "2019-11-16T05:23:20.000Z"
 * @author: maguohao
 */
export function UTC2GMT (time) {
    if(!time){
        return '-';
    }
    function formatFunc(str) {    //格式化显示
        return str > 9 ? str : '0' + str
    }
    let date2 = new Date(time);     //这步是关键
    let year = date2.getFullYear();
    let mon = formatFunc(date2.getMonth() + 1);
    let day = formatFunc(date2.getDate());

    var dateStr = year + '年'+mon+'月'+day+'日';
    return dateStr;
}
