'use strict';

var Mt = require("./mt.js");
var Block = require("../../lib/js/block.js");
var Global_mangles = require("./global_mangles.js");

var suites = [/* contents : [] */0];

var test_id = [/* contents */0];

function eq(loc, x, y) {
  test_id[/* contents */0] = test_id[/* contents */0] + 1 | 0;
  suites[/* contents */0] = /* :: */[
    /* tuple */[
      loc + (" id " + String(test_id[/* contents */0])),
      (function (param) {
          return /* Eq */Block.__(0, [
                    x,
                    y
                  ]);
        })
    ],
    suites[/* contents */0]
  ];
  return /* () */0;
}

eq("File \"key_word_property_plus_test.ml\", line 10, characters 5-12", /* array */[
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14
      ].reduce((function (prim, prim$1) {
            return prim + prim$1 | 0;
          }), 0), ((((((((((((Global_mangles.$$__dirname + Global_mangles.$$__filename | 0) + Global_mangles.$$clearImmediate | 0) + Global_mangles.$$clearInterval | 0) + Global_mangles.$$clearTimeout | 0) + Global_mangles.$$console | 0) + Global_mangles.$$exports | 0) + Global_mangles.$$global | 0) + Global_mangles._module | 0) + Global_mangles.$$process | 0) + Global_mangles.$$require | 0) + Global_mangles.$$setImmediate | 0) + Global_mangles.$$setInterval | 0) + Global_mangles.$$setTimeout | 0);

Mt.from_pair_suites("Key_word_property_plus_test", suites[/* contents */0]);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
/*  Not a pure module */
