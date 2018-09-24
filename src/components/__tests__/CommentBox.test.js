import React from "react";
import { mount } from "enzyme";
import Root from "Root";

import CommentBox from "components/CommentBox";

let component;

beforeEach(() => {
    component = mount(
        <Root>
            <CommentBox />
        </Root>
    );
});

afterEach(() => {
    component.unmount();
});

it("has a text area and two buttons", () => {
    expect(component.find("textarea").length).toEqual(1);
    expect(component.find("button").length).toEqual(2);
});

describe("the text area", () => {
    beforeEach(() => {
        // Simulating 'change' is the html change event not the react event name
        component
            .find("textarea")
            .simulate("change", { target: { value: "new comment" } });
        component.update(); // Have to force update now to happen so that changes can be analysed
    });

    it("has a text area that users can type in", () => {
        expect(component.find("textarea").prop("value")).toEqual("new comment");
    });

    it("text area is emptied after the form has been submitted", () => {
        component.find("form").simulate("submit");
        component.update();
        expect(component.find("textarea").prop("value")).toEqual("");
    });
});
