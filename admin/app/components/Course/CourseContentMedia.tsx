import React, { useEffect, useState } from "react";
import CoursePlayer from "../../utils/CoursePlayer";
import { styles } from "../../styles/style";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../Loader/Loader";
import Image from "next/image";
import { format } from "timeago.js";
import {
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
} from "../../../redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import avatar from "../../../public/assests/avatar.png";
import { VscVerifiedFilled } from "react-icons/vsc";
import { BiMessage } from "react-icons/bi";
import Link from "next/link";
import {
  useUpdateCourseCompletionMutation,
  useGetUserCourseCompletionQuery,
} from "../../../redux/features/user/userApi";
import Confetti from "react-confetti";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [progress, setProgress] = useState(0);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const [updateCourseCompletion] = useUpdateCourseCompletionMutation();
  const {
    data: userCourseCompletion,
    error: userError,
    isLoading: courseCompletionLoading,
    refetch: refetchUserCourseCompletion,
  } = useGetUserCourseCompletionQuery({ userId: user.id });

  useEffect(() => {
    if (userCourseCompletion && userCourseCompletion.success) {
      const course = userCourseCompletion.courses.find(
        (course) => course.courseId === id
      );
      if (course) {
        const { lastWatchedVideo: userLastWatchedVideo } = course;
        setActiveVideo(userLastWatchedVideo || 0);
      }
    }
  }, [userCourseCompletion]);

  useEffect(() => {
    const newProgress = ((activeVideo + 1) / (data?.length || 1)) * 100;
    setProgress(newProgress);

    if (newProgress === 100) {
      setCourseCompleted(true);
      updateCourseCompletion({
        courseId: id,
        lastWatchedVideo: activeVideo,
        completed: true,
      });
    } else {
      updateCourseCompletion({
        courseId: id,
        lastWatchedVideo: activeVideo,
        completed: false,
      });
    }
  }, [activeVideo, data?.length, id, updateCourseCompletion]);

  const handleQuestion = () => {
    if (question.trim().length === 0) {
      toast.error("Question can't be empty");
      return;
    }
    addNewQuestion({
      question,
      courseId: id,
      contentId: data[activeVideo]?._id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const handleAnswerSubmit = () => {
    if (answer.trim().length === 0) {
      toast.error("Answer can't be empty");
      return;
    }
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]?._id,
      questionId: questionId,
    })
      .then(() => {
        setAnswer("");
        setQuestionId("");
        setIsAnswerSubmitted(true); // Mark that the answer has been submitted
      })
      .catch((err) => {
        toast.error("Failed to submit answer");
      });
  };

  useEffect(() => {
    if (isAnswerSubmitted) {
      refetch(); // Refetch data after answer submission
      setIsAnswerSubmitted(false); // Reset the submission state
    }
  }, [isAnswerSubmitted, refetch]);

  const setActiveVideoAndUpdateProgress = (index: number) => {
    setActiveVideo(index);
    const newProgress = ((index + 1) / (data?.length || 1)) * 100;
    setProgress(newProgress);
    if (newProgress === 100) {
      setCourseCompleted(true);
      updateCourseCompletion({
        courseId: id,
        lastWatchedVideo: index,
        completed: true,
      });
    } else {
      updateCourseCompletion({
        courseId: id,
        lastWatchedVideo: index,
        completed: false,
      });
    }
  };

  const handleCourseExit = () => {
    updateCourseCompletion({
      courseId: id,
      lastWatchedVideo: activeVideo,
      completed: courseCompleted,
    });
  };

  const exitHref = user.role === "admin" ? "/admin" : "/client";

  if (courseCompletionLoading) {
    return <Loader />;
  }

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      {showConfetti && <Confetti />}
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() => {
            if (activeVideo > 0) {
              setActiveVideoAndUpdateProgress(activeVideo - 1);
            }
          }}
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <Link href={exitHref} passHref>
          <a
            className={`${styles.button} text-white !w-[unset] !min-h-[40px] !py-[unset]`}
            onClick={handleCourseExit}
          >
            Exit Course
          </a>
        </Link>
        <div
          className={`${
            styles.button
          } text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo
              ? "!cursor-pointer !opacity-100"
              : ""
          }`}
          onClick={() => {
            if (activeVideo < data.length - 1) {
              setActiveVideoAndUpdateProgress(activeVideo + 1);
            } else if (activeVideo === data.length - 1) {
              // This is the last video
              setCourseCompleted(true);
              updateCourseCompletion({
                courseId: id,
                lastWatchedVideo: activeVideo,
                completed: true,
              });
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
            }
          }}
        >
          {activeVideo === data.length - 1 ? "Finish Course" : "Next Lesson"}
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <h1 className="pt-2 text-[25px] font-[600] text-white">
          {data[activeVideo]?.title}
        </h1>
        {user.role !== "admin" && (
          <div className="text-white">
            Progress: {progress.toFixed(2)}%
            {courseCompleted && " - Course Completed!"}
          </div>
        )}
      </div>
      <br />

      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Q&A"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index
                ? "text-red-500"
                : "dark:text-white text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : avatar}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <button
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
              disabled={questionCreationLoading}
            >
              Submit
            </button>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              questionId={questionId}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
              user={user}
            />
          </div>
        </>
      )}
    </div>
  );
};

const CommentItem = ({
  user,
  questionId,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={item.user.avatar ? item.user.avatar.url : avatar}
              width={50}
              height={50}
              alt=""
              className="w-[35px] h-[35px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3 dark:text-white text-black">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="text-[#000000b8] dark:text-[#ffffff83]">
              {!item.createdAt ? "" : format(item?.createdAt)} •
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : user.role === "admin"
                ? "Add Reply"
                : "No Replies"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="dark:text-[#ffffff83] cursor-pointer text-[#000000b8]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>

        {replyActive && questionId === item._id && (
          <>
            {item.questionReplies.map((reply: any) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                key={reply._id}
              >
                <div>
                  <Image
                    src={reply.user.avatar ? reply.user.avatar.url : avatar}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{reply.user.name}</h5>{" "}
                    {reply.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{reply.answer}</p>
                  <small className="text-[#ffffff83]">
                    {format(reply.createdAt)} •
                  </small>
                </div>
              </div>
            ))}
            {user.role === "admin" && (
              <>
                <div className="w-full flex relative dark:text-white text-black">
                  <input
                    type="text"
                    placeholder="Enter your answer..."
                    value={answer}
                    onChange={(e: any) => setAnswer(e.target.value)}
                    className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[95%] ${
                      answer === "" ||
                      (answerCreationLoading && "cursor-not-allowed")
                    }`}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 bottom-1"
                    onClick={handleAnswerSubmit}
                    disabled={answer === "" || answerCreationLoading}
                  >
                    Submit
                  </button>
                </div>
                <br />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  questionId,
  setQuestionId,
  answerCreationLoading,
  user,
}: any) => {
  return (
    <div className="w-full my-3">
      {data[activeVideo]?.questions?.length ? (
        data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            user={user}
            questionId={questionId}
            setQuestionId={setQuestionId}
            item={item}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default CourseContentMedia;
