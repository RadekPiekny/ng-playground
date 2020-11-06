import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

@Component({
  selector: 'app-three-js',
  templateUrl: './three-js.component.html',
  styleUrls: ['./three-js.component.css']
})
export class ThreeJSComponent implements OnInit {
  cones: ICone[] = [];
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();
  geometry = new THREE.BoxGeometry( 1, 1, 1 );
  planeGeometry = new THREE.PlaneGeometry(10, 10, 10);
  planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x6C6C6C,
    side: THREE.DoubleSide,
  });
  material = new THREE.MeshStandardMaterial( {
    color: 0xff0aa0,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 1,
    wireframe: false } );
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
  camerawtf = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
  cube = new THREE.Mesh( this.geometry, this.material );
  plane = new THREE.Mesh( this.planeGeometry, this.planeMaterial );
  controls = new OrbitControls( this.camera, this.renderer.domElement );
  constructor() { }

  ngOnInit() {
    this.ff();
    this.animate();
  }
  animate(){
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.cones.forEach(c => {
      c.obj.position.x -= 0.01;
      c.obj.position.z -= 0.01;
      c.light.position.x -= 0.01;
      c.light.position.z -= 0.01;
      c.lightTarget.position.x -= 0.01;
      c.lightTarget.position.z -= 0.01;
    });
    this.camera.updateProjectionMatrix();
    this.renderer.render( this.scene, this.camera );
    this.controls.update();

    requestAnimationFrame(() => this.animate());
  }
  ff() {
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor(0x000000);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    (this.canvas.nativeElement as HTMLDivElement).appendChild( this.renderer.domElement );
    this.cube.position.z = 0;
    this.cube.position.x = 0;
    this.cube.position.y = 1;
    this.cube.castShadow = true;
    this.scene.add(this.cube);

    this.plane.rotation.x = -90 * Math.PI / 180;
    this.plane.position.y = 0;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
    this.camera.position.z = 10;
    this.camera.position.y = 10;
    const light = new THREE.AmbientLight(0xff0000, 0.8);
    this.scene.add(light);

    const sun = new THREE.DirectionalLight(0xaabbff, 1);
    sun.position.set(0, 300, 0);
    sun.target.position.set(0, 0, 0);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024; // default
    sun.shadow.mapSize.height = 1024; // default
    sun.shadow.camera.near = 100; // default
    sun.shadow.camera.far = 1000; // default
    sun.shadow.camera.visible = true;
    this.scene.add(sun);
    this.scene.add(sun.target);

    const helper = new THREE.DirectionalLightHelper( sun, 5 );
    this.scene.add( helper );

    this.createBulb();

  }

  createBulb() {
    const geometry = new THREE.ConeGeometry( 0.5, 1, 9 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const cone = new THREE.Mesh( geometry, material );
    cone.position.set(4, 1, 4);
    this.scene.add(cone);

    const x = Math.random() * 10;
    const y = Math.random() * 10;
    const spotlight = new THREE.SpotLight(
      0xffffff,
      0.6,
      3,
      this.radFromDegree(30),
      0.8
    );
    spotlight.position.set(4, 1, 4);
    spotlight.target.position.set(4, 0, 4);

    spotlight.castShadow = true;
    this.scene.add(spotlight);
    this.scene.add(spotlight.target);

    const mycone: ICone = {
      obj: cone,
      light: spotlight,
      lightTarget: spotlight.target,
      x: 4,
      y: 1,
      z: 4
    };
    this.cones.push(mycone);
  }

  radFromDegree = (degrees) => degrees * (Math.PI / 180);


}

interface ICone {
  x: number;
  y: number;
  z: number;
  obj: THREE.Mesh;
  light: THREE.SpotLight;
  lightTarget: THREE.Object3D;
}