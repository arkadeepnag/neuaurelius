// GeodesicSphere.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const GeodesicSphere = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0); // transparent background
        container.appendChild(renderer.domElement);

        // Initial sizing based on container
        const aspect = container.clientWidth / container.clientHeight;
        const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);

        // Distance depends on container height
        const sphereRadius = 5;
        camera.position.z = sphereRadius * 2.5;

        const geometry = new THREE.IcosahedronGeometry(sphereRadius, 3);
        const wireframe = new THREE.WireframeGeometry(geometry);
        const material = new THREE.LineBasicMaterial({ color: 0xcccccc });
        const line = new THREE.LineSegments(wireframe, material);
        scene.add(line);

        // Animate rotation
        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            line.rotation.y += 0.005;
            line.rotation.x += 0.002;
            renderer.render(scene, camera);
        };
        animate();

        // Handle resizing
        const handleResize = () => {
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;

            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            // Optional: adjust camera distance based on new size
            const minSize = Math.min(width, height);
            camera.position.z = (sphereRadius * minSize); // tune multiplier as needed
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        />
    );
};

export default GeodesicSphere;
