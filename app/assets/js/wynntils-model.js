/**
 * Based off the Model Viewer on NameMC.com (Give them credit!)
 */

const THREE = require('three');

const TAU = 2 * Math.PI;
const EPSILON = 1e-3;

const skinLayout = [{ head: [{ l: { x: 16, y: 8, w: 8, h: 8 }, r: { x: 0, y: 8, w: 8, h: 8 }, u: { x: 8, y: 0, w: 8, h: 8 }, d: { x: 16, y: 7, w: 8, h: -8 }, f: { x: 8, y: 8, w: 8, h: 8 }, b: { x: 24, y: 8, w: 8, h: 8 } }, { l: { x: 48, y: 8, w: 8, h: 8 }, r: { x: 32, y: 8, w: 8, h: 8 }, u: { x: 40, y: 0, w: 8, h: 8 }, d: { x: 48, y: 7, w: 8, h: -8 }, f: { x: 40, y: 8, w: 8, h: 8 }, b: { x: 56, y: 8, w: 8, h: 8 } }], torso: [{ l: { x: 28, y: 20, w: 4, h: 12 }, r: { x: 16, y: 20, w: 4, h: 12 }, u: { x: 20, y: 16, w: 8, h: 4 }, d: { x: 28, y: 19, w: 8, h: -4 }, f: { x: 20, y: 20, w: 8, h: 12 }, b: { x: 32, y: 20, w: 8, h: 12 } }], armR: [{ l: { x: 48, y: 20, w: 4, h: 12 }, r: { x: 40, y: 20, w: 4, h: 12 }, u: { x: 44, y: 16, w: 4, h: 4 }, d: { x: 48, y: 19, w: 4, h: -4 }, f: { x: 44, y: 20, w: 4, h: 12 }, b: { x: 52, y: 20, w: 4, h: 12 } }], armRS: [{ l: { x: 47, y: 20, w: 4, h: 12 }, r: { x: 40, y: 20, w: 4, h: 12 }, u: { x: 44, y: 16, w: 3, h: 4 }, d: { x: 47, y: 19, w: 3, h: -4 }, f: { x: 44, y: 20, w: 3, h: 12 }, b: { x: 51, y: 20, w: 3, h: 12 } }], armL: [{ l: { x: 43, y: 20, w: -4, h: 12 }, r: { x: 51, y: 20, w: -4, h: 12 }, u: { x: 47, y: 16, w: -4, h: 4 }, d: { x: 51, y: 19, w: -4, h: -4 }, f: { x: 47, y: 20, w: -4, h: 12 }, b: { x: 55, y: 20, w: -4, h: 12 } }], armLS: [{ l: { x: 43, y: 20, w: -4, h: 12 }, r: { x: 50, y: 20, w: -4, h: 12 }, u: { x: 46, y: 16, w: -3, h: 4 }, d: { x: 49, y: 19, w: -3, h: -4 }, f: { x: 46, y: 20, w: -3, h: 12 }, b: { x: 53, y: 20, w: -3, h: 12 } }], legR: [{ l: { x: 8, y: 20, w: 4, h: 12 }, r: { x: 0, y: 20, w: 4, h: 12 }, u: { x: 4, y: 16, w: 4, h: 4 }, d: { x: 8, y: 19, w: 4, h: -4 }, f: { x: 4, y: 20, w: 4, h: 12 }, b: { x: 12, y: 20, w: 4, h: 12 } }], legL: [{ l: { x: 3, y: 20, w: -4, h: 12 }, r: { x: 11, y: 20, w: -4, h: 12 }, u: { x: 7, y: 16, w: -4, h: 4 }, d: { x: 11, y: 19, w: -4, h: -4 }, f: { x: 7, y: 20, w: -4, h: 12 }, b: { x: 15, y: 20, w: -4, h: 12 } }] }, { head: [{ l: { x: 16, y: 8, w: 8, h: 8 }, r: { x: 0, y: 8, w: 8, h: 8 }, u: { x: 8, y: 0, w: 8, h: 8 }, d: { x: 16, y: 7, w: 8, h: -8 }, f: { x: 8, y: 8, w: 8, h: 8 }, b: { x: 24, y: 8, w: 8, h: 8 } }, { l: { x: 48, y: 8, w: 8, h: 8 }, r: { x: 32, y: 8, w: 8, h: 8 }, u: { x: 40, y: 0, w: 8, h: 8 }, d: { x: 48, y: 7, w: 8, h: -8 }, f: { x: 40, y: 8, w: 8, h: 8 }, b: { x: 56, y: 8, w: 8, h: 8 } }], torso: [{ l: { x: 28, y: 20, w: 4, h: 12 }, r: { x: 16, y: 20, w: 4, h: 12 }, u: { x: 20, y: 16, w: 8, h: 4 }, d: { x: 28, y: 19, w: 8, h: -4 }, f: { x: 20, y: 20, w: 8, h: 12 }, b: { x: 32, y: 20, w: 8, h: 12 } }, { l: { x: 28, y: 36, w: 4, h: 12 }, r: { x: 16, y: 36, w: 4, h: 12 }, u: { x: 20, y: 32, w: 8, h: 4 }, d: { x: 28, y: 35, w: 8, h: -4 }, f: { x: 20, y: 36, w: 8, h: 12 }, b: { x: 32, y: 36, w: 8, h: 12 } }], armR: [{ l: { x: 48, y: 20, w: 4, h: 12 }, r: { x: 40, y: 20, w: 4, h: 12 }, u: { x: 44, y: 16, w: 4, h: 4 }, d: { x: 48, y: 19, w: 4, h: -4 }, f: { x: 44, y: 20, w: 4, h: 12 }, b: { x: 52, y: 20, w: 4, h: 12 } }, { l: { x: 48, y: 36, w: 4, h: 12 }, r: { x: 40, y: 36, w: 4, h: 12 }, u: { x: 44, y: 32, w: 4, h: 4 }, d: { x: 48, y: 35, w: 4, h: -4 }, f: { x: 44, y: 36, w: 4, h: 12 }, b: { x: 52, y: 36, w: 4, h: 12 } }], armRS: [{ l: { x: 47, y: 20, w: 4, h: 12 }, r: { x: 40, y: 20, w: 4, h: 12 }, u: { x: 44, y: 16, w: 3, h: 4 }, d: { x: 47, y: 19, w: 3, h: -4 }, f: { x: 44, y: 20, w: 3, h: 12 }, b: { x: 51, y: 20, w: 3, h: 12 } }, { l: { x: 47, y: 36, w: 4, h: 12 }, r: { x: 40, y: 36, w: 4, h: 12 }, u: { x: 44, y: 32, w: 3, h: 4 }, d: { x: 47, y: 35, w: 3, h: -4 }, f: { x: 44, y: 36, w: 3, h: 12 }, b: { x: 51, y: 36, w: 3, h: 12 } }], armL: [{ l: { x: 40, y: 52, w: 4, h: 12 }, r: { x: 32, y: 52, w: 4, h: 12 }, u: { x: 36, y: 48, w: 4, h: 4 }, d: { x: 40, y: 51, w: 4, h: -4 }, f: { x: 36, y: 52, w: 4, h: 12 }, b: { x: 44, y: 52, w: 4, h: 12 } }, { l: { x: 56, y: 52, w: 4, h: 12 }, r: { x: 48, y: 52, w: 4, h: 12 }, u: { x: 52, y: 48, w: 4, h: 4 }, d: { x: 56, y: 51, w: 4, h: -4 }, f: { x: 52, y: 52, w: 4, h: 12 }, b: { x: 60, y: 52, w: 4, h: 12 } }], armLS: [{ l: { x: 39, y: 52, w: 4, h: 12 }, r: { x: 32, y: 52, w: 4, h: 12 }, u: { x: 36, y: 48, w: 3, h: 4 }, d: { x: 39, y: 51, w: 3, h: -4 }, f: { x: 36, y: 52, w: 3, h: 12 }, b: { x: 43, y: 52, w: 3, h: 12 } }, { l: { x: 55, y: 52, w: 4, h: 12 }, r: { x: 48, y: 52, w: 4, h: 12 }, u: { x: 52, y: 48, w: 3, h: 4 }, d: { x: 55, y: 51, w: 3, h: -4 }, f: { x: 52, y: 52, w: 3, h: 12 }, b: { x: 59, y: 52, w: 3, h: 12 } }], legR: [{ l: { x: 8, y: 20, w: 4, h: 12 }, r: { x: 0, y: 20, w: 4, h: 12 }, u: { x: 4, y: 16, w: 4, h: 4 }, d: { x: 8, y: 19, w: 4, h: -4 }, f: { x: 4, y: 20, w: 4, h: 12 }, b: { x: 12, y: 20, w: 4, h: 12 } }, { l: { x: 8, y: 36, w: 4, h: 12 }, r: { x: 0, y: 36, w: 4, h: 12 }, u: { x: 4, y: 32, w: 4, h: 4 }, d: { x: 8, y: 35, w: 4, h: -4 }, f: { x: 4, y: 36, w: 4, h: 12 }, b: { x: 12, y: 36, w: 4, h: 12 } }], legL: [{ l: { x: 24, y: 52, w: 4, h: 12 }, r: { x: 16, y: 52, w: 4, h: 12 }, u: { x: 20, y: 48, w: 4, h: 4 }, d: { x: 24, y: 51, w: 4, h: -4 }, f: { x: 20, y: 52, w: 4, h: 12 }, b: { x: 28, y: 52, w: 4, h: 12 } }, { l: { x: 8, y: 52, w: 4, h: 12 }, r: { x: 0, y: 52, w: 4, h: 12 }, u: { x: 4, y: 48, w: 4, h: 4 }, d: { x: 8, y: 51, w: 4, h: -4 }, f: { x: 4, y: 52, w: 4, h: 12 }, b: { x: 12, y: 52, w: 4, h: 12 } }] }];

