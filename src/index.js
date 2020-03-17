import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  DirectionalLight
} from 'three';

window.addEventListener('DOMContentLoaded', init)

function init() {
  // キャンバスのサイズ指定
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラーの作成
  const renderer = new WebGLRenderer({
    canvas: document.querySelector('#mycanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)

  // シーンの作成
  const scene = new Scene();

  // カメラの作成
  const camera = new PerspectiveCamera(50, width / height);
  camera.position.set(0, 0, 1000)

  // オブジェクトの作成
  const geometry = new BoxGeometry(300, 300, 300);
  const material = new MeshStandardMaterial({
    color: 0x33FF00
  });
  const box = new Mesh(geometry, material);

  // シーンに追加
  scene.add(box);

  // ライトの作成
  const light = new DirectionalLight(0xFFFFFF, 1);
  light.position.set(1, 1, 1);
  scene.add(light);


  // 初期化
  tick();

  function tick() {
    box.rotation.x += 0.005;
    box.rotation.y += 0.005;

    // 描画
    renderer.render(scene, camera);

    // animation
    requestAnimationFrame(tick)
  }
}