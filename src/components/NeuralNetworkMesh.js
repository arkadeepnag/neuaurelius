import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';

const NeuralLayerScene = () => {
  // Scale factor
  const scale = 2;

  // Scaled Layer 1 neuron positions
  const layer1 = [
    [-2, 1, 0],
    [-2, 0, 0],
    [-2, -1, 0]
  ].map(([x, y, z]) => [x * scale, y * scale, z]);

  // Scaled Layer 2 neuron positions
  const layer2 = [
    [2, 1.5, 0],
    [2, 0.5, 0],
    [2, -0.5, 0],
    [2, -1.5, 0]
  ].map(([x, y, z]) => [x * scale, y * scale, z]);

  const lines = layer1.flatMap(start =>
    layer2.map(end => [start, end])
  );

  return (
    <>
      {/* Layer 1 Neurons */}
      {layer1.map((pos, idx) => (
        <Sphere key={`l1-${idx}`} args={[0.3, 32, 32]} position={pos}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
      ))}

      {/* Layer 2 Neurons */}
      {layer2.map((pos, idx) => (
        <Sphere key={`l2-${idx}`} args={[0.3, 32, 32]} position={pos}>
          <meshStandardMaterial color="#ffffff" />
        </Sphere>
      ))}

      {/* White Connection Lines */}
      {lines.map(([start, end], idx) => (
        <Line
          key={idx}
          points={[start, end]}
          color="white"
          lineWidth={2}
        />
      ))}
    </>
  );
};

const NeuralLayer = () => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 25], fov: 40 }}>
      <ambientLight intensity={1.5} />
      <NeuralLayerScene />
    </Canvas>
  );
};

export default NeuralLayer;
