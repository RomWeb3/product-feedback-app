import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import iconArrowUp from "/assets/shared/icon-arrow-up.svg";
import iconArrowUpWhite from "/assets/shared/icon-arrow-up-white.svg";
import iconComments from "/assets/shared/icon-comments.svg";

function CardRequest({ productRequest, datas, setDatas, withoutMediaQueries }) {
  const navigate = useNavigate();

  const onVote = (productRequestId) => {
    const updatedProductRequests = [...datas.productRequests];
    const index = updatedProductRequests.findIndex(
      (productRequest) => productRequestId === productRequest.id
    );
    const updatedProductRequest = {
      ...updatedProductRequests[index],
      upvotes: productRequest.voted
        ? productRequest.upvotes - 1
        : productRequest.upvotes + 1,
      voted: !productRequest.voted,
    };
    updatedProductRequests[index] = updatedProductRequest;
    setDatas({ ...datas, productRequests: updatedProductRequests });
  };

  const cardRequestClass = classNames(
    "w-full max-w-[825px] bg-white px-6 py-6",
    {
      // Include the responsive classes if withoutMediaQueries is not true
      "md:px-0 md:py-[28px] md:relative": !withoutMediaQueries,
      // Override the responsive classes if withoutMediaQueries is true
      "px-5 xl:px-8 py-6": withoutMediaQueries,
    }
  );

  const descriptionClass = classNames("mt-1 text-gray mb-[10px] text-sm", {
    "md:mb-3 md:text-base": !withoutMediaQueries,
    "xl:mb-[16px] text-[13px] xl:text-[16px]": withoutMediaQueries,
  });

  const statusClass = classNames("flex items-center gap-4 mb-4", {
    "md:ml-[112px]": !withoutMediaQueries,
    "": withoutMediaQueries,
  });

  const cardClass = classNames(
    "cursor-pointer text-darkblue hover:text-[#4661E6]",
    {
      "md:ml-[112px]": !withoutMediaQueries,
      "": withoutMediaQueries,
    }
  );

  const titleClass = classNames("font-bold transition-all text-sm", {
    "md:text-lg": !withoutMediaQueries,
    "text-[13px] xl:text-[18px]": withoutMediaQueries,
  });

  const footerClass = classNames("flex justify-between items-center mt-4", {
    "md:mt-0": !withoutMediaQueries,
    "mt-4": withoutMediaQueries,
  });

  const buttonClass = classNames(
    "flex gap-2.5 w-[69px] h-[32px] bg-lightgray hover:bg-[#CFD7FF] cursor-pointer transition-all justify-center items-center rounded-[10px] text-sm font-bold text-darkblue",
    {
      "md:flex-col md:gap-2 md:absolute md:top-[28px] md:left-[32px] md:w-10 md:h-[53px]":
        !withoutMediaQueries,
      "flex gap-2.5 w-[69px] h-[32px] xl:h-[40px]": withoutMediaQueries,
    }
  );

  const commentsClass = classNames(
    "flex gap-1 items-center text-sm font-bold text-darkblue",
    {
      "md:absolute md:right-[32px] md:top-0 md:bottom-0 md:m-auto md:gap-2":
        !withoutMediaQueries,
      "flex gap-1 xl:gap-2 text-sm xl:text-[16px]": withoutMediaQueries,
    }
  );

  return (
    <div
      className={cardRequestClass}
      style={{
        borderTop:
          productRequest.status === "planned"
            ? "6px solid #F49F85"
            : productRequest.status === "in-progress"
            ? "6px solid #AD1FEA"
            : productRequest.status === "live"
            ? "6px solid #62BCFA"
            : "none",
        borderRadius:
          productRequest.status === "planned" ||
          productRequest.status === "in-progress" ||
          productRequest.status === "live"
            ? "5px 5px 10px 10px"
            : "10px",
      }}
    >
      {productRequest.status === "planned" && (
        <div className={statusClass}>
          <div className="w-2 h-2 bg-orange rounded-full"></div>
          <p className="text-gray text-sm xl:text-base">Planned</p>
        </div>
      )}
      {productRequest.status === "in-progress" && (
        <div className={statusClass}>
          <div className="w-2 h-2 bg-violet rounded-full"></div>
          <p className="text-gray text-sm xl:text-base">In Progress</p>
        </div>
      )}
      {productRequest.status === "live" && (
        <div className={statusClass}>
          <div className="w-2 h-2 bg-lightblue rounded-full"></div>
          <p className="text-gray text-sm xl:text-base">Live</p>
        </div>
      )}
      <div
        className={cardClass}
        onClick={() =>
          navigate(`/product-feedback-app/feedback/${productRequest.id}`)
        }
      >
        <h2 className={titleClass}>{productRequest.title}</h2>
        <p className={descriptionClass}>{productRequest.description}</p>
        <div className="bg-lightgray w-[111px] h-[30px] flex justify-center items-center rounded-[10px] text-blue font-semibold text-sm">
          {productRequest.category === "ui" || productRequest.category === "ux"
            ? productRequest.category.toUpperCase()
            : productRequest.category.charAt(0).toUpperCase() +
              productRequest.category.slice(1)}
        </div>
      </div>
      <div className={footerClass}>
        <button
          className={buttonClass}
          style={{
            background: productRequest.voted && "#4661E6",
            color: productRequest.voted && "#fff",
          }}
          onClick={() => {
            onVote(productRequest.id);
          }}
        >
          <img
            src={productRequest.voted ? iconArrowUpWhite : iconArrowUp}
            alt="icon arrow up"
          />
          {productRequest.upvotes}
        </button>
        <div className={commentsClass}>
          <img src={iconComments} alt="icon comments" />
          {productRequest.comments?.length > 0
            ? productRequest.comments.length +
              productRequest.comments?.reduce(
                (total, comment) => total + (comment.replies?.length || 0),
                0
              )
            : 0}
        </div>
      </div>
    </div>
  );
}

export default CardRequest;
