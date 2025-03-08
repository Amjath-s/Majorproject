// function  Community()
// {
//     return(



//         <h5>hey community</h5>
//     )
// }
// export default Community;

import React, { useState } from "react";

function Community() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Function to add a new post
  const addPost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, { id: Date.now(), text: newPost, comments: [] }]);
      setNewPost("");
    }
  };

  // Function to add a comment to a post
  const addComment = (postId, commentText) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: Date.now(), text: commentText, replies: [] },
              ],
            }
          : post
      )
    );
  };

  // Function to add a reply to a comment
  const addReply = (postId, commentId, replyText) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: [
                        ...comment.replies,
                        { id: Date.now(), text: replyText },
                      ],
                    }
                  : comment
              ),
            }
          : post
      )
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Community Forum</h2>

      {/* Input for new post */}
      <div style={styles.inputContainer}>
        <textarea
          style={styles.textarea}
          placeholder="Write your post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={addPost} style={styles.button}>
          Post
        </button>
      </div>

      {/* Display Posts */}
      {posts.length === 0 ? (
        <p style={styles.noPosts}>No posts yet. Be the first to post!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={styles.post}>
            <p style={styles.postText}>{post.text}</p>

            {/* Comment Section */}
            <CommentSection
              postId={post.id}
              comments={post.comments}
              addComment={addComment}
              addReply={addReply}
            />
          </div>
        ))
      )}
    </div>
  );
}

// Comment Section Component
function CommentSection({ postId, comments, addComment, addReply }) {
  const [commentText, setCommentText] = useState("");

  return (
    <div style={styles.commentSection}>
      {/* Add Comment */}
      <div style={styles.commentInputContainer}>
        <input
          style={styles.input}
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          onClick={() => {
            addComment(postId, commentText);
            setCommentText("");
          }}
          style={styles.commentButton}
        >
          Comment
        </button>
      </div>

      {/* Display Comments */}
      {comments.map((comment) => (
        <div key={comment.id} style={styles.comment}>
          <p>{comment.text}</p>

          {/* Reply Section */}
          <ReplySection
            postId={postId}
            commentId={comment.id}
            replies={comment.replies}
            addReply={addReply}
          />
        </div>
      ))}
    </div>
  );
}

// Reply Section Component
function ReplySection({ postId, commentId, replies, addReply }) {
  const [replyText, setReplyText] = useState("");

  return (
    <div style={styles.replySection}>
      {/* Add Reply */}
      <div style={styles.replyInputContainer}>
        <input
          style={styles.input}
          placeholder="Reply..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button
          onClick={() => {
            addReply(postId, commentId, replyText);
            setReplyText("");
          }}
          style={styles.replyButton}
        >
          Reply
        </button>
      </div>

      {/* Display Replies */}
      {replies.map((reply) => (
        <div key={reply.id} style={styles.reply}>
          <p>{reply.text}</p>
        </div>
      ))}
    </div>
  );
}

// Inline CSS styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "10px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "5px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  noPosts: {
    textAlign: "center",
    color: "#666",
  },
  post: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    border: "1px solid #ddd",
  },
  postText: {
    fontWeight: "bold",
  },
  commentSection: {
    marginTop: "10px",
  },
  commentInputContainer: {
    display: "flex",
    marginTop: "5px",
  },
  input: {
    flex: 1,
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  commentButton: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  comment: {
    backgroundColor: "#fff",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginTop: "5px",
    marginLeft: "10px",
  },
  replySection: {
    marginLeft: "15px",
    marginTop: "5px",
  },
  replyInputContainer: {
    display: "flex",
  },
  replyButton: {
    backgroundColor: "#6f42c1",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  reply: {
    backgroundColor: "#e9ecef",
    padding: "5px",
    borderRadius: "5px",
    marginTop: "5px",
    marginLeft: "10px",
  },
};

export default Community;
