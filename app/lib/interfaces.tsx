interface postDataInterface {
  title: string;
  content: { text: string };
  media: string[];
  type: string;
  visibility: string;
  meta: { created_at: Date; updated_at: Date };
  author: authorInterface;
  badge: badgeInterface;
  comments: commentInterface[];
  reactions: reactionPostInterface[];
  _id: string;
}

interface badgeInterface {
  _id: string;
  badge_type: string;
  badge_key: string;
  main_text_color: string;
  sub_text_color: string;
  main_title: string;
  main_color: string;
  sub_title: string;
  sub_color: string;
  badge_expiry: string;
  description: string;
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
  user: string;
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
    badges: badgeInterface[];
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

export type {
  authorInterface,
  postDataInterface,
  reactionCommentInterface,
  reactionPostInterface,
  commentInterface,
  badgeInterface,
};
