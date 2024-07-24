import styles from "./videobanner.module.scss";

const ImageWithVideoBanner = ({ setPopup }) => {
  return (
    <>
      <div className={styles["bg_wrapper_popup_new"]}>
        <div
          className={`${styles["popup_box_bpn"]} ${styles["video_main_wrapper"]} ${styles["profile_nceqoi_popup"]} ${styles["pb-4"]}`}
        >
          <div className={styles["video_wrapper"]}>
            <video src="/banner-video.mp4" autoPlay controls loop></video>
            <div className={styles["close_pp_btn"]} onClick={() => setPopup()}>
              <i className="fa fa-remove"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ImageWithVideoBanner;
