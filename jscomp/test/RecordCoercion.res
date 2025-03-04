type r1 = {a: option<int>, b: int}

type r2 = {a?: int, b: int}

type r3 = {a?: int}

type r4 = {}

let _ = (x: r1) => (x :> r2) // Convert a from mandatory to optional
// let _ = (x: r2) => (x :> r1) can't turn an optional field to a mandatory one
let _ = (x: r2) => (x :> r3) // can omit field
let _ = (x: r1) => (x :> r3) // omit field and convert from mandatory to optional
let _ = (x: r3) => (x :> r4) // omit everything

type nested1 = {n: r1, extra: int}
type nested2 = {n: r2}
let _ = (x: nested1) => (x :> nested2)
