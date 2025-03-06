interface postDataInterface {
  title: string;
  content: { text: string };
  media: string[];
  type: string;
  visibility: string;
  meta: { created_at: Date; updated_at: Date };
  author: authorInterface;
  comments: commentInterface[];
  // organization todo
}

interface commentInterface {
  author: authorInterface;
  content: string;
  post: postDataInterface;
  meta: { created_at: Date; updated_at: Date };
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
}

export type { authorInterface, postDataInterface, commentInterface };
