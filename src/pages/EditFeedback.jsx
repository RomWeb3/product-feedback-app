import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditFeedback({ datas, setDatas }) {
  const navigate = useNavigate();
  const { feedbackId } = useParams();
  const [showCategory, setShowCategory] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = (e) => {
    setCategory(e.target.innerText.toLowerCase());
    setShowCategory(false);
  };

  const handleStatus = (e) => {
    setStatus(e.target.innerText.toLowerCase());
    setShowStatus(false);
  };

  const handleEditFeedback = () => {
    const newFeedback = {
      title: title,
      category: category,
      status: status,
      description: description,
    };

    setDatas({
      ...datas,
      productRequests: [...datas.productRequests, newFeedback],
    });
  };

  const currentFeedback = datas.productRequests?.find(
    (feedback) => feedback.id === feedbackId * 1
  );

  const setFeedback = () => {
    setTitle(currentFeedback?.title);
    setCategory(currentFeedback?.category);
    setStatus(currentFeedback?.status);
    setDescription(currentFeedback?.description);
  };

  useEffect(() => {
    setFeedback();
  }, [currentFeedback]);

  return (
    <div className="min-h-screen p-6 bg-verylightgray flex flex-col justify-center items-center gap-8 sm:gap-10">
      <div
        className="w-full max-w-[540px] flex items-center gap-4 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <img src="/assets/shared/icon-arrow-left.svg" alt="icon arrow left" />
        <p className="text-sm font-bold text-gray hover:underline transition-all">
          Go Back
        </p>
      </div>

      <div className="w-full max-w-[540px] mt-[35px] bg-white rounded-[10px] p-6 relative">
        <div className="w-10 h-10 rounded-full absolute left-6 top-[-20px]">
          <img
            src="/assets/shared/icon-edit-feedback.svg"
            alt="icon new feedback"
          />
        </div>
        <h2 className="font-bold text-lg md:text-2xl text-darkblue tracking-tighter mb-6 md:mb-10 mt-5">
          Editing '{title}'
        </h2>
        <h3 className="font-bold text-sm text-darkblue mb-[3px]">
          Feedback Title
        </h3>
        <p className="text-sm text-gray mb-4">
          Add a short, descriptive headline
        </p>
        <input
          type="text"
          className="w-full max-w-[456px] h-[48px] bg-verylightgray rounded-[5px] px-4 mb-6"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3 className="font-bold text-sm text-darkblue mb-[3px]">Category</h3>
        <p className="text-sm text-gray mb-4">
          Choose a category for your feedback
        </p>
        <div
          className="relative w-full max-w-[456px] h-[48px] bg-verylightgray rounded-[5px] px-4 mb-6 cursor-pointer flex justify-between items-center"
          onClick={() => setShowCategory(!showCategory)}
        >
          <p className="text-base text-darkblue">
            {category === "ui" || category === "ux"
              ? category?.toUpperCase()
              : category?.charAt(0).toUpperCase() + category?.slice(1)}
          </p>
          <img
            src="/assets/shared/icon-arrow-down.svg"
            alt="icon arrow down"
            className={`${
              showCategory ? "rotate-180 " : ""
            } transition-all duration-200`}
          />

          {showCategory && (
            <div className="absolute z-50 top-16 left-0 w-full rounded-[5px] bg-white shadow-lg">
              <div
                className="flex items-center justify-between text-gray hover:text-violet"
                onClick={(e) => handleClick(e)}
              >
                <p className="py-3 px-6">Feature</p>
                <img
                  src="/assets/shared/icon-check.svg"
                  alt="icon check"
                  className={`${
                    category === "feature" ? "block" : "hidden"
                  } transition-all duration-300 px-6`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#3A4374] opacity-[15%]"></div>
              <div
                className="flex items-center justify-between text-gray hover:text-violet"
                onClick={(e) => handleClick(e)}
              >
                <p className="py-3 px-6">UI</p>
                <img
                  src="/assets/shared/icon-check.svg"
                  alt="icon check"
                  className={`${
                    category === "ui" ? "block" : "hidden"
                  } transition-all duration-300 px-6`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#3A4374] opacity-[15%]"></div>
              <div
                className="flex items-center justify-between text-gray hover:text-violet"
                onClick={(e) => handleClick(e)}
              >
                <p className="py-3 px-6">UX</p>
                <img
                  src="/assets/shared/icon-check.svg"
                  alt="icon check"
                  className={`${
                    category === "ux" ? "block" : "hidden"
                  } transition-all duration-300 px-6`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#3A4374] opacity-[15%]"></div>
              <div
                className="flex items-center justify-between text-gray hover:text-violet"
                onClick={(e) => handleClick(e)}
              >
                <p className="py-3 px-6">Enhancement</p>
                <img
                  src="/assets/shared/icon-check.svg"
                  alt="icon check"
                  className={`${
                    category === "enhancement" ? "block" : "hidden"
                  } transition-all duration-300 px-6`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#3A4374] opacity-[15%]"></div>
              <div
                className="flex items-center justify-between text-gray hover:text-violet"
                onClick={(e) => handleClick(e)}
              >
                <p className="py-3 px-6">Bug</p>
                <img
                  src="/assets/shared/icon-check.svg"
                  alt="icon check"
                  className={`${
                    category === "bug" ? "block" : "hidden"
                  } transition-all duration-300 px-6`}
                />
              </div>
            </div>
          )}
        </div>
        <h3 className="font-bold text-sm text-darkblue mb-[3px]">
          Update Status
        </h3>
        <p className="text-sm text-gray mb-4">Change feature state</p>
        <div
          className="relative w-full max-w-[456px] h-[48px] bg-verylightgray rounded-[5px] px-4 mb-6 cursor-pointer flex justify-between items-center"
          onClick={() => setShowStatus(!showStatus)}
        >
          <p className="text-base text-darkblue">
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </p>
          <img
            src="/assets/shared/icon-arrow-down.svg"
            alt="icon arrow down"
            className={`${
              showStatus ? "rotate-180 " : ""
            } transition-all duration-200`}
          />

          {showStatus && (
            <div className="absolute z-50 top-16 left-0 w-full rounded-[5px] bg-white shadow-lg">
              <div
                className="flex items-center justify-between text-gray hover:text-violet"
                onClick={(e) => handleStatus(e)}
              >
                <p className="py-3 px-6">Suggestion</p>
                <img
                  src="/assets/shared/icon-check.svg"
                  alt="icon check"
                  className={`${
                    status === "suggestion" ? "block" : "hidden"
                  } transition-all duration-300 px-6`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#3A4374] opacity-[15%]"></div>
              <div
                className="flex items-center justify-between text-gray hover:text-violet"
                onClick={(e) => handleStatus(e)}
              >
                <p className="py-3 px-6">Planned</p>
                <img
                  src="/assets/shared/icon-check.svg"
                  alt="icon check"
                  className={`${
                    status === "planned" ? "block" : "hidden"
                  } transition-all duration-300 px-6`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#3A4374] opacity-[15%]"></div>
              <div
                className="flex items-center justify-between text-gray hover:text-violet"
                onClick={(e) => handleStatus(e)}
              >
                <p className="py-3 px-6">In-Progress</p>
                <img
                  src="/assets/shared/icon-check.svg"
                  alt="icon check"
                  className={`${
                    status === "in-progress" ? "block" : "hidden"
                  } transition-all duration-300 px-6`}
                />
              </div>
              <div className="w-full h-[1px] bg-[#3A4374] opacity-[15%]"></div>
              <div
                className="flex items-center justify-between text-gray hover:text-violet"
                onClick={(e) => handleStatus(e)}
              >
                <p className="py-3 px-6">Live</p>
                <img
                  src="/assets/shared/icon-check.svg"
                  alt="icon check"
                  className={`${
                    status === "live" ? "block" : "hidden"
                  } transition-all duration-300 px-6`}
                />
              </div>
            </div>
          )}
        </div>
        <h3 className="font-bold text-sm text-darkblue mb-[3px]">
          Feedback Detail
        </h3>
        <p className="text-sm text-gray mb-4">
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          type="text"
          className="w-full max-w-[456px] h-[120px] bg-verylightgray rounded-[5px] p-4 mb-10 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="w-full h-[40px] bg-violet hover:bg-[#C75AF6] transition-all rounded-[10px] text-lightgray text-sm font-bold mb-4">
          Save Changes
        </button>
        <button
          className="w-full h-[40px] bg-darkblue hover:bg-[#656EA3] transition-all rounded-[10px] text-lightgray text-sm font-bold mb-4"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button className="w-full h-[40px] bg-red hover:opacity-80 rounded-[10px] text-lightgray text-sm font-bold">
          Delete
        </button>
      </div>
    </div>
  );
}

export default EditFeedback;
