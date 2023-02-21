import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardRequest from "../components/CardRequest";

function FeedbackDetail({ datas, setDatas }) {
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState([]);
  const [newReply, setNewReply] = useState("");
  const maxCharacters = 250;
  const charactersLeft = maxCharacters - newComment.length;
  const navigate = useNavigate();
  const { feedbackId } = useParams();
  const productRequests = datas.productRequests;
  const currentUser = datas.currentUser;

  const filteredRequest = productRequests?.filter(
    (productRequest) => productRequest.id === feedbackId * 1
  );

  const handleNewComment = () => {
    const comment = {
      id: Math.random().toString(36).substring(7),
      content: newComment,
      user: {
        image: currentUser.image,
        name: currentUser.name,
        username: currentUser.username,
      },
      replies: [],
    };
    const updatedProductRequests = productRequests.map((productRequest) => {
      if (productRequest.id === feedbackId * 1) {
        return {
          ...productRequest,
          comments: [...productRequest.comments, comment],
        };
      }
      return productRequest;
    });
    setDatas({
      ...datas,
      productRequests: updatedProductRequests,
    });
    setNewComment("");
  };

  const handleDeleteComment = (commentId) => {
    const updatedProductRequests = productRequests.map((productRequest) => {
      if (productRequest.id === feedbackId * 1) {
        return {
          ...productRequest,
          comments: productRequest.comments.filter(
            (comment) => comment.id !== commentId
          ),
        };
      }
      return productRequest;
    });
    setDatas({
      ...datas,
      productRequests: updatedProductRequests,
    });
  };

  const handleReplyClick = (commentId) => {
    const replyIndex = reply.findIndex((r) => r.commentId === commentId);
    if (replyIndex === -1) {
      // if reply state doesn't exist for this comment, create it
      setReply([...reply, { commentId, value: true }]);
    } else {
      // if reply state already exists for this comment, toggle its value
      setReply([
        ...reply.slice(0, replyIndex),
        { commentId, value: !reply[replyIndex].value },
        ...reply.slice(replyIndex + 1),
      ]);
    }
  };

  const isReplyVisible = (commentId) => {
    const replyState = reply.find((r) => r.commentId === commentId);
    return replyState ? replyState.value : false;
  };

  const handleNewReply = (commentId) => {
    const updatedProductRequests = productRequests.map((productRequest) => {
      if (productRequest.id === feedbackId * 1) {
        return {
          ...productRequest,
          comments: productRequest.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: Math.random().toString(36).substring(7),
                    content: newReply,
                    user: {
                      image: currentUser.image,
                      name: currentUser.name,
                      username: currentUser.username,
                    },
                  },
                ],
              };
            }
            return comment;
          }),
        };
      }
      return productRequest;
    });
    setDatas({
      ...datas,
      productRequests: updatedProductRequests,
    });
    setNewReply("");
    handleReplyClick(commentId);
  };

  return (
    <div className="min-h-screen p-6 bg-verylightgray">
      <div className="flex justify-between mb-6">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate(`/product-feedback-app/`)}
        >
          <img src="/assets/shared/icon-arrow-left.svg" alt="icon arrow left" />
          <p className="text-sm font-bold text-gray">Go Back</p>
        </div>
        <button
          className="px-4 py-[10.5px] bg-blue rounded-[10px] text-lightgray text-sm font-bold"
          onClick={() =>
            navigate(`/product-feedback-app/edit-feedback/${feedbackId}`)
          }
        >
          Edit Feedback
        </button>
      </div>

      {datas != [] > 0 &&
        filteredRequest.map((productRequest) => (
          <CardRequest
            productRequest={productRequest}
            key={productRequest.id}
          />
        ))}

      <div className="bg-white w-full p-6 rounded-[10px] mt-6">
        <h5 className="font-bold text-lg text-darkblue tracking-tighter mb-6">
          {datas != [] > 0 &&
            filteredRequest.map((productRequest) => {
              const numComments = productRequest.comments?.length;
              const numReplies = productRequest.comments?.reduce(
                (total, comment) => total + (comment.replies?.length || 0),
                0
              );
              const total = numComments + numReplies;
              return total > 0
                ? `${total} ${total > 1 ? "Comments" : "Comment"}`
                : "No Comments yet";
            })}
        </h5>
        {datas != [] > 0 &&
          filteredRequest.map((productRequest) =>
            productRequest.comments?.map((comment) => (
              <div className="flex flex-col gap-4 mb-6" key={comment.id}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      className="rounded-full w-10 h-10"
                      src={comment.user.image.slice(1)}
                      alt="icon user"
                    />
                    <div>
                      <p className="text-sm font-bold text-darkblue">
                        {comment.user.name}
                      </p>
                      <p className="text-sm text-gray">
                        @{comment.user.username}
                      </p>
                    </div>
                  </div>
                  {comment.user.username !== currentUser.username ? (
                    <button
                      className="font-semibold text-sm text-blue"
                      onClick={() => handleReplyClick(comment.id)}
                    >
                      Reply
                    </button>
                  ) : (
                    <button
                      className="font-semibold text-sm text-red"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="text-sm text-gray">{comment.content}</div>
                {isReplyVisible(comment.id) && (
                  <div className="flex flex-col">
                    <textarea
                      className="mb-4 bg-verylightgray w-full h-[80px] rounded-[5px] p-4 resize-none text-sm"
                      type="text"
                      placeholder="Type your reply here"
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                    />
                    <button className="w-[117px] self-end px-4 py-[10.5px] bg-violet rounded-[10px] text-lightgray text-sm font-bold">
                      Post Reply
                    </button>
                  </div>
                )}
                {!comment.replies?.length > 0 ? (
                  <div className="w-full h-[1px] bg-separator opacity-25 my-2"></div>
                ) : (
                  comment.replies?.map((reply, index) => (
                    <div
                      className="flex flex-col gap-4 mt-2 relative border-l-[1px] border-border pl-6"
                      key={index}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <img
                            className="rounded-full w-10 h-10"
                            src={reply.user.image.slice(1)}
                            alt="icon user"
                          />
                          <div>
                            <p className="text-sm font-bold text-darkblue">
                              {reply.user.name}
                            </p>
                            <p className="text-sm text-gray">
                              @{reply.user.username}
                            </p>
                          </div>
                        </div>
                        <button className="font-semibold text-sm text-blue">
                          Reply
                        </button>
                      </div>
                      <div className="text-sm text-gray">
                        <span className="text-violet font-semibold">
                          @{reply.replyingTo}
                        </span>{" "}
                        {reply.content}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ))
          )}
      </div>

      <div className=" bg-white w-full p-6 rounded-[10px] mt-6">
        <h5 className="font-bold text-lg text-darkblue tracking-tighter mb-6">
          Add Comment
        </h5>
        <textarea
          className="mb-4 bg-verylightgray w-full h-[80px] rounded-[5px] p-4 resize-none text-sm"
          type="text"
          placeholder="Type your comment here"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray">{charactersLeft} Characters left</p>
          <button
            className="text-sm font-bold text-lightgray bg-violet rounded-[10px] px-4 py-[10.35px]"
            onClick={handleNewComment}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackDetail;
