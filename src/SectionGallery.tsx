import ArticleGalleryImage from "./ArticleGalleryImage";
import ArticleGalleryThree from "./ArticleGalleryThree";
import styles from "./SectionGallery.module.scss";


export default function SectionGallery(){
  return (
    <div className={styles["component"]}>
      <h2 className={styles["component__title"]}>Gallery</h2>
      <div className={styles["component__article-list"]}>
        <div className={styles["component__article-wrapper"]}>
          <ArticleGalleryImage/>
        </div>
        <div className={styles["component__article-wrapper"]}>
          <ArticleGalleryThree/>
        </div>
        <div className={styles["component__article-wrapper"]}>
          <ArticleGalleryImage/>
        </div>
        <div className={styles["component__article-wrapper"]}>
          <ArticleGalleryThree/>
        </div>
        <div className={styles["component__article-wrapper"]}>
          <ArticleGalleryImage/>
        </div>
        <div className={styles["component__article-wrapper"]}>
          <ArticleGalleryThree/>
        </div>
      </div>
    </div>
  )
}