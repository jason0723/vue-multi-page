/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 2018/1/2.
 */
export default function checkFileType(file, cb) {
  let reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.addEventListener("load", function (e) {

      console.log(e.target.result);
      let slice = e.target.result.slice(0, 3);
      let view = new Uint8Array(slice);
      let arr = [];
      view.forEach(function (v) {
        arr.push(v.toString(16));
      });
      let result = view.join(" ");

      //识别PDF文件流
      if (result.includes("37 80 68")) {
        resolve(true);
      } else {
        resolve(false)
      }
    });
  });
}
