import { BoxGeometry, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

window.addEventListener("DOMContentLoaded", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const canvas: HTMLCanvasElement = document.getElementById('mycanvas') as HTMLCanvasElement;

  // レンダラーの作成
  const renderer = new WebGLRenderer({ canvas: canvas });
  // レンダラーのサイズを設定
  renderer.setSize(width, height);

  // シーンの作成
  const scene = new Scene();

  // カメラの作成
  const camera = new PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, 1000);

  // オブジェクトの作成
  const geometry = new BoxGeometry(300, 300, 300);
  const material = new MeshPhongMaterial({ color: 0xff0000 });
  const box = new Mesh(geometry, material);
  box.position.z = -5;
  scene.add(box);

  // ライトの作成
  const light = new DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  const animation = (): void => {
    requestAnimationFrame(animation);

    box.rotation.x += 0.02;
    box.rotation.y += 0.02;

    renderer.render(scene, camera);
  };

  animation();
});