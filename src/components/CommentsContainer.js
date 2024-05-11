import React from 'react'
import { commentsData } from '../data/CommentsData'
import { PROFILE_LOGO } from '../utils/Constant'


const Comment = ({ data }) => {
    const { user, text, date } = data;
    return (
        <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
            <img
                className="w-12 h-12"
                alt="user"
                src={PROFILE_LOGO}
            />

            <div className="px-3">
                <div className="flex gap-4">
                    <p className="font-bold">{user}</p>
                    <p>{date}</p>
                </div>

                <p>{text}</p>
            </div>
        </div>
    )
}

const CommentsList = ({ comments }) => {
    return (
        <div className="mt-4">
            {
                comments.map(comment => (
                    <div key={comment.id}>
                        <Comment data={comment} />
                        {comment?.replies.length > 0 && <div className="pl-5 border-l border-l-black ml-5">
                            <CommentsList comments={comment?.replies} />
                        </div>}
                    </div>
                ))
            }
        </div>
    )
};

const CommentsContainer = () => {
    return (
        <div className="m-5 p-2">
            <h1 className="text-2xl font-bold">Comments: </h1>
            <CommentsList comments={commentsData} />
        </div>
    )
}

export default CommentsContainer;