import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-js',
  templateUrl: './three-js.component.html',
  styleUrls: ['./three-js.component.css']
})
export class ThreeJSComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();
  geometry = new THREE.BoxGeometry( 1, 1, 1 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0aa0 } );
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  cube = new THREE.Mesh( this.geometry, this.material );
  constructor() { }

  ngOnInit() {
    this.ff();
    this.animate();
    
  }
  animate(){
    

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame(() => this.animate());
  }
  ff() {
    console.log(this.canvas);
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    (this.canvas.nativeElement as HTMLDivElement).appendChild( this.renderer.domElement );

    this.scene.add( this.cube );
    this.camera.position.z = 5;
  }



}