import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="About us"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            consequatur quam ratione, nobis ad sed ducimus tenetur nihil omnis
            molestiae! Saepe nihil aperiam voluptates praesentium est tempore
            eos optio quaerat.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            necessitatibus magni adipisci quod nihil, esse hic eius fugiat velit
            eaque?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse quae
            quis deserunt impedit blanditiis id nostrum aliquid facilis nam,
            nulla ipsam quisquam, illum eaque incidunt, illo hic labore quidem.
            Voluptatibus!
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            pariatur ad dolores rerum, libero impedit?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            pariatur ad dolores rerum, libero impedit?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            pariatur ad dolores rerum, libero impedit?
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
