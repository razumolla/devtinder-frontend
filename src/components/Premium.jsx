const Premium = () => {
  return (
    <div className="m-10 flex flex-col items-center text-center">
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        Choose Your Membership
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Silver Membership */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-300 shadow-2xl border border-gray-300 rounded-3xl p-8 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Silver Membership
          </h2>
          <ul className="text-gray-700 mb-6 space-y-2 text-lg">
            <li>✅ Chat with other person</li>
            <li>✅ 100 connections</li>
            <li>✅ Get a Blue Tick</li>
          </ul>
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-full shadow-lg hover:bg-gray-900 transition-all duration-300">
            Buy Silver
          </button>
        </div>

        {/* Gold Membership */}
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl border border-yellow-500 rounded-3xl p-8 flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-2xl font-bold text-white mb-4">
            Gold Membership
          </h2>
          <ul className="text-white mb-6 space-y-2 text-lg">
            <li>🌟 All Silver perks</li>
            <li>🌟 Unlimited connections</li>
            <li>🌟 Priority support</li>
            <li>🌟 Exclusive content</li>
          </ul>
          <button className="px-6 py-3 bg-white text-yellow-600 font-semibold rounded-full shadow-lg hover:bg-yellow-500 hover:text-white transition-all duration-300">
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
