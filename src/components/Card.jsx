export default function Card(props) {
  const { title, subtitle } = props;
  return (
    <div className="p-2 text-center md:text-left md:basis-50">
      <h2 className="p-1 text-2xl font-bold">{title}</h2>
      <p className="mb-3 text-(--color-dark-gray)">{subtitle}</p>
    </div>
  );
}
