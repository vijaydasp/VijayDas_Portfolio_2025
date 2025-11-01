import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TestAOS = () => {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    AOS.init();

    // Function to check all elements that use AOS
    const checkWillChange = () => {
      // Select all elements that have a data-aos attribute
      const aosElements = document.querySelectorAll('[data-aos]');
      
      console.log(`Found ${aosElements.length} elements with data-aos attribute`);
      
      aosElements.forEach((element, index) => {
        // Add a visible red dashed border for debugging
        element.style.border = '2px dashed red';
        
        // Get computed styles of the element
        const computedStyle = window.getComputedStyle(element);
        const willChange = computedStyle.getPropertyValue('will-change');
        
        // Log information about each AOS element
        console.log(`Element ${index + 1}:`, {
          'AOS animation type': element.getAttribute('data-aos'),
          'Will-change property': willChange,
          'HTML tag': element.tagName,
          'CSS classes': element.className
        });
      });
    };

    // Run the check after a short delay
    // This gives AOS time to apply its styles
    setTimeout(checkWillChange, 100);
  }, []);

  return (
    <>
      {/* Add custom CSS to ensure smooth AOS animations */}
      <style>
        {`
          [data-aos] {
            will-change: transform, opacity !important;
          }
        `}
      </style>

      {/* You can add test content here */}
      <div data-aos="fade-up" className="p-4 m-4 bg-gray-800 text-white rounded">
        <h2>Test AOS Animation</h2>
        <p>This element uses AOS animation (fade-up).</p>
      </div>

      <div data-aos="zoom-in" className="p-4 m-4 bg-blue-700 text-white rounded">
        <h2>Another AOS Test</h2>
        <p>This element uses zoom-in animation.</p>
      </div>
    </>
  );
};

export default TestAOS;
