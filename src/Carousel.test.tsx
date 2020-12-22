import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("renders without crashing", function(): void {
  render(<Carousel />);
});

// snapshot test
it("matches snapshot", function(): void {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function(): void {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow: HTMLElement | null = queryByTestId("right-arrow");
  fireEvent.click(rightArrow as HTMLElement);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function(): void {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow: HTMLElement | null = queryByTestId("right-arrow");
  fireEvent.click(rightArrow as HTMLElement);

  // move backward in the carousel
  const leftArrow: HTMLElement | null = queryByTestId("left-arrow");
  fireEvent.click(leftArrow as HTMLElement);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("On first picture left arrow disappears", function(): void {
  const { queryByTestId } = render(<Carousel />);

  // expect the left arrow to not show
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

it("On third picture right arrow disappears", function(): void {
  const { queryByTestId } = render(<Carousel />);

  // move forward 1 pic in the carousel
  const rightArrow1: HTMLElement | null = queryByTestId("right-arrow");
  fireEvent.click(rightArrow1 as HTMLElement);

  // expect the right arrow to show still
  expect(queryByTestId("right-arrow")).toBeInTheDocument();

  // move forward 1 pic in the carousel
  const rightArrow2: HTMLElement | null = queryByTestId("right-arrow");
  fireEvent.click(rightArrow2 as HTMLElement);
  
  // expect the right arrow to be removed
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});