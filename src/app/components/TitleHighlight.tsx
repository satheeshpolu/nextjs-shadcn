type Props = {
  title: string;
  fromGradient: string;
  viaGradient: string;
  toGradient: string;
};
export default function TitleHighlight({
  title,
  fromGradient,
  viaGradient,
  toGradient,
}: Props) {
  return (
    <h2 className="relative text-2xl md:text-4xl font-bold text-center inline-block mb-8">
      <span className="relative z-10"> {title} </span>
      <span
        className={`absolute inset-0 bg-gradient-to-r ${fromGradient} ${viaGradient} ${toGradient} rounded-2xl blur-md -rotate-2 scale-110`}
      >
        {" "}
      </span>
    </h2>
  );
}
