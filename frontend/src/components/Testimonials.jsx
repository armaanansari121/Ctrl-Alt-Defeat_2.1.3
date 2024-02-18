import React from 'react';

const Testimonials = () => {
  // Sample data for testimonials
  const testimonials = [
    { name: 'John Doe', position: 'CEO, Company ABC', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla laoreet velit a tempus. Sed suscipit ultrices libero, non mattis erat consequat nec.' },
    { name: 'Jane Smith', position: 'Founder, XYZ Corp', message: 'Nullam ut consectetur metus. Sed eu leo vel nisi efficitur pulvinar. Vestibulum non nulla et nisi rhoncus finibus. Curabitur malesuada orci et nunc ullamcorper, vitae consequat nulla ullamcorper.' },
    { name: 'Michael Johnson', position: 'Marketing Manager, Company XYZ', message: 'Vivamus vitae felis nisl. Integer ac lorem vel quam accumsan efficitur. Mauris eget odio fermentum, pharetra metus nec, euismod magna. Aenean quis dolor et dui eleifend pretium.' },
    // Add more testimonials as needed
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Testimonials</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 mb-4">{testimonial.message}</p>
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 mr-3">
                  <img className="w-10 h-10 rounded-full" src={`https://randomuser.me/api/portraits/men/${index}.jpg`} alt={testimonial.name} />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
