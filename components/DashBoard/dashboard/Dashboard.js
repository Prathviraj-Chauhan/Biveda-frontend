import React from "react";
import styles from "./dashboard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  AppointmentIcon,
  ExperienceIcon,
  EyeShowIcon,
  TotalPatientIcon,
} from "@/components/Icons";
import Pagination from "@/components/Pagination/Pagination";
import { setPatientId } from "@/redux/actions/healthExpertActions";
import { useRouter } from "next/navigation";

const Dashboard = ({ handleChangeTab }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { patientList } = useSelector((state) => state.healthExpert);

  return (
    <div
      className={`${styles["dashboard_main_wraper"]} ${
        isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
      }`}
    >
      <div className={styles.total_values_wrapper}>
        <div className={styles.total_values_div}>
          <div className={styles.left_side}>
            <h3>15000+</h3>
            <span>Total Appointment</span>
          </div>
          <div className={styles.right_side}>
            <AppointmentIcon />
          </div>
        </div>
        <div className={styles.total_values_div}>
          <div className={styles.left_side}>
            <h3>{patientList?.pagination?.total_items}</h3>
            <span>Total Patient</span>
          </div>
          <div className={styles.right_side}>
            <TotalPatientIcon />
          </div>
        </div>
        <div className={styles.total_values_div}>
          <div className={styles.left_side}>
            <h3>10 Years</h3>
            <span>Experian's</span>
          </div>
          <div className={styles.right_side}>
            <ExperienceIcon />
          </div>
        </div>
      </div>
      <h1>Patient List</h1>

      <div className={styles.main_wrapper}>
        <div className={styles.first_div}>
          <div className={styles.second_div}>
            <div className={styles.third_div}>
              <table>
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium text-center"
                    >
                      Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium text-center"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium text-center"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patientList?.data?.map((item, key) => (
                    <tr key={key}>
                      <td>
                        <h4>
                          {item?.first_name} {item?.last_name}
                        </h4>
                      </td>
                      <td className="text-center">
                        <h4>{item.phone}</h4>
                      </td>
                      <td className="text-center">
                        <h4>31 Aug 2023</h4>
                      </td>
                      <td className="d-flex align-items-center justify-content-center">
                        <div
                          className={styles.svg_div}
                          onClick={() => {
                            // handleChangeTab("patients-details");
                            // dispatch(setPatientId(item._id));
                            router.push(
                              `/dashboard/patients-details/?id=${item._id}`
                            );
                          }}
                        >
                          <EyeShowIcon />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{" "}
              <Pagination productList={patientList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
