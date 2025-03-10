/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement a generic `PartialByKeys<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to be optional. When `K` is not provided, it should make all properties optional just like the normal `Partial<T>`.

  For example

  ```typescript
  interface User {
    name: string
    age: number
    address: string
  }

  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```

  > View on GitHub: https://tsch.js.org/2757
*/

/* _____________ Your Code Here _____________ */

type IntersectionToObj<T> = {
  [K in keyof T]: T[K]
}

// type PartialByKeys<T, K extends keyof T = keyof T> = IntersectionToObj<
//   {
//     [K1 in keyof T as K1 extends K ? K1 : never]?: T[K1]
//   } & {
//     [K2 in Exclude<keyof T, K>]: T[K2]
//   }
// >

type PartialByKeys<T, K extends keyof T = keyof T> = Omit<
  {
    [K1 in keyof T as K1 extends K ? K1 : never]?: T[K1]
  } & {
    [K2 in Exclude<keyof T, K>]: T[K2]
  },
  never
>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2757/answer
  > View solutions: https://tsch.js.org/2757/solutions
  > More Challenges: https://tsch.js.org
*/

type A = { name: string }
type B = { age: number }
type C = { address: string }

type ABC = Omit<A & B & C, never>
// type ABC = {
//   name: string;
//   age: number;
//   address: string;
// }
