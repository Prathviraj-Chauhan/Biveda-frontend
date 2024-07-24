"use client";

import React, { useState } from "react";
import Banner from "../banner/Banner";
import styles from "./consultaion.module.scss";
import ShopByCategory from "../Home/ShopByCategory";
import { useSelector } from "react-redux";
import Input from "../common/Input";
import { ChatIcon, SendIcon } from "../Icons";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

const Consultaion = () => {
  const { isDarkTheme } = useSelector((state) => state.auth);
  const [values, setValues] = useState({ message: "" });

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSendRequest = async (e) => {
    e.preventDefault();

    const newMessage = {
      message: values?.message,
      direction: "outgoing",
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <>
      <Banner text="free health consultation and diagnosis" />
      <div
        className={`${styles["privacy_wrapper"]} ${
          isDarkTheme === "light" ? styles["light_consultaion_wrapper"] : null
        }`}
      >
        <div className="container">
          <div className={styles.privacy_main}>
            <div className={styles.send_message}>
              <form
                className={styles.send_message_box}
                onSubmit={handleSendRequest}
              >
                <Input
                  type="text"
                  placeholder="Send a massage"
                  name="message"
                  onChange={onInputChange}
                  value={values?.message}
                />

                <button type="submit" className={styles.send_icon}>
                  <SendIcon />
                </button>
              </form>
            </div>

            <div className={styles.detals_inqr}>
              <div className={styles.qrbox}>QR</div>
              <div className={styles.chat_answers}>
                <h6 className={styles.privacy_main_headings}>
                  Creating the best UI design in Figma involves a combination of
                  design principles, best practices, and the following steps:
                </h6>
                <ul className={styles.listsin_qr}>
                  1. Understand the Project and Audience:
                  <ul>
                    • Begin by thoroughly understanding the project requirements
                    and the target audience. Know what problem your design is
                    solving and who it is solving it for.
                  </ul>
                </ul>
                <ul className={styles.listsin_qr}>
                  2. Research and Inspiration::
                  <ul>
                    • Gather inspiration from various sources, including
                    competitor analysis, design websites, and apps. Create mood
                    boards and collect design references.
                  </ul>
                </ul>
                <ul className={styles.listsin_qr}>
                  3. Wireframing:
                  <ul>
                    • Start with wireframes to create a basic layout of your UI.
                    Focus on the structure and layout without worrying about
                    visual design elements.
                  </ul>
                </ul>
                <ul className={styles.listsin_qr}>
                  4. Information Architecture:
                  <ul>
                    • Organize content logically and create a sitemap to ensure
                    the flow of information makes sense.
                  </ul>
                </ul>
                <ul className={styles.listsin_qr}>
                  5. Typography:
                  <ul>
                    • Choose appropriate fonts that match the brand and are easy
                    to read. Consider typography hierarchy for headings,
                    subheadings, and body text.
                  </ul>
                </ul>
                <ul className={styles.listsin_qr}>
                  6. ustrations, and graphics that enhance the user experience
                  and support the content.
                </ul>
              </div>
            </div>
          </div>
        </div>

        <ShopByCategory title={true} />

        <div className={styles.products}>
          <button className={styles.chat_with_expertBtn}>
            <ChatIcon />
            Chat With Heath Expert
          </button>
        </div>
      </div>
    </>
  );
};

export default Consultaion;
