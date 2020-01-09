import React from "react";
import { render, cleanup } from "@testing-library/react";

import Loading from './loading'

describe('<Loading />', () => {

  afterEach(cleanup);

  it("renders", () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
})