function toCanvas(image, x, y, w, h) {
  x = (typeof x === 'undefined' ? 0 : x);
  y = (typeof y === 'undefined' ? 0 : y);
  w = (typeof w === 'undefined' ? image.width : w);
  h = (typeof h === 'undefined' ? image.height : h);

  let canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(image, x, y, w, h, 0, 0, w, h);

  return canvas;
}

function makeOpaque(image) {
  let canvas = toCanvas(image);
  return canvas;
  let ctx = canvas.getContext('2d');
  let data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let pixels = data.data;

  for (let p = 3; p < pixels.length; p += 4) {
    pixels[p] = 255;
  }

  ctx.putImageData(data, 0, 0);

  return canvas;
}

function hasAlphaLayer(image) {
  let canvas = toCanvas(image);
  let ctx = canvas.getContext('2d');
  let data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let pixels = data.data;

  for (let p = 3; p < pixels.length; p += 4) {
    if (pixels[p] !== 255) {
      return true;
    }
  }

  return false;
}

function deg(d) {
  return d * (TAU / 360);
}

function colorFaces(geometry, canvas, rectangles, ignoreDepth = false) {
  if (!rectangles) return null;
  let pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
  let f = 0;
  let faces = [];
  let materials = [];
  let materialIndexMap = {};
  let side = THREE.FrontSide;
  for (let k in rectangles) {
    let rect = rectangles[k];
    let width = Math.abs(rect.w);
    let height = Math.abs(rect.h);
    let dj = Math.sign(rect.w);
    let di = Math.sign(rect.h);
    for (let y = 0, i = rect.y; y < height; y++ , i += di) {
      for (let x = 0, j = rect.x; x < width; x++ , j += dj, f += 2) {
        let p = 4 * (i * canvas.width + j);
        let a = pixels[p + 3];

        if (a === 0) {
          side = THREE.DoubleSide;
          continue;
        }

        let materialIndex = materialIndexMap[a];

        if (typeof materialIndex === 'undefined') {
          materials.push(new THREE.MeshBasicMaterial({
            vertexColors: THREE.FaceColors,
            opacity: a / 255,
            transparent: (a !== 255)
          }));
          materialIndex = materials.length - 1;
          materialIndexMap[a] = materialIndex;
          if (a !== 255) {
            side = THREE.DoubleSide;
          }
        }

        let face1 = geometry.faces[f];
        let face2 = geometry.faces[f + 1];
        face1.color.r = pixels[p] / 255;
        face1.color.g = pixels[p + 1] / 255;
        face1.color.b = pixels[p + 2] / 255;
        face2.color = face1.color;
        face1.materialIndex = materialIndex;
        face2.materialIndex = materialIndex;
        faces.push(face1);
        faces.push(face2);
      }
    }
  }

  if (faces.length === 0) return null;

  geometry.faces = faces;

  materials.forEach(function (m) {
    m.side = side;
  });

  return new THREE.Mesh(new THREE.BufferGeometry().fromGeometry(geometry), materials);
}

