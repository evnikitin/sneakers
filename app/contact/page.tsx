import ContactForm from "@/components/ContactForm/ContactForm";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8 ">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-12">
          We are here to assist you with any questions or concerns you may have
          about our sneakers. Feel free to get in touch, and we will respond as
          soon as possible!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 mx-auto">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Store Location
            </h2>
            <p className="text-gray-600 mt-2 text-center">
              123 Sneaker Lane, New York, NY 10001
            </p>
            <p className="text-gray-600 mt-2 text-center">
              Opening hours: Monday to Saturday, 10:00 AM - 7:00 PM
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Contact Information
            </h2>
            <p className="text-gray-600 mt-2 text-center md:text-left">
              Phone: +1 (800) 123-4567
            </p>
            <p className="text-gray-600 mt-2 text-center md:text-left">
              Email: support@axolotlsneakers.com
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
