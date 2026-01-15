

import React from 'react';
import DemoShowcase from '../components/DemoShowcase';
import QuoteBooklet from '../components/QuoteBooklet';

export default function Home() {
  return (
    <>
      <div className="flex pl-14" style={{ fontSize: '13pt', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.03) 0%, rgba(244, 114, 182, 0.03) 100%)' }}>
        {/* Right Side - PC Build Promo: 5 images in grid, larger */}
        <div className="w-full flex flex-col items-center justify-start p-4" style={{ fontSize: '13pt', paddingTop: '80px' }}>
          <div className="flex flex-col w-full max-w-2xl items-center">
            <div className="mb-2 flex justify-center items-center w-full" style={{ fontSize: '13pt' }}>
              <span className="text-2xl font-bold text-white italic drop-shadow-lg transform -rotate-6 bg-gradient-to-r from-pink-500 to-green-500 px-4 py-1.5 rounded-2xl shadow-lg" style={{ fontSize: '13pt' }}>
                Build PC with us for <span className="text-pink-200">half the price</span>
              </span>
            </div>
            <div className="flex gap-3 w-full justify-center" style={{ fontSize: '13pt' }}>
              <img src="/gempages.webp" srcSet="/gempages.webp 1x" sizes="(min-width: 1024px) 50vw, 100vw" alt="Gem Pages" className="object-cover h-56 w-full" style={{imageRendering: 'auto', border: 'none', boxShadow: 'none', borderRadius: 0}} />
              <img src="/gempages1.webp" srcSet="/gempages1.webp 1x" sizes="(min-width: 1024px) 50vw, 100vw" alt="Gem Pages 1" className="object-cover h-56 w-full" style={{imageRendering: 'auto', border: 'none', boxShadow: 'none', borderRadius: 0}} />
            </div>
          </div>
        </div>
      </div>
      {/* Small business info as plain text below main content */}
      <div className="w-full pl-16 pr-6 py-4" style={{ fontSize: '13pt', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.03) 0%, rgba(244, 114, 182, 0.03) 100%)' }}>
        <h2 className="text-2xl font-bold text-green-700 mb-1 text-left" style={{ fontSize: '13pt' }}>Small business</h2>
        <p className="text-gray-700 leading-relaxed text-left" style={{ fontSize: '13pt' }}>
          Most people forget that to start a business you need reach you have to spend, but not continuously. Having to pay one time vs paying over time to keep your site active can cause unexpected issues. Hosting your website on a third party: what if they shut down? What now? You look for another with an even higher monthly price?<br /><br />
          We let you customize your website and you get to choose exactly how you want it to look not pre formatted, not dragging and dropping. It will look unique to your standard and there are no restrictions. After all, you fully own it.
        </p>
      </div>
      <DemoShowcase />
      <QuoteBooklet open={false} onClose={() => {}} />
    </>
  );
}
