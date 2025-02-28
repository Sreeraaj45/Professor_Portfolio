import { Mail, MapPin } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [messageSent, setMessageSent] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('service_name', 'template_name', form.current, {
          publicKey: 'emailjs_public_key', // emailkey must be added
        })
        .then(
          () => {
            setMessageSent(true);
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
            setMessageSent(false);
          }
        );
    }
  };

  return (
    <div className="min-h-screen p-6 py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800" data-aos="fade-down">
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div data-aos="fade-right">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <span>sunilck@iiitdwd.ac.in</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <span>Hubli, Karnataka, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6"
            data-aos="fade-left"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="from_name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email_id"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                rows={4}
                required
              ></textarea>
            </div>

            {/* Success Message */}
            {messageSent && (
              <div className="mt-4 text-center text-green-600 font-semibold">
                Your message has been sent successfully!
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
              value="Send"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}