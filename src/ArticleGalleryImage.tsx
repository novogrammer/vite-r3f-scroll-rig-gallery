import styles from "./ArticleGalleryImage.module.scss";


export default function ArticleGalleryImage(){
  return (
    <article className={styles["component"]}>
      <img className={styles["component__image"]} src="assets/dummy500x500.png" alt=""/>
      <h3 className={styles["component__title"]}>Article Image Title</h3>
    </article>
  )
}