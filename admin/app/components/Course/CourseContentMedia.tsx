import React, { useEffect, useState } from 'react';
import CoursePlayer from '../../utils/CoursePlayer';
import { styles } from '../../styles/style';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Loader from '../Loader/Loader';
import Image from 'next/image';
import { format } from 'timeago.js';
import { useAddNewQuestionMutation } from '../../../redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { BiMessage } from 'react-icons/bi';
import avatar from '../../../public/assests/avatar.png';

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo, user, refetch }: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerId, setAnswerId] = useState('');
  const [progress, setProgress] = useState(0);
  const [addNewQuestion, { isSuccess, error, isLoading: questionCreationLoading }] = useAddNewQuestionMutation();

  useEffect(() => {
    setProgress(((activeVideo + 1) / data.length) * 100);
  }, [activeVideo, data.length]);

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      console.log({ question, courseId: id, contentId: data[activeVideo]._id });
      addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion('');
      refetch();
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleAnswerSubmit = () => {
    console.log('Answer submitted');
  };

  return (
    <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
      <CoursePlayer title={data[activeVideo]?.title} videoUrl={data[activeVideo]?.videoUrl} />
      <div className='w-full flex items-center justify-between my-3'>
        <div
          className={`${styles.button} text-white !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
            }`}
          onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
        >
          <AiOutlineArrowLeft className='mr-2' />
          Prev Lesson
        </div>
        <div
          className={`${styles.button} text-white !w-[unset] !min-h-[40px] !py-[unset]
                     ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
            }`}
          onClick={() => setActiveVideo(data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}
        >
          Next Lesson
          <AiOutlineArrowRight className='mr-2' />
        </div>
      </div>
      <div className='w-full flex justify-between items-center'>
        <h1 className='pt-2 text-[25px] font-[600] text-white'>{data[activeVideo].title}</h1>
        <div className='text-white'>
          Progress: {progress.toFixed(2)}%
        </div>
      </div>
      <br />
      <div className='w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>
        {['Overview', 'Q&A'].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${activeBar === index ? 'text-red-500' : 'dark:text-white text-black'}`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className='text-[18px] whitespace-pre-line mb-3'>
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className='mb-5' key={index}>
              <h2 className='800px:text-[20px] 800px:inline-block dark:text-white text-black'>
                {item.title && item.title + ':'}
              </h2>
              <a className='inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2' href={item.url}>
                {item.useLoadUserQuery}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className='flex w-full'>
            <Image
              src={user.avatar ? user.avatar.url : avatar}
              width={50}
              height={50}
              alt=''
              className='w-[50px] h-[50px] rounded-full object-cover'
            />
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              placeholder='Write your question..'
              className='outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
            ></textarea>
          </div>
          <div className='w-full flex justify-end'>
            <div
              className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionCreationLoading && 'cursor-not-allowed'}`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className='w-full h-[1px] bg-[#ffffff3b]'></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setAnswerId={setAnswerId}
            />
          </div>
        </>
      )}
    </div>
  );
};

const CommentReply = ({ data, activeVideo, answer, setAnswer, handleAnswerSubmit, user, setAnswerId }: any) => {
  return (
    <div className='w-full my-3'>
      {data[activeVideo].questions.map((item: any, index: any) => (
        <CommentItem
          key={index}
          data={data}
          activeVideo={activeVideo}
          item={item}
          index={index}
          answer={answer}
          setAnswer={setAnswer}
          handleAnswerSubmit={handleAnswerSubmit}
        />
      ))}
    </div>
  );
};

const CommentItem = ({ data, activeVideo, item, answer, setAnswer, handleAnswerSubmit }: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <div className='my-4'>
      <div className='flex mb-2'>
        <Image
          src={item.user.avatar ? item.user.avatar.url : avatar}
          width={50}
          height={50}
          alt=''
          className='w-[50px] h-[50px] rounded-full object-cover'
        />
        <div className='pl-3 dark:text-white text-black'>
          <h5 className='text-[20px]'>{item.user.name}</h5>
          <p>{item?.question}</p>
          <small className='text-[#000000b8] dark:text-[#ffffff83]'>{item.createdAt ? format(item?.createdAt) : ''} .</small>
        </div>
      </div>
      <div className='w-full flex'>
        <span
          className='800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2'
          onClick={() => setReplyActive(!replyActive)}
        >
          {!replyActive ? (item.questionReplies.length !== 0 ? 'All Replies' : 'Add Reply') : 'Hide Replies'}
        </span>
        <BiMessage size={20} className='cursor-pointer' fill='#ffffff83' />
        <span className='pl-1 mt-[-4px] cursor-pointer text-[#ffffff83]'>{item.questionReplies.length}</span>
      </div>
    </div>
  );
};

export default CourseContentMedia;
