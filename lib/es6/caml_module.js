

import * as Caml_obj from "./caml_obj.js";

function init_mod(loc, shape) {
  var undef_module = function (param) {
    throw {
          RE_EXN_ID: "Undefined_recursive_module",
          _1: loc,
          Error: new Error()
        };
  };
  var loop = function (shape, struct_, idx) {
    if (typeof shape !== "object") {
      switch (shape) {
        case "Function" :
            struct_[idx] = undef_module;
            return ;
        case "Lazy" :
            struct_[idx] = {
              LAZY_DONE: true,
              VAL: undef_module
            };
            return ;
        case "Class" :
            struct_[idx] = [
              undef_module,
              undef_module,
              undef_module,
              0
            ];
            return ;
        
      }
    } else {
      if (shape.TAG === "Module") {
        var comps = shape._0;
        var v = {};
        struct_[idx] = v;
        var len = comps.length;
        for(var i = 0; i < len; ++i){
          var match = comps[i];
          loop(match[0], v, match[1]);
        }
        return ;
      }
      struct_[idx] = shape._0;
      return ;
    }
  };
  var res = {};
  var dummy_name = "dummy";
  loop(shape, res, dummy_name);
  return res[dummy_name];
}

function update_mod(shape, o, n) {
  var aux = function (shape, o, n, parent, i) {
    if (typeof shape !== "object") {
      switch (shape) {
        case "Function" :
            parent[i] = n;
            return ;
        case "Lazy" :
        case "Class" :
            return Caml_obj.update_dummy(o, n);
        
      }
    } else {
      if (shape.TAG !== "Module") {
        return ;
      }
      var comps = shape._0;
      for(var i$1 = 0 ,i_finish = comps.length; i$1 < i_finish; ++i$1){
        var match = comps[i$1];
        var name = match[1];
        aux(match[0], o[name], n[name], o, name);
      }
      return ;
    }
  };
  if (typeof shape !== "object") {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "caml_module.ml",
            107,
            10
          ],
          Error: new Error()
        };
  }
  if (shape.TAG === "Module") {
    var comps = shape._0;
    for(var i = 0 ,i_finish = comps.length; i < i_finish; ++i){
      var match = comps[i];
      var name = match[1];
      aux(match[0], o[name], n[name], o, name);
    }
    return ;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "caml_module.ml",
          107,
          10
        ],
        Error: new Error()
      };
}

export {
  init_mod ,
  update_mod ,
}
/* No side effect */
