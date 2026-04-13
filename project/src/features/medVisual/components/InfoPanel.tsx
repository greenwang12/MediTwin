import { diseases } from "../../../data/diseases";

type Props = {
  selectedDisease: string | null;
};

export default function InfoPanel({ selectedDisease }: Props) {
  if (!selectedDisease) return <p>Select a disease</p>;

  // 🔥 find disease
  const diseaseData = diseases.find(
    (d) =>
      d.name.toLowerCase().includes(selectedDisease.toLowerCase())
  );

  if (!diseaseData) return <p>No data found</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{diseaseData.name}</h2>

      <p>
        {diseaseData.whatIsHappeningSimplified}
      </p>

      <p style={{ marginTop: "10px", fontWeight: "bold" }}>
        Severity: {diseaseData.severity}
      </p>
    </div>
  );
}