function buildMinecraftModel(skinImage, capeImage, capeType, parts, slim, flip, depth = false) {
  if (skinImage.width < 64 || skinImage.height < 32) {
    return null;
  }

  let version = (skinImage.height >= 64 ? 1 : 0);

  let opaqueSkinCanvas = makeOpaque(skinImage);
  let transparentSkinCanvas = toCanvas(skinImage);
  let hasAlpha = hasAlphaLayer(skinImage);

  let headGroup = new THREE.Object3D();
  headGroup.position.x = 0;
  headGroup.position.y = 12;
  headGroup.position.z = 0;
  let box = new THREE.BoxGeometry(8, 8, 8, 8, 8, 8);
  let headMesh = colorFaces(box, opaqueSkinCanvas, skinLayout[version]['head'][0]);
  headGroup.add(headMesh);
  if (hasAlpha) {
    box = new THREE.BoxGeometry(9, 9, 9, 8, 8, 8);
    let hatMesh = colorFaces(box, transparentSkinCanvas, skinLayout[version]['head'][1]);
    hatMesh && headGroup.add(hatMesh);
  }

  let torsoGroup = new THREE.Object3D();
  torsoGroup.position.x = 0;
  torsoGroup.position.y = 2;
  torsoGroup.position.z = 0;
  box = new THREE.BoxGeometry(8 + EPSILON, 12 + EPSILON, 4 + EPSILON, 8, 12, 4);
  let torsoMesh = colorFaces(box, opaqueSkinCanvas, skinLayout[version]['torso'][0]);
  torsoGroup.add(torsoMesh);
  if (version >= 1 && hasAlpha) {
    box = new THREE.BoxGeometry(8.5 + EPSILON, 12.5 + EPSILON, 4.5 + EPSILON, 8, 12, 4);
    let jacketMesh = colorFaces(box, transparentSkinCanvas, skinLayout[version]['torso'][1]);
    jacketMesh && torsoGroup.add(jacketMesh);
  }

  let rightArmGroup = new THREE.Object3D();
  rightArmGroup.position.x = slim ? -5.5 : -6;
  rightArmGroup.position.y = 6;
  rightArmGroup.position.z = 0;
  let rightArmMesh;
  if (slim) {
    box = new THREE.BoxGeometry(3, 12, 4, 3, 12, 4).translate(0, -4, 0);
    rightArmMesh = colorFaces(box, opaqueSkinCanvas, skinLayout[version]['armRS'][0]);
  } else {
    box = new THREE.BoxGeometry(4, 12, 4, 4, 12, 4).translate(0, -4, 0);
    rightArmMesh = colorFaces(box, opaqueSkinCanvas, skinLayout[version]['armR'][0]);
  }
  rightArmGroup.add(rightArmMesh);
  if (version >= 1 && hasAlpha) {
    let rightSleeveMesh;
    if (slim) {
      box = new THREE.BoxGeometry(3.5 + EPSILON * 4, 12.5 + EPSILON * 4, 4.5 + EPSILON * 4, 3, 12, 4).translate(0, -4, 0);
      rightSleeveMesh = colorFaces(box, transparentSkinCanvas, skinLayout[version]['armRS'][1]);
    } else {
      box = new THREE.BoxGeometry(4.5 + EPSILON * 4, 12.5 + EPSILON * 4, 4.5 + EPSILON * 4, 4, 12, 4).translate(0, -4, 0);
      rightSleeveMesh = colorFaces(box, transparentSkinCanvas, skinLayout[version]['armR'][1]);
    }
    rightSleeveMesh && rightArmGroup.add(rightSleeveMesh);
  }

  let leftArmGroup = new THREE.Object3D();
  leftArmGroup.position.x = slim ? 5.5 : 6;
  leftArmGroup.position.y = 6;
  leftArmGroup.position.z = 0;
  let leftArmMesh;
  if (slim) {
    box = new THREE.BoxGeometry(3, 12, 4, 3, 12, 4).translate(0, -4, 0);
    leftArmMesh = colorFaces(box, opaqueSkinCanvas, skinLayout[version]['armLS'][0]);
  } else {
    box = new THREE.BoxGeometry(4, 12, 4, 4, 12, 4).translate(0, -4, 0);
    leftArmMesh = colorFaces(box, opaqueSkinCanvas, skinLayout[version]['armL'][0]);
  }
  leftArmGroup.add(leftArmMesh);
  if (version >= 1 && hasAlpha) {
    let leftSleeveMesh;
    if (slim) {
      box = new THREE.BoxGeometry(3.5 + EPSILON * 4, 12.5 + EPSILON * 4, 4.5 + EPSILON * 4, 3, 12, 4).translate(0, -4, 0);
      leftSleeveMesh = colorFaces(box, transparentSkinCanvas, skinLayout[version]['armLS'][1]);
    } else {
      box = new THREE.BoxGeometry(4.5 + EPSILON * 4, 12.5 + EPSILON * 4, 4.5 + EPSILON * 4, 4, 12, 4).translate(0, -4, 0);
      leftSleeveMesh = colorFaces(box, transparentSkinCanvas, skinLayout[version]['armL'][1]);
    }
    leftSleeveMesh && leftArmGroup.add(leftSleeveMesh);
  }

  let rightLegGroup = new THREE.Object3D();
  rightLegGroup.position.x = -2;
  rightLegGroup.position.y = -4;
  rightLegGroup.position.z = 0;
  box = new THREE.BoxGeometry(4, 12, 4, 4, 12, 4).translate(0, -6, 0);
  let rightLegMesh = colorFaces(box, opaqueSkinCanvas, skinLayout[version]['legR'][0]);
  rightLegGroup.add(rightLegMesh);
  if (version >= 1 && hasAlpha) {
    box = new THREE.BoxGeometry(4.5 + EPSILON * 2, 12.5 + EPSILON * 2, 4.5 + EPSILON * 2, 4, 12, 4).translate(0, -6, 0);
    let rightPantMesh = colorFaces(box, transparentSkinCanvas, skinLayout[version]['legR'][1]);
    rightPantMesh && rightLegGroup.add(rightPantMesh);
  }

  let leftLegGroup = new THREE.Object3D();
  leftLegGroup.position.x = 2;
  leftLegGroup.position.y = -4;
  leftLegGroup.position.z = 0;
  box = new THREE.BoxGeometry(4, 12, 4, 4, 12, 4).translate(0, -6, 0);
  let leftLegMesh = colorFaces(box, opaqueSkinCanvas, skinLayout[version]['legL'][0]);
  leftLegGroup.add(leftLegMesh);
  if (version >= 1 && hasAlpha) {
    box = new THREE.BoxGeometry(4.5 + EPSILON * 3, 12.5 + EPSILON * 3, 4.5 + EPSILON * 3, 4, 12, 4).translate(0, -6, 0);
    let leftPantMesh = colorFaces(box, transparentSkinCanvas, skinLayout[version]['legL'][1]);
    leftPantMesh && leftLegGroup.add(leftPantMesh);
  }

  let playerGroup = new THREE.Object3D();
  playerGroup.add(headGroup);
  playerGroup.add(torsoGroup);
  playerGroup.add(rightArmGroup);
  playerGroup.add(leftArmGroup);
  playerGroup.add(rightLegGroup);
  playerGroup.add(leftLegGroup);

  if (capeImage && (capeImage.width % 32 == 0)) {
    let cS = capeImage.width / (32 * 2);
    if(capeType == 'cape'){
      let capeCanvas = makeOpaque(capeImage);

      let capeGroup = new THREE.Object3D();
      capeGroup.position.x = 0;
      capeGroup.position.y = 8;
      capeGroup.position.z = -2;
      capeGroup.rotation.y += deg(180);
      let capeMesh;

      box = new THREE.BoxGeometry(10, 16, 1, (10 * cS), (16 * cS), (1 * cS)).translate(0, -8, 0.5);
      capeMesh = colorFaces(box, capeCanvas, {
        left: { x: (11 * cS), y: (1 * cS), w: (1 * cS), h: (16 * cS) },
        right: { x: (0 * cS), y: (1 * cS), w: (1 * cS), h: (16 * cS) },
        top: { x: (1 * cS), y: (0 * cS), w: (10 * cS), h: (1 * cS) },
        bottom: { x: (11 * cS), y: (cS-1), w: (10 * cS), h: (-1 * cS) },
        front: { x: (1 * cS), y: (1 * cS), w: (10 * cS), h: (16 * cS) },
        back: { x: (12 * cS), y: (1 * cS), w: (10 * cS), h: (16 * cS) }
      }, depth);

      capeGroup.add(capeMesh);
      playerGroup.add(capeGroup);
    }else if(capeType == 'elytra'){
        let capeCanvas = makeOpaque(capeImage);

        let capeGroup = new THREE.Object3D();
        capeGroup.position.x = 0;
        capeGroup.position.y = 8;
        capeGroup.position.z = -2;
        capeGroup.rotation.y += deg(180);

        var capeRotation = 0.5;
        let leftWing, rightWing;
        if (cS === 2) {
          box = new THREE.BoxGeometry(10, 20, 2, 20, 40, 4).translate(-1, -12, 0).rotateZ(capeRotation*-1).rotateX(-0.2);
          leftWing = colorFaces(box, capeCanvas, {
            left: { x: 44, y: 4, w: 4, h: 40 },
            right: { x: 68, y: 4, w: 4, h: 40 },
            top: { x: 67, y: 0, w: -20, h: 4 },
            bottom: { x: 87, y: 0, w: -20, h: 4 },
            front: { x: 72, y: 4, w: 20, h: 40 },
            back: { x: 48, y: 4, w: 20, h: 40 }
          }, depth);
          box = new THREE.BoxGeometry(10, 20, 2, 20, 40, 4).translate(1, -12, 0).rotateZ(capeRotation).rotateX(-0.2);
          rightWing = colorFaces(box, capeCanvas, {
            left: { x: 71, y: 4, w: -4, h: 40 },
            right: { x: 47, y: 4, w: -4, h: 40 },
            top: { x: 48, y: 0, w: 20, h: 4 },
            bottom: { x: 68, y: 0, w: 20, h: 4 },
            front: { x: 91, y: 4, w: -20, h: 40 },
            back: { x: 67, y: 4, w: -20, h: 40 }
          }, depth);
          capeGroup.add(leftWing);
          capeGroup.add(rightWing);
          playerGroup.add(capeGroup);
        }else{
          box = new THREE.BoxGeometry(10, 20, 2, 10*cS, 20*cS, 2*cS).translate(-1, -12, 0).rotateZ(capeRotation*-1).rotateX(-0.2);
          leftWing = colorFaces(box, capeCanvas, {
            left: { x: 22*cS, y: 2*cS, w: 2*cS, h: 20*cS },
            right: { x: 34*cS, y: 2*cS, w: 2*cS, h: 20*cS },
            top: { x: 33*cS, y: 0*cS, w: -10*cS, h: 2*cS },
            bottom: { x: 44*cS, y: 0*cS, w: -10*cS, h: 2*cS },
            front: { x: 36*cS, y: 2*cS, w: 10*cS, h: 20*cS },
            back: { x: 24*cS, y: 2*cS, w: 10*cS, h: 20*cS }
          }, depth);
          box = new THREE.BoxGeometry(10, 20, 2, 10*cS, 20*cS, 2*cS).translate(1, -12, 0).rotateZ(capeRotation).rotateX(-0.2);
          rightWing = colorFaces(box, capeCanvas, {
            left: { x: 36*cS, y: 2*cS, w: -2*cS, h: 20*cS },
            right: { x: 24*cS, y: 2*cS, w: -2*cS, h: 20*cS },
            top: { x: 24*cS, y: 0*cS, w: 10*cS, h: 2*cS },
            bottom: { x: 34*cS, y: 0*cS, w: 10*cS, h: 2*cS },
            front: { x: 46*cS, y: 2*cS, w: -10*cS, h: 20*cS },
            back: { x: 34*cS, y: 2*cS, w: -10*cS, h: 20*cS }
          }, depth);
          capeGroup.add(leftWing);
          capeGroup.add(rightWing);
          playerGroup.add(capeGroup);
        }
    }
  }

  // let partList = parts.split(",");
  // partList.forEach(function(part){
  //   // console.log("Adding part " + part);
  //   switch(part){
  //     case 'ears':
  //       // let earGroup = new THREE.Object3D();

  //       // earGroup.position.x = 0;
  //       // earGroup.position.y = 8;
  //       // earGroup.position.z = 0;
  //       // earGroup.rotation.y -= deg(90);

  //       // let leftEar, rightEar;
  //       // box = new THREE.BoxGeometry(1, 6, 6, 1, 6, 6).translate(0, 8, -5.5).rotateX(1).scale(0.8, 0.8, 0.8);
  //       // leftEar = colorFaces(box, opaqueSkinCanvas, {
  //       //   left: { x: 24, y: 1, w: 1, h: 6 },
  //       //   right: { x: 31, y: 1, w: 1, h: 6 },
  //       //   top: { x: 31, y: 0, w: 6, h: 1 },
  //       //   bottom: { x: 25, y: 0, w: 6, h: 1 },
  //       //   front: { x: 25, y: 1, w: 6, h: 6 },
  //       //   back: { x: 32, y: 1, w: 6, h: 6 }
  //       // }, depth);
  //       // console.log(leftEar);
  //       // earGroup.add(leftEar);
  //       // playerGroup.add(earGroup);
  //       break;
  //     default:
  //       console.log("Unknown part: " + part);
  //   }
  // });


  if (flip) {
    playerGroup.rotation.z += deg(180);
  }

  return playerGroup;
}

