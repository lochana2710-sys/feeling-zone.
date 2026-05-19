"use client";

import { useState, useEffect } from "react";
import { Heart, Send, MessageCircle, ShieldCheck, MoonStar } from "lucide-react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyOunwXndq21YJUa-9j7LcUqNvduOLmYo28",
  authDomain: "feeling-zone-db.firebaseapp.com",
  databaseURL: "https://feeling-zone-db-default-rtdb.firebaseio.com",
  projectId: "feeling-zone-db",
  storageBucket: "feeling-zone-db.firebasestorage.app",
  messagingSenderId: "122868350318",
  appId: "1:122868350318:web:386b96afa6415abae6957f",
  measurementId: "G-15Z538FQLZ"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export default function FeelingZoneWebsite() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    const postsRef = ref(database, "posts");
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })).reverse();
        setPosts(list);
      } else {
        setPosts([
          {
            id: "default-1",
            author: "Anonymous",
            text: "හිතට දැනෙන හැඟීම් වචන වලට පෙරලන්න පුළුවන් තැනක් මේ... 🫀"
          },
          {
            id: "default-2",
            author: "සෙනූ",
            text: "නිහඬ මතක අතරේ තනි වෙලා ඉන්න හිතකටත් ආදරේ ඕන... 🌙"
          }
        ]);
      }
    });
  }, []);

  const submitPost = (e) => {
    e.preventDefault();
    if (!text) return;

    const postsRef = ref(database, "posts");
    push(postsRef, {
      author: anonymous ? "Anonymous" : author || "Unknown",
      text: text,
      timestamp: Date.now()
    });

    setAuthor("");
    setText("");
    setAnonymous(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-black to-[#111827]" />

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full animate-pulse" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-10">
        <div className="text-center py-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2 rounded-full backdrop-blur-xl mb-6">
            <MoonStar className="text-yellow-300" size={18} />
            <span className="text-sm text-gray-300">Aesthetic Sinhala Poetry Community</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 bg-gradient-to-r from-pink-300 via-white to-blue-300 bg-clip-text text-transparent">
            𝗙𝗲𝗲𝗹𝗶𝗻𝗴 𝗭𝗼𝗻𝗲...! 🫀🕊️✨
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-9">
            හිතේ හැඟීම්, මතක, ආදරේ සහ ජීවිතේ ලස්සන සිතුවිලි share කරන්න පුළුවන් community එකක් 🌙
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl">
            <MessageCircle className="mb-4 text-pink-300" size={35} />
            <h3 className="text-2xl font-semibold mb-3">Followers Thoughts</h3>
            <p className="text-gray-300 leading-8">
              Followers ලට තමන්ගේ feelings සහ poems share කරන්න පුළුවන්.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl">
            <ShieldCheck className="mb-4 text-blue-300" size={35} />
            <h3 className="text-2xl font-semibold mb-3">Anonymous Posting</h3>
            <p className="text-gray-300 leading-8">
              Anonymous විදියට posts publish කරන්නත් පුළුවන්.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl">
            <Heart className="mb-4 text-red-300" size={35} />
            <h3 className="text-2xl font-semibold mb-3">Beautiful UI</h3>
            <p className="text-gray-300 leading-8">
              Calm dark aesthetic design එකක් එක්ක relaxing feeling එකක්.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8">💌 ඔබේ නිසදැස දාන්න</h2>

            <form onSubmit={submitPost} className="space-y-5">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="ඔබේ නම"
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-pink-400"
              />

              <textarea
                rows="7"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="ඔබේ thoughts / poem / feelings මෙතන ලියන්න..."
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 outline-none focus:border-pink-400"
              />

              <label className="flex items-center gap-3 text-gray-300">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={() => setAnonymous(!anonymous)}
                />
                Anonymous විදියට post කරන්න
              </label>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-all duration-300 py-4 rounded-2xl font-semibold text-lg shadow-2xl"
              >
                <Send size={20} />
                Publish Thought
              </button>
            </form>
          </div>

          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[35px] p-8 shadow-2xl flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-8">📞 Contact Owner</h2>

            <div className="bg-black/40 border border-white/10 rounded-3xl p-6 mb-6">
              <p className="text-gray-400 mb-2">Owner WhatsApp</p>
              <h3 className="text-4xl font-bold text-pink-300">0715127245</h3>
            </div>

            <a
              href="https://wa.me/94715127245"
              target="_blank"
              className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-center py-5 rounded-2xl text-lg font-semibold shadow-2xl"
            >
              Contact on WhatsApp 💬
            </a>
          </div>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span>📝 මෑතකදී පළවූ නිසදැස් ({posts.length})</span>
          </h2>
          {posts.map((post) => (
            <div key={post.id} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:border-pink-500/30 transition-all duration-300">
              <p className="text-xl text-gray-100 leading-9 mb-4 whitespace-pre-wrap">{post.text}</p>
              <div className="flex items-center justify-between text-sm text-pink-300 border-t border-white/5 pt-3">
                <span>✍️ <b>{post.author}</b> විසින්</span>
              </div>
            </div>
          ))}
        </div>

        <footer className="border-t border-white/10 py-10 text-center">
          <p className="text-gray-400 text-lg">
            © 2026 Feeling Zone...! 🫀🕊️✨
          </p>
        </footer>
      </div>
    </div>
  );
}
