import React from "react";
import { shallow } from "enzyme";
import App from "components/App";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";

// Using Enzyme allows three types of renders;
// Static - checks for elements existing only and no logic.
// Shallow - renders given component but none of its children.
// Full DOM - everything.

let component;

beforeEach(() => {
    component = shallow(<App />); // Shallow wraps our App component into a const 'component'
});

it("has one component of CommentBox", () => {
    expect(component.find(CommentBox).length).toEqual(1); // Find returns an array of what is found.
});

it("has one component of CommentList", () => {
    expect(component.find(CommentList).length).toEqual(1);
});
