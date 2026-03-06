"use client"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#111929] to-[#192940] py-14 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {/* Logo Section */}
        <div className="group" >
          <Link href="/">
            <Image
              className="brightness-0 invert mb-6"
              src="/images/sarwa-studio.svg"
              alt="Sarwa Studio"
              width={240}
              height={80}
            />
          </Link>

          <div className="w-12 h-0.5 bg-amber-400 transition-all duration-500 group-hover:w-40"></div>

          <p className="text-sm mt-6 leading-relaxed text-gray-400">
            Designs That Speak, Art That Inspires.
          </p>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-6 flex items-center">
            <div className="w-1 h-6 bg-amber-400 mr-3 rounded-full"></div>
            Quick Links
          </h3>

          <ul className="space-y-4">

            {[
              { name: "Home", link: "/" },
              { name: "Services", link: "/service" },
              { name: "About Us", link: "/about-us" },
              { name: "Blogs", link: "/blogs" },
              { name: "Contact Us", link: "/contact-us" },

            ].map((item, index) => (
              <li key={index} className="group flex items-center space-x-3 cursor-pointer">

                <div className="w-2 h-2 bg-amber-400 rounded-full transition-all duration-300 group-hover:scale-125"></div>

                <Link
                  href={item.link}
                  className="transition-all duration-300 group-hover:text-amber-400 group-hover:translate-x-2"
                >
                  {item.name}
                </Link>

              </li>
            ))}

          </ul>
        </div>


        {/* Contact Section */}
        <div>
          <h3 className="font-semibold text-white mb-6 flex items-center">
            <div className="w-1 h-6 bg-amber-400 mr-3 rounded-full"></div>
            Contact Us
          </h3>

          <ul className="space-y-4">

            <li className="flex items-center space-x-3 group">
              <FontAwesomeIcon icon={faEnvelope} />
              <a
                href="mailto:vv797538@gmail.com?subject=Business%20Inquiry"
                className="transition-all duration-300 group-hover:text-amber-400 group-hover:translate-x-2"
              >
                vv797538@gmail.com
              </a>
            </li>

            <li className="flex items-center space-x-3 group">
              <FontAwesomeIcon icon={faPhone} />
              <a
                href="tel:+916353935976"
                className="transition-all duration-300 group-hover:text-amber-400 group-hover:translate-x-2"
              >
                +91 63539 35976
              </a>
            </li>

            <li className="flex items-center space-x-3 group">
              <FontAwesomeIcon icon={faWhatsapp} className="text-green-500" />
              <a
                href="https://wa.me/916353935976"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 group-hover:text-green-400 group-hover:translate-x-2"
              >
                WhatsApp
              </a>
            </li>

          </ul>
        </div>

      </div>


      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500 items-center grid md:grid-cols-3">
        <div>
          © {new Date().getFullYear()} Sarwa Studio. All rights reserved.
        </div>
        <div>

        </div>
        <div className="text-cenetr grid md:grid-cols-3">
          <div>
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>
          </div>
          <div>
            <Link href="/terms-conditions">
              Terms & Conditions
            </Link>
          </div>
          <div>
            <Link href="/privacy-policy">
              <span className="flex">Owener: <div className="ml-2 text-amber-400" > vinayak</div></span>
            </Link>

          </div>

        </div>
      </div>

    </footer>
  )
}