let renderState;
let canvas3d = $('canvas.skin-3d');

function toggleAnimation(e) {
  if (renderState.animate) {
    renderState.animate = false;
    canvas3d.parent().addClass('animation-paused');
  } else {
    renderState.animate = true;
    canvas3d.parent().removeClass('animation-paused');
    window.requestAnimationFrame(renderAnimation);
  }

  let date = new Date();
  date.setFullYear(date.getFullYear() + 2);
  // set a cookie to save the animation state?
}

function renderAnimation() {
  if (renderState.animate) {
    renderState.frame++;
    render();
    window.requestAnimationFrame(renderAnimation);
  }
}

function render() {
  let time = (4 * renderState.frame) % 360;
  canvas3d.data('time', time);

  let angle = Math.sin(deg(time));
  renderState.model.children[2].rotation.x = -deg(18) * angle;
  renderState.model.children[3].rotation.x = deg(18) * angle;
  renderState.model.children[4].rotation.x = deg(20) * angle;
  renderState.model.children[5].rotation.x = -deg(20) * angle;
  if (renderState.model.children[6]) {
    let capeAngle = Math.sin(deg(renderState.frame));
    renderState.model.children[6].rotation.x = deg(18) - deg(6) * capeAngle;
  }
  renderState.renderer.render(renderState.scene, renderState.camera);
  if (renderState.canvas !== renderState.renderer.domElement) {
    renderState.canvas.getContext('2d').drawImage(renderState.renderer.domElement, 0, 0);
  }
}

