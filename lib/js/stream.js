'use strict';

var List = require("./list.js");
var Curry = require("./curry.js");
var Caml_bytes = require("./caml_bytes.js");
var Caml_option = require("./caml_option.js");
var Caml_string = require("./caml_string.js");
var Caml_exceptions = require("./caml_exceptions.js");
var CamlinternalLazy = require("./camlinternalLazy.js");

var Failure = /* @__PURE__ */Caml_exceptions.create("Stream.Failure");

var $$Error = /* @__PURE__ */Caml_exceptions.create("Stream.Error");

function count(param) {
  if (param !== undefined) {
    return param.count;
  } else {
    return 0;
  }
}

function data(param) {
  if (param !== undefined) {
    return param.data;
  } else {
    return "Sempty";
  }
}

function get_data(count, _d) {
  while(true) {
    var d = _d;
    if (typeof d !== "object") {
      return d;
    }
    switch (d.TAG) {
      case "Scons" :
          return d;
      case "Sapp" :
          var d2 = d._1;
          var match = get_data(count, d._0);
          if (typeof match !== "object") {
            _d = d2;
            continue ;
          }
          if (match.TAG === "Scons") {
            return {
                    TAG: "Scons",
                    _0: match._0,
                    _1: {
                      TAG: "Sapp",
                      _0: match._1,
                      _1: d2
                    }
                  };
          }
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "stream.ml",
                  48,
                  12
                ],
                Error: new Error()
              };
      case "Slazy" :
          _d = CamlinternalLazy.force(d._0);
          continue ;
      case "Sgen" :
          var g = d._0;
          var match$1 = g.curr;
          if (match$1 !== undefined) {
            var a = Caml_option.valFromOption(match$1);
            if (a !== undefined) {
              g.curr = undefined;
              return {
                      TAG: "Scons",
                      _0: Caml_option.valFromOption(a),
                      _1: d
                    };
            } else {
              return "Sempty";
            }
          }
          var a$1 = Curry._1(g.func, count);
          if (a$1 !== undefined) {
            return {
                    TAG: "Scons",
                    _0: Caml_option.valFromOption(a$1),
                    _1: d
                  };
          } else {
            g.curr = Caml_option.some(undefined);
            return "Sempty";
          }
      
    }
  };
}

function peek_data(s) {
  while(true) {
    var f = s.data;
    if (typeof f !== "object") {
      return ;
    }
    switch (f.TAG) {
      case "Scons" :
          return Caml_option.some(f._0);
      case "Sapp" :
          var d = get_data(s.count, s.data);
          if (typeof d !== "object") {
            return ;
          }
          if (d.TAG === "Scons") {
            s.data = d;
            return Caml_option.some(d._0);
          }
          throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "stream.ml",
                  71,
                  12
                ],
                Error: new Error()
              };
      case "Slazy" :
          s.data = CamlinternalLazy.force(f._0);
          continue ;
      case "Sgen" :
          var g = f._0;
          var a = g.curr;
          if (a !== undefined) {
            return Caml_option.valFromOption(a);
          }
          var x = Curry._1(g.func, s.count);
          g.curr = Caml_option.some(x);
          return x;
      
    }
  };
}

function peek(s) {
  if (s !== undefined) {
    return peek_data(s);
  }
  
}

function junk_data(s) {
  while(true) {
    var g = s.data;
    if (typeof g === "object") {
      switch (g.TAG) {
        case "Scons" :
            s.count = s.count + 1 | 0;
            s.data = g._1;
            return ;
        case "Sgen" :
            var g$1 = g._0;
            var match = g$1.curr;
            if (match !== undefined) {
              s.count = s.count + 1 | 0;
              g$1.curr = undefined;
              return ;
            }
            break;
        default:
          
      }
    }
    var match$1 = peek_data(s);
    if (match$1 === undefined) {
      return ;
    }
    continue ;
  };
}

function junk(data) {
  if (data !== undefined) {
    return junk_data(data);
  }
  
}

function nget_data(n, s) {
  if (n <= 0) {
    return [
            /* [] */0,
            s.data,
            0
          ];
  }
  var a = peek_data(s);
  if (a === undefined) {
    return [
            /* [] */0,
            s.data,
            0
          ];
  }
  var a$1 = Caml_option.valFromOption(a);
  junk_data(s);
  var match = nget_data(n - 1 | 0, s);
  return [
          {
            hd: a$1,
            tl: match[0]
          },
          {
            TAG: "Scons",
            _0: a$1,
            _1: match[1]
          },
          match[2] + 1 | 0
        ];
}

function npeek(n, d) {
  if (d !== undefined) {
    var match = nget_data(n, d);
    d.count = d.count - match[2] | 0;
    d.data = match[1];
    return match[0];
  } else {
    return /* [] */0;
  }
}

