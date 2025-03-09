interface postDataInterface {
  title: string;
  content: { text: string };
  media: string[];
  type: string;
  visibility: string;
  meta: { created_at: Date; updated_at: Date };
  author: authorInterface;
  comments: commentInterface[];
  reactions: reactionInterface[];
  _id: string;
  // organization todo
}

interface commentInterface {
  author: authorInterface;
  content: string;
  post: postDataInterface;
  meta: { created_at: Date; updated_at: Date };
  _id: string;
}

interface reactionInterface {
  _id: string;
  type: string;
  user: string;
  target: string;
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