function allowRotation(renderState, positionCamera) {
  function startRotation(t, id) {
    renderState.dragState[id] = { x: t.screenX, y: t.screenY };
  }

  function rotate(t, id) {
    if (!renderState.dragState[id]) {
      return false;
    }

    let result = true;

    renderState.theta -= t.screenX - renderState.dragState[id].x;
    renderState.phi += t.screenY - renderState.dragState[id].y;
    renderState.canvas.setAttribute('data-theta', renderState.theta % 360);
    renderState.canvas.setAttribute('data-phi', renderState.phi % 360);

    if (renderState.phi < -90) {
      renderState.phi = -90;
      result = false;
    } else if (renderState.phi > 90) {
      renderState.phi = 90;
      result = false;
    }
    positionCamera(renderState.camera, deg(renderState.theta), deg(renderState.phi));
    renderState.renderer.render(renderState.scene, renderState.camera);

    renderState.dragState[id].x = t.screenX;
    renderState.dragState[id].y = t.screenY;

    return result;
  }

  function endRotation(t, id) {
    delete renderState.dragState[id];
  }

  // renderState.canvas.onmousedown = function (e) {
  //   e.preventDefault();
  //   startRotation(e, 'mouse');
  // };

  $(renderState.canvas).parent().mousedown(function (e) {
    e.preventDefault();
    startRotation(e, 'mouse');
  });

  window.onmousemove = function (e) {
    rotate(e, 'mouse');
  };

  window.onmouseup = function (e) {
    endRotation(e, 'mouse');
  };

  renderState.canvas.ontouchstart = function (e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      startRotation(e.changedTouches[i], e.changedTouches[i].identifier);
    }
  };

  renderState.canvas.ontouchmove = function (e) {
    let result = false;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (rotate(e.changedTouches[i], e.changedTouches[i].identifier)) {
        result = true;
      } else {
        delete renderState.dragState[e.changedTouches[i].identifier];
      }
    }
    if (result) {
      e.preventDefault();
    }
  };

  renderState.canvas.ontouchend = renderState.canvas.ontouchcancel = function (e) {
    for (let i = 0; i < e.changedTouches.length; i++) {
      endRotation(e.changedTouches[i], e.changedTouches[i].identifier);
    }
  };
}

