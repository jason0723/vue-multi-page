/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Hallmader on 2018/4/18.
 */


class TimeFormat{
  constructor(){

  }


//时间处理  2017年05月08日 星期一 14:20 / 2017.05.08 星期一 14:20
  timeFormate(op) {
    let _operationTime = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      _timeDeal = op.time.substring(0, 10).replace(/\-/g, "\/"),
      _timesList = new Date(_timeDeal).getDay(),
      _timeCompare = '', //  2017年05月08日 星期一 14:20
      _timeCompares = '', //  05月08日 星期一 14:20
      _week = _operationTime[_timesList],
      _hours = op.time.substring(11, 16);
    switch (parseInt(op.type)) {
      case 1: //2017年05月08日
        _timeCompare = op.time.substring(0, 4) + "年" + op.time.substring(5, 7) + "月" + op.time.substring(8, 10) + "日"; //  2017年05月08日 星期一 14:20
        _timeCompares = op.time.substring(5, 7) + "月" + op.time.substring(8, 10) + "日"; //  05月08日 星期一 14:20
        break;
      case 2: //2017.05.08
        _timeCompare = op.time.substring(0, 4) + "." + op.time.substring(5, 7) + "." + op.time.substring(8, 10); //  2017.05.08 星期一 14:20
        _timeCompares = op.time.substring(5, 7) + "." + op.time.substring(8, 10); //  05.08 星期一 14:20
        break;
      case 3:
        _timeCompare = op.time.substring(0, 4) + "-" + op.time.substring(5, 7) + "-" + op.time.substring(8, 10); //  2017-05-08 星期一 14:20
        _timeCompares = op.time.substring(5, 7) + "-" + op.time.substring(8, 10); //  05-08 星期一 14:20
        break;
    }
    return {year: _timeCompare, years: _timeCompares, week: _week, hour: _hours};
  }

  MillisecondToDate(msd) {
    let time = parseInt(parseInt(msd) / 1000);
    if (null != time && "" != time) {
      if (time > 60 && time < 60 * 60) {
        time = parseInt(time / 60.0) + "分钟"; //+ parseInt((parseFloat(time /60.0) -parseInt(time /60.0)) *60) +"秒";
      } else if (time >= 60 * 60 && time <= 60 * 60 * 24) {
        time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
          parseInt(time / 3600.0)) * 60) + "分钟"; //+
        // parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -
        //     parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60) +"秒";
      } else if (time >= 60 * 60 * 24) {
        time = Math.round(parseInt(time / (3600 * 24))) + "天";
      }
    } else {
      time = "0 时 0 分0 秒";
    }
    return time;

  }

  MillisecondToDateNew(msd) {
    let time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
      if (time > 60 && time < 60 * 60) {
        time = parseInt(time / 60.0) + "分钟"; //+ parseInt((parseFloat(time /60.0) -parseInt(time /60.0)) *60) +"秒";
      } else if (time >= 60 * 60 && time <= 60 * 60 * 24) {
        time = parseInt(time / 3600.0) + "小时"
        // parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -
        //     parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60) +"秒";
      } else {
        time = parseInt(time) + "秒";
      }
    } else {
      time = "0 时 0 分0 秒";
    }
    return time;

  }
}

export default new TimeFormat();
