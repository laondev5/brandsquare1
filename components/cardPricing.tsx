import React from 'react'

const CardPricing = () => {
  return (
    <div><div className="  pb-32 ">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Pricing Plans</h2>
      <p className="mt-4 text-gray-600">Choose a plan that fits your needs and start today!</p>
  
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
         <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800">Free Plan</h3>
          <p className="mt-2 text-gray-600">Starter Access
          </p>
          <div className="mt-4">
            <span className="text-4xl font-bold text-gray-800">₦0</span>
            <span className="text-sm text-gray-600">/month</span>
          </div>
          <ul className="mt-6 space-y-4">
            <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span> Upload up to 20 products.
            </li>
            <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span>Basic visibility on the platform.

            </li>
            <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span> Access to a dashboard with basic
              analytics.
            </li>
            <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span> Limited customer interaction via
              messaging.
            </li>
          </ul>
          <button className="mt-6 bg-[#000035] text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-[#000035ec]">
            Get Started
          </button>
        </div>
  
         <div className="bg-[#000035] text-white border border-[#000035] rounded-lg shadow-md p-6 transform scale-105">
          <h3 className="text-xl font-semibold">Basic Plan</h3>
          <p className="mt-2">Growth Access</p>
          <div className="mt-4">
            <span className="text-4xl font-bold">₦400</span>
            <span className="text-sm">/month</span>
          </div>
          <ul className="mt-6 space-y-4">
            <li className="flex items-center">
              <span className="mr-2">✔</span> Upload up to 50 products.
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span>Enhanced visibility in search results.
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span>Access to a customizable store page.
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span>Advanced analytics
            </li>
            {/* <li className="flex items-center">
              <span className="mr-2">✔</span>discounts and coupons offers to
              customers.
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span>Priority customer support
            </li> */}
          </ul>
          <button className="mt-6 bg-white  text-[#000035] px-6 py-3 rounded-lg w-full font-medium hover:bg-gray-100">
            Get Started
          </button>
        </div>
  
         <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800">Premium Plan</h3>
          <p className="mt-2 text-gray-600">Enterprise Access</p>
          <div className="mt-4">
            <span className="text-4xl font-bold text-gray-800">₦7000</span>
            <span className="text-sm text-gray-600">/month</span>
          </div>
          <ul className="mt-6 space-y-4">
            <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span>Unlimited product uploads.
            </li>
            <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span>Featured placement on search results.
            </li>
            <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span>Access to targeted marketing tools.
            </li>
            <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span>
 Access customer demographics .
            </li>
            {/* <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span>
              streamlined shipping and tracking
            </li>
            <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span>Monthly promotional credits .
            </li>
            <li className="text-gray-600 flex items-center">
              <span className="mr-2 text-green-500">✔</span>
              support for business growth.
            </li> */}
          </ul>
          <button className="mt-6 bg-[#000035] text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-[#000035ec]">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default CardPricing