let renderer;

function renderSkinHelper(canvas, animate, theta, phi, time, model) {
  if (renderState) {
    renderState.canvas = canvas;
    renderState.scene.remove(renderState.model);
    renderState.model = model;
    renderState.scene.add(model);
    render();
    return;
  }

  if (!renderer) {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  }

  renderState = {
    canvas: canvas,
    animate: animate,
    model: model,
    theta: theta,
    phi: phi,
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(32, canvas.width / canvas.height, 72 - 20, 72 + 20),
    //camera: new THREE.OrthographicCamera(-19 * canvas.width / canvas.height, 19 * canvas.width / canvas.height, 19, -19, 1, 100),
    renderer: renderer,
    dragState: {},
    frame: time / 4
  };

  let origin = new THREE.Vector3(0, 0, 0);

  function positionCamera(camera, theta, phi) {
    let cosPhi = Math.cos(phi);
    camera.position.x = 72 * cosPhi * Math.sin(theta);
    camera.position.z = 72 * cosPhi * Math.cos(theta);
    camera.position.y = 72 * Math.sin(phi);
    camera.lookAt(origin);
  }

  renderState.scene.add(model);

  positionCamera(renderState.camera, deg(renderState.theta), deg(renderState.phi));
  allowRotation(renderState, positionCamera);

  render();

  if (renderState.animate) {
    window.requestAnimationFrame(renderAnimation);
  }
}

