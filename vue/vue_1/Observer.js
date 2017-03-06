//将参数的数据属性转为存取器属性，并挂在data属性下。
function Observer(obj) {
  if (Object.prototype.toString.call(obj) !== "[object Object]") throw "参数不合法"
  var map = {};
  for (let key in obj) {
    map[key] = {
      get: function() {
        console.log('你访问了' + key)
        return obj[key];
      },
      set: function(value) {
        obj[key] = value;
        console.log('你设置了' + key + ',新的值为' + value)
      }
    }
  }
  this.data = {};
  Object.defineProperties(this.data, map);
}