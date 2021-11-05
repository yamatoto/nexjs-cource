import classes from "./hero.module.css";
import Image from "next/image";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/yamato.jpg"
          alt="An image showing blogger"
          width={300}
          height={300}
        />
      </div>
      <h1>Yamato blog</h1>
      <p>
        楽して稼ぎたい楽して稼ぎたい楽して稼ぎたい楽して稼ぎたい楽して稼ぎたい楽して稼ぎたい楽して稼ぎたい楽して稼ぎたい
      </p>
    </section>
  );
}

export default Hero;
