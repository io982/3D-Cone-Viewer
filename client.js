
const button = document.getElementById('submit');
heightInput.value = '2';
radiusInput.value = '1';
segmentsInput.value = '12';
let context = null;

function getCone() {
  const height = heightInput.value;
  const radius = radiusInput.value;
  const segments = segmentsInput.value;
  WebGLRenderingContext.delete;
  fetch(`/triangulation?height=${height}&radius=${radius}&segments=${segments}`)
    .then(response => response.json())
    .then(triangles => {
      const scene = new THREE.Scene();     
      const camera = new THREE.PerspectiveCamera(
        75,
        800 / 600,
        0.1,
        1000
      );
      camera.position.z = 5;
      const renderer = new THREE.WebGLRenderer();
      //renderer.shadowMap.enabled = true; 
      //renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
      renderer.setSize('800', '600'); 
      
       
      if (context) {
        context.dispose(); 
        context.forceContextLoss(); 
        context = null;
      }
   
      container.childNodes.forEach(x => x.remove());
      
      container.append(renderer.domElement);      

      const geometry = new THREE.BufferGeometry();      
      const vertices = new Float32Array(triangles)
      geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
     
      const spec = {
        color: 0x049ef4,
        flatShading: true,        
        metalness: 0,
        roughness: 0,         
        }
      const material = new THREE.MeshStandardMaterial(spec);

   
      const cone = new THREE.Mesh(geometry, material);
      //cone.receiveShadow = true;  
      scene.add(cone);     
           
      scene.background = new THREE.Color(0.1, 0.1, 0.1);
     
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);      
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
      directionalLight.position.set( 4, 2, 2 );
      //directionalLight.castShadow = true; 
      scene.add( directionalLight );      
      
      context = renderer;      
     
      function animate() {
        requestAnimationFrame(animate);
        cone.rotation.x += 0.01;
        cone.rotation.y += 0.01;
        renderer.render(scene, camera);
        
     
      }
      
      animate();
    });
};

addEventListener('load', () => {

getCone();
});
