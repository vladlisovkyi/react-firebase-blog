import React, { useState, useEffect } from "react";
import DashLayout from "../../../utils/dash_layout";
import { messagesCollection } from "../../../utils/fbase";
import CardMessage from "./card";

const Messages = ({ auth }) => {
  const [posts, setPosts] = useState([]);
  const [limit] = useState(2);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);
  const [count, setCount] = useState(2);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const snapshot = await messagesCollection
          .orderBy("createdAt")
          .limit(limit)
          .get();
        handleVars(snapshot, false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [limit]);

  const nextPosts = async () => {
    try {
      const snapshot = await messagesCollection
        .orderBy("createdAt")
        .startAfter(lastVisible)
        .limit(limit)
        .get();
      handleVars(snapshot, "sum");
    } catch (error) {
      console.error("Error fetching next posts:", error);
    }
  };

  const prevPosts = async () => {
    if (count <= limit) {
      console.log("Sorry, no more posts");
    } else {
      try {
        const snapshot = await messagesCollection
          .orderBy("createdAt")
          .endBefore(firstVisible)
          .limitToLast(limit)
          .get();
        handleVars(snapshot, "rest");
      } catch (error) {
        console.error("Error fetching previous posts:", error);
      }
    }
  };

  const handleVars = (snapshot, action) => {
    const { docs } = snapshot;

    if (docs.length > 0) {
      const newPosts = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(newPosts);
      setLastVisible(docs[docs.length - 1]);
      setFirstVisible(docs[0]);
      setCount(
        !action
          ? count
          : action === "sum"
          ? count + docs.length
          : count - docs.length
      );
    } else {
      console.log("Sorry, no more posts");
    }
  };

  console.log({ posts, count });

  return (
    <DashLayout auth={auth} title="Messages">
      {posts.map((item) => (
        <CardMessage data={item} key={item.id} />
      ))}
      <div className="mt-3">
        <div className="btn btn-primary mr-2" onClick={prevPosts}>
          PREV
        </div>
        <div className="btn btn-primary mr-2" onClick={nextPosts}>
          NEXT
        </div>
      </div>
    </DashLayout>
  );
};

export default Messages;
