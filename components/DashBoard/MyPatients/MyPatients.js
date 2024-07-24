import React from "react";
import styles from "./mypatients.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { EyeShowIcon } from "@/components/Icons";
import Pagination from "@/components/Pagination/Pagination";
import { setPatientId } from "@/redux/actions/healthExpertActions";
import { useRouter } from "next/navigation";

const MyPatients = ({ handleChangeTab }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isDarkTheme } = useSelector((state) => state.auth);
  const { patientList } = useSelector((state) => state.healthExpert);

  return (
    <div
      className={`${styles["mypatients_main_wrapper"]} ${
        isDarkTheme === "light" ? styles["lightevents__wrapper"] : null
      }`}
    >
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
                      <td className="text-center ">
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
              </table>
              <Pagination productList={patientList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPatients;
