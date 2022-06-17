import { findByText, render, screen, waitFor } from "@testing-library/react";
import TestRenderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { users } from "pages/_app";
import Home from "pages";

const mocks = [
  {
    request: {
      query: users,
    },
    result: {
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
            email: "@moss",
            name: "Moss",
            password: "mosspassword",
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
    const element = await waitFor(() => screen.getByText("@moss: Moss"));
    expect(element).toBeInTheDocument();
  });
});
