export default function NameFormatter(name: string) {
  const formattedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return formattedName;
}
