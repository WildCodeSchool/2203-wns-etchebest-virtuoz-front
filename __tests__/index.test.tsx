import { render, screen, cleanup } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { users } from "pages/_app";

afterEach(cleanup);
const mocks = [
  {
    request: {
      query: users,
    },
    result: () => {
      return {
        data: {
          getAllUsers: [
            {
              id: "1",
              email: "test",
              name: "sdi",
              password: "test",
            },
            {
              id: "2",
              email: "moss",
              name: "Moss",
              password: "moss",
            },
            {
              id: "3",
              email: "mosspop",
              name: "Moss",
              password: "moss",
            },
          ],
        },
      };
    },
  },
];

describe("Home", () => {
  it("renders a heading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    const element = await screen.getByText("oading...");
    expect(element).toBeInTheDocument;
  });
});
