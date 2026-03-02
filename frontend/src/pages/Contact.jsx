import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      {/* Header */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Contact Info + Image */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.contact_img}
          alt="Contact us"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600">
          <b className="text-xl text-gray-800">Our Store</b>
          <p>
            1234 Fashion Avenue <br />
            Suite 100, New York, NY 10001
          </p>

          <b className="text-xl text-gray-800">Get In Touch</b>
          <p>
            Phone: (123) 456-7890 <br />
            Email: support@forever.com
          </p>

          <b className="text-xl text-gray-800">Careers at Forever</b>
          <p>Learn more about our teams and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer w-fit">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Contact Form */}
      <div className="text-xl py-4">
        <Title text1={"SEND US A"} text2={"MESSAGE"} />
      </div>

      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 mb-20 max-w-[600px]"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 outline-none focus:border-gray-800 transition-colors"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 outline-none focus:border-gray-800 transition-colors"
            placeholder="Your Email"
            required
          />
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 outline-none focus:border-gray-800 transition-colors resize-none"
          placeholder="Your Message"
          rows={6}
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-8 py-3 text-sm cursor-pointer active:bg-gray-700 w-fit"
        >
          SUBMIT
        </button>
      </form>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
