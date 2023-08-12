import Image from "next/image";

export function CountryImageItem({ item }: { item: string }) {
  return (
    <div
      style={{
        width: "auto",
        height: "500px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Image
        src={item}
        alt={item}
        width={800}
        height={600}
        style={{
          objectFit: "contain",
          width: "auto",
          position: "relative",
          height: "unset",
        }}
      />
    </div>
  );
}
