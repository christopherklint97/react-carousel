import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// smoke test
it("renders without crashing", function(): void {
  render(<Card />);
});

// snapshot test
it("matches snapshot", function (): void {
  const {asFragment} = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});