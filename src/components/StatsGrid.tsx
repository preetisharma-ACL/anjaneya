const stats = [
  {
    value: "3+",
    label: "Cities Covered",
  },
  {
    value: "15+",
    label: "Developer Partnerships",
  },
  {
    value: "50+",
    label: "Properties Successfully Closed",
  },
  {
    value: "100%",
    label: "100% Client Satisfaction Rate",
  },
];

export function StatsGrid() {
  return (
    <section className="max-w-[1136px] mx-auto my-32 bg-surface-white py-48 lg:py-24 border border-default-default">
      <div className=" mx-auto px-24 sm:px-48 lg:px-[36px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-48 lg:gap-0">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-12 lg:px-24 ${
                idx !== stats.length - 1
                  ? "lg:border-r lg:border-default/20"
                  : ""
              }`}
            >
              <span className="text-surface-primary text-2xl lg:text-[40px] font-medium tracking-tight">
                {stat.value}
              </span>
              <span className="text-tertiary text-[16px] font-normal max-w-[200px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
