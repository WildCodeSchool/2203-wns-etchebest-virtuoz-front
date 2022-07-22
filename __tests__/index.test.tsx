import { findByText, render, screen, waitFor } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { users } from "src/pages/_app";
import Home from "src/pages";

const mocks = [
  {
    request: {
      query: users,
    },
    result: {
      data: {
        allUsers: [
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
    const element = await waitFor(() => screen.getByText("list"));
    expect(element).toBeInTheDocument();
  });
});
