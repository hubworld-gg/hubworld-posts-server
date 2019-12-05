import { Post } from 'schemaTypes';

const generateHash = (len = 13) =>
  Math.floor(2147483648 * Math.random()).toString(36) +
  Math.abs(Math.floor(2147483648 * Math.random()) ^ (Date.now || +new Date())())
    .toString(36)
    .substr(0, len);

const slugify = (str: string) => {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

const formatTags = (tags: string[]) => {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return tags.map(
    tag => tag.toString().replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
  );
};

const firebaseDocToPost = (
  doc: FirebaseFirestore.DocumentSnapshot,
  data: FirebaseFirestore.DocumentData
): Post => ({
  id: doc.id,
  author: {
    id: data.authorId,
    posts: []
  },
  title: data.title,
  slug: data.slug,
  content: data.content,
  tags: data.tags,
  reactions: data.reactions?.map((r: any) => ({
    type: r.type,
    user: {
      id: r.userId,
      posts: []
    }
  }))
});

export { firebaseDocToPost, generateHash, slugify, formatTags };
