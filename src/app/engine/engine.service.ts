import * as THREE from 'three';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.PointLight;
  private angle = 0;
  private radius = 10;
  private cube: THREE.Mesh[] = [];
  private singleGeometry = new THREE.Geometry();

  createScene(elementId: string): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // create the scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xf0f0f0 );
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);
    let geometry = new THREE.BoxGeometry(1, 2, 1);
    for (let i = 0; i < 1000; i++) {
      var red2 = new THREE.Color( "rgb(" + this.getRndInteger(0,255) + "," +  this.getRndInteger(0,20) + "," + this.getRndInteger(0,20) + ")" );  // CSS string
      let material = new THREE.MeshLambertMaterial({ color: red2 });
      this.cube[i] = new THREE.Mesh( geometry, material );
      this.cube[i].position.z = this.getRnd(-20,-80);;
      this.cube[i].position.x = this.getRnd(-20,40);
      this.cube[i].position.y = this.getRnd(-20,40);
      this.cube[i].rotation.z = this.getRnd(0,360);
      this.cube[i].rotation.x = this.getRnd(0,360);
      this.cube[i].rotation.y = this.getRnd(0,360);
      this.singleGeometry.merge( geometry, this.cube[i].matrix);
      this.scene.add(this.cube[i]);
    }
    this.light = new THREE.PointLight( 0xffffff );
    this.light.position.z = 50;
    this.scene.add(this.light);

  }

  animate(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.render();
    });

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });
    this.angle += 0.01;
    this.cube.forEach(cube => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    });
    this.camera.position.x = Math.cos(this.angle) * 0.5;
    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  getRnd(min, max) {
    return Math.random() * (max - min) + min;
  }
  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
