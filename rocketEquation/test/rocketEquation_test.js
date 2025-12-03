import { assertEquals } from "jsr:@std/assert";
import { fuelRequirment, masses } from "../src/rocketEquation.js";

Deno.test("simple case", () => {
  assertEquals(fuelRequirment(12), 2);
});

Deno.test("simple case", () => {
  assertEquals(fuelRequirment(14), 2);
});

Deno.test("A little heavy mass", () => {
  assertEquals(fuelRequirment(1969), 966);
});

Deno.test("heavy mass", () => {
  assertEquals(fuelRequirment(100756), 50346);
});

Deno.test("multiple modules mass", () => {
  assertEquals(masses([12, 14, 1969, 100756]), 50346 + 966 + 2 +2)
})