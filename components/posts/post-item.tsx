import classes from "./post-item.module.css";
import { Post } from "../../model/post";
import Link from "next/link";
import Image from "next/image";
import { toLocalYMD } from "../../helpers/date";

function PostItem({ title, image, excerpt, date, slug }: Post) {
  return (
    <li className={classes.post}>
      <Link href={`/posts/${slug}`}>
        <a>
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${image}`}
              alt={title}
              width={300}
              height={200}
              layout={"responsive"}
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{toLocalYMD(date)}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default PostItem;
