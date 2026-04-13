import { diseases } from "../../../data/diseases";

type Props = {
  setSelectedDisease: (d: string) => void;
};

export default function Controls({ setSelectedDisease }: Props) {
  return (
    <div style={{ margin: "20px" }}>
      {diseases.map((d) => (
        <button
          key={d.id}
          onClick={() => setSelectedDisease(d.name)} // ✅ FIX
          style={{ margin: "5px" }}
        >
          {d.name}
        </button>
      ))}
    </div>
  );
}