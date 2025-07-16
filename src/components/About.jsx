import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About <span className="text-emerald-600">EduRevise</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Revolutionizing the way students prepare for exams.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-emerald-50 rounded-2xl p-8 mb-16 shadow-lg">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To empower students with high-quality revision materials that make learning efficient, effective, and engaging.
              </p>
              <a href='/courses'>
              <div className="bg-emerald-600 text-white px-6 py-3 rounded-lg inline-block font-medium hover:bg-emerald-700 transition duration-300">
                Learn more about our approach
              </div>
              </a>
            </div>
            <div className="relative">
              <div className="bg-emerald-100 rounded-xl p-6 h-full flex items-center">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-emerald-600 rounded-md p-2">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Fast Revision</h3>
                      <p className="mt-1 text-gray-600">Condensed materials for quick learning</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-emerald-600 rounded-md p-2">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Exam Focused</h3>
                      <p className="mt-1 text-gray-600">Content tailored to exam requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-emerald-600 rounded-md p-2">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">Community Driven</h3>
                      <p className="mt-1 text-gray-600">By students, for students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Alex Johnson',
                role: 'Founder & CEO',
                bio: 'Former teacher with 10+ years experience in curriculum design',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              },
              {
                name: 'Sarah Chen',
                role: 'Head of Content',
                bio: 'Education specialist with PhD in Cognitive Learning',
                image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              },
              {
                name: 'Michael Rodriguez',
                role: 'CTO',
                bio: 'EdTech expert building learning platforms since 2012',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              },
            ].map((person) => (
              <div key={person.name} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center">
                      <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500">
                        <img className="h-16 w-16 rounded-full" src={person.image} alt={person.name} />
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">{person.name}</h3>
                    <p className="mt-1 text-emerald-600 text-center">{person.role}</p>
                    <p className="mt-3 text-base text-gray-500 text-center">{person.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="lg:text-center">
              <h2 className="text-base font-semibold text-emerald-400 tracking-wide uppercase">By the numbers</h2>
              <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                Trusted by students worldwide
              </p>
            </div>
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { name: 'Active Users', value: '250,000+' },
                  { name: 'Revision Notes', value: '10,000+' },
                  { name: 'Exam Boards Covered', value: '15+' },
                  { name: 'Countries', value: '120+' },
                ].map((stat) => (
                  <div key={stat.name} className="text-center">
                    <div className="text-4xl font-extrabold text-emerald-400">{stat.value}</div>
                    <div className="mt-2 text-sm font-medium text-gray-400">{stat.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to revolutionize your revision?</span>
              <span className="block text-emerald-100">Start learning smarter today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/login"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50"
                >
                  Get started
                </a>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="/courses"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 bg-opacity-60 hover:bg-opacity-70"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;