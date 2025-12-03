import { assertEquals } from "jsr:@std/assert";
import { executeEdicts } from "../src/sprint.js";

Deno.test("one add", () => {
  assertEquals(executeEdicts("1,2,3,3,99"), "1,2,3,6,99");
})

Deno.test("one add and one mul instruction" , () => {
  assertEquals(executeEdicts("1,1,1,4,99,1,2,3,99"), "1,1,1,1,2,1,2,3,99");
});

Deno.test("one mul instructions", () => {
  assertEquals(executeEdicts("2,3,0,3,99"), "2,3,0,6,99");
})

Deno.test("multiple instruction", () => {
  assertEquals(executeEdicts("1,2,3,1,2,2,3,4,1,2,3,4,99"),"1,4,3,1,4,2,3,4,1,2,3,4,99")
})

Deno.test("sample instruction", () => {
  assertEquals(executeEdicts("2,4,4,5,99,0"),"2,4,4,5,99,9801")
})

Deno.test("sample instruction", () => {
  assertEquals(executeEdicts("1,1,1,4,99,5,6,0,99"),"30,1,1,4,2,5,6,0,99")
})

Deno.test("sample input", () => {
  const input = Deno.readTextFileSync("src/input.txt");
  assertEquals(executeEdicts(input), 4023471);
})