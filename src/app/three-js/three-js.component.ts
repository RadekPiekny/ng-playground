import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { Randomizer } from '../functions/math';
import { Ocean } from 'three/examples/jsm/misc/Ocean.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

@Component({
  selector: 'app-three-js',
  templateUrl: './three-js.component.html',
  styleUrls: ['./three-js.component.css']
})
export class ThreeJSComponent implements OnInit {
  boardSize = 512;
  ocean: Ocean;
  lastTime = ( new Date() ).getTime();

  cones: ICone[] = [];
  coneCount = 25;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();
  geometry = new THREE.BoxGeometry( 1, 1, 1 );
  planeGeometry = new THREE.PlaneGeometry(this.boardSize, this.boardSize, this.boardSize);
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
      if (c.obj.position.x > this.boardSize / 2) {
        c.direction = (180 - c.direction) % 360;
        c.xDiff = this.bulbNewXDiff(c.volacity, c.direction);
      }
      if (c.obj.position.x < -1 * this.boardSize / 2) {
        c.direction = 180 - c.direction;
        c.xDiff = this.bulbNewXDiff(c.volacity, c.direction);
      }
      if (c.obj.position.z > this.boardSize / 2) {
        c.direction = 270 + 90 - c.direction;
        c.zDiff = this.bulbNewZDiff(c.volacity, c.direction);
      }
      if (c.obj.position.z < -1 * this.boardSize / 2) {
        c.direction = (90 - (c.direction - 270)) % 360;
        c.zDiff = this.bulbNewZDiff(c.volacity, c.direction);
      }
      c.obj.rotation.x += 0.01;
      c.obj.rotation.y += 0.01;

      c.obj.position.x += c.xDiff;
      c.obj.position.z += c.zDiff;
      c.light.position.set(c.obj.position.x, c.obj.position.y, c.obj.position.z);
      c.lightTarget.position.set(c.obj.position.x, 0, c.obj.position.z);
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
    // this.scene.add(this.cube);

    this.plane.rotation.x = -90 * Math.PI / 180;
    this.plane.position.y = 0;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
    this.camera.position.z = 0;
    this.camera.position.y = 200;
    const light = new THREE.AmbientLight(0xfffffff, 0.1);
    this.scene.add(light);

    const sun = new THREE.DirectionalLight(0xaabbff, 1);
    sun.position.set(0, 1000, 0);
    sun.target.position.set(0, 0, 0);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024; // default
    sun.shadow.mapSize.height = 1024; // default
    sun.shadow.camera.near = 100; // default
    sun.shadow.camera.far = 1000; // default
    sun.shadow.camera.visible = true;
    this.scene.add(sun);
    this.scene.add(sun.target);

    // const helper = new THREE.DirectionalLightHelper( sun, 5 );
    // this.scene.add( helper );
    for (let i = 0; i < this.coneCount; i++) {
      this.createBulb();
    }

  }

  createBulb() {
    const x = Randomizer.getRandomIntNegativeNumber(- this.boardSize / 2, this.boardSize / 2);
    const z = Randomizer.getRandomIntNegativeNumber(- this.boardSize / 2, this.boardSize / 2);

    const geometry = new THREE.TorusKnotBufferGeometry( 10, 3, 64, 16 );
    const material = new THREE.MeshStandardMaterial( { color: 0x6083c2 } );
    const cone = new THREE.Mesh( geometry, material );
    cone.position.set(x, 30, z);
    this.scene.add(cone);
    const spotlight = new THREE.SpotLight(
      0xffffff,
      0.6,
      100,
      this.radFromDegree(30),
      0.8
    );
    spotlight.position.set(x, 0, z);
    spotlight.target.position.set(x, 0, z);

    spotlight.castShadow = false;
    this.scene.add(spotlight);
    this.scene.add(spotlight.target);

    const mycone: ICone = {
      obj: cone,
      light: spotlight,
      lightTarget: spotlight.target,
      x,
      y: 1,
      z,
      volacity: Randomizer.getRandomNumber(0.3, 0.8),
      direction: -120
    };
    mycone.xDiff = this.bulbNewXDiff(mycone.volacity, mycone.direction);
    mycone.zDiff = this.bulbNewZDiff(mycone.volacity, mycone.direction);
    this.cones.push(mycone);
  }

  newConePosition(c: ICone, x: number, y: number, z: number) {
    c.obj.position.set(x, y, z);
    c.light.position.set(x, y, z);
    c.lightTarget.position.set(x, y, z);
  }

  radFromDegree = (degrees) => degrees * (Math.PI / 180);
  bulbNewXDiff = (volacity: number, direction: number) => volacity * Math.cos(this.radFromDegree(direction));
  bulbNewZDiff = (volacity: number, direction: number) => volacity * Math.sin(this.radFromDegree(direction));

}

interface ICone {
  x: number;
  y: number;
  z: number;
  obj: THREE.Mesh;
  light: THREE.SpotLight;
  lightTarget: THREE.Object3D;
  volacity: number;
  direction: number;
  xDiff?: number;
  zDiff?: number;
}