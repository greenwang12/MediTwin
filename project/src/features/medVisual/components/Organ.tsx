import { motion } from "framer-motion";

type Props = {
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  selectedOrgan: string | null;
};

export default function Organ({
  type,
  x,
  y,
  width,
  height,
  selectedOrgan,
}: Props) {

  const isActive = selectedOrgan === type;

  return (
    <motion.rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx="5"
      fill={isActive ? "#a64242" : "#22c55e"}
      whileHover={{ scale: 1.2 }}
      animate={{ scale: isActive ? 1.3 : 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}