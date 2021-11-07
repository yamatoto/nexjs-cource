import classes from "./post-header.module.css";
import Image from "next/image";

function PostHeader({
  title,
  imagePath,
}: {
  title: string;
  imagePath: string;
}) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={imagePath} alt={title} width={200} height={150} />
    </header>
  );
}

export default PostHeader;
