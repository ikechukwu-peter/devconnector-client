import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

const CommentForm = ({ addComment, errors, auth: { user }, postId }) => {
  const [text, setText] = useState("");
  const { name, avatar, _ } = user;
  const onSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      text,
      name,
      avatar,
    };
    console.log(newComment);
    addComment(postId, newComment);
    setText("");
  };
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a Comment </div>
        <div className="card-body">
          <form className="form my-1" onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply to a post"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                error={errors.text}
              />
            </div>
            <button type="submit" className="btn btn-dark my-1">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});
export default connect(mapStateToProps, { addComment })(CommentForm);
