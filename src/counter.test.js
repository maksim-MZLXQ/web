import { describe, it, expect, beforeEach } from "vitest";
import { setupCounter } from "./counter.js";

describe("setupCounter", () => {
  let button;

  beforeEach(() => {
    button = document.createElement("button");
  });

  it("sets initial count to 0", () => {
    setupCounter(button);
    expect(button.innerHTML).toBe("Count is 0");
  });

  it("increments count on click", () => {
    setupCounter(button);
    button.click();
    expect(button.innerHTML).toBe("Count is 1");
  });

  it("increments count multiple times", () => {
    setupCounter(button);
    button.click();
    button.click();
    button.click();
    expect(button.innerHTML).toBe("Count is 3");
  });
});
