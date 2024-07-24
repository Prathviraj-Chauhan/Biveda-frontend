"use client";

import { useState } from "react";
import styles from "./accordian.module.scss";
import { useSelector } from "react-redux";

const ReturnPolicyAccordiean = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);

  const accord = [
    {
      id: 1,
      head: "Personal information we collect",
      para1:
        "When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.",
    },
    {
      id: 2,
      head: "We collect Device Information using the following technologies:",
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
      head: "How do we use your personal information? ",
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
      head: "How do we use your personal information?",
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
      head: "Sharing your personal Information",
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
      head: "Behavioural advertising",
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
      head: "Do not track",
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
      head: "Your rights",
      para1:
        "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    },
    {
      id: 9,
      head: "Data retention",
      para1:
        "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    },
    {
      id: 10,
      head: "Changes",
      para1:
        "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    },
    {
      id: 11,
      head: "Contact us",
      para1:
        "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.",
    },
  ];

  const [open, setOpen] = useState({});

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
          <div className={styles.head_div}>RETURN POLICY</div>
          <p>
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from
            polkallama.com . your personal information is collected, used, and
            shared when you visit or make a purchase from polkallama.com (the
            “Site”).
          </p>
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
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    )}
                  </div>
                  {open[item?.id] && (
                    <div className={styles.para_div}>
                      <p>{item.para1}</p>
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

export default ReturnPolicyAccordiean;
