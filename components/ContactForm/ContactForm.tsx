"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [formStatus, setFormStatus] = useState("");

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log("Form data submitted:", data);
      setFormStatus("Your message has been sent successfully!");
    } catch (e) {
      setFormStatus("There was an error sending your message.");
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto px-7 sm:px-0"
    >
      <div className=" mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-gray-800"
          >
            Your Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`mt-2 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition duration-200 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <p className="absolute text-sm text-red-500 mt-2 left-0 right-0">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="email"
            className="block text-lg font-semibold text-gray-800"
          >
            Your Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`mt-2 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition duration-200 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="absolute text-sm text-red-500 mt-2 left-0 right-0">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-lg font-semibold text-gray-800"
        >
          Your Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          className={`mt-2  block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-500 transition duration-200 ${
            errors.message ? "border-red-500" : ""
          }`}
          rows={5}
        />
        {errors.message && (
          <p className=" absolute left-0 right-0 text-sm text-red-500 mt-2">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="mt-9">
        <button
          type="submit"
          className="w-full py-3 px-5 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500 transition duration-200"
        >
          Send Message
        </button>
      </div>

      {formStatus && (
        <div className="mt-6 text-center">
          <p
            className={`text-sm ${
              formStatus.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {formStatus}
          </p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
