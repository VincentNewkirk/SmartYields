import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Pages } from '/imports/api/pages.js';

class Menu extends React.Component {
    render() {
        return this.props.pages.map((page) => (
            <li>{page.title}</li>
        ));
    }
};

export default createContainer(() => {
    Meteor.subscribe('pages');
    return {
        pages: Pages.find({}).fetch()
    }
});
