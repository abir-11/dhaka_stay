export default function AnnouncementBar() {
  const messages = [
    { icon: "campaign", text: "Find the best apartments in Dhaka" },
    { icon: "local_offer", text: "Up to 30% discount on monthly stays" },
    { icon: "verified", text: "Verified Hosts Only" },
    { icon: "workspace_premium", text: "Luxury Penthouses available in Gulshan" },
  ];

  return (
    <div className="bg-primary text-on-primary py-2 overflow-hidden whitespace-nowrap border-b border-primary-container">
      <div className="flex animate-marquee">
        {[...messages, ...messages].map((item, i) => (
          <span
            key={i}
            className="mx-8 font-semibold uppercase tracking-widest text-xs flex items-center gap-2"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
              {item.icon}
            </span>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}