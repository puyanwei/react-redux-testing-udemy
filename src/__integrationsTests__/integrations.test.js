import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';

import App from 'components/App';

beforeEach(() => {
    moxios.install(); // Stops any axios requests
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [
            { name: 'comment one' },
            { name: 'comment two' },
            { name: 'comment three' }
        ]
    });
    // Intercepts existing axios request and return a mock object
});
afterEach(() => {
    moxios.uninstall();
});

it('can fetch a list of comments and display them', done => {
    //Attempt to render the entire app
    const component = mount(
        <Root>
            <App />
        </Root>
    );
    // find the 'fetchComments button and click it'
    component.find('.fetch-comments').simulate('click');
    // expect to find the list of comments
    moxios.wait(() => {
        component.update(); // Tells component to update
        expect(component.find('li').length).toEqual(3);
        done(); // Tells Jest to wait
        component.unmount();
    }); // Needs timeout to give a little delay for moxios return response
});
