// MeshShield.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const MeshShield = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.quadraticCurveTo(5, 5, 0, 10);
        shape.quadraticCurveTo(-5, 5, 0, 0);
        const extrudeSettings = { depth: 1, bevelEnabled: false };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        const wireframe = new THREE.WireframeGeometry(geometry);
        const material = new THREE.LineBasicMaterial({ color: 0x00ffff });
        const mesh = new THREE.LineSegments(wireframe, material);
        mesh.rotation.x = Math.PI / 2;
        scene.add(mesh);

        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default MeshShield;