function next(s) {
  var a = peek(s);
  if (a !== undefined) {
    junk(s);
    return Caml_option.valFromOption(a);
  }
  throw {
        RE_EXN_ID: Failure,
        Error: new Error()
      };
}

function empty(s) {
  var match = peek(s);
  if (match === undefined) {
    return ;
  }
  throw {
        RE_EXN_ID: Failure,
        Error: new Error()
      };
}

function iter(f, strm) {
  var _param;
  while(true) {
    var a = peek(strm);
    if (a === undefined) {
      return ;
    }
    junk(strm);
    Curry._1(f, Caml_option.valFromOption(a));
    _param = undefined;
    continue ;
  };
}

function from(f) {
  return {
          count: 0,
          data: {
            TAG: "Sgen",
            _0: {
              curr: undefined,
              func: f
            }
          }
        };
}

function of_list(l) {
  return {
          count: 0,
          data: List.fold_right((function (x, l) {
                  return {
                          TAG: "Scons",
                          _0: x,
                          _1: l
                        };
                }), l, "Sempty")
        };
}

function of_string(s) {
  var count = {
    contents: 0
  };
  return from(function (param) {
              var c = count.contents;
              if (c < s.length) {
                count.contents = count.contents + 1 | 0;
                return Caml_string.get(s, c);
              }
              
            });
}

function of_bytes(s) {
  var count = {
    contents: 0
  };
  return from(function (param) {
              var c = count.contents;
              if (c < s.length) {
                count.contents = count.contents + 1 | 0;
                return Caml_bytes.get(s, c);
              }
              
            });
}

function iapp(i, s) {
  return {
          count: 0,
          data: {
            TAG: "Sapp",
            _0: data(i),
            _1: data(s)
          }
        };
}

function icons(i, s) {
  return {
          count: 0,
          data: {
            TAG: "Scons",
            _0: i,
            _1: data(s)
          }
        };
}

function ising(i) {
  return {
          count: 0,
          data: {
            TAG: "Scons",
            _0: i,
            _1: "Sempty"
          }
        };
}

function lapp(f, s) {
  return {
          count: 0,
          data: {
            TAG: "Slazy",
            _0: {
              LAZY_DONE: false,
              VAL: (function () {
                  return {
                          TAG: "Sapp",
                          _0: data(Curry._1(f, undefined)),
                          _1: data(s)
                        };
                })
            }
          }
        };
}

function lcons(f, s) {
  return {
          count: 0,
          data: {
            TAG: "Slazy",
            _0: {
              LAZY_DONE: false,
              VAL: (function () {
                  return {
                          TAG: "Scons",
                          _0: Curry._1(f, undefined),
                          _1: data(s)
                        };
                })
            }
          }
        };
}

function lsing(f) {
  return {
          count: 0,
          data: {
            TAG: "Slazy",
            _0: {
              LAZY_DONE: false,
              VAL: (function () {
                  return {
                          TAG: "Scons",
                          _0: Curry._1(f, undefined),
                          _1: "Sempty"
                        };
                })
            }
          }
        };
}

function slazy(f) {
  return {
          count: 0,
          data: {
            TAG: "Slazy",
            _0: {
              LAZY_DONE: false,
              VAL: (function () {
                  return data(Curry._1(f, undefined));
                })
            }
          }
        };
}

function dump_data(f, param) {
  if (typeof param !== "object") {
    console.log("Sempty");
    return ;
  }
  switch (param.TAG) {
    case "Scons" :
        console.log("Scons (");
        Curry._1(f, param._0);
        console.log(", ");
        dump_data(f, param._1);
        console.log(")");
        return ;
    case "Sapp" :
        console.log("Sapp (");
        dump_data(f, param._0);
        console.log(", ");
        dump_data(f, param._1);
        console.log(")");
        return ;
    case "Slazy" :
        console.log("Slazy");
        return ;
    case "Sgen" :
        console.log("Sgen");
        return ;
    
  }
}

function dump(f, s) {
  console.log("{count = ");
  var i = count(s);
  console.log(String(i));
  console.log("; data = ");
  dump_data(f, data(s));
  console.log("}");
  console.log("");
}

var sempty;

exports.Failure = Failure;
exports.$$Error = $$Error;
exports.from = from;
exports.of_list = of_list;
exports.of_string = of_string;
exports.of_bytes = of_bytes;
exports.iter = iter;
exports.next = next;
exports.empty = empty;
exports.peek = peek;
exports.junk = junk;
exports.count = count;
exports.npeek = npeek;
exports.iapp = iapp;
exports.icons = icons;
exports.ising = ising;
exports.lapp = lapp;
exports.lcons = lcons;
exports.lsing = lsing;
exports.sempty = sempty;
exports.slazy = slazy;
exports.dump = dump;
/* No side effect */
