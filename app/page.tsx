"use client";
import React, { MouseEvent } from "react";
import axios from "axios";

type Comment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

const likeImageIcon =
  "https://static.vecteezy.com/system/resources/thumbnails/000/422/468/small/Multimedia__28107_29.jpg";

const dislikeImageIcon =
  "https://as1.ftcdn.net/v2/jpg/02/39/04/08/1000_F_239040826_VSmSisHQlKJ8SG2madLTSxVIYhJBSgLn.jpg";

function Comments() {
  const [comments, setComments] = React.useState<Comment[]>([]);

  React.useEffect(() => {
    const getComments = async () => {
      const comments = await axios.get<Comment[]>(
        "https://gorest.co.in/public/v2/comments"
      );

      setComments(comments.data);
    };

    getComments();
  });

  const [likedImages, setLikedImages] = React.useState<number[]>([]);

  return (
    <div className="flex flex-col gap-2 p-2 bg-white">
      <h1>Comments</h1>
      {comments != null &&
        comments != null &&
        comments.length > 0 &&
        comments.map((comment) => (
          <div
            key={comment.id}
            className="flex flex-col p-2 bg-white border-2 rounded "
          >
            <div className="flex gap-4">
              <div>
                <div>
                  <span className="font-bold">User name: </span>
                  <span>{comment.name}</span>
                </div>

                <div>
                  <span className="font-bold">Comment: </span>
                  <span>{comment.body}</span>
                </div>
              </div>

              <div className="h-8 w-8">
                <div className="h-auto w-[100%]">
                  <img
                    src={
                      likedImages.includes(comment.id)
                        ? likeImageIcon
                        : dislikeImageIcon
                    }
                    alt="like"
                  />
                </div>
              </div>

              <button
                className="p-2 pointer rounded-lg bg-slate-500 text-white w-[100px]"
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  if (!likedImages.includes(comment.id)) {
                    setLikedImages((ids) => [...ids, comment.id]);
                  } else {
                    setLikedImages((ids) =>
                      ids.filter((id) => id !== comment.id)
                    );
                  }
                }}
              >
                <div className="h-auto w-[100%]">
                  {likedImages.includes(comment.id) ? "Dislike" : "Like"}
                </div>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Comments;
