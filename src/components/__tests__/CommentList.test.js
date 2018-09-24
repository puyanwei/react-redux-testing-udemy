import React from "react";
import { mount } from "enzyme";
import Root from "Root";

import CommentList from "components/CommentList";

let component;

beforeEach(() => {
    const initialState = {
        comments: ["Hello", "Goodbye"]
    };

    component = mount(
        <Root initialState={initialState}>
            <CommentList />
        </Root>
    );
});

afterEach(() => {
    component.unmount();
});

it("creates one <li> per coment", () => {
    expect(component.find("li").length).toEqual(2);
});

it("shows the text for each comment", () => {
    expect(component.render().text()).toContain("Hello");
    expect(component.render().text()).toContain("Goodbye");
});