let modelCache = {};

function renderSkin(canvas, slim, flip, animate, theta, phi, time, uuid, capeType, parts, forced, depth, callback) {
  let hash = [uuid, slim, flip, depth].join(":");

  function handleModel() {
    try {
      renderSkinHelper(canvas, animate, theta, phi, time, modelCache[hash]);
      callback();
    } catch (e) {
      callback(e);
    }
  }
  if (!forced && modelCache[hash]) {
    handleModel();
  } else {
    function handleImages(skinImage, capeImage) {
      let model = buildMinecraftModel(skinImage, capeImage, capeType, parts, slim, flip, depth);
      if (model) {
        modelCache[hash] = model;
        handleModel();
      } else {
        callback();
      }
    }

    // var skinBase = 'https://crafatar.com/skins/';
    var skinBase = 'https://minotar.net/skin/';
    var capeBase = 'https://athena.wynntils.com/capes/user/';

    let skinImage = new Image();
    skinImage.crossOrigin = '';
    skinImage.src = skinBase + uuid;
    skinImage.onload = function () {
      let capeImage = new Image();
      capeImage.crossOrigin = '';
      capeImage.src = capeBase + uuid + (forced ? '?v=' + new Date().getTime() : '');
      capeImage.onload = function () {
        handleImages(skinImage, capeImage);
      };
    };
  }
}
var depth = false;

