import React from "react";
import styles from "./dietlist.module.scss";
import { useSelector } from "react-redux";
import { EyeShowIcon } from "@/components/Icons";

const DietPlanList = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);

  return (
    <div
      className={`${styles["mypatients_main_wrapper"]} ${
        isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
      }`}
    >
      <div className={styles.third_div}>
        <table>
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-center">
                Plan
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-center">
                Date
              </th>
              <th scope="col" className="px-6 py-3 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4>john smith</h4>
              </td>
              <td className="text-center">
                <h4>Current Plan</h4>
              </td>
              <td className="text-center">
                <h4>31 Aug 2023</h4>
              </td>
              <td className="d-flex align-items-center justify-content-center">
                <div className={styles.svg_div}>
                  <EyeShowIcon />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>john smith</h4>
              </td>
              <td className="text-center">
                <h4>Current Plan</h4>
              </td>
              <td className="text-center">
                <h4>31 Aug 2023</h4>
              </td>
              <td className="d-flex align-items-center justify-content-center">
                <div className={styles.svg_div}>
                  <EyeShowIcon />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>john smith</h4>
              </td>
              <td className="text-center">
                <h4>Current Plan</h4>
              </td>
              <td className="text-center">
                <h4>31 Aug 2023</h4>
              </td>
              <td className="d-flex align-items-center justify-content-center">
                <div className={styles.svg_div}>
                  <EyeShowIcon />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>john smith</h4>
              </td>
              <td className="text-center">
                <h4>Current Plan</h4>
              </td>
              <td className="text-center">
                <h4>31 Aug 2023</h4>
              </td>
              <td className="d-flex align-items-center justify-content-center">
                <div className={styles.svg_div}>
                  <EyeShowIcon />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>john smith</h4>
              </td>
              <td className="text-center">
                <h4>Current Plan</h4>
              </td>
              <td className="text-center">
                <h4>31 Aug 2023</h4>
              </td>
              <td className="d-flex align-items-center justify-content-center">
                <div className={styles.svg_div}>
                  <EyeShowIcon />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>john smith</h4>
              </td>
              <td className="text-center">
                <h4>Current Plan</h4>
              </td>
              <td className="text-center">
                <h4>31 Aug 2023</h4>
              </td>
              <td className="d-flex align-items-center justify-content-center">
                <div className={styles.svg_div}>
                  <EyeShowIcon />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h4>john smith</h4>
              </td>
              <td className="text-center">
                <h4>Current Plan</h4>
              </td>
              <td className="text-center">
                <h4>31 Aug 2023</h4>
              </td>
              <td className="d-flex align-items-center justify-content-center">
                <div className={styles.svg_div}>
                  <EyeShowIcon />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DietPlanList;
