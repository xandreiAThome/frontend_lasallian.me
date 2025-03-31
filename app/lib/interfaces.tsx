interface postDataInterface {
  title: string;
  content: { text: string };
  media: string[];
  type: string;
  visibility: string;
  meta: { created_at: Date; updated_at: Date };
  author: authorInterface;
  comments: commentInterface[];
  reactions: reactionPostInterface[];
  _id: string;
  // organization todo
}

interface commentInterface {
  author: authorInterface;
  content: string;
  post: postDataInterface;
  meta: { created_at: Date; updated_at: Date };
  _id: string;
  reactions: reactionCommentInterface[];
}

interface reactionPostInterface {
  _id: string;
  type: string;
  user: authorInterface;
  target: postDataInterface;
}

interface reactionCommentInterface {
  _id: string;
  type: string;
  user: authorInterface;
  target: commentInterface;
}

interface authorInterface {
  vanity: {
    display_photo?: string;
    cover_photo?: string;
    //badges todo
  };
  info: {
    name: { first: string; last: string };
    links: {
      linkedin?: string;
      facebook?: string;
      instagram?: string;
      other?: string[];
    };
    username: string;
    batchid: string;
    birthdate?: string;
    program: string;
    bio?: string;
  };
  meta: {
    created_at: Date;
    updated_at: Date;
  };
  _id: string;
}

export type { authorInterface, postDataInterface, commentInterface };
