import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

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
    // First rendering of component
    componentDidMount() {
        this.shouldNavigateAway();
    }
    // Any time component gets updated
    componentDidUpdate() {
        this.shouldNavigateAway();
    }

    shouldNavigateAway() {
        if (!this.props.auth) {
            this.props.history.push('/');
        }
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

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(
    mapStateToProps,
    actions
)(CommentBox);
