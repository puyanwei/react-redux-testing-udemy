import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import requireAuth from 'components/requireAuth';

class CommentBox extends Component {
    state = { comment: '' };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4>Add a Comment</h4>
                    <textarea
                        onChange={this.handleChange}
                        value={this.state.comment}
                    />
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
                <button
                    className="fetch-comments"
                    onClick={this.props.fetchComments}
                >
                    Fetch Comments
                </button>
            </div>
        );
    }

    handleChange = event => {
        this.setState({ comment: event.target.value });
    };
    handleSubmit = event => {
        event.preventDefault();
        // Call an Action creator
        this.props.saveComment(this.state.comment);
        // Save the comment
        this.setState({ comment: '' });
    };
}

export default connect(
    null,
    actions
)(requireAuth(CommentBox));
