import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardRequest from "../components/CardRequest";
import iconArrowLeft from "/assets/shared/icon-arrow-left.svg";
import imageElijah from "/assets/user-images/image-elijah.jpg";

function FeedbackDetail({ datas, setDatas }) {
  const [newComment, setNewComment] = useState("");
  const [reply, setReply] = useState([]);
  const [replyReply, setReplyReply] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [newReplyReply, setNewReplyReply] = useState("");
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
      if (
        productRequest.id === feedbackId * 1 &&
        newComment !== "" &&
        newComment !== " " &&
        newComment.length <= maxCharacters
      ) {
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
      setReply([...reply, { commentId, value: true }]);
    } else {
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
            if (
              comment.id === commentId &&
              comment.replies &&
              newReply !== "" &&
              newReply !== " " &&
              newReply.length <= maxCharacters
            ) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    content: newReply,
                    replyingTo: comment.user.username,
                    user: {
                      image: currentUser.image,
                      name: currentUser.name,
                      username: currentUser.username,
                    },
                    replies: [],
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

  const handleDeleteReply = (commentId, replyId) => {
    const updatedProductRequests = productRequests.map((productRequest) => {
      if (productRequest.id === feedbackId * 1) {
        return {
          ...productRequest,
          comments: productRequest.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: comment.replies.filter(
                  (reply, index) => index !== replyId
                ),
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
  };

  const handleReplyReplyClick = (commentId, replyId) => {
    const replyIndex = replyReply.findIndex(
      (r) => r.commentId === commentId && r.replyId === replyId
    );
    if (replyIndex === -1) {
      setReplyReply([...replyReply, { commentId, replyId, value: true }]);
    } else {
      setReplyReply([
        ...replyReply.slice(0, replyIndex),
        {
          commentId,
          replyId,
          value: !replyReply[replyIndex].value,
        },
        ...replyReply.slice(replyIndex + 1),
      ]);
    }
  };

  const isReplyReplyVisible = (commentId, replyId) => {
    const replyState = replyReply.find(
      (r) => r.commentId === commentId && r.replyId === replyId
    );
    return replyState ? replyState.value : false;
  };

  const handleNewReplyReply = (commentId, replyId) => {
    const updatedProductRequests = productRequests.map((productRequest) => {
      if (productRequest.id === feedbackId * 1) {
        return {
          ...productRequest,
          comments: productRequest.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: comment.replies.map((reply, index) => {
                  if (index === replyId && reply.replies) {
                    return {
                      ...reply,
                      replies: [
                        ...reply.replies,
                        {
                          content: newReplyReply,
                          replyingTo: reply.user.username,
                          user: {
                            image: currentUser.image,
                            name: currentUser.name,
                            username: currentUser.username,
                          },
                        },
                      ],
                    };
                  }
                  return reply;
                }),
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
    setNewReplyReply("");
    handleReplyReplyClick(commentId, replyId);
  };

  const handleDeleteReplyReply = (commentId, replyId, replyReplyId) => {
    const updatedProductRequests = productRequests.map((productRequest) => {
      if (productRequest.id === feedbackId * 1) {
        return {
          ...productRequest,
          comments: productRequest.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: comment.replies.map((reply, index) => {
                  if (index === replyId) {
                    return {
                      ...reply,
                      replies: reply.replies.filter(
                        (replyReply, index) => index !== replyReplyId
                      ),
                    };
                  }
                  return reply;
                }),
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
  };

  return (
    <div className="w-full min-h-screen p-6 md:px-10 bg-verylightgray flex flex-col items-center md:py-[56px] xl:py-[80px]">
      <div className="w-full max-w-[730px]">
        <div className="flex justify-between mb-6">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate(`/product-feedback-app/`)}
          >
            <img src={iconArrowLeft} alt="icon arrow left" />
            <p className="text-sm font-bold text-gray hover:underline transition-all">
              Go Back
            </p>
          </div>
          <button
            className="px-4 md:px-6 py-[10.5px] md:py-3 bg-blue hover:bg-[#7C91F9] transition-all rounded-[10px] text-lightgray text-sm font-bold"
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
              datas={datas}
              setDatas={setDatas}
            />
          ))}

        <div className="bg-white w-full p-6 rounded-[10px] mt-6 md:px-8">
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
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4 md:gap-8">
                      <img
                        className="rounded-full w-10 h-10"
                        // src={comment.user.image}
                        // src={require(`/assets/user-images/${item.avatar}`).default}
                        src={import(
                          `/assets/user-images/${comment.user.name.toLowerCase()}.jpg`
                        )}
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
                        className="font-semibold text-sm text-blue hover:underline transition-all"
                        onClick={() => handleReplyClick(comment.id)}
                      >
                        Reply
                      </button>
                    ) : (
                      <button
                        className="font-semibold text-sm text-red hover:underline transition-all"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <div className="text-sm md:text-[15px] text-gray md:ml-[72px]">
                    {comment.content}
                  </div>
                  {isReplyVisible(comment.id) && (
                    <div className="flex flex-col md:flex-row md:gap-4 md:ml-[72px]">
                      <textarea
                        className="mb-4 bg-verylightgray w-full h-[80px] rounded-[5px] p-4 resize-none text-sm"
                        type="text"
                        placeholder="Type your reply here"
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                      />
                      <button
                        className="max-w-[117px] w-full self-end md:self-start px-4 py-[10.5px] bg-violet hover:bg-[#C75AF6] transition-all rounded-[10px] text-lightgray text-sm font-bold"
                        onClick={() => handleNewReply(comment.id)}
                      >
                        Post Reply
                      </button>
                    </div>
                  )}

                  {!comment.replies?.length > 0 ? (
                    <div className="w-full h-[1px] bg-separator opacity-25 my-2"></div>
                  ) : (
                    comment.replies?.map((reply, index) => (
                      <div
                        className="flex flex-col gap-4 mt-2 relative border-l-[1px] border-border pl-6 md:ml-[18px]"
                        key={index}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 md:gap-8">
                            <img
                              className="rounded-full w-10 h-10"
                              src={reply.user.image}
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
                          {reply.user.username !== currentUser.username ? (
                            <button
                              className="font-semibold text-sm text-blue hover:underline transition-all"
                              onClick={() =>
                                handleReplyReplyClick(comment.id, index)
                              }
                            >
                              Reply
                            </button>
                          ) : (
                            <button
                              className="font-semibold text-sm text-red hover:underline transition-all"
                              onClick={() =>
                                handleDeleteReply(comment.id, index)
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="text-sm text-gray md:ml-[72px]">
                          <span className="text-violet font-semibold">
                            @{reply.replyingTo}
                          </span>{" "}
                          {reply.content}
                        </div>
                        {isReplyReplyVisible(comment.id, index) && (
                          <div className="flex flex-col md:flex-row md:gap-4 md:ml-[72px]">
                            <textarea
                              className="mb-4 bg-verylightgray w-full h-[80px] rounded-[5px] p-4 resize-none text-sm"
                              type="text"
                              placeholder="Type your reply here"
                              value={newReplyReply}
                              onChange={(e) => setNewReplyReply(e.target.value)}
                            />
                            <button
                              className="max-w-[117px] w-full self-end md:self-start px-4 py-[10.5px] bg-violet hover:bg-[#C75AF6] transition-all rounded-[10px] text-lightgray text-sm font-bold"
                              onClick={() =>
                                handleNewReplyReply(comment.id, index)
                              }
                            >
                              Post Reply
                            </button>
                          </div>
                        )}

                        {reply.replies?.map((reply, Replyindex) => (
                          <div
                            className="flex flex-col gap-4 mt-2 relative border-l-[1px] border-border pl-6 md:ml-[18px]"
                            key={Replyindex}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4 md:gap-8">
                                <img
                                  className="rounded-full w-10 h-10"
                                  src={reply.user.image}
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
                              <button
                                className="font-semibold text-sm text-red hover:underline transition-all"
                                onClick={() =>
                                  handleDeleteReplyReply(
                                    comment.id,
                                    index,
                                    Replyindex
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                            <div className="text-sm text-gray md:ml-[72px]">
                              <span className="text-violet font-semibold">
                                @{reply.replyingTo}
                              </span>{" "}
                              {reply.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              ))
            )}
        </div>

        <div className=" bg-white w-full p-6 md:px-8 rounded-[10px] mt-6">
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
            <p className="text-sm text-gray">
              {charactersLeft} Characters left
            </p>
            <button
              className="text-sm font-bold text-lightgray bg-violet hover:bg-[#C75AF6] transition-all rounded-[10px] px-4 md:px-6 py-[10.35px] md:py-3"
              onClick={handleNewComment}
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackDetail;
