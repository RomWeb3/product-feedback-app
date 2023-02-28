import React, { useState, useEffect } from "react";
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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                    id: Math.random().toString(36).substring(7),
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
                  (reply) => reply.id !== replyId
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

  return (
    <div className="w-full min-h-screen p-6 md:px-10 bg-verylightgray flex flex-col items-center md:py-[56px] xl:py-[80px]">
      <div className="w-full max-w-[730px]">
        <div className="flex justify-between mb-6">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <img
              src="/assets/shared/icon-arrow-left.svg"
              alt="icon arrow left"
            />
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
                        className="font-semibold text-sm text-blue hover:underline transition-all"
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
                          {reply.user.username !== currentUser.username ? (
                            <button
                              className="font-semibold text-sm text-blue hover:underline transition-all"
                              onClick={() => handleReplyClick(comment.id)}
                            >
                              Reply
                            </button>
                          ) : (
                            <button
                              className="font-semibold text-sm text-red"
                              onClick={() =>
                                handleDeleteReply(comment.id, reply.id)
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
