import { useParams } from 'react-router-dom';
import blogs from '../../utils/blogData';

const slugify = str =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function BlogDetails() {
  const { slug } = useParams();

  const blog = blogs.find(b =>
    slugify(b.title) === slug
  );

  if (!blog) return <div>Blog not found</div>;

  return (
    <article className="blog-details">
      <h2>{blog.title}</h2>
      <img src={blog.img} alt={blog.title} />
      <p>{blog.content}</p>
    </article>
  );
}
