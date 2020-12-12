import Footer from "../Footer";
import { screen, render } from "@testing-library/react";

test("renders 2020 Turkay TUNC link", () => {
  render(<Footer />);
  const linkElement = screen.getByText(/2020 Turkay TUNC/i);
  expect(linkElement).toBeInTheDocument();
});
