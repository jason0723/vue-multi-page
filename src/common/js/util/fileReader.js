/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Hallmader on 2018/3/12.
 */


export default class FileReaderBaseMethods {
  constructor() {
    this.reader = new FileReader();
  }

  getBase64Url(file) {
    return new Promise((resolve, reject) => {
      this.reader.readAsDataURL(file);
      this.reader.onload = oFREvent => {
        resolve(oFREvent.target.result);
      }
    });
  }
}
