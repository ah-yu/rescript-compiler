(* Copyright (C) 2015-2016 Bloomberg Finance L.P.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * In addition to the permissions granted to you by the LGPL, you may combine
 * or link a "work that uses the Library" with a publicly distributed version
 * of this file to produce a combined library or application, then distribute
 * that combined work under the terms of your choosing, with no requirement
 * to comply with the obligations normally placed on you by section 4 of the
 * LGPL version 3 (or the corresponding section of a later version of the LGPL
 * should you choose to use a later version).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA. *)

(** Provides functionality for dealing with the `'a Js.null` type *)

(** Provides functionality for dealing with the `Js.null('a)` type *)

type +'a t = 'a Js.null =
  | Value of 'a
  | Null [@as null]
[@@unboxed]
(** Local alias for `Js.null('a)` *)

external return : 'a -> 'a t = "%identity"
(** Constructs a value of `Js.null('a)` containing a value of `'a`. *)

val test : 'a t -> bool
  [@@deprecated "Use = Js.null directly "]
(** Returns `true` if the given value is empty (`null`), `false` otherwise. *)

external empty : 'a t = "#null"
(** The empty value, `null` *)

external getUnsafe : 'a t -> 'a = "%identity"
val getExn : 'a t -> 'a

val bind : 'a t -> (('a -> 'b)[@bs]) -> 'b t
(**
Maps the contained value using the given function.

If `Js.null('a)` contains a value, that value is unwrapped, mapped to a `'b`
using the given function `'a => 'b`, then wrapped back up and returned as
`Js.null('b)`.

```res example
let maybeGreetWorld = (maybeGreeting: Js.null<string>) =>
  Js.Null.bind(maybeGreeting, (. greeting) => greeting ++ " world!")
```
*)

val iter : 'a t -> (('a -> unit)[@bs]) -> unit
(**
Iterates over the contained value with the given function.
If `Js.null('a)` contains a value, that value is unwrapped and applied to the given function.

```res example
let maybeSay = (maybeMessage: Js.null<string>) =>
  Js.Null.iter(maybeMessage, (. message) => Js.log(message))
```
*)

val fromOption : 'a option -> 'a t
(**
Maps `option('a)` to `Js.null('a)`.
`Some(a)` => `a`
`None` => `empty`
*)

val from_opt : 'a option -> 'a t [@@deprecated "Use fromOption instead"]

external toOption : 'a t -> 'a option = "#null_to_opt"
(**
Maps `Js.null('a)` to `option('a)`.
`a` => `Some(a)`
`empty` => `None`
*)

external to_opt : 'a t -> 'a option = "#null_to_opt"
  [@@deprecated "Use toOption instead"]
