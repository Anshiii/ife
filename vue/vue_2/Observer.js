function Observer(obj) {
  if (Object.prototype.toString.call(obj) !== "[object Object]") throw "参数不合法";

  function definePro(obj) {
    var map = {};
    for (let key in obj) {
      var value = obj[key];
      if (typeof value == "object") {
        return definePro(value);
      }
      map[key] = {
        get: function() {
          console.log('你访问了' + key);
          return value;
        },
        set: function(newValue) {
          if (typeof newValue == "object") {
            definePro(newValue);
          }
          value = newValue;
          console.log('你设置了' + key + ',新的值为' + newValue);
        }
      };
    }
    Object.defineProperties(obj, map);
  }
  definePro(obj);
  this.data = obj;
}
Observer.prototype = {
  $watch: function(pro, call) {
    var _this = this;
    var val = _this.data[pro];
    if (typeof val == "object" || typeof val == "function") {
      throw "关注的属性必须为基本类型"
    }
    Object.defineProperty(this.data, pro, {
      set: function(newValue) {
        val = newValue;
        if (typeof call === "function") {
          call(newValue);
        }
      }
    })
  }
}