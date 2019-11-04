'use strict';

var Mt = require("./mt.js");
var Block = require("../../lib/js/block.js");

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

function check_healty(check) {
  if (!check.a && !check.b) {
    return !check.c;
  } else {
    return false;
  }
}

function basic_not(x) {
  return !x;
}

function f(check) {
  if (check.x) {
    return check.y;
  } else {
    return false;
  }
}

eq("File \"gpr_904_test.ml\", line 23, characters 5-12", f({
          x: true,
          y: false
        }), false);

eq("File \"gpr_904_test.ml\", line 26, characters 5-12", check_healty({
          a: false,
          b: false,
          c: true
        }), false);

Mt.from_pair_suites("Gpr_904_test", suites[/* contents */0]);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.check_healty = check_healty;
exports.basic_not = basic_not;
exports.f = f;
/*  Not a pure module */