function drawSkin3D(forced = false) {
  if (!canvas3d.get(0)) return;

  let slim = canvas3d.data('model') === 'slim';
  let uuid = canvas3d.data('uuid');
  let capeType = canvas3d.data('capetype');
  let parts = canvas3d.data('parts');
  let flip = canvas3d.data('flip') === true;
  let animate = canvas3d.data('animate') === true;
  let theta = canvas3d.data('theta') ? parseFloat(canvas3d.data('theta')) : -30;
  let phi = canvas3d.data('phi') ? parseFloat(canvas3d.data('phi')) : 20;
  let time = canvas3d.data('time') ? parseFloat(canvas3d.data('time')) : 90;

  canvas3d.data('model', slim ? 'slim' : 'classic');
  canvas3d.data('theta', theta);
  canvas3d.data('phi', phi);
  canvas3d.data('time', time);

  renderSkin(canvas3d.get(0), slim, flip, animate, theta, phi, time, uuid, capeType, parts, forced, depth, function (err) {
    if(err) console.log("error", err);
  });
}

// drawSkin3D();

exports.showUUID = (uuid) => {
  Athena.getInfo(uuid).then((athenaData) => {
    console.log(athenaData)
    let cosmetic = athenaData.user.cosmetics
    canvas3d.data('parts', cosmetic.hasEars ? 'ears' : '');
    canvas3d.data('capetype', cosmetic.isElytra ? 'elytra' : 'cape');

    canvas3d.data('uuid', uuid);
    drawSkin3D(true);
  });
}

function toggleDepth(){
  depth = !depth;
  drawSkin3D(true);
}