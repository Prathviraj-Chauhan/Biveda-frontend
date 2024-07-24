"use client";
import React, { useState } from "react";
import styles from "./accordian.module.scss";
import { useSelector } from "react-redux";

const accord = [
  {
    id: 1,
    head: "SECTION 1 - ONLINE STORE TERMS",
    para1:
      "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    para2:
      " You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). ",
    para3:
      "You must not transmit any worms or viruses or any code of a destructive nature.",
    para4:
      "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
  },
  {
    id: 2,
    head: "SECTION 2 - GENERAL CONDITIONS",
    para1:
      "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    para2:
      " You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). ",
    para3:
      "You must not transmit any worms or viruses or any code of a destructive nature.",
    para4:
      "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
  },
  {
    id: 3,
    head: "SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION ",
    para1:
      "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    para2:
      " You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). ",
    para3:
      "You must not transmit any worms or viruses or any code of a destructive nature.",
    para4:
      "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
  },
  {
    id: 4,
    head: "SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES",
    para1:
      "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    para2:
      " You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). ",
    para3:
      "You must not transmit any worms or viruses or any code of a destructive nature.",
    para4:
      "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
  },
  {
    id: 5,
    head: "SECTION 5 - PRODUCTS OR SERVICES (if applicable)",
    para1:
      "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    para2:
      " You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). ",
    para3:
      "You must not transmit any worms or viruses or any code of a destructive nature.",
    para4:
      "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
  },
  {
    id: 6,
    head: "SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION",
    para1:
      "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    para2:
      " You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). ",
    para3:
      "You must not transmit any worms or viruses or any code of a destructive nature.",
    para4:
      "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
  },
  {
    id: 7,
    head: "SECTION 7 - OPTIONAL TOOLS",
    para1:
      "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    para2:
      " You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). ",
    para3:
      "You must not transmit any worms or viruses or any code of a destructive nature.",
    para4:
      "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
  },
  {
    id: 8,
    head: "SECTION 8 - THIRD-PARTY LINKS",
    para1:
      "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    para2:
      " You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). ",
    para3:
      "You must not transmit any worms or viruses or any code of a destructive nature.",
    para4:
      "A breach or violation of any of the Terms will result in an immediate termination of your Services.",
  },
];

const Accordian = () => {
  const [open, setOpen] = useState({});
  const { isDarkTheme } = useSelector((state) => state.auth);

  const accordianClickHandler = (id) => {
    setOpen({ ...open, [id]: open[id] ? false : true });
  };

  return (
    <>
      <div
        className={`${styles["faq_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_faq_wrapper"] : null
        }`}
      >
        <div className={styles.main_div}>
          <div className={styles.acord_div}>
            {accord.map((item, key) => (
              <div className={styles.acordian_div} key={key}>
                <div className={styles.sections}>
                  <div
                    className={styles.plus_div}
                    onClick={() => accordianClickHandler(item?.id)}
                  >
                    <h4
                      className={`${
                        open[item?.id] ? styles.head2 : styles.head1
                      }`}
                    >
                      {item.head}
                    </h4>
                    {open[item?.id] ? (
                      <i className="fa fa-minus" aria-hidden="true"></i>
                    ) : (
                      <i
                        className="fa fa-plus"
                        aria-hidden="true"
                        style={{ color: "#fff" }}
                      ></i>
                    )}
                  </div>
                  {open[item?.id] && (
                    <div className={styles.para_div}>
                      <p>{item.para1}</p>
                      <p>{item.para2}</p>
                      <p>{item.para3} </p>
                      <p>{item.para4} </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordian;
